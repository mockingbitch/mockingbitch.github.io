/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Asian red & gold palette. Token names kept so components inherit;
        // 'rose-gold' (the romantic accent) is remapped to lacquer red.
        ivory: '#FBF3E6',
        cream: '#F6E7CE',
        champagne: '#F0D9A8',
        gold: '#C9A24B',
        'gold-deep': '#9C7A2C',
        'rose-gold': '#B0182B',
        'soft-pink': '#E8A9A2',
        beige: '#E9D6C2',
        charcoal: '#3A1410',
        'charcoal-soft': '#52201A',
        ink: '#2A0C0A',
        // Explicit Asian reds (festive accents / 囍)
        lacquer: '#C8102E',
        'lacquer-deep': '#8E0E22',
        'lacquer-bright': '#D62336',
        // Deep reds for the dominant page / panels
        'red-bg': '#6E0D14',
        'red-bg-deep': '#4A0810',
        'red-panel': '#7E1019',
        'gold-bright': '#E7C766',
      },
      fontFamily: {
        // Oriental, brush-flavoured, all Vietnamese-safe (verified subsets).
        display: ['"Charm"', '"Noto Serif"', 'serif'], // brush serif headings
        serif: ['"Noto Serif"', 'serif'],
        bodoni: ['"Noto Serif"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        script: ['"Charmonman"', 'cursive'], // brush handwriting
        vibes: ['"Charmonman"', 'cursive'],
        // 囍 Song Hỷ + CJK glyphs (mirrors the stack in .hy/.hy-gold)
        cjk: [
          '"Noto Serif SC"',
          '"Microsoft YaHei"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Noto Sans CJK SC"',
          'serif',
        ],
      },
      letterSpacing: {
        luxe: '0.42em',
        wide2: '0.22em',
      },
      maxWidth: {
        content: '1240px',
      },
      boxShadow: {
        glass: '0 20px 60px -25px rgba(40, 30, 20, 0.35)',
        lift: '0 30px 80px -30px rgba(40, 30, 20, 0.45)',
        glow: '0 0 60px -10px rgba(197, 160, 92, 0.55)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.25)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4.5s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3.5s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 14s ease infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
