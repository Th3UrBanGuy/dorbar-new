'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // If it's signup mode, for now just show an error as only admin login is supported via JWT
      if (!isLogin) {
        setErrorMsg("রেজিস্ট্রেশন আপাতত বন্ধ আছে।");
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Use hard navigation to cleanly load the authenticated session
        // and prevent the UI from freezing during Next.js SPA transitions
        window.location.href = '/dashboard';
      } else {
        setErrorMsg(data.message || 'লগিন ব্যর্থ হয়েছে।');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('সার্ভার এরর। আবার চেষ্টা করুন।');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      
      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\' fill=\'none\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-black/20 overflow-hidden flex flex-col relative z-10 p-8 sm:p-12">
        
        {/* Back to Home */}
        <div className="flex justify-start mb-6 -mt-2">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> হোম
          </Link>
        </div>

        {/* Large Logo */}
        <div className="flex justify-center mb-10 mt-2">
          <div className="relative w-64 h-24 sm:w-80 sm:h-28">
            <Image 
              src="/image.png" 
              alt="দরবার শরীফ" 
              fill 
              sizes="320px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 text-center font-medium">
              {errorMsg}
            </div>
          )}

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
              type="text"
              placeholder="ইউজারনেম বা ইমেইল"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="পাসওয়ার্ড"
              className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLogin ? "প্রবেশ করুন" : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-500">
            {isLogin ? "অ্যাকাউন্ট নেই? " : "ইতিমধ্যে অ্যাকাউন্ট আছে? "}
            <button type="button" onClick={() => {setIsLogin(!isLogin); setErrorMsg('');}} className="text-emerald-600 font-semibold hover:underline">
              {isLogin ? "তৈরি করুন" : "প্রবেশ করুন"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
