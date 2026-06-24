import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouch } from '../hooks/useMediaQuery'

/**
 * A two-part custom cursor: a crisp gold dot that tracks instantly, and a soft
 * glowing ring that follows with spring lag. The ring blooms when hovering any
 * interactive element (links, buttons, or [data-cursor="hover"]).
 */
export default function CustomCursor() {
  const isTouch = useIsTouch()
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(y, { stiffness: 1000, damping: 50 })

  useEffect(() => {
    if (isTouch) return
    document.documentElement.classList.add('cursor-none-fine')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const leave = () => setHidden(true)

    const isInteractive = (el) =>
      el?.closest?.(
        'a, button, [data-cursor="hover"], input, textarea, select, label'
      )

    const over = (e) => setHovering(Boolean(isInteractive(e.target)))

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)

    return () => {
      document.documentElement.classList.remove('cursor-none-fine')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, [isTouch, x, y])

  if (isTouch) return null

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[120] transition-opacity duration-300 ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-gold/70"
          animate={{
            width: hovering ? 64 : 34,
            height: hovering ? 64 : 34,
            opacity: hovering ? 1 : 0.6,
            backgroundColor: hovering ? 'rgba(197,160,92,0.10)' : 'rgba(197,160,92,0)',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{ boxShadow: '0 0 30px rgba(197,160,92,0.45)' }}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-gold-deep"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0 : 1, width: 6, height: 6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </div>
  )
}
