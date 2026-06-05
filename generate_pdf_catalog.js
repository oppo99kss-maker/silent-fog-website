const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Helper to convert local images to Base64 data URIs
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

// Success partner original logos
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

// Columns
const col1Branded = getBase64Image('col1_branded.png', 'anas_images');
const col2Branded = getBase64Image('col2_branded.png', 'anas_images');
const col3Branded = getBase64Image('col3_branded.png', 'anas_images');
const col4Branded = getBase64Image('col4_branded.png', 'anas_images');
const col5Branded = getBase64Image('col5_branded.png', 'anas_images');
const col6Branded = getBase64Image('col6_branded.png', 'anas_images');
const col7Branded = getBase64Image('col7_branded.png', 'anas_images');
const col8Branded = getBase64Image('col8_branded.png', 'anas_images');
const col9Branded = getBase64Image('col9_branded.png', 'anas_images');
const col10Branded = getBase64Image('col10_branded.png', 'anas_images');
const col11Branded = getBase64Image('col11_branded.png', 'anas_images');

// Accessories
const acc1Branded = getBase64Image('acc1_branded.png', 'anas_images');
const acc2Branded = getBase64Image('acc2_branded.png', 'anas_images');
const acc3Branded = getBase64Image('acc3_branded.png', 'anas_images');
const acc4Branded = getBase64Image('acc4_branded.png', 'anas_images');
const acc5Branded = getBase64Image('acc5_branded.png', 'anas_images');
const acc6Branded = getBase64Image('acc6_branded.png', 'anas_images');
const acc7Branded = getBase64Image('acc7_branded.png', 'anas_images');
const acc8Branded = getBase64Image('acc8_branded.png', 'anas_images');
const acc9Branded = getBase64Image('acc9_branded.png', 'anas_images');
const acc10Branded = getBase64Image('acc10_branded.png', 'anas_images');
const acc11Branded = getBase64Image('acc11_branded.png', 'anas_images');
const acc12Branded = getBase64Image('acc12_branded.png', 'anas_images');
const acc13Branded = getBase64Image('acc13_branded.png', 'anas_images');

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

        .watermark {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(13, 124, 196, 0.02) 0%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }

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

        /* ================= SECTIONS & PRODUCTS ================= */
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

        /* Compact Grid Layout for Columns & Accessories */
        .pdf-grid-compact {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 5px;
        }

        .pdf-compact-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.01);
        }

        .pdf-compact-img-box {
          width: 75px;
          height: 75px;
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 4px;
        }

        .pdf-compact-img-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .pdf-compact-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .pdf-compact-title {
          font-size: 10.5px;
          font-weight: 800;
          color: var(--primary-navy);
          line-height: 1.35;
        }

        .pdf-compact-desc {
          font-size: 8px;
          color: var(--text-muted);
          line-height: 1.3;
          margin-top: 3px;
        }

        .pdf-compact-price {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 900;
          color: var(--accent-gold);
          background-color: #fffbeb;
          border: 1.5px solid rgba(212,168,67,0.15);
          padding: 1px 7px;
          border-radius: 4px;
          display: inline-block;
          margin-top: 6px;
          align-self: flex-start;
        }

        /* Detailed Product Rows */
        .product-rows-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .product-row {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
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
          border: 1px solid rgba(212,168,67,0.15);
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

        /* Umbrellas & Technical Index Styles */
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

        /* Partners & Warranty */
        .partners-section-box {
          background-color: #f8fafc;
          border: 1.5px solid var(--border-color);
          border-radius: 16px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .partners-section-box h4 {
          font-size: 13px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 8px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .partners-section-box h4 svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: var(--primary-blue);
          stroke-width: 2;
        }

        .partners-gallery-flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px 22px;
        }

        .partner-logo-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 75px;
        }

        .partner-logo-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .partner-logo-circle img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 50%;
        }

        .partner-name {
          font-size: 9px;
          font-weight: 800;
          color: var(--text-dark);
          text-align: center;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

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

        .warranty-section-box {
          background: #ffffff;
          border: 1.5px solid var(--border-color);
          border-radius: 16px;
          padding: 15px;
        }

        .warranty-section-box h4 {
          font-size: 13px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 8px;
          margin-bottom: 10px;
        }

        .warranty-layout-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 15px;
        }

        .warranty-card {
          background-color: #f8fafc;
          border-radius: 12px;
          padding: 12px;
          border: 1px solid var(--border-color);
        }

        .warranty-card h5 {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-blue);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .warranty-card ul {
          list-style: none;
        }

        .warranty-card li {
          font-size: 9px;
          color: var(--text-dark);
          margin-bottom: 4px;
          line-height: 1.4;
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }

        .warranty-card li::before {
          content: '•';
          color: var(--primary-blue);
          font-weight: bold;
        }

        .warranty-card.warning h5 {
          color: #ef4444;
        }

        .warranty-card.warning li::before {
          content: '✕';
          color: #ef4444;
          font-size: 8px;
          margin-top: 2px;
        }

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
          stroke: currentColor;
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
      </style>
    </head>
    <body>

      <!-- ================= PAGE 1: COVER PAGE ================= -->
      <div class="page cover-page">
        <div class="cover-watermark"></div>
        <div class="cover-logo-wrapper">
          <img class="cover-logo" src="${logoBase64}" alt="Silent Fog Logo">
          <h1 class="cover-brand-title">Silent Fog</h1>
          <span class="cover-brand-ar">أبو طيف للضباب والرذاذ</span>
        </div>
        <div class="cover-divider"></div>
        <h2 class="cover-main-title">كتالوج الأجهزة والأنظمة والباقات المعتمد</h2>
        <p class="cover-subtitle">دليل مواصفات وأسعار أنظمة الضباب والرذاذ المطور والأعمدة الديكورية</p>
        <div class="cover-footer">
          <span class="loc">المملكة العربية السعودية</span>
          <span>الكتالوج المرجعي الموحد للمبيعات والمشاريع — إصدار 2026</span>
        </div>
      </div>

      <!-- ================= PAGE 2: PRICE INDEX & DIAGRAM ================= -->
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
          <span class="header-title">فئات الأسعار والتصميم الهندسي</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">دليل تسعير الفئات الرئيسية للأجهزة</h2>
          <p class="section-desc">إليك نظرة سريعة على متوسط أسعار التأسيس والأنظمة حسب الفئة ومجال التغطية لتحديد الميزانية المناسبة لمشروعك:</p>

          <div class="price-grid">
            <div class="price-card">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3>الرذاذ المنزلي</h3>
              <p class="desc">أنظمة رذاذ منخفضة الضغط مثالية للممرات والمظلات والجلسات المنزلية الصغيرة</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">199</span>
                <span class="price-curr">ريال</span>
              </div>
            </div>

            <div class="price-card featured">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>الضباب التجاري</h3>
              <p class="desc">أنظمة ضباب ضغط عالي متكاملة للمقاهي والمساحات الخارجية الواسعة والفلل الفاخرة</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">4,999</span>
                <span class="price-curr">ريال</span>
              </div>
            </div>

            <div class="price-card">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <h3>الباقات المتكاملة</h3>
              <p class="desc">باقات جاهزة تدمج مضخات الضباب مع المراوح أو الأعمدة الديكورية الفاخرة</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">5,499</span>
                <span class="price-curr">ريال</span>
              </div>
            </div>
          </div>

          <div class="tech-section">
            <div class="tech-diagram-box">
              <h4>الهيكل الفني وتوزيع الشبكة</h4>
              <div class="diagram-img-wrapper">
                <img src="${pumpDiagramBase64}" alt="Technical Pump Diagram">
              </div>
            </div>

            <div class="tech-prices-box">
              <h4>قائمة أسعار الإكسسوارات الفردية وقطع الغيار</h4>
              <div class="part-price-list">
                <div class="part-price-item"><span class="part-name">ماسورة ستانلس ستيل 304 قياس 3/8 بوصة</span><span class="part-price-val">80 ريال</span></div>
                <div class="part-price-item"><span class="part-name">فوهة ضباب (نوزل) ستانلس ستيل مضاد للبلل</span><span class="part-price-val">15 ريال</span></div>
                <div class="part-price-item"><span class="part-name">قسام نحاس ثنائي / ثلاثي سليب لوك</span><span class="part-price-val">25 ريال</span></div>
                <div class="part-price-item"><span class="part-name">فلتر مياه قطني صغير لتنقية الشوائب</span><span class="part-price-val">35 ريال</span></div>
                <div class="part-price-item"><span class="part-name">فلتر تنقية مياه جامبو للمشاريع الكبيرة</span><span class="part-price-val">180 ريال</span></div>
                <div class="part-price-item"><span class="part-name">لي هوز ضباب نايلون تايواني (متر طولي)</span><span class="part-price-val">10 ريال</span></div>
                <div class="part-price-item"><span class="part-name">زيت مضخة ضباب ضغط عالي مخصص (1 لتر)</span><span class="part-price-val">90 ريال</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 2 من 11</span>
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
          <span class="header-title">أجهزة الرذاذ المنزلي المطور</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">فئة أجهزة الرذاذ المنزلي (منخفض الضغط)</h2>
          <p class="section-desc">أجهزة رذاذ منزلية هادئة واقتصادية لتبريد الجلسات العائلية الصغيرة والممرات والمظلات بأسعار في متناول الجميع:</p>

          <div class="product-rows-container">
            
            <!-- Mist 20 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p3Branded}" alt="p3"></div>
              <div class="prod-details">
                <div class="prod-title">جهاز رذاذ مطور (20 رأس) <span class="tag">تغطية 25 متر</span></div>
                <p class="prod-desc">نظام منزلي ممتاز لتبريد الجلسات الصغيرة والمظلات المنزلية بضغط خفيف وهدوء كامل.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة رذاذ مطورة</span>
                  <span class="prod-tag">20 فوهة نحاسية</span>
                  <span class="prod-tag">لي خرطوم 25م</span>
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
                <p class="prod-desc">مثالي للحدائق المنزلية المتوسطة والمظلات، تبريد طبيعي ناعم وجلستي صيف هادئة.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة تشغيل متوسطة</span>
                  <span class="prod-tag">30 فوهة نحاسية</span>
                  <span class="prod-tag">لي خرطوم 40م</span>
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
                <p class="prod-desc">كفاءة تشغيلية ممتازة ومضخة أقوى للمساحات الكبيرة والاستراحات لتدفق هادئ ومستمر.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة رذاذ قوية</span>
                  <span class="prod-tag">40 فوهة رذاذ نحاسية</span>
                  <span class="prod-tag">لي خرطوم 50م تايواني</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">1,299 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Mist 60 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p1Branded}" alt="p1"></div>
              <div class="prod-details">
                <div class="prod-title">جهاز رذاذ مطور (60 رأس) <span class="tag">تغطية 75 متر</span></div>
                <p class="prod-desc">النظام الأقوى في فئة الرذاذ المطور، تغطية واسعة جداً للمساحات الخارجية المفتوحة والمنشآت التجارية.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة رذاذ VIP قوية</span>
                  <span class="prod-tag">60 فوهة رذاذ نحاسية</span>
                  <span class="prod-tag">لي خرطوم 75م</span>
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
          <span class="page-footer-right">صفحة 3 من 11</span>
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
          <span class="header-title">أجهزة الضباب الاحترافية الضغط العالي</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">فئة أجهزة الضباب الاحترافية (ضغط عالي 70 بار)</h2>
          <p class="section-desc">أنظمة ضباب احترافية متكاملة لتبخير الماء بالكامل ومنع البلل، مصممة للمقاهي والفلل والحدائق الراقية:</p>

          <div class="product-rows-container">
            
            <!-- Fog Chinese 25 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p5Branded}" alt="p5"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب صيني متكامل (25 فوهة) <span class="tag">تغطية 35 متر</span></div>
                <p class="prod-desc">نظام ضغط عالي متكامل بمضخة صينية قوية، يبرد الأجواء بفعالية ويمنع تشكل بلل المياه.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة صينية 70 بار</span>
                  <span class="prod-tag">25 نوزل ستانلس ستيل</span>
                  <span class="prod-tag">قواعد ونظام سليب لوك 3/8"</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">4,999 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fog Italian 25 -->
            <div class="product-row featured">
              <div class="prod-img-box"><img src="${p6Branded}" alt="p6"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب إيطالي متكامل (25 فوهة) <span class="tag">إيطالي صامت فاخر</span></div>
                <p class="prod-desc">أهدأ مضخة ضباب إيطالية أصلية ذات عمر طويل وتبريد مجهري رائع ومثالي للمقاهي والفلل.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة إيطالية صامتة</span>
                  <span class="prod-tag">25 نوزل إيطالي ستانلس</span>
                  <span class="prod-tag">هوز نايلون إيطالي عالي التحمل</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">6,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fog Taiwan 35 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p8Branded}" alt="p8"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب تايواني متكامل (35 فوهة) <span class="tag">تغطية 50 متر</span></div>
                <p class="prod-desc">أداء عالي التحمل بمضخة تايوانية هادئة وفلاتر مزدوجة لحماية الشبكة ومنع انسداد الفوهات.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة تايوانية 1 حصان</span>
                  <span class="prod-tag">35 نوزل ستانلس ستيل</span>
                  <span class="prod-tag">لي هوز نايلون تايواني 3/8"</span>
                </div>
              </div>
              <div class="prod-price-box">
                <div class="prod-price-val">5,499 <span class="prod-price-curr">ريال</span></div>
              </div>
            </div>

            <!-- Fog Taiwan 60 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p7Branded}" alt="p7"></div>
              <div class="prod-details">
                <div class="prod-title">نظام ضباب تايواني متكامل (60 فوهة) <span class="tag">تغطية 80 متر</span></div>
                <p class="prod-desc">الخيار الأقوى للمساحات الشاسعة والمشاريع والمزارع بضغط هيدروليكي فائق وقوي جداً.</p>
                <div class="prod-tags">
                  <span class="prod-tag">مضخة تايوانية فائقة القوة</span>
                  <span class="prod-tag">60 نوزل ستانلس ستيل 3/8"</span>
                  <span class="prod-tag">لي هوز نايلون تايواني 80م</span>
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
          <span class="page-footer-right">صفحة 4 من 11</span>
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
          <span class="header-title">باقات التبريد المتكاملة</span>
        </div>

        <div class="page-content">
          <h2 class="section-title" style="margin-bottom: 6px;">باقات التبريد المتكاملة (التوفير)</h2>
          <p class="section-desc" style="margin-bottom: 8px;">باقات مجهزة بالكامل تدمج مضخات الضباب مع المراوح أو الأعمدة الديكورية الفاخرة لتحقيق تبريد مذهل ومظهر جذاب:</p>

          <div class="product-rows-container">
            
            <!-- Fans Package 24 -->
            <div class="product-row">
              <div class="prod-img-box"><img src="${p10Branded}" alt="p10"></div>
              <div class="prod-details">
                <div class="prod-title">باقة مروحتين رذاذ 24 إنش + مضخة <span class="tag">رذاذ مطور</span></div>
                <p class="prod-desc">مروحتان رذاذ مع مضخة وتمديدات تضمن توزيع هواء مبرد ونقي في الاستراحات والمقاهي المفتوحة.</p>
                <div class="prod-tags">
                  <span class="prod-tag">2 مروحة 24 بوصة</span>
                  <span class="prod-tag">16 فوهة رذاذ نحاسية</span>
                  <span class="prod-tag">مضخة رذاذ متكاملة</span>
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
                <div class="prod-title">باقة مروحتين ضباب 20 إنش + مضخة 40 بار <span class="tag">ضباب ضغط عالي</span></div>
                <p class="prod-desc">أقوى دمج لتبريد مروحة التهوية مع ضباب مجهري فائق الكثافة لمنع الحرارة دون بلل.</p>
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
                <div class="prod-title">باقة عمودين ضباب حديد + مضخة 40 بار <span class="tag">باقة الديكور</span></div>
                <p class="prod-desc">عمودان حديد ديكوريان بطول 2.3م لتبريد وتزيين الممرات والحدائق الفاخرة للفلل والمقاهي.</p>
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
                <div class="prod-title">باقة 4 أعمدة ضباب حديد + مضخة 70 بار <span class="tag">VIP تجاري متكامل</span></div>
                <p class="prod-desc">الباقة الديكورية التجارية الأقوى لتغطية وتبريد المقاهي الكبيرة والمساحات الخارجية الواسعة.</p>
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
          <span class="page-footer-right">صفحة 5 من 11</span>
        </div>
      </div>

      <!-- ================= PAGE 6: FOG COLUMNS 1 ================= -->
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
          <span class="header-title">أعمدة الضباب المنفردة — حديد وإضاءة</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">أعمدة الضباب المنفردة (قسم 1)</h2>
          <p class="section-desc" style="margin-bottom: 8px;">تشكيلة فاخرة من أعمدة الضباب الحديدية والستانلس ستيل المجهزة بالكامل مع إنارة LED ليلية جذابة:</p>

          <div class="pdf-grid-compact">
            
            <!-- col4: حديد مربع 12 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col4Branded}" alt="col4"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود حديد مربع أسود (12 نزل)</span>
                <span class="pdf-compact-desc">بطول 2 متر — هيكل حديدي مربع متين للحدائق والممرات الخارجية.</span>
                <span class="pdf-compact-price">1,450 ريال</span>
              </div>
            </div>

            <!-- col3: ليد مربع 12 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col3Branded}" alt="col3"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ليد مربع أسود (12 نزل)</span>
                <span class="pdf-compact-desc">يجمع بين إنارة LED مدمجة على طول العمود وتبريد الضباب.</span>
                <span class="pdf-compact-price">1,900 ريال</span>
              </div>
            </div>

            <!-- col1: ليد دائري 16 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col1Branded}" alt="col1"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ليد دائري أسود (16 نزل)</span>
                <span class="pdf-compact-desc">إنارة ليد مدمجة دائرية تضفي لمسة جمالية وكثافة ضبابية ممتازة.</span>
                <span class="pdf-compact-price">2,199 - ريال</span>
              </div>
            </div>

            <!-- col2: حديد إنارة كلاسيك 6 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col2Branded}" alt="col2"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود إنارة كلاسيكي (6 نزل)</span>
                <span class="pdf-compact-desc">بطول 2 متر — عمود كلاسيكي يجمع تبريد الضباب والإنارة الجذابة.</span>
                <span class="pdf-compact-price">2,300 ريال</span>
              </div>
            </div>

            <!-- col5: ستانلس 1 متر 3 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col5Branded}" alt="col5"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود 1 متر ستانلس (3 نزل)</span>
                <span class="pdf-compact-desc">ارتفاع 1 متر — ستانلس ستيل 304 أنيق للجلسات والممرات الضيقة.</span>
                <span class="pdf-compact-price">700 ريال</span>
              </div>
            </div>

            <!-- col6: ستانلس 6 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col6Branded}" alt="col6"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ستانلس ستيل (6 نزل)</span>
                <span class="pdf-compact-desc">تصميم عمودي مصقول مقاوم للصدأ ومنافذ ضباب موزعة بشكل رائع.</span>
                <span class="pdf-compact-price">1,100 ريال</span>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 6 من 11</span>
        </div>
      </div>

      <!-- ================= PAGE 7: FOG COLUMNS 2 ================= -->
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
          <span class="header-title">أعمدة الضباب المنفردة — ستانلس فاخر</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">أعمدة الضباب المنفردة (قسم 2)</h2>
          <p class="section-desc" style="margin-bottom: 8px;">تشكيلة فاخرة من أعمدة الستانلس ستيل 304 بتصاميمها الديكورية والمنحنية المتميزة:</p>

          <div class="pdf-grid-compact">
            
            <!-- col7: ستانلس نخلة 9 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col7Branded}" alt="col7"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ستانلس نخلة (9 نزل)</span>
                <span class="pdf-compact-desc">أفرع علوية موزعة كشكل النخلة لانتشار دائري رائع وجمالي للحدائق.</span>
                <span class="pdf-compact-price">1,200 ريال</span>
              </div>
            </div>

            <!-- col8: ستانلس فرعين 6 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col8Branded}" alt="col8"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ستانلس فرعين (6 نزل)</span>
                <span class="pdf-compact-desc">فرعان جانبيان متوازنان لتوزيع الضباب باتجاهين متعاكسين لتغطية الممرات.</span>
                <span class="pdf-compact-price">1,200 ريال</span>
              </div>
            </div>

            <!-- col9: ستانلس نخلة 12 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col9Branded}" alt="col9"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ستانلس نخلة (12 نزل)</span>
                <span class="pdf-compact-desc">تصميم نخلة VIP بـ 12 نزل لتبريد مكثف للقصور والمقاهي الفاخرة.</span>
                <span class="pdf-compact-price">1,500 ريال</span>
              </div>
            </div>

            <!-- col10: ستانلس منحني 7 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col10Branded}" alt="col10"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ستانلس منحني (7 نزل)</span>
                <span class="pdf-compact-desc">قوس ديكوري رائع بارتفاع 2.50م يوجه الضباب من الأعلى إلى الأسفل بشكل انسيابي.</span>
                <span class="pdf-compact-price">2,100 ريال</span>
              </div>
            </div>

            <!-- col11: ستانلس قوس منحني 8 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${col11Branded}" alt="col11"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">عمود ستانلس قوس (8 نزل)</span>
                <span class="pdf-compact-desc">قوس مزدوج ارتفاع 2.50م يعطي تدفقاً ضبابياً علوياً رائعاً للممرات.</span>
                <span class="pdf-compact-price">2,300 ريال</span>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 7 من 11</span>
        </div>
      </div>

      <!-- ================= PAGE 8: ACCESSORIES ================= -->
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
          <span class="header-title">المواسير والوصلات والإكسسوارات الفنية</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">المواسير والإكسسوارات الفنية الفردية</h2>
          <p class="section-desc" style="margin-bottom: 8px;">مواسير وتوصيلات ستانلس ستيل أصلية 304 و316 عالية المقاومة للأملاح والضغط لتشكيل شبكات الضباب وسقف التمديد:</p>

          <div class="pdf-grid-compact">
            
            <!-- acc1: ماسورة 304 -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc1Branded}" alt="acc1"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">ماسورة ستانلس 304 (قياس 3/8)</span>
                <span class="pdf-compact-desc">أنبوب مواسير ستانلس ستيل 304 لتأسيس شبكات ضغط عالي متينة.</span>
                <span class="pdf-compact-price">80 ريال</span>
              </div>
            </div>

            <!-- acc2: ماسورة 316 -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc2Branded}" alt="acc2"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">ماسورة ستانلس 316 (قياس 3/8)</span>
                <span class="pdf-compact-desc">أعلى مقاومة للتآكل والترسبات وعوامل الرطوبة العالية.</span>
                <span class="pdf-compact-price">250 ريال</span>
              </div>
            </div>

            <!-- acc3: حلقة 5 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc3Branded}" alt="acc3"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">حلقة ضباب دائرية (5 نزل)</span>
                <span class="pdf-compact-desc">حلقة ستانلس دائرية لتوزيع ضبابي متناسق لتثبيتها على المراوح.</span>
                <span class="pdf-compact-price">350 ريال</span>
              </div>
            </div>

            <!-- acc4: قاعدة جدارية 3 نقاط -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc4Branded}" alt="acc4"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">قاعدة ضباب جدارية (3 نقاط)</span>
                <span class="pdf-compact-desc">قاعدة تثبيت جدارية ستانلس ستيل بـ 3 مخارج فوهات لتبريد الجلسات.</span>
                <span class="pdf-compact-price">350 ريال</span>
              </div>
            </div>

            <!-- acc5: ماسورة سقفية 3 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc5Branded}" alt="acc5"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">ماسورة سقفية ستانلس (3 نزل)</span>
                <span class="pdf-compact-desc">ماسورة مجهزة للتثبيت بالسقف وتوجيه الضباب مباشرة للأسفل.</span>
                <span class="pdf-compact-price">380- ريال</span>
              </div>
            </div>

            <!-- acc6: ماسورة جدارية 3 نزل -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc6Branded}" alt="acc6"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">ماسورة جدارية ستانلس (3 نزل)</span>
                <span class="pdf-compact-desc">ماسورة جدارية ممتدة مع 3 مخارج فوهات لتغطية طولية جدارية.</span>
                <span class="pdf-compact-price">400 ريال</span>
              </div>
            </div>

            <!-- acc7: ماسورة سقفية 6 نزل -->
            <div class="pdf-compact-card" style="grid-column: span 2; max-width: 50%; margin: 0 auto;">
              <div class="pdf-compact-img-box"><img src="${acc7Branded}" alt="acc7"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">ماسورة سقفية ستانلس (6 نزل)</span>
                <span class="pdf-compact-desc">أنبوب سقفي مكثف بـ 6 مخارج نوزل لتوزيع ضبابي رأسي فائق التبريد.</span>
                <span class="pdf-compact-price">500 ريال</span>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 8 من 11</span>
        </div>
      </div>

      <!-- ================= PAGE 9: NOZZLES SECTION ================= -->
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
          <span class="header-title">فوهات ونزلات الضباب والرذاذ والصيانة</span>
        </div>

        <div class="page-content">
          <h3 class="pdf-section-title" style="color: var(--primary-navy); margin-bottom: 6px;">فوهات ونزلات الضباب والرذاذ الاحترافية</h3>
          <p class="pdf-section-subtitle" style="margin-bottom: 12px;">نوزلات ورؤوس رذاذ مجهرية دقيقة ومصممة للتبريد الفائق ومقاومة الأملاح ومحاليل التنظيف المعتمدة:</p>

          <div class="pdf-grid-compact">
            
            <!-- acc10: نزل رذاذ -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc10Branded}" alt="acc10"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل رذاذ (فوهة) دقيقة</span>
                <span class="pdf-compact-desc">فوهة نزل رذاذ مطور دقيق يوزع الرذاذ بانتظام ويقاوم الانسداد.</span>
                <span class="pdf-compact-price">30 ريال</span>
              </div>
            </div>

            <!-- acc9: نزل ضباب -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc9Branded}" alt="acc9"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل ضباب (فوهة) ستانلس</span>
                <span class="pdf-compact-desc">نوزل ضباب ستانلس مجهري للضغط العالي يوفر برودة فائقة دون بلل.</span>
                <span class="pdf-compact-price">35 ريال</span>
              </div>
            </div>

            <!-- acc11: نزل ضباب نحاس امريكي -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc11Branded}" alt="acc11"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل ضباب نحاس أمريكي</span>
                <span class="pdf-compact-desc">نوزل نحاسي أمريكي فاخر ذو مقاومة عالية جداً للأملاح والترسبات.</span>
                <span class="pdf-compact-price">60 ريال</span>
              </div>
            </div>

            <!-- acc12: نزل رذاذ صرف ماء -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc12Branded}" alt="acc12"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل رذاذ (مع صمام صرف)</span>
                <span class="pdf-compact-desc">فوهة رذاذ مجهزة بصمام مانع للتنقيط وتصريف مائي تلقائي.</span>
                <span class="pdf-compact-price">80 ريال</span>
              </div>
            </div>

            <!-- acc13: نزل ضباب صرف ماء -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc13Branded}" alt="acc13"></div>
              <div class="pdf-compact-details">
                <span class="pdf-compact-title">نزل ضباب (مع صمام صرف)</span>
                <span class="pdf-compact-desc">فوهة ضباب ستانلس ستيل مع صمام تصريف هيدروليكي لمنع التنقيط.</span>
                <span class="pdf-compact-price">100 ريال</span>
              </div>
            </div>

            <!-- acc8: سائل تنظيف فوهات -->
            <div class="pdf-compact-card">
              <div class="pdf-compact-img-box"><img src="${acc8Branded}" alt="acc8"></div>
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

      <!-- ================= PAGE 9: UMBRELLAS SECTION ================= -->
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
          <span class="page-footer-right">صفحة 10 من 11</span>
        </div>
      </div>

      <!-- ================= PAGE 10: SUCCESS PARTNERS & WARRANTY ================= -->
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
                <span class="partner-name">عنوان القهوة</span>
              </div>

              <!-- 2. UNIT Coffee -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoUnitCoffeeBase64}" alt="UNIT Coffee">
                </div>
                <span class="partner-name">يونت كوفي</span>
              </div>

              <!-- 3. Tea & Cake -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoTeaCakeBase64}" alt="Tea & Cake">
                </div>
                <span class="partner-name">شاي وكعك</span>
              </div>

              <!-- 4. Raha Coffee -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoRahaCoffeeBase64}" alt="Raha">
                </div>
                <span class="partner-name">رحى</span>
              </div>

              <!-- 5. Botticelli -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoBotticelliBase64}" alt="Botticelli">
                </div>
                <span class="partner-name">بوتشيلي</span>
              </div>

              <!-- 6. Rose Masyaf -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoRoseMasyafBase64}" alt="Rose Masyaf">
                </div>
                <span class="partner-name">روز المصيف</span>
              </div>

              <!-- 7. Tarhib Hotel -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoTarhibHotelBase64}" alt="Tarhib Hotel">
                </div>
                <span class="partner-name">فندق الترحيب</span>
              </div>

              <!-- 8. 8oz Coffee -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoEightOzBase64}" alt="8oz">
                </div>
                <span class="partner-name">8oz Coffee</span>
              </div>

              <!-- 9. Tea & Sesame -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoTeaSesameBase64}" alt="Tea & Sesame">
                </div>
                <span class="partner-name">شاي وسمسم</span>
              </div>

              <!-- 10. Dopamine -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoDopamineBase64}" alt="Dopamine">
                </div>
                <span class="partner-name">دوبامين</span>
              </div>

              <!-- 11. Arabia Cafe -->
              <div class="partner-logo-item">
                <div class="partner-logo-circle">
                  <img src="${logoArabiaBase64}" alt="Arabia Cafe">
                </div>
                <span class="partner-name">ارابيا كافيه</span>
              </div>

            </div>
          </div>

          <!-- Warranty Section -->
          <div class="warranty-section-box">
            <h4>شروط الضمان المعتمدة وسوء الاستخدام</h4>
            <div class="warranty-layout-grid">
              
              <div class="warranty-card">
                <h5>🛡️ الضمان وإرشادات الصيانة</h5>
                <ul>
                  <li>ضمان سنتين على المضخة والعيوب المصنعية (عدا الفوهات وسوء الاستخدام).</li>
                  <li><strong>السنة الأولى:</strong> قطع الغيار وأجور الصيانة مجانية بالكامل.</li>
                  <li><strong>السنة الثانية:</strong> يدفع العميل قيمة قطع الغيار فقط والصيانة مجانية.</li>
                  <li>تغيير زيت مضخات الضباب كل 1000 ساعة عمل أو 6 أشهر.</li>
                  <li>تنظيف الفوهات فوراً في حال انسداد أكثر من 20% لتجنب الضغط العكسي.</li>
                </ul>
              </div>

              <div class="warranty-card warning">
                <h5>⚠️ أسباب الخروج من الضمان</h5>
                <ul>
                  <li>تشغيل المضخة دون تدفق أو انقطاع المياه المغذية.</li>
                  <li>عدم صيانة وتغيير فلاتر تنقية المياه بشكل دوري.</li>
                  <li>رفع ضغط المضخة الفني يدوياً فوق الحد المسموح.</li>
                  <li>تعريض المضخة لغمر المياه أو الظروف الجوية دون غطاء حماية.</li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 11 من 11</span>
        </div>
      </div>

    </body>
    </html>
  `;
}

async function main() {
  console.log('🚀 Starting Overwritten 11-Page PDF Catalog Generation...');
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

  console.log('📸 Rendering 11 A4 Pages into PDF...');
  
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
    console.log(`✅ Saved expanded 11-page catalog PDF to website images and artifacts brain!`);
  } catch (err) {
    console.error(`[Error] Failed to copy to artifacts:`, err.message);
  }

  await browser.close();
  console.log('🎉 11-Page PDF Catalog generated successfully!');
}

main().catch(err => {
  console.error('❌ PDF Generation failed:', err);
  process.exit(1);
});
