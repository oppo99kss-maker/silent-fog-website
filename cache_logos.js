const fs = require('fs');
const path = require('path');
const https = require('https');

const jsonPath = path.join(__dirname, 'images', 'extracted_logos.json');
const destDir = path.join(__dirname, 'images', 'desktop_assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(destDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`✅ Saved ${filename}`);
          resolve(filePath);
        });
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🚀 Starting to cache extracted logo images locally...');
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ JSON file not found: ${jsonPath}`);
    process.exit(1);
  }

  const logos = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  for (const [key, url] of Object.entries(logos)) {
    if (!url) {
      console.warn(`⚠️ No URL for ${key}, skipping...`);
      continue;
    }
    
    console.log(`📥 Downloading logo for: ${key}...`);
    try {
      const ext = url.includes('.png') ? 'png' : 'jpeg';
      const filename = `logo_${key}.${ext}`;
      await download(url, filename);
    } catch (err) {
      console.error(`❌ Failed to download logo for ${key}:`, err.message);
    }
  }
  console.log('🎉 Logo caching completed!');
}

main().catch(err => {
  console.error('❌ Caching script failed:', err);
  process.exit(1);
});
