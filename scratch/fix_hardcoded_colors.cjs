const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/styles/global.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace linear gradients containing pinks/purples with amber/neutral gradients
css = css.replace(/linear-gradient\(to right, #f472b6, #a81c85\)/g, 'var(--accent)');
css = css.replace(/linear-gradient\(to right, #3b82f6, #1d4ed8\)/g, 'var(--accent)');
css = css.replace(/linear-gradient\(135deg, #1e3a8a, #d97706\)/g, 'linear-gradient(135deg, var(--text), var(--accent))');

// Replace hardcoded fuchsia/pink hex codes
css = css.replace(/#a81c85/g, 'var(--accent-hover)');
css = css.replace(/#c13584/g, 'var(--accent-hover)');
css = css.replace(/#fce7f3/g, 'var(--bg-subtle)');
css = css.replace(/#fbcfe8/g, 'var(--border-strong)');
css = css.replace(/#fdf2f8/g, 'var(--bg-soft)');

fs.writeFileSync(cssPath, css);
console.log('Replaced hardcoded colors in global.css');
