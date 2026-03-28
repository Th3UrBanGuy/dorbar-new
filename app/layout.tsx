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
  title: 'খিজিরিয়া চিশতিয়া ভান্ডার',
  description: 'খিজিরিয়া চিশতিয়া ভান্ডার দরবার শরীফ পোর্টাল - কুরআন, হাদিস, কালাম ও আরও অনেক কিছু',
  manifest: '/manifest.json',
  icons: {
    icon: '/3.png',
    apple: '/3.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'খিজিরিয়া চিশতিয়া ভান্ডার',
  },
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
