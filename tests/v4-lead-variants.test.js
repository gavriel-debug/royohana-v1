const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEBHOOK = 'https://hook.eu2.make.com/m82s8mnnkgq4zdu4nvr7nwdb7nkjsnhl';
const FIELDS = ['name="name"', 'name="phone"', 'name="email"', 'name="reason"', 'name="message"'];
const variants = [
  ['ohana-team-v4-hero-form.html', 'hero-lead-card'],
  ['ohana-team-v4-scroll-popup.html', 'scroll-lead-modal']
];

for (const [file, experienceClass] of variants) {
  const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.ok(html.includes(WEBHOOK), `${file} must submit to the existing Make webhook`);
  for (const field of FIELDS) {
    assert.ok(html.includes(field), `${file} is missing the ${field} lead field`);
  }
  assert.ok(html.includes('class="lead-form"'), `${file} must use the shared lead form behavior`);
  assert.ok(html.includes(experienceClass), `${file} is missing its requested lead experience`);
  assert.ok(html.includes('id="contactForm"'), `${file} must preserve the footer contact form`);
}

console.log('V4 lead variants: passed');
