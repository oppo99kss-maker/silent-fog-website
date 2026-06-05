const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let html = fs.readFileSync(filePath, 'utf8');

// Define new products data
const productsListHTML = `
  <!-- PACKAGES SECTION -->
  <section class="packages" id="packages">
    <div class="container">
      <div class="section-header animate-on-scroll">
        <div class="section-tag">باقاتنا ومنتجاتنا</div>
        <h2>اختر <span>النظام والتبريد</span> الأنسب لك</h2>
        <p>مجموعة واسعة من أنظمة الرذاذ المطور والضباب المتكامل والباكجات المجهزة بأعلى المواصفات والأسعار التنافسية</p>
      </div>

      <!-- Categories Filter Tabs -->
      <div class="products-filter-container animate-on-scroll">
        <button class="tab-btn active" onclick="filterProducts('all')">الكل</button>
        <button class="tab-btn" onclick="filterProducts('mist')">أجهزة الرذاذ المطور</button>
        <button class="tab-btn" onclick="filterProducts('fog')">أجهزة الضباب المتكاملة</button>
        <button class="tab-btn" onclick="filterProducts('packages')">باكجات المراوح والأعمدة</button>
      </div>

      <div class="packages-grid">

        <!-- 1. رذاذ 20 رأس -->
        <div class="package-card animate-on-scroll" data-category="mist" onclick="openModal('prod1')">
          <div class="package-card-header">
            <span class="package-tier tier-basic">رذاذ مطور</span>
            <h3>جهاز رذاذ مطور (20 رأس)</h3>
            <p class="package-desc">تغطية لغاية 25 متر — مثالي للجلسات الصغيرة والممرات المنزلية</p>
            <div class="price-display">799 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p3_branded.png" alt="رذاذ مطور 20 رأس">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 25م</span>
              <span class="highlight-tag">20 فوهة رذاذ</span>
              <span class="highlight-tag">مطور هادئ</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 2. رذاذ 30 رأس -->
        <div class="package-card animate-on-scroll" data-category="mist" onclick="openModal('prod2')">
          <div class="package-card-header">
            <span class="package-tier tier-basic">رذاذ مطور</span>
            <h3>جهاز رذاذ مطور (30 رأس)</h3>
            <p class="package-desc">تغطية لغاية 40 متر — خيار رائع للمساحات المنزلية المتوسطة</p>
            <div class="price-display">899 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p4_branded.png" alt="رذاذ مطور 30 رأس">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 40م</span>
              <span class="highlight-tag">30 فوهة رذاذ</span>
              <span class="highlight-tag">كفاءة عالية</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 3. رذاذ 40 رأس -->
        <div class="package-card animate-on-scroll" data-category="mist" onclick="openModal('prod3')">
          <div class="package-card-header">
            <span class="package-tier tier-pro">رذاذ مطور</span>
            <h3>جهاز رذاذ مطور (40 رأس)</h3>
            <p class="package-desc">تغطية لغاية 50 متر — قوة تبريد ممتازة للمساحات المتوسطة والكبيرة</p>
            <div class="price-display">1,299 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p2_branded.png" alt="رذاذ مطور 40 رأس">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 50م</span>
              <span class="highlight-tag">40 فوهة رذاذ</span>
              <span class="highlight-tag">أداء مميز</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 4. رذاذ 60 رأس -->
        <div class="package-card animate-on-scroll" data-category="mist" onclick="openModal('prod4')">
          <div class="package-card-header">
            <span class="package-tier tier-pro">رذاذ مطور</span>
            <h3>جهاز رذاذ مطور (60 رأس)</h3>
            <p class="package-desc">تغطية لغاية 75 متر — التغطية الأقوى والأشمل لفئة الرذاذ المطور</p>
            <div class="price-display">1,899 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p1_branded.png" alt="رذاذ مطور 60 رأس">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 75م</span>
              <span class="highlight-tag">60 فوهة رذاذ</span>
              <span class="highlight-tag">VIP رذاذ</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 5. ضباب صيني 25 فوهة (كبير) -->
        <div class="package-card animate-on-scroll" data-category="fog" onclick="openModal('prod5')">
          <div class="package-card-header">
            <span class="package-tier tier-premium">ضباب احترافي</span>
            <h3>نظام ضباب صيني متكامل (25 فوهة)</h3>
            <p class="package-desc">تغطية 35 متر — ضغط عالي متكامل للحدائق والاستراحات</p>
            <div class="price-display">4,999 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p5_branded.png" alt="نظام ضباب صيني 25 فوهة">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 35م</span>
              <span class="highlight-tag">25 فوهة ضباب</span>
              <span class="highlight-tag">ضغط عالي صيني</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 6. ضباب إيطالي 25 فوهة (كبير) -->
        <div class="package-card popular animate-on-scroll" data-category="fog" onclick="openModal('prod6')">
          <div class="package-card-header">
            <span class="package-tier tier-elite">إيطالي فاخر</span>
            <h3>نظام ضباب إيطالي متكامل (25 فوهة)</h3>
            <p class="package-desc">تغطية 35 متر — هدوء تام وأداء هيدروليكي فائق الجودة</p>
            <div class="price-display">6,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p6_branded.png" alt="نظام ضباب إيطالي 25 فوهة">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 35م</span>
              <span class="highlight-tag">25 فوهة ضباب</span>
              <span class="highlight-tag">إيطالي صامت FWP-IT</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 7. ضباب تايواني 35 فوهة (كبير) -->
        <div class="package-card animate-on-scroll" data-category="fog" onclick="openModal('prod7')">
          <div class="package-card-header">
            <span class="package-tier tier-premium">تايواني قوي</span>
            <h3>نظام ضباب تايواني متكامل (35 فوهة)</h3>
            <p class="package-desc">تغطية 50 متر — مضخة قوية وهادئة لانتشار ضبابي متوازن</p>
            <div class="price-display">5,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p8_branded.png" alt="نظام ضباب تايواني 35 فوهة">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 50م</span>
              <span class="highlight-tag">35 فوهة ضباب</span>
              <span class="highlight-tag">تايواني متين</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 8. ضباب تايواني 60 فوهة (كبير) -->
        <div class="package-card animate-on-scroll" data-category="fog" onclick="openModal('prod8')">
          <div class="package-card-header">
            <span class="package-tier tier-ultimate">VIP تايواني</span>
            <h3>نظام ضباب تايواني متكامل (60 فوهة)</h3>
            <p class="package-desc">تغطية 80 متر — للمساحات الخارجية الواسعة والمطاعم والمقاهي</p>
            <div class="price-display">7,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p7_branded.png" alt="نظام ضباب تايواني 60 فوهة">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">تغطية 80م</span>
              <span class="highlight-tag">60 فوهة ضباب</span>
              <span class="highlight-tag">ضغط عالي جداً</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 9. باكج 2 مروحة رذاذ 24 انش + مضخة (كبير) -->
        <div class="package-card animate-on-scroll" data-category="packages" onclick="openModal('prod9')">
          <div class="package-card-header">
            <span class="package-tier tier-pro">باكج مراوح</span>
            <h3>باكج مروحتين رذاذ 24 إنش + مضخة</h3>
            <p class="package-desc">تبريد بالرذاذ مع تدفق هواء قوي — مثالي للاستراحات الكبيرة والمقاهي</p>
            <div class="price-display">5,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p10_branded.png" alt="مروحتين رذاذ 24 انش">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">2 مروحة 24"</span>
              <span class="highlight-tag">16 فوهة رذاذ</span>
              <span class="highlight-tag">مضخة رذاذ مطورة</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 10. باكج 2 مروحة ضباب 20 انش + مضخة 40 بار (كبير) -->
        <div class="package-card animate-on-scroll" data-category="packages" onclick="openModal('prod10')">
          <div class="package-card-header">
            <span class="package-tier tier-elite">باكج ضباب</span>
            <h3>باكج مروحتين ضباب 20 إنش + مضخة 40 بار</h3>
            <p class="package-desc">أقوى دمج لتبريد الهواء والضباب للقصور والمقاهي المفتوحة</p>
            <div class="price-display">10,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p9_branded.png" alt="مروحتين ضباب 20 انش">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">2 مروحة 20"</span>
              <span class="highlight-tag">10 فوهات ضباب</span>
              <span class="highlight-tag">مضخة ضباب 40 بار</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 11. باكج 2 عمود حديد 24 فوهة + مضخة 40 بار (كبير) -->
        <div class="package-card animate-on-scroll" data-category="packages" onclick="openModal('prod11')">
          <div class="package-card-header">
            <span class="package-tier tier-premium">باكج أعمدة</span>
            <h3>باكج عمودين ضباب حديد + مضخة 40 بار</h3>
            <p class="package-desc">تغطية 25 متر مربع — تصميم ديكوري يجمع تبريد الضباب وجمال الأعمدة</p>
            <div class="price-display">7,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p12_branded.png" alt="عمودين ضباب حديد">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">2 عمود حديد</span>
              <span class="highlight-tag">24 فوهة ضباب</span>
              <span class="highlight-tag">مضخة ضباب 40 بار</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

        <!-- 12. باكج 4 عمود حديد 45 فوهة + مضخة 70 بار (كبير) -->
        <div class="package-card animate-on-scroll" data-category="packages" onclick="openModal('prod12')">
          <div class="package-card-header">
            <span class="package-tier tier-ultimate">VIP متكامل</span>
            <h3>باكج 4 أعمدة ضباب حديد + مضخة 70 بار</h3>
            <p class="package-desc">تغطية 45 متر مربع — تغطية شاملة للمقاهي الفاخرة والمساحات الشاسعة</p>
            <div class="price-display">9,499 <span class="price-curr">ريال</span></div>
          </div>
          <div class="package-pump-img">
            <img src="images/anas_images/p11_branded.png" alt="4 أعمدة ضباب حديد">
          </div>
          <div class="package-card-body">
            <div class="package-highlights">
              <span class="highlight-tag">4 أعمدة حديد</span>
              <span class="highlight-tag">45 فوهة ضباب</span>
              <span class="highlight-tag">مضخة ضباب 70 بار</span>
            </div>
            <div class="package-price-row">
              <span class="package-cta">عرض التفاصيل والطلب</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
`;

// Replace packages section
const sectionRegex = /<!-- PACKAGES SECTION -->[\s\S]*?<!-- FOG SYSTEMS SECTION -->/;
if (sectionRegex.test(html)) {
  html = html.replace(sectionRegex, productsListHTML + '\n  <!-- FOG SYSTEMS SECTION -->');
  console.log('✅ Replaced Packages Section in HTML');
} else {
  console.error('❌ Could not find Packages Section wrapper in HTML');
}

// Prepare products javascript data
const productsJS = `
    // ===== PRODUCTS DATA =====
    const packagesData = {
      prod1: {
        name: 'جهاز رذاذ مطور (20 رأس)',
        desc: 'نظام رذاذ منزلي مطور وممتاز لتبريد الجلسات الصغيرة والممرات المنزلية والمظلات الصغيرة.',
        pumpImg: 'images/anas_images/p3_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز رذاذ مطور 20 رأس بسعر 799 ريال',
        products: [
          { num: '01', name: 'مضخة رذاذ مطورة', desc: 'مضخة هادئة واقتصادية لتغذية فوهات الرذاذ', img: 'images/anas_images/p3_branded.png', qty: '1 حبة' },
          { num: '02', name: 'فوهات رذاذ نحاسية', desc: 'نحاس نقي مقاوم للصدأ والترسبات', img: 'images/fog_nozzle.png', qty: '20 حبة' },
          { num: '03', name: 'لي رذاذ كبس 1/4 بوصة', desc: 'خرطوم رذاذ عالي التحمل بطول 25 متر لتغطية ممتازة', img: 'images/product_hose.png', qty: '1 لفة (25م)' }
        ]
      },
      prod2: {
        name: 'جهاز رذاذ مطور (30 رأس)',
        desc: 'نظام رذاذ منزلي مطور مناسب للجلسات العائلية والمساحات المتوسطة لتبريد طبيعي ومنعش.',
        pumpImg: 'images/anas_images/p4_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز رذاذ مطور 30 رأس بسعر 899 ريال',
        products: [
          { num: '01', name: 'مضخة رذاذ مطورة', desc: 'مضخة هادئة ذات سعة تشغيل متوسطة', img: 'images/anas_images/p4_branded.png', qty: '1 حبة' },
          { num: '02', name: 'فوهات رذاذ نحاسية دقيقة', desc: 'مقاومة للتآكل لتدفق رذاذ ناعم', img: 'images/fog_nozzle.png', qty: '30 حبة' },
          { num: '03', name: 'لي رذاذ كبس 1/4 بوصة', desc: 'خرطوم رذاذ مرن بطول 40 متر للتمديد والتركيب السهل', img: 'images/product_hose.png', qty: '1 لفة (40م)' }
        ]
      },
      prod3: {
        name: 'جهاز رذاذ مطور (40 رأس)',
        desc: 'نظام رذاذ مطور ذو كفاءة تشغيل عالية للمساحات المتوسطة والكبيرة، يضمن تبريداً مستمراً وهادئاً.',
        pumpImg: 'images/anas_images/p2_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز رذاذ مطور 40 رأس بسعر 1,299 ريال',
        products: [
          { num: '01', name: 'مضخة رذاذ مطورة قوية', desc: 'أداء مستقر وساعات عمل طويلة', img: 'images/anas_images/p2_branded.png', qty: '1 - 1/4 حصان' },
          { num: '02', name: 'فوهات رذاذ نحاسية', desc: '40 نوزل رذاذ نحاسي بدقة متناهية لمنع البلل', img: 'images/fog_nozzle.png', qty: '40 حبة' },
          { num: '03', name: 'لي رذاذ كبس 1/4 بوصة', desc: 'لي تايواني أصلي 50 متر يتحمل ضغط المياه', img: 'images/product_hose.png', qty: '1 لفة (50م)' }
        ]
      },
      prod4: {
        name: 'جهاز رذاذ مطور (60 رأس)',
        desc: 'الخيار الأقوى والأشمل لفئة أنظمة الرذاذ المطور، تغطية واسعة جداً للجلسات الكبيرة والاستراحات والمنشآت التجارية.',
        pumpImg: 'images/anas_images/p1_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز رذاذ مطور 60 رأس بسعر 1,899 ريال',
        products: [
          { num: '01', name: 'مضخة رذاذ مطورة VIP', desc: 'طاقة تشغيلية عالية لتغذية 60 نوزل بكفاءة تامة', img: 'images/anas_images/p1_branded.png', qty: '1 حبة' },
          { num: '02', name: 'فوهات رذاذ نحاسية مع فلتر', desc: '60 نوزل رذاذ نحاسي مع فلاتر داخلية لمنع الانسداد', img: 'images/fog_nozzle.png', qty: '60 حبة' },
          { num: '03', name: 'لي رذاذ كبس تايواني', desc: 'طول 75 متر تمديدات كاملة لشبكة الرذاذ', img: 'images/product_hose.png', qty: '1 لفة (75م)' }
        ]
      },
      prod5: {
        name: 'نظام ضباب صيني متكامل (25 فوهة)',
        desc: 'نظام ضباب ضغط عالي متكامل بمضخة صينية قوية، يغطي 35 متراً ويحتوي على 25 فوهة ضباب لتبريد الحدائق والمساحات التجارية والقصور.',
        pumpImg: 'images/anas_images/p5_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز ضباب صيني متكامل 25 فوهة بسعر 4,999 ريال',
        products: [
          { num: '01', name: 'مضخة ضباب صينية ضغط عالي', desc: 'مضخة ضباب هادئة مع صمام محبس إلكتروني ولوحة تحكم ذكية', img: 'images/anas_images/p5_branded.png', qty: '1 حبة (كبير)' },
          { num: '02', name: 'نوزلات ضباب ستانلس ستيل', desc: 'فوهات ضباب دقيقة بدقة 2 ميكرون تمنع البلل وتبرد الأجواء', img: 'images/fog_nozzle.png', qty: '25 حبة' },
          { num: '03', name: 'قواعد هوز ونهايات سليب لوك', desc: 'قواعد وقسامات ستانلس ستيل بنظام كبس سليب لوك 3/8"', img: 'images/nozzle_base.png', qty: '25 حبة' },
          { num: '04', name: 'لي هوز ضباب نايلون 3/8"', desc: 'خرطوم ضباب نايلون يتحمل الضغط العالي لغاية 70 بار', img: 'images/product_hose.png', qty: '1 لفة (35م)' }
        ]
      },
      prod6: {
        name: 'نظام ضباب إيطالي متكامل (25 فوهة)',
        desc: 'نظام ضباب إيطالي فاخر وصامت تماماً، يوفر رذاذاً مجهرياً دقيقاً كالغيم، مناسب جداً للمقاهي الراقية والفلل الفخمة.',
        pumpImg: 'images/anas_images/p6_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز ضباب إيطالي متكامل 25 فوهة بسعر 6,499 ريال',
        products: [
          { num: '01', name: 'مضخة ضباب إيطالية صامتة', desc: 'مضخة FWP-IT إيطالية أصلية ذات محرك قوي وعمر افتراضي طويل صامتة', img: 'images/anas_images/p6_branded.png', qty: '1 حبة (إيطالي)' },
          { num: '02', name: 'نوزلات ضباب إيطالية ستانلس', desc: '25 نوزل ضباب ستانلس ستيل مضاد للصدأ والترسبات الملحية', img: 'images/fog_nozzle.png', qty: '25 حبة' },
          { num: '03', name: 'قواعد وقسامات سليب لوك إيطالية', desc: 'تمديدات وقسامات أصلية بنظام سليب لوك 3/8"', img: 'images/nozzle_base.png', qty: '25 حبة' },
          { num: '04', name: 'لي هوز ضباب إيطالي عالي التحمل', desc: 'لي هوز ضباب إيطالي 35 متر يتحمل الضغوط الفوق العالية', img: 'images/product_hose.png', qty: '1 لفة (35م)' }
        ]
      },
      prod7: {
        name: 'نظام ضباب تايواني متكامل (35 فوهة)',
        desc: 'نظام ضباب تايواني عالي التحمل بمضخة هادئة، يغطي مساحة 50 متراً ويحتوي على 35 فوهة ضباب دقيقة لتوزيع مثالي وانسيابي.',
        pumpImg: 'images/anas_images/p8_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز ضباب تايواني متكامل 35 فوهة بسعر 5,499 ريال',
        products: [
          { num: '01', name: 'مضخة ضباب تايوانية 1 حصان', desc: 'مضخة ضباب قوية مع لوحة تحكم وفلاتر مزدوجة لحماية الشبكة', img: 'images/anas_images/p8_branded.png', qty: '1 حبة (كبير)' },
          { num: '02', name: 'نوزلات ضباب ستانلس ستيل 3/8"', desc: '35 فوهة ضباب ستانلس ستيل ذات عمر تشغيلي طويل جداً', img: 'images/fog_nozzle.png', qty: '35 حبة' },
          { num: '03', name: 'قواعد وتوصيلات سليب لوك تايوانية', desc: 'توصيلات سريعة الكبس سليب لوك 3/8"', img: 'images/nozzle_base.png', qty: '35 حبة' },
          { num: '04', name: 'لي هوز ضباب نايلون تايواني 3/8"', desc: 'خرطوم ضباب تايواني أصلي يتحمل لغاية 70 بار بطول 50 متر', img: 'images/product_hose.png', qty: '1 لفة (50م)' }
        ]
      },
      prod8: {
        name: 'نظام ضباب تايواني متكامل (60 فوهة)',
        desc: 'نظام ضباب تايواني فائق التحمل لتبريد المساحات الخارجية الواسعة جداً والمشاريع التجارية والمقاهي الكبيرة بضغط هيدروليكي فائق.',
        pumpImg: 'images/anas_images/p7_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لجهاز ضباب تايواني متكامل 60 فوهة بسعر 7,499 ريال',
        products: [
          { num: '01', name: 'مضخة ضباب تايوانية فائقة القوة', desc: 'مضخة تايوانية ذات ضغط عالي متواصل لتغذية 60 نوزل بامتياز', img: 'images/anas_images/p7_branded.png', qty: '1 حبة (كبير)' },
          { num: '02', name: 'نوزلات ضباب ستانلس ستيل 3/8"', desc: '60 فوهة ضباب ستانلس ستيل مجهرية لانتشار كثيف وبارد', img: 'images/fog_nozzle.png', qty: '60 حبة' },
          { num: '03', name: 'قواعد وتوصيلات سليب لوك تايوانية', desc: 'توصيلات وقسامات سريعة الكبس 3/8" عالية الجودة', img: 'images/nozzle_base.png', qty: '60 حبة' },
          { num: '04', name: 'لي هوز ضباب نايلون تايواني 3/8"', desc: 'خرطوم ضباب تايواني أصلي بطول 80 متر لتغطية كافة الممرات', img: 'images/product_hose.png', qty: '1 لفة (80م)' }
        ]
      },
      prod9: {
        name: 'باكج مروحتين رذاذ 24 إنش + مضخة',
        desc: 'باكج تبريد قوي ومتكامل يحتوي على مروحتين رذاذ قويتين قياس 24 بوصة مع 16 فوهة ومضخة رذاذ متوافقة لتدفق هواء بارد ومنعش.',
        pumpImg: 'images/anas_images/p10_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لباكج مروحتين رذاذ 24 انش بسعر 5,499 ريال',
        products: [
          { num: '01', name: 'مروحة رذاذ جدارية/ستاند 24 بوصة', desc: 'توزيع هواء قوي وتغطية ممتازة مع حلقات فوهات مدمجة', img: 'images/anas_images/p10_branded.png', qty: '2 حبة' },
          { num: '02', name: 'مضخة رذاذ مطورة مخصصة للمراوح', desc: 'مضخة لتوفير ضغط تدفق مائي متسق للنوازل', img: 'images/mct15_pump.png', qty: '1 حبة' },
          { num: '03', name: 'فوهات رذاذ وتمديدات كاملة', desc: '16 نوزل رذاذ نحاسي وتوصيلات كاملة للمراوح مع الليات', img: 'images/fog_nozzle.png', qty: 'طقم متكامل' }
        ]
      },
      prod10: {
        name: 'باكج مروحتين ضباب 20 إنش + مضخة 40 بار',
        desc: 'باكج مروحتين ضباب ضغط عالي متكاملتين قياس 20 بوصة مع 10 فوهات ضباب ومضخة 40 بار فائقة الأداء لتغطية استثنائية دون أي بلل.',
        pumpImg: 'images/anas_images/p9_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لباكج مروحتين ضباب 20 انش مع مضخة 40 بار بسعر 10,499 ريال',
        products: [
          { num: '01', name: 'مروحة ضباب دائرية 20 بوصة', desc: 'مروحة تبريد وتوزيع ضباب دائرية عالية الأداء', img: 'images/anas_images/p9_branded.png', qty: '2 حبة' },
          { num: '02', name: 'مضخة ضباب ضغط عالي 40 بار', desc: 'مضخة ضغط عالي تضمن رذاذاً متناهي الصغر لتدفق الضباب', img: 'images/product_pump.png', qty: '1 حبة' },
          { num: '03', name: 'فوهات ضباب وتوصيلات سليب لوك', desc: '10 نوزلات ضباب وتمديدات كاملة مع الهوز لربط المراوح بالماكينة', img: 'images/fog_nozzle.png', qty: 'طقم متكامل' }
        ]
      },
      prod11: {
        name: 'باكج عمودين ضباب حديد + مضخة 40 بار',
        desc: 'باكج تبريد ديكوري يضم عمودين حديد فاخرين مع 24 فوهة ضباب ومضخة 40 بار متكاملة لتبريد وتزيين الممرات والحدائق والمقاهي.',
        pumpImg: 'images/anas_images/p12_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لباكج عمودين ضباب حديد بسعر 7,499 ريال',
        products: [
          { num: '01', name: 'عمود حديد ديكوري فاخر للضباب', desc: 'تصميم فخم بطول 2.30م مع مخارج ضباب مدمجة وتوصيلات داخلية', img: 'images/anas_images/p12_branded.png', qty: '2 عمود' },
          { num: '02', name: 'مضخة ضباب ضغط عالي 40 بار', desc: 'مضخة هادئة وعالية الكفاءة لتغذية فوهات الأعمدة بامتياز', img: 'images/product_pump.png', qty: '1 حبة' },
          { num: '03', name: 'فوهات ضباب وتمديدات سليب لوك', desc: '24 نوزل ضباب وتمديدات كاملة سريعة الكبس للأعمدة', img: 'images/fog_nozzle.png', qty: 'طقم متكامل' }
        ]
      },
      prod12: {
        name: 'باكج 4 أعمدة ضباب حديد + مضخة 70 بار',
        desc: 'باكج ديكوري شامل للمساحات المفتوحة الكبيرة والمقاهي والقصور، يحتوي على 4 أعمدة حديد فاخرة مع 45 فوهة ومضخة ضغط عالي 70 بار.',
        pumpImg: 'images/anas_images/p11_branded.png',
        whatsappMsg: 'السلام عليكم، أرغب في الاستفسار والطلب لباكج 4 أعمدة ضباب حديد بسعر 9,499 ريال',
        products: [
          { num: '01', name: 'عمود حديد ديكوري فاخر للضباب', desc: 'تصميم فخم وأنيق بطول 2.30م مع فتحات النوزلات الموزعة', img: 'images/anas_images/p11_branded.png', qty: '4 أعمدة' },
          { num: '02', name: 'مضخة ضباب ضغط عالي 70 بار', desc: 'أقوى مضخة ضباب لتشغيل 4 أعمدة متكاملة بكفاءة تشغيلية كاملة', img: 'images/product_pump.png', qty: '1 ماكينة' },
          { num: '03', name: 'فوهات ضباب وتوصيلات سليب لوك 3/8"', desc: '45 نوزل ضباب وتوصيلات سريعة الكبس مع لفة هوز 3/8"', img: 'images/fog_nozzle.png', qty: 'طقم متكامل' }
        ]
      }
    };
`;

// Replace packages javascript data in HTML
const jsRegex = /\/\/ ===== PACKAGES DATA =====[\s\S]*?\/\/ ===== WARRANTY & MAINTENANCE/;
if (jsRegex.test(html)) {
  html = html.replace(jsRegex, productsJS + '\n    // ===== WARRANTY & MAINTENANCE');
  console.log('✅ Replaced Packages JS Data in HTML');
} else {
  console.error('❌ Could not find Packages JS Data wrapper in HTML');
}

// Add the JS filter function and update modal behavior if needed
const filterJSSnippet = `
    // ===== PRODUCTS FILTER =====
    function filterProducts(category) {
      const cards = document.querySelectorAll('.package-card');
      const tabs = document.querySelectorAll('.tab-btn');
      
      // Update active tab class
      tabs.forEach(tab => tab.classList.remove('active'));
      if (event && event.target) {
        event.target.classList.add('active');
      }

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          // Force layout recalculation / animation class if needed
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    }
`;

// Insert filter JS before FAQ section or inside the script block
if (!html.includes('function filterProducts')) {
  html = html.replace('// ===== MODAL FUNCTIONS =====', filterJSSnippet + '\n\n    // ===== MODAL FUNCTIONS =====');
  console.log('✅ Appended filterProducts JS function in HTML');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('🎉 index.html updated successfully with new products!');
