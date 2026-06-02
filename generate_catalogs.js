const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Helper to convert local images to Base64 data URIs for instant, reliable rendering
function getBase64Image(filename) {
  const filePath = path.join(__dirname, 'images', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`[Warning] Image not found: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).replace('.', '');
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
}

// Prepare images
const logoBase64 = getBase64Image('logo.png');
const mct15PumpBase64 = getBase64Image('mct15_pump.png');
const productPumpBase64 = getBase64Image('product_pump.png');
const fountainColumnBase64 = getBase64Image('fountain_column.png');
const productPoleBase64 = getBase64Image('product_pole.png');
const productConnectorBase64 = getBase64Image('product_connector.png');
const productHoseBase64 = getBase64Image('product_hose.png');
const smallFilterBase64 = getBase64Image('small_filter.png');
const fogNozzleBase64 = getBase64Image('fog_nozzle.png');
const nozzleBaseImgBase64 = getBase64Image('nozzle_base.png');
const endCapBase64 = getBase64Image('end_cap.png');

// Packages Data definitions matching the live website perfectly (NO prices)
const packages = [
  {
    id: 1,
    name: 'باقة الرذاذ الاقتصادية',
    subtitle: 'مثالية للاستخدام المنزلي والمساحات الصغيرة - مضخة MCT15 مع أعمدة نافورة',
    badge: 'اقتصادية',
    themeColor: '#0fb8a9',
    products: [
      { num: '01', name: 'مضخة رذاذ MCT15 صينية', desc: 'بقدرة 45 واط + لوحة تحكم (Control Panel)', img: mct15PumpBase64, qty: '1 حبة' },
      { num: '02', name: 'عمود النافورة ستالس ستيل رذاذ', desc: 'بارتفاع 1.20م يحتوي 3 أفرع والفرع فيه 1 نوزل', img: fountainColumnBase64, qty: '2 حبة' },
      { num: '03', name: 'قسام رذاذ ثلاثي (Tee Mist)', desc: 'موزع ثلاثي الاتجاهات لتوزيع الرذاذ بمرونة', img: productConnectorBase64, qty: '1 حبة' },
      { num: '04', name: 'هوز رذاذ كبس تايواني 1/4"', desc: '15 متر - خرطوم رذاذ كبس عالي الجودة ومقاوم للحرارة', img: productHoseBase64, qty: '1 لفة' },
      { num: '05', name: 'فلتر صغير (Small Filter)', desc: 'فلتر تنقية مياه صغير لحماية النوزلات من الانسداد والترسبات', img: smallFilterBase64, qty: '1 حبة' }
    ]
  },
  {
    id: 2,
    name: 'باقة الشارك للضباب',
    subtitle: 'مضخة الشارك الصينية 1HP مع عمودين نخلة ستانلس ستيل - للحدائق المتوسطة',
    badge: 'احترافية',
    themeColor: '#0d7cc4',
    products: [
      { num: '01', name: 'مضخة الشارك صينية 1 حصان', desc: 'Shark Pump FWP-CH-1HP + 2 فلاتر + محبس إلكتروني + لوحة تحكم', img: productPumpBase64, qty: '1 حبة' },
      { num: '02', name: 'عمود (النخلة) ستانلس ستيل', desc: 'بارتفاع 2.60م يحتوي 3 أفرع والفرع فيه 3 نوزل - مجموع 9 نوزلات لكل عمود', img: productPoleBase64, qty: '2 حبة' },
      { num: '03', name: 'قسام ثلاثي سليب لوك ستانلس ستيل 3/8"', desc: 'Tee Connector Slip-lock SS 3/8" - موزع ضغط عالي متين', img: productConnectorBase64, qty: '1 حبة' },
      { num: '04', name: 'هوز ضباب سليب لوك نايلون صيني 3/8"', desc: '50 متر - خرطوم ضباب يتحمل الضغوط العالية بنظام سليب لوك', img: productHoseBase64, qty: '1 لفة' }
    ]
  },
  {
    id: 3,
    name: 'باقة الضباب الإيطالية',
    subtitle: 'مضخة إيطالية FWP-IT-100 مع نوزلات وقواعد ولي ضباب - بدون أعمدة (للجدران)',
    badge: 'إيطالية فاخرة',
    themeColor: '#0a6199',
    products: [
      { num: '01', name: 'مضخة FWP-IT-100 إيطالية', desc: 'مضخة إيطالية أصلية + 2 فلاتر + محبس إلكتروني + لوحة تحكم متكاملة', img: productPumpBase64, qty: '1 حبة' },
      { num: '02', name: 'نوزل ضباب 2 ميكرون 3/8"', desc: 'فوهات ضباب فائقة الدقة والنعومة لرذاذ منساب ومنعش دون بلل', img: fogNozzleBase64, qty: '25 حبة' },
      { num: '03', name: 'قاعدة نوزل سليب لوك ستالس ستيل 3/8"', desc: 'قاعدة تثبيت ستانلس ستيل بنظام تركيب سريع سليب لوك', img: nozzleBaseImgBase64, qty: '24 حبة' },
      { num: '04', name: 'نهاية بفتحة نوزل سليب لوك 3/8"', desc: 'سدادة نهاية الخط ستانلس ستيل مع فتحة نوزل مدمجة', img: endCapBase64, qty: '1 حبة' },
      { num: '05', name: 'لي هوز ضباب سليب لوك صيني 3/8"', desc: '50 متر - خرطوم ضباب نايلون متين ومرن ومقاوم للضغوط', img: productHoseBase64, qty: '1 لفة' }
    ]
  },
  {
    id: 4,
    name: 'باقة الضباب الإيطالية مع الأعمدة',
    subtitle: 'الباقة الأكثر طلباً - مضخة إيطالية 1HP مع عمودين نخلة ستانلس ستيل فاخرين',
    badge: 'الأكثر طلباً',
    themeColor: '#d4a843',
    products: [
      { num: '01', name: 'مضخة إيطالية 1 حصان', desc: 'Pump FWP-IT100-1HP + 2 فلاتر + محبس إلكتروني + لوحة تحكم متكاملة', img: productPumpBase64, qty: '1 حبة' },
      { num: '02', name: 'عمود (النخلة) ستانلس ستيل', desc: 'بارتفاع 2.60م يحتوي 3 أفرع والفرع فيه 3 نوزل - مجموع 9 نوزلات لكل عمود', img: productPoleBase64, qty: '2 حبة' },
      { num: '03', name: 'قسام ثلاثي سليب لوك ستانلس ستيل 3/8"', desc: 'Tee Connector Slip-lock SS 3/8" - موزع ثلاثي الاتجاهات', img: productConnectorBase64, qty: '1 حبة' },
      { num: '04', name: 'هوز ضباب سليب لوك نايلون صيني 3/8"', desc: '50 متر - خرطوم ضباب نايلون عالي الجودة بنظام سليب لوك', img: productHoseBase64, qty: '1 لفة' }
    ]
  },
  {
    id: 5,
    name: 'باقة النظام المتكامل (VIP)',
    subtitle: 'أقوى وأشمل باقة - مضخة صينية 1HP مع 4 أعمدة نخلة و 3 قسامات للمساحات الشاسعة',
    badge: 'VIP متكاملة',
    themeColor: '#7a1fa2',
    products: [
      { num: '01', name: 'مضخة FWP-CH-1HP صينية', desc: 'مضخة صينية 1 حصان متينة + فلتر + محبس إلكتروني + لوحة تحكم', img: productPumpBase64, qty: '1 حبة' },
      { num: '02', name: 'عمود (النخلة) ستانلس ستيل', desc: 'بارتفاع 2.60م يحتوي 3 أفرع والفرع فيه 3 نوزل - مجموع 9 نوزلات لكل عمود', img: productPoleBase64, qty: '4 حبة' },
      { num: '03', name: 'قسام ثلاثي سليب لوك ستانلس ستيل 3/8"', desc: 'موزع ثلاثي الاتجاهات من الستانلس ستيل بنظام سليب لوك (3 حبات)', img: productConnectorBase64, qty: '3 حبة' },
      { num: '04', name: 'لي هوز ضباب سليب لوك نايلون صيني 3/8"', desc: '50 متر - خرطوم ضباب عالي التحمل لشبكة توزيع متكاملة', img: productHoseBase64, qty: '1 لفة' }
    ]
  }
];

// Generate HTML structure with ultra premium styling
function generateHTML(pkg) {
  const tableRows = pkg.products.map(p => `
    <tr>
      <td class="col-num">${p.num}</td>
      <td class="col-img"><div class="img-wrapper"><img src="${p.img}" alt="${p.name}"></div></td>
      <td class="col-details">
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.desc}</div>
      </td>
      <td class="col-qty"><span class="qty-badge">${p.qty}</span></td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>${pkg.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800&display=swap');
        
        :root {
          --primary-navy: #042d44;
          --primary-blue: #0d7cc4;
          --primary-light: #e8f4fd;
          --text-dark: #1e293b;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --theme-color: ${pkg.themeColor};
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Cairo', sans-serif;
          background-color: #f8fafc;
          color: var(--text-dark);
          width: 1200px;
          height: 1200px;
          display: flex;
          flex-direction: column;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        /* Snowflake background watermark */
        .watermark {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(13, 124, 196, 0.03) 0%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }

        /* Container Card */
        .card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          padding: 25px;
          z-index: 1;
          position: relative;
        }

        /* HEADER SECTION */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 18px;
          margin-bottom: 20px;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo-img {
          height: 70px;
          width: auto;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title-en {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: var(--primary-navy);
          letter-spacing: 0.5px;
        }

        .brand-title-ar {
          font-size: 14px;
          color: var(--primary-blue);
          font-weight: 700;
          margin-top: -3px;
        }

        .package-title-section {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .badge {
          background: var(--theme-color);
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          padding: 4px 14px;
          border-radius: 50px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .package-name {
          font-size: 28px;
          font-weight: 900;
          color: var(--primary-navy);
        }

        .package-subtitle {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: -2px;
          max-width: 500px;
          text-align: left;
        }

        /* TABLE SECTION */
        .table-container {
          flex-grow: 1;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: right;
        }

        th {
          background-color: var(--primary-light);
          color: var(--primary-navy);
          font-size: 15px;
          font-weight: 800;
          padding: 12px 15px;
          border-bottom: 2px solid var(--border-color);
        }

        th:first-child { border-top-right-radius: 10px; border-bottom-right-radius: 10px; }
        th:last-child { border-top-left-radius: 10px; border-bottom-left-radius: 10px; }

        td {
          padding: 10px 15px;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .col-num {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-muted);
          width: 5%;
        }

        .col-img {
          width: 10%;
        }

        .img-wrapper {
          width: 60px;
          height: 60px;
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .img-wrapper img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .col-details {
          width: 70%;
        }

        .prod-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-navy);
        }

        .prod-desc {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .col-qty {
          width: 15%;
          text-align: center;
        }

        .qty-badge {
          background-color: #f1f5f9;
          border: 1px solid var(--border-color);
          color: var(--primary-navy);
          font-size: 13px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 6px;
          display: inline-block;
        }

        /* PRICE ROW (CONTACT CTA - NO PRICES) */
        .contact-cta-row {
          background: linear-gradient(135deg, var(--primary-navy) 0%, #0d7cc4 100%);
          border-radius: 12px;
          padding: 14px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          margin-bottom: 20px;
          box-shadow: 0 6px 15px rgba(13, 124, 196, 0.2);
        }

        .cta-text-side {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cta-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
        }

        .cta-main {
          font-size: 18px;
          font-weight: 800;
        }

        .cta-phone-side {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .phone-badge {
          background: #25d366; /* WhatsApp Green */
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 800;
          padding: 6px 20px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
        }

        .phone-badge svg {
          fill: currentColor;
          width: 20px;
          height: 20px;
        }

        .call-badge {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 50px;
        }

        /* TERMS & WARRANTY GRID */
        .info-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 15px;
          border-top: 2px solid var(--primary-light);
          padding-top: 15px;
        }

        .info-box {
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 12px 15px;
        }

        .info-box h4 {
          font-size: 13px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 5px;
        }

        .info-box h4 svg {
          width: 14px;
          height: 14px;
          stroke: var(--primary-blue);
        }

        .info-box ul {
          list-style: none;
        }

        .info-box li {
          font-size: 10px;
          color: var(--text-dark);
          margin-bottom: 5px;
          display: flex;
          align-items: flex-start;
          gap: 5px;
          line-height: 1.4;
        }

        .info-box li::before {
          content: '•';
          color: var(--primary-blue);
          font-weight: bold;
        }

        .warning-box {
          grid-column: span 2;
          background: #fff5f5;
          border: 1px solid #fee2e2;
          border-radius: 10px;
          padding: 8px 12px;
        }

        .warning-box h4 {
          color: #dc2626;
          font-size: 11px;
          font-weight: 800;
          margin-bottom: 4px;
          border-bottom: 1px solid #fecaca;
          padding-bottom: 3px;
        }

        .warning-box p {
          font-size: 9.5px;
          color: #991b1b;
          line-height: 1.4;
          font-weight: 500;
        }

        /* FOOTER */
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 15px;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          border-top: 1px solid var(--border-color);
          padding-top: 8px;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .footer-left span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .footer-right {
          font-family: 'Outfit', sans-serif;
        }
      </style>
    </head>
    <body>
      <div class="watermark"></div>
      <div class="card">
        
        <!-- HEADER -->
        <div class="header">
          <div class="brand-section">
            <img class="logo-img" src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-title-en">Silent Fog</span>
              <span class="brand-title-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <div class="package-title-section">
            <span class="badge">${pkg.badge}</span>
            <h1 class="package-name">${pkg.name}</h1>
            <p class="package-subtitle">${pkg.subtitle}</p>
          </div>
        </div>

        <!-- TABLE -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 5%">#</th>
                <th style="width: 12%; text-align: center;">المنتج</th>
                <th style="width: 68%">البند والمواصفات</th>
                <th style="width: 15%; text-align: center;">الكمية</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>

        <!-- CONTACT CTA (NO PRICES) -->
        <div class="contact-cta-row">
          <div class="cta-text-side">
            <span class="cta-label">الأسعار غير شاملة التوصيل والتركيب</span>
            <span class="cta-main">📞 للاستفسار عن الأسعار والطلب تواصل معنا:</span>
          </div>
          <div class="cta-phone-side">
            <span class="call-badge">اتصال مباشر</span>
            <div class="phone-badge">
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>0559152818</span>
            </div>
          </div>
        </div>

        <!-- TERMS & WARRANTY GRID -->
        <div class="info-grid">
          
          <!-- Warranty -->
          <div class="info-box">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              الشروط والأحكام والضمان
            </h4>
            <ul>
              <li>ضمان لمدة سنتين كاملتين على المضخة ضد العيوب المصنعية (ماعدا الفوهات وسوء الاستخدام).</li>
              <li><strong>السنة الأولى:</strong> ضمان شامل مجاني بالكامل لقطع الغيار وأجور اليد الصيانة.</li>
              <li><strong>السنة الثانية:</strong> يدفع العميل قيمة قطع الغيار فقط، وتكون أجور اليد مجانية بالكامل.</li>
            </ul>
          </div>

          <!-- Maintenance -->
          <div class="info-box">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              إرشادات الصيانة الدورية
            </h4>
            <ul>
              <li>ضرورة تنظيف أو تغيير فلتر مدخل المياه فور اتساخه لضمان نقاء المياه وحماية المضخة.</li>
              <li>تغيير زيت المضخة بشكل دوري كل 1000 ساعة تشغيل أو كل 6 أشهر (لمضخات الضباب).</li>
              <li>تنظيف فوهات النوزل فوراً عند ملاحظة انسداد أكثر من 20% لضمان التبريد المتناسق.</li>
            </ul>
          </div>

          <!-- Warnings -->
          <div class="warning-box">
            <h4>⚠️ تنبيهات هامة (مسببات الخروج من الضمان وتعتبر سوء استخدام):</h4>
            <p>
              عدم الالتزام بالصيانة الدورية الموصى بها • تشغيل المضخة دون ماء أو زيت أو التأكد من سلامة التوصيلات وتدفق المياه • رفع ضغط التشغيل للماكينة عن الحد الأقصى المسموح به في كتيب التشغيل • وضع المضخة في غرف ضيقة غير مهواة أو في أماكن عرضة للغمر المباشر بالماء أو السيول.
            </p>
          </div>

        </div>

        <!-- FOOTER -->
        <div class="footer">
          <div class="footer-left">
            <span>📍 تبوك - نخدم جميع مناطق المملكة العربية السعودية 🇸🇦</span>
            <span>📱 تيك توك: silentfog3@</span>
          </div>
          <div class="footer-right">أبو طيف للضباب والرذاذ © 2026</div>
        </div>

      </div>
    </body>
    </html>
  `;
}

// Generate the 5 catalogs programmatically
async function main() {
  console.log('🚀 Starting Catalog Image Generation...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 2 }); // 2x scale for ultra-sharp rendering!

  const outputDir = path.join(__dirname, 'images');
  const artifactsDir = 'C:\\Users\\t\\.gemini\\antigravity\\brain\\4ac733a0-c12b-413f-862e-707610cfd557';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const pkg of packages) {
    const htmlContent = generateHTML(pkg);
    await page.setContent(htmlContent, { waitUntil: 'load' });
    // Wait a brief moment to ensure fonts are fully rendered
    await new Promise(r => setTimeout(r, 500));

    const localPath = path.join(outputDir, `catalog_pkg${pkg.id}.png`);
    const artifactPath = path.join(artifactsDir, `catalog_pkg${pkg.id}.png`);

    console.log(`📸 Rendering Catalog ${pkg.id}: ${pkg.name}...`);
    
    // Capture high resolution screenshot
    await page.screenshot({
      path: localPath,
      type: 'png',
      omitBackground: false
    });

    // Copy to brain artifacts directory so user can view immediately
    try {
      fs.copyFileSync(localPath, artifactPath);
      console.log(`✅ Saved catalog to website images and artifacts brain!`);
    } catch (err) {
      console.error(`[Error] Failed to copy to artifacts:`, err.message);
    }
  }

  await browser.close();
  console.log('🎉 All 5 catalog images generated successfully!');
}

main().catch(err => {
  console.error('❌ Generation failed:', err);
  process.exit(1);
});
