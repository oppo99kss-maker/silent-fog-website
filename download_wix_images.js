const fs = require('fs');
const path = require('path');
const https = require('https');

const products = [
  { id: 'p1', img: '7ab697_da4a8f31f7bd4d9c85ddcab54157f10a~mv2.png' },
  { id: 'p2', img: '7ab697_079e3d606c4140568d0182d7fddd2861~mv2.png' },
  { id: 'p3', img: '7ab697_ff0af43e15f543109eee5eb39f3592b5~mv2.png' },
  { id: 'p4', img: '7ab697_7b72ee0969714960b059de56948a7519~mv2.png' },
  { id: 'p5', img: '7ab697_37b0e449396547b284301ecab75d6662~mv2.webp' },
  { id: 'p6', img: '7ab697_3b0b857357494dbab9190c4cf1c64710~mv2.png' },
  { id: 'p7', img: '7ab697_d8cfcdb380784802ada006493c8adbb7~mv2.png' },
  { id: 'p8', img: '7ab697_32867797d0c248f59a4db4b87891e9df~mv2.png' },
  { id: 'p9', img: '7ab697_f8f7b3715f6848e3918344f4da341b2e~mv2.png' },
  { id: 'p10', img: '7ab697_563265c152fc419a8824e351165b4508~mv2.png' },
  { id: 'p11', img: '7ab697_f78c7c56e6ae4156aead7717febc865d~mv2.png' },
  { id: 'p12', img: '7ab697_13b1a053e81f43dcaf55082e824294b6~mv2.png' }
];

const destDir = path.join(__dirname, 'images', 'anas_images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(destDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed download: status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`   ✅ Downloaded: ${filename}`);
          resolve(filePath);
        });
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('🚀 Downloading product images from Wix media servers...');
  for (const prod of products) {
    const wixUrl = `https://static.wixstatic.com/media/${prod.img}`;
    const filename = `${prod.id}_original.${prod.img.split('.').pop()}`;
    console.log(`📥 Fetching ${prod.id} from ${wixUrl}...`);
    try {
      await download(wixUrl, filename);
    } catch (err) {
      console.error(`❌ Failed for ${prod.id}:`, err.message);
    }
  }
  console.log('🎉 Wix image download complete!');
}

main().catch(err => {
  console.error('❌ Wix downloader failed:', err);
  process.exit(1);
});
