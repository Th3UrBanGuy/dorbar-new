import type {Metadata, Viewport} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from './providers';
import Preloader from '@/components/Preloader';
import TranslationPrompt from '@/components/TranslationPrompt';

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
      <head>
        <script
          dangerouslySetInnerHTML={{
             __html: `
               if (typeof Node === 'function' && Node.prototype) {
                 const originalRemoveChild = Node.prototype.removeChild;
                 Node.prototype.removeChild = function(child) {
                   if (child.parentNode !== this) {
                     if (console) { console.warn('Cannot remove a child from a different parent', child, this); }
                     return child;
                   }
                   return originalRemoveChild.apply(this, arguments);
                 };
               
                 const originalInsertBefore = Node.prototype.insertBefore;
                 Node.prototype.insertBefore = function(newNode, referenceNode) {
                   if (referenceNode && referenceNode.parentNode !== this) {
                     if (console) { console.warn('Cannot insert before a reference node from a different parent', referenceNode, this); }
                     return newNode;
                   }
                   return originalInsertBefore.apply(this, arguments);
                 };
               }
             `
          }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-[#F4F7FB] pb-24 md:pb-0" suppressHydrationWarning>
        <Providers>
          <Preloader />
          <TranslationPrompt />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
