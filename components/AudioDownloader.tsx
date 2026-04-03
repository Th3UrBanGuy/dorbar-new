"use client";

import { useState } from "react";
import { QARIS } from "@/lib/qaris";
import { DownloadCloud, CheckCircle2, Loader2, Trash2, Settings2, X, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AudioDownloader({ cacheManager }: { cacheManager: any }) {
  const { 
    selectedQari, changeQari, downloadedCount, totalCount, 
    isFullyDownloaded, isDownloading, downloadAll, removeDownload 
  } = cacheManager;

  const [isOpen, setIsOpen] = useState(false);
  const progress = Math.round((downloadedCount / totalCount) * 100) || 0;

  return (
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Expanded Controls */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/90 backdrop-blur-xl border border-emerald-100 p-5 rounded-[2rem] shadow-2xl w-72 pointer-events-auto"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-50">
               <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                 <Settings2 className="w-4 h-4" />
                 <span>অডিও সেটিংস</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                 <X className="w-4 h-4" />
               </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 block font-bengali">
                  ক্বারী নির্বাচন করুন
                </label>
                <select 
                  value={selectedQari}
                  onChange={(e) => changeQari(e.target.value)}
                  disabled={isDownloading}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bengali disabled:opacity-50"
                >
                  {QARIS.map(q => (
                    <option key={q.id} value={q.id}>{q.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                {isFullyDownloaded ? (
                   <button 
                     onClick={removeDownload}
                     className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 py-3 rounded-xl font-bold text-xs hover:bg-rose-50 hover:text-rose-500 transition-colors group font-bengali"
                   >
                     <CheckCircle2 className="w-4 h-4 group-hover:hidden" />
                     <span className="group-hover:hidden">অফলাইনে আছে</span>
                     <Trash2 className="w-4 h-4 hidden group-hover:block" />
                     <span className="hidden group-hover:inline">রিমুভ করুন</span>
                   </button>
                ) : isDownloading ? (
                   <div className="w-full">
                     <div className="flex items-center justify-between text-[10px] font-bold text-emerald-600 mb-2 px-1">
                        <span>ডাউনলোড হচ্ছে...</span>
                        <span>{progress}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full bg-emerald-500" 
                         animate={{ width: `${progress}%` }}
                         transition={{ duration: 0.3 }}
                       />
                     </div>
                   </div>
                ) : (
                   <button 
                     onClick={downloadAll}
                     className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all font-bengali shadow-lg shadow-emerald-500/20 active:scale-95"
                   >
                     <DownloadCloud className="w-4 h-4" />
                     অফলাইন ডাউনলোড ({totalCount})
                   </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Dock */}
      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex items-center gap-3 p-3 rounded-full shadow-xl border border-emerald-100/50 transition-all active:scale-90 ${isOpen ? 'bg-emerald-600 text-white border-transparent' : 'bg-white/80 backdrop-blur-md text-emerald-600'}`}
      >
        <div className="relative">
          {isDownloading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isFullyDownloaded ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Music className="w-6 h-6" />
          )}
          {isDownloading && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
          )}
        </div>
        
        {!isOpen && (
           <div className="flex flex-col items-start pr-2">
             <span className="text-[10px] font-bold leading-none uppercase tracking-tighter opacity-60">Audio</span>
             <span className="text-xs font-bold leading-none mt-1">
               {isDownloading ? `${progress}%` : isFullyDownloaded ? 'Offline' : 'Save'}
             </span>
           </div>
        )}
      </motion.button>

    </div>
  );
}
