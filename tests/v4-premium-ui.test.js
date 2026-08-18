const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pages = [
  ['ohana-team-v4-hero-form.html', 'hero-lead-trust'],
  ['ohana-team-v4-scroll-popup.html', 'scroll-lead-layout']
];

for (const [file, signature] of pages) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.ok(html.includes("--f-sans:'Manrope'"), `${file} must use Manrope for interface text`);
  assert.ok(html.includes("--f-display:'Prata'"), `${file} must use Prata for display type`);
  assert.ok(html.includes('--lead-surface'), `${file} must define the shared premium form palette`);
  assert.ok(html.includes(signature), `${file} is missing its premium lead experience`);
  assert.ok(html.includes('@media (max-width:640px)'), `${file} needs a mobile-specific lead layout`);
}

console.log('V4 premium UI system: passed');
