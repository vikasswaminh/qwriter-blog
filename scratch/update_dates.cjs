const fs = require('fs');
const path = require('path');

const changes = {
    'what-is-an-ai-workforce.md': { old: '2026-08-27', new: '2026-08-30' },
    'best-ai-tools-for-business-2026.md': { old: '2026-08-25', new: '2026-08-29' },
    'ai-automation-how-businesses-can-automate-workflows-with-ai.md': { old: '2026-08-24', new: '2026-08-28' },
    'ai-agents-vs-ai-assistants-whats-the-difference.md': { old: '2026-08-21', new: '2026-08-27' },
    'what-are-ai-agents-complete-guide-for-businesses-2026.md': { old: '2026-08-20', new: '2026-08-26' }
};

const dir = '/Users/hirakdebnath/Downloads/qwriter-blog/src/content/blog';

for (const [filename, dates] of Object.entries(changes)) {
    const filePath = path.join(dir, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace pubDate
    content = content.replace(`pubDate: ${dates.old}`, `pubDate: ${dates.new}`);
    
    // Replace span badge
    content = content.replace(`<span>${dates.old}</span>`, `<span>${dates.new}</span>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filename}`);
}
