const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract pubDate from frontmatter
  const pubDateMatch = content.match(/pubDate:\s*([^\n]+)/);
  if (pubDateMatch) {
    let pubDateStr = pubDateMatch[1].trim();
    
    // Sometimes it's wrapped in quotes or has time, just grab YYYY-MM-DD
    const dateRegex = /(\d{4}-\d{2}-\d{2})/;
    const dateExtract = pubDateStr.match(dateRegex);
    
    if (dateExtract) {
      const correctDate = dateExtract[1];
      
      // Now find the date in the HTML block inside <header>
      // The date is inside <span>2026-09-XX</span> in the <header> block
      const headerMatch = content.match(/<header[^>]*>.*?<\/header>/s);
      if (headerMatch) {
        let headerContent = headerMatch[0];
        
        // Replace any date format like 2026-09-02 or 2026-08-30 in the header with the correct date
        headerContent = headerContent.replace(/<span>\d{4}-\d{2}-\d{2}<\/span>/, `<span>${correctDate}</span>`);
        
        content = content.replace(headerMatch[0], headerContent);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file} with correct date: ${correctDate}`);
      }
    }
  }
}
