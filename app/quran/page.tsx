"use client";

import { useState, useEffect } from "react";
import { BookOpen, Heart, LogOut, Search, Headphones, Bell, Grid, List, ChevronDown, BookHeart, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useProgress } from "@/hooks/use-progress";

export default function QuranDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggle, isFavorite } = useFavorites("quran-favorites");
  const { progress, quranLevel, quranNextLevelXP, isLoaded } = useProgress();

  useEffect(() => {
    async function initialize() {
      try {
        const res = await fetch("/data/quran/meta.json");
        const json = await res.json();
        if (json.code === 200 && json.data && json.data.surahs) {
          setSurahs(json.data.surahs.references);
        }
      } catch (error) {
        console.error("Error fetching local Surahs:", error);
      } finally {
        setLoading(false);
        setIsMounted(true);
      }
    }
    initialize();
  }, []);

  const filteredSurahs = searchQuery
    ? surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number.toString() === searchQuery
    )
    : surahs;

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        {/* Logo */}
        <Link href="/" className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
          <Image src="/4.png" alt="Logo" fill className="object-cover" />
        </Link>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <Link href="/quran" className="text-emerald-500 relative flex justify-center w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>
            <BookOpen className="w-6 h-6" />
          </Link>
          <Link href="/hadith" className="text-slate-400 hover:text-emerald-500 transition-colors">
            <BookHeart className="w-6 h-6" />
          </Link>
          <Link href="/favorites" className="text-slate-400 hover:text-emerald-500 transition-colors">
            <Heart className="w-6 h-6" />
          </Link>
        </nav>

        {/* Bottom Icons */}
        <div className="flex flex-col gap-8 items-center mb-4">
          <Link href="/" className="text-slate-400 hover:text-emerald-500 transition-colors">
            <LogOut className="w-6 h-6" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 bg-white sticky top-0 border-b border-slate-100 sm:border-none">
          {/* Title Toggle & Mobile Actions */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-4 sm:gap-6 text-xl sm:text-3xl">
              <Link
                href="/quran"
                className="font-bold transition-colors text-slate-900 font-bengali"
              >
                কুরআন
              </Link>
              <Link
                href="/hadith"
                className="font-bold transition-colors text-slate-400 font-medium hover:text-slate-600 font-bengali"
              >
                হাদিস
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search & Actions (Desktop) */}
          <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="সূরা খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-3 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm font-bengali"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
              <Headphones className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
              <Bell className="w-5 h-5" />
            </button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 h-auto font-medium hidden lg:flex font-bengali">
              সাপোর্ট
            </Button>
          </div>
        </header>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-6 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="সূরা খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bengali"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-24 md:pb-10 flex flex-col xl:flex-row gap-10">

          {/* Left: Surah Grid */}
          <div className="flex-1 flex flex-col gap-8 order-2 xl:order-1">

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50 p-2 rounded-2xl">
              <div className="flex items-center gap-2 px-2">
                <button className="p-2 rounded-lg transition-colors text-slate-800">
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                  <List className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100 font-bengali">
                  অবতীর্ণের ক্রম
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all bg-white text-slate-800 shadow-sm border border-slate-100 font-bengali">
                  <span className="text-slate-400 font-normal mr-1">সাজান</span>
                  সূরার নম্বর
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
              {loading ? (
                 Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-40 animate-pulse">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-10 h-10 bg-slate-50 rounded-full"></div>
                          <div className="w-6 h-6 bg-slate-50 rounded-full"></div>
                       </div>
                       <div className="flex justify-between mt-auto">
                          <div className="w-24 h-4 bg-slate-100 rounded-lg"></div>
                          <div className="w-16 h-4 bg-slate-100 rounded-lg"></div>
                       </div>
                    </div>
                 ))
              ) : (
                filteredSurahs.map((surah) => (
                  <div key={surah.number} className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                    <Link href={`/quran/${surah.number}`} className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-slate-50 text-slate-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      {surah.number}
                    </Link>
                    <button
                      onClick={(e) => { e.preventDefault(); toggle(String(surah.number)); }}
                      className="transition-colors z-10"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${isFavorite(String(surah.number)) ? "text-rose-500 fill-rose-500" : "text-slate-300 group-hover:text-emerald-400"}`}
                      />
                    </button>
                  </div>

                  <Link href={`/quran/${surah.number}`} className="flex-1 flex flex-col justify-end">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{surah.englishName}</h3>
                    <h4 className="text-2xl font-arabic text-emerald-600 mb-3 text-right" dir="rtl">{surah.name.replace('سُورَةُ ', '')}</h4>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <p className="text-xs text-slate-500 font-medium">
                        {surah.englishNameTranslation}
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider font-bengali">
                        {surah.numberOfAyahs} আয়াত
                      </p>
                    </div>
                  </Link>
                </div>
              )))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full xl:w-80 flex flex-col gap-8 shrink-0 order-1 xl:order-2">
            {/* Profile */}
            <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-3xl border border-emerald-100">
              <div>
                <p className="text-emerald-600 text-[11px] mb-1 font-bengali tracking-wider font-semibold">আসসালামু আলাইকুম,</p>
                <h2 className="text-xl font-bold text-slate-800 font-bengali">মোহাম্মদ জাবেল</h2>
                {isLoaded && (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5 font-bengali">লেভেল {quranLevel}</p>
                    <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(progress.quranXP / quranNextLevelXP) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-1.5 font-bold text-right font-bengali">{progress.quranXP} / {quranNextLevelXP} এক্সপি</p>
                  </div>
                )}
              </div>
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-emerald-200 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-600 rounded-t-full"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#FCD5CE] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Last Read */}
            {isLoaded && progress.lastReadQuran && (
              <Link href={progress.lastReadQuran.url} className="flex items-center justify-between group cursor-pointer bg-slate-50 p-4 rounded-3xl hover:bg-slate-100 transition-colors border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2 font-bengali">সবশেষ পঠিত</h4>
                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{progress.lastReadQuran.name}</h3>
                  <p className="text-sm text-slate-500 font-bengali tracking-wide">{progress.lastReadQuran.subInfo}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
              </Link>
            )}
          </aside>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হোম</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-emerald-500">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">কুরআন</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হাদিস</span>
        </Link>
      </nav>
    </div>
  );
}
