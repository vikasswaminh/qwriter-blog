const fs = require('fs');

const files = ['src/content/blog/what-is-an-ai-workforce.md'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Header and main layout
  content = content.replace(/padding-top: var\(--spacing-48\); padding-bottom: 100px;/g, 'padding-top: var(--spacing-24); padding-bottom: 40px;');
  content = content.replace(/margin-bottom: var\(--spacing-24\); display: flex/g, 'margin-bottom: var(--spacing-12); display: flex');
  content = content.replace(/margin-bottom: var\(--spacing-48\); border-bottom: 1px solid var\(--border-medium\); padding-bottom: var\(--spacing-32\);/g, 'margin-bottom: var(--spacing-24); border-bottom: 1px solid var(--border-medium); padding-bottom: var(--spacing-16);');
  content = content.replace(/margin-bottom: var\(--spacing-24\); color: var\(--ink-black\);/g, 'margin-bottom: var(--spacing-12); color: var(--ink-black);');
  content = content.replace(/margin-bottom: var\(--spacing-24\);">/g, 'margin-bottom: var(--spacing-12);">');
  content = content.replace(/margin-bottom: var\(--spacing-32\);"><span/g, 'margin-bottom: var(--spacing-16);"><span');

  // TLDR block
  content = content.replace(/padding: 28px; margin-bottom: var\(--spacing-32\);/g, 'padding: 20px; margin-bottom: var(--spacing-16);');

  // Key Takeaways block
  content = content.replace(/section style="margin-bottom: 24px;"/g, 'section style="margin-bottom: 16px;"');
  content = content.replace(/margin-bottom: 24px;">Key Takeaways/g, 'margin-bottom: 16px;">Key Takeaways');
  content = content.replace(/padding: 24px; box-shadow: var\(--shadow-sm\);/g, 'padding: 16px; box-shadow: var(--shadow-sm);');

  // Article content container
  content = content.replace(/gap: var\(--spacing-32\);/g, 'gap: var(--spacing-16);');
  content = content.replace(/padding: 24px 32px;/g, 'padding: 16px 24px;');

  // H2 and P in article
  content = content.replace(/margin-top: 40px; margin-bottom: 20px;/g, 'margin-top: 24px; margin-bottom: 12px;');
  content = content.replace(/margin-bottom: 16px; font-size: 1.1rem;/g, 'margin-bottom: 12px; font-size: 1.1rem;');

  // FAQ section
  content = content.replace(/margin-top: 48px;">\n<h2 id="faq"/g, 'margin-top: 24px;">\n<h2 id="faq"');
  content = content.replace(/margin-bottom: 24px; color: var\(--ink-black\);/g, 'margin-bottom: 16px; color: var(--ink-black);');
  content = content.replace(/padding: 20px 24px;/g, 'padding: 12px 16px;');
  content = content.replace(/padding: 24px; background:/g, 'padding: 16px; background:');

  fs.writeFileSync(file, content);
}
