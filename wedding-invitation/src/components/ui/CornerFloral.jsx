import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

/**
 * A delicate floral spray that "blooms" — stems draw in, leaves and blossoms
 * scale open with a stagger. Drop into any corner; flip via `corner` prop.
 */
export default function CornerFloral({
  corner = 'tl',
  size = 260,
  play = true,
  delay = 0,
  tone = 'gold',
  className = '',
}) {
  const flip = {
    tl: 'scale(1,1)',
    tr: 'scale(-1,1)',
    bl: 'scale(1,-1)',
    br: 'scale(-1,-1)',
  }[corner]

  const stroke = tone === 'gold' ? '#C5A05C' : 'rgba(231,210,174,0.9)'
  const leaf = tone === 'gold' ? 'rgba(197,160,92,0.30)' : 'rgba(231,210,174,0.28)'
  const petal = tone === 'gold' ? '#E7D2AE' : '#F4DEE2'
  const petal2 = tone === 'gold' ? '#F4DEE2' : '#E7D2AE'

  const stem = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.4, ease: EASE, delay: delay + i * 0.12 }, opacity: { duration: 0.3, delay: delay + i * 0.12 } },
    }),
  }

  const bloom = {
    hidden: { scale: 0, opacity: 0, rotate: -20 },
    show: (i) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { duration: 1, ease: EASE, delay: delay + 0.5 + i * 0.14 },
    }),
  }

  const leafV = {
    hidden: { scale: 0, opacity: 0 },
    show: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.9, ease: EASE, delay: delay + 0.35 + i * 0.1 },
    }),
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
      className={className}
      style={{ transform: flip, transformOrigin: 'center' }}
      initial="hidden"
      animate={play ? 'show' : 'hidden'}
    >
      {/* stems */}
      <motion.path d="M2 2 C40 28 56 60 64 98" stroke={stroke} strokeWidth="1.3" variants={stem} custom={0} />
      <motion.path d="M14 6 C30 40 26 78 18 116" stroke={stroke} strokeWidth="1" variants={stem} custom={1} />
      <motion.path d="M6 14 C46 30 88 30 120 22" stroke={stroke} strokeWidth="1" variants={stem} custom={2} />

      {/* leaves */}
      {[
        { d: 'M32 30 C44 22 60 26 64 40 C52 46 38 44 32 30 Z', i: 0 },
        { d: 'M22 64 C16 52 22 38 36 38 C40 52 34 62 22 64 Z', i: 1 },
        { d: 'M70 18 C84 14 98 20 98 32 C86 36 74 32 70 18 Z', i: 2 },
        { d: 'M40 96 C34 84 40 70 54 72 C56 86 50 94 40 96 Z', i: 3 },
      ].map((l) => (
        <motion.path
          key={l.i}
          d={l.d}
          fill={leaf}
          stroke={stroke}
          strokeWidth="0.6"
          variants={leafV}
          custom={l.i}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}

      {/* blossoms */}
      {[
        { cx: 64, cy: 100, r: 15, i: 0 },
        { cx: 120, cy: 22, r: 12, i: 1 },
        { cx: 18, cy: 118, r: 9, i: 2 },
      ].map((b) => (
        <motion.g
          key={b.i}
          variants={bloom}
          custom={b.i}
          style={{ transformBox: 'fill-box', transformOrigin: `${b.cx}px ${b.cy}px` }}
        >
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx={b.cx}
              cy={b.cy - b.r * 0.55}
              rx={b.r * 0.42}
              ry={b.r * 0.62}
              fill={b.i % 2 ? petal2 : petal}
              opacity="0.92"
              transform={`rotate(${deg} ${b.cx} ${b.cy})`}
            />
          ))}
          <circle cx={b.cx} cy={b.cy} r={b.r * 0.3} fill="#C5A05C" />
        </motion.g>
      ))}
    </motion.svg>
  )
}
