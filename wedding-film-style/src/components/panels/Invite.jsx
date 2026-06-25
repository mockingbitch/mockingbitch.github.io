import { motion } from 'framer-motion'
import { hero, quote } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Invite({ no, total }) {
  return (
    <Panel bg="bg-ink" contentClassName="items-center justify-center text-center">
      <motion.div
        variants={stagger(0.14, 0.1)}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-2xl"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <ChapterTag no={no} total={total} label="Lời Ngỏ" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-10 font-mono text-[0.7rem] uppercase tracking-wider2 text-paper/70"
        >
          {hero.invite}
        </motion.p>
        <motion.blockquote
          variants={fadeUp}
          className="display mt-8 text-[clamp(1.9rem,4.5vw,3.4rem)] italic text-paper"
        >
          “{quote.text}”
        </motion.blockquote>
        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-xs uppercase tracking-wider2 text-bronze"
        >
          — {quote.attribution}
        </motion.p>
      </motion.div>
    </Panel>
  )
}
