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

  // Check if click handler on a newly added card works
  console.log('Testing clicking on a newly added card (prod31)...');
  const clicked = await page.evaluate(() => {
    const card = document.querySelector('[onclick="openModal(\'prod31\')"]');
    if (card) {
      card.click();
      return true;
    }
    return false;
  });
  console.log(`Card prod31 found and clicked: ${clicked}`);
  
  // Wait for modal transition
  await new Promise(r => setTimeout(r, 1000));

  // Check if modal is visible using the correct ID 'modalOverlay'
  const modalVisible = await page.evaluate(() => {
    const modal = document.getElementById('modalOverlay');
    return modal ? modal.classList.contains('active') || window.getComputedStyle(modal).display !== 'none' : false;
  });
  console.log(`Modal Overlay is active/visible: ${modalVisible}`);

  // Capture screenshot of mobile viewport with modal open
  const screenshotPath = path.resolve('images', 'mobile_verification_modal.png');
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
