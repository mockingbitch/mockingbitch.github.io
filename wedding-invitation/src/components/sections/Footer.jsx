import { motion } from 'framer-motion'
import Ornament from '../ui/Ornament'
import CornerFloral from '../ui/CornerFloral'
import { couple, footer } from '../../data/content'
import { EASE, fadeUp, viewport } from '../../lib/motion'

export default function Footer({ scrollTo }) {
  return (
    <footer
      className="relative overflow-hidden px-6 pb-12 pt-28 text-center text-ivory sm:pt-36"
      style={{
        background: 'radial-gradient(120% 120% at 50% 0%, #2c2622 0%, #1a1613 60%, #120f0d 100%)',
      }}
    >
      <div className="pointer-events-none absolute -left-8 -top-4 opacity-30">
        <CornerFloral corner="tl" tone="warm" size={220} play />
      </div>
      <div className="pointer-events-none absolute -right-8 -top-4 opacity-30">
        <CornerFloral corner="tr" tone="warm" size={220} play delay={0.2} />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="font-serif text-2xl italic text-ivory/80 sm:text-3xl">
          {footer.message}
        </motion.p>

        <Ornament className="mx-auto my-8 opacity-90" width={210} />

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1.2, ease: EASE }}
          className="font-display text-5xl text-ivory sm:text-7xl"
        >
          {couple.bride}
          <span className="mx-3 text-gold-shimmer">&amp;</span>
          {couple.groom}
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mt-5 font-sans text-sm uppercase tracking-[0.4em] text-champagne/80">
          {footer.date} · {couple.city}
        </motion.p>

        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="mt-4 font-vibes text-3xl text-rose-gold">
          {couple.hashtag}
        </motion.p>

        <motion.button
          type="button"
          onClick={() => scrollTo?.('hero')}
          data-cursor="hover"
          whileHover={{ y: -4 }}
          className="group mx-auto mt-12 flex flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-champagne"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">Về đầu trang</span>
        </motion.button>

        <div className="mt-14 flex flex-col items-center gap-1 text-ivory/35">
          <span className="font-sans text-[0.62rem] uppercase tracking-[0.3em]">
            {footer.credit} · {couple.year}
          </span>
        </div>
      </div>
    </footer>
  )
}
