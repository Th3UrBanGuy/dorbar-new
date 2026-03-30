import React from "react";
import { ArrowLeft, BookOpen, Heart, LogOut, Search, Activity, BookHeart } from "lucide-react";

export default function SurahReaderLoading() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800">

      {/* Desktop Sidebar (Static duplicate for instant shell render) */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen border-r border-slate-200/50">
        <div className="w-14 h-14 rounded-full bg-slate-200 animate-pulse border-2 border-white shadow-lg"></div>
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <BookOpen className="w-6 h-6 text-emerald-300" />
          <BookHeart className="w-6 h-6 text-slate-300" />
          <Heart className="w-6 h-6 text-slate-300" />
        </nav>
        <div className="flex flex-col gap-8 items-center mb-4">
          <LogOut className="w-6 h-6 text-slate-300" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">

        {/* Dynamic Header Skeleton */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 sticky top-0 border-b border-emerald-100/50 bg-gradient-to-r from-emerald-500 to-teal-600 shadow-sm animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <ArrowLeft className="w-5 h-5 opacity-50" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-8 w-48 bg-white/20 rounded-lg mb-2"></div>
            <div className="h-4 w-32 bg-white/20 rounded-lg"></div>
          </div>
          <div className="w-10 h-10 opacity-0"></div>
        </header>

        {/* Ayah List UI Skeleton */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 sm:py-10 pb-24 md:pb-10">
           <div className="max-w-4xl mx-auto flex flex-col gap-8">

              {/* Bismillah Skeleton */}
              <div className="flex justify-center mb-8">
                 <div className="w-64 h-16 bg-slate-100 rounded-2xl animate-pulse"></div>
              </div>

              {/* Skeleton Ayah Cards */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm animate-pulse">
                  <div className="mb-8 w-full flex justify-end">
                     <div className="w-full sm:w-3/4 h-16 bg-slate-100 rounded-2xl"></div>
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="w-full h-12 bg-slate-50 rounded-xl"></div>
                     <div className="w-3/4 h-12 bg-emerald-50/50 rounded-xl"></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation (Static) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe">
          <Activity className="w-6 h-6 text-slate-300" />
          <BookOpen className="w-6 h-6 text-emerald-300" />
          <BookHeart className="w-6 h-6 text-slate-300" />
      </nav>
    </div>
  );
}
