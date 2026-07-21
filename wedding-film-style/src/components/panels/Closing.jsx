import { motion } from 'framer-motion'
import { couple, footer, gallery } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Closing({ no, total }) {
  return (
    <Panel
      image={gallery.images[gallery.images.length - 1]?.src}
      imageAlt=""
      overlay="bg-ink/80"
      contentClassName="items-center justify-center text-center"
    >
      <motion.div
        variants={stagger(0.13, 0.1)}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-2xl"
      >
        <motion.div variants={fadeUp} className="flex justify-center">
          <ChapterTag no={no} total={total} label="Hẹn Gặp" />
        </motion.div>
        <motion.p variants={fadeUp} className="lede mt-8 text-paper/85">
          {footer.message}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="display mt-6 text-[clamp(2.4rem,7vw,5rem)] text-paper"
        >
          {couple.groom}
          <span className="mx-2 italic text-bronze sm:mx-3">&amp;</span>
          {couple.bride}
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-6 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-bronze/60" />
          <span className="font-mono text-sm tracking-wider2 text-bronze">{footer.date}</span>
          <span className="h-px w-10 bg-bronze/60" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-xs uppercase tracking-wider2 text-paper/60"
        >
          {couple.hashtag}
        </motion.p>
      </motion.div>
    </Panel>
  )
}
