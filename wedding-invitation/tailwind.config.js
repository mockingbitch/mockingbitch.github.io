/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F1',
        cream: '#F4ECE0',
        champagne: '#E7D2AE',
        gold: '#C5A05C',
        'gold-deep': '#A47E3B',
        'rose-gold': '#C08A82',
        'soft-pink': '#F4DEE2',
        beige: '#E6D5C1',
        charcoal: '#231F1C',
        'charcoal-soft': '#322C28',
        ink: '#14110F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        bodoni: ['"Bodoni Moda"', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
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
