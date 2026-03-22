"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Music, Share2, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HTMLPageFlip from "react-pageflip";

const KALAM_DATA = {
  "1": { 
    title: "Ya Nabi Salam Alayka", 
    artist: "Maher Zain",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/maher/400/400",
    pages: [
      "Anta noorul laahi fajran\nJi'ta ba'dal 'usri yusran\nRabbuna a'laaka qadran\nYa Imam al Anbiya'i\n\nAnta fil wijdani hayyun\nAnta lil 'aynayni dayyun\nAnta 'inda lhawdi riyyun\nAnta haadin wa safiyyun\n\nYa Habibi ya Muhammad\nYa Nabi salam 'alayka",
      "Ya Rasul salam 'alayka\nYa Habib salam 'alayka\nSalawatullaah 'alayka\n\nAsraka l-maula laylan\nLada l-bayti l-mu'adh-dham\nWa r-ruh al-Aminu salla\nBi-ka fi l-qudsi l-mukarram\n\nInnad dunya bi laa husnik\nZalaamun laa yuraa fiha"
    ]
  },
  "2": {
    title: "Mustafa Jaan e Rehmat",
    artist: "Raza Khan",
    audioUrl: null, // No audio
    cover: "https://picsum.photos/seed/raza/400/400",
    pages: [
      "Mustafa jaan-e-rehmat pe laakhon salaam\nSham-e-bazm-e-hidayat pe laakhon salaam\n\nShehr-e-yaar-e-iram taajdaar-e-haram\nNau bahars-e-shafa'at pe laakhon salaam\n\nHum ghareebon ke aaqa pe be-had durood\nHum gunaahgaar ummat pe laakhon salaam\n\nJis ke maathe shafa'at ka sehra raha\nUs jabeen-e-sa'adat pe laakhon salaam",
      "Jis ke aage sar-e-sarwaraa-n kham rahe\nUs quv-v-e-siyaadat pe laakhon salaam\n\nNoor-e-chashm-e-nubuwwat pe be-had durood\nJan-e-deen-o-shariat pe laakhon salaam\n\nKaun deta hai dene ko munh chahiye\nDene wala hai sacha pe laakhon salaam"
    ]
  }
};

export default function KalamReader(props: { params: Promise<{ id: string }> }) {
  const [params, setParams] = useState<{ id: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // Placeholder progress
  const bookRef = useRef<any>(null);

  useEffect(() => {
    props.params.then(setParams);
  }, [props.params]);

  if (!params) return null;
  const kalam = KALAM_DATA[params.id as keyof typeof KALAM_DATA] || KALAM_DATA["1"];

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans select-none overflow-hidden pb-32">
      
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-transparent sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/kalam" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{kalam.title}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kalam.artist}</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-rose-50 shadow-sm transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-10 perspective-[2000px] py-10">
        
        {/* The A4 Book Container with react-pageflip */}
        <div className="relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] rounded-r-2xl overflow-hidden bg-white">
          {/* @ts-ignore */}
          <HTMLPageFlip
            width={420}
            height={600}
            size="stretch"
            minWidth={300}
            maxWidth={450}
            minHeight={450}
            maxHeight={700}
            maxShadowOpacity={0.5}
            showCover={false}
            onFlip={onPage}
            ref={bookRef}
            className="kalam-book"
          >
            {kalam.pages.map((content, index) => (
              <div key={index} className="bg-white border-l border-slate-100 flex flex-col shadow-inner h-full">
                {/* Page Content */}
                <div className="p-8 sm:p-14 relative h-full flex flex-col">
                  {/* Subtle Paper Grain */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] opacity-[0.03] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-50">
                       <Music className="w-4 h-4 text-rose-500/20" />
                       <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Folio {index + 1}</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-lg sm:text-xl font-serif text-slate-800 leading-[2] text-center whitespace-pre-wrap italic">
                        {content}
                      </p>
                    </div>

                    <div className="mt-8 text-center pt-4 border-t border-slate-50">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khijiriya Darbar</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </HTMLPageFlip>

          {/* Spine Binding Effect Overlay */}
          <div className="absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-black/[0.08] via-black/[0.02] to-transparent pointer-events-none z-10" />
        </div>

        {/* Manual Controls */}
        <div className="mt-10 flex items-center gap-10">
           <button 
             onClick={() => bookRef.current.pageFlip().flipPrev()}
             className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors disabled:opacity-30"
             disabled={currentPage === 0}
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           <div className="px-6 py-2 bg-white rounded-full shadow-sm border border-slate-100 min-w-[100px] text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentPage + 1} / {kalam.pages.length}</span>
           </div>
           <button 
             onClick={() => bookRef.current.pageFlip().flipNext()}
             className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors disabled:opacity-30"
             disabled={currentPage === kalam.pages.length - 1}
           >
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>
      </main>

      {/* Spotify-Vibe Audio Player Layer */}
      <AnimatePresence>
        <motion.div 
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-50"
        >
           <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-white/10 flex items-center gap-4 sm:gap-6 relative overflow-hidden group">
              {/* Animated background glow */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-rose-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-rose-500/30 transition-colors" />

              {/* Cover Art / Status */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0 shadow-lg border border-white/5">
                {kalam.audioUrl ? (
                  <img src={kalam.cover} alt="Cover" className={`w-full h-full object-cover transition-transform duration-[10s] linear infinite ${isPlaying ? 'scale-110 rotate-3' : ''}`} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <Music className="w-6 h-6" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Info & Progress */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base truncate">{kalam.title}</h4>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                      {kalam.audioUrl ? kalam.artist : "No audio available"}
                    </p>
                  </div>
                  {kalam.audioUrl && (
                    <span className="text-slate-500 text-[10px] font-mono">01:42 / 04:50</span>
                  )}
                </div>

                {/* Spotify-style Progress Bar */}
                {kalam.audioUrl ? (
                  <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden group/progress cursor-pointer">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-rose-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                ) : (
                  <div className="h-1 w-full bg-white/5 rounded-full" />
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 sm:gap-6 ml-2 sm:ml-4">
                 <button className="hidden sm:block text-slate-500 hover:text-white transition-colors" disabled={!kalam.audioUrl}>
                   <SkipBack className="w-5 h-5 fill-current" />
                 </button>
                 <button 
                   onClick={() => kalam.audioUrl && setIsPlaying(!isPlaying)}
                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${kalam.audioUrl ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-lg' : 'bg-white/5 text-slate-600 cursor-not-allowed'}`}
                 >
                   {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                 </button>
                 <button className="hidden sm:block text-slate-500 hover:text-white transition-colors" disabled={!kalam.audioUrl}>
                   <SkipForward className="w-5 h-5 fill-current" />
                 </button>
                 <button className="hidden md:block text-slate-500 hover:text-white transition-colors">
                    <Volume2 className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

