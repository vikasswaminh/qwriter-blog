const fs = require('fs');

const filePath = '/Users/hirakdebnath/Downloads/qwriter-blog/src/content/blog/ai-agent-security-risks-threats-and-best-practices.md';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the left sidebar CTA and fix the start of blog-main-column
content = content.replace(
  `</div> </nav> <div style="padding: 16px; background: var(--candy-pink-soft); border-radius: 8px; border: 1px solid var(--candy-pink-border); margin-top: 24px;"> <div style="font-weight: 800; color: var(--ink-black); margin-bottom: 8px; font-size: 0.9rem; text-transform: uppercase;">Build Your AI Workforce</div> <p style="font-size: 0.9rem; color: var(--ink-secondary); margin-bottom: 12px; line-height: 1.5;">OllaSuper lets you deploy autonomous agents that securely connect to your existing tools.</p> <a href="https://ollasuper.com/signup" class="os-btn os-btn-primary" style="display: block; text-align: center; font-size: 0.9rem; padding: 8px 12px; width: 100%; border-radius: 6px;">Start Building Free →</a> </div> </aside> <div class="blog-main-column"> <div class="os-article-content"> <h2 id="tldr" class="os-h2" style="margin-bottom: 20px; color: var(--ink-black);">TL;DR</h2>`,
  `</div> </nav> </aside> <div class="blog-main-column">`
);

// 2. Wrap the content after Key Takeaways in the white box style
content = content.replace(
  `</div></section><h2 id="the-word-everyone-s-throwing-around-this-year" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var(--ink-black);">The Word Everyone's Throwing Around This Year</h2>`,
  `</div></section>\n<div class="blog-content" style="display: flex; flex-direction: column; gap: var(--spacing-16); line-height: 1.8; font-size: 1.08rem; color: var(--ink-secondary);">\n<article class="os-article-content" style="padding: 16px 24px; background: #ffffff; border: 1px solid var(--border-medium); border-radius: var(--radius-lg);">\n<h2 id="the-word-everyone-s-throwing-around-this-year" class="os-h2" style="margin-top: 24px; margin-bottom: 12px; color: var(--ink-black);">The Word Everyone's Throwing Around This Year</h2>`
);

// 3. Close the new article tag at the end, right before the Conclusion section.
// The conclusion section starts with: <section class="os-card" style="background: var(--candy-pink-soft); border-left: 5px solid var(--candy-pink);
// In the old code it was:
content = content.replace(
  `<section class="os-card" style="background: var(--candy-pink-soft); border-left: 5px solid var(--candy-pink); padding: 24px 28px; border-radius: var(--radius-lg); margin-top: 24px; box-shadow: var(--shadow-sm);"> <h2 id="cta" class="os-h2" style="margin-bottom: 12px; color: var(--ink-black); font-size: 1.75rem; font-weight: 800;"> Deploy Your Agentic Architecture </h2>`,
  `</article>\n<section class="os-card" style="background: #ffffff; border: 1px solid var(--border-medium); border-left: 5px solid var(--candy-pink); padding: 24px 28px; border-radius: var(--radius-lg); margin-top: 24px; box-shadow: var(--shadow-sm);"> <h2 id="bringing-it-all-together" class="os-h2" style="margin-bottom: 12px; color: var(--ink-black); font-size: 1.75rem; font-weight: 800;"> Bringing It All Together </h2>`
);

// 4. Update the heading IDs and styles to match
content = content.replace(/<h2 id="(.*?)" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var\(--ink-black\);">(.*?)<\/h2>/g, '<h3 id="$1" style="font-size: 1.25rem; font-weight: 700; color: var(--ink-black); margin-top: 20px; margin-bottom: 10px;">$2</h3>');

// Wait, the first one was already replaced (The Word Everyone's).
// But for the rest of them, they need to be h3s.
// Also update paragraph styles
content = content.replace(/<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.7; color: var\(--ink-secondary\);">(.*?)<\/p>/g, '<p style="margin-bottom: 12px; font-size: 1.1rem; line-height: 1.6; color: var(--ink-secondary);">$1</p>');

// And the FAQ section
content = content.replace(
  `<details class="os-faq-item">\n<summary>`, 
  `<details class="os-faq-item">\n<summary>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed styles.');
