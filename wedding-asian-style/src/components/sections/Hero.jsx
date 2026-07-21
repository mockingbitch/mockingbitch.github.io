import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import Countdown from '../ui/Countdown'
import { couple, hero } from '../../data/content'
import { EASE } from '../../lib/motion'
import DoubleHappiness from '../ui/DoubleHappiness'

export default function Hero({ reveal, onCta }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
  }
  const state = reveal ? 'show' : 'hidden'

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background image with Ken Burns + scroll parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <motion.img
          src={hero.image}
          alt={hero.imageAlt}
          className="h-full w-full object-cover"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={reveal ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.6, ease: EASE }}
        />
        {/* slow infinite drift */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.0, 0.06, 0.0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(255,240,210,0.4), transparent 60%)' }}
        />
      </motion.div>

      {/* Cinematic red-lacquer overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4a0810]/65 via-[#6e0d14]/30 to-[#3a060c]/85" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 100% at 50% 50%, transparent 42%, rgba(58,6,12,0.7) 100%)' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex w-full max-w-content flex-col items-center px-6 text-center text-ivory"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate={state}
      >
        <motion.div variants={item} className="mb-5 sm:mb-6">
          <DoubleHappiness
            medallion
            title="Song Hỷ"
            className="h-24 w-24 text-[5.5rem] sm:h-28 sm:w-28 sm:text-[6.5rem]"
          />
        </motion.div>

        <motion.span variants={item} className="eyebrow !text-champagne">
          {hero.kicker}
        </motion.span>

        <motion.p variants={item} className="mt-5 font-serif text-lg tracking-[0.2em] text-ivory/80 sm:text-xl">
          {hero.invite}
        </motion.p>

        {/* Names */}
        <motion.h1
          variants={item}
          className="mt-4 font-display leading-[0.96]"
          style={{ fontSize: 'clamp(2.7rem, 12vw, 10.5rem)' }}
        >
          <span className="block">{couple.groom}</span>
          <span className="my-1 block font-serif text-3xl italic text-gold-shimmer sm:my-2 sm:text-5xl">
            &amp;
          </span>
          <span className="block">{couple.bride}</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 font-serif text-xl italic text-ivory/85 sm:text-2xl">
          {couple.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-6 flex items-center gap-4 text-champagne">
          <span className="h-px w-10 bg-champagne/50" />
          <span className="font-sans text-sm uppercase tracking-[0.32em]">{couple.datesShort}</span>
          <span className="h-px w-10 bg-champagne/50" />
        </motion.div>

        <motion.div variants={item} className="mt-10">
          <Countdown light />
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <MagneticButton variant="solid" onClick={onCta}>
            {hero.scrollHint}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1">
              <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={reveal ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-ivory/40 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-champagne"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
