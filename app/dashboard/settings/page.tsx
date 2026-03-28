"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, Mail, Phone, Lock, Camera, ArrowLeft, 
  Bell, Moon, Globe, Shield, LogOut, ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "মোহাম্মদ জাবেল",
    username: "jabel_khijiriya",
    email: "jabel@example.com",
    phone: "017XXXXXXXX",
  });

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans pb-20 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 h-16 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">সেটিংস</h1>
      </header>

      <main className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Profile Section Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center"
        >
          <div className="relative group cursor-pointer group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-md">
              <Image 
                src="https://picsum.photos/seed/avatar/200/200" 
                alt="Profile" 
                width={128} 
                height={128} 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg group-hover:bg-emerald-700 transition-colors">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">{profile.name}</h2>
          <p className="text-slate-500 text-sm font-medium">@{profile.username}</p>
        </motion.div>

        {/* Settings Navigation Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-200/50 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            প্রোফাইল
          </button>
          <button 
            onClick={() => setActiveTab("app")}
            className={`py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'app' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            অ্যাপ সেটিংস
          </button>
        </div>

        {activeTab === "profile" ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {[
              { label: "পূর্ণ নাম", value: profile.name, icon: User, type: "text" },
              { label: "ইউজারনেম", value: profile.username, icon: Shield, type: "text" },
              { label: "ইমেইল", value: profile.email, icon: Mail, type: "email" },
              { label: "ফোন নম্বর", value: profile.phone, icon: Phone, type: "tel" },
              { label: "পাসওয়ার্ড", value: "••••••••", icon: Lock, type: "password" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:border-emerald-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <input 
                    type={item.type} 
                    defaultValue={item.value} 
                    className="w-full bg-transparent text-sm font-semibold text-slate-700 focus:outline-none" 
                  />
                </div>
                <button className="text-emerald-600 text-xs font-bold hover:underline">এডিট</button>
              </div>
            ))}
            
            <Button className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200 transition-all mt-4">
              পরিবর্তনগুলো সেভ করুন
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            {[
              { title: "নোটিফিকেশন", desc: "পুশ নোটিফিকেশন ম্যানেজ করুন", icon: Bell, action: "টগল করুন" },
              { title: "ডার্ক মোড", desc: "থিম পরিবর্তন করুন", icon: Moon, action: "বন্ধ" },
              { title: "ভাষা", desc: "বাংলা / English", icon: Globe, action: "বাংলা" },
              { title: "প্রাইভেসি", desc: "একাউন্ট সিকিউরিটি", icon: Shield, action: "ম্যানেজ" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{item.action}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
            
            <button className="w-full mt-6 p-4 rounded-2xl border-2 border-dashed border-red-100 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              লগআউট
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
