import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'

/**
 * A delicate gold flourish divider whose paths "draw themselves" when
 * scrolled into view (SVG pathLength animation).
 */
export default function Ornament({ className = '', width = 220 }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.6, ease: EASE, delay: i * 0.15 },
        opacity: { duration: 0.4, delay: i * 0.15 },
      },
    }),
  }

  return (
    <motion.svg
      width={width}
      viewBox="0 0 220 40"
      fill="none"
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      aria-hidden
    >
      <defs>
        <linearGradient id="orn-gold" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A47E3B" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#C5A05C" />
          <stop offset="1" stopColor="#A47E3B" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M2 20 H88"
        stroke="url(#orn-gold)"
        strokeWidth="1"
        variants={draw}
        custom={0}
      />
      <motion.path
        d="M132 20 H218"
        stroke="url(#orn-gold)"
        strokeWidth="1"
        variants={draw}
        custom={0}
      />
      <motion.path
        d="M110 8 C100 8 96 16 96 20 C96 24 100 32 110 32 C120 32 124 24 124 20 C124 16 120 8 110 8 Z"
        stroke="#C5A05C"
        strokeWidth="1.1"
        variants={draw}
        custom={1}
      />
      <motion.path
        d="M110 13 C105 13 103 17 103 20 C103 23 105 27 110 27 C115 27 117 23 117 20 C117 17 115 13 110 13 Z"
        stroke="#C5A05C"
        strokeWidth="0.8"
        variants={draw}
        custom={2}
      />
      <motion.circle
        cx="110"
        cy="20"
        r="1.6"
        fill="#C5A05C"
        variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay: 0.9, duration: 0.5, ease: EASE } } }}
      />
    </motion.svg>
  )
}
