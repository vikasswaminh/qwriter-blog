const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We need to match <aside class="blog-sidebar"> ... </aside>
  // Since it can span multiple lines, we use a regex with the 's' flag (dotall).
  const regex = /<aside class="blog-sidebar">.*?<\/aside>/s;
  
  if (regex.test(content)) {
    content = content.replace(regex, '<aside class="blog-sidebar" id="left-sidebar-placeholder"></aside>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
