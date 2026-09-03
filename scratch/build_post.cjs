const fs = require('fs');

const rawContent = fs.readFileSync('/Users/hirakdebnath/Downloads/qwriter-blog/scratch/new_post_raw.txt', 'utf8');
const lines = rawContent.split('\n');

const frontmatter = `---
title: "AI Agent Security: Risks, Threats, and Best Practices"
description: "AI agents don't just talk, they act. They send emails, touch CRMs, and move data. Here's the real threat landscape behind agentic AI, from prompt injection to excessive agency, and the practical, unglamorous framework for deploying agents safely."
pubDate: 2026-09-02
author: 'OllaSuper Systems Engineering'
tags: ['Security & Governance']
cover: "/agentic_ai_cover.jpg"
---

<article class="os-section" style="background: var(--warm-cream); padding-top: var(--spacing-48); padding-bottom: 100px;"> <div class="os-container" style="max-width: 1400px; margin: 0 auto; width: 100%; padding: 0 40px;">  <nav aria-label="Breadcrumb" class="os-small" style="color: var(--ink-muted); margin-bottom: var(--spacing-24); display: flex; gap: var(--spacing-8); align-items: center;"> <a href="/" style="color: inherit; text-decoration: none;">Home</a> <span>/</span> <a href="/blog" style="color: inherit; text-decoration: none;">Blog</a> <span>/</span> <span style="color: var(--ink-black); font-weight: 600;">Security & Governance</span> </nav>  <header style="margin-bottom: var(--spacing-48); border-bottom: 1px solid var(--border-medium); padding-bottom: var(--spacing-32); width: 100%;"> <div class="os-caption" style="display: flex; gap: var(--spacing-12); font-weight: 700; color: var(--candy-pink-hover); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: var(--spacing-16); align-items: center; flex-wrap: wrap;"> <span class="os-badge os-badge-pink">Security & Governance</span> <span>•</span> <span>2026-09-02</span> <span>•</span> <span>21 min read</span> </div> <h1 class="os-display" style="margin-bottom: var(--spacing-24); color: var(--ink-black);"> AI Agent Security: Risks, Threats, and Best Practices </h1> <p class="os-lead" style="max-width: 1000px; margin-bottom: var(--spacing-24);"> AI agents don't just talk, they act. They send emails, touch CRMs, and move data. Here's the real threat landscape behind agentic AI, from prompt injection to excessive agency, and the practical, unglamorous framework for deploying agents safely. </p>  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding-top: var(--spacing-16); border-top: 1px solid var(--border-light);"> <div style="display: flex; align-items: center; gap: var(--spacing-12);"> <div style="width: 38px; height: 38px; border-radius: 50%; background: transparent; border: 1px solid var(--candy-pink-border); display: flex; align-items: center; justify-content: center; font-size: 18px;"> ⚡ </div> <div> <div class="os-small" style="font-weight: 700; color: var(--ink-black);">OllaSuper Systems Engineering</div> <div class="os-caption"><a href="/blog/what-is-an-ai-workforce" class="internal-link">AI Workforce</a> Architecture</div> </div> </div> <div style="display: flex; flex-wrap: wrap; gap: 6px;"> <span style="font-weight: 800; font-size: 0.95rem; color: var(--ink-black);"> #AI agent security </span><span style="font-weight: 800; font-size: 0.95rem; color: var(--ink-black);"> #prompt injection </span><span style="font-weight: 800; font-size: 0.95rem; color: var(--ink-black);"> #agentic AI security </span><span style="font-weight: 800; font-size: 0.95rem; color: var(--ink-black);"> #securing AI agents </span> </div> </div> </header> <div class="blog-layout-grid"> <aside class="blog-sidebar">  <nav style="margin-bottom: var(--spacing-32);"> <span style="display: inline-block; padding: 4px 10px; font-size: 10px; font-weight: 800; color: #ffffff; background: linear-gradient(to right, #f472b6, #a81c85); border-radius: 9999px; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase;"> TABLE OF CONTENTS </span> <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;"> <a href="#tldr" class="os-toc-link active" style="display: block; padding: 8px 12px; border-radius: 6px; color: var(--ink-secondary); text-decoration: none; font-size: 0.85rem; line-height: 1.3; transition: all 0.15s ease;"> TL;DR </a><a href="#key-takeaways" class="os-toc-link" style="display: block; padding: 8px 12px; border-radius: 6px; color: var(--ink-secondary); text-decoration: none; font-size: 0.85rem; line-height: 1.3; transition: all 0.15s ease;"> Key Takeaways </a>
`;

function generateId(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

let tocHTML = '';
let bodyHTML = `</div> </nav> <div style="padding: 16px; background: var(--candy-pink-soft); border-radius: 8px; border: 1px solid var(--candy-pink-border); margin-top: 24px;"> <div style="font-weight: 800; color: var(--ink-black); margin-bottom: 8px; font-size: 0.9rem; text-transform: uppercase;">Build Your AI Workforce</div> <p style="font-size: 0.9rem; color: var(--ink-secondary); margin-bottom: 12px; line-height: 1.5;">OllaSuper lets you deploy autonomous agents that securely connect to your existing tools.</p> <a href="https://ollasuper.com/signup" class="os-btn os-btn-primary" style="display: block; text-align: center; font-size: 0.9rem; padding: 8px 12px; width: 100%; border-radius: 6px;">Start Building Free →</a> </div> </aside> <div class="blog-main-column"> <div class="os-article-content"> <h2 id="tldr" class="os-h2" style="margin-bottom: 20px; color: var(--ink-black);">TL;DR</h2>`;

let inTldr = false;
let inKeyTakeaways = false;
let inFaq = false;
let contentStart = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line === 'TL;DR') {
        inTldr = true;
        continue;
    }
    
    if (inTldr) {
        if (line.startsWith('title:')) {
            inTldr = false;
            continue;
        }
        bodyHTML += `<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.7; color: var(--ink-secondary);">${line}</p>`;
        continue;
    }

    if (line === 'Key Takeaways') {
        inKeyTakeaways = true;
        bodyHTML += `<h2 id="key-takeaways" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var(--ink-black);">Key Takeaways</h2> <div style="background: var(--bg-cream-alt); border-left: 4px solid var(--candy-pink); padding: 24px; border-radius: 8px; margin-bottom: 32px;">`;
        continue;
    }

    if (inKeyTakeaways) {
        if (line === 'The Word Everyone\'s Throwing Around This Year') {
            inKeyTakeaways = false;
            bodyHTML += `</div>`;
            contentStart = true;
        } else {
            const listMatch = line.match(/^(\d+)\.\s*(.*)/);
            if (listMatch) {
                bodyHTML += `<div style="display: flex; gap: 12px; margin-bottom: 16px;"> <div style="color: var(--candy-pink); font-weight: 800; font-size: 1.1rem; min-width: 24px;">${listMatch[1]}.</div> <div style="color: var(--ink-secondary); font-size: 1.05rem; line-height: 1.6;">${listMatch[2]}</div> </div>`;
            }
            continue;
        }
    }

    if (contentStart) {
        if (line === 'Frequently Asked Questions') {
            inFaq = true;
            const id = generateId(line);
            tocHTML += `<a href="#${id}" class="os-toc-link" style="display: block; padding: 8px 12px; border-radius: 6px; color: var(--ink-secondary); text-decoration: none; font-size: 0.85rem; line-height: 1.3; transition: all 0.15s ease;"> ${line} </a>\n`;
            bodyHTML += `<h2 id="${id}" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var(--ink-black);">${line}</h2>\n`;
            continue;
        }

        if (inFaq) {
            if (line === 'Bringing It All Together') {
                inFaq = false;
                const id = generateId(line);
                tocHTML += `<a href="#${id}" class="os-toc-link" style="display: block; padding: 8px 12px; border-radius: 6px; color: var(--ink-secondary); text-decoration: none; font-size: 0.85rem; line-height: 1.3; transition: all 0.15s ease;"> ${line} </a>\n`;
                bodyHTML += `\n<h2 id="${id}" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var(--ink-black);">${line}</h2>\n`;
                continue;
            }
            
            if (line.endsWith('?')) {
                bodyHTML += `<details class="os-faq-item">\n<summary>${line}</summary>\n<div class="faq-content">\n`;
            } else if (line.match(/^[A-Z]/)) {
                bodyHTML += `<p style="margin: 0;">${line}</p>\n</div>\n</details>`;
            }
            continue;
        }

        if (line === 'Add this blog without modifying or reducing or changing the blog content') {
            continue;
        }

        if (line.length < 100 && !line.includes('.') && !line.includes('?') || line.startsWith('The Word Everyone\'s Throwing') || line.startsWith('What "AI Agent Security"') || line.startsWith('Why This Conversation Is Suddenly Urgent')) {
            const id = generateId(line);
            tocHTML += `<a href="#${id}" class="os-toc-link" style="display: block; padding: 8px 12px; border-radius: 6px; color: var(--ink-secondary); text-decoration: none; font-size: 0.85rem; line-height: 1.3; transition: all 0.15s ease;"> ${line} </a>\n`;
            bodyHTML += `<h2 id="${id}" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var(--ink-black);">${line}</h2>\n`;
        } else {
            bodyHTML += `<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.7; color: var(--ink-secondary);">${line}</p>\n`;
        }
    }
}

bodyHTML += `
<section class="os-card" style="background: var(--candy-pink-soft); border-left: 5px solid var(--candy-pink); padding: 24px 28px; border-radius: var(--radius-lg); margin-top: 24px; box-shadow: var(--shadow-sm);"> <h2 id="cta" class="os-h2" style="margin-bottom: 12px; color: var(--ink-black); font-size: 1.75rem; font-weight: 800;"> Deploy Your Agentic Architecture </h2> <div style="display: flex; flex-direction: column; gap: 16px; color: var(--ink-secondary); font-size: 1.1rem; line-height: 1.7;"> <p class="html-content" style="margin: 0;">OllaSuper offers robust, secure deployment for autonomous AI systems with built-in audit logging and human approval gates.</p> </div> <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 32px;"> <a href="https://ollasuper.com/signup" class="os-btn os-btn-primary" style="display: inline-flex; align-items: center; justify-content: center; text-align: center; font-weight: 700; padding: 14px 36px; height: 52px; font-size: 1.1rem; box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4); border-radius: 8px; text-decoration: none; color: var(--ink-black) !important;">
Get Started Today →
</a> </div> </section>

</div>
</div>
</div>
</article>
`;

fs.writeFileSync('/Users/hirakdebnath/Downloads/qwriter-blog/src/content/blog/ai-agent-security-risks-threats-and-best-practices.md', frontmatter + tocHTML + bodyHTML);
console.log("Done");
