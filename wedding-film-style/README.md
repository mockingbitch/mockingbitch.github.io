# Thùy Dung & Quang Phong — Film-Chapter Wedding Invitation

A wedding invitation with a **horizontal, cinematic layout**: you scroll / swipe
**sideways** through full-screen "chapters" like turning the pages of a film
contact sheet. Dark **film / editorial** style — warm near-black, paper-white
type and a bronze accent.

![stack](https://img.shields.io/badge/React-18-61dafb) ![vite](https://img.shields.io/badge/Vite-5-646cff) ![tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![framer](https://img.shields.io/badge/Framer_Motion-11-ff0098)

## What makes it different

- **Horizontal deck** (`src/components/Deck.jsx`): vertical mouse-wheel is
  translated to horizontal scroll, with native swipe + CSS scroll-snap on touch,
  ← / → / Space / Home / End keys, dot navigation, prev/next arrows, a progress
  bar and deep-linkable chapters (e.g. `…/wedding-film/#7`).
- **12 chapters** (`src/components/panels/*`): Cover, Lời Ngỏ, 4× Chuyện Tình,
  Địa Điểm, Chương Trình, Khoảnh Khắc (contact-sheet gallery + lightbox),
  Mừng Cưới (QR), Sổ Lưu Bút (guestbook), Hẹn Gặp.
- **Type**: Fraunces (editorial serif) · Archivo (sans) · JetBrains Mono
  (chapter numbers). Film grain + bronze hairlines.

## How it's deployed

Part of the GitHub Pages user site `mockingbitch.github.io` (publishes the whole
`main` branch root). Source and built output are separate:

- **Source**: this folder, `wedding-film-style/`.
- **Build output**: repo-root `wedding-film/` (Vite `base: '/wedding-film/'`,
  `outDir: '../wedding-film'`), served at **https://mockingbitch.github.io/wedding-film/**.

## Develop / build

```bash
cd wedding-film-style
npm install
npm run dev        # http://localhost:5176
npm run build      # writes the static site to ../wedding-film
```

Then from the repo root: `git add wedding-film wedding-film-style && git commit && git push`.

## Editing content

All content (names, dates, venues, love story, gallery, gifts) lives in
[`src/data/content.js`](src/data/content.js) — shared in spirit with the other
invitation variants and kept in sync manually.
