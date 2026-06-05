const fs = require('fs');
const path = require('path');
const https = require('https');
const puppeteer = require('puppeteer');

const items = [
  // Accessories (acc1 - acc7)
  { id: 'acc1', wixKey: '7ab697_ea97f9f7a6a4459594ee7d8847b98f02~mv2.jpg', ext: 'jpg', name: 'ماسورة ستانلس ستيل 304 قياس 3/8' },
  { id: 'acc2', wixKey: '7ab697_1e4908ff57fd45efa0e26abf0e50b532~mv2.jpg', ext: 'jpg', name: 'ماسورة ستانلس ستيل 316 قياس 3/8' },
  { id: 'acc3', wixKey: '7ab697_6bc63c9608db4256bab13832eaa1b257~mv2.jpg', ext: 'jpg', name: 'حلقة ضباب دائرية ستانلس ستيل 5 نزل' },
  { id: 'acc4', wixKey: '7ab697_6cbf14f8e71d4e01a93a0dcafb3e19fa~mv2.jpg', ext: 'jpg', name: 'قاعدة ضباب ستانلس جدارية 3 نقاط' },
  { id: 'acc5', wixKey: '7ab697_5ab7a0805345479fa43778d39697ce43~mv2.jpg', ext: 'jpg', name: 'ماسورة ضباب سقفية ستانلس ستيل 3 نزل' },
  { id: 'acc6', wixKey: '7ab697_f776b3ebff88459fabd680a0bbcde049~mv2.jpg', ext: 'jpg', name: 'ماسورة ضباب جدارية ستانلس ستيل 3 نزل' },
  { id: 'acc7', wixKey: '7ab697_a4667f05d84449d2a29733dc5af7d01e~mv2.jpg', ext: 'jpg', name: 'ماسورة ضباب سقفية ستانلس ستيل 6 نزل' },

  // Columns (col5 - col11)
  { id: 'col5', wixKey: '7ab697_fe1700e430cf40febb394198567bbd7e~mv2.jpg', ext: 'jpg', name: 'عامود ضباب 1 متر ستانلس ستيل 3 نزل' },
  { id: 'col6', wixKey: '7ab697_05c96bb4c0e2404883fc4aae46e58cbd~mv2.png', ext: 'png', name: 'عامود ضباب ستانلس ستيل 6 نزل' },
  { id: 'col7', wixKey: '7ab697_bb1bc7e8239b478cbe0199ebbc9c71c9~mv2.png', ext: 'png', name: 'عامود ضباب ستانلس ستيل نخلة 9 نزل' },
  { id: 'col8', wixKey: '7ab697_500deaf43eba438b88770103ba7f5107~mv2.jpg', ext: 'jpg', name: 'عامود ضباب ستانلس ستيل 2 فرع 6 نزل' },
  { id: 'col9', wixKey: '7ab697_e7af9fdd1492420f96e614209b0d162a~mv2.jpg', ext: 'jpg', name: 'عامود ضباب ستانلس ستيل نخلة 12 نزل' },
  { id: 'col10', wixKey: '7ab697_3a20242fe6a640539bdfa5e10bb4931a~mv2.jpg', ext: 'jpg', name: 'عامود ضباب ستانلس ستيل منحني ارتفاع 2.50 سم 7 نزل' },
  { id: 'col11', wixKey: '7ab697_07e0a3a3551e4f61a5f329fa3c29b031~mv2.jpg', ext: 'jpg', name: 'عامود ضباب ستانلس ستيل قوس منحني ارتفاع 2.50 سم 8 نزل' }
];

const destDir = path.join(__dirname, 'images', 'anas_images');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

function getBase64Image(filePath) {
  if (!fs.existsSync(filePath)) {
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
}

async function main() {
  console.log('📥 Downloading 14 new product images...');
  for (const item of items) {
    const url = `https://static.wixstatic.com/media/${item.wixKey}`;
    const filename = `${item.id}_original.${item.ext}`;
    const destPath = path.join(destDir, filename);
    console.log(`Downloading ${item.name} image...`);
    await downloadFile(url, destPath);
    console.log(`   Saved original: ${filename}`);
  }

  console.log('🚀 Branding and masking images with Puppeteer...');
  const logoPath = path.join(__dirname, 'images', 'logo.png');
  const logoBase64 = getBase64Image(logoPath);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  for (const item of items) {
    const filename = `${item.id}_original.${item.ext}`;
    const filePath = path.join(destDir, filename);
    const prodBase64 = getBase64Image(filePath);

    // Apply 35px top mask, 55px bottom mask, and 25px side masks to wipe watermarks
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
            transform: scale(1.08); /* Scale slightly to crop edges */
          }
          
          /* Edge Masks to cover watermarks and barcodes */
          .mask {
            position: absolute;
            background: #ffffff;
            z-index: 5;
          }
          .mask-top {
            top: 0; left: 0; width: 100%; height: 35px;
          }
          .mask-bottom {
            bottom: 0; left: 0; width: 100%; height: 55px;
          }
          .mask-left {
            top: 0; left: 0; width: 25px; height: 100%;
          }
          .mask-right {
            top: 0; right: 0; width: 25px; height: 100%;
          }

          /* Corner Brand Badge */
          .corner-badge {
            position: absolute;
            bottom: 60px;
            right: 30px;
            background: rgba(4, 45, 68, 0.95);
            border: 1.5px solid #0d7cc4;
            padding: 7px 12px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            z-index: 10;
          }

          .brand-logo {
            height: 28px;
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

          <!-- White masks to erase watermarks and barcode URLs at the edges -->
          <div class="mask mask-top"></div>
          <div class="mask mask-bottom"></div>
          <div class="mask mask-left"></div>
          <div class="mask mask-right"></div>

          <!-- Corner badge for Silent Fog -->
          <div class="corner-badge">
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
    await new Promise(r => setTimeout(r, 450));

    const brandedFilename = `${item.id}_branded.png`;
    const brandedFilePath = path.join(destDir, brandedFilename);

    console.log(`📸 Screenshotting branded ${item.id}...`);
    await page.screenshot({
      path: brandedFilePath,
      clip: { x: 0, y: 0, width: 500, height: 500 }
    });
    console.log(`   ✅ Branded image saved: ${brandedFilename}`);
  }

  await browser.close();
  console.log('🎉 All 14 product images download and branding completed successfully!');
}

main().catch(console.error);
