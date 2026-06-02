const fs = require('fs');
const path = require('path');
const https = require('https');

const downloadsDir = 'C:\\Users\\t\\Downloads';
const projectAssetsDir = path.join(__dirname, 'images', 'desktop_assets');
const jsonPath = path.join(__dirname, 'images', 'extracted_logos.json');

// Ensure destination exists
if (!fs.existsSync(projectAssetsDir)) {
  fs.mkdirSync(projectAssetsDir, { recursive: true });
}

// Maps for downloaded files in Downloads directory
const downloadMap = {
  '8oz.webp': 'logo_eight_oz.webp',
  'c&b.jpg': 'logo_tea_cake.jpg',
  'بوتشيلي.jpeg': 'logo_botticelli.jpeg',
  'دوبامين.png': 'logo_dopamine.png',
  'رحى.jpg': 'logo_raha_coffee.jpg',
  'عنوان القهوة لوقو.png': 'logo_address_cafe.png',
  'فنق الترحيب.png': 'logo_tarhib_hotel.png',
  'يونت.jfif': 'logo_unit_coffee.jfif'
};

// Maps for online fetched logos (fallback for missing ones)
const onlineFallbackMap = {
  'tea_sesame': 'logo_tea_sesame.jpeg',
  'rose_masyaf': 'logo_rose_masyaf.jpeg',
  'arabia': 'logo_arabia.jpeg'
};

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(projectAssetsDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed download: status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`   🌐 Downloaded and saved fallback: ${filename}`);
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
  console.log('🚀 Preparing all 11 original success partner logos...');

  // 1. Copy manually downloaded logos from C:\Users\t\Downloads
  console.log('📂 1. Copying logos from Downloads folder...');
  for (const [srcName, destName] of Object.entries(downloadMap)) {
    const srcPath = path.join(downloadsDir, srcName);
    const destPath = path.join(projectAssetsDir, destName);
    
    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`   ✅ Copied: ${srcName} -> ${destName}`);
      } catch (err) {
        console.error(`   ❌ Failed to copy ${srcName}:`, err.message);
      }
    } else {
      console.warn(`   ⚠️ Warning: File not found in Downloads: ${srcName}`);
    }
  }

  // 2. Fetch fallbacks for remaining 3 logos from extracted_logos.json
  console.log('🌐 2. Downloading remaining logos from search results...');
  if (fs.existsSync(jsonPath)) {
    try {
      const extractedLogos = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      for (const [key, destName] of Object.entries(onlineFallbackMap)) {
        const url = extractedLogos[key];
        if (url) {
          console.log(`   📥 Fetching fallback for ${key}...`);
          await download(url, destName);
        } else {
          console.warn(`   ⚠️ No online fallback URL found for: ${key}`);
        }
      }
    } catch (err) {
      console.error('   ❌ Error reading extracted_logos.json:', err.message);
    }
  } else {
    console.warn('   ⚠️ extracted_logos.json not found, cannot download fallbacks.');
  }

  console.log('🎉 Logo preparation complete! All 11 logos are now cached in images/desktop_assets/');
}

main().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
