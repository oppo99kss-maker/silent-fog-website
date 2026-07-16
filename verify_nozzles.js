const puppeteer = require('puppeteer');
const path = require('path');

async function verifyPage() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const logs = [];
  page.on('console', msg => logs.push(`[Console] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[PageError] ${err.toString()}`));

  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  console.log(`Loading local site: ${fileUrl}`);

  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto(fileUrl, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  
  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile Viewport (375x812): ScrollWidth = ${mobileScrollWidth}, ClientWidth = ${mobileClientWidth}`);
  
  if (mobileScrollWidth > mobileClientWidth) {
    console.log(`⚠️ Warning: Mobile viewport has horizontal overflow! (${mobileScrollWidth}px > ${mobileClientWidth}px)`);
  } else {
    console.log('✅ Mobile has NO horizontal overflow.');
  }

  // Capture screenshot of mobile viewport
  const screenshotPath = path.resolve('images', 'mobile_verification.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  console.log('\n--- Console logs and errors ---');
  if (logs.length === 0) {
    console.log('No console warnings or page errors detected!');
  } else {
    logs.forEach(log => console.log(log));
  }

  await browser.close();
}

verifyPage().catch(console.error);
