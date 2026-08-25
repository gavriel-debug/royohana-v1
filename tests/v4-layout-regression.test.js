const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const hero = fs.readFileSync(path.join(__dirname, '..', 'ohana-team-v4-hero-form.html'), 'utf8');
const popup = fs.readFileSync(path.join(__dirname, '..', 'ohana-team-v4-scroll-popup.html'), 'utf8');

assert.ok(hero.includes('.hero--lead{ height:auto; min-height:100svh; overflow:visible; align-items:flex-start; }'), 'Hero must grow naturally instead of clipping its form');
assert.ok(hero.includes('@media (max-width:1120px){ .hero--lead .hero-layout{ grid-template-columns:1fr; }'), 'Hero must stack before the layout becomes cramped');
assert.ok(!hero.includes('<ul class="hero-lead-trust"'), 'Hero form must remain compact and focused');
assert.ok(hero.includes('.hero-lead-card{ width:min(100%,390px);'), 'Hero form must stay visually secondary to the hero message');
assert.ok(!hero.includes("--f-display:'Prata'"), 'Hero must not globally replace display typography and distort existing layouts');

assert.ok(popup.includes('@media (max-width:900px){ .scroll-lead-layout{ grid-template-columns:1fr; }'), 'Popup must stack its content before it becomes cramped');
assert.ok(!popup.includes("--f-display:'Prata'"), 'Popup must not globally replace display typography and distort existing layouts');

console.log('V4 layout regression checks: passed');
