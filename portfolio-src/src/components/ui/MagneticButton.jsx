import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A button/link that subtly leans toward the cursor. Renders an <a> when
// `href` is provided, otherwise a <button>. The magnetic effect is purely
// decorative (and Framer's MotionConfig disables it for reduced-motion users).
export default function MagneticButton({
  href,
  children,
  className = '',
  strength = 0.4,
  ...rest
}) {
  const ref = useRef(null)
  const rect = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  // Measure once per hover session to avoid a layout read on every mousemove.
  const onEnter = () => {
    rect.current = ref.current?.getBoundingClientRect() ?? null
  }
  const onMove = (e) => {
    const r = rect.current
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = href ? motion.a : motion.button
  const linkProps = href
    ? { href, ...(href.startsWith('#') ? {} : { target: '_blank', rel: 'noreferrer' }) }
    : { type: 'button' }

  return (
    <Comp
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...linkProps}
      {...rest}
    >
      {children}
    </Comp>
  )
}
