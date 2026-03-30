const { JSDOM } = require("jsdom");
const fs = require('fs');
const path = require('path');

async function scrapeBook(bookId, maxChapters = 5) {
  console.log(`Starting JSDOM scrape for Thaqalayn Book ${bookId}...`);
  let allHadiths = [];
  let globalIdCount = 1;

  for (let sectionId = 2; sectionId <= 2; sectionId++) { 
    for (let chapterId = 1; chapterId <= maxChapters; chapterId++) {
      const url = `https://thaqalayn.net/chapter/${bookId}/${sectionId}/${chapterId}`;
      console.log(`Fetching ${url}...`);
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
           console.log(`Chapter ${chapterId} not found (${response.status}). Stopping.`);
           break;
        }
        
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // In Thaqalayn, Arabic hadiths usually have dir="rtl" and english dir="ltr"
        // Let's grab all paragraphs with dir="rtl" and dir="ltr"
        const rtlParagraphs = Array.from(document.querySelectorAll('p[dir="rtl"]'));
        const ltrParagraphs = Array.from(document.querySelectorAll('div[dir="ltr"], p[dir="ltr"]'));
        
        const validArabic = rtlParagraphs.map(p => p.textContent.trim()).filter(t => t.length > 20);
        const validEnglish = ltrParagraphs.map(p => p.textContent.trim()).filter(t => t.length > 20);
        
        console.log(`  Found ${validArabic.length} Arabic nodes and ${validEnglish.length} English nodes.`);
        
        const minLength = Math.min(validArabic.length, validEnglish.length);
        
        for (let i = 0; i < minLength; i++) {
           allHadiths.push({
             hadithnumber: globalIdCount++,
             arabicText: validArabic[i],
             englishText: validEnglish[i],
             bengaliText: validEnglish[i], // Fallback mapping
             reference: { book: bookId, hadith: globalIdCount - 1 }
           });
        }
        
      } catch (err) {
        console.error(`Error scraping ${url}:`, err.message);
      }
      
      // Delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  const outputDir = path.join(__dirname, '../public/data/shia');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `alkafi_v${bookId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify({ book: `Alkafi_v${bookId}`, total: allHadiths.length, data: allHadiths }, null, 2));
  console.log(`DONE! Saved ${allHadiths.length} hadiths to ${outputPath}`);
}

scrapeBook(1, 5); // Test 5 chapters
