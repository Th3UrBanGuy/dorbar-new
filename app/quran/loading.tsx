import React from "react";
import { BookOpen, Heart, LogOut, ChevronLeft, Search, Bell, Grid, Activity, BookHeart } from "lucide-react";

export default function QuranDashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800">

      {/* Desktop Sidebar */}
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

        {/* Header Skeleton */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 bg-white sticky top-0 border-b border-slate-100 sm:border-none animate-pulse">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-20 h-8 bg-slate-100 rounded-lg"></div>
              <div className="w-20 h-8 bg-slate-50 rounded-lg"></div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto">
             <div className="w-64 h-12 bg-slate-50 rounded-full"></div>
             <div className="w-12 h-12 bg-slate-50 rounded-full"></div>
             <div className="w-12 h-12 bg-slate-50 rounded-full"></div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-24 md:pb-10 flex flex-col xl:flex-row gap-10">
          
          <div className="flex-1 flex flex-col gap-8 order-2 xl:order-1 pt-6 sm:pt-0">
             <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl animate-pulse">
                <div className="w-24 h-10 bg-slate-100 rounded-xl"></div>
                <div className="w-32 h-10 bg-slate-100 rounded-xl"></div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-5">
               {Array.from({ length: 9 }).map((_, i) => (
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
               ))}
             </div>
          </div>

          <aside className="w-full xl:w-80 flex flex-col gap-8 shrink-0 order-1 xl:order-2 pb-10 xl:pt-14 animate-pulse">
             <div className="bg-emerald-50/30 h-32 rounded-3xl border border-emerald-50"></div>
             <div className="bg-slate-50/50 h-32 rounded-3xl border border-slate-50"></div>
          </aside>

        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe">
          <Activity className="w-6 h-6 text-slate-300" />
          <BookOpen className="w-6 h-6 text-emerald-300" />
          <BookHeart className="w-6 h-6 text-slate-300" />
      </nav>
    </div>
  );
}
