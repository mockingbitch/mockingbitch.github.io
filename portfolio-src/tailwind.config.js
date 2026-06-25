/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0B',
          50: '#0E0E11',
          100: '#111114',
          200: '#17171B',
          300: '#1E1E23',
          400: '#26262C',
        },
        line: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#34D399',
          soft: '#6EE7B7',
          deep: '#10B981',
        },
        cyan: {
          glow: '#22D3EE',
        },
         tone: {
          base: '#E8E8EC',
          muted: '#9C9CA6',
          faint: '#8A8A94', // lightened to clear WCAG AA (4.5:1) on ink
        },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gridpan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        gridpan: 'gridpan 8s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
