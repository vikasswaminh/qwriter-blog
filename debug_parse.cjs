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

let state = 'start';
let headingCount = 0;
let faqsCount = 0;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (line.startsWith('title: “')) state = 'frontmatter';
  if (state === 'frontmatter') {
    if (line.startsWith('readTime:')) state = 'after_frontmatter';
    continue;
  }
  
  if (line === 'TL;DR') { state = 'tldr'; continue; }
  else if (line === 'Key Takeaways') { state = 'key_takeaways'; continue; }
  else if (line === 'Frequently Asked Questions') { state = 'faqs'; continue; }
  
  if (state === 'after_frontmatter' || state === 'start') {
    if (headingsList.includes(line)) {
      headingCount++;
      // console.log("Found heading:", line);
    }
  } else if (state === 'faqs') {
    faqsCount++;
  }
}
console.log("Found headings:", headingCount);
console.log("Found faqs lines:", faqsCount);
console.log("Lines array length:", lines.length);

