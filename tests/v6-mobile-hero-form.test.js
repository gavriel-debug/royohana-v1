const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const page = fs.readFileSync(path.join(__dirname, '..', 'ohana-team-v6-dark-ledger-properties.html'), 'utf8');

assert.ok(page.includes("if (!REDUCE && heroInner && y < vh && window.innerWidth >= 761){"), 'Hero fade must run only above the mobile breakpoint');
assert.ok(page.includes("heroInner.style.opacity = '';"), 'Mobile must clear any inherited hero fade opacity');
assert.ok(page.includes("heroInner.style.transform = '';"), 'Mobile must clear any inherited hero parallax transform');

console.log('V6 mobile hero form visibility checks: passed');
