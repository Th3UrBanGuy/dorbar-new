import type {Metadata, Viewport} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from './providers';
import Preloader from '@/components/Preloader';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  themeColor: '#065F46',
};

export const metadata: Metadata = {
  title: 'খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ',
  description: 'কুরআন, হাদিস, কালাম, কিতাব ও আরও অনেক কিছু সহ খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ পোর্টাল।',
  manifest: '/manifest.json',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-slate-900 bg-[#F4F7FB] pb-24 md:pb-0" suppressHydrationWarning>
        <Providers>
          <Preloader />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
