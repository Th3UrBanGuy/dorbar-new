"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Share2, BookmarkPlus, Search, X, Copy, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { fetchHadithApiPage } from "@/app/actions/hadith";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";

export interface HadithItem {
  hadithnumber: number;
  arabicText: string;
  bengaliPhonetic: string;
  bengaliText: string;
  reference: { book: number; hadith: number };
  sourceHint?: string;
}

const formatSourceName = (source?: string) => {
   if (!source) return "";
   const s = source.toLowerCase();
   if (s.includes("bukhari")) return "সহিহ বুখারি";
   if (s.includes("muslim")) return "সহিহ মুসলিম";
   if (s.includes("tirmidhi")) return "সুনান আত-তিরমিজি";
   if (s.includes("abudawud")) return "সুনান আবু দাউদ";
   if (s.includes("ibnmajah")) return "সুনান ইবনে মাজাহ";
   if (s.includes("nasai")) return "সুনান আন-নাসাঈ";
   if (s.includes("alkafi")) return "উসূল আল-কাফী";
   if (s.includes("nahj")) return "নাহজুল বালাগা";
   const cleanName = source.replace(/Sunni - |Shia - |HadithAPI - |\x2Ejson/gi, "");
   return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
}

interface HadithItemListProps {
  hadiths: HadithItem[];
  collectionId: string;
  collectionName: string;
  isHadithApi?: boolean;
  hadithApiBookSlug?: string;
  hadithApiTotalPages?: number;
}

export function HadithItemList({ hadiths, collectionId, collectionName, isHadithApi, hadithApiBookSlug, hadithApiTotalPages }: HadithItemListProps) {
  const INITIAL = 12;
  const BATCH = 10;
  const [count, setCount] = useState(INITIAL);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<HadithItem[]>(hadiths);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { updateLastReadHadith, addHadithXP } = useProgress();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const loadMore = useCallback(() => {
    if (isHadithApi) {
      if (isLoadingMore || (hadithApiTotalPages && page >= hadithApiTotalPages)) return;
      setIsLoadingMore(true);
      fetchHadithApiPage(hadithApiBookSlug!, page + 1).then(data => {
         if (data && data.hadiths && data.hadiths.data) {
           const newItems = data.hadiths.data.map((item: any) => ({
             hadithnumber: Number(item.hadithNumber),
             arabicText: item.hadithArabic || "",
             bengaliPhonetic: item.hadithArabic ? transliterateArabicToBengali(item.hadithArabic) : "",
             bengaliText: item.hadithEnglish || item.hadithUrdu || "Translation missing",
             reference: { book: 1, hadith: Number(item.hadithNumber) }
           }));
           setItems(prev => [...prev, ...newItems]);
           setPage(p => p + 1);
         }
         setIsLoadingMore(false);
      }).catch(() => setIsLoadingMore(false));
    } else {
      setCount((c) => Math.min(c + BATCH, items.length));
    }
    addHadithXP(5); // Add XP for reading more
  }, [items.length, addHadithXP, isHadithApi, isLoadingMore, page, hadithApiTotalPages, hadithApiBookSlug]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "600px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  useEffect(() => {
    if (items.length > 0) {
      updateLastReadHadith({
        id: collectionId,
        name: collectionName,
        subInfo: `Hadith ${items[0].hadithnumber}`,
        url: `/hadith/${collectionId}`
      });
      addHadithXP(2); // XP for opening a collection
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId, collectionName]);

  const filteredHadiths = items.filter(h => {
    if (!searchQuery) return true;
    // ...
  });

  const handleCopyShare = async (hadith: HadithItem, isShare = false) => {
    const textToShare = `*${collectionName} - Hadith ${hadith.hadithnumber}*\n\n${hadith.arabicText}\n\n${hadith.bengaliText}\n\n- Read via Dorbar App`;
    
    if (isShare && navigator.share) {
      try { await navigator.share({ title: 'Hadith', text: textToShare }); } 
      catch (err) { /* User cancelled or rejected */ }
    } else {
      try {
        await navigator.clipboard.writeText(textToShare);
        setCopiedId(hadith.hadithnumber);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) { console.error("Clipboard failed"); }
    }
    
    addHadithXP(3); // Reward the user for sharing/copying knowledge
  };

  const visible = searchQuery ? filteredHadiths : (isHadithApi ? filteredHadiths : filteredHadiths.slice(0, count));
  const hasMore = !searchQuery && (isHadithApi ? (page < (hadithApiTotalPages || 1)) : (count < filteredHadiths.length));

  return (
    <div className="flex flex-col gap-8">
      
      {/* Expandable Search Bar */}
      <div className="sticky top-24 z-30 flex justify-end mb-2 pointer-events-none">
        <div className="pointer-events-auto">
          {isSearchExpanded || searchQuery ? (
            <div className="relative w-[calc(100vw-48px)] sm:w-80 min-w-[280px] animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-emerald-500" />
              </div>
              <input
                autoFocus
                type="text"
                placeholder="হাদিস খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 bg-white/95 backdrop-blur-md border border-emerald-200 rounded-full shadow-xl shadow-emerald-900/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 font-bengali text-slate-800 transition-all font-medium"
              />
              <button 
                onClick={() => { setIsSearchExpanded(false); setSearchQuery(""); }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className="p-4 bg-white/95 backdrop-blur-md rounded-full shadow-lg shadow-emerald-900/5 border border-slate-100 text-slate-500 hover:text-emerald-500 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {visible.map((hadith) => (
        <div
          key={hadith.hadithnumber}
          className="group relative bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-emerald-100 transition-all"
        >
          <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-emerald-50 text-emerald-600 shadow-sm">
                {hadith.hadithnumber}
              </div>
              {hadith.sourceHint ? (
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full tracking-wide font-bengali border border-slate-200/50 shadow-sm">
                  {formatSourceName(hadith.sourceHint)}
                </span>
              ) : hadith.reference && hadith.reference.book > 0 && (
                <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full uppercase tracking-wider border border-slate-100">
                  Book {hadith.reference.book}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors active:scale-95"
                onClick={() => handleCopyShare(hadith, false)}
                title="কপি করুন"
              >
                {copiedId === hadith.hadithnumber ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button 
                className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors active:scale-95"
                onClick={() => {
                  updateLastReadHadith({
                    id: collectionId,
                    name: collectionName,
                    subInfo: `Hadith ${hadith.hadithnumber}`,
                    url: `/hadith/${collectionId}`
                  });
                  addHadithXP(1);
                }}
                title="বুকমার্ক করুন"
              >
                <BookmarkPlus className="w-4 h-4" />
              </button>
              <button 
                className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors active:scale-95"
                onClick={() => handleCopyShare(hadith, true)}
                title="শেয়ার করুন"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-8 pl-4 sm:pl-10">
            <p className="text-3xl sm:text-4xl font-arabic leading-[2] text-right text-slate-800 tracking-wide font-medium" dir="rtl">
              {hadith.arabicText}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 tracking-wider mb-2 font-bengali">বাংলা উচ্চারণ</h4>
              <p className="text-base text-slate-600 font-medium italic font-bengali leading-relaxed">
                {hadith.bengaliPhonetic}
              </p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <h4 className="text-[10px] font-bold text-emerald-600 tracking-wider mb-2 font-bengali">অর্থ (বাংলা)</h4>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bengali">
                {hadith.bengaliText}
              </p>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
          <span className="ml-3 text-sm text-slate-400 font-medium">
            {count}/{hadiths.length} হাদিস
          </span>
        </div>
      )}
    </div>
  );
}
