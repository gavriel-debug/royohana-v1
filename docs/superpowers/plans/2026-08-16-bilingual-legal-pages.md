# Bilingual Legal Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add bilingual Terms of Use, Privacy Policy, and Accessibility Statement pages to the Ohana Team V3 landing page, with clear footer and form links.

**Architecture:** Create a shared `legal.css` stylesheet and three standalone HTML documents: `terms.html`, `privacy.html`, and `accessibility.html`. Every document contains English and Hebrew sections with anchor-based language navigation, and `ohana-team-v3.html` supplies all site entry points.

**Tech Stack:** Static HTML5, CSS, existing Prata and Manrope Google Fonts, GitHub Pages.

## Global Constraints

- Use `Ohana Team` as the website owner.
- Use `roy@remax-n.co.il` for privacy and accessibility requests.
- Use `052-5550354` as the accessibility contact number.
- Use English and Hebrew on every legal page; Hebrew must have `lang="he" dir="rtl"` and English must have `lang="en"`.
- State that the documents are general website information, not legal advice or certification of legal compliance.
- Preserve the existing Make webhook, UserWay widget, and contact-form submission handler.

---

### Task 1: Create the shared legal layout and Terms of Use page

**Files:**
- Create: `legal.css`
- Create: `terms.html`

**Interfaces:**
- Consumes: existing V3 fonts, logo assets, and `ohana-team-v3.html` as the return destination.
- Produces: reusable `.legal-page`, `.legal-header`, `.language-switch`, `.legal-document`, `.language-section`, and `.legal-footer` styles.

- [ ] **Step 1: Verify that the new files do not exist yet**

```bash
node - <<'NODE'
const fs = require('fs');
for (const file of ['legal.css', 'terms.html']) {
  if (fs.existsSync(file)) throw new Error(`${file} already exists`);
}
NODE
```

- [ ] **Step 2: Create `legal.css`**

Use a cool-white background, dark navy header, Prata titles, Manrope body text, visible keyboard focus states, and responsive content width. Include these rules exactly as the shared base:

```css
:root{--legal-ink:#10243e;--legal-muted:#526375;--legal-surface:#fbfdff;--legal-line:rgba(16,36,62,.14);--legal-gold:#b58a4b;}
body{margin:0;background:radial-gradient(118% 92% at 50% 0%,#f7fafc 0%,#edf3f8 100%);color:var(--legal-ink);font-family:'Manrope',sans-serif;line-height:1.75;}
.legal-document{width:min(100% - 40px,860px);margin:0 auto;padding:72px 0 96px;}
.language-section{scroll-margin-top:24px;}
.language-section[lang="he"]{margin-top:72px;text-align:right;}
.language-switch a:focus-visible,.back-link:focus-visible{outline:3px solid var(--legal-gold);outline-offset:4px;}
```

Add a `@media (max-width:640px)` rule that reduces horizontal padding and title size while retaining 16px-or-larger body text.

- [ ] **Step 3: Create `terms.html`**

Create one H1: `Terms of Use / תנאי שימוש`. Include two sections:

```html
<section id="english" class="language-section" lang="en">...</section>
<section id="hebrew" class="language-section" lang="he" dir="rtl">...</section>
```

Both language sections must cover acceptance of terms; informational-only real-estate content; no professional, financial, legal, or tax advice; no guarantee of availability, price, or accuracy; intellectual property; third-party links; limitation of responsibility to the extent permitted by law; Israeli governing law; changes; and `roy@remax-n.co.il`. Add the statement that the document should be reviewed by the business's legal adviser before being relied upon as final legal terms.

- [ ] **Step 4: Verify Terms structure**

```bash
node - <<'NODE'
const fs = require('fs');
const css = fs.readFileSync('legal.css', 'utf8');
const html = fs.readFileSync('terms.html', 'utf8');
for (const token of ['.legal-document', '.language-section[lang="he"]']) if (!css.includes(token)) throw new Error(`Missing CSS ${token}`);
for (const token of ['id="english"', 'id="hebrew"', 'lang="he" dir="rtl"', 'roy@remax-n.co.il']) if (!html.includes(token)) throw new Error(`Missing Terms ${token}`);
NODE
```

- [ ] **Step 5: Commit Task 1**

```bash
git add legal.css terms.html
git commit -m "Add bilingual terms of use page"
```

### Task 2: Create Privacy Policy and Accessibility Statement pages

**Files:**
- Create: `privacy.html`
- Create: `accessibility.html`

**Interfaces:**
- Consumes: `legal.css`, contact details, form fields, Make, UserWay, Vimeo, OpenStreetMap, Google Fonts, and GitHub Pages.
- Produces: two standalone bilingual documents linked back to `ohana-team-v3.html`.

- [ ] **Step 1: Verify that the two documents do not exist yet**

```bash
node - <<'NODE'
const fs = require('fs');
for (const file of ['privacy.html', 'accessibility.html']) if (fs.existsSync(file)) throw new Error(`${file} already exists`);
NODE
```

- [ ] **Step 2: Create `privacy.html`**

Use the shared legal shell and English/Hebrew sections. In both languages state that the contact form collects name, phone number, email address, contact reason, message, page URL, submission timestamp, and voluntary campaign parameters. State that data is used to respond to enquiries and provide real-estate services; form submissions are sent through Make; and the site uses UserWay, Vimeo, OpenStreetMap, Google Fonts, and GitHub Pages, each under its own policy. State that Ohana Team does not sell personal information; access, correction, or deletion requests can be sent to `roy@remax-n.co.il`; and no transmission or storage method is completely secure. Include `Last updated: 16 August 2026` and `עודכן לאחרונה: 16 באוגוסט 2026`.

- [ ] **Step 3: Create `accessibility.html`**

Use the shared legal shell and English/Hebrew sections. In both languages state that Ohana Team works to make the site accessible; UserWay is available through its floating button as an assistive widget; the site includes keyboard-usable controls, descriptive alternative text where appropriate, semantic structure, responsive layouts, and readable contrast; and visitors can request accessible information via `roy@remax-n.co.il` or `052-5550354`. State that the page is a general accessibility statement and not a certification of legal compliance.

- [ ] **Step 4: Verify Privacy and Accessibility content**

```bash
node - <<'NODE'
const fs = require('fs');
const privacy = fs.readFileSync('privacy.html', 'utf8');
const accessibility = fs.readFileSync('accessibility.html', 'utf8');
for (const token of ['Make', 'UserWay', 'Vimeo', 'OpenStreetMap', 'Google Fonts', 'GitHub Pages', 'roy@remax-n.co.il', 'lang="he" dir="rtl"']) if (!privacy.includes(token)) throw new Error(`Missing Privacy ${token}`);
for (const token of ['UserWay', '052-5550354', 'roy@remax-n.co.il', 'lang="he" dir="rtl"']) if (!accessibility.includes(token)) throw new Error(`Missing Accessibility ${token}`);
NODE
```

- [ ] **Step 5: Commit Task 2**

```bash
git add privacy.html accessibility.html
git commit -m "Add bilingual privacy and accessibility pages"
```

### Task 3: Link the legal pages from V3

**Files:**
- Modify: `ohana-team-v3.html`

**Interfaces:**
- Consumes: `terms.html`, `privacy.html`, and `accessibility.html`.
- Produces: footer legal navigation and a non-blocking privacy notice next to the contact-form submit action.

- [ ] **Step 1: Add the contact-form privacy notice**

Place this markup after the submit button and before `#formNote`:

```html
<p class="form-privacy">By sending this form, you agree that Ohana Team may use your details to respond to your enquiry, as described in our <a href="privacy.html">Privacy Policy</a>.</p>
```

Add `.form-privacy` styles using readable Manrope text, `var(--muted)`, underlined link treatment, and keyboard focus visibility. Do not add a required checkbox or alter the submit handler.

- [ ] **Step 2: Add footer legal navigation**

Add this navigation in `.footer-bottom`:

```html
<nav class="footer-legal" aria-label="Legal information">
  <a href="terms.html">Terms of Use</a>
  <a href="privacy.html">Privacy Policy</a>
  <a href="accessibility.html">Accessibility Statement</a>
</nav>
```

Style `.footer-legal` to wrap on mobile and remain clearly legible against the existing dark footer.

- [ ] **Step 3: Verify main-page integration**

```bash
node - <<'NODE'
const fs = require('fs');
const html = fs.readFileSync('ohana-team-v3.html', 'utf8');
for (const token of ['href="terms.html"', 'href="privacy.html"', 'href="accessibility.html"', 'class="form-privacy"', 'class="footer-legal"', 'By sending this form']) if (!html.includes(token)) throw new Error(`Missing integration ${token}`);
NODE
```

- [ ] **Step 4: Commit Task 3**

```bash
git add ohana-team-v3.html
git commit -m "Link V3 contact form and footer to legal pages"
```

### Task 4: Verify and publish the complete legal experience

**Files:**
- Test: `terms.html`
- Test: `privacy.html`
- Test: `accessibility.html`
- Test: `ohana-team-v3.html`

**Interfaces:**
- Consumes: all files created or changed in Tasks 1–3.
- Produces: verified static legal pages with valid links and bilingual document metadata.

- [ ] **Step 1: Run final static verification**

```bash
node - <<'NODE'
const fs = require('fs');
for (const page of ['terms.html', 'privacy.html', 'accessibility.html']) {
  const html = fs.readFileSync(page, 'utf8');
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`${page} must have exactly one h1`);
  for (const token of ['id="english"', 'id="hebrew"', 'lang="en"', 'lang="he" dir="rtl"', 'legal.css', 'ohana-team-v3.html']) if (!html.includes(token)) throw new Error(`${page} missing ${token}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) throw new Error(`${page} has duplicate IDs`);
}
console.log('Legal pages verified.');
NODE
git diff --check
```

- [ ] **Step 2: Commit any verification-driven correction and push**

```bash
git add legal.css terms.html privacy.html accessibility.html ohana-team-v3.html
git commit -m "Verify V3 legal pages"
git push origin main
```
