"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw, Flame, Award, Plus, History, Settings2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BEAD_THEMES = [
  { id: 'wood', color: '#8B4513', name: 'Cedar Wood', primary: 'radial-gradient(circle at 30% 30%, #D4A373, #8B4513)' },
  { id: 'onyx', color: '#1A1A1A', name: 'Midnight Onyx', primary: 'radial-gradient(circle at 30% 30%, #4A4A4A, #000000)' },
  { id: 'emerald', color: '#065F46', name: 'Royal Emerald', primary: 'radial-gradient(circle at 30% 30%, #34D399, #064E3B)' },
  { id: 'pearl', color: '#F3F4F6', name: 'Ocean Pearl', primary: 'radial-gradient(circle at 30% 30%, #FFFFFF, #E5E7EB)' },
  { id: 'lapis', color: '#1E3A8A', name: 'Lapis Lazuli', primary: 'radial-gradient(circle at 30% 30%, #60A5FA, #1E3A8A)' },
];

export default function Tasbih() {
  const [count, setCount] = useState(23);
  const [target, setTarget] = useState(100);
  const [round, setRound] = useState(4);
  const [total, setTotal] = useState(434);
  const [activeTheme, setActiveTheme] = useState(BEAD_THEMES[2]); // Default to Emerald
  const [isAnimating, setIsAnimating] = useState(false);

  // Sound & Haptics
  const playFeedBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  }, []);

  const handleIncrement = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    playFeedBack();
    
    setCount(prev => {
      const next = prev + 1;
      if (next >= target) {
        setRound(r => r + 1);
        return 0;
      }
      return next;
    });
    setTotal(prev => prev + 1);

    setTimeout(() => setIsAnimating(false), 200);
  }, [isAnimating, target, playFeedBack]);

  const resetCount = () => {
    if (confirm("Reset current session?")) {
      setCount(0);
      setRound(0);
    }
  };

  // Curved Path Logic
  // We'll show 7 beads on an arc. The central one is active.
  const beadIndices = [-3, -2, -1, 0, 1, 2, 3];
  const radius = 180;
  const spacing = 28; // degrees

  return (
    <div className="flex-1 bg-[#F8FAFC] relative flex flex-col text-slate-800 min-h-screen select-none overflow-hidden font-sans">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0 bg-[url('/mandala.svg')] bg-center bg-no-repeat bg-contain scale-150 transform rotate-12" 
        />
      </div>

      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-xl tracking-tight">Tasbih</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 active:scale-90 transition-transform">
          <Plus className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 flex flex-col relative">
        
        {/* Progress Card */}
        <div className="px-6 pt-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Durood</span>
                <h2 className="text-2xl font-bold text-slate-800">Durood-e-Ibrahimi</h2>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Settings2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="#F1F5F9" strokeWidth="6" fill="none" />
                    <motion.circle 
                      cx="32" cy="32" r="28" stroke="#10B981" strokeWidth="6" fill="none" 
                      strokeDasharray={176}
                      animate={{ strokeDashoffset: 176 - (176 * count) / target }}
                      transition={{ type: "spring", stiffness: 50 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-700">{Math.round((count/target)*100)}%</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">{count}</span>
                    <span className="text-slate-400 font-medium">/{target}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Round: {String(round).padStart(2, '0')}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total: {total}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={resetCount} className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <History className="w-3 h-3" /> History
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Curved Bead Area */}
        <div className="flex-1 relative flex items-center justify-center mt-4">
          
          {/* Main Counter Layer (Background Number) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <span className="text-[20rem] font-bold tracking-tighter">{count}</span>
          </div>

          <div 
            className="relative w-full h-[500px] flex items-center justify-center cursor-pointer overflow-visible"
            onClick={handleIncrement}
          >
            {/* The Arc String */}
            <svg className="absolute w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 500">
               <path 
                 d="M -100 250 A 250 250 0 0 1 500 250" 
                 fill="none" 
                 stroke="#64748B" 
                 strokeWidth="1.5"
                 strokeDasharray="4 4"
               />
            </svg>

            {/* Simulated 3D Bead Arc */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {beadIndices.map(idx => {
                  const angle = idx * spacing;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);
                  const isCenter = idx === 0;

                  return (
                    <motion.div
                      key={`${count}-${idx}`}
                      initial={{ 
                        x: radius * Math.cos(((idx + 1) * spacing - 90) * (Math.PI / 180)),
                        y: radius * Math.sin(((idx + 1) * spacing - 90) * (Math.PI / 180)),
                        opacity: 0,
                        scale: 0.5 
                      }}
                      animate={{ 
                        x, 
                        y, 
                        opacity: 1 - Math.abs(idx) * 0.25,
                        scale: isCenter ? 1.2 : 0.8 - Math.abs(idx) * 0.1 
                      }}
                      exit={{ 
                        x: radius * Math.cos(((idx - 1) * spacing - 90) * (Math.PI / 180)),
                        y: radius * Math.sin(((idx - 1) * spacing - 90) * (Math.PI / 180)),
                        opacity: 0,
                        scale: 0.5 
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25,
                        mass: 0.5
                      }}
                      className="absolute w-16 h-16 sm:w-20 sm:h-20"
                      style={{ 
                        zIndex: 10 - Math.abs(idx),
                      }}
                    >
                      {/* Bead Visuals */}
                      <div 
                        className="w-full h-full rounded-full shadow-lg border border-white/20 relative"
                        style={{ background: activeTheme.primary }}
                      >
                        {/* Specular Highlight */}
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/30 rounded-full blur-[2px]" />
                        {/* Inner Shadow for Depth */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.1)]" />
                        
                        {/* Center Icon/Effect */}
                        {isCenter && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                             <Sparkles className="w-6 h-6 text-white/40" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {/* Center Focal Point Glow */}
            <div className="absolute w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Tap to Pull</p>
            <div className="w-1 h-8 bg-gradient-to-b from-slate-200 to-transparent rounded-full" />
          </div>
        </div>

        {/* Theme Selector Section */}
        <div className="px-6 pb-20 mt-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Bead Style</span>
              <span className="text-[10px] font-bold text-emerald-600">{activeTheme.name}</span>
            </div>
            <div className="flex justify-between items-center gap-3">
              {BEAD_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTheme(theme);
                  }}
                  className={`relative w-12 h-12 rounded-2xl transition-all ${activeTheme.id === theme.id ? 'ring-2 ring-emerald-500 ring-offset-4 scale-110 shadow-lg' : 'opacity-60 scale-90 hover:opacity-100'}`}
                  style={{ background: theme.primary }}
                >
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.2)]" />
                </button>
              ))}
              <button 
                className="w-12 h-12 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Bottom Navigation (Hidden for this immersive screen to give space) */}
    </div>
  );
}
