const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const todayDate = '2026-09-04';

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('updatedDate:')) {
    // Inject updatedDate after pubDate
    content = content.replace(/(pubDate:\s*[\d-]{10})/, `$1\nupdatedDate: ${todayDate}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added updatedDate to ${file}`);
  }
}
