import { ChevronLeft, BookOpen, Volume2, Info, Heart, Grid, BookHeart } from "lucide-react";
import Link from "next/link";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";

interface Ayah {
  numberInSurah: number;
  text: string;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: {
    arabic: Ayah;
    bengali: Ayah;
    bengaliPhonetic: string;
  }[];
}

export default async function SurahDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  let surah: SurahData | null = null;
  let error: string | null = null;

  try {
    // SSR Fetch: Next.js securely fetches on the backend rendering HTML instantly.
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${params.id}/editions/quran-uthmani,bn.bengali`, { 
      next: { revalidate: 3600 * 24 } 
    });
    
    if (!res.ok) throw new Error("Failed Network Response from AlQuran Cloud");

    const data = await res.json();
    
    if (data.code === 200 && data.data && data.data.length === 2) {
      const arabicData = data.data[0];
      const bengaliData = data.data[1];

      // Map the parallel arrays and generate Bengali Transliteration immediately
      const mappedAyahs = arabicData.ayahs.map((ayah: any, index: number) => ({
        arabic: ayah,
        bengali: bengaliData.ayahs[index],
        bengaliPhonetic: transliterateArabicToBengali(ayah.text),
      }));

      surah = {
        number: arabicData.number,
        name: arabicData.name,
        englishName: arabicData.englishName,
        englishNameTranslation: arabicData.englishNameTranslation,
        revelationType: arabicData.revelationType,
        numberOfAyahs: arabicData.numberOfAyahs,
        ayahs: mappedAyahs
      };
    } else {
      error = "Failed to locate surah translations.";
    }
  } catch (err) {
    console.error("Failed to fetch surah details", err);
    error = "Network error occurred or API limit reached.";
  }

  if (error || !surah) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center flex-col">
        <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <Info className="w-5 h-5" />
          <p className="font-medium">{error || "Surah not found"}</p>
        </div>
        <Link href="/quran" className="mt-6 text-emerald-600 font-medium hover:underline">
          Return to Quran Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Desktop Sidebar Stub */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto shrink-0 border-r border-slate-200/50">
        <Link href="/" className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <BookOpen className="w-6 h-6" />
        </Link>
        <nav className="flex flex-col gap-8 flex-1 w-full items-center mt-4">
          <Link href="/quran" className="text-emerald-500 relative flex justify-center w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"></div>
            <BookOpen className="w-6 h-6" />
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white md:rounded-l-[3rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] relative">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 gap-4 z-10 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-4">
            <Link href="/quran" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{surah.englishName}</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {surah.englishNameTranslation} • {surah.revelationType === "Meccan" ? "Makki" : "Madani"} • {surah.numberOfAyahs} Ayahs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl sm:text-3xl font-arabic text-emerald-600 hidden sm:block" dir="rtl">
               {surah.name.replace('سُورَةُ ', '')}
             </h2>
          </div>
        </header>

        {/* Scrollable Ayah Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-10 pb-24 md:pb-10 pt-6 scroll-smooth">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            
            {/* Bismillah Header (if not Surah 1 or 9) */}
            {surah.number !== 1 && surah.number !== 9 && (
              <div className="text-center py-8">
                <h2 className="text-3xl sm:text-4xl font-arabic text-slate-800" dir="rtl">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </h2>
              </div>
            )}

            {surah.ayahs.map((ayahTuple) => (
              <div
                key={ayahTuple.arabic.numberInSurah}
                className="group relative bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md hover:border-emerald-100 transition-all"
              >
                {/* Ayah Actions/Numbering */}
                <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-emerald-50 text-emerald-600">
                    {ayahTuple.arabic.numberInSurah}
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 1. Arabic Text */}
                <div className="mb-8 pl-4 sm:pl-10">
                  <p 
                    className="text-3xl sm:text-4xl lg:text-5xl font-arabic leading-[1.8] text-right text-slate-800" 
                    dir="rtl"
                  >
                    {ayahTuple.arabic.text}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* 2. Phonetic Transliteration (Uccharon) mapped natively to Bengali */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Bangla Uccharon (Phonetic)</h4>
                    <p className="text-base sm:text-lg text-slate-600 font-medium italic font-bengali leading-relaxed">
                      {ayahTuple.bengaliPhonetic}
                    </p>
                  </div>

                  {/* 3. Bengali Translation (Meaning) */}
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                    <h4 className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-2">Meaning (Bangla)</h4>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-bengali">
                      {ayahTuple.bengali.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-emerald-500">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium">Quran</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Hadith</span>
        </Link>
      </nav>
    </div>
  );
}
