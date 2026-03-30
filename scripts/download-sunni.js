const fs = require('fs');
const path = require('path');

const HADITH_COLLECTIONS = [
  "bukhari", "muslim", "nasai", "abudawud", "tirmidhi", "ibnmajah", "malik"
];

async function downloadSunniJSONs() {
  console.log("Starting bulk download of Sunni Hadith JSONs (Arabic & Bengali)...");
  
  const outputDir = path.join(__dirname, '../public/data/sunni');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const col of HADITH_COLLECTIONS) {
    console.log(`Downloading ${col}...`);
    
    try {
      // Arabic Fetch
      const arRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${col}.json`);
      if (arRes.ok) {
        const arData = await arRes.json();
        fs.writeFileSync(path.join(outputDir, `ara-${col}.json`), JSON.stringify(arData));
        console.log(` ✅ ara-${col}.json saved (${arData.hadiths?.length} hadiths)`);
      }

      // Bengali Fetch
      const bnRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-${col}.json`);
      if (bnRes.ok) {
        const bnData = await bnRes.json();
        fs.writeFileSync(path.join(outputDir, `ben-${col}.json`), JSON.stringify(bnData));
        console.log(` ✅ ben-${col}.json saved`);
      }
      
    } catch (err) {
      console.error(` ❌ Error downloading ${col}:`, err.message);
    }
  }
  
  console.log("Sunni Hadith downloads complete!");
}

downloadSunniJSONs();
