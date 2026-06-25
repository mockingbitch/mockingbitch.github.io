import { motion } from 'framer-motion'
import { fadeUp, stagger, inView } from '../../lib/motion.js'

// Numbered, monospace-kicker heading used at the top of every section.
export default function SectionHeading({ index, eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`flex flex-col gap-4 ${alignment}`}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        {index != null && (
          <span className="font-mono text-xs font-semibold text-accent/70">
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span className="kicker">{eyebrow}</span>
        <span className="h-px w-10 bg-line" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-3xl font-display text-3xl font-bold leading-tight text-tone-base text-balance sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="max-w-2xl text-base leading-relaxed text-tone-muted">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
