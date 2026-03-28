"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, Book, Download, ExternalLink, 
  Share2, Loader2, AlertCircle, Info, Bookmark,
  Shield, Calendar, FileText, ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { getKitabById, KitabItem } from "@/lib/api/archive";
import { Button } from "@/components/ui/button";

export default function KitabDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [kitab, setKitab] = useState<KitabItem | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse">কিতাব লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!kitab) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">কিতাবটি পাওয়া যায়নি</h2>
        <p className="text-slate-500 mb-6">দুঃখিত, এই কিতাবটি আমাদের লাইব্রেরিতে নেই অথবা আইডি টি ভুল।</p>
        <Button onClick={() => router.back()} className="bg-orange-600 rounded-full px-8">ফিরে যান</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pb-20">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500 to-[#F8FAFC] -z-10 opacity-5"></div>
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl px-4 h-16 flex items-center justify-between border-b border-white/20">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Library Detail</span>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-sm">
          <Share2 className="w-4 h-4" />
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Book Cover/Visuals (Col 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-[2.5rem] bg-orange-600 shadow-2xl shadow-orange-900/20 overflow-hidden flex items-center justify-center group mb-8">
              {/* Virtual Pages Effect */}
              <div className="absolute right-0 top-0 w-12 h-full bg-black/10 flex flex-col gap-1 items-end p-2 opacity-30">
                 {[...Array(20)].map((_, i) => <div key={i} className="w-full h-[2px] bg-white/50"></div>)}
              </div>
              
              <Book className="w-24 h-24 text-white drop-shadow-xl" strokeWidth={1} />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-0.5 w-12 bg-white/40 mb-3 rounded-full"></div>
                <h4 className="text-white font-bold text-lg leading-tight line-clamp-2">{kitab.title}</h4>
              </div>
            </div>

            <div className="flex gap-4 w-full max-w-[280px]">
               <button className="flex-1 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center gap-2 text-slate-600 font-bold text-xs hover:bg-orange-50 hover:text-orange-600 transition-all">
                  <Bookmark className="w-4 h-4" /> সেভ করুন
               </button>
               <a 
                href={kitab.book_url} 
                download
                className="flex-1 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center gap-2 text-slate-600 font-bold text-xs hover:bg-blue-50 hover:text-blue-600 transition-all"
               >
                  <Download className="w-4 h-4" /> ডাউনলোড
               </a>
            </div>
          </motion.div>

          {/* Right: Metadata & Content (Col 7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-50 rounded-full text-[10px] font-bold text-orange-600 uppercase tracking-widest border border-orange-100">Digital Archive</span>
                {kitab.is_mureed_only && (
                  <span className="px-3 py-1 bg-slate-900 rounded-full text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shrink-0">
                    <Shield className="w-3 h-3" /> মুরিদ এক্সেস
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">{kitab.title}</h1>
              <p className="text-lg text-slate-500 font-medium">লেখক: <span className="text-orange-600 font-bold">{kitab.author}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white rounded-2xl border border-slate-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">সংযোজন</p>
                    <p className="text-xs font-bold text-slate-700">২০২৪-০৩-২৯</p>
                  </div>
               </div>
               <div className="p-4 bg-white rounded-2xl border border-slate-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">টাইপ</p>
                    <p className="text-xs font-bold text-slate-700">পিডিএফ (PDF)</p>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                 <Info className="w-4 h-4" />
                 <h2 className="text-xs font-bold uppercase tracking-widest">সংক্ষিপ্ত সারসংক্ষেপ</h2>
              </div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium italic">
                  {kitab.description}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href={`/kitab/${kitab.id}/read`}
                className="w-full h-16 rounded-[2rem] bg-[#1A1A1A] text-white flex items-center justify-center gap-3 text-lg font-bold shadow-2xl shadow-black/10 hover:bg-black transition-all active:scale-[0.98] group"
              >
                এখনই পড়ুন <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">Read directly in your browser or app</p>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
