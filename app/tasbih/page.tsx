import Link from "next/link";
import { ChevronLeft, RotateCcw, Flame, Award, CheckCircle2 } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";

export default function Tasbih() {
  return (
    <div className="flex-1 bg-white relative flex flex-col text-[#1A3B36]">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-white">
        <Link href="/home" className="flex items-center gap-1 text-gray-600">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg">Tasbih Counter</h1>
        <button className="flex items-center gap-1 text-gray-500 text-sm font-medium">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-10 scrollbar-hide bg-white">
        {/* Main Counter */}
        <div className="flex flex-col items-center pt-8 pb-12">
          <h2 className="text-2xl font-bold mb-2">Alhamdulillah</h2>
          <p className="text-gray-500 font-arabic text-lg mb-8" dir="rtl">الْحَمْدُ لِلَّهِ</p>
          
          <CircularProgress value={1052} max={3300} size={240} strokeWidth={24} color="#10B981" trackColor="#F3F4F6" useGradient={true}>
            <div className="text-center">
              <span className="block text-4xl font-bold text-[#1A3B36] mb-1">1,052</span>
              <span className="block text-xs text-gray-400 font-medium">3,300 (Daily Goal)</span>
            </div>
          </CircularProgress>

          <p className="text-gray-400 text-sm mt-10">Swipe up to Count</p>
        </div>

        {/* Dhikr Options */}
        <div className="px-6 py-6 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 tracking-wider mb-4 text-center">DHIKR OPTIONS</p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <button className="whitespace-nowrap px-5 py-2.5 bg-[#FFD54F] text-[#1A3B36] rounded-full text-sm font-bold shadow-sm">
              Alhamdulillah
            </button>
            <button className="whitespace-nowrap px-5 py-2.5 bg-gray-50 text-gray-600 rounded-full text-sm font-medium border border-gray-100">
              Subhanallah
            </button>
            <button className="whitespace-nowrap px-5 py-2.5 bg-gray-50 text-gray-600 rounded-full text-sm font-medium border border-gray-100">
              Allahu Akbar
            </button>
          </div>
        </div>

        {/* Streak */}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
              const isActive = i < 3; // M, T, W active
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-gray-400">{day}</span>
                  {isActive ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm shadow-emerald-200">
                      <Flame className="w-4 h-4 text-white fill-current" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">{i + 2}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
              <Award className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-800">7-day streak achiever</span>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Milestones</h3>
            <button className="text-sm font-medium text-gray-500 flex items-center">View All <span className="ml-1">›</span></button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Award className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium text-sm">5-day streak achiever</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 flex items-center justify-between border border-orange-100 opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                  <Award className="w-4 h-4 text-orange-500" />
                </div>
                <span className="font-medium text-sm text-orange-900">10-day streak achiever</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
