const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Helper to convert local images to Base64 data URIs for instant, reliable rendering
function getBase64Image(filename, subDir = '') {
  const filePath = subDir ? path.join(__dirname, 'images', subDir, filename) : path.join(__dirname, 'images', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`[Warning] Image not found: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).toLowerCase().replace('.', '');
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
const heroBannerBase64 = getBase64Image('hero_banner.png');

// Desktop assets
const pyramidalUmbrellaBase64 = getBase64Image('WhatsApp Image 2026-02-15 at 2.41.12 PM (5).jpeg', 'desktop_assets');
const roundUmbrellaBase64 = getBase64Image('WhatsApp Image 2026-02-15 at 2.41.11 PM (5).jpeg', 'desktop_assets');
const model4ColumnBase64 = getBase64Image('WhatsApp Image 2026-02-15 at 2.41.09 PM (3).jpeg', 'desktop_assets');
const eliteColorsBase64 = getBase64Image('WhatsApp Image 2026-02-15 at 2.41.09 PM (6).jpeg', 'desktop_assets');
const curvedArmBase64 = getBase64Image('WhatsApp Image 2026-02-15 at 2.41.11 PM.jpeg', 'desktop_assets');
const pumpDiagramBase64 = getBase64Image('WhatsApp Image 2026-02-16 at 4.30.26 PM.jpeg', 'desktop_assets');

// Success partner original logos (loaded from downloads / fallbacks)
const logoAddressCafeBase64 = getBase64Image('logo_address_cafe.png', 'desktop_assets');
const logoUnitCoffeeBase64 = getBase64Image('logo_unit_coffee.jfif', 'desktop_assets');
const logoTeaCakeBase64 = getBase64Image('logo_tea_cake.jpg', 'desktop_assets');
const logoRahaCoffeeBase64 = getBase64Image('logo_raha_coffee.jpg', 'desktop_assets');
const logoBotticelliBase64 = getBase64Image('logo_botticelli.jpeg', 'desktop_assets');
const logoRoseMasyafBase64 = getBase64Image('logo_rose_masyaf.jpeg', 'desktop_assets');
const logoTarhibHotelBase64 = getBase64Image('logo_tarhib_hotel.png', 'desktop_assets');
const logoEightOzBase64 = getBase64Image('logo_eight_oz.webp', 'desktop_assets');
const logoTeaSesameBase64 = getBase64Image('logo_tea_sesame.jpeg', 'desktop_assets');
const logoDopamineBase64 = getBase64Image('logo_dopamine.png', 'desktop_assets');
const logoArabiaBase64 = getBase64Image('logo_arabia.jpg', 'desktop_assets');

// Branded product images (from Wix/Anas Water, with Silent Fog overlays)
const p1Branded = getBase64Image('p1_branded.png', 'anas_images');
const p2Branded = getBase64Image('p2_branded.png', 'anas_images');
const p3Branded = getBase64Image('p3_branded.png', 'anas_images');
const p4Branded = getBase64Image('p4_branded.png', 'anas_images');
const p5Branded = getBase64Image('p5_branded.png', 'anas_images');
const p6Branded = getBase64Image('p6_branded.png', 'anas_images');
const p7Branded = getBase64Image('p7_branded.png', 'anas_images');
const p8Branded = getBase64Image('p8_branded.png', 'anas_images');
const p9Branded = getBase64Image('p9_branded.png', 'anas_images');
const p10Branded = getBase64Image('p10_branded.png', 'anas_images');
const p11Branded = getBase64Image('p11_branded.png', 'anas_images');
const p12Branded = getBase64Image('p12_branded.png', 'anas_images');
const col1Branded = getBase64Image('col1_branded.png', 'anas_images');
const col2Branded = getBase64Image('col2_branded.png', 'anas_images');
const col3Branded = getBase64Image('col3_branded.png', 'anas_images');
const col4Branded = getBase64Image('col4_branded.png', 'anas_images');

function generateHTML() {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>أبو طيف للضباب والرذاذ - الكتالوج المرجعي الشامل</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800&display=swap');
        
        :root {
          --primary-navy: #042d44;
          --primary-blue: #0d7cc4;
          --primary-light: #e8f4fd;
          --accent-teal: #0fb8a9;
          --accent-gold: #d4a843;
          --text-dark: #1e293b;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --white: #ffffff;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Cairo', sans-serif;
          color: var(--text-dark);
          background-color: #f1f5f9;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        /* A4 Page Formatting for print/PDF */
        .page {
          width: 210mm;
          height: 297mm;
          background-color: var(--white);
          position: relative;
          overflow: hidden;
          page-break-after: always;
          display: flex;
          flex-direction: column;
          padding: 12mm 15mm 12mm 15mm;
          box-sizing: border-box;
        }

        /* Snowflake background watermark */
        .watermark {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(13, 124, 196, 0.02) 0%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }

        /* Header & Footer on A4 pages (excluding cover) */
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 6px;
          margin-bottom: 12px;
          z-index: 1;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-logo img {
          height: 38px;
        }

        .header-logo .brand-en {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .header-logo .brand-ar {
          font-size: 8.5px;
          color: var(--primary-blue);
          font-weight: 700;
          margin-top: -3px;
        }

        .header-title {
          font-size: 10.5px;
          color: var(--text-muted);
          font-weight: 700;
          background-color: var(--primary-light);
          padding: 2px 10px;
          border-radius: 50px;
        }

        .page-footer {
          position: absolute;
          bottom: 8mm;
          left: 15mm;
          right: 15mm;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 6px;
          font-size: 8.5px;
          color: var(--text-muted);
          font-weight: 600;
          z-index: 1;
        }

        .page-footer-right {
          font-family: 'Outfit', sans-serif;
        }

        .page-content {
          flex-grow: 1;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        /* ================= PAGE 1: COVER PAGE ================= */
        .cover-page {
          background: linear-gradient(135deg, #01131a 0%, var(--primary-navy) 50%, #083c5a 100%);
          color: var(--white);
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0;
        }

        .cover-watermark {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(13, 124, 196, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .cover-logo-wrapper {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 25px 40px;
          border-radius: 25px;
          margin-bottom: 30px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .cover-logo {
          height: 120px;
          width: auto;
        }

        .cover-brand-title {
          font-family: 'Outfit', sans-serif;
          font-size: 42px;
          font-weight: 900;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #ffffff 0%, var(--primary-light) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cover-brand-ar {
          font-size: 18px;
          color: var(--accent-teal);
          font-weight: 800;
          margin-top: 5px;
        }

        .cover-divider {
          width: 150px;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent-teal), var(--primary-blue), transparent);
          margin: 25px auto;
          border-radius: 2px;
        }

        .cover-main-title {
          font-size: 30px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.4;
          max-width: 620px;
          margin: 0 auto 15px;
        }

        .cover-subtitle {
          font-size: 15px;
          color: var(--primary-light);
          max-width: 520px;
          margin: 0 auto 50px;
          font-weight: 500;
          opacity: 0.9;
        }

        .cover-footer {
          position: absolute;
          bottom: 20mm;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          width: 100%;
          text-align: center;
          left: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .cover-footer .loc {
          color: var(--white);
          font-weight: 700;
        }

        /* ================= PAGE 2: PRICE INDEX & SERVICES ================= */
        .section-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-right: 4px solid var(--primary-blue);
          padding-right: 10px;
        }

        .section-desc {
          font-size: 10.5px;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        /* Pricing Cards Grid */
        .price-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 15px;
        }

        .price-card {
          background: var(--white);
          border: 1.5px solid var(--border-color);
          border-radius: 12px;
          padding: 12px 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .price-card.featured {
          border-color: var(--accent-gold);
          box-shadow: 0 6px 20px rgba(212, 168, 67, 0.08);
        }

        .price-card.featured::before {
          content: 'الأنظمة الكبيرة';
          position: absolute;
          top: -8px;
          background: var(--accent-gold);
          color: var(--white);
          font-size: 8px;
          font-weight: 800;
          padding: 1px 8px;
          border-radius: 50px;
        }

        .price-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          background-color: var(--primary-light);
          color: var(--primary-blue);
        }

        .price-card.featured .price-icon-wrapper {
          background-color: #fef3c7;
          color: var(--accent-gold);
        }

        .price-icon-wrapper svg {
          width: 18px;
          height: 18px;
          stroke: Math.currentColor;
          fill: none;
          stroke-width: 2;
        }

        .price-card h3 {
          font-size: 12.5px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 4px;
        }

        .price-card .desc {
          font-size: 8.5px;
          color: var(--text-muted);
          line-height: 1.35;
          margin-bottom: 10px;
          height: 34px;
          display: flex;
          align-items: center;
        }

        .price-start-at {
          font-size: 9px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .price-value-box {
          margin-top: 3px;
          background-color: var(--primary-light);
          border: 1px dashed var(--primary-blue);
          padding: 3px 10px;
          border-radius: 8px;
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
        }

        .price-card.featured .price-value-box {
          background-color: #fef3c7;
          border-color: var(--accent-gold);
        }

        .price-val {
          font-family: 'Outfit', sans-serif;
          font-size: 17px;
          font-weight: 900;
          color: var(--primary-navy);
        }

        .price-curr {
          font-size: 8.5px;
          font-weight: 800;
          color: var(--text-muted);
        }

        .price-card.featured .price-val {
          color: var(--accent-gold);
        }

        /* Split Technical Section (Diagram & Price List) */
        .tech-section {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 15px;
          margin-top: 5px;
          flex-grow: 1;
        }

        .tech-diagram-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }

        .tech-diagram-box h4 {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4px;
          margin-bottom: 8px;
        }

        .diagram-img-wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          padding: 4px;
        }

        .diagram-img-wrapper img {
          max-width: 100%;
          max-height: 150px;
          object-fit: contain;
        }

        .tech-prices-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 10px;
        }

        .tech-prices-box h4 {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4px;
          margin-bottom: 6px;
        }

        .part-price-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .part-price-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 8.5px;
          padding-bottom: 3px;
          border-bottom: 1px dotted var(--border-color);
        }

        .part-price-item:last-child {
          border-bottom: none;
        }

        .part-name {
          font-weight: 700;
          color: var(--text-dark);
        }

        .part-price-val {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          color: var(--primary-blue);
          background-color: var(--primary-light);
          padding: 1px 5px;
          border-radius: 3px;
        }

        /* ================= REDESIGNED PRODUCT ROWS ================= */
        .product-row {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.01);
          position: relative;
        }

        .product-row:last-child {
          margin-bottom: 0;
        }

        .product-row.featured {
          border-color: var(--accent-gold);
          background: #fffdf5;
        }

        .prod-img-box {
          width: 55px;
          height: 55px;
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px;
          flex-shrink: 0;
        }

        .prod-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .prod-details {
          flex-grow: 1;
        }

        .prod-title {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .prod-title span.tag {
          font-size: 7.5px;
          background-color: #f1f5f9;
          color: var(--text-muted);
          padding: 1px 4px;
          border-radius: 2px;
          font-weight: 700;
        }

        .product-row.featured .prod-title span.tag {
          background-color: #fef3c7;
          color: var(--accent-gold);
        }

        .prod-desc {
          font-size: 8px;
          color: var(--text-muted);
          margin-top: 1px;
          line-height: 1.3;
        }

        .prod-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 3px;
        }

        .prod-tag {
          font-size: 7.5px;
          background-color: #f1f5f9;
          border: 1px solid var(--border-color);
          color: var(--primary-navy);
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: 700;
        }

        .product-row.featured .prod-tag {
          background-color: #fffbeb;
          border-color: #fef3c7;
        }

        .prod-price-box {
          text-align: left;
          flex-shrink: 0;
        }

        .prod-price-val {
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 900;
          color: var(--accent-gold);
          background-color: #fffbeb;
          border: 1px solid rgba(212, 168, 67, 0.15);
          padding: 2px 7px;
          border-radius: 6px;
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
        }

        .prod-price-curr {
          font-size: 8px;
          font-weight: 800;
          color: var(--accent-gold);
        }

        /* ================= PAGE 4/5/6: OTHER SECTIONS ================= */
        .umbrella-showcase-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          flex-grow: 1;
        }

        .umbrella-card {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 10px rgba(0,0,0,0.01);
        }

        .umb-badge {
          background-color: var(--primary-light);
          color: var(--primary-blue);
          font-size: 10px;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: 50px;
          align-self: flex-start;
          margin-bottom: 8px;
        }

        .umbrella-card h3 {
          font-size: 15px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 10px;
        }

        .umbrella-img-box {
          height: 160px;
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          margin-bottom: 12px;
        }

        .umbrella-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .umbrella-specs-box {
          background-color: #f8fafc;
          border-radius: 10px;
          padding: 10px 12px;
          flex-grow: 1;
        }

        .umbrella-specs-box h4 {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 3px;
          margin-bottom: 5px;
        }

        .umbrella-specs-box ul {
          list-style: none;
        }

        .umbrella-specs-box li {
          font-size: 9.5px;
          color: var(--text-dark);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .umbrella-specs-box li::before {
          content: '✔';
          color: var(--accent-teal);
          font-weight: bold;
          font-size: 8px;
        }

        .column-showcase {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .col-card-large {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .col-card-large h4 {
          font-size: 12px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4px;
          margin-bottom: 8px;
        }

        .col-large-img-box {
          height: 150px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          margin-bottom: 8px;
        }

        .col-large-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .col-card-large p {
          font-size: 9px;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .col-small-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .col-card-small {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .col-small-img-box {
          width: 45px;
          height: 45px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px;
          flex-shrink: 0;
        }

        .col-small-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .col-small-details h4 {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .col-small-details p {
          font-size: 8.5px;
          color: var(--text-muted);
          margin-top: 1px;
          line-height: 1.3;
        }

        .systems-grid-box {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          padding: 12px;
          margin-top: 10px;
        }

        .systems-grid-box h4 {
          font-size: 12px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4px;
          margin-bottom: 8px;
        }

        .systems-items-flex {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .system-flex-item {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sys-flex-img {
          width: 40px;
          height: 40px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          flex-shrink: 0;
        }

        .sys-flex-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .sys-flex-details h5 {
          font-size: 9.5px;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .sys-flex-details p {
          font-size: 8px;
          color: var(--text-muted);
          margin-top: 1px;
        }

        /* ================= PAGE 7: SUCCESS PARTNERS & WARRANTY ================= */
        .partners-section-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 20px 25px;
          margin-bottom: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }

        .partners-section-box h4 {
          font-size: 15px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 8px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .partners-section-box h4 svg {
          width: 18px;
          height: 18px;
          stroke: var(--primary-blue);
          fill: none;
          stroke-width: 2.5;
        }

        /* Centered original logos circular gallery list */
        .partners-gallery-flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 10px;
        }

        .partner-logo-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 85px;
        }

        .partner-logo-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--white);
          border: 1.5px solid var(--border-color);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .partner-logo-circle img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 3px;
        }

        /* Specific logo image paddings if needed to look clean */
        .partner-logo-circle img.padded {
          padding: 7px;
        }

        .partner-logo-name {
          font-size: 10.5px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-top: 6px;
          line-height: 1.2;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .info-box {
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 20px 22px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
        }

        .info-box h4 {
          font-size: 14px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 6px;
        }

        .info-box h4 svg {
          width: 16px;
          height: 16px;
          stroke: var(--primary-blue);
          fill: none;
          stroke-width: 2.5;
        }

        .info-box ul {
          list-style: none;
        }

        .info-box li {
          font-size: 11px;
          color: var(--text-dark);
          margin-bottom: 8px;
          display: flex;
          align-items: flex-start;
          gap: 6px;
          line-height: 1.4;
        }

        .info-box li::before {
          content: '•';
          color: var(--primary-blue);
          font-weight: bold;
          font-size: 14px;
          line-height: 10px;
        }

        .warning-box {
          background: #fff5f5;
          border: 1px solid #fee2e2;
          border-radius: 16px;
          padding: 15px 20px;
          margin-bottom: 25px;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.02);
        }

        .warning-box h4 {
          color: #dc2626;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 6px;
          border-bottom: 1.5px solid #fecaca;
          padding-bottom: 4px;
        }

        .warning-box p {
          font-size: 10.5px;
          color: #991b1b;
          line-height: 1.4;
          font-weight: 500;
        }

        /* Final contact block on page 6 */
        .final-contact-bar {
          background: linear-gradient(135deg, var(--primary-navy) 0%, #0d7cc4 100%);
          border-radius: 16px;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(13, 124, 196, 0.15);
        }

        .final-text-side {
          display: flex;
          flex-direction: column;
        }

        .final-label {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
        }

        .final-main {
          font-size: 14px;
          font-weight: 800;
          margin-top: 2px;
        }

        .final-phone-badge {
          background: #25d366;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 800;
          padding: 6px 16px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2);
        }

        .final-phone-badge svg {
          fill: currentColor;
          width: 16px;
          height: 16px;
        }
      </style>
    </head>
    <body>
      
      <!-- ================= PAGE 1: COVER ================= -->
      <div class="page cover-page">
        <div class="cover-watermark"></div>
        
        <div class="cover-logo-wrapper">
          <img class="cover-logo" src="${logoBase64}" alt="Logo">
          <div class="cover-brand-title">Silent Fog</div>
          <div class="cover-brand-ar">أبو طيف للضباب والرذاذ</div>
        </div>

        <div class="cover-divider"></div>

        <h1 class="cover-main-title">الكتالوج والدليل المرجعي الشامل للباقات والحلول المتكاملة</h1>
        <p class="cover-subtitle">أنظمة الضباب والرذاذ المبتكرة وأعمدة الديكور والإنارة الخارجية والمظلات</p>

        <div class="cover-footer">
          <span class="loc">📍 المقر الرئيسي: تبوك - نخدم جميع مناطق المملكة 🇸🇦</span>
          <span>الهاتف الموحد والواتساب: 0559152818 | تيك توك: @silentfog3</span>
          <span>إصدار دليل الباقات لعام 2026م</span>
        </div>
      </div>

      <!-- ================= PAGE 2: PRICE INDEX & SERVICES ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">أقسام الخدمة والأسعار التقديرية</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">تبريد الأجواء المفتوحة وتأسيس الأنظمة</h2>
          <p class="section-desc">
            نحن في <strong>Silent Fog (أبو طيف)</strong> متخصصون في تأسيس وتوريد وتركيب أحدث أنظمة الضباب والرذاذ المبتكرة للحدائق، الجلسات الخارجية، الفلل، القصور، الاستراحات، المقاهي، والمطاعم. نوفر قطع غيار أصلية ومعدات مستوردة من تايوان وإيطاليا تضمن الأداء الأهدأ والعمر الافتراضي الأطول لشبكتك.
          </p>

          <div class="price-grid">
            
            <!-- Price 1: Mist -->
            <div class="price-card">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3>أنظمة الرذاذ المطور</h3>
              <p class="desc">حلول اقتصادية متطورة للجلسات والمساحات المنزلية، هدوء تام في التشغيل واستهلاك منخفض.</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">799</span>
                <span class="price-curr">ريال سعودي</span>
              </div>
            </div>

            <!-- Price 2: Fog -->
            <div class="price-card featured">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
              <h3>أنظمة الضباب الاحترافية</h3>
              <p class="desc">تأسيس شبكات ضباب ضغط عالي متكاملة بمضخات تايوانية وإيطالية وصينية للمساحات الواسعة.</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">4,999</span>
                <span class="price-curr">ريال سعودي</span>
              </div>
            </div>

            <!-- Price 3: Columns -->
            <div class="price-card">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M8 3v18M16 3v18M3 8h18M3 16h18"/></svg>
              </div>
              <h3>أعمدة الضباب والباكجات</h3>
              <p class="desc">أعمدة ضباب ديكورية حديدية وستانلس ستيل، بالإضافة لباكجات المراوح المتطورة لجميع الأجواء.</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">5,499</span>
                <span class="price-curr">ريال سعودي</span>
              </div>
            </div>

          </div>

          <!-- Split Tech details -->
          <div class="tech-section">
            
            <div class="tech-diagram-box">
              <h4>🔍 المخطط التشريحي للمضخة الإيطالية</h4>
              <div class="diagram-img-wrapper">
                <img src="${pumpDiagramBase64}" alt="Pump Diagram">
              </div>
            </div>

            <div class="tech-prices-box">
              <h4>⚙️ قائمة أسعار القطع والمعدات الفردية</h4>
              <div class="part-price-list">
                <div class="part-price-item"><span class="part-name">ماكينة ضباب - صيني (25 بخاخ)</span><span class="part-price-val">4999 ريال</span></div>
                <div class="part-price-item"><span class="part-name">ماكينة ضباب - تايواني (35 بخاخ)</span><span class="part-price-val">5499 ريال</span></div>
                <div class="part-price-item"><span class="part-name">ماكينة ضباب - إيطالي (25 بخاخ)</span><span class="part-price-val">6499 ريال</span></div>
                <div class="part-price-item"><span class="part-name">نازل (بخاخ) ثلاثي نجمة سقفي</span><span class="part-price-val">250 ريال</span></div>
                <div class="part-price-item"><span class="part-name">رأس بخاخ ثلاثي / سداسي</span><span class="part-price-val">45 / 55 ريال</span></div>
                <div class="part-price-item"><span class="part-name">لفة لي (هوز) 50 متر تايواني</span><span class="part-price-val">450 ريال</span></div>
                <div class="part-price-item"><span class="part-name">أعمدة ضباب ديكورية حديدية (حبة)</span><span class="part-price-val">1200 ريال</span></div>
                <div class="part-price-item"><span class="part-name">مواسير ستيل (طول 1 متر)</span><span class="part-price-val">450 ريال</span></div>
                <div class="part-price-item"><span class="part-name">أعمال التركيب الفني وتأسيس النظام بالكامل</span><span class="part-price-val">1500 ريال</span></div>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 2 من 8</span>
        </div>
      </div>

      <!-- ================= PAGE 3: MIST SYSTEMS ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">أجهزة الرذاذ المطور للمساحات المنزلية</span>
        </div>

        <div class="page-content">
          <h2 class="section-title" style="margin-bottom: 6px;">أجهزة الرذاذ المطور الهادئة</h2>
          <p class="section-desc" style="margin-bottom: 8px;">
            نظام تبريد بالرذاذ المطور مصمم لخفض درجات الحرارة في المساحات المتوسطة والصغيرة مع تشغيل هادئ واقتصادي للغاية:
          </p>

          <div class="product-rows-container">
            
            <!-- Mist 20 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p3Branded}" alt="p3"></div>
              <div class="prod-details">
                <div class="prod-title">جهاز رذاذ مطور (20 رأس) <span class="tag">تغطية 25 متر</span></div>
                <p class="prod-desc">الحل الاقتصادي المثالي للمظلات الصغيرة والجلسات الخارجية المحدودة. تشغيل صامت وكفاءة ممتازة.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة رذاذ مطورة</span>
                  <span class="prod-tag">20 نوزل نحاسي</span>
                  <span class="prod-tag">لي كبس 25 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">799 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Mist 30 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p4Branded}" alt="p4"></div>
              <div class="prod-details">
                <div class="prod-title">جهاز رذاذ مطور (30 رأس) <span class="tag">تغطية 40 متر</span></div>
                <p class="prod-desc">مناسب للحدائق والجلسات العائلية المتوسطة. يوفر توزيعاً ممتازاً للرذاذ لتلطيف مثالي للأجواء.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة رذاذ مطورة</span>
                  <span class="prod-tag">30 نوزل نحاسي</span>
                  <span class="prod-tag">لي كبس 40 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">899 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Mist 40 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p2Branded}" alt="p2"></div>
              <div class="prod-details">
                <div class="prod-title">جهاز رذاذ مطور (40 رأس) <span class="tag">تغطية 50 متر</span></div>
                <p class="prod-desc">قوة تشغيلية ممتازة ومثالية للمساحات الكبيرة المفتوحة والممرات والحدائق الفسيحة.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة 1/4 حصان مطورة</span>
                  <span class="prod-tag">40 نوزل نحاسي</span>
                  <span class="prod-tag">لي كبس 50 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">1,299 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Mist 60 -->
            <div class="product-row featured">
              <div class="prod-img-box"><img src="${p1Branded}" alt="p1"></div>
              <div class="prod-details">
                <div class="prod-title">جهاز رذاذ مطور (60 رأس) <span class="tag">تغطية 75 متر</span></div>
                <p class="prod-desc">النظام الأقوى والأضخم في فئة الرذاذ المطور. تبريد كثيف وشامل للمساحات المنزلية الكبيرة والاستراحات.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة رذاذ VIP قوية</span>
                  <span class="prod-tag">60 نوزل نحاسي</span>
                  <span class="prod-tag">لي كبس 75 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">1,899 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 3 من 8</span>
        </div>
      </div>

      <!-- ================= PAGE 4: FOG SYSTEMS ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">أجهزة الضباب المتكاملة - ضغط عالي</span>
        </div>

        <div class="page-content">
          <h2 class="section-title" style="margin-bottom: 6px;">أجهزة الضباب الاحترافية المتكاملة</h2>
          <p class="section-desc" style="margin-bottom: 8px;">
            أنظمة ضباب ضغط عالي (High Pressure Fog) مستوردة لتبريد الأماكن التجارية المفتوحة والفلل والقصور دون إحداث بلل:
          </p>

          <div class="product-rows-container">
            
            <!-- Fog Chinese 25 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p5Branded}" alt="p5"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب صيني متكامل (25 فوهة) <span class="tag">تغطية 35 متر</span></div>
                <p class="prod-desc">نظام متكامل واقتصادي بمضخة ضغط عالي صينية. مناسب للاستراحات والحدائق وتأسيس نظام الضباب.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة ضغط عالي صينية</span>
                  <span class="prod-tag">25 نوزل ستانلس ستيل</span>
                  <span class="prod-tag">لي هوز ضباب 35 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">4,999 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fog Taiwan 35 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p8Branded}" alt="p8"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب تايواني متكامل (35 فوهة) <span class="tag">تغطية 50 متر</span></div>
                <p class="prod-desc">مضخة ضباب تايوانية عالية الكفاءة والهدوء. توزيع متوازن للضباب مجهري الحجم لتبريد فائق الانتعاش.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة تايوانية 1 حصان</span>
                  <span class="prod-tag">35 نوزل ستانلس</span>
                  <span class="prod-tag">لي هوز ضباب 50 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">5,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fog Italian 25 -->
            <div class="product-row featured">
              <div class="prod-img-box"><img src="${p6Branded}" alt="p6"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب إيطالي متكامل (25 فوهة) <span class="tag">تغطية 35 متر</span></div>
                <p class="prod-desc">النظام الأكثر هدوءاً وفخامة بمضخة إيطالية أصلية. مناسب للمقاهي الراقية والفلل الفخمة التي تتطلب هدوءاً تاماً.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة FWP-IT إيطالية صامتة</span>
                  <span class="prod-tag">25 نوزل إيطالي ستانلس</span>
                  <span class="prod-tag">لي هوز إيطالي 35 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">6,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fog Taiwan 60 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p7Branded}" alt="p7"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب تايواني متكامل (60 فوهة) <span class="tag">تغطية 80 متر</span></div>
                <p class="prod-desc">قوة هيدروليكية فائقة التغطية للأماكن التجارية الكبيرة، المطاعم المفتوحة، والمشاريع الواسعة جداً.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة تايوانية ضغط عالي جداً</span>
                  <span class="prod-tag">60 نوزل ستانلس</span>
                  <span class="prod-tag">لي هوز ضباب 80 متر</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">7,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 4 من 8</span>
        </div>
      </div>

      <!-- ================= PAGE 5: PACKAGES ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">باكجات المراوح وأعمدة الضباب الحديدية</span>
        </div>

        <div class="page-content">
          <h2 class="section-title" style="margin-bottom: 6px;">باكجات التبريد المتكاملة</h2>
          <p class="section-desc" style="margin-bottom: 8px;">
            باكجات مجهزة بقطع ومعدات ومضخات متوافقة لتوزيع الهواء وتدفق الرذاذ والضباب، مصممة للمشاريع والجلسات المميزة:
          </p>

          <div class="product-rows-container">
            
            <!-- Fans Package 24 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p10Branded}" alt="p10"></div>
              <div class="prod-details">
                <div class="prod-title">باكج مروحتين رذاذ 24 إنش + مضخة <span class="tag">تبريد هواء + رذاذ</span></div>
                <p class="prod-desc">مروحتان رذاذ مع مضخة رذاذ مطورة وتمديدات لتدفق هواء مبرد في الاستراحات والحدائق والمقاهي المفتوحة.</p>
                <div class="prod-tags">
                  <span class="prod-tag">2 مروحة 24 بوصة</span>
                  <span class="prod-tag">16 فوهة رذاذ</span>
                  <span class="prod-tag">مضخة رذاذ ملائمة</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">5,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fans Package 20 Fog -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p9Branded}" alt="p9"></div>
              <div class="prod-details">
                <div class="prod-title">باكج مروحتين ضباب 20 إنش + مضخة 40 بار <span class="tag">تبريد هواء + ضباب</span></div>
                <p class="prod-desc">أقوى باكج لدمج تبريد المروحة الدائرية مع ضباب عالي الضغط لتغطية شاملة ومثالية للمقاهي والقصور.</p>
                <div class="prod-tags">
                  <span class="prod-tag">2 مروحة 20 بوصة</span>
                  <span class="prod-tag">10 فوهات ضباب دقيقة</span>
                  <span class="prod-tag">مضخة ضباب 40 بار</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">10,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Columns 2 Package -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p12Branded}" alt="p12"></div>
              <div class="prod-details">
                <div class="prod-title">باكج عمودين ضباب حديد + مضخة 40 بار <span class="tag">تغطية 25 متر مربع</span></div>
                <p class="prod-desc">عمودان حديد ديكوريان فاخران لتبريد الممرات والحدائق ودمج أنظمة الضباب مع التصاميم الجمالية.</p>
                <div class="prod-tags">
                  <span class="prod-tag">2 عمود حديد للضباب</span>
                  <span class="prod-tag">24 فوهة ضباب ستانلس</span>
                  <span class="prod-tag">مضخة ضباب 40 بار</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">7,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Columns 4 Package -->
            <div class="product-row featured">
              <div class="prod-img-box"><img src="${p11Branded}" alt="p11"></div>
              <div class="prod-details">
                <div class="prod-title">باكج 4 أعمدة ضباب حديد + مضخة 70 بار <span class="tag">تغطية 45 متر مربع</span></div>
                <p class="prod-desc">الباكج الديكوري التجاري الأقوى، يضم 4 أعمدة حديد فاخرة مع مضخة 70 بار قوية لتغطية المقاهي الواسعة.</p>
                <div class="prod-tags">
                  <span class="prod-tag">4 أعمدة حديد للضباب</span>
                  <span class="prod-tag">45 فوهة ضباب ستانلس</span>
                  <span class="prod-tag">مضخة ضباب 70 بار</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">9,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 5 من 8</span>
        </div>
      </div>

      <!-- ================= PAGE 6: SINGLE COLUMNS ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">أعمدة الضباب المنفردة والديكورية</span>
        </div>

        <div class="page-content">
          <h2 class="section-title" style="margin-bottom: 6px;">أعمدة الضباب المنفردة</h2>
          <p class="section-desc" style="margin-bottom: 8px;">
            تشكيلة فاخرة من أعمدة الضباب المصممة من الحديد المقاوم للصدأ ومجهزة بنظام إضاءة LED مدمج لتبريد وتزيين الممرات والحدائق:
          </p>

          <div class="product-rows-container">
            
            <!-- Column 1 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${col4Branded}" alt="col4"></div>
              <div class="prod-details">
                <div class="prod-title">عامود ضباب حديد مربع أسود (12 فوهة) <span class="tag">حديدي اقتصادي</span></div>
                <p class="prod-desc">بطول 2 متر — هيكل مربع متين بتوصيلات داخلية مدمجة يوفر تبريدًا متناسقًا وأداءً طويلاً في الممرات والجلسات.</p>
                <div class="prod-tags">
                  <span class="prod-tag">بطول 2 متر</span>
                  <span class="prod-tag">12 فوهة ضباب ستانلس</span>
                  <span class="prod-tag">حديد مربع أسود</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">1,450 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Column 2 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${col3Branded}" alt="col3"></div>
              <div class="prod-details">
                <div class="prod-title">عامود ضباب مزود بإنارة ليد مربع (12 فوهة) <span class="tag">مضيء مميز</span></div>
                <p class="prod-desc">عمود حديد مربع يجمع بين روعة إضاءة الـ LED المدمجة وتبريد الضباب الكثيف لتصميم ليلي فخم وساحر.</p>
                <div class="prod-tags">
                  <span class="prod-tag">إنارة ليد مدمجة</span>
                  <span class="prod-tag">12 فوهة ضباب ستانلس</span>
                  <span class="prod-tag">حديد مربع أسود</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">1,900 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Column 3 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${col1Branded}" alt="col1"></div>
              <div class="prod-details">
                <div class="prod-title">عامود ضباب مزود بإنارة ليد دائري (16 فوهة) <span class="tag">مضيء احترافي</span></div>
                <p class="prod-desc">تغطية واسعة بـ 16 نزل مع إضاءة LED مدمجة تضفي جمالاً ساحراً وتبريداً ممتازاً للممرات والمقاهي.</p>
                <div class="prod-tags">
                  <span class="prod-tag">إنارة ليد مدمجة</span>
                  <span class="prod-tag">16 فوهة ضباب ستانلس</span>
                  <span class="prod-tag">حديد دائري أسود</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">2,199 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Column 4 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${col2Branded}" alt="col2"></div>
              <div class="prod-details">
                <div class="prod-title">عامود ضباب حديد مزود بإنارة (6 فوهات) <span class="tag">مضيء كلاسيكي</span></div>
                <p class="prod-desc">بطول 2 متر — عمود كلاسيكي دائري يجمع التبريد اللطيف بإنارة مدمجة جذابة تناسب الفلل والاستراحات.</p>
                <div class="prod-tags">
                  <span class="prod-tag">بطول 2 متر</span>
                  <span class="prod-tag">6 فوهات ضباب رذاذية</span>
                  <span class="prod-tag">إنارة كلاسيكية مدمجة</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">2,300 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 6 من 8</span>
        </div>
      </div>

      <!-- ================= PAGE 7: UMBRELLAS SECTION ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">المظلات الخارجية والديكورية المبتكرة</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">مظلات تبريد الأماكن المفتوحة وتخصيص اللوقو</h2>
          <p class="section-desc" style="margin-bottom: 12px;">
            نوفر تشكيلة فريدة ومتميزة من المظلات الخارجية الفاخرة المقاومة للعوامل الجوية وتتحمل أشعة الشمس الشديدة، مع تمديدات مدمجة وذكية لفوهات الرذاذ لخفض درجات الحرارة لغاية 15 درجة مئوية، ودعم طباعة لوقو محلك الخاص لجاذبية تسويقية واحترافية فائقة:
          </p>

          <div class="umbrella-showcase-grid">
            
            <!-- Umbrella 1 -->
            <div class="umbrella-card">
              <span class="umb-badge">دائرية مستقلة</span>
              <h3>نموذج المظلة الدائرية المستقلة</h3>
              <div class="umbrella-img-box">
                <img src="${roundUmbrellaBase64}" alt="Round Umbrella">
              </div>
              <div class="umbrella-specs-box">
                <h4>المواصفات الفنية للنموذج:</h4>
                <ul>
                  <li><strong>المقاس والقطر:</strong> قطر 300 سم، الارتفاع 260 سم.</li>
                  <li><strong>الوزن الإجمالي:</strong> 25 - 28 كجم (ثبات ممتاز).</li>
                  <li><strong>القماش والمعالجة:</strong> بوليستر سميك مقاوم للحرارة والماء.</li>
                  <li><strong>التصميم والميزة:</strong> فتحة تهوية علوية، هيكل ألومنيوم مطلي بالبودرة.</li>
                  <li><strong>تخصيص اللوقو:</strong> طباعة شعار العميل بـ 4 اتجاهات في قمة المظلة.</li>
                </ul>
              </div>
            </div>

            <!-- Umbrella 2 -->
            <div class="umbrella-card">
              <span class="umb-badge">هرمية ثقيلة (Heavy Duty)</span>
              <h3>نموذج المظلة الهرمية الكبيرة</h3>
              <div class="umbrella-img-box">
                <img src="${pyramidalUmbrellaBase64}" alt="Pyramidal Umbrella">
              </div>
              <div class="umbrella-specs-box">
                <h4>المواصفات الفنية للنموذج:</h4>
                <ul>
                  <li><strong>المقاسات المتاحة:</strong> 240×330 سم أو 300×400 سم.</li>
                  <li><strong>الوزن الإجمالي:</strong> 35 - 40 كجم (ثبات فائق ضد الرياح).</li>
                  <li><strong>الألوان المتاحة:</strong> أسود، بيج، أحمر قاني، زيتي، أزرق بحري.</li>
                  <li><strong>الهيكل والقاعدة:</strong> ألومنيوم مقوى مع قاعدة حديد ثقيل.</li>
                  <li><strong>الميزة:</strong> فتحة تهوية مزدوجة، قابلة للطي والحركة بمرونة.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 7 من 8</span>
        </div>
      </div>

      <!-- ================= PAGE 7: SUCCESS PARTNERS & WARRANTY ================= -->
      <div class="page">
        <div class="watermark"></div>
        
        <div class="page-header">
          <div class="header-logo">
            <img src="${logoBase64}" alt="Logo">
            <div class="brand-text">
              <span class="brand-en">Silent Fog</span>
              <span class="brand-ar">أبو طيف للضباب والرذاذ</span>
            </div>
          </div>
          <span class="header-title">شركاء النجاح وشروط الضمان المعتمد</span>
        </div>

        <div class="page-content">
          
          <!-- Success Partners -->
          <div class="partners-section-box">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              شركاء النجاح - بعض المحلات والمنشآت التي تفخر بخدمتها
            </h4>
            <div class="partners-gallery-flex">
              
              <!-- 1. Address Cafe -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoAddressCafeBase64}" alt="Address Cafe">
                </div>
                <span class="partner-logo-name">عنوان القهوة</span>
              </div>

              <!-- 2. UNIT Coffee -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoUnitCoffeeBase64}" alt="UNIT Coffee">
                </div>
                <span class="partner-logo-name">يونت كوفي</span>
              </div>

              <!-- 3. Tea & Cake -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoTeaCakeBase64}" alt="Tea & Cake">
                </div>
                <span class="partner-logo-name">شاي وكعك</span>
              </div>

              <!-- 4. Raha Coffee -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoRahaCoffeeBase64}" alt="Raha Coffee">
                </div>
                <span class="partner-logo-name">رحى كافيه</span>
              </div>

              <!-- 5. Botticelli -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoBotticelliBase64}" alt="Botticelli">
                </div>
                <span class="partner-logo-name">بوتشيلي</span>
              </div>

              <!-- 6. Rose Al Masyaf Complex -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img class="padded" src="${logoRoseMasyafBase64}" alt="Rose Al Masyaf">
                </div>
                <span class="partner-logo-name">روز المصيف</span>
              </div>

              <!-- 7. Al Tarhib Hotel -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoTarhibHotelBase64}" alt="Al Tarhib Hotel">
                </div>
                <span class="partner-logo-name">فندق الترحيب</span>
              </div>

              <!-- 8. 8oz Coffee -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoEightOzBase64}" alt="8oz Coffee">
                </div>
                <span class="partner-logo-name">8oz Coffee</span>
              </div>

              <!-- 9. Tea & Sesame -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoTeaSesameBase64}" alt="Tea & Sesame">
                </div>
                <span class="partner-logo-name">شاي وسمسم</span>
              </div>

              <!-- 10. Dopamine -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoDopamineBase64}" alt="Dopamine">
                </div>
                <span class="partner-logo-name">دوبامين</span>
              </div>

              <!-- 11. Arabia -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoArabiaBase64}" alt="Arabia">
                </div>
                <span class="partner-logo-name">أرابيا</span>
              </div>

            </div>
          </div>

          <!-- Warranty & Maintenance -->
          <div class="info-grid">
            
            <div class="info-box">
              <h4>
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                شروط الضمان المعتمد (سنتين)
              </h4>
              <ul>
                <li>ضمان لمدة سنتين كاملتين على المضخة من العيوب المصنعية (ماعدا النوزل وسوء الاستخدام).</li>
                <li><strong>السنة الأولى:</strong> ضمان شامل لقطع الغيار وأجور يد الصيانة مجاناً بالكامل.</li>
                <li><strong>السنة الثانية:</strong> العميل يتكفل بقيمة قطع الغيار فقط، وأجور يد الفني مجاناً تماماً.</li>
              </ul>
            </div>

            <div class="info-box">
              <h4>
                <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                إرشادات الصيانة الدورية الهامة
              </h4>
              <ul>
                <li>تغيير أو تنظيف فلتر مدخل المياه دورياً فور اتساخه لحماية الماكينة والنوزلات.</li>
                <li>تغيير زيت المضخة بشكل دوري كل 1000 ساعة عمل أو كل 6 أشهر لضمان سلامة البساتم.</li>
                <li>تسليك فوهات النوزلات فور انسداد أكثر من 20% لضمان ضغط تبريد منسجم ومتوازن.</li>
              </ul>
            </div>

          </div>

          <!-- Warnings -->
          <div class="warning-box">
            <h4>⚠️ تنبيهات سوء الاستخدام ومسببات الخروج عن الضمان:</h4>
            <p>
              عدم إجراء الصيانة الدورية الموصى بها • تشغيل الماكينة دون ماء أو زيت أو تدفق سليم • تشغيل المضخة مع وجود تسريبات في شبكة التمديدات • رفع ضغط التشغيل للماكينة عن الحد الأقصى المسموح به • وضع المضخة في أماكن ضيقة مكتومة غير مهواة أو أماكن عرضة للغمر المباشر بالسيول أو مياه الأمطار.
            </p>
          </div>

          <!-- CTA final bar -->
          <div class="final-contact-bar">
            <div class="final-text-side">
              <span class="final-label">نسعد بخدمتكم وتوفير أفضل حلول التبريد والجمال لمواقعكم 🇸🇦</span>
              <span class="final-main">📞 للطلب والاستفسار تواصل معنا الآن مباشرة:</span>
            </div>
            <div class="final-phone-badge">
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>0559152818</span>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 8 من 8</span>
        </div>
      </div>

    </body>
    </html>
  `;
}

// Generate the PDF brochure catalog
async function main() {
  console.log('🚀 Starting Overwritten 8-Page PDF Catalog Generation...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const htmlContent = generateHTML();
  await page.setContent(htmlContent, { waitUntil: 'load' });
  // Wait a brief moment to ensure fonts are fully rendered
  await new Promise(r => setTimeout(r, 1200));

  const outputDir = path.join(__dirname, 'images');
  const artifactsDir = 'C:\\Users\\t\\.gemini\\antigravity\\brain\\4ac733a0-c12b-413f-862e-707610cfd557';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const localPDFPath = path.join(__dirname, 'images', 'silent_fog_catalog.pdf');
  const brainPDFPath = path.join(artifactsDir, 'silent_fog_catalog.pdf');

  console.log('📸 Rendering 8 A4 Pages into PDF...');
  
  await page.pdf({
    path: localPDFPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  // Copy to brain artifacts directory so user can view immediately
  try {
    fs.copyFileSync(localPDFPath, brainPDFPath);
    console.log(`✅ Saved expanded 8-page catalog PDF to website images and artifacts brain!`);
  } catch (err) {
    console.error(`[Error] Failed to copy to artifacts:`, err.message);
  }

  await browser.close();
  console.log('🎉 8-Page PDF Catalog generated successfully!');
}

main().catch(err => {
  console.error('❌ PDF Generation failed:', err);
  process.exit(1);
});
