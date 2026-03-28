"use client";

import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";
import SufiArchive from "@/components/SufiArchive";

export default function KalamListing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans mb-20 sm:mb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">কালামুজ কালাম</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Kalam & Naat Archive</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6">
        <SufiArchive initialTab="kalam" />
      </main>
    </div>
  );
}
