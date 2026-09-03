const fs = require('fs');

const filePath = '/Users/hirakdebnath/Downloads/qwriter-blog/src/content/blog/ai-agent-security-risks-threats-and-best-practices.md';
let content = fs.readFileSync(filePath, 'utf8');

// 1. First, let's fix the broken tags. We have an extra </div></section> that was inserted before The Word Everyone's...
// The actual string we inserted was:
// `</div></section>\n<div class="blog-content" style="display: flex; flex-direction: column; gap: var(--spacing-16); line-height: 1.8; font-size: 1.08rem; color: var(--ink-secondary);">\n<article class="os-article-content" style="padding: 16px 24px; background: #ffffff; border: 1px solid var(--border-medium); border-radius: var(--radius-lg);">\n<h2 id="the-word-everyone-s-throwing-around-this-year"`
// But in the previous step we turned the h2 into an h3? Let's just find `</div></section>\n<div class="blog-content"`
content = content.replace(`</div></section>\n<div class="blog-content"`, `<div class="blog-content"`);

// 2. Remove the left sidebar CTA and the incorrectly placed `<div class="os-article-content"> <h2 id="tldr" class="os-h2" style="margin-bottom: 20px; color: var(--ink-black);">TL;DR</h2>`
// The current string is:
// `</div> </nav> <div style="padding: 16px; background: var(--candy-pink-soft); border-radius: 8px; border: 1px solid var(--candy-pink-border); margin-top: 24px;"> <div style="font-weight: 800; color: var(--ink-black); margin-bottom: 8px; font-size: 0.9rem; text-transform: uppercase;">Build Your AI Workforce</div> <p style="font-size: 0.9rem; color: var(--ink-secondary); margin-bottom: 12px; line-height: 1.5;">OllaSuper lets you deploy autonomous agents that securely connect to your existing tools.</p> <a href="https://ollasuper.com/signup" class="os-btn os-btn-primary" style="display: block; text-align: center; font-size: 0.9rem; padding: 8px 12px; width: 100%; border-radius: 6px;">Start Building Free →</a> </div> </aside> <div class="blog-main-column"> <div class="os-article-content"> <h2 id="tldr" class="os-h2" style="margin-bottom: 20px; color: var(--ink-black);">TL;DR</h2>`
// We need to replace it with:
// `</div> </nav> </aside>\n\n<div class="blog-main-column">\n\n`
const strToRemove = `</div> </nav> <div style="padding: 16px; background: var(--candy-pink-soft); border-radius: 8px; border: 1px solid var(--candy-pink-border); margin-top: 24px;"> <div style="font-weight: 800; color: var(--ink-black); margin-bottom: 8px; font-size: 0.9rem; text-transform: uppercase;">Build Your AI Workforce</div> <p style="font-size: 0.9rem; color: var(--ink-secondary); margin-bottom: 12px; line-height: 1.5;">OllaSuper lets you deploy autonomous agents that securely connect to your existing tools.</p> <a href="https://ollasuper.com/signup" class="os-btn os-btn-primary" style="display: block; text-align: center; font-size: 0.9rem; padding: 8px 12px; width: 100%; border-radius: 6px;">Start Building Free →</a> </div> </aside> <div class="blog-main-column"> <div class="os-article-content"> <h2 id="tldr" class="os-h2" style="margin-bottom: 20px; color: var(--ink-black);">TL;DR</h2>`;

if (content.includes(strToRemove)) {
  content = content.replace(strToRemove, `</div> </nav> </aside>\n\n<div class="blog-main-column">\n\n`);
} else {
  console.log("Could not find the sidebar CTA string to remove.");
}

// 3. Now let's make sure the end of the file is correctly closed.
// We added `</article>` before the conclusion section. This should be correct.
// Let's verify what the very end of the file looks like.
// `<section class="os-card" ... Conclusion ... </section>`
// Followed by `</div> </div> </div> </article>` in the original.
// Wait, since we removed `<div class="os-article-content">` at the start, but we opened `<article class="os-article-content">` later, and then closed it with `</article>`, the nesting should be:
// 1. `<div class="blog-main-column">`
// 2. `<section>TLDR</section>`
// 3. `<section>Key Takeaways</section>`
// 4. `<div class="blog-content">`
// 5. `<article class="os-article-content">`
// 6. ... Text ...
// 7. `</article>`
// 8. `<section class="os-card"> Conclusion </section>`
// 9. Now we need to close `<div class="blog-content">` and `<div class="blog-main-column">`!
// Wait! `ai-agent-use-cases...md` does:
// `</section>\n\n</div>\n</div>\n</div>\n</article>\n`
// The `</div>` count at the end must balance.
// In `ai-agent-security...md` right now, the end is probably:
// `</section> </div> </div> </div> </article>`
// We added `<div class="blog-content">`. So we need an extra `</div>` at the end!
// Let's fix the end tags.
content = content.replace(`</section> </div> </div> </div> </article>`, `</section>\n\n</div>\n</div>\n</div>\n</article>`);
// Wait, where is `</div>` for `blog-content`?
// In `ai-agent-use-cases`, the conclusion is INSIDE `<div class="blog-content">`?
// No, looking at my previous read of `ai-agent-use-cases...md`:
// ```html
// 168: </article>
// 169: 
// 170: <section class="os-card" style="..."> <h2 id="conclusion" ...> Bringing It All Together </h2> ... </section>
// 171: ... </div> </section>
// 173: 
// 174: </div>
// 175: </div>
// 176: </div>
// 177: </article>
// ```
// Ah! It closes `</article>`, then does `<section>`, then `</div> </div> </div> </article>`.
// So it seems `blog-content` is closed by one of those `</div>`s!
// In our file, we opened `<div class="blog-content">` but did we close it?
// Let's just make the end of our file exactly:
// `</section>\n\n</div>\n</div>\n</div>\n</article>`
content = content.replace(/<\/section> <\/div> <\/div> <\/div> <\/article>\s*$/, `</section>\n\n</div>\n</div>\n</div>\n</article>\n`);


fs.writeFileSync(filePath, content, 'utf8');
console.log("HTML structure fixed.");
