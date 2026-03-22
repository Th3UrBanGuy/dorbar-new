import { ChevronLeft, Share2, BookmarkPlus, BookHeart, Grid, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";

interface HadithData {
  hadithnumber: number;
  arabicText: string;
  bengaliPhonetic?: string;
  bengaliText: string;
  reference: {
    book: number;
    hadith: number;
  };
}

const COLLECTION_NAMES: Record<string, { en: string, ar: string }> = {
  bukhari: { en: "Sahih Bukhari", ar: "صحيح البخاري" },
  muslim: { en: "Sahih Muslim", ar: "صحيح مسلم" },
  abudawud: { en: "Sunan Abu Dawud", ar: "سنن أبي داود" },
  tirmidhi: { en: "Jami' At-Tirmidhi", ar: "جامع الترمذي" },
  nasai: { en: "Sunan An-Nasa'i", ar: "سنن النسائي" },
  ibnmajah: { en: "Sunan Ibn Majah", ar: "سنن ابن ماجه" },
  malik: { en: "Muwatta Malik", ar: "موطأ مالك" }
};

export default async function HadithReaderPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  
  const collectionId = params.collection;
  const titles = COLLECTION_NAMES[collectionId] || { en: "Hadith Collection", ar: "الحديث" };
  
  // Pagination parsing
  const pageParam = searchParams?.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const ITEMS_PER_PAGE = 20;

  let hadiths: HadithData[] = [];
  let totalHadiths = 0;
  let error = null;

  try {
    // SSR Fetch: Executes strictly on the Next.js server. Extremely fast.
    const [arRes, bnRes] = await Promise.all([
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collectionId}.json`, { next: { revalidate: 3600 * 24 } }),
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${collectionId}.json`, { next: { revalidate: 3600 * 24 } })
    ]);

    if (!arRes.ok || !bnRes.ok) throw new Error("Failed to fetch collection data.");

    const arData = await arRes.json();
    const bnData = await bnRes.json();

    if (arData.hadiths && bnData.hadiths) {
      totalHadiths = arData.hadiths.length;
      
      // Slice exactly the requested page data BEFORE mapping, saving immense processing time
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = page * ITEMS_PER_PAGE;
      const arPageData = arData.hadiths.slice(startIndex, endIndex);
      
      hadiths = arPageData.map((arHadith: any, index: number) => {
        const absoluteIndex = startIndex + index;
        const bnHadith = bnData.hadiths[absoluteIndex];
        return {
          hadithnumber: arHadith.hadithnumber,
          arabicText: arHadith.text,
          bengaliPhonetic: transliterateArabicToBengali(arHadith.text),
          bengaliText: bnHadith ? bnHadith.text : "Translation unavailable.",
          reference: arHadith.reference || { book: 0, hadith: 0 }
        };
      });
    } else {
      throw new Error("Invalid API format returned.");
    }
  } catch (err) {
    console.error(err);
    error = "Error fetching hadith data or collections are missing.";
  }

  const totalPages = Math.ceil(totalHadiths / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Sidebar Stub */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto shrink-0 border-r border-slate-200/50">
        <Link href="/" className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <BookHeart className="w-6 h-6" />
        </Link>
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <Link href="/hadith" className="text-emerald-500 relative flex justify-center w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>
            <BookHeart className="w-6 h-6" />
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-4">
            <Link href="/hadith" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{titles.en}</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {totalHadiths.toLocaleString()} Total Hadiths • SSR Optimized
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl sm:text-3xl font-arabic text-emerald-600 hidden sm:block" dir="rtl">
               {titles.ar}
             </h2>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-10 pb-24 pt-6 scroll-smooth">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            
            {error ? (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl font-medium">{error}</div>
            ) : (
              hadiths.map((hadith) => (
                <div
                  key={hadith.hadithnumber}
                  className="group relative bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-emerald-100 transition-all"
                >
                  {/* Actions/Numbering */}
                  <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-emerald-50 text-emerald-600">
                        {hadith.hadithnumber}
                      </div>
                      {hadith.reference && hadith.reference.book > 0 && (
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                          Book {hadith.reference.book}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors">
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 1. Arabic Text */}
                  <div className="mb-8 pl-4 sm:pl-10">
                    <p 
                      className="text-2xl sm:text-3xl font-arabic leading-[1.8] text-right text-slate-800" 
                      dir="rtl"
                    >
                      {hadith.arabicText}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* 2. Phonetic Transliteration Box */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Bangla Uccharon (Phonetic)</h4>
                      <p className="text-base text-slate-600 font-medium italic font-bengali leading-relaxed">
                        {hadith.bengaliPhonetic}
                      </p>
                    </div>

                    {/* 3. Bengali Translation (Meaning) */}
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                      <h4 className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-2">Meaning (Bangla)</h4>
                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bengali">
                        {hadith.bengaliText}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Pagination Controls */}
            {!error && totalHadiths > 0 && (
              <div className="flex items-center justify-between border-t border-slate-100 pt-8 mt-4 pb-12">
                 <Link href={`/hadith/${collectionId}?page=${Math.max(1, page - 1)}`} className={page === 1 ? 'pointer-events-none opacity-50' : ''}>
                   <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">
                     <ChevronLeft className="w-4 h-4 mr-1" /> Previous Page
                   </Button>
                 </Link>

                 <div className="text-sm font-bold text-slate-500">
                   Page {page} <span className="text-slate-300 font-normal">of</span> {totalPages}
                 </div>

                 <Link href={`/hadith/${collectionId}?page=${Math.min(totalPages, page + 1)}`} className={page === totalPages ? 'pointer-events-none opacity-50' : ''}>
                   <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">
                     Next Page <ChevronLeft className="w-4 h-4 ml-1 rotate-180" />
                   </Button>
                 </Link>
              </div>
            )}
            
          </div>
        </div>

      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Quran</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-emerald-500">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Hadith</span>
        </Link>
      </nav>
    </div>
  );
}
