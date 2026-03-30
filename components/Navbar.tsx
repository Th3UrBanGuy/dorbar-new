"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Heart, Phone, LayoutDashboard, Images } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on dashboard, login, tasbih, quran, hadith, topics, kalam, kitab routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/quran') || pathname.startsWith('/login') || pathname.startsWith('/tasbih') || pathname.startsWith('/hadith') || pathname.startsWith('/topics') || pathname.startsWith('/kalam') || pathname.startsWith('/kitab')) {
    return null;
  }

  const logoUrl = "/image.png";

  return (
    <>
      {/* Desktop Header */}
      <header className="px-6 lg:px-12 h-28 flex items-center justify-between sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md hidden md:flex max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <div className="relative w-80 h-24 lg:w-[28rem] lg:h-[7rem]">
              <Image 
                src={logoUrl} 
                alt="খিজিরিয়া চিশতিয়া দরবার শরীফ" 
                fill 
                sizes="384px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>
        <nav className="flex gap-6 lg:gap-8 items-center">
          <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>হোম</Link>
          <Link href="/events" className={`text-sm font-semibold transition-colors ${pathname === '/events' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>ইভেন্ট</Link>
          <Link href="/gallery" className={`text-sm font-semibold transition-colors ${pathname === '/gallery' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>গ্যালারি</Link>
          <Link href="/donate" className={`text-sm font-semibold transition-colors ${pathname === '/donate' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>দান করুন</Link>
          <Link href="/contact" className={`text-sm font-semibold transition-colors ${pathname === '/contact' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>যোগাযোগ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-xl bg-black hover:bg-slate-800 text-white h-10 px-6 font-medium">
            <Link href="/dashboard">পোর্টাল</Link>
          </Button>
        </div>
      </header>

      {/* Mobile Top Header (Logo & Portal button) */}
      <header className="px-3 sm:px-6 h-20 sm:h-24 flex items-center justify-between sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md md:hidden gap-2">
        <Link href="/" className="flex items-center flex-1 min-w-0">
          <div className="relative w-full max-w-[240px] sm:max-w-[300px] h-16 sm:h-20">
            <Image 
              src={logoUrl} 
              alt="খিজিরিয়া চিশতিয়া দরবার শরীফ" 
              fill 
              sizes="(max-width: 640px) 240px, 300px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        <Button asChild className="rounded-xl bg-black hover:bg-slate-800 text-white h-9 px-4 sm:px-5 font-medium shrink-0 text-xs shadow-md">
          <Link href="/dashboard">পোর্টাল</Link>
        </Button>
      </header>

      {/* Mobile Bottom Navigation (Public Routes Only) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/50 px-4 py-3 flex justify-around items-center z-50 md:hidden pb-safe">
        <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-black' : 'text-slate-400'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">হোম</span>
        </Link>
        <Link href="/events" className={`flex flex-col items-center gap-1 ${pathname === '/events' ? 'text-black' : 'text-slate-400'}`}>
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">ইভেন্ট</span>
        </Link>
        <Link href="/donate" className={`flex flex-col items-center gap-1 ${pathname === '/donate' ? 'text-black' : 'text-slate-400'}`}>
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-bold">দান</span>
        </Link>
        <Link href="/contact" className={`flex flex-col items-center gap-1 ${pathname === '/contact' ? 'text-black' : 'text-slate-400'}`}>
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold">যোগাযোগ</span>
        </Link>
        <Link href="/gallery" className={`flex flex-col items-center gap-1 ${pathname === '/gallery' ? 'text-black' : 'text-slate-400'}`}>
          <Images className="w-5 h-5" />
          <span className="text-[10px] font-bold">গ্যালারি</span>
        </Link>
      </nav>
    </>
  );
}
