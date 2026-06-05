const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Convert local logo to Base64 for rendering
function getBase64Image(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Logo not found: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
}

const logoPath = path.join(__dirname, 'images', 'logo.png');
const logoBase64 = getBase64Image(logoPath);

const products = [
  { id: 'p1', ext: 'png' },
  { id: 'p2', ext: 'png' },
  { id: 'p3', ext: 'png' },
  { id: 'p4', ext: 'png' },
  { id: 'p5', ext: 'webp' },
  { id: 'p6', ext: 'png' },
  { id: 'p7', ext: 'png' },
  { id: 'p8', ext: 'png' },
  { id: 'p9', ext: 'png' },
  { id: 'p10', ext: 'png' },
  { id: 'p11', ext: 'png' },
  { id: 'p12', ext: 'png' }
];

async function main() {
  console.log('🚀 Starting Puppeteer image branding process...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const srcDir = path.join(__dirname, 'images', 'anas_images');

  for (const prod of products) {
    const filename = `${prod.id}_original.${prod.ext}`;
    const filePath = path.join(srcDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Original file not found: ${filePath}`);
      continue;
    }

    // Read the product image as base64
    const prodBase64 = getBase64Image(filePath);

    // Render HTML with product image and overlay logo
    // Let's overlay a stylish badge of Silent Fog. We can cover the bottom-right corner where Anas Water logo is usually placed.
    // Or we can cover both corners, or place a very nice watermark. Let's make it look extremely premium!
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html { width: 500px; height: 500px; overflow: hidden; background: #ffffff; }
          .container {
            position: relative;
            width: 500px;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
          }
          .prod-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
          /* Premium Silent Fog Branding Overlay */
          .brand-overlay {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(4, 45, 68, 0.95); /* Silent Fog Navy */
            border: 1.5px solid #0d7cc4; /* Silent Fog Blue */
            padding: 8px 12px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(5px);
          }
          .brand-logo {
            height: 30px;
            width: auto;
          }
          .brand-text {
            display: flex;
            flex-direction: column;
            color: #ffffff;
            font-family: 'Cairo', sans-serif;
            text-align: right;
            direction: rtl;
          }
          .brand-name {
            font-size: 11px;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.1;
          }
          .brand-sub {
            font-size: 8px;
            color: #e8f4fd;
            font-weight: 600;
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;800&display=swap" rel="stylesheet">
      </head>
      <body>
        <div class="container">
          <img class="prod-img" src="${prodBase64}" />
          <div class="brand-overlay">
            <div class="brand-text">
              <span class="brand-name">أبو طيف</span>
              <span class="brand-sub">للضباب والرذاذ</span>
            </div>
            <img class="brand-logo" src="${logoBase64}" />
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setViewport({ width: 500, height: 500 });
    await page.setContent(htmlContent, { waitUntil: 'load' });
    
    // Wait a brief moment for fonts / images to render
    await new Promise(r => setTimeout(r, 300));

    const brandedFilename = `${prod.id}_branded.png`;
    const brandedFilePath = path.join(srcDir, brandedFilename);

    console.log(`📸 Screenshotting branded ${prod.id}...`);
    await page.screenshot({
      path: brandedFilePath,
      clip: { x: 0, y: 0, width: 500, height: 500 }
    });
    console.log(`   ✅ Branded image saved: ${brandedFilename}`);
  }

  await browser.close();
  console.log('🎉 Product image branding complete!');
}

main().catch(err => {
  console.error('❌ Branding process failed:', err);
  process.exit(1);
});
