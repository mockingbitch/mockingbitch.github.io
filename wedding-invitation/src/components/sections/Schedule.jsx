import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'
import CornerFloral from '../ui/CornerFloral'
import { scheduleSection, events } from '../../data/content'
import { EASE, viewport } from '../../lib/motion'

function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
      className="relative flex gap-5 pb-9 last:pb-0"
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass-dark flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ring-champagne/30"
        >
          <Icon name={item.icon} size={26} stroke="#E7D2AE" />
        </motion.div>
      </div>
      <div className="flex-1 pt-1">
        <span className="font-sans text-sm font-medium uppercase tracking-[0.28em] text-champagne">
          {item.time}
        </span>
        <h4 className="mt-1.5 font-display text-xl text-ivory sm:text-2xl">{item.title}</h4>
        <p className="mt-1.5 font-serif text-base text-ivory/60">{item.text}</p>
      </div>
    </motion.div>
  )
}

function ScheduleColumn({ event, index }) {
  const accent = event.accent === 'rose' ? 'text-rose-gold' : 'text-champagne'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, ease: EASE, delay: index * 0.15 }}
      className="glass-dark rounded-[1.75rem] p-8 sm:p-10"
    >
      {/* header */}
      <div className="mb-8 text-center">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-champagne/80">
          {event.side}
        </span>
        <h3 className={`mt-2 font-script text-3xl font-semibold ${accent}`}>{event.rite}</h3>
        <p className="mt-2 font-serif text-lg text-ivory/70">
          {event.weekday} · {event.dateShort}
        </p>
      </div>

      {/* timeline */}
      <div className="relative">
        <div className="absolute bottom-7 left-[27px] top-3 w-px bg-champagne/20" />
        {event.schedule.map((item, i) => (
          <TimelineItem key={item.title} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{
        background: 'radial-gradient(120% 100% at 50% 0%, #2c2622 0%, #1c1815 60%, #161210 100%)',
      }}
    >
      <div className="pointer-events-none absolute -left-6 top-10 opacity-40">
        <CornerFloral corner="tl" tone="warm" size={200} play />
      </div>
      <div className="pointer-events-none absolute -right-6 bottom-10 opacity-40">
        <CornerFloral corner="br" tone="warm" size={200} play delay={0.3} />
      </div>

      <div className="relative mx-auto max-w-content px-6">
        <SectionHeading eyebrow={scheduleSection.eyebrow} title={scheduleSection.title} light />

        <div className="mt-16 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {events.map((event, i) => (
            <ScheduleColumn key={event.key} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
