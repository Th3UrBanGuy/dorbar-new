"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Volume2, Heart, Pause, Play, Search, X, ToggleRight, ToggleLeft } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useAudioCache } from "@/hooks/use-audio-cache";
import { AudioDownloader } from "@/components/AudioDownloader";

interface AyahTuple {
  arabic: { number: number; numberInSurah: number; text: string };
  bengali: { numberInSurah: number; text: string };
  bengaliPhonetic: string;
}

export function QuranAyahList({ ayahs, surahId, surahName }: { ayahs: AyahTuple[], surahId: string, surahName: string }) {
  const INITIAL = 12;
  const BATCH = 10;
  const [count, setCount] = useState(INITIAL);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { updateLastReadQuran, addQuranXP } = useProgress();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Audio state
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ayahGlobalNumbers = useMemo(() => ayahs.map(a => a.arabic.number), [ayahs]);
  const cacheManager = useAudioCache(ayahGlobalNumbers);
  const [isAutoPlayMode, setIsAutoPlayMode] = useState(false);
  const autoPlayRef = useRef(false);
  useEffect(() => { autoPlayRef.current = isAutoPlayMode; }, [isAutoPlayMode]);

  const loadMore = useCallback(() => {
    setCount((c) => Math.min(c + BATCH, ayahs.length));
    addQuranXP(5); // Reward XP for scrolling deeper
  }, [ayahs.length, addQuranXP]);

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

  // Update bookmark on mount with first visible
  useEffect(() => {
    if (ayahs.length > 0) {
      updateLastReadQuran({
        id: surahId,
        name: surahName,
        subInfo: `Ayah No. 1`,
        url: `/quran/${surahId}`
      });
      addQuranXP(2);
    }
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surahId, surahName]);

  const toggleAudio = async (ayahGlobalNum: number, ayahLocalNum: number) => {
    if (playingId === ayahGlobalNum) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
         audioRef.current.pause();
         audioRef.current.src = "";
      } else {
         audioRef.current = new Audio();
      }
      
      const audioUrl = await cacheManager.getPlayableUrl(ayahGlobalNum);
      if (!audioRef.current) return;
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(e => console.error(e));
      setPlayingId(ayahGlobalNum);

      audioRef.current.onended = () => {
        setPlayingId(null);
        addQuranXP(10); // 10 XP for finishing an audio recitation

        // Auto-play next if enabled
        if (autoPlayRef.current) {
           const currentIndex = ayahs.findIndex(a => a.arabic.number === ayahGlobalNum);
           if (currentIndex !== -1 && currentIndex + 1 < ayahs.length) {
              const nextAyah = ayahs[currentIndex + 1];
              setTimeout(() => {
                toggleAudio(nextAyah.arabic.number, nextAyah.arabic.numberInSurah);
                const el = document.getElementById(`ayah-${nextAyah.arabic.numberInSurah}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 500);
           }
        }
      };

      // Also update bookmark when they explicitly play
      updateLastReadQuran({
        id: surahId,
        name: surahName,
        subInfo: `Ayah No. ${ayahLocalNum}`,
        url: `/quran/${surahId}#ayah-${ayahLocalNum}`
      });
    }
  };

  const filteredAyahs = ayahs.filter(a => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.arabic.text.includes(q) ||
      a.bengali.text.includes(q) ||
      a.bengaliPhonetic.toLowerCase().includes(q) ||
      a.arabic.number.toString() === q ||
      a.arabic.numberInSurah.toString() === q
    );
  });

  const visible = searchQuery ? filteredAyahs : filteredAyahs.slice(0, count);
  const hasMore = !searchQuery && (count < filteredAyahs.length);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Downloader & Auto-Play Header */}
      <div className="flex flex-col gap-4 sticky top-24 sm:top-28 z-40 bg-[#F4F7FB]/90 backdrop-blur-md pt-2 pb-4 px-2 -mx-2">
        <AudioDownloader cacheManager={cacheManager} />
        
        {/* Auto Play Toggle */}
        <div 
          className="flex items-center justify-between bg-white px-5 py-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:border-emerald-100 transition-colors" 
          onClick={() => setIsAutoPlayMode(!isAutoPlayMode)}
        >
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 font-bengali">অটো-প্লে (Auto-Play)</h3>
            <p className="text-[10px] text-slate-500 font-medium font-bengali mt-0.5">একটির পর একটি আয়াত স্বয়ংক্রিয়ভাবে চলতে থাকবে</p>
          </div>
          <div>
            {isAutoPlayMode ? <ToggleRight className="w-8 h-8 text-emerald-500" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative sticky top-[240px] sm:top-[260px] z-30">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-emerald-500" />
        </div>
        <input
          type="text"
          placeholder="আয়াত নম্বর, অর্থ বা শব্দ দিয়ে খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-4 bg-white border border-emerald-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-bengali text-slate-700 font-medium placeholder:text-slate-400"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {visible.map((ayahTuple) => {
        const globalNum = ayahTuple.arabic.number;
        const localNum = ayahTuple.arabic.numberInSurah;
        const isPlaying = playingId === globalNum;

        return (
          <div
            key={globalNum}
            id={`ayah-${localNum}`}
            className={`group relative bg-white border p-6 sm:p-8 rounded-[2rem] hover:shadow-md transition-all ${isPlaying ? 'border-emerald-500 shadow-emerald-500/10 shadow-lg' : 'border-slate-100 shadow-sm hover:border-emerald-100'}`}
          >
            <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isPlaying ? 'bg-emerald-500 text-white shadow-md' : 'bg-emerald-50 text-emerald-600'}`}>
                {localNum}
              </div>
              <div className="flex items-center gap-2 transition-opacity">
                <button 
                  onClick={() => toggleAudio(globalNum, localNum)}
                  className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-emerald-100 text-emerald-600 shadow-inner' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 bg-slate-50 opacity-0 group-hover:opacity-100'}`}
                  title={isPlaying ? "অডিও পজ করুন" : `অডিও প্লে করুন - ${cacheManager.selectedQari}`}
                >
                  {isPlaying ? <Pause className="w-5 h-5 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 bg-slate-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
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
                <h4 className="text-[10px] font-bold text-slate-400 tracking-wider mb-2 font-bengali">বাংলা উচ্চারণ</h4>
                <p className="text-base sm:text-lg text-slate-600 font-medium italic font-bengali leading-relaxed">
                  {ayahTuple.bengaliPhonetic}
                </p>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                <h4 className="text-[10px] font-bold text-emerald-600 tracking-wider mb-2 font-bengali">অর্থ (বাংলা)</h4>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bengali">
                  {ayahTuple.bengali.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}

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
