import { motion } from 'framer-motion'
import SplitText from '../ui/SplitText'
import { quote } from '../../data/content'
import { EASE, fadeUp, viewport } from '../../lib/motion'

export default function Quote() {
  const drawFlourish = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 2, ease: EASE, delay: 0.6 }, opacity: { duration: 0.4, delay: 0.6 } },
    },
  }

  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      {/* soft glow accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-soft-pink/40 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* giant quotation mark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 0.18, scale: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 1.2, ease: EASE }}
          className="block font-display text-[10rem] leading-[0.5] text-gold sm:text-[14rem]"
          aria-hidden
        >
          &ldquo;
        </motion.span>

        <SplitText
          as="p"
          text={quote.text}
          stagger={0.09}
          duration={1.1}
          className="font-display text-3xl leading-tight text-charcoal sm:text-5xl md:text-6xl"
        />

        {/* handwritten signature */}
        <div className="mt-14 flex flex-col items-center">
          <motion.span
            className="font-script text-5xl font-semibold text-rose-gold sm:text-6xl"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={viewport}
            transition={{ duration: 1.8, ease: EASE }}
            style={{ textShadow: '0 1px 18px rgba(200,16,46,0.25)' }}
          >
            {quote.signature}
          </motion.span>

          {/* flourish underline drawn beneath the signature */}
          <motion.svg
            width="280"
            height="40"
            viewBox="0 0 280 40"
            fill="none"
            className="mt-1"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            aria-hidden
          >
            <motion.path
              d="M8 24 C60 8 110 32 150 20 C190 8 240 26 272 14 C262 18 250 26 244 30"
              stroke="#C8102E"
              strokeWidth="1.4"
              strokeLinecap="round"
              variants={drawFlourish}
            />
          </motion.svg>

          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="eyebrow mt-5"
          >
            {quote.attribution}
          </motion.span>
        </div>
      </div>
    </section>
  )
}
