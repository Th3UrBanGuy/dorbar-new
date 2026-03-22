"use client";

import Link from "next/link";
import Image from "next/image";
import { Bookmark, Phone, ArrowUpRight, Share, MapPin, BookOpen, BookHeart, Compass } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-blue-100 overflow-hidden relative">

      {/* Soft Top Gradient (matching the reference image's peach/blue aura) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-r from-[#FFF0E6] via-[#F8FAFC] to-[#E6F0FF] -z-10 blur-3xl opacity-80 pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-16 lg:pt-24 pb-20 relative z-10">

        {/* Title Section */}
        <div className="mb-8 pl-2">
          <h1 className="text-4xl md:text-5xl font-medium text-slate-800 tracking-tight">
            Khijiriya Chishtiya Darbar Sharif
          </h1>
        </div>

        {/* Hero Grid Container */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Large Darbar Image (Col span 8) */}
          <div className="lg:col-span-8 relative h-[350px] sm:h-[450px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-sm group">
            {/* We use a beautiful architecture/mosque placeholder image */}
            <Image
              src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1600"
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
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <h3 className="text-slate-800 text-lg font-medium leading-snug">
                  Darbar-ul-Nur Central,<br />
                  Dhaka, Bangladesh 1212
                </h3>
              </div>
              <button className="text-slate-400 hover:text-slate-800 transition-colors p-2 hover:bg-slate-50 rounded-full">
                <Bookmark className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>

            {/* Stats Separator Series */}
            <div className="flex justify-between items-end mb-8 gap-1 pr-1 overflow-x-auto hide-scrollbar sm:overflow-visible">
              <div className="flex flex-col shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1">Daily</span>
                <span className="text-[10px] sm:text-sm text-slate-500">Majlis</span>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1">24/7</span>
                <span className="text-[10px] sm:text-sm text-slate-500">Access</span>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1">10k+</span>
                <span className="text-[10px] sm:text-sm text-slate-500">Followers</span>
              </div>
            </div>

            {/* Pricing / Status row */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Free Entry</h2>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors">
                View schedule <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Agent / Contact Section */}
            <div className="mt-auto mb-6 bg-[#FAFAFA] rounded-2xl p-4 flex items-center justify-between border border-slate-100/50 hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                    alt="Khadem"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Head Khadem</span>
                  <span className="text-sm font-bold text-slate-800">Abdullah Al Mahdi</span>
                </div>
              </div>
              <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                Contact
              </button>
            </div>

            {/* Primary Action Button (Matches the Black Request Tour button) */}
            <Link href="/login" className="block w-full text-center">
              <button className="w-full bg-[#1A1A1A] hover:bg-black text-white rounded-full py-4 px-6 font-medium transition-all shadow-lg shadow-black/10 active:scale-[0.98] group">
                <span className="block text-base mb-0.5">Enter Portal Dashboard</span>
                <span className="block text-[11px] text-white/50 font-normal group-hover:text-white/70 transition-colors">
                  Available 24/7 on all devices
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
              <h4 className="font-bold text-slate-800">Quran Explorer</h4>
              <p className="text-xs text-slate-500 mt-0.5">Read & Listen</p>
            </div>
          </Link>

          <Link href="/hadith" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <BookHeart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Hadith Collection</h4>
              <p className="text-xs text-slate-500 mt-0.5">Sahih Bukhari & more</p>
            </div>
          </Link>

          <Link href="/dashboard/qibla" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <Compass className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Qibla Compass</h4>
              <p className="text-xs text-slate-500 mt-0.5">Live Direction</p>
            </div>
          </Link>

          <Link href="/events" className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:border-slate-300 transition-colors flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Darbar Events</h4>
              <p className="text-xs text-slate-500 mt-0.5">Join the Majlis</p>
            </div>
          </Link>
        </div>

      </main>
    </div>
  );
}
