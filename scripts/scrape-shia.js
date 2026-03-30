const fs = require('fs');
const path = require('path');

async function scrapeThaqalaynChapter(bookId, sectionId, chapterId) {
  const url = `https://thaqalayn.net/chapter/${bookId}/${sectionId}/${chapterId}`;
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Extract __NEXT_DATA__ JSON
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (!match) return [];
    
    const data = JSON.parse(match[1]);
    const hadiths = data.props?.pageProps?.chapter?.hadiths || [];
    
    return hadiths.map(h => ({
      id: h.id || h.hadithRef,
      arabicText: h.arabic || h.arabicText || "No Arabic",
      englishText: h.english || h.englishText || "No Translation",
      book: bookId,
      chapter: chapterId
    }));
  } catch (err) {
    console.error(`Failed to fetch ${url}`, err);
    return [];
  }
}

async function scrapeBook(bookId, maxChapters = 10) {
  console.log(`Starting scrape for Thaqalayn Book ${bookId}...`);
  let allHadiths = [];
  
  // A naive loop for proof of concept (Book 1, Section 1, Chapters 1-N)
  for (let chapterId = 1; chapterId <= maxChapters; chapterId++) {
    console.log(`Fetching Book ${bookId}, Section 1, Chapter ${chapterId}...`);
    const hadiths = await scrapeThaqalaynChapter(bookId, 1, chapterId);
    if (hadiths.length === 0) {
      console.log(`No hadiths found in chapter ${chapterId}, stopping.`);
      break; 
    }
    allHadiths = allHadiths.concat(hadiths);
    // Rate limit delay
    await new Promise(r => setTimeout(r, 500));
  }
  
  const outputDir = path.join(__dirname, '../public/data/shia');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `alkafi_v${bookId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify({ book: `Alkafi_v${bookId}`, total: allHadiths.length, data: allHadiths }, null, 2));
  console.log(`Saved ${allHadiths.length} hadiths to ${outputPath}`);
}

scrapeBook(1, 25);
