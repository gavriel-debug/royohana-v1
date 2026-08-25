const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'ohana-team-v5-floating-ledger.html');
assert.ok(fs.existsSync(pagePath), 'The floating-ledger comparison page must exist');

const page = fs.readFileSync(pagePath, 'utf8');
const v4 = fs.readFileSync(path.join(__dirname, '..', 'ohana-team-v4-hero-form.html'), 'utf8');

assert.ok(page.includes('<section class="hero hero--ledger" id="home">'), 'The comparison page must use the dedicated ledger hero treatment');
assert.ok(page.includes('<aside class="hero-ledger-card" aria-labelledby="heroLeadTitle">'), 'The lead form must live in the floating ledger card');
assert.ok(page.includes('background:linear-gradient(145deg,rgba(7,26,68,.78),rgba(9,38,82,.72));'), 'The ledger card must use a transparent navy-glass surface');
assert.ok(page.includes('@media (min-width:761px){ .hero-ledger-card{ transform:translateY(58px); } }'), 'The ledger card must cross the hero edge on desktop');
assert.ok(page.includes('.hero-ledger-card{ transform:none;'), 'The ledger card must not overlap surrounding sections on mobile');
assert.ok(page.includes('<form class="lead-form" data-source="Hero consultation form" novalidate>'), 'The ledger form must retain the existing lead source and validation behavior');
assert.ok(!v4.includes('hero--ledger'), 'The approved V4 hero form must remain unchanged');

console.log('V5 floating ledger checks: passed');
