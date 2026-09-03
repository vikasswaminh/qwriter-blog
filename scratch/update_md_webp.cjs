const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace cover: "*.jpg" with cover: "*.webp"
  content = content.replace(/cover:\s*"([^"]+)\.jpg"/g, 'cover: "$1.webp"');
  // Also replace any cover: '*.jpg'
  content = content.replace(/cover:\s*'([^']+)\.jpg'/g, 'cover: \'$1.webp\'');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Updated all markdown frontmatter to use WebP covers.');
