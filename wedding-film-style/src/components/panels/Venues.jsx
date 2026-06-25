import { motion } from 'framer-motion'
import { details, events } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Venues({ no, total }) {
  return (
    <Panel bg="bg-ink-800" contentClassName="items-center justify-center">
      <div
        data-vscroll
        className="no-scrollbar max-h-full w-full max-w-5xl overflow-y-auto py-2"
      >
        <motion.div
          variants={stagger(0.1, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <ChapterTag no={no} total={total} label="Địa Điểm" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="display mt-5 text-center text-[clamp(2rem,5vw,3.4rem)] text-paper"
          >
            {details.title}
          </motion.h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {events.map((ev) => (
              <motion.div
                key={ev.key}
                variants={fadeUp}
                className="border border-line p-7 text-center sm:p-9"
              >
                <span className="kicker">{ev.side}</span>
                <h3 className="display mt-3 text-3xl text-bronze-soft">{ev.rite}</h3>
                <p className="mt-3 font-mono text-xs tracking-wider2 text-paper/80">
                  {ev.weekday} · {ev.dateShort}
                </p>
                <p className="mt-1 text-sm text-muted">Đón khách lúc {ev.time}</p>
                <div className="mx-auto my-5 h-px w-12 bg-bronze/40" />
                <p className="font-display text-xl text-paper">{ev.venue}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {ev.address.join(', ')}
                </p>
                <a
                  href={ev.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn mt-6"
                >
                  {ev.mapLabel || 'Mở bản đồ'} →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Panel>
  )
}
