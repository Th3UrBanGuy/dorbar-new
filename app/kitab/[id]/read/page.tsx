"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, Loader2, AlertCircle, RefreshCw, 
  Maximize, Download, X, MoreVertical, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getKitabById, KitabItem } from "@/lib/api/archive";
import { Button } from "@/components/ui/button";

export default function KitabReaderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [kitab, setKitab] = useState<KitabItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [key, setKey] = useState(0); // For forced reloads

  useEffect(() => {
    async function fetchKitab() {
      try {
        setLoading(true);
        const data = await getKitabById(Number(id));
        setKitab(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchKitab();
  }, [id]);

  const googleProxyUrl = kitab?.book_url 
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(kitab.book_url)}&embedded=true` 
    : "";

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse">রিডার ওপেন হচ্ছে...</p>
      </div>
    );
  }

  if (!kitab) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">কিতাবটি পাওয়া যায়নি</h2>
        <Button onClick={() => router.back()} className="bg-orange-600 rounded-full px-8 mt-4">ফিরে যান</Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col overflow-hidden select-none">
      
      {/* Reader Header */}
      <header className="h-14 sm:h-16 bg-[#1A1A1A] text-white flex items-center justify-between px-4 sm:px-6 relative z-10 border-b border-white/5">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <button 
            onClick={() => router.back()}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-90"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex flex-col min-w-0">
             <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest leading-none mb-1">Interactive Reader</span>
             <h1 className="text-sm font-bold truncate leading-none">{kitab.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ml-4">
           <button 
            onClick={() => setKey(prev => prev + 1)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all"
            title="Reload Frame"
           >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
           </button>
           <a 
            href={kitab.book_url} 
            download
            className="hidden xs:flex h-9 sm:h-10 px-4 rounded-xl items-center justify-center gap-2 bg-orange-600/20 text-orange-400 hover:bg-orange-600 hover:text-white font-bold text-xs transition-all border border-orange-500/30"
           >
              <Download className="w-4 h-4" /> ডাউনলোড
           </a>
        </div>
      </header>

      {/* Main Reader Frame */}
      <main className="flex-1 relative bg-slate-800">
        <AnimatePresence>
          {!iframeLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-800 text-white/50 gap-4"
            >
              <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-orange-500 animate-spin"></div>
              <p className="text-xs font-bold uppercase tracking-widest animate-pulse font-sans">গুগল প্রক্সি লোড হচ্ছে...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <iframe
          key={key}
          src={googleProxyUrl}
          className="w-full h-full border-none relative z-10"
          onLoad={() => setIframeLoaded(true)}
          allowFullScreen
          title={`Reader: ${kitab.title}`}
        />
      </main>

      {/* Bottom Tip (Mobile Only) */}
      <div className="md:hidden h-8 bg-[#1A1A1A] flex items-center justify-center border-t border-white/5">
         <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] font-sans">Swipe to navigate pages</p>
      </div>
    </div>
  );
}
