const fs = require('fs');
const path = require('path');

const TOPICS_TAXONOMY = {
  "belief": { name: "ঈমান ও বিশ্বাস", icon: "Sparkles", color: "from-blue-500 to-indigo-600", keywords: ["ঈমান", "বিশ্বাস", "আল্লাহ", "রাসূল", "তাকদীর", "অদৃশ্য", "তাওহীদ", "iman", "faith", "believe", "allah"], items: [] },
  "purification": { name: "পবিত্রতা ও ওজু", icon: "Droplets", color: "from-cyan-400 to-teal-500", keywords: ["ওজু", "গোসল", "তায়াম্মুম", "পবিত্রতা", "নাপাক", "পানি", "wudu", "ghusl", "purification", "ablution"], items: [] },
  "prayer": { name: "নামাজ", icon: "Activity", color: "from-emerald-500 to-teal-700", keywords: ["সালাত", "নামাজ", "সিজদা", "রুকু", "মসজিদ", "আযান", "জামাআত", "prayer", "salat", "namaz", "mosque", "masjid"], items: [] },
  "friday": { name: "জুমুআহ", icon: "Calendar", color: "from-teal-400 to-emerald-600", keywords: ["জুমুআহ", "শুক্রবার", "খুতবা", "জুম্মা", "jumuah", "friday", "khutbah"], items: [] },
  "charity": { name: "যাকাত ও দান", icon: "HeartHandshake", color: "from-amber-400 to-orange-500", keywords: ["যাকাত", "সদকা", "দান", "গরীব", "এতিম", "charity", "zakat", "sadaqah", "poor", "needy"], items: [] },
  "fasting": { name: "রোজা ও রমজান", icon: "Moon", color: "from-blue-400 to-indigo-600", keywords: ["রোজা", "রমজান", "সিয়াম", "ইফতার", "সাহরি", "fasting", "fast", "ramadan", "sawm", "iftar"], items: [] },
  "hajj": { name: "হজ ও উমরাহ", icon: "MapPin", color: "from-slate-600 to-slate-800", keywords: ["হজ", "উমরাহ", "কাবা", "তাওয়াফ", "সাফা", "মারওয়া", "hajj", "umrah", "kaaba", "tawaf", "arafat"], items: [] },
  "eid": { name: "ঈদ ও উৎসব", icon: "Gift", color: "from-fuchsia-500 to-pink-600", keywords: ["ঈদ", "ফিতর", "আজহা", "কুরবানি", "উৎসব", "eid", "fitr", "adha", "sacrifice"], items: [] },
  "quran": { name: "কুরআনের ফজিলত", icon: "BookOpen", color: "from-emerald-400 to-green-600", keywords: ["কুরআন", "তিলাওয়াত", "সূরা", "আয়াত", "quran", "surah", "ayah", "recitation"], items: [] },
  "dua": { name: "দোয়া ও জিকির", icon: "Heart", color: "from-pink-500 to-rose-600", keywords: ["দোয়া", "জিকির", "প্রার্থনা", "দরূদ", "দোয়া", "dua", "supplication", "dhikr", "zikr"], items: [] },
  "manners": { name: "আদব ও আখলাক", icon: "Smile", color: "from-violet-500 to-purple-600", keywords: ["আদব", "আখলাক", "চরিত্র", "ব্যবহার", "manners", "character", "behavior", "polite"], items: [] },
  "ethics": { name: "সততা ও আমানত", icon: "ShieldCheck", color: "from-blue-500 to-cyan-600", keywords: ["সততা", "সত্যवादी", "মিথ্যা", "আমানত", "খিয়ানত", "truth", "honest", "trust", "lie"], items: [] },
  "marriage": { name: "বিবাহ ও পরিবার", icon: "Users", color: "from-rose-400 to-red-500", keywords: ["বিয়ে", "বিবাহ", "স্ত্রী", "স্বামী", "তালাক", "marriage", "wife", "husband", "divorce", "spouse"], items: [] },
  "parents": { name: "পিতা-মাতার অধিকার", icon: "UserPlus", color: "from-orange-400 to-amber-600", keywords: ["পিতা", "মাতা", "বাবা", "মা", "পিতামাতা", "parents", "mother", "father"], items: [] },
  "neighbors": { name: "প্রতিবেশী ও আত্মীয়", icon: "Home", color: "from-lime-500 to-green-600", keywords: ["প্রতিবেশী", "আত্মীয়", "রক্তের সম্পর্ক", "neighbor", "relative", "kinship"], items: [] },
  "business": { name: "ব্যবসা ও হালাল রুজি", icon: "Briefcase", color: "from-yellow-500 to-amber-700", keywords: ["ব্যবসা", "হারাম", "হালাল", "সুদ", "ঋণ", "কেনাবেচা", "business", "trade", "halal", "haram", "usury", "debt"], items: [] },
  "food": { name: "খাদ্য ও পানীয়", icon: "Coffee", color: "from-orange-300 to-red-500", keywords: ["খাদ্য", "পানীয়", "খাবার", "পানি", "হালাল", "food", "drink", "eat", "water"], items: [] },
  "clothing": { name: "পোশাক ও সজ্জা", icon: "Shirt", color: "from-purple-400 to-fuchsia-600", keywords: ["পোশাক", "কাপড়", "সজ্জা", "পর্দা", "হিজাব", "clothes", "clothing", "dress", "hijab", "awrah"], items: [] },
  "sins": { name: "পাপ ও তওবা", icon: "ShieldAlert", color: "from-red-600 to-rose-800", keywords: ["পাপ", "গুনাহ", "তওবা", "ক্ষমা", "রহমত", "sin", "sins", "repentance", "tawbah", "forgiveness"], items: [] },
  "hypocrisy": { name: "মুনাফিকি ও রিয়া", icon: "Ghost", color: "from-slate-700 to-black", keywords: ["মুনাফিক", "রিয়া", "অহংকার", "লোকদেখানো", "hypocrite", "nifaq", "pride", "show off"], items: [] },
  "hereafter": { name: "জান্নাত ও জাহান্নাম", icon: "Flame", color: "from-orange-600 to-red-600", keywords: ["আখিরাত", "জান্নাত", "জাহান্নাম", "কেয়ামত", "হাশর", "আগুন", "hereafter", "paradise", "jannah", "hell", "jahannam"], items: [] },
  "death": { name: "মৃত্যু ও জানাজা", icon: "Cross", color: "from-zinc-600 to-zinc-800", keywords: ["মৃত্যু", "জানাজা", "কবর", "মৃত", "দাফন", "death", "die", "grave", "funeral", "burial"], items: [] },
  "knowledge": { name: "ইলম ও জ্ঞান", icon: "BookHeart", color: "from-indigo-500 to-blue-700", keywords: ["ইলম", "জ্ঞান", "আলেম", "শিক্ষক", "ছাত্র", "knowledge", "scholar", "learn", "student"], items: [] },
  "patience": { name: "সবর ও বিপদ", icon: "Shield", color: "from-sky-400 to-blue-600", keywords: ["সবর", "ধৈর্য", "কষ্ট", "বিপদ", "পরীক্ষা", "patience", "sabr", "hardship", "trial"], items: [] },
  "sickness": { name: "অসুখ ও চিকিৎসা", icon: "Stethoscope", color: "from-emerald-400 to-teal-500", keywords: ["রোগ", "অসুখ", "চিকিৎসা", "ওষুধ", "মহামারী", "sick", "disease", "illness", "medicine", "cure"], items: [] },
  "prophet_life": { name: "নবীর জীবনী ও সুন্নাহ", icon: "Star", color: "from-yellow-400 to-amber-500", keywords: ["সুন্নাহ", "মক্কা", "মদিনা", "হিজরত", "sunnah", "seerah", "mecca", "medina"], items: [] },
  "angels": { name: "ফেরেশতা", icon: "Feather", color: "from-sky-300 to-blue-500", keywords: ["ফেরেশতা", "জিব্রাইল", "মিকাইল", "angel", "jibril", "angels"], items: [] },
  "prophets": { name: "নবী ও রাসূলগণ", icon: "Crown", color: "from-amber-300 to-yellow-600", keywords: ["নবী", "রাসূল", "ইব্রাহিম", "মুসা", "ঈসা", "prophet", "messenger", "musa", "isa", "ibrahim"], items: [] },
  "oppression": { name: "জুলুম ও অত্যাচার", icon: "AlertTriangle", color: "from-red-500 to-orange-600", keywords: ["জুলুম", "অত্যাচার", "মাজলুম", "oppression", "injustice", "zalim", "oppressor"], items: [] },
  "justice": { name: "বিচার ও ইনসাফ", icon: "Scale", color: "from-blue-600 to-indigo-800", keywords: ["বিচার", "ইনসাফ", "ন্যায়", "কাজী", "justice", "fair", "judge", "court"], items: [] },
  "jihad": { name: "জিহাদ ও শাহাদাত", icon: "Swords", color: "from-red-700 to-rose-900", keywords: ["জিহাদ", "শাহাদাত", "শহীদ", "যুদ্ধ", "jihad", "martyr", "battle", "war"], items: [] },
  "destiny": { name: "তাকদীর", icon: "Compass", color: "from-purple-500 to-fuchsia-700", keywords: ["তাকদীর", "ভাগ্য", "লিখন", "destiny", "fate", "qadar", "decree"], items: [] },
  "dreams": { name: "স্বপ্ন ও তাবির", icon: "CloudMoon", color: "from-indigo-400 to-purple-600", keywords: ["স্বপ্ন", "তাবির", "خواب", "dream", "vision", "sleep"], items: [] },
  "magic": { name: "জাদু ও বদনজর", icon: "EyeOff", color: "from-slate-800 to-black", keywords: ["জাদু", "বদনজর", "জিন", "শয়তান", "magic", "evil eye", "jinn", "sihr", "shaytan"], items: [] },
  "heart": { name: "অন্তর ও নিয়ত", icon: "HeartPulse", color: "from-rose-500 to-pink-700", keywords: ["অন্তর", "নিয়ত", "কলব", "ইখলাস", "heart", "intention", "niyyah", "qalb", "sincerity"], items: [] }
};

const MAX_POOL_PER_TOPIC = 2000;
const FINAL_ITEMS_PER_TOPIC = 150;

function buildTopicIndex() {
  console.log("Starting Advanced Universal Topic Indexer (35 Categories)...");
  
  const dataDir = path.join(__dirname, '../public/data');
  const sunniDir = path.join(dataDir, 'sunni');
  const shiaDir = path.join(dataDir, 'shia');
  const hadithApiDir = path.join(dataDir, 'hadithapi');
  
  let scannedCount = 0;

  const scanContent = (arabicText, meaningText, sourceRef) => {
    scannedCount++;
    if (!meaningText) return;
    const lowerText = meaningText.toLowerCase();
    
    for (const [topicId, topicDef] of Object.entries(TOPICS_TAXONOMY)) {
      if (topicDef.items.length >= MAX_POOL_PER_TOPIC) continue;
      
      for (const keyword of topicDef.keywords) {
        if (lowerText.includes(keyword)) {
           topicDef.items.push({
             ...sourceRef,
             arabicText,
             bengaliText: meaningText
           });
           break; 
        }
      }
    }
  };

  if (fs.existsSync(sunniDir)) {
    console.log("Scanning Sunni databases...");
    const files = fs.readdirSync(sunniDir).filter(f => f.startsWith('ben-'));
    files.forEach(file => {
       const collectionId = file.replace('ben-', '').replace('.json', '');
       const bnData = JSON.parse(fs.readFileSync(path.join(sunniDir, file), 'utf8'));
       const arDataPath = path.join(sunniDir, `ara-${collectionId}.json`);
       let arHadiths = [];
       if (fs.existsSync(arDataPath)) {
         arHadiths = JSON.parse(fs.readFileSync(arDataPath, 'utf8')).hadiths || [];
       }
       if (bnData.hadiths) {
         bnData.hadiths.forEach((h, idx) => {
            const arText = arHadiths[idx]?.text || "";
            scanContent(arText, h.text, { 
              source: `Sunni - ${collectionId}`, 
              id: collectionId,
              hadithnumber: h.hadithnumber,
              reference: h.reference
            });
         });
       }
    });
  }

  if (fs.existsSync(hadithApiDir)) {
    console.log("Scanning HadithAPI databases...");
    const files = fs.readdirSync(hadithApiDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
       const data = JSON.parse(fs.readFileSync(path.join(hadithApiDir, file), 'utf8'));
       if (data.data) {
         data.data.forEach(h => {
            scanContent(h.hadithArabic, h.hadithEnglish || h.hadithUrdu, {
               source: `HadithAPI - ${file.replace('.json', '')}`,
               id: file.replace('.json', ''),
               hadithnumber: h.hadithNumber,
               reference: { book: 1, hadith: h.hadithNumber }
            });
         });
       }
    });
  }

  if (fs.existsSync(shiaDir)) {
    console.log("Scanning Shia databases...");
    const files = fs.readdirSync(shiaDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
       const data = JSON.parse(fs.readFileSync(path.join(shiaDir, file), 'utf8'));
       if (data.data) {
         data.data.forEach(h => {
            scanContent(h.arabicText, h.englishText, {
               source: `Shia - ${file.replace('.json', '')}`,
               id: file.replace('.json', ''),
               hadithnumber: h.hadithnumber,
               reference: h.reference
            });
         });
       }
    });
  }
  
  const output = Object.entries(TOPICS_TAXONOMY)
    .filter(([_, def]) => def.items.length > 5) // Ignore empty categories
    .map(([id, def]) => {
      // Fisher-Yates Shuffle
      const array = def.items;
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      const randomizedItems = array.slice(0, FINAL_ITEMS_PER_TOPIC);
      return {
        id,
        name: def.name,
        icon: def.icon,
        color: def.color,
        count: randomizedItems.length,
        items: randomizedItems
      };
    });

  const outPath = path.join(dataDir, 'topics.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`\nDONE! Scanned ${scannedCount} hadiths over ${output.length} categories.`);
}

buildTopicIndex();
