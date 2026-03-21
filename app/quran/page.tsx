"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, Heart, LogOut, 
  Search, Headphones, Bell, Grid, List, ChevronDown, 
  FileText
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QuranPage() {
  const [activeTab, setActiveTab] = useState("Quran");
  const [viewMode, setViewMode] = useState("grid");
  const [activeSort, setActiveSort] = useState("Serial");

  const surahs = [
    { id: 1, name: "Al-Fatiah", translation: "THE OPENING", active: true },
    { id: 2, name: "Al-Baqarah", translation: "THE COW", active: false },
    { id: 3, name: "Al Imran", translation: "FAMILY OF IMRAN", active: false },
    { id: 4, name: "An-Nisa", translation: "THE WOMEN", active: false },
    { id: 5, name: "Al-Ma'idah", translation: "THE TABLE SPREAD", active: false },
    { id: 6, name: "Al-An'am", translation: "THE CATTLE", active: false },
    { id: 7, name: "Al-A'raf", translation: "THE HEIGHTS", active: false },
    { id: 8, name: "Al-Anfal", translation: "THE SPOILS OF WAR", active: false },
    { id: 9, name: "At-Tawbah", translation: "THE REPENTANCE", active: false },
    { id: 10, name: "Yunus", translation: "JONAH", active: false },
    { id: 11, name: "Hud", translation: "HUD", active: false },
    { id: 12, name: "Yusuf", translation: "JOSEPH", active: false },
    { id: 13, name: "Ar-Ra'd", translation: "THE THUNDER", active: false },
    { id: 14, name: "Ibrahim", translation: "ABRAHIM", active: false },
    { id: 15, name: "Al-Hijr", translation: "THE ROCKY TRACT", active: false },
    { id: 16, name: "An-Nahl", translation: "THE BEE", active: false },
  ];

  const sorts = ["Serial", "Alphabet", "Total Ayah", "Parah"];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto hide-scrollbar">
        {/* Logo */}
        <Link href="/" className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <BookOpen className="w-6 h-6" />
        </Link>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <Link href="/quran" className="text-emerald-500 relative flex justify-center w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>
            <BookOpen className="w-6 h-6" />
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
              <button 
                onClick={() => setActiveTab("Quran")}
                className={`font-bold transition-colors ${activeTab === "Quran" ? "text-slate-900" : "text-slate-400 font-medium"}`}
              >
                Quran
              </button>
              <button 
                onClick={() => setActiveTab("Hadith")}
                className={`font-bold transition-colors ${activeTab === "Hadith" ? "text-slate-900" : "text-slate-400 font-medium"}`}
              >
                Hadith
              </button>
            </div>
            
            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
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
                placeholder="Search" 
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
          
          {/* Left: Surah Grid */}
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
                {sorts.map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setActiveSort(sort)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      activeSort === sort 
                        ? "bg-white text-slate-800 shadow-sm border border-slate-100" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <span className="text-slate-400 font-normal mr-1">Sort by</span>
                    {sort}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {surahs.map((surah, i) => (
                <motion.div
                  key={surah.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    surah.active 
                      ? "bg-white border-emerald-100 shadow-[0_8px_30px_rgb(16,185,129,0.12)]" 
                      : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      surah.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                    }`}>
                      {surah.id}
                    </div>
                    <button className={`transition-colors ${surah.active ? "text-emerald-500" : "text-slate-300 group-hover:text-emerald-400"}`}>
                      <Heart className="w-5 h-5" fill={surah.active ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{surah.name}</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{surah.translation}</p>
                  </div>
                </motion.div>
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
                {/* Placeholder for Avatar */}
                <div className="w-full h-full bg-emerald-200 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-emerald-600 rounded-t-full"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FCD5CE] rounded-full"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-2 bg-white rounded-t-full"></div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Last Read */}
            <div className="flex items-center justify-between group cursor-pointer">
              <div>
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Last Read</h4>
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">Al-Fatiah</h3>
                <p className="text-sm text-slate-500">Ayah no: 1</p>
              </div>
              <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                <FileText className="w-10 h-10" strokeWidth={1.5} />
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Last Listened */}
            <div className="flex items-center justify-between group cursor-pointer">
              <div>
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Last Listened</h4>
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">Al-Ma&apos;idah</h3>
                <p className="text-sm text-slate-500">Ayah no: 3</p>
              </div>
              <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                <Headphones className="w-10 h-10" strokeWidth={1.5} />
              </div>
            </div>

            {/* Ayah of the Day */}
            <div className="bg-emerald-500 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-500/20 mt-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h4 className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-4">Ayah of the Day</h4>
              <p className="text-sm leading-relaxed mb-6 font-medium">
                It is Allah who erected the heavens without pillars that you [can] see; then He established Himself above the Throne ...
              </p>
              <Link href="#" className="text-xs font-bold text-white hover:text-emerald-100 transition-colors inline-flex items-center gap-1">
                Read now
              </Link>
            </div>

          </aside>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 flex justify-around items-center z-50 pb-safe">
        <Link href="/quran" className="flex flex-col items-center gap-1 text-emerald-500">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Quran</span>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Favorites</span>
        </Link>
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] font-medium">Back</span>
        </Link>
      </nav>
    </div>
  );
}
