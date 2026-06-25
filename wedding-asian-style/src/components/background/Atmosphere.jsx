import { motion } from 'framer-motion'

/**
 * Fixed, behind-everything ambience: an animated gradient mesh, three slow
 * floating colour blobs, slanted light rays and a soft vignette. All pure
 * CSS/transform so it costs almost nothing.
 */
export default function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-ivory" />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-90 animate-gradient-pan"
        style={{
          backgroundImage: `
            radial-gradient(60% 50% at 18% 12%, rgba(200, 16, 46, 0.22), transparent 60%),
            radial-gradient(55% 45% at 85% 18%, rgba(201, 162, 75, 0.45), transparent 60%),
            radial-gradient(60% 55% at 75% 88%, rgba(230, 213, 193, 0.4), transparent 62%),
            radial-gradient(50% 50% at 12% 85%, rgba(214, 35, 54, 0.2), transparent 60%)
          `,
          backgroundSize: '180% 180%',
        }}
      />

      {/* Floating blobs */}
      {[
        { c: 'rgba(200,16,46,0.22)', s: 'w-[42vw] h-[42vw]', pos: 'top-[-8%] left-[-6%]', dur: 26, d: 0 },
        { c: 'rgba(201,162,75,0.45)', s: 'w-[38vw] h-[38vw]', pos: 'top-[30%] right-[-10%]', dur: 32, d: 4 },
        { c: 'rgba(214,35,54,0.2)', s: 'w-[34vw] h-[34vw]', pos: 'bottom-[-12%] left-[22%]', dur: 30, d: 8 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[90px] ${b.s} ${b.pos}`}
          style={{ background: b.c }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -34, 24, 0],
            scale: [1, 1.12, 0.96, 1],
          }}
          transition={{ duration: b.dur, delay: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Slanted light rays */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(108deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 120px)',
          maskImage: 'radial-gradient(80% 60% at 70% 0%, #000, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(80% 60% at 70% 0%, #000, transparent 75%)',
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(35,31,28,0.10) 100%)',
        }}
      />
    </div>
  )
}
