"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, BookOpen, BookHeart, Compass } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-blue-100 overflow-hidden relative">

      {/* Soft Top Gradient (matching the reference image's peach/blue aura) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-r from-[#FFF0E6] via-[#F8FAFC] to-[#E6F0FF] -z-10 blur-3xl opacity-80 pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-16 lg:pt-24 pb-20 relative z-10">

        {/* Title Section */}
        <div className="mb-10 pl-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight leading-tight">
            খিজিরিয়া চিশতিয়া ভান্ডার
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 tracking-tight mt-1">
            দরবার শরীফ
          </h2>
        </div>

        {/* Hero Grid Container */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Large Darbar Image (Col span 8) */}
          <div className="lg:col-span-8 relative h-[350px] sm:h-[450px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-sm group">
            {/* We use a beautiful architecture/mosque placeholder image */}
            <Image
              src="/darbar image.jpg"
              alt="Khijiriya Chishtiya Darbar Sharif"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Image Overlay Gradient for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Right: Info Card (Col span 4) */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 flex flex-col h-full">

            {/* Address & Action */}
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h3 className="text-slate-800 text-lg font-medium leading-snug">
                  খিজিরিয়া চিশতিয়া ভান্ডার<br />দরবার শরীফ
                </h3>
                <p className="text-sm text-slate-500">ফকিরখীল, পাইন্দং</p>
              </div>
              <a
                href="https://maps.app.goo.gl/UNc8vtUPrXN5kHY96"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-600 transition-colors p-2 hover:bg-emerald-50 rounded-full"
                title="Google Maps এ দেখুন"
              >
                <MapPin className="w-5 h-5 flex-shrink-0" />
              </a>
            </div>



            {/* Description */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed">
                এই দরবার শরীফে রয়েছে <span className="font-semibold text-emerald-700">খাজা গরীবে নেওয়াজ মঈনউদ্দিন চিশতী (রহ.)</span> এর পবিত্র খানকা শরীফ এবং নবী ও অলী জ্ঞানের ভান্ডার <span className="font-semibold text-emerald-700">খাজা খোয়াজ খিজির (আ.)</span> এর মসজিদ।
              </p>
              <a
                href="https://maps.app.goo.gl/UNc8vtUPrXN5kHY96"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> ম্যাপে দেখুন <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Pir Saheb / Contact Section */}
            <Link href="/pir-saheb" className="block mb-6 bg-[#FAFAFA] rounded-2xl p-4 hover:bg-emerald-50/50 transition-colors border border-slate-100/50 hover:border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-200 relative bg-emerald-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-700">ই</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider mb-0.5">পীর সাহেব</span>
                    <span className="text-sm font-bold text-slate-800">হাফেজ মো ইউসুফ</span>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                  বিস্তারিত →
                </span>
              </div>
            </Link>

            {/* Primary Action Button */}
            <Link href="/login" className="block w-full text-center">
              <button className="w-full bg-[#1A1A1A] hover:bg-black text-white rounded-full py-4 px-6 font-medium transition-all shadow-lg shadow-black/10 active:scale-[0.98] group">
                <span className="block text-base mb-0.5">পোর্টাল ড্যাশবোর্ড</span>
                <span className="block text-[11px] text-white/50 font-normal group-hover:text-white/70 transition-colors font-bengali">
                  পোর্টাল ড্যাশবোর্ডে প্রবেশ করুন
                </span>
              </button>
            </Link>

          </div>
        </div>

        {/* Optional Secondary Grid below the main listing (Features) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <Link href="/quran" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <BookOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 font-bengali">কুরআন মাজীদ</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-bengali">পড়ুন এবং শুনুন</p>
            </div>
          </Link>

          <Link href="/hadith" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <BookHeart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 font-bengali">হাদিস সংকলন</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-bengali">সহীহ বুখারী এবং আরও</p>
            </div>
          </Link>

          <Link href="/dashboard/qibla" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <Compass className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 font-bengali">কিবলা কম্পাস</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-bengali">সরাসরি দিকনির্দেশনা</p>
            </div>
          </Link>

          <Link href="/events" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 font-bengali">দরবারের ইভেন্ট</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-bengali">মাজলিসে যোগ দিন</p>
            </div>
          </Link>
        </div>

      </main>
    </div>
  );
}
