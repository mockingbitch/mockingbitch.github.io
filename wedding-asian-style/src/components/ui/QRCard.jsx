import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { EASE } from '../../lib/motion'

/**
 * A gift QR card. If `data.image` is set, that image is shown; otherwise a QR
 * is generated from `data.value`.
 */
export default function QRCard({ data, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
      data-cursor="hover"
      className="group glass relative flex w-full max-w-xs flex-col items-center rounded-2xl p-7 text-center shadow-glass ring-1 ring-transparent transition-all duration-700 hover:-translate-y-2 hover:ring-gold/35"
    >
      <span className="eyebrow">{data.side}</span>

      <div className="relative mt-5 rounded-2xl bg-white p-4 shadow-glass">
        {/* corner ticks */}
        <span className="pointer-events-none absolute inset-2 rounded-xl border border-gold/20" />
        {data.image ? (
          <img
            src={data.image}
            alt={`Mã QR ${data.side}`}
            className="h-[168px] w-[168px] rounded-md object-contain"
            loading="lazy"
          />
        ) : (
          <QRCodeSVG
            value={data.value}
            size={168}
            level="M"
            bgColor="#ffffff"
            fgColor="#231f1c"
            includeMargin={false}
          />
        )}
      </div>

      <h3 className="mt-5 font-display text-xl text-charcoal">{data.name}</h3>
      {data.bank && (
        <p className="mt-1 font-serif text-base text-charcoal/70">{data.bank}</p>
      )}
      {data.account && (
        <p className="mt-0.5 font-sans text-sm tracking-[0.18em] text-gold-deep">{data.account}</p>
      )}
    </motion.div>
  )
}
