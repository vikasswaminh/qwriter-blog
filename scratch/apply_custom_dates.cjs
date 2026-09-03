const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

const mapping = {
  'what-are-ai-agents-complete-guide-for-businesses-2026.md': '2026-08-20',
  'ai-agents-vs-ai-assistants-whats-the-difference.md': '2026-08-21',
  'ai-automation-how-businesses-can-automate-workflows-with-ai.md': '2026-08-24',
  'best-ai-tools-for-business-2026.md': '2026-08-25',
  'what-is-an-ai-workforce.md': '2026-08-27',
  'agentic-ai.md': '2026-09-01',
  'multi-agent-systems-what-they-are-and-how-they-work.md': '2026-09-02',
  'ai-agent-use-cases-15-ways-businesses-are-using-ai-agents-in-2026.md': '2026-09-03'
};

for (const [file, newDate] of Object.entries(mapping)) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace YAML pubDate
  content = content.replace(/pubDate:\s*[\d-]{10}/, `pubDate: ${newDate}`);

  // Replace HTML span
  const headerMatch = content.match(/<header[^>]*>.*?<\/header>/s);
  if (headerMatch) {
    let headerContent = headerMatch[0];
    headerContent = headerContent.replace(/<span>\d{4}-\d{2}-\d{2}<\/span>/, `<span>${newDate}</span>`);
    content = content.replace(headerMatch[0], headerContent);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file} to ${newDate}`);
}
