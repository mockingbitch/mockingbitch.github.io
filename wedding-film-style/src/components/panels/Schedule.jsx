import { motion } from 'framer-motion'
import { events, scheduleSection } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Schedule({ no, total }) {
  return (
    <Panel bg="bg-ink" contentClassName="items-center justify-center">
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
            <ChapterTag no={no} total={total} label="Chương Trình" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="display mt-5 text-center text-[clamp(2rem,5vw,3.4rem)] text-paper"
          >
            {scheduleSection.title}
          </motion.h2>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {events.map((ev) => (
              <motion.div key={ev.key} variants={fadeUp}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl italic text-bronze-soft">
                    {ev.rite}
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-wider2 text-faint">
                    {ev.dateShort}
                  </span>
                </div>
                <div className="mt-5 space-y-4 border-l border-line pl-5">
                  {ev.schedule.map((item) => (
                    <div key={item.title} className="relative">
                      <span className="absolute -left-[23px] top-1.5 h-2 w-2 rounded-full bg-bronze" />
                      <p className="font-mono text-xs tracking-wider2 text-bronze">
                        {item.time}
                      </p>
                      <p className="mt-0.5 font-display text-lg text-paper">{item.title}</p>
                      <p className="text-sm text-muted">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Panel>
  )
}
