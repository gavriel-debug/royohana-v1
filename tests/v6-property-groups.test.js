const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pagePath = path.join(root, 'ohana-team-v6-dark-ledger-properties.html');
const dataPath = path.join(root, 'assets', 'properties-v6.js');

assert.ok(fs.existsSync(pagePath), 'The dark-ledger property comparison page must exist');
assert.ok(fs.existsSync(dataPath), 'The V6 property data must be isolated from earlier pages');

const page = fs.readFileSync(pagePath, 'utf8');
const data = fs.readFileSync(dataPath, 'utf8');
const v5 = fs.readFileSync(path.join(root, 'ohana-team-v5-floating-ledger.html'), 'utf8');

assert.ok(page.includes('<script src="assets/properties-v6.js?v=20260830-triplex-rooms"></script>'), 'V6 must load its refreshed versioned property data');
assert.ok(page.includes('class="property-group"'), 'Listings must be rendered in labeled property groups');
assert.ok(page.includes('properties-group-grid'), 'Each group must render as its own property row');
assert.ok(!page.includes('Featured Property'), 'Property image labels must be removed');
assert.ok(data.includes("title: 'PRIVATE HOUSES'"), 'Private houses must have a dedicated row title');
assert.ok(data.includes("title: 'APARTMENTS'"), 'Apartments must have a dedicated row title');
assert.equal((data.match(/title: 'Private House'/g) || []).length, 3, 'All three private-house cards must use the same Private House title');
assert.ok(!data.includes("title: 'Private Residence'"), 'Private-house cards must not use the Residence title');
assert.ok(!data.includes("title: 'Semi-Detached Residence'"), 'Private-house cards must not use the Semi-Detached Residence title');
assert.ok(data.includes("title: 'Briga Yam'"), 'The Briga Yam apartment title must not include Triplex');
assert.ok(!data.includes("title: 'Briga Yam Triplex'"), 'The Briga Yam apartment title must not include Triplex');
const apartments = data.slice(data.indexOf("title: 'APARTMENTS'"));
const firstApartment = apartments.indexOf("specs: ['Apartment - 5 Rooms', '180 m²'");
const triplex = apartments.indexOf("specs: ['Triplex - 6 Rooms', '232 m²'");
const secondApartment = apartments.indexOf("specs: ['Apartment - 5 Rooms', '148 m²'");
assert.ok(firstApartment >= 0 && triplex > firstApartment && secondApartment > triplex, 'Apartment types must replace the 5 Rooms label in the requested order');
assert.ok(data.includes("location: 'Ramat Poleg · Moshe Sneh St.'"), 'The new Moshe Sneh house must use the supplied location');
assert.ok(data.includes("image: 'assets/property-moshe-sneh.webp'"), 'The Moshe Sneh listing must use its optimized WebP photo');
assert.ok(data.includes("specs: ['5 Rooms', '250 m² Lot', '230 m² Built', '3 Levels']"), 'The new Moshe Sneh house must use the supplied details');
assert.ok(data.includes("specs: ['7 Rooms', '292 m² Lot', '272 m² Built', '4 Levels']"), 'The Sachlav house must use the corrected lot and built-area figures');
assert.ok(!data.includes('Galey HaYam Residence'), 'Galey HaYam must not appear in the new property data');
assert.ok(!data.includes('Ehud Manor 7'), 'Building numbers must be removed from property locations');
assert.ok(!v5.includes('properties-v6.js'), 'The approved V5 page must remain unchanged');

console.log('V6 property group checks: passed');
