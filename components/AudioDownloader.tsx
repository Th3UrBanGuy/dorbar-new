"use client";

import { QARIS } from "@/lib/qaris";
import { DownloadCloud, CheckCircle2, Loader2, Trash2 } from "lucide-react";

export function AudioDownloader({ cacheManager }: { cacheManager: any }) {
  const { 
    selectedQari, changeQari, downloadedCount, totalCount, 
    isFullyDownloaded, isDownloading, downloadAll, removeDownload 
  } = cacheManager;

  const progress = Math.round((downloadedCount / totalCount) * 100) || 0;

  return (
    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Qari Selector */}
        <div className="w-full sm:w-auto flex-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 block font-bengali">
            ক্বারী নির্বাচন করুন (অডিও)
          </label>
          <select 
            value={selectedQari}
            onChange={(e) => changeQari(e.target.value)}
            disabled={isDownloading}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bengali disabled:opacity-50"
          >
            {QARIS.map(q => (
              <option key={q.id} value={q.id}>{q.name}</option>
            ))}
          </select>
        </div>

        {/* Download Action */}
        <div className="w-full sm:w-auto flex flex-col sm:items-end">
          {isFullyDownloaded ? (
             <button 
               onClick={removeDownload}
               className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-rose-50 hover:text-rose-500 transition-colors group font-bengali"
             >
               <CheckCircle2 className="w-4 h-4 group-hover:hidden" />
               <span className="group-hover:hidden">অফলাইনে সেভ করা আছে</span>
               <Trash2 className="w-4 h-4 hidden group-hover:block" />
               <span className="hidden group-hover:inline">ডিলিট করুন</span>
             </button>
          ) : isDownloading ? (
             <div className="w-full sm:w-auto flex flex-col items-center sm:items-end">
               <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-xl font-medium text-sm font-bengali">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 ডাউনলোড হচ্ছে... ({downloadedCount}/{totalCount})
               </div>
               <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
               </div>
             </div>
          ) : (
             <button 
               onClick={downloadAll}
               className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors font-bengali shadow-md shadow-emerald-500/20"
             >
               <DownloadCloud className="w-4 h-4" />
               অফলাইনের জন্য সেভ করুন 
             </button>
          )}
        </div>

      </div>
    </div>
  );
}
