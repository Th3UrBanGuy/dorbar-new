import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Khijiriya Chishtiya Darbar Sharif Portal',
  description: 'A modern portal app for Khijiriya Chishtiya Darbar Sharif featuring Quran, Hadith, Kalam, Kitab Library, and more.',
  manifest: '/manifest.json',
  themeColor: '#0066FF',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-slate-900 bg-[#F4F7FB] pb-24 md:pb-0" suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
