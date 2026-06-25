import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'
import { details, events } from '../../data/content'
import { EASE, viewport } from '../../lib/motion'

function EventCard({ event, index }) {
  const accent = event.accent === 'rose' ? 'text-rose-gold' : 'text-gold-deep'
  const rule = event.accent === 'rose' ? 'via-rose-gold' : 'via-gold'

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1.1, ease: EASE, delay: index * 0.15 }}
      data-cursor="hover"
      className="group glass relative flex flex-col items-center overflow-hidden rounded-[1.75rem] p-9 text-center shadow-glass ring-1 ring-transparent transition-all duration-700 hover:-translate-y-2 hover:ring-gold/30 sm:p-11"
    >
      {/* header */}
      <span className="eyebrow">{event.side}</span>
      <h3 className={`mt-2 font-script text-4xl font-semibold ${accent}`}>{event.rite}</h3>

      <div className={`my-7 h-px w-24 bg-gradient-to-r from-transparent to-transparent ${rule}`} />

      {/* date block */}
      <span className="font-sans text-xs uppercase tracking-[0.4em] text-charcoal/55">
        {event.weekday}
      </span>
      <p className="mt-3 font-display text-4xl text-charcoal sm:text-5xl">{event.dateShort}</p>
      <p className="mt-3 inline-flex items-center gap-2 font-serif text-lg text-charcoal/75">
        <span className="h-1 w-1 rounded-full bg-gold" />
        Đón khách lúc {event.time}
        <span className="h-1 w-1 rounded-full bg-gold" />
      </p>

      {/* venue */}
      <div className="mt-8 flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/70 ring-1 ring-gold/20">
          <Icon name="venue" size={28} />
        </div>
        <h4 className="mt-4 font-display text-2xl text-charcoal">{event.venue}</h4>
        <div className="mt-2 space-y-0.5">
          {event.address.map((line, i) => (
            <p key={i} className="font-serif text-base text-charcoal/65">
              {line}
            </p>
          ))}
        </div>
      </div>

      <a
        href={event.mapHref}
        target="_blank"
        rel="noreferrer"
        data-cursor="hover"
        className="group/btn mt-7 inline-flex items-center gap-2 rounded-full bg-white/50 px-6 py-3 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-gold-deep ring-1 ring-gold/25 transition-colors duration-500 hover:bg-white/80"
      >
        {event.mapLabel}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}

export default function WeddingInfo() {
  return (
    <section id="info" className="relative mx-auto max-w-content px-6 py-28 sm:py-36">
      <SectionHeading eyebrow={details.eyebrow} title={details.title} intro={details.intro} />

      <div className="mt-16 grid grid-cols-1 gap-7 lg:grid-cols-2">
        {events.map((event, i) => (
          <EventCard key={event.key} event={event} index={i} />
        ))}
      </div>

      {/* dress code */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 1, ease: EASE }}
        className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 rounded-2xl px-8 py-7 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/70 ring-1 ring-gold/20">
          <Icon name="dress" size={24} />
        </div>
        <span className="eyebrow">{details.dress.label}</span>
        <h4 className="font-display text-2xl text-charcoal">{details.dress.title}</h4>
        <p className="lede max-w-md text-base">{details.dress.text}</p>
      </motion.div>
    </section>
  )
}
