"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, Heart, Search, Settings, MapPin, Sun, Sunrise, Sunset, Moon, 
  LogOut, ArrowRight, Bell, Compass, Calendar, 
  BookHeart, Clock, PlayCircle, Music, Library, ShieldAlert, ScrollText
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DonationManager } from "@/components/DonationManager";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [timePhase, setTimePhase] = useState("night");
  const { user, isLoaded, isStaff, isMureed, hasSpecialAccess, toggleSpecialAccess } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      const hour = now.getHours();
      if (hour >= 4 && hour < 7) setTimePhase("dawn");
      else if (hour >= 7 && hour < 17) setTimePhase("day");
      else if (hour >= 17 && hour < 19) setTimePhase("dusk");
      else setTimePhase("night");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getHeroColors = () => {
    switch(timePhase) {
      case "dawn": return "from-[#B45309] via-[#D97706] to-[#FBBF24] shadow-amber-900/20";
      case "day": return "from-[#0369A1] via-[#0EA5E9] to-[#7DD3FC] shadow-sky-900/20";
      case "dusk": return "from-[#9A3412] via-[#EA580C] to-[#FDBA74] shadow-orange-900/20";
      case "night":
      default: return "from-[#0F172A] via-[#1E3A8A] to-[#3B82F6] shadow-blue-900/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans selection:bg-blue-200 pb-20 lg:pb-8 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#F4F7FB]/95 backdrop-blur-xl border-b border-slate-200/50">
        <div className="w-full px-3 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-6">
          <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
            <Link href="/dashboard/settings" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm block shrink-0">
               <Image src="https://picsum.photos/seed/avatar/100/100" alt="Profile" width={44} height={44} className="object-cover" referrerPolicy="no-referrer" />
            </Link>
            <div className="min-w-0 pr-2 flex flex-col justify-center">
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mb-0.5">আসসালামু আলাইকুম</p>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate leading-tight">{user?.name || 'অতিথি'}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
             <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
            <Link href="/dashboard/settings" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
              <Settings className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </Link>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors relative">
              <Bell className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
              <span className="absolute top-[6px] right-[6px] sm:top-2 sm:right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button onClick={handleLogout} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm border border-red-100 hover:bg-red-100 transition-colors" title="লগআউট">
              <LogOut className="w-[18px] h-[18px] sm:w-4 sm:h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full px-3 sm:px-6 lg:px-12 py-3 sm:py-6 gap-4 sm:gap-8">
        
        {activeTab === "donations" && isStaff ? (
          <DonationManager />
        ) : (
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-8">
            
            {/* Hero: Prayer Times */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${getHeroColors()} rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-8 text-white shadow-2xl relative overflow-hidden transition-colors duration-1000`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center mb-5 sm:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-sm font-medium mb-2 sm:mb-4 border border-white/10 font-bengali">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> ঢাকা, বাংলাদেশ
                </div>
                <h1 className="text-[2.25rem] leading-none xs:text-5xl sm:text-7xl font-bold tracking-tight mb-1 sm:mb-2 font-mono">{currentTime || "00:00"}</h1>
                <p className="text-blue-200 text-[10px] sm:text-sm font-medium font-bengali">ফজরের ওয়াক্ত শুরু হতে বাকি: 04:12:30</p>
              </div>

              <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-[1.25rem] sm:rounded-3xl p-2 sm:p-4 border border-white/10 flex justify-between items-center overflow-x-auto hide-scrollbar gap-1 sm:gap-4">
                {[
                  { name: "ফজর", time: "5:25", icon: Sunrise, active: true },
                  { name: "যোহর", time: "1:30", icon: Sun, active: false },
                  { name: "আসর", time: "4:45", icon: Sun, active: false },
                  { name: "মাগরিব", time: "5:36", icon: Sunset, active: false },
                  { name: "এশা", time: "7:45", icon: Moon, active: false },
                ].map((prayer, i) => (
                  <div key={i} className={`flex flex-col items-center min-w-[42px] xs:min-w-[48px] sm:min-w-[60px] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-colors ${prayer.active ? 'bg-white text-blue-900 shadow-lg' : 'text-blue-100 hover:bg-white/5'}`}>
                    <prayer.icon className={`w-4 h-4 sm:w-6 sm:h-6 mb-1 sm:mb-2 ${prayer.active ? 'text-blue-600' : 'text-blue-200'}`} />
                    <span className="text-[8px] sm:text-xs font-bold mb-0.5 sm:mb-1">{prayer.name}</span>
                    <span className={`text-[8px] sm:text-[10px] font-medium leading-none ${prayer.active ? 'text-blue-500' : 'text-blue-300'}`}>{prayer.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Last Read Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-[#065F46] to-[#047857] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 text-white shadow-xl shadow-emerald-900/20 flex items-center justify-between relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                  <path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,96.3,-2.9C95.8,12.3,88.8,27.3,79.1,40.1C69.4,52.9,57,63.5,42.8,71.5C28.6,79.5,12.6,84.9,-3.1,89.7C-18.8,94.5,-34.2,98.7,-47.8,92.8C-61.4,86.9,-73.2,70.9,-81.4,54.1C-89.6,37.3,-94.2,19.7,-93.2,2.7C-92.2,-14.3,-85.6,-30.7,-75.4,-44.1C-65.2,-57.5,-51.4,-67.9,-37.1,-74.8C-22.8,-81.7,-8,-85.1,6.5,-96.2C21,-107.3,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                </svg>
              </div>
              <div className="relative z-10 flex-1">
                <p className="text-emerald-100 text-[10px] sm:text-sm font-medium mb-0.5 sm:mb-1 font-bengali">সর্বশেষ পঠিত</p>
                <h3 className="text-xl sm:text-3xl font-bold mb-0.5 sm:mb-1 font-bengali">আল-ফাতিহা</h3>
                <p className="text-emerald-200 text-[10px] sm:text-sm mb-3 sm:mb-6 font-bengali">আয়াত নং ১</p>
                <Button className="rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-semibold px-4 sm:px-6 h-8 sm:h-10 text-[10px] sm:text-base shadow-lg font-bengali">
                  পড়া শুরু করুন <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                </Button>
              </div>
              <div className="relative z-10 hidden xs:block">
                <BookOpen className="w-14 h-14 sm:w-24 sm:h-24 text-white/80 drop-shadow-lg" strokeWidth={1} />
              </div>
            </motion.div>

            {/* Explore Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-2">
                <h3 className="text-[1.05rem] sm:text-xl font-bold text-slate-900 font-bengali">এক্সপ্লোর করুন</h3>
                <button className="text-[10px] sm:text-sm font-medium text-[#0066FF] hover:underline font-bengali">সব দেখুন</button>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div className="relative rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden aspect-[5/4] sm:aspect-[4/3] group cursor-pointer shadow-md text-white">
                  <Image src="https://picsum.photos/seed/mecca/600/600" alt="Umrah" fill priority sizes="(max-width: 640px) 50vw, 300px" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <h4 className="font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 leading-tight font-bengali">উমরাহ</h4>
                    <p className="text-white/80 text-[9px] sm:text-xs line-clamp-1 sm:line-clamp-2 font-bengali">হজের প্রয়োজনীয় বিষয়</p>
                  </div>
                  <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="relative rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden aspect-[5/4] sm:aspect-[4/3] group cursor-pointer shadow-md text-white">
                  <Image src="https://picsum.photos/seed/medina/600/600" alt="Rawda" fill priority sizes="(max-width: 640px) 50vw, 300px" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <h4 className="font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 leading-tight font-bengali">রওজা</h4>
                    <p className="text-white/80 text-[9px] sm:text-xs line-clamp-1 sm:line-clamp-2 font-bengali">রওজা জিয়ারত</p>
                  </div>
                  <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-8 pb-4 lg:pb-0">
            
            {/* Quick Actions Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <div className="grid grid-cols-4 gap-y-4 xs:gap-y-6 gap-x-1 sm:gap-x-2">
                {([
                  { name: "কুরআন", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", href: "/quran" },
                  { name: "ক্যালেন্ডার", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50", href: "/dashboard/calendar" },
                  { name: "কিবলা", icon: Compass, color: "text-amber-600", bg: "bg-amber-50", href: "/dashboard/qibla" },
                  { name: "তাসবিহ", icon: Clock, color: "text-purple-600", bg: "bg-purple-50", href: "/tasbih" },
                  { name: "কালাম", icon: Music, color: "text-rose-600", bg: "bg-rose-50", href: "/kalam" },
                  { name: "হাদিস", icon: BookHeart, color: "text-indigo-600", bg: "bg-indigo-50", href: "/hadith" },
                  { name: "কিতাব", icon: Library, color: "text-orange-600", bg: "bg-orange-50", href: "/kitab" },
                  { name: "আরও", icon: Settings, color: "text-slate-600", bg: "bg-slate-50", href: "#" },
                ] as { name: string, icon: any, color: string, bg: string, href?: string, onClick?: () => void }[])
                .concat(isStaff ? [{ name: "হাদিয়া", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", onClick: () => setActiveTab("donations") }] : [])
                .map((item, i) => (
                  <div 
                    onClick={item.onClick || (() => item.href && router.push(item.href))} 
                    key={i} 
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <div className={`w-9 h-9 xs:w-12 xs:h-12 sm:w-12 sm:h-12 rounded-[0.6rem] xs:rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                      <item.icon className={`w-[18px] h-[18px] xs:w-6 xs:h-6 sm:w-6 sm:h-6 ${item.color}`} />
                    </div>
                    <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-slate-600 text-center uppercase xs:normal-case tracking-tight xs:tracking-normal">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Daily Dua */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-[12px] sm:text-sm font-bold text-slate-500 font-bengali tracking-wider">দৈনন্দিন দোয়া</h3>
                <button className="w-7 h-7 sm:w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100">
                  <PlayCircle className="w-3.5 h-3.5 sm:w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-700 font-medium font-arabic mb-3 sm:mb-4 leading-[1.8] text-right text-lg sm:text-xl" dir="rtl">
                اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ
              </p>
              <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed font-bengali">
                হে আল্লাহ, আমার সমস্ত গুনাহ ক্ষমা করে দিন— ছোট অথবা বড়, প্রথম অথবা শেষ, প্রকাশ্য অথবা গোপন।
              </p>
            </motion.div>

            {/* Prayer Tracker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <h3 className="text-[12px] sm:text-sm font-bold text-slate-500 font-bengali tracking-wider mb-4">নামাজের ট্র্যাকার</h3>
              <div className="flex justify-between items-center px-1">
                 {[
                  { name: "ফজর", done: true },
                  { name: "যোহর", done: true },
                  { name: "আসর", done: false },
                  { name: "মাগরিব", done: false },
                  { name: "এশা", done: false },
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

          {/* User Info & Special Access */}
          {isLoaded && user && (
            <section className="lg:col-span-12 mt-4 space-y-4">
              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/hadith"
                  className="group flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-[2rem] hover:-translate-y-1 transition-all duration-300 border border-indigo-100"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <ScrollText className="w-8 h-8 text-indigo-600" />
                  </div>
                  <span className="text-xl font-bold text-slate-800 font-bengali">হাদিস</span>
                  <span className="text-xs text-indigo-600 font-medium font-bengali mt-1">বিশুদ্ধ হাদিস সংগ্রহ</span>
                </Link>
                
                <Link 
                  href="/topics"
                  className="group flex flex-col items-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-[2rem] hover:-translate-y-1 transition-all duration-300 border border-amber-100"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-amber-600" />
                  </div>
                  <span className="text-xl font-bold text-slate-800 font-bengali">বিষয়ভিত্তিক</span>
                  <span className="text-xs text-amber-600 font-medium font-bengali mt-1">টপিক ইনডেক্স</span>
                </Link>
              </div>

              {/* Account Info Card */}
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <ShieldAlert className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 font-bengali">{user.name}</h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-slate-400">@{user.username}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        user.role === 'staff' 
                          ? 'bg-rose-100 text-rose-600 border border-rose-200' 
                          : user.role === 'mureed' 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {user.role === 'staff' ? 'স্টাফ' : user.role === 'mureed' ? 'মুরিদ' : 'ইউজার'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Special Access Toggle */}
                <button
                  onClick={toggleSpecialAccess}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all relative z-10 ${
                    hasSpecialAccess
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      hasSpecialAccess ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${hasSpecialAccess ? 'text-amber-800' : 'text-slate-600'}`}>
                        স্পেশাল অ্যাক্সেস
                      </p>
                      <p className="text-[10px] text-slate-400">শিয়া হাদিস ও বিশেষ রিসোর্স</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors flex items-center ${
                    hasSpecialAccess ? 'bg-amber-500' : 'bg-slate-300'
                  }`}>
                    <motion.div
                      animate={{ x: hasSpecialAccess ? 20 : 2 }}
                      className="w-5 h-5 rounded-full bg-white shadow-sm"
                    />
                  </div>
                </button>
              </div>
            </section>
          )}

        </div>
        )}
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/50 px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center z-50 pb-safe">
         {[
            { icon: BookOpen, label: "হোম", active: activeTab === "home", onClick: () => setActiveTab("home") },
            { 
              icon: Heart, 
              label: "হাদিয়া", 
              active: activeTab === "donations", 
              onClick: () => setActiveTab("donations"),
              hidden: !isStaff 
            },
            { icon: Search, label: "এক্সপ্লোর", active: false, href: "#" },
            { icon: Settings, label: "সেটিংস", active: false, href: "/dashboard/settings" },
         ].filter(i => !i.hidden).map((item, i) => (
           <div 
             onClick={item.onClick}
             key={i} 
             className={`flex flex-col items-center gap-1 cursor-pointer ${item.active ? 'text-[#0066FF]' : 'text-slate-400 hover:text-slate-600'}`}
           >
             <item.icon className={`w-5 h-5 sm:w-6 h-6 ${item.active ? 'fill-blue-50' : ''}`} />
             <span className="text-[9px] sm:text-[10px] font-semibold font-bengali">{item.label}</span>
           </div>
         ))}
      </nav>
    </div>
  );
}
