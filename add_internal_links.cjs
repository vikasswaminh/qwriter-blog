const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const links = [
  { slug: 'agentic-ai', phrase: /agentic AI/i, replacement: '<a href="/blog/agentic-ai" class="internal-link">$&</a>' },
  { slug: 'what-are-ai-agents-complete-guide-for-businesses-2026', phrase: /\bAI agents?\b/i, replacement: '<a href="/blog/what-are-ai-agents-complete-guide-for-businesses-2026" class="internal-link">$&</a>' },
  { slug: 'what-is-an-ai-workforce', phrase: /\bAI workforce\b/i, replacement: '<a href="/blog/what-is-an-ai-workforce" class="internal-link">$&</a>' },
  { slug: 'ai-agents-vs-ai-assistants-whats-the-difference', phrase: /\bAI assistants?\b/i, replacement: '<a href="/blog/ai-agents-vs-ai-assistants-whats-the-difference" class="internal-link">$&</a>' },
  { slug: 'ai-automation-how-businesses-can-automate-workflows-with-ai', phrase: /\bAI automation\b/i, replacement: '<a href="/blog/ai-automation-how-businesses-can-automate-workflows-with-ai" class="internal-link">$&</a>' },
  { slug: 'best-ai-tools-for-business-2026', phrase: /\bAI tools?\b/i, replacement: '<a href="/blog/best-ai-tools-for-business-2026" class="internal-link">$&</a>' }
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  links.forEach(linkObj => {
    // We only want to link if the phrase is NOT in the current article's slug (don't link to itself)
    if (file.includes(linkObj.slug)) return;

    // We only want to replace the first occurrence in a standard paragraph text to not over-optimize
    // A safe way is to look for the phrase not inside <a ...> tags or other html tags
    // Let's just find the first match in the content body (after frontmatter)
    
    // Split frontmatter
    const parts = content.split('---\n');
    if (parts.length >= 3) {
      let body = parts.slice(2).join('---\n');
      
      // Simple regex to match phrase not inside an <a> tag
      // This is a naive regex but works for simple text: (?<!<a[^>]*>)(Phrase)(?![^<]*<\/a>)
      // Since JS regex doesn't easily support variable length lookbehind, we will just use a simpler method:
      // Replace the first occurrence of the word that is surrounded by spaces or basic punctuation
      
      let replaced = false;
      body = body.replace(linkObj.phrase, (match, offset, fullString) => {
        if (replaced) return match;
        
        // check if inside a tag
        const before = fullString.substring(0, offset);
        const openTags = (before.match(/<a\b/g) || []).length;
        const closeTags = (before.match(/<\/a>/g) || []).length;
        
        const openHeaders = (before.match(/<h[1-6]\b/g) || []).length;
        const closeHeaders = (before.match(/<\/h[1-6]>/g) || []).length;
        
        const openTitle = (before.match(/title:/g) || []).length;
        
        if (openTags > closeTags) return match; // inside an <a>
        if (openHeaders > closeHeaders) return match; // inside a header
        if (before.lastIndexOf('<') > before.lastIndexOf('>')) return match; // inside any html tag definition
        
        replaced = true;
        return linkObj.replacement.replace('$&', match);
      });
      
      content = parts[0] + '---\n' + parts[1] + '---\n' + body;
    }
  });

  fs.writeFileSync(filePath, content);
});

console.log("Internal links added.");
