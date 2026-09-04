const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

const tagMapping = {
  'what-are-ai-agents-complete-guide-for-businesses-2026.md': "['AI Agents Business Guide', 'Enterprise AI Adoption', 'Autonomous AI']",
  'ai-agents-vs-ai-assistants-whats-the-difference.md': "['AI Agents vs Assistants', 'Generative AI', 'Agentic Workflows']",
  'ai-automation-how-businesses-can-automate-workflows-with-ai.md': "['AI Workflow Automation', 'Business Process Automation', 'AI Workforce']",
  'best-ai-tools-for-business-2026.md': "['Best AI Tools 2026', 'Enterprise AI Software', 'Business AI Solutions']",
  'what-is-an-ai-workforce.md': "['AI Workforce Strategy', 'AI Employees', 'Future of Work']",
  'agentic-ai.md': "['Agentic AI Explained', 'Autonomous Systems', 'AI Innovation']",
  'multi-agent-systems-what-they-are-and-how-they-work.md': "['Multi-Agent Systems', 'Swarm AI', 'Agent Orchestration']",
  'ai-agent-security-risks-threats-and-best-practices.md': "['AI Agent Security', 'Prompt Injection Defense', 'AI Governance']"
};

for (const [file, newTags] of Object.entries(tagMapping)) {
  const filePath = path.join(blogDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the tags line in frontmatter
    // Match tags: ['old tags'] or tags: ["old tags"]
    content = content.replace(/tags:\s*\[.*?\]/, `tags: ${newTags}`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated tags for ${file}`);
  }
}
