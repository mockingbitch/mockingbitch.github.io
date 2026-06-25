# 囍 Thùy Dung & Quang Phong — Asian-Style Wedding Invitation

An Asian (Á Đông) take on the wedding invitation: **red & gold** palette with the
**囍 Song Hỷ** (Double Happiness) mark, built on the same cinematic engine as the
sibling `wedding-invitation` project. Cinematic intro, smooth scrolling,
scroll-driven storytelling, floating red/gold petals, a 3D wax-sealed envelope,
an animated countdown and a guestbook — all static, no backend required.

![stack](https://img.shields.io/badge/React-18-61dafb) ![vite](https://img.shields.io/badge/Vite-5-646cff) ![tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![framer](https://img.shields.io/badge/Framer_Motion-11-ff0098)

## How it's deployed

Part of the GitHub Pages user site `mockingbitch.github.io` (publishes the whole
`main` branch root). Source vs published output are kept separate:

- **Source**: this folder, `wedding-asian-style/`.
- **Build output**: repo-root `wedding-asian/` (Vite `base: '/wedding-asian/'`,
  `outDir: '../wedding-asian'`), served at **https://mockingbitch.github.io/wedding-asian/**.

> Same pattern as the other sites: source in `X-style`/`X-invitation`, output in a plain folder.

## What makes it "Asian style"

- **Palette** remapped to red + gold (`tailwind.config.js` / `src/index.css`).
  Token names are reused so components inherit; `rose-gold` now resolves to
  lacquer red. New `lacquer*` colors + a `cjk` font stack.
- **囍 Song Hỷ** via `src/components/ui/DoubleHappiness.jsx` (`.hy` red / `.hy-gold`
  gold gradient, with a solid-gold `@supports` fallback). It appears in the Hero,
  Preloader, Navbar mark, the red wax seal and the favicon.
- The 囍 glyph loads from a **Noto Serif SC subset** (`&text=囍` in `index.html`)
  with system CJK fallbacks — tiny payload.
- Falling petals + corner florals recolored to red/gold.

## Develop / build

```bash
cd wedding-asian-style
npm install
npm run dev        # http://localhost:5175
npm run build      # writes the static site to ../wedding-asian
```

Then from the repo root: `git add wedding-asian wedding-asian-style && git commit && git push`.

## Editing content

All content (names, dates, venues, love story) lives in
[`src/data/content.js`](src/data/content.js) — identical to the sibling site and
kept in sync manually.
