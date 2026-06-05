const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function main() {
  console.log('🚀 Launching browser to scrape products from anaswaterksa.com...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  const url = 'https://www.anaswaterksa.com/fog-and-mist-systems';
  console.log(`🌐 Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  console.log('⏳ Page loaded. Waiting for product elements...');
  // Let's wait a bit for any dynamic wix apps to render
  await new Promise(r => setTimeout(r, 5000));

  // Let's scrape elements
  const data = await page.evaluate(() => {
    // Let's look for common Wix page structure. Text content containing prices or product names
    const results = [];
    
    // Find all text blocks or custom wix container blocks
    // On Wix websites, products are often in Wix Stores repeater, or just custom text & image grids.
    // Let's find all text nodes and images, or try to identify structured repeaters.
    const containerCandidates = Array.from(document.querySelectorAll('[data-testid="richTextElement"], [id^="comp-"], section'));
    
    // Let's also do a general sweep of images with text nearby, or wix store elements
    // Let's extract any visible product title, description, price, and image URLs.
    // We can also extract all images on the page to inspect what we have.
    const images = Array.from(document.querySelectorAll('img')).map(img => {
      return {
        src: img.src || img.getAttribute('data-src') || '',
        alt: img.alt || '',
        width: img.width || 0,
        height: img.height || 0,
        id: img.id || ''
      };
    }).filter(img => img.src && !img.src.includes('static.wixstatic.com/media/7ab697_1146aaeceb9d470998978ba24262d447')); // filter out wix favicon/logo

    // Let's find text blocks that look like product names or prices
    const textBlocks = Array.from(document.querySelectorAll('p, h1, h2, h3, span, a'))
      .map(el => el.innerText ? el.innerText.trim() : '')
      .filter(t => t.length > 0);

    return {
      title: document.title,
      images: images,
      textSnippets: textBlocks.slice(0, 300) // first 300 text snippets for inspection
    };
  });

  console.log('📊 Title of page:', data.title);
  console.log(`🖼️ Found ${data.images.length} images on the page.`);
  
  // Let's write the raw scraped data to a json file
  const outputPath = path.join(__dirname, 'images', 'anas_scraped.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✅ Saved scraped overview to: ${outputPath}`);

  // Let's run a more specific extraction for wix stores if it's Wix Stores
  const detailedProducts = await page.evaluate(() => {
    const products = [];
    
    // Let's search for Wix store product items
    // Wix stores usually use data-hook="product-item" or similar, or lists
    // Let's also look for text blocks that look like: "ريال" or "SR" or "السعر"
    // Let's inspect elements that contain both an image and text
    const repeaters = Array.from(document.querySelectorAll('[id^="comp-"]'));
    
    // Let's look for repeaters or elements containing images and text with prices
    const divs = Array.from(document.querySelectorAll('div, section'));
    divs.forEach(div => {
      // If it contains an image and a price-like pattern
      const text = div.innerText || '';
      const hasPrice = text.includes('ريال') || text.includes('ر.س') || text.includes('SAR') || /\d+,\d+/.test(text) || /\d+\s*ريال/.test(text);
      const img = div.querySelector('img');
      
      if (img && hasPrice && text.length < 500 && text.length > 20) {
        // Extract product info
        const imgSrc = img.src || img.getAttribute('data-src') || '';
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        products.push({
          elementId: div.id || '',
          textLines: lines,
          imgSrc: imgSrc
        });
      }
    });

    return products;
  });

  console.log(`🛒 Found ${detailedProducts.length} potential product containers.`);
  const detailedOutputPath = path.join(__dirname, 'images', 'anas_products_detailed.json');
  fs.writeFileSync(detailedOutputPath, JSON.stringify(detailedProducts, null, 2));
  console.log(`✅ Saved detailed products to: ${detailedOutputPath}`);

  await browser.close();
}

main().catch(err => {
  console.error('❌ Scraper failed:', err);
  process.exit(1);
});
