// ─────────────────────────────────────────────────────────────────────────────
//  PER-PROJECT BRANDING  ·  the ONLY file that changes between blog repos.
//  Owner-locked via CODEOWNERS — the SEO team does not edit this (see CONTRIBUTING.md).
// ─────────────────────────────────────────────────────────────────────────────
export const SITE = {
  brand: 'OllaSuper',
  title: 'OllaSuper Blog',
  description: 'Guides, tips, and product updates from the OllaSuper team.',
  url: 'https://blogs.ollasuper.com',
  marketingUrl: 'https://ollasuper.com',
  marketingLabel: 'ollasuper.com',
  author: 'OllaSuper Team',
  accent: '#ff83da', /* Official bright pink */
  tagline: 'Supercharge your workflow.',
  locale: 'en',
} as const;

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Tags', href: '/tags/' },
  { label: 'About', href: '/about/' },
];
