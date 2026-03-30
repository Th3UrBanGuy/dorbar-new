import React from "react";
import { ArrowLeft, BookOpen, Heart, LogOut, Activity, BookHeart, LayoutDashboard } from "lucide-react";

export default function CollectionReaderLoading() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800">

      {/* Desktop Sidebar (Static duplicate for instant shell render) */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen border-r border-slate-200/50">
        <div className="w-14 h-14 rounded-full bg-slate-200 animate-pulse border-2 border-white shadow-lg"></div>
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <BookOpen className="w-6 h-6 text-slate-300" />
          <BookHeart className="w-6 h-6 text-emerald-300" />
          <Heart className="w-6 h-6 text-slate-300" />
        </nav>
        <div className="flex flex-col gap-8 items-center mb-4">
          <LogOut className="w-6 h-6 text-slate-300" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F4F7FB]">
         
        {/* Dynamic Header Skeleton */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 sticky top-0 bg-[#F4F7FB]/90 backdrop-blur-xl animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="h-8 w-48 bg-slate-200 rounded-lg mb-2"></div>
              <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </header>

        {/* Hadith List UI Skeleton */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-10 pb-24 md:pb-10 pt-4">
           <div className="max-w-4xl mx-auto flex flex-col gap-8">
              {/* Skeleton Search Bar */}
              <div className="sticky top-0 z-30 flex justify-end mb-2 pt-4">
                 <div className="w-14 h-14 bg-white rounded-full animate-pulse shadow-sm border border-slate-100"></div>
              </div>

              {/* Skeleton Cards */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm animate-pulse">
                  <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                        <div className="w-20 h-6 bg-slate-50 rounded-full"></div>
                     </div>
                  </div>
                  <div className="mb-8 w-full flex justify-end">
                     <div className="w-3/4 h-12 bg-slate-100 rounded-xl"></div>
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="w-full h-16 bg-slate-50 rounded-xl"></div>
                     <div className="w-full h-24 bg-emerald-50/50 rounded-xl"></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation (Static) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe">
          <LayoutDashboard className="w-6 h-6 text-slate-300" />
          <BookOpen className="w-6 h-6 text-slate-300" />
          <BookHeart className="w-6 h-6 text-emerald-300" />
      </nav>
    </div>
  );
}
