"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, BookOpen, Heart, LogOut, ChevronLeft, Search, Bell, Activity, BookHeart
} from "lucide-react";
import { HadithItemList } from "@/components/HadithItemList";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";
import { useUser } from "@/hooks/use-user";

export default function TopicReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [topic, setTopic] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { hasTag, isLoaded } = useUser();

  useEffect(() => {
    setIsMounted(true);
    fetch("/data/topics.json")
      .then(res => res.json())
      .then(data => {
         setTopics(data);
         const found = data.find((t: any) => t.id === id);
         setTopic(found);
      })
      .catch(console.error);
  }, [id]);

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Strict RBAC Filter: Remove Shia hadiths unless the user has the "Special" tag
  let secureItems = topic.items;
  if (isLoaded && !hasTag("Special")) {
     secureItems = secureItems.filter((item: any) => !item.source?.toLowerCase().includes("shia"));
  }

  const hadiths = secureItems.map((item: any, i: number) => ({
     hadithnumber: item.hadithnumber || i + 1,
     arabicText: item.arabicText || "Arabic missing",
     bengaliText: item.bengaliText || "Translation missing",
     bengaliPhonetic: item.arabicText ? transliterateArabicToBengali(item.arabicText) : "",
     reference: item.reference || { book: 1, hadith: i + 1 },
     sourceHint: item.source
  }));

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

        {/* Dynamic Header */}
        <header className={`flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 sticky top-0 border-b border-slate-100/50 bg-gradient-to-r ${topic.color || 'from-white to-white'} shadow-sm`}>
          <div className="flex items-center gap-4">
            <Link 
              href="/hadith"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-md transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white font-bengali flex items-center gap-2 drop-shadow-md">
                <BookOpen className="w-5 h-5 text-white/80" />
                {topic.name}
              </h1>
            </div>
          </div>
        </header>

        {/* Hadith List UI Container */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 sm:py-10 pb-24 md:pb-10">
           <div className="max-w-4xl mx-auto">
             {!isMounted ? (
                /* Instant Mount Skeleton */
                <div className="flex flex-col gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm animate-pulse h-64"></div>
                  ))}
                </div>
             ) : (
                <HadithItemList 
                   collectionId={topic.id}
                   collectionName={`Topic: ${topic.name}`}
                   hadiths={hadiths}
                   isHadithApi={false}
                />
             )}
           </div>
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
