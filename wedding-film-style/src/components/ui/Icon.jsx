import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'

// Each icon is a list of SVG path `d` strings, drawn with pathLength.
const PATHS = {
  calendar: [
    'M5 8 a2 2 0 0 1 2 -2 h10 a2 2 0 0 1 2 2 v9 a2 2 0 0 1 -2 2 H7 a2 2 0 0 1 -2 -2 Z',
    'M8 4 v4 M16 4 v4 M5 11 h14',
  ],
  venue: ['M12 21 C7 16 5 13 5 10 a7 7 0 0 1 14 0 c0 3 -2 6 -7 11 Z', 'M12 10 m-2.4 0 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0'],
  dress: [
    'M12 5 a1.6 1.6 0 1 0 0.01 0',
    'M12 7 c0 2 -5 3 -7 5 c-1 1 0 2 1 2 h12 c1 0 2 -1 1 -2 c-2 -2 -7 -3 -7 -5 Z',
    'M12 7 v1.5',
  ],
  gift: [
    'M5 11 h14 v8 a1 1 0 0 1 -1 1 H6 a1 1 0 0 1 -1 -1 Z',
    'M4 8 h16 v3 H4 Z M12 8 v12',
    'M12 8 C12 5 9 4 8.5 6 C8 8 10.5 8 12 8 Z M12 8 C12 5 15 4 15.5 6 C16 8 13.5 8 12 8 Z',
  ],
  arrival: ['M7 21 V5 a1 1 0 0 1 1 -1 h8 a1 1 0 0 1 1 1 v16', 'M4 21 h16', 'M14.5 12 v1.5'],
  ceremony: [
    'M9 13 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
    'M15 13 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0',
    'M7.5 10.5 L9 7 l1.5 3.5 M13.5 10.5 L15 7 l1.5 3.5',
  ],
  cocktail: ['M5 6 h14 l-7 8 Z', 'M12 14 v5 M8.5 19 h7', 'M9 9 h6'],
  dinner: [
    'M7 4 v7 a2 2 0 0 0 4 0 V4 M9 4 v16',
    'M16 4 c-1.6 0 -2.5 2 -2.5 4.5 c0 2 1 3 2.5 3 V20',
  ],
  party: [
    'M9 18 V6 l9 -2 v12',
    'M9 18 m-2.4 0 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0',
    'M18 16 m-2.4 0 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0',
  ],
}

/**
 * Gold line icon whose strokes "draw in" when scrolled into view.
 */
export default function Icon({ name, size = 30, className = '', stroke = '#A47E3B' }) {
  const paths = PATHS[name] || []
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.2, ease: EASE, delay: i * 0.18 }, opacity: { duration: 0.3, delay: i * 0.18 } },
    }),
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      aria-hidden
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          custom={i}
        />
      ))}
    </motion.svg>
  )
}
