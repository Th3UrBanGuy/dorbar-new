"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Library, Search, Book, Download, ExternalLink } from "lucide-react";

const KITABS = [
  { id: "1", title: "Fatawa-e-Razvia", author: "Imam Ahmed Raza Khan", category: "Fiqh", pages: 1200, status: "Rare" },
  { id: "2", title: "Kimya-e-Saadat", author: "Imam Ghazali", category: "Tasawwuf", pages: 450, status: "Classical" },
  { id: "3", title: "Kanzul Iman", author: "Imam Ahmed Raza Khan", category: "Tafsir", pages: 800, status: "New" }
];

export default function KitabListing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Digital Kitab</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
          <Search className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {KITABS.map((kitab, i) => (
            <motion.div 
              key={kitab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-6">
                 <div className="w-16 h-20 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 overflow-hidden relative shadow-inner">
                    <Book className="w-8 h-8 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                 </div>
                 <div className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {kitab.category}
                 </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">{kitab.title}</h3>
              <p className="text-xs text-slate-500 font-medium mb-6">{kitab.author}</p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                 <div className="flex gap-4">
                    <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                 </div>
                 <button className="px-5 py-2 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                    Read Now
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
