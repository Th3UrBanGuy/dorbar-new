import { ChevronLeft, BookOpen, Info, Grid, BookHeart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { QuranAyahList } from "@/components/QuranAyahList";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";
import fs from "fs";
import path from "path";

interface Ayah {
  number: number;
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
    const localPath = path.join(process.cwd(), "public", "data", "quran", "surahs", `${params.id}.json`);
    
    if (fs.existsSync(localPath)) {
      const rawFile = fs.readFileSync(localPath, 'utf8');
      const data = JSON.parse(rawFile);
      
      if (data.code === 200 && data.data && data.data.length === 2) {
        const arabicData = data.data[0];
        const bengaliData = data.data[1];

      // Map the parallel arrays and generate Bengali Transliteration immediately
      const mappedAyahs = arabicData.ayahs.map((ayah: any, index: number) => {
        let cleanedArabicText = ayah.text;
        
        // Strip Arabic Bismillah from Ayah 1 (except Surah 1 & 9)
        if (index === 0 && arabicData.number !== 1 && arabicData.number !== 9) {
           const bismillahPrefix1 = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
           const bismillahPrefix2 = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
           
           if (cleanedArabicText.startsWith(bismillahPrefix1)) {
             cleanedArabicText = cleanedArabicText.substring(bismillahPrefix1.length).trim();
           } else if (cleanedArabicText.startsWith(bismillahPrefix2)) {
             cleanedArabicText = cleanedArabicText.substring(bismillahPrefix2.length).trim();
           } else {
             // Fallback Regex for any diacritic variation
             cleanedArabicText = cleanedArabicText.replace(/^ب[\u064B-\u065F]*س[\u064B-\u065F]*م[\u064B-\u065F]*\s+ٱ?ل[\u064B-\u065F]*ل[\u064B-\u065F]*ه[\u064B-\u065F]*\s+ٱ?ل[\u064B-\u065F]*ر[\u064B-\u065F]*ح[\u064B-\u065F]*م[\u064B-\u065F]*[ـٰ]*ن[\u064B-\u065F]*\s+ٱ?ل[\u064B-\u065F]*ر[\u064B-\u065F]*ح[\u064B-\u065F]*ي[\u064B-\u065F]*م[\u064B-\u065F]*\s*/, '').trim();
           }
        }

        return {
          arabic: { ...ayah, text: cleanedArabicText },
          bengali: bengaliData.ayahs[index],
          bengaliPhonetic: transliterateArabicToBengali(cleanedArabicText),
        };
      });

      surah = {
        number: arabicData.number,
        name: arabicData.name,
        englishName: arabicData.englishName,
        englishNameTranslation: arabicData.englishNameTranslation,
        revelationType: arabicData.revelationType,
        numberOfAyahs: arabicData.numberOfAyahs,
        ayahs: mappedAyahs.map((a: any, idx: number) => {
          // Strip Bismillah from Ayah 1 Bengali translation (except Surah 1 & 9)
          if (idx === 0 && arabicData.number !== 1 && arabicData.number !== 9) {
            const bismillahPatterns = [
              /^বিসমিল্লাহির রাহমানির রাহীম[\s।\.,-]*/,
              /^বিসমিল্লাহ্‌ আর-রাহমান আর-রাহীম[\s।\.,-]*/,
              /^পরম করুণাময় অতি দয়ালু আল্লাহর নামে[\s।\.,-]*/,
              /^আল্লাহর নামে[,\s]* যিনি পরম করুণাময়[,\s]* অতি দয়ালু[\s।\.,-]*/,
            ];
            let cleanedBn = a.bengali.text;
            for (const pattern of bismillahPatterns) {
              cleanedBn = cleanedBn.replace(pattern, '').trim();
            }
            return { ...a, bengali: { ...a.bengali, text: cleanedBn } };
          }
          return a;
        })
      };
      } else {
        error = "Invalid JSON structure.";
      }
    } else {
        error = "Failed to locate local surah data.";
    }
  } catch (err) {
    console.error("Failed to read local surah details", err);
    error = "File system error occurred or data is missing.";
  }

  if (error || !surah) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center flex-col">
        <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <Info className="w-5 h-5" />
          <p className="font-medium">{error || "Surah not found"}</p>
        </div>
        <Link href="/quran" className="mt-6 text-emerald-600 font-medium hover:underline font-bengali">
          কুরআন ড্যাশবোর্ডে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Desktop Sidebar Stub */}
      <aside className="hidden md:flex flex-col w-24 bg-[#F4F7FB] items-center py-8 gap-10 sticky top-0 h-screen overflow-y-auto shrink-0 border-r border-slate-200/50">
        <Link href="/" className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg relative">
          <Image src="/image.png" alt="Logo" fill className="object-cover" />
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
              <p className="text-xs sm:text-sm text-slate-500 font-medium font-bengali">
                {surah.englishNameTranslation} • {surah.revelationType === "Meccan" ? "মাক্কী" : "মাদানী"} • {surah.numberOfAyahs} আয়াত
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

            <QuranAyahList ayahs={surah.ayahs} surahId={surah.number.toString()} surahName={surah.englishName} />
          </div>
        </div>

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হোম</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-emerald-500">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">কুরআন</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হাদিস</span>
        </Link>
      </nav>
    </div>
  );
}
