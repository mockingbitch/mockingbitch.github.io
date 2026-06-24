import { motion } from 'framer-motion'
import SplitText from './SplitText'
import Ornament from './Ornament'
import { fadeUp, viewport } from '../../lib/motion'

/**
 * Consistent eyebrow + title + flourish header used by every section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light = false,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl ${className}`}>
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="eyebrow mb-5"
        >
          {eyebrow}
        </motion.span>
      )}

      <SplitText
        as="h2"
        text={title}
        className={`section-title ${light ? 'text-ivory' : 'text-charcoal'}`}
      />

      {align === 'center' && <Ornament className="my-7 opacity-90" width={210} />}

      {intro && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className={`lede max-w-xl ${align !== 'center' ? 'mt-6' : ''} ${
            light ? 'text-ivory/75' : ''
          }`}
        >
          {intro}
        </motion.p>
      )}
    </div>
  )
}
