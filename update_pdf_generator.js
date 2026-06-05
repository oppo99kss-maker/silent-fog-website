const fs = require('fs');

let content = fs.readFileSync('generate_pdf_catalog.js', 'utf8');

// 1. Add image definitions at the top
const originalAccDeclarations = `const acc7Branded = getBase64Image('acc7_branded.png', 'anas_images');`;
const newAccDeclarations = `const acc7Branded = getBase64Image('acc7_branded.png', 'anas_images');
const acc8Branded = getBase64Image('acc8_branded.png', 'anas_images');
const acc9Branded = getBase64Image('acc9_branded.png', 'anas_images');
const acc10Branded = getBase64Image('acc10_branded.png', 'anas_images');
const acc11Branded = getBase64Image('acc11_branded.png', 'anas_images');
const acc12Branded = getBase64Image('acc12_branded.png', 'anas_images');
const acc13Branded = getBase64Image('acc13_branded.png', 'anas_images');`;

content = content.replace(originalAccDeclarations, newAccDeclarations);

// 2. We need to find page 8 footer, page 9 footer, page 10 footer, and replace total page count with 11
// Let's replace the footer page counts
content = content.replace(/صفحة 1 من 10/g, 'صفحة 1 من 11');
content = content.replace(/صفحة 2 من 10/g, 'صفحة 2 من 11');
content = content.replace(/صفحة 3 من 10/g, 'صفحة 3 من 11');
content = content.replace(/صفحة 4 من 10/g, 'صفحة 4 من 11');
content = content.replace(/صفحة 5 من 10/g, 'صفحة 5 من 11');
content = content.replace(/صفحة 6 من 10/g, 'صفحة 6 من 11');
content = content.replace(/صفحة 7 من 10/g, 'صفحة 7 من 11');
content = content.replace(/صفحة 8 من 10/g, 'صفحة 8 من 11');
content = content.replace(/صفحة 9 من 10/g, 'صفحة 10 من 11'); // Page 9 of 10 becomes Page 10 of 11 (Umbrellas)
content = content.replace(/صفحة 10 من 10/g, 'صفحة 11 من 11'); // Page 10 of 10 becomes Page 11 of 11 (Warranty)

// 3. Let's find where page 8 ends, and inject page 9
const page8EndMarker = `<!-- ================= PAGE 9: UMBRELLAS SECTION ================= -->`;
const page8EndIndex = content.indexOf(page8EndMarker);

if (page8EndIndex === -1) {
  console.error('Could not find Page 9 marker in generate_pdf_catalog.js');
  process.exit(1);
}

// Prepare Page 9 HTML for the 6 new nozzles
const page9HTML = `<!-- ================= PAGE 9: NOZZLES SECTION ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="\${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">فوهات ونزلات الضباب والرذاذ والصيانة</span>
        </div>

        <div class="page-content">
          <h3 class="pdf-section-title" style="color: var(--primary-navy); margin-bottom: 6px;">فوهات ونزلات الضباب والرذاذ الاحترافية</h3>
          <p class="pdf-section-subtitle" style="margin-bottom: 12px;">نوزلات ورؤوس رذاذ مجهرية دقيقة ومصممة للتبريد الفائق ومقاومة الأملاح ومحاليل التنظيف المعتمدة:</p>

          <div class="pdf-grid-compact">
            
            <!-- acc10: نزل رذاذ -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="\${acc10Branded}" alt="acc10"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل رذاذ (فوهة) دقيقة</span>
                <span class="pdf-compact-desc">فوهة نزل رذاذ مطور دقيق يوزع الرذاذ بانتظام ويقاوم الانسداد.</span>
                <span class="pdf-compact-price">30 ريال</span>
              </div>
            </div>

            <!-- acc9: نزل ضباب -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="\${acc9Branded}" alt="acc9"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل ضباب (فوهة) ستانلس</span>
                <span class="pdf-compact-desc">نوزل ضباب ستانلس مجهري للضغط العالي يوفر برودة فائقة دون بلل.</span>
                <span class="pdf-compact-price">35 ريال</span>
              </div>
            </div>

            <!-- acc11: نزل ضباب نحاس امريكي -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="\${acc11Branded}" alt="acc11"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل ضباب نحاس أمريكي</span>
                <span class="pdf-compact-desc">نوزل نحاسي أمريكي فاخر ذو مقاومة عالية جداً للأملاح والترسبات.</span>
                <span class="pdf-compact-price">60 ريال</span>
              </div>
            </div>

            <!-- acc12: نزل رذاذ صرف ماء -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="\${acc12Branded}" alt="acc12"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل رذاذ (مع صمام صرف)</span>
                <span class="pdf-compact-desc">فوهة رذاذ مجهزة بصمام مانع للتنقيط وتصريف مائي تلقائي.</span>
                <span class="pdf-compact-price">80 ريال</span>
              </div>
            </div>

            <!-- acc13: نزل ضباب صرف ماء -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="\${acc13Branded}" alt="acc13"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل ضباب (مع صمام صرف)</span>
                <span class="pdf-compact-desc">فوهة ضباب ستانلس ستيل مع صمام تصريف هيدروليكي لمنع التنقيط.</span>
                <span class="pdf-compact-price">100 ريال</span>
              </div>
            </div>

            <!-- acc8: سائل تنظيف فوهات -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="\${acc8Branded}" alt="acc8"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">سائل تنظيف فوهات الضباب</span>
                <span class="pdf-compact-desc">محلول صيانة فعال لتنظيف الفوهات المسدودة وإزالة الترسبات الكلسية.</span>
                <span class="pdf-compact-price">220 ريال</span>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 9 من 11</span>
        </div>
      </div>

      `;

const updatedContent = content.slice(0, page8EndIndex) + page9HTML + content.slice(page8EndIndex);

fs.writeFileSync('generate_pdf_catalog.js', updatedContent);
console.log('🎉 generate_pdf_catalog.js successfully updated to 11 pages with the new nozzles section!');
