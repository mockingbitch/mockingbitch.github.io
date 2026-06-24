import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Golden particles that drift in from the edges and gather toward the centre,
 * shimmering as they settle — the "magic dust" before the names appear.
 */
export default function GoldDust({ gather, count = 40 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2
        const dist = 40 + Math.random() * 55 // vw/vh from center
        return {
          id: i,
          fromX: Math.cos(angle) * dist,
          fromY: Math.sin(angle) * dist,
          // gathered position: a loose cluster near center
          toX: (Math.random() - 0.5) * 26,
          toY: (Math.random() - 0.5) * 20,
          size: 1.5 + Math.random() * 3.5,
          delay: Math.random() * 0.8,
          dur: 2.6 + Math.random() * 1.8,
        }
      }),
    [count]
  )

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, #F4ECE0, #C5A05C 70%)',
            boxShadow: '0 0 10px rgba(197,160,92,0.8)',
          }}
          initial={{ x: `${p.fromX}vw`, y: `${p.fromY}vh`, opacity: 0, scale: 0.4 }}
          animate={
            gather
              ? {
                  x: `${p.toX}vw`,
                  y: `${p.toY}vh`,
                  opacity: [0, 1, 0.8],
                  scale: [0.4, 1, 0.9],
                }
              : { opacity: 0 }
          }
          transition={{ duration: p.dur, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}
