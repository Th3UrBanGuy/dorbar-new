"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw, Flame, Award, Plus, History, Settings2, Sparkles, X, Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BEAD_THEMES = [
  { id: 'wood', color: '#8B4513', name: 'Cedar Wood', primary: 'radial-gradient(circle at 30% 30%, #D4A373, #8B4513)' },
  { id: 'onyx', color: '#1A1A1A', name: 'Midnight Onyx', primary: 'radial-gradient(circle at 30% 30%, #4A4A4A, #000000)' },
  { id: 'emerald', color: '#065F46', name: 'Royal Emerald', primary: 'radial-gradient(circle at 30% 30%, #34D399, #064E3B)' },
  { id: 'pearl', color: '#F3F4F6', name: 'Ocean Pearl', primary: 'radial-gradient(circle at 30% 30%, #FFFFFF, #E5E7EB)' },
  { id: 'lapis', color: '#1E3A8A', name: 'Lapis Lazuli', primary: 'radial-gradient(circle at 30% 30%, #60A5FA, #1E3A8A)' },
];

interface DuaSet {
  id: string;
  name: string;
  target: number;
  count: number;
  round: number;
  total: number;
  isCustom?: boolean;
}

const DEFAULT_DUAS: DuaSet[] = [
  { id: 'subhanallah', name: 'SubhanAllah', target: 33, count: 0, round: 0, total: 0 },
  { id: 'alhamdulillah', name: 'Alhamdulillah', target: 33, count: 0, round: 0, total: 0 },
  { id: 'allahuakbar', name: 'Allahu Akbar', target: 34, count: 0, round: 0, total: 0 },
  { id: 'astaghfirullah', name: 'Astaghfirullah', target: 100, count: 0, round: 0, total: 0 },
  { id: 'durood', name: 'Durood-e-Ibrahimi', target: 100, count: 0, round: 0, total: 0 },
];

export default function Tasbih() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [duaSets, setDuaSets] = useState<DuaSet[]>(DEFAULT_DUAS);
  const [activeId, setActiveId] = useState<string>('subhanallah');
  
  const [activeTheme, setActiveTheme] = useState(BEAD_THEMES[2]); // Emerald
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Modals
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Custom form
  const [customName, setCustomName] = useState("");
  const [customTarget, setCustomTarget] = useState("100");

  const activeDua = duaSets.find(d => d.id === activeId) || duaSets[0];

  // Load from local storage
  useEffect(() => {
    const savedDuas = localStorage.getItem('tasbih_duas');
    const savedActive = localStorage.getItem('tasbih_active_id');
    const savedThemeId = localStorage.getItem('tasbih_theme');
    
    if (savedDuas) {
      try {
        setDuaSets(JSON.parse(savedDuas));
      } catch (e) {
        console.error("Failed to parse tasbih_duas");
      }
    }
    if (savedActive) setActiveId(savedActive);
    if (savedThemeId) {
      const theme = BEAD_THEMES.find(t => t.id === savedThemeId);
      if (theme) setActiveTheme(theme);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tasbih_duas', JSON.stringify(duaSets));
      localStorage.setItem('tasbih_active_id', activeId);
      localStorage.setItem('tasbih_theme', activeTheme.id);
    }
  }, [duaSets, activeId, activeTheme, isLoaded]);

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
    
    setDuaSets(prev => prev.map(d => {
      if (d.id === activeId) {
        const nextCount = d.count + 1;
        if (nextCount >= d.target) {
          return { ...d, count: 0, round: d.round + 1, total: d.total + 1 };
        }
        return { ...d, count: nextCount, total: d.total + 1 };
      }
      return d;
    }));

    setTimeout(() => setIsAnimating(false), 200);
  }, [isAnimating, activeId, playFeedBack]);

  const resetCount = () => {
    if (confirm(`Reset current session for ${activeDua.name}?`)) {
      setDuaSets(prev => prev.map(d => {
        if (d.id === activeId) {
          return { ...d, count: 0, round: 0 };
        }
        return d;
      }));
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customTarget.trim() || isNaN(Number(customTarget))) return;
    
    const newDua: DuaSet = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      target: Number(customTarget),
      count: 0,
      round: 0,
      total: 0,
      isCustom: true
    };
    
    setDuaSets(prev => [...prev, newDua]);
    setActiveId(newDua.id);
    setIsAddModalOpen(false);
    setIsSelectModalOpen(false);
    setCustomName("");
    setCustomTarget("100");
  };

  const handleDeleteDua = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this custom Dua?")) {
      setDuaSets(prev => prev.filter(d => d.id !== id));
      if (activeId === id) setActiveId(duaSets[0].id);
    }
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  // Curved Path Logic
  const beadIndices = [-3, -2, -1, 0, 1, 2, 3];
  const radius = 180;
  const spacing = 28; // degrees

  return (
    <div className="flex-1 bg-[#F8FAFC] relative flex flex-col text-slate-800 min-h-screen select-none overflow-x-hidden font-sans pb-safe">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/mandala.svg')] bg-center bg-no-repeat bg-contain scale-150 transform rotate-12" />
      </div>

      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-100/50 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-xl tracking-tight">Tasbih</h1>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 active:scale-90 transition-transform hover:bg-emerald-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 flex flex-col relative z-10 pb-6">
        
        {/* Progress Card */}
        <div className="px-6 pt-6">
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            
            <div className="flex justify-between items-start relative z-10">
              <div 
                className="space-y-1 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsSelectModalOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Zikr</span>
                  <ChevronLeft className="w-3 h-3 text-emerald-500 rotate-180" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 break-words line-clamp-2">{activeDua.name}</h2>
              </div>
              <button 
                onClick={() => setIsSelectModalOpen(true)}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 rounded-full shrink-0 ml-2"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 flex items-end justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="42%" stroke="#F1F5F9" strokeWidth="10%" fill="none" />
                    <motion.circle 
                      cx="50%" cy="50%" r="42%" stroke="#10B981" strokeWidth="10%" fill="none" 
                      strokeDasharray={176}
                      animate={{ strokeDashoffset: Math.max(0, 176 - (176 * activeDua.count) / activeDua.target) }}
                      transition={{ type: "spring", stiffness: 50 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[10px] sm:text-xs font-bold text-slate-700">{Math.round((activeDua.count/activeDua.target)*100)}%</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter">{activeDua.count}</span>
                    <span className="text-slate-400 font-medium text-sm sm:text-base">/{activeDua.target}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1">
                     <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Round: {String(activeDua.round).padStart(2, '0')}</span>
                     <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total: {activeDua.total}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={resetCount} 
                  className="p-2 sm:px-4 sm:py-2 rounded-full bg-slate-50 text-slate-600 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center gap-2"
                  title="Reset counter"
                >
                  <RotateCcw className="w-4 h-4 sm:w-3 sm:h-3" /> <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Curved Bead Area */}
        <div className="flex-1 relative flex items-center justify-center mt-4">
          
          {/* Main Counter Layer (Background Number) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[12rem] sm:text-[20rem] font-bold tracking-tighter">{activeDua.count}</span>
          </div>

          <div 
            className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center cursor-pointer overflow-hidden touch-manipulation"
            onClick={handleIncrement}
          >
            {/* The Arc String */}
            <svg className="absolute w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
               <path 
                 d="M -100 250 A 250 250 0 0 1 500 250" 
                 fill="none" 
                 stroke="#64748B" 
                 strokeWidth="1.5"
                 strokeDasharray="4 4"
               />
            </svg>

            {/* Simulated 3D Bead Arc */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <AnimatePresence mode="popLayout">
                {beadIndices.map(idx => {
                  const angle = idx * spacing;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);
                  const isCenter = idx === 0;

                  return (
                    <motion.div
                      key={`${activeDua.count}-${idx}`}
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
                      className="absolute w-14 h-14 sm:w-20 sm:h-20"
                      style={{ zIndex: 10 - Math.abs(idx) }}
                    >
                      <div 
                        className="w-full h-full rounded-full shadow-lg border border-white/20 relative"
                        style={{ background: activeTheme.primary }}
                      >
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/30 rounded-full blur-[2px]" />
                        <div className="absolute inset-0 rounded-full shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.1)]" />
                        
                        {isCenter && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                             <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white/40" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="absolute bottom-6 flex flex-col items-center gap-2">
            <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Tap Anywhere</p>
            <div className="w-1 h-6 bg-gradient-to-b from-slate-200 to-transparent rounded-full" />
          </div>
        </div>

        {/* Theme Selector Section */}
        <div className="px-6 mt-auto self-end w-full">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm overflow-x-auto hide-scrollbar">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Bead Theme</span>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 truncate ml-2">{activeTheme.name}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {BEAD_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTheme(theme);
                  }}
                  className={`relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] sm:rounded-2xl transition-all ${activeTheme.id === theme.id ? 'ring-2 ring-emerald-500 ring-offset-2 sm:ring-offset-4 scale-105 sm:scale-110 shadow-lg z-10' : 'opacity-60 scale-90 hover:opacity-100'}`}
                  style={{ background: theme.primary }}
                  title={theme.name}
                >
                  <div className="absolute inset-0 rounded-[1rem] sm:rounded-2xl shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.2)]" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Select/History Modal */}
      <AnimatePresence>
        {isSelectModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setIsSelectModalOpen(false)}
          >
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col max-h-[85vh] shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Select Zikr</h3>
                  <p className="text-xs text-slate-500 mt-1">Choose a preset or your custom targets</p>
                </div>
                <button 
                  onClick={() => setIsSelectModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 flex-1 space-y-2 pb-safe">
                {duaSets.map(dua => (
                  <div 
                    key={dua.id}
                    onClick={() => { setActiveId(dua.id); setIsSelectModalOpen(false); }}
                    className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer border ${activeId === dua.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-transparent bg-slate-50 hover:bg-slate-100/80'} transition-all group`}
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm sm:text-base text-slate-800 truncate">{dua.name}</h4>
                        {dua.isCustom && <span className="text-[9px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">Custom</span>}
                      </div>
                      <p className="text-xs text-slate-500 font-medium tracking-tight">
                        Target: {dua.target} • Total: {dua.total}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {dua.isCustom && (
                        <button 
                          onClick={(e) => handleDeleteDua(dua.id, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all sm:flex hidden"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${activeId === dua.id ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 text-transparent'}`}>
                        {activeId === dua.id && <Check className="w-3.5 h-3.5" />}
                      </div>
                      
                      {/* Mobile delete visible always in a different styled way or kept hidden if we want minimal UI, but users need to delete custom duas. Let's make it visible on mobile inside the row. */}
                      {dua.isCustom && (
                        <button 
                          onClick={(e) => handleDeleteDua(dua.id, e)}
                          className="w-8 h-8 rounded-full sm:hidden flex items-center justify-center text-slate-400 bg-slate-100 ml-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full mt-2 p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-2 text-slate-500 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all hover:bg-emerald-50/30"
                >
                  <Plus className="w-5 h-5" /> Add Custom Zikr
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-6 sm:p-8 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Settings2 className="w-6 h-6 text-emerald-600" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Custom Target</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">Create a new Zikr entry with your preferred phrase and repetition target.</p>
              
              <form onSubmit={handleAddCustom} className="space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Name / Phrase</label>
                  <input 
                    type="text" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Istighfar"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Target Number</label>
                  <input 
                    type="number" 
                    value={customTarget}
                    onChange={(e) => setCustomTarget(e.target.value)}
                    placeholder="100"
                    min="1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-emerald-500 text-white rounded-xl sm:rounded-2xl py-3.5 sm:py-4 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 active:scale-[0.98] transition-all mt-6 sm:mt-8"
                >
                  Create Zikr
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
