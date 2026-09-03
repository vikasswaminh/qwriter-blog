const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

async function convert() {
  for (const file of files) {
    const filePath = path.join(publicDir, file);
    const parsed = path.parse(file);
    const webpPath = path.join(publicDir, `${parsed.name}.webp`);
    
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath);
      
    console.log(`Converted ${file} to WebP`);
  }
}

convert().catch(err => {
  console.error("Error converting:", err);
});
