/**
 * A utility to transliterate Arabic text into Bengali phonetics (Bangla Uccharon).
 * This provides an algorithmic phonetic mapping for large databases where manual
 * transliteration does not exist (like the 30,000+ Hadith entries).
 */

const arabicToBengaliMap: Record<string, string> = {
  // Letters
  'ا': 'আ', 'أ': 'আ', 'إ': 'ই', 'آ': 'আ', 'ٱ': 'আ',
  'ب': 'ব',
  'ت': 'ত',
  'ث': 'স', // Technically 'sa' in phonetic bangla
  'ج': 'জ',
  'ح': 'হ', // Hard H
  'خ': 'খ',
  'د': 'দ',
  'ذ': 'য',
  'ر': 'র',
  'ز': 'য',
  'س': 'স',
  'ش': 'শ',
  'ص': 'স',
  'ض': 'য',
  'ط': 'ত',
  'ظ': 'য',
  'ع': 'আ', // Ayn
  'غ': 'গ',
  'ف': 'ফ',
  'ق': 'ক',
  'ك': 'ক',
  'ل': 'ল',
  'م': 'ম',
  'ن': 'ন',
  'ه': 'হ',
  'و': 'ও',
  'ي': 'ই', 'ى': 'ই', 'ئ': 'ই',
  'ة': 'ত', // Ta Marbuta
  'ء': '', // Hamza (mostly silent or handled by vowels)
  'ؤ': 'উ',
  
  // Harakat (Vowels / Diacritics)
  'َ': 'া', // Fatha (a)
  'ِ': 'ি', // Kasra (i)
  'ُ': 'ু', // Damma (u)
  'ً': 'ান', // Fathatan (an)
  'ٍ': 'িন', // Kasratan (in)
  'ٌ': 'ুন', // Dammatan (un)
  'ْ': '্',  // Sukun
  'ّ': 'ّ',  // Shadda (handled dynamically below)
  'ٰ': 'া',  // Khari Zabar (long a)
  'ٖ': 'ী',  // Khari Zer (long i)
  'ٗ': 'ূ',   // Ulta Pesh (long u)

  // Others
  ' ': ' ',
  '.': '।',
  '،': ',',
  '؟': '?',
  '؛': ';',
};

export function transliterateArabicToBengali(arabicText: string): string {
  if (!arabicText) return "";

  let result = "";
  let chars = arabicText.split('');
  
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    
    // Handle Shadda (doubling the letter)
    if (char === 'ّ') {
      // Find the previous letter to double
      if (result.length > 0) {
        // A simple phonetic approach for Shadda in Bengali script:
        // We add a hasant and repeat the last character if it was a consonant.
        // For visual simplicity, we'll just double the previous character.
        const prevChar = result[result.length - 1];
        // Only double if it's a standard Bengali letter (not a vowel mark)
        if (/[ক-হ]/.test(prevChar)) {
            result += '্' + prevChar;
        }
      }
      continue;
    }

    const mapped = arabicToBengaliMap[char];
    if (mapped !== undefined) {
      // If the word starts with a Haraka, we might need a base vowel carrier, but standard Arabic starts with Alif.
      result += mapped;
    } else {
      // If it's not in the map (e.g. numbers or symbols), keep it
      // Convert Arabic numbers to Bengali
      const numCode = char.charCodeAt(0);
      if (numCode >= 1632 && numCode <= 1641) {
        // 1632 is Arabic 0 (٠), Bengali 0 is '০' (2534)
        result += String.fromCharCode(char.charCodeAt(0) - 1632 + 2534);
      } else {
        // Strip out most stylistic tajweed markers if unmapped
        if (numCode >= 1536 && numCode <= 1791) {
           // It's an unmapped Arabic block character, skip or preserve?
           // Skip to prevent rendering weird boxes, unless it's a known punctuation
        } else {
           result += char;
        }
      }
    }
  }

  // Post-processing cleanup rules for better flow
  result = result
    .replace(/াা/g, 'া') // Clean double fatha
    .replace(/িি/g, 'ী') // Clean double kasra
    .replace(/ুু/g, 'ূ') // Clean double damma
    .replace(/াও/g, 'াউ') // Diphthong fixes
    .replace(/াই/g, 'াই')
    .replace(/ +/g, ' ') // Collapse spaces
    .trim();

  return result;
}
