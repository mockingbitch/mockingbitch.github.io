# Thùy Dung & Quang Phong — A Cinematic Wedding Invitation

A premium, Awwwards-grade wedding invitation experience. Cinematic intro,
smooth scrolling, scroll-driven storytelling, floating petals, custom cursor,
glassmorphism, an animated countdown, a 3D paper envelope that opens to reveal
the site, and a fully interactive RSVP — all static, no backend.

![stack](https://img.shields.io/badge/React-18-61dafb) ![vite](https://img.shields.io/badge/Vite-5-646cff) ![tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![framer](https://img.shields.io/badge/Framer_Motion-11-ff0098)

---

## ✨ Highlights

- **Cinematic preloader** — dark sky → twinkling stars → gathering golden dust →
  handwritten date → corner flowers bloom → names fade in → a wax-sealed
  envelope opens in 3D and the invitation rises out. Only then does the site
  reveal. (Skippable; respects `prefers-reduced-motion`.)
- **Smooth scrolling** with [Lenis](https://github.com/darkroomengineering/lenis).
- **Scroll-driven storytelling** — parallax hero, drawing timeline rails,
  curtain image reveals, word-by-word headline masks, staggered cards.
- **Atmosphere** — a single GPU-friendly canvas renders drifting sakura petals
  and golden dust; CSS layers add an animated gradient mesh, floating blobs,
  light rays and a vignette.
- **Custom cursor** with a lagging glow ring that blooms over interactive
  elements (auto-disabled on touch devices).
- **Live countdown** with flipping digits.
- **Two-event details** — bride's-side and groom's-side celebrations on
  different dates and venues, each with its own venue card + run-of-show.
- **Masonry gallery** with hover zoom and a keyboard-navigable lightbox.
- **Animated handwritten signature** + drawing SVG flourishes & icons.
- **Gift QR codes** (one per family) generated client-side from text/VietQR.
- **Wishes guestbook** — guests leave a wish; it's saved to `data/wishes.json`
  via a tiny zero-dependency API (dev, preview *and* production) and rendered on
  a live wall. Falls back to `localStorage` on purely static hosting.
- **Generative ambient score** (Web Audio) — never autoplays; toggled by guests.
- **Fully responsive** and tuned to hold 60fps (lazy images, capped particle
  counts, paused-when-hidden canvas, transform-only animations).

## 🛠 Tech Stack

| Concern         | Choice                                  |
| --------------- | --------------------------------------- |
| Framework       | React 18 + Vite 5                       |
| Styling         | Tailwind CSS 3 (custom design tokens)   |
| Animation       | Framer Motion 11                        |
| Smooth scroll   | Lenis                                   |
| Particles/petals| Hand-written `<canvas>` (no library)    |
| Ambient audio   | Web Audio API (generative, no asset)    |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:5173  (wishes API enabled)
npm run build    # production build → /dist
npm start        # serve /dist + wishes API → http://localhost:4173
npm run preview  # Vite preview of /dist (also has the wishes API)
```

> Requires Node 18+.

**Saving wishes to a file.** `npm run dev`, `npm run preview` and `npm start`
all expose `GET/POST /api/wishes`, which appends to `data/wishes.json`. Use
`npm start` (or any Node host) for the real site so guests' wishes persist to
disk. If you deploy the `/dist` folder to a *static-only* host (no Node), the
guestbook automatically falls back to the visitor's `localStorage`.

## 🎨 Make it yours

Almost everything lives in **`src/data/content.js`** — names, date, venue,
love-story milestones, schedule, gallery images, quote and RSVP copy. Change a
value there and it propagates across the whole site.

- **Photos** use Unsplash URLs by default. Drop your own images in `/public`
  and reference them as `"/your-photo.jpg"` inside `content.js`.
- **The two celebrations** live in the `events` array (bride's side & groom's
  side). Set each one's `weekday`, `date`, `dateShort`, `time`, `venue`,
  `address`, `mapHref` and its own `schedule`. The countdown + intro use
  `couple.date` (set it to whichever event comes first).
- **Gift QR codes** live in `gifts.qrs`. Either paste a real VietQR / bank
  deep-link string into `value` (a QR is generated for it), or drop an image in
  `/public` and set `"image": "/qr-nha-trai.png"`.
- **Colours & fonts** are defined as design tokens in `tailwind.config.js` and
  `src/index.css` (`:root`).
- **Ambient music** is generated in code (`src/hooks/useAmbientAudio.js`). To
  use a real track instead, swap the synth for an `<audio>` element — keep it
  gated behind the toggle so it never autoplays.

## 📁 Structure

```
├─ server.js                   # Production server: serves /dist + wishes API
├─ server/wishesApi.js         # Zero-dep API → reads/writes data/wishes.json
├─ data/wishes.json            # ← submitted wishes are stored here
├─ vite.config.js              # Mounts the wishes API on dev & preview
└─ src/
   ├─ App.jsx                  # Orchestration: preloader gate, lenis, audio, layout
   ├─ index.css                # Design tokens, base styles, utilities
   ├─ data/content.js          # ← single source of truth for all copy & media
   ├─ lib/
   │  ├─ motion.js             # Shared Framer Motion variants & easings
   │  └─ wishesClient.js       # fetch/submit wishes (+ localStorage fallback)
   ├─ hooks/
   │  ├─ useLenis.js           # Smooth scroll + scroll lock
   │  ├─ useCountdown.js       # Live countdown
   │  ├─ useMediaQuery.js      # Responsive / reduced-motion / touch helpers
   │  └─ useAmbientAudio.js    # Generative Web Audio ambient pad
   └─ components/
      ├─ Preloader/            # Cinematic intro (Stars, GoldDust, Envelope)
      ├─ background/           # Atmosphere (CSS) + PetalsCanvas
      ├─ sections/             # Hero, LoveStory, WeddingInfo (2 venues),
      │                        #   Schedule (2 timelines), Gallery, Quote,
      │                        #   Wishes (QR + guestbook), Footer
      ├─ ui/                   # SplitText, MagneticButton, Countdown, Icon,
      │                        #   QRCard, Ornament, CornerFloral, Lightbox…
      ├─ CustomCursor.jsx
      ├─ MusicToggle.jsx
      └─ Navbar.jsx
```

## ♿ Accessibility & performance notes

- Honors `prefers-reduced-motion`: the intro collapses to a quick fade, petals
  are disabled, and transitions are near-instant.
- The custom cursor and canvas effects disable themselves on touch / coarse
  pointers.
- Images are lazy-loaded and decoded async; the petal canvas scales its
  particle count to the viewport and pauses when the tab is hidden.

---

Made with love. 💍
