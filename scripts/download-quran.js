const fs = require('fs');
const path = require('path');
const https = require('https');

const QURAN_DIR = path.join(__dirname, '..', 'public', 'data', 'quran');
const SURAHS_DIR = path.join(QURAN_DIR, 'surahs');

// Ensure directories exist
if (!fs.existsSync(QURAN_DIR)) fs.mkdirSync(QURAN_DIR, { recursive: true });
if (!fs.existsSync(SURAHS_DIR)) fs.mkdirSync(SURAHS_DIR, { recursive: true });

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function downloadQuran() {
  try {
    console.log("Downloading Quran Metadata...");
    const metaData = await fetchUrl('https://api.alquran.cloud/v1/meta');
    fs.writeFileSync(path.join(QURAN_DIR, 'meta.json'), JSON.stringify(metaData, null, 2));
    console.log("Metadata downloaded layout.");

    for (let i = 1; i <= 114; i++) {
        console.log(`Downloading Surah ${i}...`);
        const surahData = await fetchUrl(`https://api.alquran.cloud/v1/surah/${i}/editions/quran-uthmani,bn.bengali`);
        fs.writeFileSync(path.join(SURAHS_DIR, `${i}.json`), JSON.stringify(surahData, null, 2));
        // Small delay to prevent rate limiting
        await new Promise(r => setTimeout(r, 100));
    }

    console.log("All 114 Surahs downloaded successfully!");
  } catch (error) {
    console.error("Error downloading Quran:", error.message);
  }
}

downloadQuran();
