# Ohana Team bilingual legal pages

## Goal

Add clear, bilingual legal information to the V3 landing page without changing the sales journey. The legal pages will explain the site's terms of use, privacy practices, and accessibility commitment, and will be easy to reach from the footer and contact form.

## Scope

- Add three standalone static pages:
  - `terms.html` — Terms of Use
  - `privacy.html` — Privacy Policy
  - `accessibility.html` — Accessibility Statement
- Each page will contain English and Hebrew content with accessible in-page language navigation.
- Each page will use the V3 visual language: clean cool-toned background, Prata headings, Manrope body copy, clear return link, and the existing Ohana Team/REMAX brand assets.
- Add legal links to the main-page footer.
- Add a brief notice next to the contact-form submission action linking to the Privacy Policy.

## Content design

### Terms of Use

State that site content is for general informational purposes, does not constitute professional, financial, legal, or real-estate advice, and is subject to change. Cover intellectual-property ownership, third-party links and services, reasonable limitation of responsibility, governing law in Israel, and contact details for Ohana Team.

### Privacy Policy

Describe the personal data collected through the contact form: name, phone number, email address, contact reason, message, page URL, timestamp, and voluntary campaign parameters. State that data is used to respond to enquiries and provide real-estate services. Describe transfer of form submissions through Make, and the presence of third-party services required by the site: UserWay, Vimeo, OpenStreetMap, Google Fonts, and GitHub Pages. Include a contact route for privacy requests: `roy@remax-n.co.il`.

### Accessibility Statement

State Ohana Team's commitment to accessible service, describe the installed UserWay accessibility widget as an assistance tool, list the accessibility work incorporated in the site (semantic structure, keyboard-friendly controls, descriptive image text, responsive layout, and readable colour contrast), and provide the accessibility contact route: `roy@remax-n.co.il` and `052-5550354`.

## Language and interaction

- English is displayed first because the landing page is English-first.
- Each legal page has visible `English` and `עברית` anchors. The Hebrew section uses `dir="rtl"` and `lang="he"`; the English section uses `lang="en"`.
- Language navigation scrolls to the corresponding section without requiring JavaScript.
- The documents include a visible "Last updated" date and explain that they are general website information that should be reviewed by the business's legal adviser before relying on them as final legal terms.

## Main-page integration

- Footer links: Terms of Use, Privacy Policy, Accessibility Statement.
- Contact-form notice: "By sending this form, you agree that Ohana Team may use your details to respond to your enquiry, as described in our Privacy Policy." The notice links to `privacy.html`.
- The links do not interrupt the existing Make lead flow or UserWay widget.

## Error handling and fallbacks

- Every legal page is standalone and readable without JavaScript.
- Links use relative paths so they work on GitHub Pages and a future custom domain.
- Contact links use `mailto:` and `tel:` fallbacks.

## Verification

- Confirm all three pages load from the published V3 directory.
- Confirm footer and form links resolve to their intended pages.
- Confirm each page has one H1, valid language attributes, no duplicate IDs, and keyboard-reachable language navigation.
- Confirm the privacy text matches the fields and services currently used by the V3 form.

## Non-goals

- This work does not provide legal advice or certify legal compliance.
- This work does not add consent-management software, analytics, cookies, translation automation, or a new form flow.
