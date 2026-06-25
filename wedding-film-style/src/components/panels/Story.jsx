import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

// One love-story milestone as a full-screen chapter.
export default function Story({ no, total, milestone }) {
  const m = milestone
  return (
    <Panel
      image={m.image}
      imageAlt={m.title}
      overlay="bg-gradient-to-t from-ink via-ink/70 to-ink/20"
      contentClassName="items-end justify-start"
    >
      <motion.div
        variants={stagger(0.12, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-panel"
      >
        <motion.div variants={fadeUp}>
          <ChapterTag no={no} total={total} label="Chuyện Tình" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-xs uppercase tracking-wider2 text-bronze"
        >
          {m.month} · {m.year}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="display mt-3 text-[clamp(2.2rem,6vw,4rem)] text-paper"
        >
          {m.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="lede mt-4 max-w-lg text-paper/85">
          {m.text}
        </motion.p>
      </motion.div>
    </Panel>
  )
}
