"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookReader from "@/components/BookReader";

interface DbBook {
  id: number;
  title: string;
  author: string;
  fileUrl: string;
}

export default function KitabReaderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<DbBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const res = await fetch('/api/books');
        if (res.ok) {
          const data = await res.json();
          const found = data.books?.find((b: DbBook) => b.id === Number(id));
          if (found) setBook(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold animate-pulse">রিডার ওপেন হচ্ছে...</p>
      </div>
    );
  }

  if (book) {
    return (
      <BookReader
        title={book.title}
        pdfUrl={book.fileUrl}
        onClose={() => router.back()}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
      <h2 className="text-xl font-bold text-slate-800 mb-2">কিতাবটি পাওয়া যায়নি</h2>
      <Button onClick={() => router.back()} className="bg-orange-600 rounded-full px-8 mt-4">ফিরে যান</Button>
    </div>
  );
}
