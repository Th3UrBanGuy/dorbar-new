"use client";
import { useState, useEffect } from "react";
import {
  BookOpen, Heart, LogOut, Search, Headphones, Bell, ChevronLeft,
  Activity, Moon, HeartHandshake, Sparkles, Shield, Flame, Users, BookHeart, FileText,
  Droplets, MapPin, Smile, Briefcase, ShieldAlert, BookHeart as KnowledgeIcon, Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProgress } from "@/hooks/use-progress";
import { useUser } from "@/hooks/use-user";

const ICON_MAP: Record<string, any> = {
  Activity, Moon, HeartHandshake, Sparkles, Shield, Flame, Users, Heart,
  Droplets, MapPin, BookOpen, Smile, Briefcase, ShieldAlert, BookHeart: KnowledgeIcon, Star
};

export default function HadithDashboardPage() {
  const [activeTab, setActiveTab] = useState("Hadith");
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { progress, hadithLevel, hadithNextLevelXP, isLoaded } = useProgress();

  useEffect(() => {
    fetch("/data/topics.json")
      .then(res => res.json())
      .then(data => { setTopics(data); setIsLoading(false); })
      .catch(err => { console.error("Error loading topics:", err); setIsLoading(false); });
  }, []);

  const filteredTopics = topics.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto hide-scrollbar border-r border-slate-200/50">
        <Link href="/" className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
          <Image src="/4.png" alt="Logo" fill className="object-cover" />
        </Link>
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <Link href="/quran" className="text-slate-400 hover:text-emerald-500 transition-colors">
            <BookOpen className="w-6 h-6" />
          </Link>
          <Link href="/hadith" className="text-emerald-500 relative flex justify-center w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>
            <BookHeart className="w-6 h-6" />
          </Link>
          <Link href="/favorites" className="text-slate-400 hover:text-emerald-500 transition-colors">
            <Heart className="w-6 h-6" />
          </Link>
        </nav>
        <div className="flex flex-col gap-8 items-center mb-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-emerald-500 transition-colors">
            <LogOut className="w-6 h-6" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 bg-white sticky top-0 border-b border-slate-100 sm:border-none">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-4 sm:gap-6 text-xl sm:text-3xl font-bengali">
              <Link
                href="/quran"
                onClick={() => setActiveTab("Quran")}
                className={`font-bold transition-colors ${activeTab === "Quran" ? "text-slate-900" : "text-slate-400 font-medium hover:text-slate-600"}`}
              >
                কুরআন
              </Link>
              <Link
                href="/hadith"
                className={`font-bold transition-colors ${activeTab === "Hadith" ? "text-slate-900" : "text-slate-400 font-medium"}`}
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
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search & Actions (Desktop) */}
          <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="বিষয় খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-3 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm font-bengali"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-24 md:pb-10 flex flex-col xl:flex-row gap-10">

          {/* Left: Collections Grid */}
          <div className="flex-1 flex flex-col gap-8 order-2 xl:order-1 pt-6 sm:pt-0">
            {/* Subject Info Header */}
            <div className="flex flex-col gap-2">
               <h2 className="text-3xl font-bold text-slate-800 font-bengali">বিষয়ভিত্তিক হাদিস</h2>
               <p className="text-slate-500 font-bengali mb-4">আপনার পছন্দের বিষয়ের উপর বিশুদ্ধ হাদিসগুলো পড়ুন</p>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {isLoading ? (
                /* Skeleton Loading Grid */
                Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-48 animate-pulse">
                     <div className="w-14 h-14 bg-slate-100 rounded-2xl mb-6"></div>
                     <div className="w-3/4 h-6 bg-slate-100 rounded-lg mb-2"></div>
                     <div className="w-1/2 h-4 bg-slate-50 rounded-lg mt-auto"></div>
                  </div>
                ))
              ) : (
                filteredTopics.map((t: any) => {
                  const IconIcon = ICON_MAP[t.icon] || BookOpen;
                  return (
                    <Link 
                      href={`/topics/${t.id}`} key={t.id}
                      className="group bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
                    >
                      {/* Interactive Background Glow */}
                      <div className="absolute inset-0 bg-slate-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                      
                      {/* Sweeping Corner Glow */}
                      <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-br ${t.color || 'from-emerald-400 to-emerald-600'} pointer-events-none`} />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 transition-all duration-500 shadow-md text-white bg-gradient-to-br ${t.color || 'from-emerald-400 to-emerald-500'} group-hover:scale-110 group-hover:shadow-emerald-500/30 group-hover:shadow-xl group-hover:-rotate-3`}>
                          <IconIcon className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-bengali group-hover:text-emerald-700 transition-colors duration-300 drop-shadow-sm mt-auto">{t.name}</h2>
                      </div>
                    </Link>
                  );
                })
              )}
              {(!isLoading && filteredTopics.length === 0) && (
                <div className="col-span-full text-center py-20 bg-emerald-50/50 rounded-3xl border border-emerald-100 shadow-sm mt-4">
                   <BookHeart className="w-10 h-10 text-emerald-300 mx-auto mb-3" />
                   <h3 className="text-lg font-bold text-emerald-900 mb-1 font-bengali">কোনো টপিক পাওয়া যায়নি</h3>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full xl:w-80 flex flex-col gap-8 shrink-0 order-1 xl:order-2 pb-10 xl:pt-14">

            {/* Profile */}
            <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-3xl border border-emerald-100">
              <div>
                <p className="text-emerald-600 text-[11px] mb-1 font-bengali tracking-wider font-semibold">আসসালামু আলাইকুম,</p>
                <h2 className="text-xl font-bold text-slate-800 font-bengali">মোহাম্মদ জাবেল</h2>
                {isLoaded && (
                  <div className="mt-3">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5 font-bengali">লেভেল {hadithLevel}</p>
                    <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(progress.hadithXP / hadithNextLevelXP) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-1.5 font-bold text-right font-bengali">{progress.hadithXP} / {hadithNextLevelXP} এক্সপি</p>
                  </div>
                )}
              </div>
              <div className="w-14 h-14 rounded-full bg-emerald-100 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                <Image src="https://picsum.photos/seed/avatar/100/100" alt="Profile" width={56} height={56} className="object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Last Read */}
            {isLoaded && progress.lastReadHadith && (
              <Link href={progress.lastReadHadith.url} className="flex items-center justify-between group cursor-pointer bg-slate-50 p-4 rounded-3xl hover:bg-slate-100 transition-colors border border-slate-100 shadow-sm hover:shadow-md">
                <div>
                  <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-2 font-bengali">সবশেষ পঠিত</h4>
                  <h3 className="text-md font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{progress.lastReadHadith.name}</h3>
                  <p className="text-xs text-slate-500 tracking-wide font-medium">{progress.lastReadHadith.subInfo}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
              </Link>
            )}

            {/* Daily Hadith Widget */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden mt-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <BookHeart className="w-5 h-5 text-emerald-100" />
                  <h4 className="text-xs font-bold text-emerald-100 uppercase tracking-wider font-bengali">আজকের হাদিস</h4>
                </div>

                <h3 className="text-3xl font-arabic text-center mb-6 leading-[1.8] opacity-90 drop-shadow-md" dir="rtl">
                  إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
                </h3>

                <p className="text-sm leading-relaxed mb-6 font-medium text-emerald-50 text-center font-bengali">
                  "নিশ্চয় সকল মানুষের আমল তার নিয়তের ওপর নির্ভরশীল..."
                </p>
                <div className="mt-auto flex justify-center pt-4">
                  <Link href="/topics/faith" className="text-[11px] font-bold text-teal-900 bg-white/95 hover:bg-white px-5 py-2.5 rounded-full transition-colors inline-flex items-center shadow-lg font-bengali">
                    ঈমানের হাদিস পড়ুন
                  </Link>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হোম</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <Activity className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">কুরআন</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-emerald-500">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হাদিস</span>
        </Link>
      </nav>
    </div>
  );
}
