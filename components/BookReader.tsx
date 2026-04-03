"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, ChevronLeft, ChevronRight, Download,
  Loader2, ZoomIn, ZoomOut, Maximize, Minimize,
  Sun, Moon, BookOpen, RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";
import HTMLPageFlip from "react-pageflip";

// PDF.js types
type PDFDocumentProxy = any;
type PDFPageProxy = any;

interface BookReaderProps {
  title: string;
  pdfUrl: string;
  onClose?: () => void;
}

type ThemeMode = 'light' | 'sepia' | 'dark';

const THEME_CONFIG: Record<ThemeMode, { bg: string; pageBg: string; text: string; ui: string; uiText: string; border: string }> = {
  light:  { bg: '#E8E0D8', pageBg: '#FFFFFF', text: '#1A1A1A', ui: '#FFFFFF', uiText: '#334155', border: '#E2E8F0' },
  sepia:  { bg: '#D4C5A9', pageBg: '#F5F0E1', text: '#3D2B1F', ui: '#F5F0E1', uiText: '#56423D', border: '#C8B897' },
  dark:   { bg: '#1A1A2E', pageBg: '#262640', text: '#E0E0E0', ui: '#1E1E32', uiText: '#CBD5E1', border: '#334155' },
};

// --- Page Component for Flipbook ---
const Page = (props: any) => {
  return (
    <div className="page" ref={props.ref} data-density={props.density || 'soft'}>
      <div className="page-content w-full h-full relative overflow-hidden" style={{ backgroundColor: props.theme.pageBg }}>
        {props.children}
      </div>
    </div>
  );
};

export default function BookReader({ title, pdfUrl, onClose }: BookReaderProps) {
  const router = useRouter();
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const [isLoading, setIsLoading] = useState(true);
  const [pageImages, setPageImages] = useState<Map<number, string>>(new Map());
  const [renderingPages, setRenderingPages] = useState<Set<number>>(new Set());
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const themeStyle = THEME_CONFIG[theme];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load PDF.js with stable worker URL
  useEffect(() => {
    let cancelled = false;
    async function loadPdf() {
      setIsLoading(true);
      try {
        const pdfjsLib = await import('pdfjs-dist');
        // Use local worker copied to public/ folder to fix the "fake worker" fetch error
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        });

        const pdfDoc = await loadingTask.promise;
        if (cancelled) return;

        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
        setIsLoading(false);
      } catch (err) {
        console.error('PDF load error:', err);
        setIsLoading(false);
      }
    }

    loadPdf();
    return () => { cancelled = true; };
  }, [pdfUrl]);

  // Render Page logic
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdf || pageNum < 1 || pageNum > totalPages) return;
    if (pageImages.has(pageNum) || renderingPages.has(pageNum)) return;

    setRenderingPages(prev => new Set(prev).add(pageNum));

    try {
      const page: PDFPageProxy = await pdf.getPage(pageNum);
      const scale = 2; // High-res for flipbook
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d')!;

      await page.render({ canvasContext: ctx, viewport }).promise;

      const imageUrl = canvas.toDataURL('image/png');
      setPageImages(prev => new Map(prev).set(pageNum, imageUrl));
    } catch (err) {
      console.error(`Error rendering page ${pageNum}:`, err);
    } finally {
      setRenderingPages(prev => {
        const next = new Set(prev);
        next.delete(pageNum);
        return next;
      });
    }
  }, [pdf, totalPages, pageImages, renderingPages]);

  // Pre-render logic
  useEffect(() => {
    if (!pdf) return;
    // Render current, next and previous pages for smoothness
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 4);
    for (let i = start; i <= end; i++) {
      renderPage(i);
    }
  }, [pdf, currentPage, totalPages, renderPage]);

  // Handle page changes from flipbook
  const onPageChange = (e: any) => {
    setCurrentPage(e.data);
  };

  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose ? onClose() : router.back();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, router]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleClose = () => {
    onClose ? onClose() : router.back();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden select-none"
      style={{ backgroundColor: themeStyle.bg }}
    >
      {/* --- Header Controls --- */}
      <AnimatePresence>
        {showControls && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="h-14 flex items-center justify-between px-4 relative z-50 shadow-lg"
            style={{ backgroundColor: themeStyle.ui, borderBottom: `1px solid ${themeStyle.border}` }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button onClick={handleClose} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-black/5 transition-all active:scale-95" style={{ color: themeStyle.uiText }}>
                <X className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-500 leading-none mb-0.5">ডিজিটাল কিতাব</p>
                <h1 className="text-xs sm:text-sm font-bold truncate leading-none" style={{ color: themeStyle.uiText }}>{title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex bg-black/5 rounded-xl p-0.5 mr-1 overflow-hidden">
                <button onClick={() => setTheme('light')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}>
                  <Sun className="w-3.5 h-3.5" style={{ color: themeStyle.uiText }} />
                </button>
                <button onClick={() => setTheme('sepia')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'sepia' ? 'bg-[#F4E1D2] shadow-sm' : ''}`}>
                  <BookOpen className="w-3.5 h-3.5" style={{ color: '#56423D' }} />
                </button>
                <button onClick={() => setTheme('dark')} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-slate-700 shadow-sm' : ''}`}>
                  <Moon className="w-3.5 h-3.5" style={{ color: theme === 'dark' ? '#FFF' : themeStyle.uiText }} />
                </button>
              </div>

              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-all" style={{ color: themeStyle.uiText }}><ZoomOut className="w-4 h-4" /></button>
              <button onClick={() => setZoom(z => Math.min(2.5, z + 0.2))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-all" style={{ color: themeStyle.uiText }}><ZoomIn className="w-4 h-4" /></button>
              <button onClick={toggleFullscreen} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-all" style={{ color: themeStyle.uiText }}>
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* --- Flipbook Container --- */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden py-8 sm:py-12" onClick={() => setShowControls(!showControls)}>
        
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
            <p className="text-sm font-bold animate-pulse text-slate-400">কিতাব লোড হচ্ছে...</p>
          </div>
        ) : (
          <div 
            className="flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Navigation buttons */}
            {!isMobile && currentPage > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-10 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/40 text-white flex items-center justify-center transition-all active:scale-90 shadow-2xl border border-white/20"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            {!isMobile && currentPage < totalPages - 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-10 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/40 text-white flex items-center justify-center transition-all active:scale-90 shadow-2xl border border-white/20"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            <HTMLPageFlip
              width={isMobile ? 320 : 480}
              height={isMobile ? 480 : 640}
              size="stretch"
              minWidth={300}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              maxShadowOpacity={0.5}
              showCover={false}
              mobileScrollSupport={true}
              onFlip={onPageChange}
              className="book-flipbox"
              style={{ boxShadow: '0 50px 100px -20px rgba(0,0,0,0.4)' }}
              ref={bookRef}
              startPage={0}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={isMobile}
              startZIndex={0}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {[...Array(totalPages)].map((_, i) => (
                <Page key={i} theme={themeStyle}>
                  <div className="w-full h-full p-2 sm:p-4 flex flex-col">
                    <div className="flex-1 relative">
                       {pageImages.has(i + 1) ? (
                         <img 
                           src={pageImages.get(i + 1)} 
                           alt={`Page ${i + 1}`} 
                           className={`w-full h-full object-contain ${theme === 'dark' ? 'invert hue-rotate-180 brightness-90 contrast-125' : theme === 'sepia' ? 'sepia-[0.3]' : ''}`}
                           draggable={false}
                         />
                       ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-30">
                           <Loader2 className="w-6 h-6 animate-spin" />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">রেন্ডারিং {i + 1}</span>
                         </div>
                       )}
                    </div>
                    
                    {/* Spine gradient (only on double pages) */}
                    {!isMobile && (
                      <div className={`absolute top-0 bottom-0 w-24 pointer-events-none ${i % 2 === 0 ? 'right-0 bg-gradient-to-l from-black/[0.08] to-transparent' : 'left-0 bg-gradient-to-r from-black/[0.12] to-transparent'}`} />
                    )}
                    
                    {/* Page number */}
                    <div className="h-8 flex items-center justify-center">
                       <span className={`text-[10px] font-bold tracking-widest opacity-40 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{i + 1}</span>
                    </div>
                  </div>
                </Page>
              ))}
            </HTMLPageFlip>
          </div>
        )}
      </main>

      {/* --- Footer Controls --- */}
      <AnimatePresence>
        {showControls && !isLoading && (
          <motion.footer
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="px-4 py-4 z-50 shadow-2xl-top"
            style={{ backgroundColor: themeStyle.ui, borderTop: `1px solid ${themeStyle.border}` }}
          >
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-12">{currentPage + 1}</span>
                <input 
                  type="range"
                  min={0}
                  max={totalPages - 1}
                  value={currentPage}
                  onChange={(e) => bookRef.current?.pageFlip()?.flip(Number(e.target.value))}
                  className="flex-1 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-12 text-right">{totalPages}</span>
              </div>
              <div className="flex justify-center items-center gap-6">
                 <button onClick={goPrev} disabled={currentPage === 0} className="text-slate-400 hover:text-orange-500 disabled:opacity-20 transition-colors"><ChevronLeft className="w-8 h-8" /></button>
                 <div className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.3em]">অধ্যায় পঠন</div>
                 <button onClick={goNext} disabled={currentPage >= totalPages - 1} className="text-slate-400 hover:text-orange-500 disabled:opacity-20 transition-colors"><ChevronRight className="w-8 h-8" /></button>
              </div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .book-flipbox {
          background-color: transparent !important;
        }
        .page {
          background-color: transparent !important;
        }
        .page-content {
          box-shadow: inset 0 0 100px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.05);
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: #EA580C;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
