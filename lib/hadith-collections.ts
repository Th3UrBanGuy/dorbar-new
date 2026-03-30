export const HADITH_COLLECTIONS = [
  { id: "bukhari", name: "Sahih Bukhari", arabic: "صحيح البخاري", author: "Imam Muhammad al-Bukhari", total: 7563, active: true },
  { id: "muslim", name: "Sahih Muslim", arabic: "صحيح مسلم", author: "Imam Muslim ibn al-Hajjaj", total: 3033, active: false },
  { id: "abudawud", name: "Sunan Abu Dawud", arabic: "سنن أبي داود", author: "Imam Abu Dawud", total: 5274, active: false },
  { id: "tirmidhi", name: "Jami' At-Tirmidhi", arabic: "جامع الترمذي", author: "Imam at-Tirmidhi", total: 3956, active: false },
  { id: "nasai", name: "Sunan An-Nasa'i", arabic: "سنن النسائي", author: "Imam an-Nasa'i", total: 5758, active: false },
  { id: "ibnmajah", name: "Sunan Ibn Majah", arabic: "سنن ابن ماجه", author: "Imam Ibn Majah", total: 4341, active: false },
  { id: "malik", name: "Muwatta Malik", arabic: "موطأ مالك", author: "Imam Malik", total: 1858, active: false }
];

export const HADITHAPI_COLLECTIONS = [
  { id: "hadithapi-sahih-bukhari", bookSlug: "sahih-bukhari", name: "Sahih Bukhari (Alt)", arabic: "صحيح البخاري", author: "Imam Bukhari", total: 7276, active: false },
  { id: "hadithapi-sahih-muslim", bookSlug: "sahih-muslim", name: "Sahih Muslim (Alt)", arabic: "صحيح مسلم", author: "Imam Muslim", total: 7564, active: false },
  { id: "hadithapi-al-tirmidhi", bookSlug: "al-tirmidhi", name: "Jami' Al-Tirmidhi (Alt)", arabic: "جامع الترمذي", author: "Imam Tirmidhi", total: 3956, active: false },
  { id: "hadithapi-abu-dawood", bookSlug: "abu-dawood", name: "Sunan Abu Dawood (Alt)", arabic: "سنن أبي داود", author: "Imam Abu Dawood", total: 5274, active: false },
  { id: "hadithapi-ibn-e-majah", bookSlug: "ibn-e-majah", name: "Sunan Ibn Majah (Alt)", arabic: "سنن ابن ماجه", author: "Imam Ibn Majah", total: 4341, active: false },
  { id: "hadithapi-sunan-nasai", bookSlug: "sunan-nasai", name: "Sunan An-Nasa'i (Alt)", arabic: "سنن النسائي", author: "Imam An-Nasai", total: 5761, active: false },
  { id: "hadithapi-mishkat", bookSlug: "mishkat", name: "Mishkat Al-Masabih", arabic: "مشكاة المصابيح", author: "Imam Khatib at-Tabrizi", total: 6293, active: false },
  { id: "hadithapi-musnad-ahmad", bookSlug: "musnad-ahmad", name: "Musnad Ahmad", arabic: "مسند أحمد", author: "Imam Ahmad ibn Hanbal", total: 0, active: false },
  { id: "hadithapi-al-silsila-sahiha", bookSlug: "al-silsila-sahiha", name: "Al-Silsila Sahiha", arabic: "السلسلة الصحيحة", author: "Allama Nasir Uddin Al-Bani", total: 0, active: false }
];

export const SHIA_COLLECTIONS = [
  { id: "Fadaail_elshia", name: "Fadaail elshia", arabic: "فضائيل_الشيعة", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Al_Amaal", name: "Al Amaal", arabic: "الآمال", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v1", name: "Alkafi v1", arabic: "الكافي", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v2", name: "Alkafi v2", arabic: "الكافي ج2", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v3", name: "Alkafi v3", arabic: "الكافي ج3", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v4", name: "Alkafi v4", arabic: "الكافي ج4", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v5", name: "Alkafi v5", arabic: "الكافي ج 5", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v6", name: "Alkafi v6", arabic: "الكافي ج6", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v7", name: "Alkafi v7", arabic: "الكافي ج7", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "Alkafi_v8", name: "Alkafi v8", arabic: "الكافي ج8", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "ALkhisal", name: "ALkhisal", arabic: "الخصال", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "AlTawhid", name: "AlTawhid", arabic: "التوحيد", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "KamilAlZiyarat", name: "Kamil Al Ziyarat", arabic: "كامل الزيارات", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "kitabAlGhayba", name: "Kitab Al Ghayba", arabic: "كتاب الغيبة", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "kitabAlGhayba2", name: "Kitab Al Ghayba 2", arabic: "كتاب الغيبة ج2", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "MujamaaAlAhadithAlMutabara", name: "Mujamaa AlAhadith AlMutabara", arabic: "مجمع الحديث المعتبرة", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "RijalIbnALGhadairy", name: "Rijal Ibn ALGhadairy", arabic: "رجال ابن الغديري", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "ShifatAlShia", name: "Shifat Al Shia", arabic: "صفات الشيعة", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "ThawabAlAmalWaIqabAlaamal", name: "Thawab AlAmal", arabic: "ثواب الأعمال وعقاب الأعمال", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "UyonAkhbarAlRidaV1", name: "Uyon Akhbar AlRida V1", arabic: "عيون أخبار الرضا", author: "Shia Collection", total: 0, active: false, isSpecial: true },
  { id: "UyonAkhbarAlRidaV2", name: "Uyon Akhbar AlRida V2", arabic: "عيون أخبار الرضا ج2", author: "Shia Collection", total: 0, active: false, isSpecial: true },
];

export const COLLECTION_NAMES: Record<string, { en: string, ar: string }> = {
  bukhari: { en: "Sahih Bukhari", ar: "صحيح البخاري" },
  muslim: { en: "Sahih Muslim", ar: "صحيح مسلم" },
  abudawud: { en: "Sunan Abu Dawud", ar: "سنن أبي داود" },
  tirmidhi: { en: "Jami' At-Tirmidhi", ar: "جامع الترمذي" },
  nasai: { en: "Sunan An-Nasa'i", ar: "سنن النسائي" },
  ibnmajah: { en: "Sunan Ibn Majah", ar: "سنن ابن ماجه" },
  malik: { en: "Muwatta Malik", ar: "موطأ مالك" }
};
