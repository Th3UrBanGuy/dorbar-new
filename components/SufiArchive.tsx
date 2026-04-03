"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, Book, ChevronLeft, Search, Play, 
  Lock, AlertCircle, Loader2, Shield, HardDrive
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DbBook {
  id: number;
  title: string;
  author: string;
  description: string;
  fileUrl: string;
  fileSize: number | null;
  coverColor: string;
  isMureedOnly: boolean;
  createdAt: string;
}

interface DbKalam {
  id: number;
  title: string;
  content: string;
  writer: string;
  mediaUrl: string | null;
  category: string;
  isMureedOnly: boolean;
  createdAt: string;
}

interface SufiArchiveProps {
  initialTab?: "kalam" | "kitab";
}

export default function SufiArchive({ initialTab = "kalam" }: SufiArchiveProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<DbBook[]>([]);
  const [kalams, setKalams] = useState<DbKalam[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [booksRes, kalamsRes] = await Promise.all([
          fetch('/api/books').then(r => r.ok ? r.json() : { books: [] }).catch(() => ({ books: [] })),
          fetch('/api/kalams').then(r => r.ok ? r.json() : { kalams: [] }).catch(() => ({ kalams: [] })),
        ]);

        setBooks(booksRes.books || []);
        setKalams(kalamsRes.kalams || []);
        setError(null);
      } catch (err) {
        setError("তথ্য লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredKalams = kalams.filter(k => 
    k.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    k.writer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-slate-500 font-medium">আর্কাইভ লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <p className="text-slate-700 font-bold">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-emerald-600">আবার চেষ্টা করুন</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Search & Tabs */}
      <div className="sticky top-20 z-40 bg-[#F8FAFC]/95 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder={activeTab === 'kalam' ? "কালামুজ কালাম খুঁজুন..." : "কিতাব খুঁজুন..."}
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-full sm:w-min">
          <button 
            onClick={() => setActiveTab("kalam")}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'kalam' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            কালাম
          </button>
          <button 
            onClick={() => setActiveTab("kitab")}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'kitab' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            কিতাব
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "kalam" ? (
          <motion.div 
            key="kalam-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3 pb-20"
          >
            {filteredKalams.length > 0 ? filteredKalams.map((kalam) => (
              <Link 
                href={`/kalam/${kalam.id}`} 
                key={kalam.id}
                className="block bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group overflow-hidden relative"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white shrink-0">
                      <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                          {kalam.title}
                        </h4>
                        {kalam.isMureedOnly && (
                          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100 text-[8px] sm:text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
                            <Lock className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> Restricted
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-medium font-serif italic">{kalam.writer}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </Link>
            )) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                <Music className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold">কোন কালাম খুঁজে পাওয়া যায়নি।</p>
                <p className="text-xs text-slate-300 mt-1">স্টাফ অ্যাকাউন্ট থেকে কালাম যোগ করুন</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="kitab-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 pb-20"
          >
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {filteredBooks.map((book) => (
                  <Link 
                    href={`/kitab/${book.id}/read`} 
                    key={book.id}
                    className="bg-white rounded-[2.5rem] p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col items-start text-left"
                  >
                    <div className="flex items-start justify-between w-full mb-4 sm:mb-6">
                      <div
                        className="w-14 h-18 sm:w-16 sm:h-20 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-inner shrink-0"
                        style={{ backgroundColor: book.coverColor + '15' }}
                      >
                        <Book className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" style={{ color: book.coverColor }} />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5 sm:gap-2">
                        <span className="px-2.5 py-1 bg-orange-50 rounded-full text-[8px] sm:text-[10px] font-bold text-orange-600 uppercase tracking-widest border border-orange-100">
                          <HardDrive className="w-2.5 h-2.5 inline mr-1" />Cloud
                        </span>
                        {book.isMureedOnly && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 rounded-full text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-tighter">
                            <Shield className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> মুরিদ
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-4 sm:mb-6">{book.author}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 w-full flex justify-between items-center group/btn">
                      <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider group-hover/btn:translate-x-1 transition-transform inline-flex items-center gap-1">
                        এখনই পড়ুন <ChevronLeft className="w-3 h-3 rotate-180" />
                      </span>
                      {book.fileSize && (
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                          {formatFileSize(book.fileSize)}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                <Book className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-bold">কোন কিতাব খুঁজে পাওয়া যায়নি।</p>
                <p className="text-xs text-slate-300 mt-1">স্টাফ অ্যাকাউন্ট থেকে কিতাব আপলোড করুন</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
