const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const cafes = [
  { key: 'address_cafe', query: 'شعار عنوان القهوة الكحلي' },
  { key: 'unit_coffee', query: 'شعار UNIT Specialty Coffee' },
  { key: 'tea_cake', query: 'شعار شاي وكعك تبوك' },
  { key: 'raha_coffee', query: 'شعار رحى كافيه تبوك' },
  { key: 'botticelli', query: 'شعار بوتشيلي كافيه تبوك' },
  { key: 'rose_masyaf', query: 'شعار مجمع روز المصيف تبوك' },
  { key: 'tarhib_hotel', query: 'شعار فندق الترحيب تبوك' },
  { key: 'eight_oz', query: 'شعار 8oz coffee' },
  { key: 'tea_sesame', query: 'شعار شاي وسمسم تبوك' },
  { key: 'dopamine', query: 'شعار دوبامين كافيه تبوك' },
  { key: 'arabia', query: 'شعار ارابيا كافيه تبوك' }
];

async function main() {
  console.log('🚀 Starting Puppeteer to extract original logos with robust fallbacks...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  const logosData = {};

  for (const cafe of cafes) {
    console.log(`🔍 Searching for logo: ${cafe.key} (${cafe.query})...`);
    let imgSrc = '';

    // Strategy 1: Google Images with Consent Handling
    try {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(cafe.query)}&tbm=isch`;
      await page.goto(googleUrl, { waitUntil: 'load', timeout: 15000 });

      // Check if we are on a consent page
      const consentBtn = await page.$('#L2AGLb');
      if (consentBtn) {
        console.log('   🍪 Found Google cookie consent banner. Clicking Accept...');
        await consentBtn.click();
        await new Promise(r => setTimeout(r, 2000)); // wait for reload
      }

      // Check for other consent buttons
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.innerText || '', btn);
        if (text.includes('Accept all') || text.includes('وافقت') || text.includes('قبلت بالكل') || text.includes('I agree')) {
          console.log(`   🍪 Found consent button with text "${text}". Clicking...`);
          await btn.click();
          await new Promise(r => setTimeout(r, 2000));
          break;
        }
      }

      // Wait for image selector
      await page.waitForSelector('img', { timeout: 5000 });
      imgSrc = await extractFirstImage(page, 'google');
    } catch (err) {
      console.warn(`   ⚠️ Google search failed or timed out: ${err.message}. Trying Bing...`);
    }

    // Strategy 2: Fallback to Bing Images
    if (!imgSrc) {
      try {
        const bingUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(cafe.query)}`;
        await page.goto(bingUrl, { waitUntil: 'load', timeout: 15000 });
        await page.waitForSelector('img', { timeout: 5000 });
        imgSrc = await extractFirstImage(page, 'bing');
      } catch (err) {
        console.warn(`   ⚠️ Bing search failed: ${err.message}. Trying Yahoo...`);
      }
    }

    // Strategy 3: Fallback to Yahoo Images
    if (!imgSrc) {
      try {
        const yahooUrl = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(cafe.query)}`;
        await page.goto(yahooUrl, { waitUntil: 'load', timeout: 15000 });
        await page.waitForSelector('img', { timeout: 5000 });
        imgSrc = await extractFirstImage(page, 'yahoo');
      } catch (err) {
        console.error(`   ❌ All image search engines failed for ${cafe.key}:`, err.message);
      }
    }

    if (imgSrc) {
      console.log(`   ✅ Successfully found logo! Length of data: ${imgSrc.substring(0, 50)}...`);
      logosData[cafe.key] = imgSrc;
    } else {
      console.warn(`   ❌ Could not find logo for ${cafe.key}`);
      logosData[cafe.key] = '';
    }

    // Brief delay to be polite
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  // Save the extracted logos to a JSON file
  const logosPath = path.join(__dirname, 'images', 'extracted_logos.json');
  fs.writeFileSync(logosPath, JSON.stringify(logosData, null, 2));
  console.log(`🎉 Original logos extracted and saved to: ${logosPath}`);
}

async function extractFirstImage(page, engine) {
  return await page.evaluate((eng) => {
    const imgs = Array.from(document.querySelectorAll('img'));
    
    // Filter functions based on search engine layouts
    const filtered = imgs.filter(img => {
      const src = img.src || '';
      if (!src) return false;
      
      // Exclude system/branding/logo images
      if (src.includes('googlelogo') || src.includes('gstatic.com') || src.includes('microsoft') || src.includes('bing.com/sa') || src.includes('yimg.com')) {
        return false;
      }
      if (src.startsWith('data:image/svg+xml') || src.startsWith('data:image/gif')) {
        return false;
      }

      // Check sizing to avoid small icons
      const width = img.width || 0;
      const height = img.height || 0;
      if (width > 0 && width < 30) return false;
      if (height > 0 && height < 30) return false;

      return src.startsWith('data:image/jpeg') || src.startsWith('data:image/png') || src.startsWith('https://');
    });

    if (filtered.length > 0) {
      // Return the src of the first search result image
      // In Bing Images, the main image class is often .mimg
      if (eng === 'bing') {
        const mimg = document.querySelector('img.mimg');
        if (mimg && mimg.src) return mimg.src;
      }
      // Yahoo Images usually has class .y-image or similar, otherwise fallback to first filtered
      return filtered[0].src;
    }
    return '';
  }, engine);
}

main().catch(err => {
  console.error('❌ Logo extraction script failed:', err);
  process.exit(1);
});
