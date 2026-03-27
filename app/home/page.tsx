import Image from "next/image";
import Link from "next/link";
import { Bell, BookOpen, Compass, Home, Search, Grid, User, Sun, Cloud, CloudMoon, Moon } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";

export default function Dashboard() {
  return (
    <div className="flex-1 bg-[#F9FAFB] relative flex flex-col text-[#1A3B36]">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-[#F9FAFB]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0A261D] rounded-full flex items-center justify-center">
            <Moon className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="font-bold text-xl">NurSalam</span>
        </div>
        <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center relative bg-white">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* User Greeting */}
        <div className="px-6 py-4 flex items-center gap-4">
          <Image src="/darbar image.jpg" alt="User" width={48} height={48} className="rounded-full border-2 border-white shadow-sm" />
          <div>
            <h2 className="font-semibold text-lg">Assalamu Alaikum, FH Avro</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">Dhaka, BD <span className="text-yellow-500">🌙</span></p>
          </div>
        </div>

        {/* Next Prayer Card */}
        <div className="mx-6 my-4 bg-gradient-to-r from-[#E8F5E9] to-[#FFF9C4] rounded-3xl p-6 flex justify-between items-center shadow-sm">
          <div>
            <h3 className="font-bold text-lg mb-1">Next Fajr Prayer</h3>
            <p className="text-sm text-gray-600">Time: 05:15 AM</p>
          </div>
          <CircularProgress value={75} max={100} size={60} strokeWidth={6} color="#10B981" trackColor="#D1FAE5">
            <div className="text-center">
              <span className="block text-[10px] font-bold leading-none">2h 30m</span>
              <span className="block text-[8px] text-gray-600">left</span>
            </div>
          </CircularProgress>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 grid grid-cols-3 gap-4">
          <Link href="#" className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm border border-gray-100">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span className="text-xs font-medium">Quran Read</span>
          </Link>
          <Link href="/tasbih" className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm border border-gray-100">
            <div className="w-6 h-6 text-blue-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <span className="text-xs font-medium">Tasbih</span>
          </Link>
          <Link href="#" className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm border border-gray-100">
            <Compass className="w-6 h-6 text-amber-600" />
            <span className="text-xs font-medium">Qibla</span>
          </Link>
        </div>

        {/* Prayer Alarm */}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Prayer Alarm</h3>
            <button className="text-sm font-medium text-gray-500 flex items-center">See All <span className="ml-1">›</span></button>
          </div>
          <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 space-y-1">
            {[
              { name: "Fajr", time: "04:45 AM", icon: Sun, active: true, color: "text-emerald-500" },
              { name: "Dhuhr", time: "1:30 PM", icon: Sun, active: false, color: "text-emerald-600" },
              { name: "Asr", time: "04:00 PM", icon: Cloud, active: false, color: "text-emerald-700" },
              { name: "Maghrib", time: "5:30 PM", icon: CloudMoon, active: false, color: "text-emerald-800" },
            ].map((prayer, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <prayer.icon className={`w-6 h-6 ${prayer.color}`} />
                  <div>
                    <p className="font-semibold">{prayer.name}</p>
                    <p className="text-xs text-gray-500">{prayer.time}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={prayer.active} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-20">
        <Link href="/home" className="flex flex-col items-center gap-1 text-emerald-600">
          <Home className="w-6 h-6 fill-current" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Explore</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-medium">Services</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-emerald-600">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
    </div>
  );
}
