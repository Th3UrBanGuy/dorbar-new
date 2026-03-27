import { ChevronLeft, BookHeart, Grid, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HadithItemList } from "@/components/HadithItemList";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";

interface HadithData {
  hadithnumber: number;
  arabicText: string;
  bengaliPhonetic: string;
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
}) {
  const params = await props.params;
  
  const collectionId = params.collection;
  const titles = COLLECTION_NAMES[collectionId] || { en: "Hadith Collection", ar: "الحديث" };

  let hadiths: HadithData[] = [];
  let totalHadiths = 0;
  let error = null;

  try {
    const [arRes, bnRes] = await Promise.all([
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collectionId}.json`, { next: { revalidate: 3600 * 24 } }),
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${collectionId}.json`, { next: { revalidate: 3600 * 24 } })
    ]);

    if (!arRes.ok || !bnRes.ok) throw new Error("Failed to fetch collection data.");

    const arData = await arRes.json();
    const bnData = await bnRes.json();

    if (arData.hadiths && bnData.hadiths) {
      totalHadiths = arData.hadiths.length;
      
      // Map ALL hadiths — LazyList handles progressive rendering on the client
      hadiths = arData.hadiths.map((arHadith: any, index: number) => {
        const bnHadith = bnData.hadiths[index];
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


  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Sidebar Stub */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto shrink-0 border-r border-slate-200/50">
        <Link href="/" className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
          <Image src="/image.png" alt="Logo" fill className="object-cover" />
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
              <HadithItemList hadiths={hadiths} />
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
