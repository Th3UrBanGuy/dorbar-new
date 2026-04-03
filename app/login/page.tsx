'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, Loader2, UserCircle, Users } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'user' | 'mureed' | 'staff'>('user');
  const [staffCode, setStaffCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // ─── Login ───
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          window.location.href = '/dashboard';
        } else {
          setErrorMsg(data.message || 'লগিন ব্যর্থ হয়েছে।');
          setIsLoading(false);
        }
      } else {
        // ─── Signup ───
        if (password !== confirmPassword) {
          setErrorMsg('পাসওয়ার্ড মিলছে না।');
          setIsLoading(false);
          return;
        }
        if (password.length < 4) {
          setErrorMsg('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
          setIsLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email,
            name: fullName,
            password,
            role: selectedRole,
            staffCode: selectedRole === 'staff' ? staffCode : undefined,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          window.location.href = '/dashboard';
        } else {
          setErrorMsg(data.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।');
          setIsLoading(false);
        }
      }
    } catch (err) {
      setErrorMsg('সার্ভার এরর। আবার চেষ্টা করুন।');
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-[#064E3B] flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Divine Glow / Nūr Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.15)_0%,_rgba(6,78,59,0)_60%)] pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-[120px]"></div>
      
      {/* Light Beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent rotate-12"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent -rotate-12"></div>

      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0 L100 50 L50 100 L0 50 Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3Cellipse cx=\'50\' cy=\'50\' rx=\'15\' ry=\'15\' fill=\'none\' stroke=\'white\' stroke-width=\'0.3\'/%3E%3C/svg%3E")', backgroundSize: '60px 60px' }}></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col relative z-10 p-8 sm:p-12">
        
        {/* Back to Home */}
        <div className="flex justify-start mb-6 -mt-2">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> হোম
          </Link>
        </div>

        {/* Large Logo */}
        <div className="flex justify-center mb-8 mt-2">
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

        {/* Mode Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {isLogin ? 'প্রবেশ করুন' : 'নতুন অ্যাকাউন্ট'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'আপনার অ্যাকাউন্টে লগিন করুন' : 'একটি নতুন অ্যাকাউন্ট তৈরি করুন'}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Signup: Full Name */}
          {!isLogin && (
            <input
              type="text"
              placeholder="পূর্ণ নাম *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              required={!isLogin}
            />
          )}

          {/* Username */}
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder={isLogin ? "ইউজারনেম বা ইমেইল" : "ইউজারনেম *"}
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Signup: Email */}
          {!isLogin && (
            <input
              type="email"
              placeholder="ইমেইল *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              required={!isLogin}
            />
          )}
          
          {/* Password */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="পাসওয়ার্ড *"
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
          
          {/* Signup: Confirm Password */}
          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="পাসওয়ার্ড নিশ্চিত করুন *"
                className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
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

          {/* Signup: Role Picker */}
          {!isLogin && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">অ্যাকাউন্ট টাইপ</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedRole === 'user'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span className="text-[10px] font-bold">ইউজার</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('mureed')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedRole === 'mureed'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-[10px] font-bold">মুরিদ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('staff')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedRole === 'staff'
                      ? 'border-rose-500 bg-rose-50 text-rose-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <UserCircle className="w-5 h-5 text-rose-500" />
                  <span className="text-[10px] font-bold">স্টাফ</span>
                </button>
              </div>
            </div>
          )}

          {/* Signup: Staff Registration Code */}
          {!isLogin && selectedRole === 'staff' && (
            <input
              type="text"
              placeholder="স্টাফ রেজিস্ট্রেশন কোড *"
              value={staffCode}
              onChange={(e) => setStaffCode(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border-2 border-rose-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-400"
              required={selectedRole === 'staff'}
            />
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
            <button type="button" onClick={switchMode} className="text-emerald-600 font-semibold hover:underline">
              {isLogin ? "তৈরি করুন" : "প্রবেশ করুন"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
