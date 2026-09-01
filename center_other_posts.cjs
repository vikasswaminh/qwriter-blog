const fs = require('fs');

const file = 'src/content/blog/what-is-an-ai-workforce.md';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Center the header
  content = content.replace(
    /<header style="margin-bottom: var\(--spacing-24\); border-bottom: 1px solid var\(--border-medium\); padding-bottom: var\(--spacing-16\); width: 100%;">/g,
    '<header style="text-align: center; margin-bottom: var(--spacing-24); border-bottom: 1px solid var(--border-medium); padding-bottom: var(--spacing-16); width: 100%;">'
  );

  // Center the lead paragraph
  content = content.replace(
    /<p class="os-lead" style="max-width: 1000px; margin-bottom: var\(--spacing-12\);">/g,
    '<p class="os-lead" style="margin-left: auto; margin-right: auto; max-width: 1000px; margin-bottom: var(--spacing-12);">'
  );

  fs.writeFileSync(file, content);
}
