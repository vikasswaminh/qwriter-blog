const fs = require('fs');

const raw = fs.readFileSync('scratch.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const headingsList = [
  "Everyone's Saying \"Agentic\" Now. Almost Nobody Agreed on What It Means First.",
  "What \"Agentic\" Actually Means",
  "Agentic AI, AI Agents, Assistants, and Automation: Untangling the Terms",
  "What's Actually Running Under the Hood",
  "Why \"Autonomous\" Never Means \"Unsupervised” And Why That's a Feature, not a Flaw",
  "Why 2026 Specifically",
  "Where Agentic AI Is Actually Working Right Now",
  "What Agentic AI Looks Like Depending on the Size and Shape of Your Business",
  "Multi-Agent Systems: When One Agent Isn't the Whole Answer",
  "The Honest Risks Nobody Puts in the Demo",
  "A Practical Way to Adopt This Without Getting Burned",
  "What to Actually Look for If You're Evaluating a Platform",
  "How to Spot a Real Agentic System from Marketing Dressed Up as One",
  "Where This Is Headed",
  "Bringing It All Together"
];

let parsed = {
  tldr: '',
  sections: [],
  faqs: []
};

let state = 'start';
let currentSection = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (headingsList.includes(line)) {
    state = 'after_frontmatter';
    currentSection = { heading: line, paragraphs: [] };
    parsed.sections.push(currentSection);
    continue;
  }

  if (line.startsWith('title: “')) {
    state = 'frontmatter';
  }
  if (state === 'frontmatter') {
    if (line.startsWith('readTime:')) {
      state = 'after_frontmatter';
    }
    continue;
  }
  
  if (line === 'TL;DR') {
    state = 'tldr';
    continue;
  } else if (line === 'Key Takeaways') {
    state = 'key_takeaways';
    continue;
  } else if (line === 'Frequently Asked Questions') {
    state = 'faqs';
    continue;
  }
  
  if (state === 'tldr') {
    parsed.tldr += line + ' ';
  } else if (state === 'key_takeaways') {
    // Ignore, we hardcoded them
  } else if (state === 'faqs') {
    if (line.endsWith('?')) {
      parsed.faqs.push({ q: line, a: '' });
    } else if (parsed.faqs.length > 0) {
      parsed.faqs[parsed.faqs.length - 1].a += line + ' ';
    }
  } else if (state === 'after_frontmatter' || state === 'start') {
    // skip the intro meta line
    if (line.includes('20 min read · Updated')) continue; 
    
    if (!currentSection) {
      currentSection = { heading: '', paragraphs: [] };
      parsed.sections.push(currentSection);
    }
    currentSection.paragraphs.push(line);
  }
}

const manualTakeaways = [
  { title: "Agentic AI goes beyond generative AI by planning and acting", desc: "Agentic AI doesn't just generate answers. It can perceive information, reason through a goal, plan multiple steps, use external tools, act, and continuously adjust based on feedback." },
  { title: "Agentic AI works through a perceive → reason → plan → act → feedback loop", desc: "A real agentic system combines goals, perception, memory, reasoning, planning, tool use, action, and feedback. This architecture is what separates an AI agent from a basic chatbot or assistant." },
  { title: "Agentic AI is different from AI assistants and traditional automation", desc: "Generative AI responds to prompts, assistants help humans’ complete tasks, and traditional automation follows predefined rules. Agentic AI can independently decide what steps to take toward a defined goal, making it more flexible for complex workflows." },
  { title: "Businesses are using agentic AI for sales, marketing, support, research, and operations", desc: "High-value use cases include AI-powered sales research, lead and pipeline monitoring, SEO auditing, customer-support triage, competitive research, invoice reconciliation, compliance monitoring, and recurring business workflows." },
  { title: "Successful agentic AI adoption requires human oversight, security, and clear boundaries", desc: "The strongest approach isn't completely unsupervised AI. Businesses should use approval gates, least-privilege access, audit logs, defined scopes, shadow testing, and human ownership for consequential actions." }
];

const yaml = `---
title: "Agentic AI: What It Is, How It Works, and Why It Matters in 2026"
description: "Agentic AI isn't another chatbot upgrade system. It’s software that plans, decides, and acts on its own. Here's what agentic AI means, how it works under the hood, and why 2026 is the year it stopped being a buzzword and started running real businesses."
pubDate: 2026-08-27
author: "OllaSuper Systems Engineering"
cover: "/ai_workforce.jpg"
tags: ["AI Workforce / Applied AI Fundamentals"]
---

<article class="os-section" style="background: var(--warm-cream); padding-top: var(--spacing-48); padding-bottom: 100px;">
<div class="os-container" style="max-width: 1400px; margin: 0 auto; width: 100%; padding: 0 40px;">
  <nav aria-label="Breadcrumb" class="os-small" style="color: var(--ink-muted); margin-bottom: var(--spacing-24); display: flex; gap: var(--spacing-8); align-items: center;">
    <a href="/" style="color: inherit; text-decoration: none;">Home</a> <span>/</span> <a href="/blog" style="color: inherit; text-decoration: none;">Blog</a> <span>/</span> <span style="color: var(--ink-black); font-weight: 600;">AI Workforce / Applied AI Fundamentals</span>
  </nav>

  <header style="margin-bottom: var(--spacing-48); border-bottom: 1px solid var(--border-medium); padding-bottom: var(--spacing-32); width: 100%;">
    <div class="os-caption" style="display: flex; gap: var(--spacing-12); font-weight: 700; color: var(--candy-pink-hover); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: var(--spacing-16); align-items: center; flex-wrap: wrap;">
      <span class="os-badge os-badge-pink">AI Workforce / Applied AI Fundamentals</span> <span>•</span> <span>2026-08-27</span> <span>•</span> <span>20 min read</span>
    </div>
    <h1 class="os-display" style="margin-bottom: var(--spacing-24); color: var(--ink-black);">Agentic AI: What It Is, How It Works, and Why It Matters in 2026</h1>
    <p class="os-lead" style="max-width: 1000px; margin-bottom: var(--spacing-24);">Agentic AI isn't another chatbot upgrade system. It’s software that plans, decides, and acts on its own. Here's what agentic AI means, how it works under the hood, and why 2026 is the year it stopped being a buzzword and started running real businesses.</p>
  </header>

<div class="blog-layout-grid">
<aside class="blog-sidebar">
<nav style="margin-bottom: var(--spacing-32);">
<span style="display: inline-block; padding: 4px 10px; font-size: 10px; font-weight: 800; color: #ffffff; background: linear-gradient(to right, #f472b6, #a81c85); border-radius: 9999px; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase;">TABLE OF CONTENTS</span>
<div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
<a href="#tldr" class="os-toc-link">TL;DR Summary</a>
<a href="#key-takeaways" class="os-toc-link">Key Takeaways</a>
${parsed.sections.filter(s => s.heading).map(s => `<a href="#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="os-toc-link">${s.heading}</a>`).join('\n')}
<a href="#faq" class="os-toc-link">Frequently Asked Questions</a>
</div>
</nav>
</aside>

<div class="blog-main-column">

<section style="background: #ffffff; border: 1px solid var(--border-medium); border-left: 5px solid var(--candy-pink); border-radius: 10px; padding: 28px; margin-bottom: var(--spacing-32); box-shadow: var(--shadow-sm);">
<h3 id="tldr" style="font-size: 1.2rem; font-weight: 800; color: #a81c85; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><span>⚡</span> TL;DR</h3>
<p class="html-content" style="font-size: 1.1rem; line-height: 1.7; color: var(--ink-black); margin: 0;">${parsed.tldr.trim()}</p>
</section>

<section style="margin-bottom: 24px;">
<h3 id="key-takeaways" style="font-size: 1.5rem; font-weight: 800; color: var(--ink-black); margin-bottom: 24px;">Key Takeaways</h3>
<div style="display: flex; flex-direction: column; gap: 16px;">
${manualTakeaways.map(tk => {
  return `<div style="background: #ffffff; border: 1px solid var(--border-medium); border-left: 4px solid var(--candy-pink); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
<h4 style="font-size: 1.15rem; font-weight: 800; color: var(--ink-black); margin-bottom: 12px;">${tk.title}</h4>
<p class="html-content" style="font-size: 1.05rem; line-height: 1.6; color: var(--ink-secondary); margin: 0;">${tk.desc}</p>
</div>`;
}).join('\n')}
</div>
</section>

<div class="blog-content" style="display: flex; flex-direction: column; gap: var(--spacing-32); line-height: 1.8; font-size: 1.08rem; color: var(--ink-secondary);">
<article class="os-article-content" style="padding: 24px 32px; background: #ffffff; border: 1px solid var(--border-medium); border-radius: var(--radius-lg);">

${parsed.sections.map(s => {
  let html = '';
  if (s.heading) {
    const id = s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    html += `<h2 id="${id}" class="os-h2" style="margin-top: 40px; margin-bottom: 20px; color: var(--ink-black);">${s.heading}</h2>\n`;
  }
  
  html += s.paragraphs.map(p => `<p style="margin-bottom: 16px; font-size: 1.1rem; line-height: 1.7; color: var(--ink-secondary);">${p}</p>`).join('\n');
  return html;
}).join('\n')}

</article>

<section class="os-faq" style="margin-top: 48px;">
<h2 id="faq" class="os-h2" style="margin-bottom: 24px; color: var(--ink-black); font-size: 2rem; font-weight: 800;">Frequently Asked Questions</h2>
<div style="display: flex; flex-direction: column; gap: 16px;">
${parsed.faqs.map(faq => `
<details class="os-faq-item" style="border: 1px solid var(--candy-pink); border-radius: var(--radius-md); background: var(--bg-cream-alt); overflow: hidden;">
<summary style="padding: 20px 24px; font-size: 1.1rem; font-weight: 700; color: var(--ink-black); cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; user-select: none;">
${faq.q} <span class="os-faq-icon" style="color: var(--candy-pink); font-size: 1.5rem; font-weight: 300; transition: transform 0.3s ease;">+</span>
</summary>
<div style="padding: 24px; background: var(--candy-pink-soft); font-size: 1.05rem; line-height: 1.7; color: var(--ink-secondary); border-top: 1px solid var(--candy-pink);">
<p style="margin: 0;">${faq.a.trim()}</p>
</div>
</details>`).join('\n')}
</div>
</section>

</div>
</div>
</div>
</article>
`;

fs.writeFileSync('src/content/blog/agentic-ai.md', yaml);
console.log("Successfully generated agentic-ai.md");
