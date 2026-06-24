import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useIsTouch } from '../../hooks/useMediaQuery'

/**
 * A premium button with a magnetic pull toward the cursor, a soft glow,
 * an animated gold border sweep and a click ripple.
 *
 * variant: 'solid' | 'outline' | 'ghost'
 */
export default function MagneticButton({
  children,
  as = 'button',
  variant = 'solid',
  className = '',
  onClick,
  href,
  strength = 0.4,
  ...rest
}) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const [ripples, setRipples] = useState([])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 })
  // Inner content lags slightly less for a layered feel
  const tx = useTransform(sx, (v) => v * 0.35)
  const ty = useTransform(sy, (v) => v * 0.35)

  const handleMove = (e) => {
    if (isTouch || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    mx.set(relX * strength)
    my.set(relY * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const handleClick = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const id = `${e.clientX}-${e.clientY}-${performance.now()}`
      setRipples((r) => [
        ...r,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ])
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700)
    }
    onClick?.(e)
  }

  const styles = {
    solid:
      'text-ink bg-gradient-to-r from-champagne via-[#f0e0c0] to-gold shadow-glow hover:shadow-lift',
    outline:
      'text-charcoal bg-white/40 hairline backdrop-blur-md hover:bg-white/70',
    ghost: 'text-charcoal bg-transparent hover:text-gold-deep',
  }

  const MotionTag = motion[as] || motion.button
  const linkProps = href ? { href } : {}

  return (
    <MotionTag
      ref={ref}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] transition-shadow duration-500 ${styles[variant]} ${className}`}
      {...linkProps}
      {...rest}
    >
      {/* Animated gold border sweep on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-full">
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(120deg,transparent,rgba(255,255,255,0.55),transparent)] [background-size:220%_100%] animate-shimmer" />
      </span>

      {/* Ripples */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/45"
          initial={{ width: 0, height: 0, opacity: 0.6, x: r.x, y: r.y }}
          animate={{ width: 360, height: 360, opacity: 0, x: r.x - 180, y: r.y - 180 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}

      <motion.span style={{ x: tx, y: ty }} className="relative z-10 flex items-center gap-2.5">
        {children}
      </motion.span>
    </MotionTag>
  )
}
