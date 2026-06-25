import { motion, useReducedMotion } from 'framer-motion'

// Fixed decorative backdrop: ambient gradient wash + faint static grid +
// soft floating gradient blobs + a vignette. Purely cosmetic and
// pointer-events-none. Animations are skipped for reduced-motion users, and
// living on a position:fixed layer avoids the cost of background-attachment.
export default function Background() {
  const reduce = useReducedMotion()
  const float = (anim) => (reduce ? {} : anim)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Ambient gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60rem 60rem at 80% -10%, rgba(52,211,153,0.07), transparent 60%), radial-gradient(50rem 50rem at -10% 20%, rgba(34,211,238,0.06), transparent 55%)',
        }}
      />

      {/* Static grid */}
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(80%_60%_at_50%_30%,#000,transparent)]" />

      {/* Floating glow blobs */}
      <motion.div
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/10 blur-[90px]"
        animate={float({ y: [0, 30, 0], x: [0, 18, 0] })}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-cyan-glow/10 blur-[100px]"
        animate={float({ y: [0, -34, 0], x: [0, -16, 0] })}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/5 blur-[90px]"
        animate={float({ y: [0, -22, 0] })}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
