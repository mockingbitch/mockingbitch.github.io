import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { couple } from '../../data/content'

function Unit({ value, label, light }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl sm:h-20 sm:w-20 ${
          light ? 'glass-dark text-ivory' : 'glass text-charcoal'
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: '-110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '110%', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl tabular-nums sm:text-4xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={`mt-3 font-sans text-[0.58rem] uppercase tracking-[0.3em] ${
          light ? 'text-ivory/70' : 'text-charcoal/60'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export default function Countdown({ light = false, className = '' }) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(couple.date)

  if (isComplete) {
    return (
      <p className={`font-serif text-2xl italic ${light ? 'text-ivory' : 'text-charcoal'} ${className}`}>
        Hôm nay là ngày trọng đại ✦
      </p>
    )
  }

  const units = [
    { value: days, label: 'Ngày' },
    { value: hours, label: 'Giờ' },
    { value: minutes, label: 'Phút' },
    { value: seconds, label: 'Giây' },
  ]

  return (
    <div className={`flex items-start gap-3 sm:gap-5 ${className}`}>
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-3 sm:gap-5">
          <Unit value={u.value} label={u.label} light={light} />
          {i < units.length - 1 && (
            <span
              className={`mt-4 font-display text-2xl sm:mt-5 sm:text-3xl ${
                light ? 'text-champagne/50' : 'text-gold/50'
              }`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
