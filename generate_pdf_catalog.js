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
          padding: 15mm 15mm 15mm 15mm;
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
          padding-bottom: 8px;
          margin-bottom: 15px;
          z-index: 1;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-logo img {
          height: 40px;
        }

        .header-logo .brand-en {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: var(--primary-navy);
        }

        .header-logo .brand-ar {
          font-size: 9px;
          color: var(--primary-blue);
          font-weight: 700;
          margin-top: -3px;
        }

        .header-title {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 700;
          background-color: var(--primary-light);
          padding: 3px 10px;
          border-radius: 50px;
        }

        .page-footer {
          position: absolute;
          bottom: 10mm;
          left: 15mm;
          right: 15mm;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 8px;
          font-size: 9px;
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
          font-size: 19px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-right: 4px solid var(--primary-blue);
          padding-right: 10px;
        }

        .section-desc {
          font-size: 11.5px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 15px;
        }

        /* Pricing Cards Grid */
        .price-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .price-card {
          background: var(--white);
          border: 1.5px solid var(--border-color);
          border-radius: 15px;
          padding: 15px 12px;
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
          content: 'الأكثر طلباً';
          position: absolute;
          top: -10px;
          background: var(--accent-gold);
          color: var(--white);
          font-size: 9px;
          font-weight: 800;
          padding: 1px 10px;
          border-radius: 50px;
        }

        .price-icon-wrapper {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          background-color: var(--primary-light);
          color: var(--primary-blue);
        }

        .price-card.featured .price-icon-wrapper {
          background-color: #fef3c7;
          color: var(--accent-gold);
        }

        .price-icon-wrapper svg {
          width: 22px;
          height: 22px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
        }

        .price-card h3 {
          font-size: 14px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 5px;
        }

        .price-card .desc {
          font-size: 9.5px;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 12px;
          height: 38px;
          display: flex;
          align-items: center;
        }

        .price-start-at {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .price-value-box {
          margin-top: 3px;
          background-color: var(--primary-light);
          border: 1px dashed var(--primary-blue);
          padding: 5px 12px;
          border-radius: 10px;
          display: inline-flex;
          align-items: baseline;
          gap: 3px;
        }

        .price-card.featured .price-value-box {
          background-color: #fef3c7;
          border-color: var(--accent-gold);
        }

        .price-val {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 900;
          color: var(--primary-navy);
        }

        .price-curr {
          font-size: 9px;
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
          margin-top: 10px;
          flex-grow: 1;
        }

        .tech-diagram-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .tech-diagram-box h4 {
          font-size: 12px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 5px;
          margin-bottom: 10px;
        }

        .diagram-img-wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          padding: 5px;
        }

        .diagram-img-wrapper img {
          max-width: 100%;
          max-height: 180px;
          object-fit: contain;
        }

        .tech-prices-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          padding: 12px;
        }

        .tech-prices-box h4 {
          font-size: 12px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 5px;
          margin-bottom: 8px;
        }

        .part-price-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .part-price-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 9.5px;
          padding-bottom: 4px;
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
          padding: 1px 6px;
          border-radius: 4px;
        }

        /* ================= PAGE 3: THE 5 PACKAGES COMPARATIVE ================= */
        .pkg-compare-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pkg-compare-row {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.01);
        }

        .pkg-compare-row.featured {
          border-color: var(--accent-gold);
          background: #fffdf5;
        }

        .pkg-badge {
          background-color: var(--primary-light);
          color: var(--primary-blue);
          font-size: 9px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 50px;
          flex-shrink: 0;
        }

        .pkg-compare-row.featured .pkg-badge {
          background-color: var(--accent-gold);
          color: var(--white);
        }

        .pkg-img {
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

        .pkg-img img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .pkg-details {
          flex-grow: 1;
        }

        .pkg-title {
          font-size: 13.5px;
          font-weight: 800;
          color: var(--primary-navy);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pkg-title span.tag {
          font-size: 9px;
          background-color: #f1f5f9;
          color: var(--text-muted);
          padding: 1px 6px;
          border-radius: 3px;
          font-weight: 700;
        }

        .pkg-desc {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.4;
        }

        .pkg-items-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 5px;
        }

        .pkg-item-tag {
          font-size: 8.5px;
          background-color: #f1f5f9;
          border: 1px solid var(--border-color);
          color: var(--primary-navy);
          padding: 1px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        .pkg-compare-row.featured .pkg-item-tag {
          background-color: #fffbeb;
          border-color: #fef3c7;
        }

        .pkg-item-tag.accent {
          background-color: var(--primary-light);
          border-color: rgba(13, 124, 196, 0.15);
          color: var(--primary-blue);
        }

        /* ================= PAGE 4: UMBRELLAS SECTION (NEW) ================= */
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

        /* ================= PAGE 5: COLUMNS & SYSTEMS ================= */
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

        /* ================= PAGE 6: SUCCESS PARTNERS & WARRANTY ================= */
        /* Partners section layout */
        .partners-section-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          padding: 12px 15px;
          margin-bottom: 15px;
        }

        .partners-section-box h4 {
          font-size: 12px;
          font-weight: 800;
          color: var(--primary-navy);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .partners-section-box h4 svg {
          width: 14px;
          height: 14px;
          stroke: var(--primary-blue);
          fill: none;
          stroke-width: 2;
        }

        .partners-names-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          text-align: center;
        }

        .partner-name-card {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 8px 5px;
          font-size: 10px;
          font-weight: 800;
          color: var(--primary-navy);
          box-shadow: 0 2px 5px rgba(0,0,0,0.01);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .partner-name-card.featured {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
          background-color: #fffdf5;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .info-box {
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 10px 12px;
        }

        .info-box h4 {
          font-size: 11px;
          font-weight: 800;
          color: var(--primary-navy);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 4px;
        }

        .info-box h4 svg {
          width: 12px;
          height: 12px;
          stroke: var(--primary-blue);
          fill: none;
          stroke-width: 2;
        }

        .info-box ul {
          list-style: none;
        }

        .info-box li {
          font-size: 9px;
          color: var(--text-dark);
          margin-bottom: 4px;
          display: flex;
          align-items: flex-start;
          gap: 4px;
          line-height: 1.3;
        }

        .info-box li::before {
          content: '•';
          color: var(--primary-blue);
          font-weight: bold;
        }

        .warning-box {
          background: #fff5f5;
          border: 1px solid #fee2e2;
          border-radius: 10px;
          padding: 8px 12px;
          margin-bottom: 15px;
        }

        .warning-box h4 {
          color: #dc2626;
          font-size: 10px;
          font-weight: 800;
          margin-bottom: 3px;
          border-bottom: 1px solid #fecaca;
          padding-bottom: 2px;
        }

        .warning-box p {
          font-size: 8.5px;
          color: #991b1b;
          line-height: 1.3;
          font-weight: 500;
        }

        /* Final contact block on page 6 */
        .final-contact-bar {
          background: linear-gradient(135deg, var(--primary-navy) 0%, #0d7cc4 100%);
          border-radius: 12px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(13, 124, 196, 0.15);
        }

        .final-text-side {
          display: flex;
          flex-direction: column;
        }

        .final-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
        }

        .final-main {
          font-size: 12.5px;
          font-weight: 800;
        }

        .final-phone-badge {
          background: #25d366;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .final-phone-badge svg {
          fill: currentColor;
          width: 14px;
          height: 14px;
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
              <h3>أنظمة الرذاذ المبتكرة</h3>
              <p class="desc">حلول اقتصادية للجلسات والمساحات المنزلية الصغيرة، هدوء في التشغيل واستهلاك منخفض للغاية.</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">1,000</span>
                <span class="price-curr">ريال سعودي</span>
              </div>
            </div>

            <!-- Price 2: Fog -->
            <div class="price-card featured">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
              <h3>أنظمة الضباب الاحترافية</h3>
              <p class="desc">تأسيس شبكات ضباب ضغط عالي متكاملة للمساحات المفتوحة الكبيرة والحدائق والمنشآت التجارية.</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">2,800</span>
                <span class="price-curr">ريال سعودي</span>
              </div>
            </div>

            <!-- Price 3: Columns -->
            <div class="price-card">
              <div class="price-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M8 3v18M16 3v18M3 8h18M3 16h18"/></svg>
              </div>
              <h3>أعمدة الضباب الديكورية</h3>
              <p class="desc">أعمدة ستانلس ستيل 304 فاخرة بارتفاعات متعددة مع إضاءة LED مدمجة ورؤوس ونوازل متطورة.</p>
              <span class="price-start-at">تبدأ الأسعار من</span>
              <div class="price-value-box">
                <span class="price-val">500</span>
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
                <div class="part-price-item"><span class="part-name">بكج مضخة ضباب - ربع حصان (10-20 بخاخ)</span><span class="part-price-val">2800 ريال</span></div>
                <div class="part-price-item"><span class="part-name">مضخة ضباب - 1 حصان (40-80 بخاخ)</span><span class="part-price-val">5200 ريال</span></div>
                <div class="part-price-item"><span class="part-name">مضخة ضباب - 2 حصان (80-150 بخاخ)</span><span class="part-price-val">7500 ريال</span></div>
                <div class="part-price-item"><span class="part-name">نازل (بخاخ) ثلاثي نجمة سقفي</span><span class="part-price-val">250 ريال</span></div>
                <div class="part-price-item"><span class="part-name">نازل (بخاخ) سداسي نجمة سقفي</span><span class="part-price-val">350 ريال</span></div>
                <div class="part-price-item"><span class="part-name">رأس بخاخ ثلاثي / سداسي</span><span class="part-price-val">45 / 55 ريال</span></div>
                <div class="part-price-item"><span class="part-name">لفة لي (هوز) 50 متر تايواني</span><span class="part-price-val">450 ريال</span></div>
                <div class="part-price-item"><span class="part-name">مواسير ستيل (طول 1 متر)</span><span class="part-price-val">450 ريال</span></div>
                <div class="part-price-item"><span class="part-name">أعمال التركيب الفني وتأسيس النظام بالكامل</span><span class="part-price-val">1500 ريال</span></div>
              </div>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 2 من 6</span>
        </div>
      </div>

      <!-- ================= PAGE 3: THE 5 PACKAGES COMPARATIVE ================= -->
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
          <span class="header-title">دليل مقارنة الباقات الرسمية الخمس</span>
        </div>

        <div class="page-content">
          <h2 class="section-title" style="margin-bottom: 10px;">مقارنة الباقات والحلول المتكاملة</h2>
          <p class="section-desc" style="margin-bottom: 12px;">
            صممنا 5 باقات رسمية متكاملة ومدروسة هندسياً لتغطي جميع المساحات والاحتياجات. يوضح الجدول التالي مكونات وخصائص كل باقة ليسهل عليكم اختيار النظام الأنسب لموقعكم:
          </p>

          <div class="pkg-compare-grid">
            
            <!-- Pkg 1 -->
            <div class="pkg-compare-row">
              <div class="pkg-img"><img src="${mct15PumpBase64}" alt="pkg1"></div>
              <div class="pkg-details">
                <div class="pkg-title">باقة الرذاذ الاقتصادية <span class="tag">رذاذ منزلي</span></div>
                <div class="pkg-desc">مثالية للجلسات الصغيرة والممرات المنزلية. مضخة MCT15 هادئة بقدرة 45 واط مع أعمدة نوافير.</div>
                <div class="pkg-items-list">
                  <span class="pkg-item-tag">مضخة MCT15 صينية 45W</span>
                  <span class="pkg-item-tag">2 عمود نافورة 1.20م</span>
                  <span class="pkg-item-tag">Tee connector</span>
                  <span class="pkg-item-tag">15م لي كبس 1/4"</span>
                  <span class="pkg-item-tag">فلتر مياه صغير</span>
                </div>
              </div>
              <span class="pkg-badge">اقتصادية</span>
            </div>

            <!-- Pkg 2 -->
            <div class="pkg-compare-row">
              <div class="pkg-img"><img src="${productPumpBase64}" alt="pkg2"></div>
              <div class="pkg-details">
                <div class="pkg-title">باقة الشارك للضباب <span class="tag">ضباب صيني</span></div>
                <div class="pkg-desc">مضخة الشارك الصينية القوية 1 حصان مع أعمدة نخلة ديكورية. قوة تحمل ممتازة للحدائق المتوسطة.</div>
                <div class="pkg-items-list">
                  <span class="pkg-item-tag">مضخة الشارك 1HP صينية</span>
                  <span class="pkg-item-tag">2 عمود نخلة ستانلس 2.60م</span>
                  <span class="pkg-item-tag">Tee connector 3/8"</span>
                  <span class="pkg-item-tag">50م لي سليب لوك</span>
                  <span class="pkg-item-tag">فلاتر ومحبس إلكتروني</span>
                </div>
              </div>
              <span class="pkg-badge">احترافية</span>
            </div>

            <!-- Pkg 3 -->
            <div class="pkg-compare-row">
              <div class="pkg-img"><img src="${productPumpBase64}" alt="pkg3"></div>
              <div class="pkg-details">
                <div class="pkg-title">باقة الضباب الإيطالية <span class="tag">إيطالي جداري</span></div>
                <div class="pkg-desc">باقة جدارية بدون أعمدة تعتمد على النوزلات المدمجة بالأسقف والجدران بمضخة إيطالية FWP-IT-100 صامتة.</div>
                <div class="pkg-items-list">
                  <span class="pkg-item-tag accent">مضخة FWP-IT-100 إيطالية</span>
                  <span class="pkg-item-tag">25 نوزل ضباب 2 ميكرون</span>
                  <span class="pkg-item-tag">24 قاعدة سليب لوك</span>
                  <span class="pkg-item-tag">1 نهاية بفتحة نوزل</span>
                  <span class="pkg-item-tag">50م لي سليب لوك</span>
                </div>
              </div>
              <span class="pkg-badge">إيطالية جدارية</span>
            </div>

            <!-- Pkg 4 -->
            <div class="pkg-compare-row featured">
              <div class="pkg-img"><img src="${productPumpBase64}" alt="pkg4"></div>
              <div class="pkg-details">
                <div class="pkg-title">باقة الضباب الإيطالية مع الأعمدة <span class="tag">إيطالي عمود</span></div>
                <div class="pkg-desc">الباقة الأكثر طلباً ورواجاً. مضخة إيطالية فاخرة 1 حصان صامتة مع عمودين نخلة ستانلس فاخرين وتغطية مثالية.</div>
                <div class="pkg-items-list">
                  <span class="pkg-item-tag accent">مضخة إيطالية 1HP فاخرة</span>
                  <span class="pkg-item-tag">2 عمود نخلة ستانلس 2.60م</span>
                  <span class="pkg-item-tag">Tee connector 3/8"</span>
                  <span class="pkg-item-tag">50م لي سليب لوك</span>
                  <span class="pkg-item-tag">2 فلاتر ومحبس إلكتروني</span>
                </div>
              </div>
              <span class="pkg-badge">الأكثر طلباً</span>
            </div>

            <!-- Pkg 5 -->
            <div class="pkg-compare-row">
              <div class="pkg-img"><img src="${productPumpBase64}" alt="pkg5"></div>
              <div class="pkg-details">
                <div class="pkg-title">باقة النظام المتكامل (VIP) <span class="tag">VIP متكامل</span></div>
                <div class="pkg-desc">أشمل وأقوى نظام بمضخة 1 حصان صينية مع 4 أعمدة نخلة ستانلس ستيل لتوزيع مثالي للمساحات الكبيرة جداً.</div>
                <div class="pkg-items-list">
                  <span class="pkg-item-tag">مضخة FWP-CH-1HP صينية 1HP</span>
                  <span class="pkg-item-tag">4 أعمدة نخلة ستانلس 2.60م</span>
                  <span class="pkg-item-tag">3 قسامات ثلاثية 3/8"</span>
                  <span class="pkg-item-tag">50م لي سليب لوك نايلون</span>
                  <span class="pkg-item-tag">فلاتر ومحبس إلكتروني</span>
                </div>
              </div>
              <span class="pkg-badge">VIP متكاملة</span>
            </div>

          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 3 من 6</span>
        </div>
      </div>

      <!-- ================= PAGE 4: UMBRELLAS SECTION (NEW) ================= -->
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
          <span class="page-footer-right">صفحة 4 من 6</span>
        </div>
      </div>

      <!-- ================= PAGE 5: COLUMNS & SPECIFICATIONS ================= -->
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
          <span class="header-title">أعمدة الضباب والأنظمة الجدارية والسقفية</span>
        </div>

        <div class="page-content">
          <h2 class="section-title">أعمدة قص الليزر والأعمدة الديكورية الفاخرة</h2>
          <p class="section-desc" style="margin-bottom: 12px;">
            نتميز بتوريد وتصميم أرقى تشكيلات أعمدة الضباب لعام 2026م المصنعة بالكامل من الستانلس ستيل 304 مع دمج تقنيات الإضاءة LED وأنظمة الرش رباعية وثنائية الاتجاهات:
          </p>

          <div class="column-showcase">
            
            <div class="col-card-large">
              <h4>📐 الموديل الهندسي الفخم لقص الليزر والإضاءة</h4>
              <div class="col-large-img-box">
                <img src="${model4ColumnBase64}" alt="Laser Column">
              </div>
              <p>
                ارتفاع 230 سم - عرض 10×10 سم - قاعدة 15×15 سم. تصميم قص ليزر هندسي إسلامي فخم مع إضاءة خلفية دافئة مدمجة. 4 أذرع رش جانبية تحتوي 12 نوزل ستانلس ستيل مع طلاء أسود مطفي فاخر وتخصيص شعار محلك.
              </p>
            </div>

            <div class="col-small-list">
              
              <div class="col-card-small">
                <div class="col-small-img-box"><img src="${fountainColumnBase64}" alt="Fountain"></div>
                <div class="col-small-details">
                  <h4>عمود النافورة ستالس ستيل</h4>
                  <p>ارتفاع 1.20م - رأس يحتوي 3 نوازل تبريد. خيار هادئ واقتصادي جداً للممرات والحدائق المنخفضة.</p>
                </div>
              </div>

              <div class="col-card-small">
                <div class="col-small-img-box"><img src="${productPoleBase64}" alt="Palm"></div>
                <div class="col-small-details">
                  <h4>عمود النخلة ستانلس ستيل</h4>
                  <p>ارتفاع 2.60م - رأس نخلة بـ 3 أفرع والفرع يحتوي 3 نوزل (9 نوزل إجمالاً). ثبات فخم وقوة انتشار فائقة.</p>
                </div>
              </div>

              <div class="col-card-small">
                <div class="col-small-img-box"><img src="${eliteColorsBase64}" alt="Colors"></div>
                <div class="col-small-details">
                  <h4>تشكيلة "إيليت" للخامات والألوان</h4>
                  <p>9 ألوان فاخرة: أسود مطفي، أبيض، رمادي، بيج، كورتن ستيل، تأثير خشبي، برونز، زيتي، وأزرق بحري.</p>
                </div>
              </div>

            </div>

          </div>

          <!-- Wall and Ceiling systems -->
          <div class="systems-grid-box">
            <h4>🛠️ أنظمة التثبيت الجدارية والسقفية الحديثة</h4>
            <div class="systems-items-flex">
              
              <div class="system-flex-item">
                <div class="sys-flex-img"><img src="${curvedArmBase64}" alt="Curved"></div>
                <div class="sys-flex-details">
                  <h5>تثبيت جانبي جداري (منحني 45°)</h5>
                  <p>ماسورة ستانلس ستيل 304 ورأس ثلاثي النوازل.</p>
                </div>
              </div>

              <div class="system-flex-item">
                <div class="sys-flex-img"><img src="${endCapBase64}" alt="Straight"></div>
                <div class="sys-flex-details">
                  <h5>تثبيت جانبي جداري (مستقيم)</h5>
                  <p>رأس ثلاثي النوازل مثبت على ذراع مستقيم متين.</p>
                </div>
              </div>

              <div class="system-flex-item">
                <div class="sys-flex-img"><img src="${nozzleBaseImgBase64}" alt="Ceiling"></div>
                <div class="sys-flex-details">
                  <h5>تثبيت سقفي ممتد (نموذج 2)</h5>
                  <p>ماسورة ستانلس ستيل (طول 1-2م) برأس ثلاثي أو سداسي.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="page-footer">
          <span>دليل وكتالوج أنظمة الضباب والرذاذ — أبو طيف</span>
          <span class="page-footer-right">صفحة 5 من 6</span>
        </div>
      </div>

      <!-- ================= PAGE 6: SUCCESS PARTNERS & WARRANTY ================= -->
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
          
          <!-- Success Partners (NEW) -->
          <div class="partners-section-box">
            <h4>
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              شركاء النجاح - بعض المحلات والمنشآت التي تفخر بخدمتها
            </h4>
            <p class="section-desc" style="margin-bottom: 8px;">
              حزنا على ثقة أشهر المقاهي والمطاعم والفنادق بفضل جودة أنظمتنا ودقتها وصيانتنا الدورية المستمرة:
            </p>
            <div class="partners-names-grid">
              <div class="partner-name-card featured">UNIT Coffee (يونيت كوفي)</div>
              <div class="partner-name-card">8Oz Coffee (أونص كوفي)</div>
              <div class="partner-name-card">Demli Tea & Oven (دملي)</div>
              <div class="partner-name-card featured">Arabia Cafe & Bakery (أرابيا)</div>
              <div class="partner-name-card">The Coffee Address (ذا كوفي)</div>
              <div class="partner-name-card featured">فندق الترحيب الفخم</div>
              <div class="partner-name-card">مقهى حس المكان</div>
              <div class="partner-name-card">جلسات ومسابح الفلل الخاصة</div>
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
          <span class="page-footer-right">صفحة 6 من 6</span>
        </div>
      </div>

    </body>
    </html>
  `;
}

// Generate the PDF brochure catalog
async function main() {
  console.log('🚀 Starting Expanded Master PDF Catalog Generation...');
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

  console.log('📸 Rendering 6 A4 Pages into PDF...');
  
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
    console.log(`✅ Saved expanded master catalog PDF to website images and artifacts brain!`);
  } catch (err) {
    console.error(`[Error] Failed to copy to artifacts:`, err.message);
  }

  await browser.close();
  console.log('🎉 Expanded Master PDF Catalog generated successfully!');
}

main().catch(err => {
  console.error('❌ PDF Generation failed:', err);
  process.exit(1);
});
