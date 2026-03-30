const fs = require('fs');
const path = require('path');

async function scrapeBook(bookId, maxChapters = 50) {
  console.log(`Starting Blitz Scrape for Thaqalayn Book ${bookId}...`);
  let allHadiths = [];
  let globalIdCount = 1;

  // Let's scrape Section 2, Chapters 1-100 (Al-Kafi Book of Intellect is Section 1, Knowledge is 2)
  for (let chapterId = 1; chapterId <= maxChapters; chapterId++) {
    const url = `https://thaqalayn.net/chapter/${bookId}/2/${chapterId}`;
    try {
      const res = await fetch(url, { headers: { 'RSC': '1' } });
      if (!res.ok) {
         console.log(`Reached end or error at chapter ${chapterId}.`);
         break;
      }
      
      const rscText = await res.text();
      // Extract all text_ar strings
      const arMatches = [...rscText.matchAll(/"text_ar":"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
      const enMatches = [...rscText.matchAll(/"text_en":"((?:[^"\\]|\\.)*)"/g)].map(m => m[1]);
      
      const len = Math.min(arMatches.length, enMatches.length);
      console.log(`Chapter ${chapterId} -> Found ${arMatches.length} Arabic, ${enMatches.length} English.`);
      
      if (len === 0) break;

      for (let i = 0; i < len; i++) {
         const arabic = arMatches[i].replace(/\\n/g, '\n').replace(/\\"/g, '"');
         const english = enMatches[i].replace(/\\n/g, '\n').replace(/\\"/g, '"');
         
         if (arabic.length > 5 && english.length > 5) {
            allHadiths.push({
               hadithnumber: globalIdCount++,
               arabicText: arabic,
               englishText: english,
               bengaliText: english, // Placeholder
               reference: { book: bookId, hadith: globalIdCount - 1 }
            });
         }
      }
      
      // Delay to avoid hitting rate limits
      await new Promise(r => setTimeout(r, 600));
    } catch (err) {
      console.error(err);
    }
  }

  const outputDir = path.join(__dirname, '../public/data/shia');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `alkafi_v${bookId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify({ book: `Alkafi_v${bookId}`, total: allHadiths.length, data: allHadiths }, null, 2));
  console.log(`\nDONE! Saved ${allHadiths.length} hadiths to ${outputPath}`);
}

scrapeBook(1, 10); // Execute for first 10 chapters
