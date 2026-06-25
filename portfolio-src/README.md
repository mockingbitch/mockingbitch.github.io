# Trần Quang Phong — Portfolio

A dark, modern developer portfolio built with **React + Vite + Tailwind CSS + Framer Motion**.

Published as a sub-path of the GitHub Pages user site:
**https://mockingbitch.github.io/portfolio/**

## How it's deployed

This repo (`mockingbitch.github.io`) is a GitHub Pages **user site** that publishes
the whole `main` branch. To keep the published output and the source separate:

- **Source** lives here, in `portfolio-src/`.
- **Build output** is emitted to the repo-root `portfolio/` folder
  (see `vite.config.js`: `base: '/portfolio/'`, `outDir: '../portfolio'`),
  which GitHub Pages then serves at `/portfolio/`.

> Same pattern as the wedding site: source in `wedding-invitation/`, output in `wedding/`.

## Develop

```bash
cd portfolio-src
npm install
npm run dev        # http://localhost:5174
```

## Build & publish

```bash
cd portfolio-src
npm run build      # writes the static site to ../portfolio
cd ..
git add portfolio portfolio-src
git commit -m "Update portfolio"
git push           # GitHub Pages redeploys /portfolio/
```

## Editing content

Almost everything (name, role, skills, experience, projects, contact) is driven by
a single file: [`src/data/content.js`](src/data/content.js). Search for `// TODO`
to find placeholders / possibly-outdated values to update.

The downloadable résumé is `public/Tran-Quang-Phong-CV.pdf` — replace it to update
the "Download résumé" button.
