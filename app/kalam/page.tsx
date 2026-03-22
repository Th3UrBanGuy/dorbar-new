"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Music, Search, Play, Clock, Star } from "lucide-react";

const KALAMS = [
  { 
    id: "1", 
    title: "Ya Nabi Salam Alayka", 
    artist: "Maher Zain", 
    duration: "4:50", 
    category: "Naat",
    lyrics: "Anta noorul laahi fajran\nJi'ta ba'dal 'usri yusran\nRabbuna a'laaka qadran\nYa Imam al Anbiya'i..."
  },
  { 
    id: "2", 
    title: "Mustafa Jaan e Rehmat pe Lakhon Salam", 
    artist: "Imam Ahmed Raza Khan", 
    duration: "8:12", 
    category: "Salam",
    lyrics: "Mustafa jaan-e-rehmat pe laakhon salaam\nSham-e-bazm-e-hidayat pe laakhon salaam..."
  },
  { 
    id: "3", 
    title: "Balaghal Ula Bi Kamalihi", 
    artist: "Traditional", 
    duration: "5:30", 
    category: "Hamd",
    lyrics: "Balaghal-ula bi-kamalihi\nKashafad-duja bi-jamalihi\nHasunat jami'u khisalihi\nSallu 'alayhi wa alihi..."
  }
];

export default function KalamListing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Kalam & Naat</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
          <Search className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        
        {/* Featured Section */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Featured Kalam</h2>
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative h-48 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl shadow-rose-900/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-500"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-80">Popular Now</span>
              <h3 className="text-3xl font-bold mb-1">Ya Nabi Salam Alayka</h3>
              <p className="text-rose-100 font-medium">Maher Zain • Naat</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Play className="w-8 h-8 fill-current" />
            </div>
          </motion.div>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">All Kalams</h2>
          {KALAMS.map((kalam, i) => (
            <Link href={`/kalam/${kalam.id}`} key={kalam.id}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-rose-200 transition-all group shadow-sm hover:shadow-md mb-3"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-rose-600 transition-colors">{kalam.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">{kalam.artist} • {kalam.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">{kalam.duration}</span>
                   </div>
                   <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                      <Star className="w-4 h-4" />
                   </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation Placeholder */}
    </div>
  );
}
