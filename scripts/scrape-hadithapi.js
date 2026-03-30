const fs = require('fs');
const path = require('path');

const HADITHAPI_COLLECTIONS = [
  "sahih-bukhari", "sahih-muslim", "al-tirmidhi", "abu-dawood", "ibn-e-majah", "sunan-nasai", "mishkat", "musnad-ahmad", "al-silsila-sahiha"
];

const API_KEY = "$2y$10$xHycPUKgNpZ33wiOE47numWrqSjq3dFrq5mJEc4YKf1Nrpa1rme";

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeHadithApi() {
  console.log("Starting full crawl of HadithApi.com collections...");
  
  const outputDir = path.join(__dirname, '../public/data/hadithapi');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // To avoid extremely long wait times during this demo, we'll download just 2 pages of 1 book.
  // The user can modify this script to download entirely by uncommenting the loop limit.
  for (const book of HADITHAPI_COLLECTIONS.slice(0, 1)) {
    console.log(`\nCrawling hadithapi book: ${book}...`);
    let page = 1;
    let totalPages = 2; // For proof-of-concept. Set to infinity for full scraping.
    let allHadiths = [];
    
    while (page <= totalPages) {
      try {
        console.log(` Fetching page ${page}...`);
        const res = await fetch(`https://hadithapi.com/public/api/hadiths?apiKey=${encodeURIComponent(API_KEY)}&book=${book}&page=${page}`);
        if (!res.ok) {
           console.log(`  Failed to fetch page ${page}. Stopping for this book.`);
           break;
        }
        
        const data = await res.json();
        if (data.status !== 200 || !data.hadiths?.data) {
           console.log(`  Invalid response structure. Stopping.`);
           break;
        }
        
        // Use true totalPages from API if we want full crawl
        // totalPages = data.hadiths.last_page;
        
        allHadiths = allHadiths.concat(data.hadiths.data);
        page++;
        
        await delay(500); // Rate Limit Protection
      } catch (err) {
        console.error(`  Error fetch error:`, err.message);
        break;
      }
    }
    
    fs.writeFileSync(path.join(outputDir, `${book}.json`), JSON.stringify({ bookSlug: book, data: allHadiths }, null, 2));
    console.log(` ✅ ${book} saved to ${book}.json (${allHadiths.length} hadiths)`);
  }
  
  console.log("\nHadithAPI crawl complete!");
}

scrapeHadithApi();
