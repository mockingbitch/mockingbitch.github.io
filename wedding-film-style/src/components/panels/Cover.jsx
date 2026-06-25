import { motion } from 'framer-motion'
import { couple, hero } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Cover({ no, total }) {
  return (
    <Panel
      image={hero.image}
      imageAlt={hero.imageAlt}
      overlay="bg-gradient-to-tr from-ink via-ink/75 to-ink/25"
      contentClassName="items-end justify-start pb-28 sm:pb-24"
    >
      <motion.div
        variants={stagger(0.12, 0.15)}
        initial="hidden"
        animate="show"
        className="max-w-panel"
      >
        <motion.div variants={fadeUp}>
          <ChapterTag no={no} total={total} label="Thiệp Mời" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-8 font-mono text-[0.7rem] uppercase tracking-wider2 text-paper/70"
        >
          {hero.kicker}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="display mt-4 text-[clamp(3rem,9vw,7rem)] text-paper"
        >
          {couple.bride}
          <span className="mx-2 italic text-bronze sm:mx-3">&amp;</span>
          {couple.groom}
        </motion.h1>
        <motion.p variants={fadeUp} className="lede mt-5 max-w-md text-paper/85">
          {couple.tagline}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-7 flex items-center gap-4">
          <span className="h-px w-10 bg-bronze/60" />
          <span className="font-mono text-sm tracking-wider2 text-bronze">
            {couple.datesShort}
          </span>
        </motion.div>
      </motion.div>
    </Panel>
  )
}
