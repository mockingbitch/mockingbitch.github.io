import { useMemo } from 'react'
import { motion } from 'framer-motion'

/** A field of tiny twinkling stars that fade in over the dark opening. */
export default function Stars({ show, count = 70 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.6 + Math.random() * 2.2,
        delay: Math.random() * 3,
        dur: 2.5 + Math.random() * 3,
        bright: Math.random() > 0.7,
      })),
    [count]
  )

  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.bright ? '#F4ECE0' : '#E7D2AE',
            boxShadow: s.bright ? '0 0 6px rgba(244,236,224,0.9)' : '0 0 4px rgba(231,210,174,0.7)',
          }}
          initial={{ opacity: 0 }}
          animate={
            show
              ? { opacity: [0, s.bright ? 1 : 0.7, 0.25, s.bright ? 1 : 0.7] }
              : { opacity: 0 }
          }
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
