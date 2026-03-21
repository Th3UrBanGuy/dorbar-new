'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Sample login logic: just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1E1E24] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-5xl bg-[#FDFDFD] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side - Dark Panel */}
        <div className="md:w-1/2 bg-[#1A1A24] relative overflow-hidden flex flex-col justify-between p-10 text-center">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,200 C100,100 300,300 400,200" fill="none" stroke="#4F46E5" strokeWidth="1" />
              <path d="M0,250 C150,150 250,350 400,250" fill="none" stroke="#4F46E5" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#1A1A24]/50 to-[#1A1A24] pointer-events-none"></div>

          {/* Top Content */}
          <div className="relative z-10 flex-1 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">Find a traveler</h2>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Send or Carry – Hassle Free</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Need help with baggage or shipping products from another country? Post or request – Tripshipr connects travelers and shoppers
            </p>
            
            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-1.5 bg-blue-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-white to-pink-50/30 p-10 sm:p-12 flex flex-col justify-center">
          
          {/* Logo Placeholder */}
          <div className="mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500 text-sm mb-8">Your connections are just a few steps away.</p>

          {/* Social Logins */}
          <div className="flex gap-4 mb-6">
            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs text-slate-400 font-medium">Or Signup with</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Full name" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm password" 
                className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full h-12 mt-2 bg-[#5A67D8] hover:bg-[#4C51BF] text-white font-medium rounded-xl transition-colors shadow-md shadow-indigo-500/20"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Already have an account? <Link href="/login" className="text-[#5A67D8] font-semibold hover:underline">Sign In</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
