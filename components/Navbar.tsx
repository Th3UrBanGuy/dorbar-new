"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Moon, Bell, Home, Calendar, Heart, Phone, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard and quran routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/quran')) {
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
            <span className="font-bold text-xl tracking-tight text-slate-900 ml-1">Darbar Sharif</span>
          </Link>
        </div>
        <nav className="flex gap-8 items-center">
          <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Home</Link>
          <Link href="/about" className={`text-sm font-semibold transition-colors ${pathname === '/about' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>About Us</Link>
          <Link href="/features" className={`text-sm font-semibold transition-colors ${pathname === '/features' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Features</Link>
          <Link href="/blog" className={`text-sm font-semibold transition-colors ${pathname === '/blog' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>Blog</Link>
          <Link href="/faq" className={`text-sm font-semibold transition-colors ${pathname === '/faq' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}>FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="rounded-xl bg-black hover:bg-slate-800 text-white h-10 px-6 font-medium">
            <Link href="/dashboard">Sign In</Link>
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
          <span className="font-bold text-lg tracking-tight text-slate-900 ml-1">Darbar Sharif</span>
        </Link>
        <Button asChild className="rounded-xl bg-black hover:bg-slate-800 text-white h-9 px-4 text-xs font-medium">
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </header>
    </>
  );
}
