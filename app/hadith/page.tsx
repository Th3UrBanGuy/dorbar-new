"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen, Heart, LogOut,
  Search, Headphones, Bell, Grid, List, ChevronDown,
  BookHeart, LibraryBig, FileText, ChevronLeft
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";

const HADITH_COLLECTIONS = [
  { id: "bukhari", name: "Sahih Bukhari", arabic: "صحيح البخاري", author: "Imam Muhammad al-Bukhari", total: 7563, active: true },
  { id: "muslim", name: "Sahih Muslim", arabic: "صحيح مسلم", author: "Imam Muslim ibn al-Hajjaj", total: 3033, active: false },
  { id: "abudawud", name: "Sunan Abu Dawud", arabic: "سنن أبي داود", author: "Imam Abu Dawud", total: 5274, active: false },
  { id: "tirmidhi", name: "Jami' At-Tirmidhi", arabic: "جامع الترمذي", author: "Imam at-Tirmidhi", total: 3956, active: false },
  { id: "nasai", name: "Sunan An-Nasa'i", arabic: "سنن النسائي", author: "Imam an-Nasa'i", total: 5758, active: false },
  { id: "ibnmajah", name: "Sunan Ibn Majah", arabic: "سنن ابن ماجه", author: "Imam Ibn Majah", total: 4341, active: false },
  { id: "malik", name: "Muwatta Malik", arabic: "موطأ مالك", author: "Imam Malik", total: 1858, active: false }
];

export default function HadithDashboardPage() {
  const [activeTab, setActiveTab] = useState("Hadith");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const { toggle, isFavorite } = useFavorites("hadith-favorites");

  const filteredCollections = HADITH_COLLECTIONS.filter(col => 
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        {/* Logo */}
        <Link href="/" className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
          <Image src="/image.png" alt="Logo" fill className="object-cover" />
        </Link>

        {/* Navigation Icons */}
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
                onClick={() => setActiveTab("Quran")}
                className={`font-bold transition-colors ${activeTab === "Quran" ? "text-slate-900" : "text-slate-400 font-medium hover:text-slate-600"}`}
              >
                Quran
              </Link>
              <Link 
                href="/hadith"
                className={`font-bold transition-colors ${activeTab === "Hadith" ? "text-slate-900" : "text-slate-400 font-medium"}`}
              >
                Hadith
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
                placeholder="Search Hadith Collections..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-3 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
            
            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
              <Headphones className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
              <Bell className="w-5 h-5" />
            </button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 h-auto font-medium hidden lg:flex">
              Support
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-24 md:pb-10 flex flex-col xl:flex-row gap-10">
          
          {/* Left: Collections Grid */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50 p-2 rounded-2xl">
              <div className="flex items-center gap-2 px-2">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all bg-white text-slate-800 shadow-sm border border-slate-100`}>
                  <span className="text-slate-400 font-normal mr-1">Sort by</span>
                  Authenticity
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
              {filteredCollections.map((collection, i) => (
                <Link href={`/hadith/${collection.id}`} key={collection.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer h-full flex flex-col ${
                      collection.active 
                        ? "bg-white border-emerald-100 shadow-[0_8px_30px_rgb(16,185,129,0.12)]" 
                        : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm ${
                        collection.active ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors"
                      }`}>
                        <LibraryBig className="w-6 h-6" />
                      </div>
                      <button 
                        onClick={(e) => { e.preventDefault(); toggle(collection.id); }}
                        className="transition-colors z-10"
                      >
                        <Heart className={`w-5 h-5 transition-colors ${isFavorite(collection.id) ? "text-rose-500 fill-rose-500" : "text-slate-300 group-hover:text-emerald-400"}`} />
                      </button>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{collection.name}</h3>
                      <h4 className="text-lg font-arabic text-emerald-600 mb-2" dir="rtl">{collection.arabic}</h4>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                        <p className="text-xs text-slate-400 font-medium truncate max-w-[140px] tracking-wide" title={collection.author}>
                          {collection.author}
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase">
                          {collection.total} Hadith
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full xl:w-80 flex flex-col gap-8 shrink-0">
            
            {/* Profile */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm mb-1">Salam,</p>
                <h2 className="text-2xl font-bold text-slate-800">Tanvir</h2>
              </div>
              <div className="w-14 h-14 rounded-full bg-emerald-100 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-emerald-200 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-emerald-600 rounded-t-full"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FCD5CE] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Last Read */}
            <div className="flex items-center justify-between group cursor-pointer">
              <div>
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Continue Reading</h4>
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">Sahih Bukhari</h3>
                <p className="text-sm text-slate-500">Book of Revelation</p>
              </div>
              <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                <FileText className="w-10 h-10" />
              </div>
            </div>

            {/* Daily Hadith Widget */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden mt-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <BookHeart className="w-5 h-5 text-emerald-100" />
                  <h4 className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Hadith of the Day</h4>
                </div>
                
                <h3 className="text-2xl font-arabic text-right mb-4 leading-[1.6] opacity-90" dir="rtl">
                  إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
                </h3>
                
                <p className="text-sm leading-relaxed mb-6 font-medium text-emerald-50">
                  "Actions are dependent upon their intentions..."
                </p>
                <Link href="/hadith/bukhari" className="text-xs font-bold text-white hover:text-emerald-100 transition-colors inline-flex items-center gap-1">
                  Read Sahih Bukhari
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Quran</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-emerald-500">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Hadith</span>
        </Link>
      </nav>
    </div>
  );
}
