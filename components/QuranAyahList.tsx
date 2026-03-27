"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, Heart } from "lucide-react";

interface AyahTuple {
  arabic: { numberInSurah: number; text: string };
  bengali: { numberInSurah: number; text: string };
  bengaliPhonetic: string;
}

export function QuranAyahList({ ayahs }: { ayahs: AyahTuple[] }) {
  const INITIAL = 12;
  const BATCH = 10;
  const [count, setCount] = useState(INITIAL);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setCount((c) => Math.min(c + BATCH, ayahs.length));
  }, [ayahs.length]);

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

  const visible = ayahs.slice(0, count);
  const hasMore = count < ayahs.length;

  return (
    <div className="flex flex-col gap-8">
      {visible.map((ayahTuple) => (
        <div
          key={ayahTuple.arabic.numberInSurah}
          className="group relative bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-emerald-100 transition-all"
        >
          <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-emerald-50 text-emerald-600">
              {ayahTuple.arabic.numberInSurah}
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-8 pl-4 sm:pl-10">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-arabic leading-[1.8] text-right text-slate-800" dir="rtl">
              {ayahTuple.arabic.text}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Bangla Uccharon (Phonetic)</h4>
              <p className="text-base sm:text-lg text-slate-600 font-medium italic font-bengali leading-relaxed">
                {ayahTuple.bengaliPhonetic}
              </p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
              <h4 className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-2">Meaning (Bangla)</h4>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bengali">
                {ayahTuple.bengali.text}
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
            {count}/{ayahs.length} আয়াত
          </span>
        </div>
      )}
    </div>
  );
}
