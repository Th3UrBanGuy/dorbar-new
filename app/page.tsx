import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Repeat, ArrowDownLeft, ArrowUpRight, Bell } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#E0F2FE] to-[#F0FDF4] flex flex-col font-sans selection:bg-cyan-200 overflow-hidden relative">
      
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-200/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 lg:px-12 pt-12 lg:pt-24 pb-12 gap-16 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left z-10">
            
            {/* Badge */}
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white/40 rounded-full p-1 pr-4 mb-8 shadow-sm">
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">New</span>
              <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                Download New iOS App <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Faith Made Simple, <br className="hidden md:block" />
              Life Made Easy
            </h1>
            
            <p className="text-slate-600 text-lg max-w-lg mb-10 leading-relaxed">
              We are your one-stop platform to empower your daily Islamic practices. More than just an app, it&apos;s your spiritual companion and saving platform.
            </p>
            
            <Button size="lg" asChild className="rounded-xl bg-[#67E8F9] hover:bg-[#22D3EE] text-slate-900 shadow-lg shadow-cyan-500/20 h-14 px-8 text-lg font-semibold w-full sm:w-auto transition-all hover:scale-105">
              <Link href="/dashboard">
                Start for Free
              </Link>
            </Button>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#E0F7FA] overflow-hidden relative z-30">
                  <Image src="https://picsum.photos/seed/user1/100/100" alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#E0F7FA] overflow-hidden relative z-20">
                  <Image src="https://picsum.photos/seed/user2/100/100" alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[#E0F7FA] overflow-hidden relative z-10">
                  <Image src="https://picsum.photos/seed/user3/100/100" alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-900">220k+</h4>
                <p className="text-sm text-slate-500 font-medium">Active User</p>
              </div>
            </div>
          </div>

          {/* Right Content (Phone Mockup) */}
          <div className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0 z-10">
            {/* Phone Frame */}
            <div className="relative w-[320px] h-[650px] mx-auto bg-slate-900 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden shadow-slate-900/40">
              
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-50"></div>
              
              {/* Screen Content */}
              <div className="absolute inset-0 bg-[#F4F7FB] flex flex-col pt-12 px-5 pb-6">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image src="https://picsum.photos/seed/avatar/100/100" alt="Profile" width={40} height={40} className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Your wallet</p>
                      <h3 className="text-sm font-bold text-slate-900">Hello, Mario Dandy</h3>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Bell className="w-4 h-4 text-slate-600" />
                  </div>
                </div>

                {/* Balance */}
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Total Balance</p>
                    <h2 className="text-3xl font-bold text-[#0066FF]">$ 12,540.08</h2>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Repeat className="w-4 h-4 text-slate-600" />
                  </div>
                </div>

                {/* Card */}
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-slate-800 to-black p-5 flex flex-col justify-between text-white shadow-lg relative overflow-hidden mb-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <div className="w-10 h-8 bg-white/20 rounded flex items-center justify-center relative z-10">
                    <div className="w-4 h-4 border border-white/50 rounded-sm"></div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xl font-mono tracking-widest mb-2">4006 **** **** 3447</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] text-white/60 uppercase tracking-wider mb-1">Card Holder</p>
                        <p className="text-xs font-bold uppercase">Cristiano Mario Dandy</p>
                      </div>
                      <div className="text-xl font-bold italic">VISA</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm font-semibold text-sm text-slate-800">
                    <ArrowDownLeft className="w-4 h-4" /> Deposit
                  </div>
                  <div className="bg-white rounded-xl py-3 flex items-center justify-center gap-2 shadow-sm font-semibold text-sm text-slate-800">
                    <ArrowUpRight className="w-4 h-4" /> Transfer
                  </div>
                </div>

                {/* Transactions */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-3 text-sm">Last Transactions</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Image src="https://picsum.photos/seed/netflix/40/40" alt="Netflix" width={20} height={20} className="rounded" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Netflix</p>
                          <p className="text-[10px] text-slate-500">Subscription</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-900">-$15.99</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/2 right-[-20px] sm:right-[-60px] bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
              <h4 className="text-2xl font-bold text-slate-900 mb-1">$ 18,560.20</h4>
              <p className="text-xs text-slate-500 font-medium">Receive $6,282.00 in this month.</p>
            </div>

            <div className="absolute bottom-1/3 left-[-20px] sm:left-[-80px] bg-[#67E8F9] rounded-xl p-3 shadow-lg shadow-cyan-500/20 z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image src="https://picsum.photos/seed/bessi/100/100" alt="Bessi" width={40} height={40} className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="pr-4">
                <h4 className="text-sm font-bold text-slate-900">Bessi Cooper</h4>
                <p className="text-[10px] text-slate-700 font-medium">****5652 3356 3447</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-800" />
            </div>

          </div>
        </div>

      </main>

      {/* Partners / Integrations */}
      <div className="w-full bg-white/50 backdrop-blur-md border-t border-white/40 py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <div className="flex gap-1">
              <div className="w-1.5 h-4 bg-slate-800 rounded-full"></div>
              <div className="w-1.5 h-6 bg-slate-800 rounded-full"></div>
              <div className="w-1.5 h-3 bg-slate-800 rounded-full"></div>
            </div>
            Social
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <span className="text-2xl">#</span> Slack
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <span className="text-orange-500">🦊</span> Gitlab
          </div>
          <div className="font-bold text-2xl text-slate-800 tracking-tighter">
            stripe
          </div>
          <div className="font-bold text-xl text-blue-900">
            Booking.com
          </div>
          <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <span className="text-blue-600">@</span> Mail.ru
          </div>
        </div>
      </div>
    </div>
  );
}
