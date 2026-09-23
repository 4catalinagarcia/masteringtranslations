# Mastering Translations, LLC — Website

A static, bilingual (English/Spanish) one-page website. No build step, no server required — just HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — page structure and content markers (`data-i18n="..."`)
- `css/styles.css` — all styling (navy/gold palette, responsive layout)
- `js/translations.js` — every piece of text in English and Spanish, keyed the same way
- `js/script.js` — the EN/ES toggle switch, mobile menu, and contact form behavior

## Editing content

All visible text lives in **`js/translations.js`**, once for English (`en`) and once for Spanish (`es`), using matching keys (e.g. `"hero.title"`). To change what a section says, edit the string on both sides of the dictionary — you don't need to touch `index.html` for text changes.

Real phone (`(754) 302-0237`) and email (`nataliabernaltraducciones@gmail.com`) are already wired into `translations.js` and the `tel:`/`mailto:` links in `index.html`.

Still a placeholder before launch:
- Testimonials — currently placeholder quotes; replace with real client testimonials (with permission) and delete the note under them.
- Business hours, in `contact.info.hours.value`.

## The language toggle

The switch in the header flips every `[data-i18n]` element between English and Spanish instantly (no page reload), remembers the visitor's choice in their browser, and defaults to Spanish automatically if their browser is set to Spanish.

## Connecting the contact form

The form currently points at a placeholder (`action="https://formspree.io/f/YOUR_FORM_ID"`) and will show a "not connected yet" message instead of sending anything. To make it work, pick one:

**Option A — Formspree (recommended, free tier available, no code)**
1. Create a free account at formspree.io and make a new form.
2. Copy the form endpoint it gives you (looks like `https://formspree.io/f/abcd1234`).
3. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="...">` attribute with your real ID.
4. Remove the placeholder check in `js/script.js` (the `if (action.indexOf("YOUR_FORM_ID") ...)` block in the submit handler) once it's connected — it exists only to warn you while the ID is still a placeholder.

**Option B — any other form backend** (Netlify Forms, EmailJS, a custom API) — update the `<form>` tag's `action`/`method` (and JS submit handler, if needed) per that service's docs.

## Deploying

This is a plain static site, so any static host works, for example:

- **Netlify / Vercel**: drag-and-drop the project folder, or connect a Git repo.
- **GitHub Pages**: push this folder to a repo and enable Pages on the `main` branch.
- Any traditional web host: upload the files via FTP/cPanel to the domain's public folder.

No environment variables, database, or server runtime are required.

## Local preview

Just open `index.html` in a browser, or serve the folder locally, e.g.:

```bash
npx serve .
```
# masteringtranslations
