const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeBook(bookId, maxChapters = 10) {
  console.log(`Starting Puppeteer scrape for Thaqalayn Book ${bookId}...`);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  let allHadiths = [];
  let globalIdCount = 1;

  for (let sectionId = 2; sectionId <= 2; sectionId++) { // Focus on Section 2 for Al-Kafi Vol 1
    for (let chapterId = 1; chapterId <= maxChapters; chapterId++) {
      const url = `https://thaqalayn.net/chapter/${bookId}/${sectionId}/${chapterId}`;
      console.log(`Navigating to ${url}...`);
      
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        if (response.status() === 404) {
           console.log(`Chapter ${chapterId} not found. Stopping.`);
           break;
        }

        // Wait to make sure content loads
        await page.waitForSelector('.group', { timeout: 10000 }).catch(() => {});
        
        const hadiths = await page.evaluate(() => {
           // The site structure usually wraps hadiths in divs. We can extract text based on typical classes or tags.
           // A safe bet is finding all arabic text nodes and their corresponding english translations.
           const arabicNodes = Array.from(document.querySelectorAll('.arabicContent, .arabic, [dir="rtl"]'));
           const englishNodes = Array.from(document.querySelectorAll('.englishContent, .english, p[dir="ltr"]'));
           
           const results = [];
           const minLength = Math.min(arabicNodes.length, englishNodes.length);
           
           for (let i = 0; i < minLength; i++) {
               const arText = arabicNodes[i]?.innerText?.trim() || "No Arabic";
               const enText = englishNodes[i]?.innerText?.trim() || "No Translation";
               
               // Basic sanity check to ensure it's actually hadith text and not UI elements
               if (arText.length > 20 && enText.length > 20) {
                 results.push({
                   arabicText: arText,
                   bengaliText: enText, // We store english in bengaliText field because the app uses bengaliText to display meanings.
                                        // Wait, the user can read English or we can keep it as englishText.
                   englishText: enText
                 });
               }
           }
           return results;
        });
        
        if (hadiths.length === 0) {
           console.log(`No hadiths extracted from chapter ${chapterId}.`);
        } else {
           console.log(`Extracted ${hadiths.length} hadiths from chapter ${chapterId}.`);
           hadiths.forEach(h => {
             h.hadithnumber = globalIdCount++;
             h.reference = { book: bookId, hadith: h.hadithnumber };
             allHadiths.push(h);
           });
        }
      } catch (err) {
        console.error(`Error scraping ${url}:`, err.message);
      }
      
      // Delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  await browser.close();

  const outputDir = path.join(__dirname, '../public/data/shia');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `alkafi_v${bookId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify({ book: `Alkafi_v${bookId}`, total: allHadiths.length, data: allHadiths }, null, 2));
  console.log(`Saved ${allHadiths.length} hadiths to ${outputPath}`);
}

scrapeBook(1, 10); // Scrape up to chapter 10 as a fast robust proof-of-concept
