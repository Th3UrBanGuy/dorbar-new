// Date conversion utilities for Hijri and Bengali Bangabda calendars

// ============ HIJRI CALENDAR ============
const HIJRI_MONTHS = [
  "মুহাররাম", "সফর", "রবিউল আউয়াল", "রবিউস সানি",
  "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান",
  "রমজান", "শাওয়াল", "জিলক্বদ", "জিলহজ"
];

const HIJRI_MONTHS_EN = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul-Qi'dah", "Dhul-Hijjah"
];

export function gregorianToHijri(gDate: Date): { year: number; month: number; day: number; monthName: string; monthNameEn: string } {
  const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
  
  const parts = formatter.formatToParts(gDate);
  const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
  const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
  
  let yearStr = parts.find(p => p.type === 'year')?.value || '1445';
  // Extract only digits for year (sometimes includes ' AH')
  yearStr = yearStr.replace(/[^0-9]/g, '');
  const year = parseInt(yearStr, 10);

  return {
    year,
    month,
    day,
    monthName: HIJRI_MONTHS[month - 1] || HIJRI_MONTHS[0],
    monthNameEn: HIJRI_MONTHS_EN[month - 1] || HIJRI_MONTHS_EN[0]
  };
}

// ============ BENGALI BANGABDA CALENDAR ============
const BANGLA_MONTHS = [
  "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ",
  "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ",
  "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

const BANGLA_MONTHS_EN = [
  "Boishakh", "Jyoishtho", "Asharh", "Shrabon",
  "Bhadro", "Ashwin", "Kartik", "Ogrohayon",
  "Poush", "Magh", "Falgun", "Choitro"
];

export function gregorianToBangla(gDate: Date): { year: number; month: number; day: number; monthName: string; monthNameEn: string } {
  const d = gDate.getDate();
  const m = gDate.getMonth() + 1; // 1-indexed
  const y = gDate.getFullYear();

  // Bangladesh official calendar (revised)
  // Bangla New Year = April 14 (mostly)
  let bYear = y - 593;
  let bMonth: number;
  let bDay: number;

  // Month boundaries based on the revised Bangladesh calendar
  const daysInMonth = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]; // Boishakh to Choitro

  if (m === 4 && d >= 14) {
    bMonth = 1; bDay = d - 13;
  } else if (m === 5 && d <= 14) {
    bMonth = 1; bDay = d + 18;
  } else if (m === 5 && d >= 15) {
    bMonth = 2; bDay = d - 14;
  } else if (m === 6 && d <= 14) {
    bMonth = 2; bDay = d + 17;
  } else if (m === 6 && d >= 15) {
    bMonth = 3; bDay = d - 14;
  } else if (m === 7 && d <= 15) {
    bMonth = 3; bDay = d + 16;
  } else if (m === 7 && d >= 16) {
    bMonth = 4; bDay = d - 15;
  } else if (m === 8 && d <= 15) {
    bMonth = 4; bDay = d + 16;
  } else if (m === 8 && d >= 16) {
    bMonth = 5; bDay = d - 15;
  } else if (m === 9 && d <= 15) {
    bMonth = 5; bDay = d + 16;
  } else if (m === 9 && d >= 16) {
    bMonth = 6; bDay = d - 15;
  } else if (m === 10 && d <= 15) {
    bMonth = 6; bDay = d + 15;
  } else if (m === 10 && d >= 16) {
    bMonth = 7; bDay = d - 15;
  } else if (m === 11 && d <= 14) {
    bMonth = 7; bDay = d + 16;
  } else if (m === 11 && d >= 15) {
    bMonth = 8; bDay = d - 14;
  } else if (m === 12 && d <= 14) {
    bMonth = 8; bDay = d + 16;
  } else if (m === 12 && d >= 15) {
    bMonth = 9; bDay = d - 14;
  } else if (m === 1 && d <= 13) {
    bMonth = 9; bDay = d + 17; bYear = y - 594;
  } else if (m === 1 && d >= 14) {
    bMonth = 10; bDay = d - 13; bYear = y - 594;
  } else if (m === 2 && d <= 12) {
    bMonth = 10; bDay = d + 18; bYear = y - 594;
  } else if (m === 2 && d >= 13) {
    bMonth = 11; bDay = d - 12; bYear = y - 594;
  } else if (m === 3 && d <= 14) {
    bMonth = 11; bDay = d + 16; bYear = y - 594;
  } else if (m === 3 && d >= 15) {
    bMonth = 12; bDay = d - 14; bYear = y - 594;
  } else {
    bMonth = 12; bDay = d; bYear = y - 594;
  }

  return {
    year: bYear,
    month: bMonth,
    day: bDay,
    monthName: BANGLA_MONTHS[bMonth - 1],
    monthNameEn: BANGLA_MONTHS_EN[bMonth - 1]
  };
}

// ============ BENGALI NUMERALS ============
export function toBengaliNumeral(n: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
}

// ============ BANGLA WEEKDAY ============
const BANGLA_WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

export function getBanglaWeekday(date: Date): string {
  return BANGLA_WEEKDAYS[date.getDay()];
}

// ============ EVENTS DATA ============
export interface DayEvent {
  name: string;
  nameEn: string;
  type: "islamic" | "sufi" | "shia" | "international" | "bangladesh" | "national";
  color: string;
}

// Events keyed by "month-day" (1-indexed month)
export const EVENTS_BY_DATE: Record<string, DayEvent[]> = {
  // Islamic events (fixed Hijri — we map approximate Gregorian)
  "1-1": [{ name: "নববর্ষ", nameEn: "New Year's Day", type: "international", color: "blue" }],
  "2-21": [{ name: "আন্তর্জাতিক মাতৃভাষা দিবস", nameEn: "International Mother Language Day", type: "national", color: "green" }, { name: "শহীদ দিবস", nameEn: "Shaheed Day (Martyrs' Day)", type: "bangladesh", color: "red" }],
  "3-7": [{ name: "জাতির পিতার জন্মদিন", nameEn: "Birth of Father of the Nation", type: "national", color: "green" }],
  "3-8": [{ name: "আন্তর্জাতিক নারী দিবস", nameEn: "International Women's Day", type: "international", color: "purple" }],
  "3-17": [{ name: "সেন্ট প্যাট্রিকস ডে", nameEn: "St. Patrick's Day", type: "international", color: "green" }],
  "3-25": [{ name: "স্বাধীনতা দিবসের প্রাক্কালে গণহত্যা দিবস", nameEn: "Genocide Day", type: "bangladesh", color: "red" }],
  "3-26": [{ name: "স্বাধীনতা ও জাতীয় দিবস", nameEn: "Independence Day", type: "national", color: "green" }],
  "4-14": [{ name: "পহেলা বৈশাখ (বাংলা নববর্ষ)", nameEn: "Pohela Boishakh (Bengali New Year)", type: "bangladesh", color: "orange" }],
  "5-1": [{ name: "আন্তর্জাতিক শ্রমিক দিবস", nameEn: "International Labour Day", type: "international", color: "red" }],
  "6-7": [{ name: "ছয় দফা দিবস", nameEn: "Six Points Day", type: "bangladesh", color: "green" }],
  "8-15": [{ name: "জাতীয় শোক দিবস", nameEn: "National Mourning Day", type: "national", color: "black" }],
  "10-31": [{ name: "হ্যালোউইন", nameEn: "Halloween", type: "international", color: "orange" }],
  "11-4": [{ name: "সংবিধান দিবস", nameEn: "Constitution Day", type: "bangladesh", color: "green" }],
  "12-16": [{ name: "বিজয় দিবস", nameEn: "Victory Day", type: "national", color: "green" }],
  "12-25": [{ name: "বড়দিন", nameEn: "Christmas", type: "international", color: "red" }],
  "12-31": [{ name: "নববর্ষের প্রাক্কালে", nameEn: "New Year's Eve", type: "international", color: "blue" }],
  
  // Islamic fixed-date events (approximate Gregorian for 2026 — Hijri events move yearly)
  "1-16": [{ name: "শবে মেরাজ", nameEn: "Shab-e-Meraj (Night of Ascension)", type: "islamic", color: "indigo" }],
  "2-3": [{ name: "শবে বরাত", nameEn: "Shab-e-Barat (Night of Fortune)", type: "islamic", color: "purple" }],
  "2-18": [{ name: "পবিত্র রমজান শুরু", nameEn: "Ramadan Starts", type: "islamic", color: "emerald" }],
  "3-15": [{ name: "শবে কদর", nameEn: "Shab-e-Qadr (Night of Power)", type: "islamic", color: "teal" }],
  "3-20": [{ name: "ঈদুল ফিতর", nameEn: "Eid-ul-Fitr", type: "islamic", color: "emerald" }],
  "5-27": [{ name: "ঈদুল আজহা", nameEn: "Eid-ul-Adha", type: "islamic", color: "emerald" }],
  "6-25": [{ name: "আশুরা", nameEn: "Ashura (Day of Muharram)", type: "shia", color: "red" }],
  "8-26": [{ name: "ঈদে মিলাদুন্নবী (সা.)", nameEn: "Mawlid an-Nabi (Prophet's Birthday)", type: "islamic", color: "emerald" }],
  
  // Sufi events
  "1-11": [{ name: "হযরত শেখ আবদুল কাদের জিলানী (রহ.) ওরস", nameEn: "Urs of Sheikh Abdul Qadir Jilani", type: "sufi", color: "emerald" }],
  "6-6": [{ name: "হযরত খাজা মইনুদ্দিন চিশতী (রহ.) ওরস", nameEn: "Urs of Khwaja Moinuddin Chishti", type: "sufi", color: "teal" }],

  // Shia events
  "6-24": [{ name: "তাসুয়া", nameEn: "Tasu'a", type: "shia", color: "red" }],
};

export function getEventsForDate(month: number, day: number): DayEvent[] {
  return EVENTS_BY_DATE[`${month}-${day}`] || [];
}

export function hasEvents(month: number, day: number): boolean {
  return (EVENTS_BY_DATE[`${month}-${day}`] || []).length > 0;
}

// English month names
export const ENGLISH_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const BANGLA_MONTHS_EXPORT = BANGLA_MONTHS;
export const HIJRI_MONTHS_EXPORT = HIJRI_MONTHS;
