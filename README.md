# Loren Zheng portfolio

Open `index.html` in a browser to preview the site.

## Personalize it

1. Replace every `your-email@example.com` with your email address.
2. Change the colored image blocks to real images. For example, put an image in `assets/portrait.jpg`, then replace the portrait block with `<img src="assets/portrait.jpg" alt="Loren Zheng">`.
3. Change every `href="#"` in `thesis.html` to the link for your PDF or Google Drive file.
4. Copy `project-marcellus.html` to create more project-detail pages, then update its title, text, media, and link in `projects.html`.

The site works as plain HTML/CSS and can be hosted on Cloudflare Pages, GitHub Pages, or Vercel.

## Languages

English is the default language. The site also supports Simplified Chinese with the same shared page layouts, styles, media, and interactions.

- English: `/`, `/about/`, `/projects/`, `/photography/`, `/writing/`, `/contact/`
- Simplified Chinese: `/zh/`, `/zh/about/`, `/zh/projects/`, `/zh/photography/`, `/zh/writing/`, `/zh/contact/`

Project details also have matching bilingual routes under `/projects/.../` and `/zh/projects/.../`.

All visible copy is keyed with `data-i18n` attributes and stored in:

- `locales/en.json`
- `locales/zh.json`

The Chinese dictionary currently retains English project-copy placeholders where translation is still pending. Replace values in `locales/zh.json` to translate the site without touching page markup or styles. The `EN | 中` switcher uses route-relative links, so it works locally and on Cloudflare Pages without a hardcoded domain.
