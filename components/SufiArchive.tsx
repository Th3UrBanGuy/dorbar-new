"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, Book, ChevronLeft, Search, Play, 
  Download, ExternalLink, Lock, Clock, Info,
  AlertCircle, Loader2, Shield
} from "lucide-react";
import Link from "next/link";
import { getSufiArchive, KalamItem, KitabItem } from "@/lib/api/archive";
import { Button } from "@/components/ui/button";

interface SufiArchiveProps {
  initialTab?: "kalam" | "kitab";
}

export default function SufiArchive({ initialTab = "kalam" }: SufiArchiveProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ kalam: KalamItem[], kitab: KitabItem[] }>({ kalam: [], kitab: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getSufiArchive();
        setData(result);
        setError(null);
      } catch (err) {
        setError("তথ্য লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredKalam = data.kalam.filter(k => 
    k.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    k.writer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredKitab = data.kitab.filter(k => 
    k.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    k.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-slate-500 font-medium">আর্কাইভ লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <p className="text-slate-700 font-bold">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-emerald-600">আবার চেষ্টা করুন</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Search & Tabs */}
      <div className="sticky top-20 z-40 bg-[#F8FAFC]/95 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder={activeTab === 'kalam' ? "কালামুজ কালাম খুঁজুন..." : "কিতাব খুঁজুন..."}
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-full sm:w-min">
          <button 
            onClick={() => setActiveTab("kalam")}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'kalam' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            কালাম
          </button>
          <button 
            onClick={() => setActiveTab("kitab")}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'kitab' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            কিতাব
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "kalam" ? (
          <motion.div 
            key="kalam-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4 pb-20"
          >
            {filteredKalam.length > 0 ? filteredKalam.map((kalam, i) => (
              <div key={kalam.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group overflow-hidden relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                      <Music className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                          {kalam.title}
                        </h4>
                        {kalam.is_mureed_only && (
                          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100 border text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                            <Lock className="w-2.5 h-2.5" /> Restricted
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium font-serif italic">{kalam.writer}</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Lyrics Preview with Preserve Whitespace */}
                <div className="mt-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 max-h-40 overflow-y-auto hide-scrollbar">
                  <pre className="text-sm text-slate-600 leading-relaxed font-sans whitespace-pre-wrap italic">
                    {kalam.content}
                  </pre>
                </div>

                <div className="mt-4 flex items-center justify-between">
                   <div className="flex gap-4">
                      <button className="text-[10px] font-bold text-emerald-600 flex items-center gap-1.5 hover:underline">
                        <Info className="w-3 h-3" /> Read More
                      </button>
                   </div>
                   {kalam.media_url && (
                    <a 
                      href={kalam.media_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                    >
                      <Download className="w-3 h-3" /> Download Audio
                    </a>
                   )}
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-bold">কোন কালাম খুঁজে পাওয়া যায়নি।</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="kitab-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-20"
          >
            {filteredKitab.length > 0 ? filteredKitab.map((kitab, i) => (
              <div key={kitab.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col items-start text-left">
                <div className="flex items-start justify-between w-full mb-6">
                  <div className="w-16 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 overflow-hidden relative shadow-inner">
                    <Book className="w-8 h-8 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      KITAB
                    </span>
                    {kitab.is_mureed_only && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 rounded-full text-[9px] font-bold text-white uppercase tracking-tighter">
                        <Shield className="w-2.5 h-2.5" /> মুরিদ এক্সেস
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {kitab.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-4">{kitab.author}</p>
                
                <p className="text-xs text-slate-400 line-clamp-2 mb-6 flex-1 italic leading-relaxed">
                  {kitab.description}
                </p>

                <div className="flex items-center justify-between w-full pt-6 border-t border-slate-50">
                   <div className="flex gap-4">
                      <a href={kitab.book_url} download className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors">
                        <Download className="w-4 h-4" />
                      </a>
                   </div>
                   <a 
                    href={kitab.book_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center gap-2"
                   >
                     পুরোটা পড়ুন <ChevronLeft className="w-4 h-4 rotate-180" />
                   </a>
                </div>
              </div>
            )) : (
              <div className="col-span-1 sm:col-span-2 text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                <p className="text-slate-400 font-bold">কোন কিতাব খুঁজে পাওয়া যায়নি।</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
