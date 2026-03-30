import { ChevronLeft, BookHeart, Grid, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HadithItemList } from "@/components/HadithItemList";
import { transliterateArabicToBengali } from "@/lib/arabic-to-bengali";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { fetchHadithApiPage } from "@/app/actions/hadith";
import { SHIA_COLLECTIONS, HADITHAPI_COLLECTIONS, COLLECTION_NAMES } from "@/lib/hadith-collections";

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

export default async function HadithReaderPage(props: {
  params: Promise<{ collection: string }>;
}) {
  const params = await props.params;
  
  const collectionId = params.collection;
  const isShiaCollection = SHIA_COLLECTIONS.some(c => c.id === collectionId);
  const isHadithApi = collectionId.startsWith("hadithapi-");
  
  let titles = COLLECTION_NAMES[collectionId] || { en: "Hadith Collection", ar: "الحديث" };
  let hadithApiBookSlug = "";
  let hadithApiTotalPages = 1;

  if (isShiaCollection) {
    const shiaInfo = SHIA_COLLECTIONS.find(c => c.id === collectionId);
    if (shiaInfo) titles = { en: shiaInfo.name, ar: shiaInfo.arabic };
  } else if (isHadithApi) {
    const apiInfo = HADITHAPI_COLLECTIONS.find(c => c.id === collectionId);
    if (apiInfo) {
      titles = { en: apiInfo.name, ar: apiInfo.arabic };
      hadithApiBookSlug = apiInfo.bookSlug;
    }
  }

  let hadiths: HadithData[] = [];
  let totalHadiths = 0;
  let error = null;

  try {
    if (isShiaCollection) {
      const cookieStore = await cookies();
      const tagsCookie = cookieStore.get('dorbar_tags')?.value;
      let isSpecial = false;
      if (tagsCookie) {
        try {
          const tags = JSON.parse(decodeURIComponent(tagsCookie));
          isSpecial = tags.includes("Special");
        } catch(e) {}
      }

      if (!isSpecial) {
         error = "Access Restricted: You need the 'Special' tag via the Developer Widget to view this collection.";
      } else {
         const localPath = path.join(process.cwd(), "public", "data", "shia", `${collectionId.toLowerCase()}.json`);
         
         if (fs.existsSync(localPath)) {
            const rawFile = fs.readFileSync(localPath, 'utf8');
            const data = JSON.parse(rawFile);
            totalHadiths = data.total || data.data?.length || 0;
            const rawHadiths = data.data || [];
            
            hadiths = rawHadiths.map((item: any, i: number) => ({
              hadithnumber: item.hadithnumber || i + 1,
              arabicText: item.arabicText || item.text || item.arabic || "",
              bengaliPhonetic: item.arabicText ? transliterateArabicToBengali(item.arabicText) : "",
              bengaliText: item.bengaliText || item.englishText || "Translation unavailable.",
              reference: item.reference || { book: 1, hadith: i + 1 }
            }));
         } else {
           // Fallback to RapidAPI if local JSON doesn't exist yet
           const res = await fetch(`https://shiaapi.p.rapidapi.com/book/${collectionId}?range=1-50`, {
             headers: {
               'x-rapidapi-host': 'shiaapi.p.rapidapi.com',
               'x-rapidapi-key': 'b77e32dcc0msha66b1c6155735d0p131b2djsnfe96d1edbf8e'
             },
           });

           if (!res.ok) throw new Error("Failed to fetch from ShiaAPI. It may be currently offline or misconfigured in RapidAPI.");
           
           const data = await res.json();
           if (data.messages) throw new Error(`RapidAPI Error: ${data.messages}`);

           let rawHadiths = Array.isArray(data) ? data : (data.data || []);
           if (!Array.isArray(rawHadiths)) rawHadiths = [data];

           totalHadiths = rawHadiths.length;
           hadiths = rawHadiths.map((item: any, i: number) => {
             const text = typeof item === 'string' ? item : (item.text || item.arabic || item.content || JSON.stringify(item));
             return {
               hadithnumber: i + 1,
               arabicText: text,
               bengaliPhonetic: transliterateArabicToBengali(text),
               bengaliText: "Translation unavailable for this restricted API.",
               reference: { book: 1, hadith: i + 1 }
             };
           });
         }
      }
    } else if (isHadithApi) {
      const localPath = path.join(process.cwd(), "public", "data", "hadithapi", `${hadithApiBookSlug}.json`);
      if (fs.existsSync(localPath)) {
         const fileData = fs.readFileSync(localPath, 'utf8');
         const data = JSON.parse(fileData);
         totalHadiths = data.data?.length || 0;
         hadiths = data.data.map((item: any) => ({
             hadithnumber: Number(item.hadithNumber),
             arabicText: item.hadithArabic || "Arabic unavailable",
             bengaliPhonetic: item.hadithArabic ? transliterateArabicToBengali(item.hadithArabic) : "",
             bengaliText: item.hadithEnglish || item.hadithUrdu || "Translation missing",
             reference: { book: 1, hadith: Number(item.hadithNumber) }
         }));
      } else {
         const data = await fetchHadithApiPage(hadithApiBookSlug, 1);
         if (data && data.hadiths) {
            hadithApiTotalPages = data.hadiths.last_page;
            totalHadiths = data.hadiths.total;
            hadiths = data.hadiths.data.map((item: any) => ({
                hadithnumber: Number(item.hadithNumber),
                arabicText: item.hadithArabic || "Arabic unavailable",
                bengaliPhonetic: item.hadithArabic ? transliterateArabicToBengali(item.hadithArabic) : "",
                bengaliText: item.hadithEnglish || item.hadithUrdu || "Translation missing",
                reference: { book: 1, hadith: Number(item.hadithNumber) }
            }));
         } else {
            throw new Error("Invalid response from hadithapi.com");
         }
      }
    } else {
      const arPath = path.join(process.cwd(), "public", "data", "sunni", `ara-${collectionId.toLowerCase()}.json`);
      const bnPath = path.join(process.cwd(), "public", "data", "sunni", `ben-${collectionId.toLowerCase()}.json`);

      if (fs.existsSync(arPath) && fs.existsSync(bnPath)) {
        const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
        const bnData = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

        if (arData.hadiths && bnData.hadiths) {
          totalHadiths = arData.hadiths.length;
          hadiths = arData.hadiths.map((arHadith: any, index: number) => {
            const bnHadith = bnData.hadiths[index];
            return {
              hadithnumber: arHadith.hadithnumber,
              arabicText: arHadith.text || "",
              bengaliPhonetic: arHadith.text ? transliterateArabicToBengali(arHadith.text) : "",
              bengaliText: bnHadith ? bnHadith.text : "Translation unavailable.",
              reference: arHadith.reference || { book: 0, hadith: 0 }
            };
          });
        } else { throw new Error("Local JSON format invalid."); }
      } else {
        const [arRes, bnRes] = await Promise.all([
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${collectionId}.json`, { next: { revalidate: 3600 * 24 } }),
          fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${collectionId}.json`, { next: { revalidate: 3600 * 24 } })
        ]);

        if (!arRes.ok || !bnRes.ok) throw new Error("Failed to fetch collection data.");

        const arData = await arRes.json();
        const bnData = await bnRes.json();

        if (arData.hadiths && bnData.hadiths) {
          totalHadiths = arData.hadiths.length;
          
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
      }
    }
  } catch (err: any) {
    console.error(err);
    error = err.message || "Error fetching hadith data or collections are missing.";
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
              <p className="text-xs sm:text-sm text-slate-500 font-medium font-bengali">
                {totalHadiths.toLocaleString()} মোট হাদিস • এসএসআর অপ্টিমাইজড
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
              <HadithItemList 
                hadiths={hadiths} 
                collectionId={collectionId} 
                collectionName={titles.en} 
                isHadithApi={isHadithApi}
                hadithApiBookSlug={hadithApiBookSlug}
                hadithApiTotalPages={hadithApiTotalPages}
              />
            )}
            
          </div>
        </div>

      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হোম</span>
        </Link>
        <Link href="/quran" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition-colors">
          <Grid className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">কুরআন</span>
        </Link>
        <Link href="/hadith" className="flex flex-col items-center gap-1 text-emerald-500">
          <BookHeart className="w-6 h-6" />
          <span className="text-[10px] font-bold font-bengali">হাদিস</span>
        </Link>
      </nav>
    </div>
  );
}
