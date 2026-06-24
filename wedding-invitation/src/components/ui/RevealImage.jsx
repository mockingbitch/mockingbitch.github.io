import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'

/**
 * Lazy-loaded image with a curtain clip-reveal, a soft loading shimmer,
 * and an optional slow "Ken Burns" drift while in view.
 */
export default function RevealImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  kenBurns = false,
  rounded = 'rounded-[2px]',
  delay = 0,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.figure
      className={`relative overflow-hidden ${rounded} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {/* loading shimmer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-cream via-beige/60 to-cream transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100 animate-pulse'
        }`}
      />

      <motion.div
        className="h-full w-full"
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: {
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 1.3, ease: EASE, delay },
          },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
          initial={{ scale: 1.16 }}
          whileInView={{ scale: kenBurns ? 1.0 : 1.04 }}
          viewport={viewport}
          transition={{ duration: kenBurns ? 8 : 1.6, ease: EASE }}
        />
      </motion.div>
    </motion.figure>
  )
}
