"use client";

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronLeft, Compass, Settings, AlertCircle, RefreshCw } from 'lucide-react';
import { useQibla } from '@/hooks/useQibla';

type CompassSkin = 'classic' | 'midnight' | 'emerald' | 'antique';

export default function QiblaPage() {
  const { heading, qiblaDegree, error, hasPermission, requestCompassPermission, isCalibrating } = useQibla();
  const [activeSkin, setActiveSkin] = useState<CompassSkin>('midnight');

  // Ensure heading is smooth and clamped
  const normalizedHeading = heading || 0;
  // Calculate relative rotation (the compass dial rotates counter to the heading so N always points North)
  const compassRotation = -normalizedHeading; 
  
  // Qibla needle is basically fixed relative to the compass dial, 
  // pointing at the qibla degree off North.
  const qiblaNeedleRotation = qiblaDegree || 0;

  // Skins definitions
  const skins: Record<CompassSkin, { name: string, bg: string, ring: string, text: string, needle: string, qibla: string }> = {
    midnight: {
      name: "Midnight",
      bg: "bg-[#0B1221]",
      ring: "border-[#1E293B] bg-gradient-to-br from-[#1E293B] to-[#0F172A]",
      text: "text-blue-200",
      needle: "bg-red-500",
      qibla: "text-amber-400"
    },
    classic: {
      name: "Classic",
      bg: "bg-white",
      ring: "border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-xl shadow-amber-900/10",
      text: "text-slate-800",
      needle: "bg-red-600",
      qibla: "text-emerald-600"
    },
    emerald: {
      name: "Emerald",
      bg: "bg-[#064E3B]",
      ring: "border-[#047857] bg-gradient-to-br from-[#059669] to-[#064E3B]",
      text: "text-emerald-100",
      needle: "bg-white",
      qibla: "text-yellow-400"
    },
    antique: {
      name: "Antique",
      bg: "bg-[#78350F]",
      ring: "border-[#92400E] bg-gradient-to-br from-[#B45309] to-[#78350F]",
      text: "text-orange-100",
      needle: "bg-[#A3E635]",
      qibla: "text-white"
    }
  };

  const currentSkin = skins[activeSkin];

  return (
    <div className={`min-h-screen ${currentSkin.bg} flex flex-col font-sans transition-colors duration-700 pb-24`}>
      
      {/* Dynamic Header */}
      <header className={`sticky top-0 z-50 ${activeSkin === 'classic' ? 'bg-white/80' : 'bg-black/20'} backdrop-blur-xl px-6 py-6 flex flex-col items-center justify-center relative transition-colors duration-700`}>
        <div className="absolute left-6 top-6">
          <Link href="/dashboard" className={`w-10 h-10 rounded-full flex items-center justify-center ${activeSkin === 'classic' ? 'text-slate-800 bg-slate-100' : 'text-white bg-white/10'} hover:bg-opacity-80 transition-colors`}>
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        <p className={`text-sm font-medium ${currentSkin.text} opacity-80 mb-1`}>The Degree of Qibla</p>
        <h1 className={`text-3xl font-bold tracking-tight ${currentSkin.text}`}>
          {qiblaDegree ? `${qiblaDegree}°` : 'Calculating...'}
        </h1>
      </header>

      {/* Main Compass Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        {/* Error or Calibration State */}
        {!hasPermission && !error && (
          <div className="absolute z-20 top-4 bg-blue-500/90 text-white px-6 py-4 rounded-3xl text-center max-w-xs shadow-2xl backdrop-blur-md border border-blue-400">
            <h3 className="font-bold flex items-center justify-center gap-2 mb-2"><Compass className="w-5 h-5"/> Compass Access</h3>
            <p className="text-xs mb-4">Please allow device orientation so we can point you to the Qibla.</p>
            <button onClick={requestCompassPermission} className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-bold w-full hover:bg-slate-50">
              Grant Permission
            </button>
          </div>
        )}

        {error && (
          <div className="absolute z-20 top-4 bg-red-500/90 text-white px-6 py-4 rounded-3xl text-center max-w-xs shadow-2xl backdrop-blur-md border border-red-400">
             <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
             <p className="text-xs font-semibold">{error}</p>
          </div>
        )}

        {/* The CSS Compass */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 my-8">
           {/* Outer Ring */}
           <div className={`absolute inset-0 rounded-full border-8 ${currentSkin.ring} shadow-[0_0_50px_rgba(0,0,0,0.3)] box-border flex items-center justify-center z-0 transition-colors duration-700 overflow-hidden`}>
             
             {/* The Rotating Dial (North always points 'up' physically by counter-rotating by heading) */}
             <motion.div 
               className="w-full h-full relative"
               animate={{ rotate: compassRotation }}
               transition={{ type: "tween", ease: "linear", duration: 0.2 }}
             >
                {/* Degree Markings */}
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-30 select-none">
                   <defs>
                     <pattern id="ticks" width="200" height="200" patternUnits="userSpaceOnUse">
                       {[...Array(72)].map((_, i) => (
                         <line key={i} x1="100" y1="5" x2="100" y2={i % 6 === 0 ? "15" : "10"} stroke="currentColor" strokeWidth={i % 6 === 0 ? "2" : "1"} className={currentSkin.text} transform={`rotate(${i * 5} 100 100)`} />
                       ))}
                     </pattern>
                   </defs>
                   <rect width="200" height="200" fill="url(#ticks)"/>
                </svg>

                {/* N, E, S, W Labels */}
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 font-bold text-xl ${currentSkin.text}`}>N</div>
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-xl ${currentSkin.text} rotate-180`}>S</div>
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 font-bold text-xl ${currentSkin.text} rotate-[270deg]`}>E</div>
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl ${currentSkin.text} rotate-90`}>W</div>

                {/* Inner Decorative Circle */}
                <div className={`absolute inset-16 rounded-full border border-current opacity-10 ${currentSkin.text}`}></div>
                
                {/* QIBLA POINTER (Fixed on the dial pointing towards Qibla degree) */}
                {qiblaDegree !== null && (
                  <div 
                    className="absolute inset-0 pointer-events-none" 
                    style={{ transform: `rotate(${qiblaNeedleRotation}deg)` }}
                  >
                    {/* The Qibla Line indicating exact direction on the dial */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                       <div className={`w-3 h-3 rounded-full ${activeSkin === 'classic' ? 'bg-emerald-500' : 'bg-amber-400'} shadow-[0_0_10px_rgba(251,191,36,0.8)] z-10 border-2 border-white`}></div>
                       <div className={`w-0.5 h-32 ${currentSkin.qibla} bg-current opacity-80 mt-1`}></div>
                       <div className={`mt-2 ${currentSkin.qibla}`}>
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22l10-4 10 4L12 2z"/></svg>
                       </div>
                    </div>
                  </div>
                )}
             </motion.div>
             
             {/* Center Pin & Main Device Needle (Static pointing up, or reacting slightly) */}
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* North arrow (always points up relative to device) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-2 h-28 ${currentSkin.needle} rounded-t-full shadow-lg z-10 origin-bottom`}></div>
                {/* South arrow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-28 bg-white/50 backdrop-blur-sm rounded-b-full shadow-lg z-10 origin-top border border-white/20"></div>
                {/* Center dot */}
                <div className={`w-6 h-6 rounded-full ${activeSkin === 'classic' ? 'bg-slate-800' : 'bg-white'} border-4 ${currentSkin.ring} z-20 shadow-xl`}></div>
             </div>

           </div>
        </div>

        {/* Readout stats */}
        <div className="mt-4 flex gap-8">
           <div className={`text-center ${currentSkin.text}`}>
             <p className="text-xs opacity-60 font-medium">HEADING</p>
             <p className="text-xl font-mono font-bold">{normalizedHeading}° {normalizedHeading > 315 || normalizedHeading < 45 ? 'N' : normalizedHeading < 135 ? 'E' : normalizedHeading < 225 ? 'S' : 'W'}</p>
           </div>
           <div className={`w-px h-10 ${currentSkin.text} opacity-20`}></div>
           <div className={`text-center ${currentSkin.text}`}>
             <p className="text-xs opacity-60 font-medium">TARGET</p>
             <p className="text-xl font-mono font-bold">{qiblaDegree !== null ? `${qiblaDegree}°` : '--'}</p>
           </div>
        </div>

      </main>

      {/* Compass Skin Selector Carousel */}
      <div className={`mx-4 mb-4 ${activeSkin === 'classic' ? 'bg-slate-100/50' : 'bg-black/20'} backdrop-blur-xl rounded-[2.5rem] p-4 pb-6 overflow-hidden transition-colors duration-700`}>
         <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x px-2">
            {(Object.keys(skins) as CompassSkin[]).map((skin) => (
              <button 
                key={skin}
                onClick={() => setActiveSkin(skin)}
                className={`snap-center shrink-0 w-20 h-20 rounded-full flex flex-col items-center justify-center gap-2 border-[3px] transition-all backdrop-blur-md shadow-lg ${activeSkin === skin ? 'border-[#2DD4BF] bg-white/10 scale-110' : 'border-transparent bg-white/5 hover:bg-white/10 opacity-70'}`}
              >
                <div className={`w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center ${skins[skin].bg} overflow-hidden shadow-inner relative`}>
                  {/* Miniature representation */}
                  <div className={`w-6 h-0.5 ${skins[skin].needle} absolute rotate-45`}></div>
                  <div className={`w-2 h-2 rounded-full bg-white z-10`}></div>
                </div>
                {activeSkin === skin && (
                  <div className="absolute -bottom-2 bg-[#2DD4BF] rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900 shadow-md">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </button>
            ))}
         </div>
      </div>

    </div>
  );
}
