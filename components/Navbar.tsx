"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Moon, Bell, Home, Calendar, Heart, Phone, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on dashboard, login, tasbih, quran, and hadith routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/quran') || pathname.startsWith('/login') || pathname.startsWith('/tasbih') || pathname.startsWith('/hadith') || pathname.startsWith('/kalam') || pathname.startsWith('/kitab')) {
    return null;
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="px-6 lg:px-12 h-24 flex items-center justify-between sticky top-0 z-50 bg-transparent hidden md:flex max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-slate-800"></div>
              <div className="w-3 h-3 rounded-full bg-slate-800 opacity-70"></div>
              <div className="w-3 h-3 rounded-full bg-slate-800 opacity-40"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 ml-1">Khijiriya Chishtiya Darbar Sharif</span>
          </Link>
        </div>
        <nav className="flex gap-8 items-center">
          <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Home</Link>
          <Link href="/events" className={`text-sm font-semibold transition-colors ${pathname === '/events' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Events</Link>
          <Link href="/donate" className={`text-sm font-semibold transition-colors ${pathname === '/donate' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Donate</Link>
          <Link href="/contact" className={`text-sm font-semibold transition-colors ${pathname === '/contact' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-xl bg-black hover:bg-slate-800 text-white h-10 px-6 font-medium">
            <Link href="/dashboard">Portal</Link>
          </Button>
        </div>
      </header>

      {/* Mobile Top Header (Logo & Bell only) */}
      <header className="px-6 h-20 flex items-center justify-between sticky top-0 z-50 bg-transparent md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 opacity-70"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 opacity-40"></div>
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 ml-1">Khijiriya Chishtiya Darbar Sharif</span>
        </Link>
        <Button asChild className="rounded-xl bg-black hover:bg-slate-800 text-white h-9 px-4 text-xs font-medium">
          <Link href="/dashboard">Portal</Link>
        </Button>
      </header>
      {/* Mobile Bottom Navigation (Public Routes Only) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200/50 px-4 py-3 flex justify-around items-center z-50 md:hidden pb-safe">
        <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-black' : 'text-slate-400'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/events" className={`flex flex-col items-center gap-1 ${pathname === '/events' ? 'text-black' : 'text-slate-400'}`}>
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Events</span>
        </Link>
        <Link href="/donate" className={`flex flex-col items-center gap-1 ${pathname === '/donate' ? 'text-black' : 'text-slate-400'}`}>
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-bold">Donate</span>
        </Link>
        <Link href="/contact" className={`flex flex-col items-center gap-1 ${pathname === '/contact' ? 'text-black' : 'text-slate-400'}`}>
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-bold">Contact</span>
        </Link>
        <Link href="/dashboard" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/dashboard') || pathname.startsWith('/login') ? 'text-black' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Portal</span>
        </Link>
      </nav>
    </>
  );
}
