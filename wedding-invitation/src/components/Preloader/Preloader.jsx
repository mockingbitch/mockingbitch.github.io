import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Stars from './Stars'
import GoldDust from './GoldDust'
import Envelope from './Envelope'
import CornerFloral from '../ui/CornerFloral'
import { couple } from '../../data/content'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const EASE = [0.22, 1, 0.36, 1]

// Stage timeline (ms from mount)
const STEPS = [
  { key: 'stars', at: 150 },
  { key: 'particles', at: 1100 },
  { key: 'date', at: 2300 },
  { key: 'bloom', at: 3500 },
  { key: 'names', at: 4300 },
  { key: 'envelope', at: 5300 },
  { key: 'open', at: 6700 },
  { key: 'done', at: 8600 },
]
const ORDER = STEPS.map((s) => s.key)

export default function Preloader({ onComplete }) {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState('idle')
  const timers = useRef([])
  const finished = useRef(false)

  const reached = (key) => ORDER.indexOf(stage) >= ORDER.indexOf(key)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    timers.current.forEach(clearTimeout)
    onComplete?.()
  }

  useEffect(() => {
    if (reduced) {
      setStage('names')
      const t = setTimeout(finish, 1400)
      timers.current.push(t)
      return () => clearTimeout(t)
    }

    STEPS.forEach(({ key, at }) => {
      const t = setTimeout(() => {
        if (key === 'done') finish()
        else setStage(key)
      }, at)
      timers.current.push(t)
    })

    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const skip = () => {
    setStage('open')
    timers.current.forEach(clearTimeout)
    const t = setTimeout(finish, 1700)
    timers.current.push(t)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden grain"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 30%, #2a2420 0%, #1a1613 55%, #100d0b 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)', transition: { duration: 1.1, ease: EASE } }}
    >
      {/* stars */}
      <Stars show={reached('stars')} />

      {/* golden gathering dust */}
      <GoldDust gather={reached('particles') && !reached('envelope')} />

      {/* corner florals bloom */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0">
          <CornerFloral corner="tl" play={reached('bloom')} tone="warm" size={230} />
        </div>
        <div className="absolute right-0 top-0">
          <CornerFloral corner="tr" play={reached('bloom')} tone="warm" size={230} delay={0.15} />
        </div>
        <div className="absolute bottom-0 left-0">
          <CornerFloral corner="bl" play={reached('bloom')} tone="warm" size={230} delay={0.3} />
        </div>
        <div className="absolute bottom-0 right-0">
          <CornerFloral corner="br" play={reached('bloom')} tone="warm" size={230} delay={0.45} />
        </div>
      </div>

      {/* CENTER: date + names (fade out as the envelope arrives) */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        animate={{
          opacity: reached('envelope') ? 0 : 1,
          y: reached('envelope') ? -24 : 0,
          filter: reached('envelope') ? 'blur(4px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ pointerEvents: reached('envelope') ? 'none' : 'auto' }}
      >
        {/* handwritten date */}
        <div className="relative h-14 overflow-hidden sm:h-20">
          <motion.span
            className="block font-vibes text-5xl text-champagne sm:text-7xl"
            style={{ textShadow: '0 0 26px rgba(197,160,92,0.5)' }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={reached('date') ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            {couple.dateShort}
          </motion.span>
        </div>
        <motion.div
          className="mt-2 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0, width: 180 }}
          animate={{ scaleX: reached('date') ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        />

        {/* names */}
        <motion.span
          className="mt-9 font-sans text-[0.6rem] uppercase tracking-[0.5em] text-champagne/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: reached('names') ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          Lễ Thành Hôn
        </motion.span>
        <motion.h1
          className="mt-3 font-display text-5xl text-ivory sm:text-7xl"
          initial={{ opacity: 0, y: 26 }}
          animate={reached('names') ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        >
          {couple.bride}
          <span className="mx-3 text-gold-shimmer">&amp;</span>
          {couple.groom}
        </motion.h1>
      </motion.div>

      {/* ENVELOPE (the gate) */}
      {reached('envelope') && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <Envelope appear={reached('envelope')} open={reached('open')} />
        </div>
      )}

      {/* Skip */}
      {!reached('open') && (
        <motion.button
          type="button"
          onClick={skip}
          data-cursor="hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="group absolute bottom-8 left-1/2 z-30 -translate-x-1/2 font-sans text-[0.6rem] uppercase tracking-[0.4em] text-ivory/45 transition-colors hover:text-champagne"
        >
          Bỏ qua
          <span className="mx-auto mt-1 block h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
        </motion.button>
      )}
    </motion.div>
  )
}
