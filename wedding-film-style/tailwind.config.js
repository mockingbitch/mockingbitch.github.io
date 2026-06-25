/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark film / editorial palette — warm near-black, paper white, bronze.
        ink: {
          DEFAULT: '#100F0C',
          800: '#17150F',
          700: '#211E16',
          600: '#2D281D',
        },
        paper: '#F2EEE6',
        muted: '#B7B0A2',
        faint: '#969084',
        bronze: {
          DEFAULT: '#C2A06A',
          deep: '#9C7E4E',
          soft: '#D8BE93',
        },
        line: 'rgba(242,238,230,0.14)',
        // Aliases so the reused Lightbox (charcoal/ivory) matches the film theme
        charcoal: '#100F0C',
        ivory: '#F2EEE6',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'], // alias for the reused Lightbox
        sans: ['"Archivo"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wider2: '0.28em',
        widest3: '0.4em',
      },
      maxWidth: {
        panel: '640px',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1.18)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        kenburns: 'kenburns 18s ease-out forwards',
        floaty: 'floaty 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
