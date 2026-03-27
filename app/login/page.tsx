'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "dorbar_auth=true; path=/; max-age=86400";
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      
      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\' fill=\'none\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>

      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-black/20 overflow-hidden flex flex-col md:flex-row min-h-[600px] relative z-10">

        {/* Left Side - Darbar Branding Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 relative overflow-hidden flex flex-col justify-between p-10 text-white">
          {/* Background decorative */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\' fill=\'none\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>

          {/* Logo */}
          <div className="relative z-10">
            <div className="relative w-48 h-14 mb-6">
              <Image 
                src="/image.png" 
                alt="দরবার শরীফ" 
                fill 
                sizes="192px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          </div>
          
          {/* Center Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              খিজিরিয়া চিশতিয়া<br/>ভান্ডার দরবার শরীফ
            </h2>
            <p className="text-emerald-200 text-sm leading-relaxed max-w-sm">
              কুরআন, হাদিস, কালাম, কিতাব ও আধ্যাত্মিক জ্ঞানের ভান্ডার — সকলের জন্য উন্মুক্ত পোর্টাল।
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-[11px] font-medium border border-white/10">📖 কুরআন</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-[11px] font-medium border border-white/10">📚 হাদিস</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-[11px] font-medium border border-white/10">🎵 কালাম</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-[11px] font-medium border border-white/10">📕 কিতাব</span>
            </div>
          </div>

          {/* Bottom - Address */}
          <div className="relative z-10 text-emerald-200/60 text-xs">
            <p>ফকিরখীল, পাইন্দং</p>
          </div>
        </div>

        {/* Right Side - Form Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-white to-emerald-50/30 p-10 sm:p-12 flex flex-col justify-center">
          
          {/* Back to Home */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors mb-8 w-fit">
            <ArrowLeft className="w-4 h-4" /> হোম পেজে ফিরে যান
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {isLogin ? "স্বাগতম" : "অ্যাকাউন্ট তৈরি করুন"}
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            {isLogin ? "আপনার পোর্টাল অ্যাকাউন্টে প্রবেশ করুন।" : "নতুন অ্যাকাউন্ট তৈরি করুন এবং পোর্টালে যোগ দিন।"}
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="পূর্ণ নাম"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
              </div>
            )}
            <div className="relative">
              <input
                type="email"
                placeholder="ইমেইল ঠিকানা"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড"
                className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {!isLogin && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
            >
              {isLogin ? "প্রবেশ করুন" : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              {isLogin ? "অ্যাকাউন্ট নেই? " : "ইতিমধ্যে অ্যাকাউন্ট আছে? "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-emerald-600 font-semibold hover:underline">
                {isLogin ? "তৈরি করুন" : "প্রবেশ করুন"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
