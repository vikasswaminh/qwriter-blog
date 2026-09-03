const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We are targeting the os-container inside the markdown
  // style="max-width: 1400px;
  content = content.replace(/max-width:\s*1400px;/g, 'max-width: 1560px;');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated width for ${file}`);
}
