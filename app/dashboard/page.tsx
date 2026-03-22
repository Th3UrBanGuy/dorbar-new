"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, Heart, Search, Settings, MapPin, Sun, Sunrise, Sunset, Moon, 
  LogOut, Smartphone, StarHalf, ArrowRight, Bell, Compass, Calendar, 
  BookHeart, Clock, ChevronRight, PlayCircle, Music, Library
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-blue-200 pb-20 lg:pb-8">
      {/* Top Navigation Bar (Mobile & Desktop) */}
      <header className="sticky top-0 z-50 bg-[#F4F7FB]/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/login" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm block">
             <Image src="https://picsum.photos/seed/avatar/100/100" alt="Profile" width={40} height={40} className="object-cover" referrerPolicy="no-referrer" />
          </Link>
          <div>
            <p className="text-xs text-slate-500 font-medium">As-salamu alaykum</p>
            <h2 className="text-sm font-bold text-slate-900">Mohammad Jabel</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-6 gap-6 sm:gap-8">
        
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
            
            {/* Hero: Prayer Times */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#3B82F6] rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center mb-6 sm:mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] sm:text-sm font-medium mb-3 sm:mb-4 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 h-4" /> Dhaka, Bangladesh
                </div>
                <h1 className="text-4xl xs:text-5xl sm:text-7xl font-bold tracking-tight mb-2 font-mono">{currentTime || "00:00"}</h1>
                <p className="text-blue-200 text-xs sm:text-sm font-medium">Remaining time to Fajr pray: 04:12:30</p>
              </div>

              {/* Prayer Timeline */}
              <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-[1.5rem] sm:rounded-3xl p-3 sm:p-4 border border-white/10 flex justify-between items-center overflow-x-auto hide-scrollbar gap-2 sm:gap-4">
                {[
                  { name: "Fajr", time: "5:25", icon: Sunrise, active: true },
                  { name: "Dzuhr", time: "1:30", icon: Sun, active: false },
                  { name: "Asr", time: "4:45", icon: Sun, active: false },
                  { name: "Maghrib", time: "5:36", icon: Sunset, active: false },
                  { name: "Isha", time: "7:45", icon: Moon, active: false },
                ].map((prayer, i) => (
                  <div key={i} className={`flex flex-col items-center min-w-[50px] sm:min-w-[60px] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-colors ${prayer.active ? 'bg-white text-blue-900 shadow-lg' : 'text-blue-100 hover:bg-white/5'}`}>
                    <prayer.icon className={`w-5 h-5 sm:w-6 h-6 mb-1 sm:mb-2 ${prayer.active ? 'text-blue-600' : 'text-blue-200'}`} />
                    <span className="text-[9px] sm:text-xs font-bold mb-0.5 sm:mb-1">{prayer.name}</span>
                    <span className={`text-[8px] sm:text-[10px] font-medium ${prayer.active ? 'text-blue-500' : 'text-blue-300'}`}>{prayer.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Last Read Card (Green Theme) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-[#065F46] to-[#047857] rounded-[2rem] p-5 sm:p-8 text-white shadow-xl shadow-emerald-900/20 flex items-center justify-between relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                  <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,96.3,-2.9C95.8,12.3,88.8,27.3,79.1,40.1C69.4,52.9,57,63.5,42.8,71.5C28.6,79.5,12.6,84.9,-3.1,89.7C-18.8,94.5,-34.2,98.7,-47.8,92.8C-61.4,86.9,-73.2,70.9,-81.4,54.1C-89.6,37.3,-94.2,19.7,-93.2,2.7C-92.2,-14.3,-85.6,-30.7,-75.4,-44.1C-65.2,-57.5,-51.4,-67.9,-37.1,-74.8C-22.8,-81.7,-8,-85.1,6.5,-96.2C21,-107.3,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                </svg>
              </div>
              <div className="relative z-10 flex-1">
                <p className="text-emerald-100 text-xs sm:text-sm font-medium mb-1">Last Read</p>
                <h3 className="text-2xl sm:text-3xl font-bold mb-1 font-serif">Al-Fatihah</h3>
                <p className="text-emerald-200 text-xs sm:text-sm mb-4 sm:mb-6">Ayah no. 1</p>
                <Button className="rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-semibold px-5 sm:px-6 h-9 sm:h-10 text-xs sm:text-base shadow-lg">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="relative z-10 hidden xs:block">
                <BookOpen className="w-16 h-16 sm:w-24 sm:h-24 text-white/80 drop-shadow-lg" strokeWidth={1} />
              </div>
            </motion.div>

            {/* Explore Section (Nusuk Style) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Explore</h3>
                <button className="text-xs sm:text-sm font-medium text-[#0066FF] hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Card 1 */}
                <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-square sm:aspect-[4/3] group cursor-pointer shadow-md text-white">
                  <Image src="https://picsum.photos/seed/mecca/600/600" alt="Umrah" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <h4 className="font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Umrah</h4>
                    <p className="text-white/80 text-[10px] sm:text-xs line-clamp-1 sm:line-clamp-2">Hajj essentials</p>
                  </div>
                  <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 sm:w-4 h-4" />
                  </div>
                </div>
                {/* Card 2 */}
                <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-square sm:aspect-[4/3] group cursor-pointer shadow-md text-white">
                  <Image src="https://picsum.photos/seed/medina/600/600" alt="Rawda" fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <h4 className="font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Rawda</h4>
                    <p className="text-white/80 text-[10px] sm:text-xs line-clamp-1 sm:line-clamp-2">Visit the Rawda</p>
                  </div>
                  <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 sm:w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 pb-4 lg:pb-0">
            
            {/* Quick Actions Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <div className="grid grid-cols-4 gap-y-5 xs:gap-y-6 gap-x-2">
                {[
                  { name: "Quran", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", href: "/quran" },
                  { name: "Hijri", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", href: "/dashboard/calendar" },
                  { name: "Qibla", icon: Compass, color: "text-amber-600", bg: "bg-amber-50", href: "/dashboard/qibla" },
                  { name: "Tasbeeh", icon: Clock, color: "text-purple-600", bg: "bg-purple-50", href: "/tasbih" },
                  { name: "Kalam", icon: Music, color: "text-rose-600", bg: "bg-rose-50", href: "/kalam" },
                  { name: "Hadith", icon: BookHeart, color: "text-indigo-600", bg: "bg-indigo-50", href: "/hadith" },
                  { name: "Kitab", icon: Library, color: "text-orange-600", bg: "bg-orange-50", href: "/kitab" },
                  { name: "More", icon: Settings, color: "text-slate-600", bg: "bg-slate-50", href: "#" },
                ].map((item, i) => (
                  <Link href={item.href} key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                    <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-xl xs:rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                      <item.icon className={`w-5 h-5 xs:w-6 h-6 ${item.color}`} />
                    </div>
                    <span className="text-[10px] xs:text-xs font-semibold text-slate-600 text-center">{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Daily Dua */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Dua</h3>
                <button className="w-7 h-7 sm:w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100">
                  <PlayCircle className="w-3.5 h-3.5 sm:w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-700 font-medium italic mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                &quot;Allaahum-maghfir lee thanbee kulluhu, diqqahu wa jilahu, wa&apos;awwalahu wa&apos;aakhirahu wa&apos;alaaniyata hu wa sirrahu.&quot;
              </p>
              <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed">
                O Allah, forgive me all my sins, great and small, the first and the last, those that are apparent and those that are hidden.
              </p>
            </motion.div>

            {/* Prayer Tracker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Prayer Tracker</h3>
              <div className="flex justify-between items-center px-1">
                 {[
                  { name: "Fajr", done: true },
                  { name: "Dzuhr", done: true },
                  { name: "Asr", done: false },
                  { name: "Maghrib", done: false },
                  { name: "Isha", done: false },
                ].map((prayer, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer">
                    <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full flex items-center justify-center border-2 transition-colors ${prayer.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-transparent hover:border-emerald-200'}`}>
                      <svg className="w-3 h-3 xs:w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[9px] xs:text-[10px] font-semibold text-slate-500">{prayer.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/50 px-6 py-3 flex justify-between items-center z-50 pb-safe">
         {[
            { icon: BookOpen, label: "Home", active: true, href: "/dashboard" },
            { icon: Search, label: "Explore", active: false, href: "#" },
            { icon: Heart, label: "Favorites", active: false, href: "#" },
            { icon: Settings, label: "Settings", active: false, href: "#" },
         ].map((item, i) => (
           <Link href={item.href} key={i} className={`flex flex-col items-center gap-1 cursor-pointer ${item.active ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}>
             <item.icon className={`w-5 h-5 sm:w-6 h-6 ${item.active ? 'fill-blue-50' : ''}`} />
             <span className="text-[9px] sm:text-[10px] font-semibold">{item.label}</span>
           </Link>
         ))}
      </nav>
    </div>
  );
}
