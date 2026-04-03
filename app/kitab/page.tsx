"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus } from "lucide-react";
import SufiArchive from "@/components/SufiArchive";
import BookUploadModal from "@/components/BookUploadModal";
import { useUser } from "@/hooks/use-user";

export default function KitabListing() {
  const [showUpload, setShowUpload] = useState(false);
  const { hasTag } = useUser();
  const isAdmin = hasTag("Staff");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans mb-20 sm:mb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">ডিজিটাল কিতাব</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital Library Archive</p>
          </div>
        </div>

        {/* Upload button - Admin only */}
        {isAdmin && (
          <button
            onClick={() => setShowUpload(true)}
            className="h-10 px-5 rounded-full bg-orange-600 text-white flex items-center gap-2 text-xs font-bold hover:bg-orange-700 transition-colors active:scale-95 shadow-lg shadow-orange-200"
          >
            <Plus className="w-4 h-4" /> আপলোড
          </button>
        )}
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6">
        <SufiArchive initialTab="kitab" />
      </main>

      {/* Upload Modal */}
      <BookUploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onSuccess={() => {
          // Force page reload to show newly uploaded book
          window.location.reload();
        }}
      />
    </div>
  );
}
