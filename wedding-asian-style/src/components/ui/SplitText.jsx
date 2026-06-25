import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'

/**
 * Word-by-word masked reveal. Each word rides up from behind a clip mask
 * with a gentle stagger — the signature "editorial" headline reveal.
 *
 * @param {string} text
 * @param {string} as       wrapper tag (default 'span')
 * @param {number} stagger  per-word delay
 * @param {number} delay    initial delay
 * @param {boolean} inView  use scroll trigger (default) vs. animate immediately
 */
export default function SplitText({
  text,
  as = 'span',
  className = '',
  wordClassName = '',
  stagger = 0.08,
  delay = 0,
  duration = 0.95,
  inView = true,
  animate,
}) {
  const Tag = motion[as] || motion.span
  const words = text.split(' ')

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const word = {
    hidden: { y: '112%' },
    show: { y: '0%', transition: { duration, ease: EASE } },
  }

  const triggerProps = inView
    ? { whileInView: 'show', viewport }
    : { animate: animate ?? 'show' }

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      {...triggerProps}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
        >
          <motion.span variants={word} className={`inline-block ${wordClassName}`}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
