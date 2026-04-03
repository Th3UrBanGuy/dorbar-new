"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, Music, Play, Pause, Download, 
  Share2, Copy, Check, Loader2, AlertCircle,
  Heart, Volume2, SkipBack, SkipForward, Repeat
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface KalamData {
  id: number;
  title: string;
  content: string;
  writer: string;
  mediaUrl: string | null;
  category: string;
  isMureedOnly: boolean;
}

export default function KalamDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [kalam, setKalam] = useState<KalamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const contentRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    async function fetchKalam() {
      try {
        setLoading(true);
        const res = await fetch(`/api/kalams/${id}`);
        if (res.ok) {
          const data = await res.json();
          setKalam(data.kalam);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchKalam();
  }, [id]);

  const handleCopy = () => {
    if (contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (kalam?.content) {
      navigator.clipboard.writeText(kalam.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse">কালাম লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!kalam) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">কালামটি পাওয়া যায়নি</h2>
        <p className="text-slate-500 mb-6">দুঃখিত, এই কালামটি আমাদের আর্কাইভে নেই অথবা আইডি টি ভুল।</p>
        <Button onClick={() => router.back()} className="bg-emerald-600 rounded-full px-8">ফিরে যান</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-20">
      
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-emerald-600 to-[#F8FAFC] -z-10 opacity-10"></div>
      
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl px-4 h-16 flex items-center justify-between border-b border-white/20">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none mb-1">Kalam Archive</span>
           <span className="text-xs font-bold text-slate-800 truncate max-w-[150px] leading-none">{kalam.title}</span>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-sm">
          <Share2 className="w-4 h-4" />
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pt-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block w-16 h-16 rounded-[2rem] bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 mb-4 mx-auto">
            <Music className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 tracking-tight">{kalam.title}</h1>
          <p className="text-emerald-700 font-serif font-bold italic text-lg">{kalam.writer}</p>
        </motion.div>

        {/* Floating Player */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 mb-10 shadow-xl shadow-emerald-900/5 border border-white"
        >
          <div className="flex flex-col gap-6">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
               <div className="absolute left-0 top-0 h-full w-1/3 bg-emerald-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">01:45</span>
              <div className="flex items-center gap-6 sm:gap-8">
                <SkipBack className="w-5 h-5 text-slate-300 cursor-not-allowed" />
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                </button>
                <SkipForward className="w-5 h-5 text-slate-300 cursor-not-allowed" />
              </div>
              <span className="text-[10px] font-bold text-slate-400">04:30</span>
            </div>

            <div className="flex items-center justify-center gap-10 border-t border-slate-50 pt-6">
               <button className="text-slate-400 hover:text-rose-500 transition-colors">
                 <Heart className="w-5 h-5" />
               </button>
               <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                 <Volume2 className="w-5 h-5" />
               </button>
               <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                 <Repeat className="w-5 h-5" />
               </button>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
             <Music className="w-64 h-64 -rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-l-4 border-emerald-500 pl-3">লিরিক্স / কথা</h2>
               <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-[10px] font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100"
               >
                 {copied ? <><Check className="w-3 h-3" /> কপি করা হয়েছে</> : <><Copy className="w-3 h-3" /> কপি করুন</>}
               </button>
            </div>

            <pre ref={contentRef} className="text-lg sm:text-xl text-slate-700 leading-relaxed font-sans whitespace-pre-wrap italic text-center drop-shadow-sm font-medium">
              {kalam.content}
            </pre>
            
            <div className="mt-16 flex flex-col items-center gap-6">
               <div className="w-12 h-0.5 bg-emerald-100 rounded-full"></div>
               {kalam.mediaUrl && (
                <a 
                  href={kalam.mediaUrl} 
                  download 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-full text-sm font-bold shadow-xl shadow-black/10 hover:bg-black transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> ডাউনলোড করুন অডিও
                </a>
               )}
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
