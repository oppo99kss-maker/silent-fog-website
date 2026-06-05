const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Scraping ALL products from Anas Water Shop...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 1200 });

  const url = 'https://www.anaswaterksa.com/shop';
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  console.log('Page loaded, waiting for Wix dynamic rendering...');
  await new Promise(r => setTimeout(r, 6000));

  // Scroll down multiple times to trigger lazy loading of all shop items
  for (let i = 0; i < 15; i++) {
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 800));
  }

  const scrapedItems = await page.evaluate(() => {
    const results = [];
    const elements = Array.from(document.querySelectorAll('div, section, li'));
    
    elements.forEach(el => {
      const text = el.innerText || '';
      const hasPrice = text.includes('ريال') || text.includes('ر.س') || text.includes('SAR') || /\d+,\d+/.test(text);
      const img = el.querySelector('img');
      
      // Select containers that look like product cards
      if (img && hasPrice && text.length < 400 && text.length > 25) {
        const imgSrc = img.src || img.getAttribute('data-src') || '';
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        results.push({
          lines,
          imgSrc
        });
      }
    });

    return results;
  });

  console.log(`Scraped ${scrapedItems.length} potential product elements.`);

  // Parse and deduplicate the products
  const parsedProducts = [];
  const uniqueNames = new Set();

  for (const item of scrapedItems) {
    const lines = item.lines;
    const imgSrc = item.imgSrc;
    
    // Find lines containing price
    let priceText = '';
    let nameText = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('SAR') || line.includes('ريال') || line.includes('ر.س')) {
        priceText = line;
        // The line before the price is usually the product title
        if (i > 0 && lines[i-1] !== 'السعر' && lines[i-1] !== 'العرض السريع') {
          nameText = lines[i-1];
        } else if (i > 1 && lines[i-2] !== 'العرض السريع') {
          nameText = lines[i-2];
        }
        break;
      }
    }
    
    // Fallback name search if the above heuristic failed
    if (!nameText && lines.length > 0) {
      nameText = lines.find(l => l !== 'العرض السريع' && l !== 'السعر' && !l.includes('SAR') && !l.includes('الضريبة') && !l.includes('أضِف') && !l.includes('غير متوفر'));
    }

    if (nameText && priceText && imgSrc) {
      const cleanedName = nameText.trim().replace(/\s+/g, ' ');
      // Clean price (extract number)
      const priceMatch = priceText.match(/[\d,.]+/);
      const originalPrice = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
      
      if (!uniqueNames.has(cleanedName) && originalPrice > 0) {
        uniqueNames.add(cleanedName);
        parsedProducts.push({
          name: cleanedName,
          originalPrice,
          imgSrc
        });
      }
    }
  }

  console.log(`Deduplicated into ${parsedProducts.length} unique products.`);
  
  // Sort products by price ascending
  parsedProducts.sort((a, b) => a.originalPrice - b.originalPrice);

  const outputPath = path.join(__dirname, 'images', 'scraped_shop_all_parsed.json');
  fs.writeFileSync(outputPath, JSON.stringify(parsedProducts, null, 2));
  console.log(`Saved clean parsed products to: ${outputPath}`);

  await browser.close();
}

main().catch(console.error);
