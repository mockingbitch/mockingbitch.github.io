import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { gifts } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'

export default function Gifts({ no, total }) {
  return (
    <Panel bg="bg-ink" contentClassName="items-center justify-center">
      <div
        data-vscroll
        className="no-scrollbar max-h-full w-full max-w-3xl overflow-y-auto py-2 text-center"
      >
        <motion.div
          variants={stagger(0.1, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <ChapterTag no={no} total={total} label="Mừng Cưới" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="display mt-5 text-[clamp(2rem,5vw,3.2rem)] text-paper"
          >
            {gifts.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-md text-sm text-muted">
            {gifts.intro}
          </motion.p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {gifts.qrs.map((q) => (
              <motion.div
                key={q.side}
                variants={fadeUp}
                className="flex flex-col items-center border border-line p-7"
              >
                <span className="kicker">{q.side}</span>
                <div className="mt-4 rounded-lg bg-paper p-3">
                  {q.image ? (
                    <img src={q.image} alt={`QR ${q.side}`} className="h-32 w-32" />
                  ) : (
                    <QRCodeSVG
                      value={q.value}
                      size={128}
                      bgColor="#F2EEE6"
                      fgColor="#100F0C"
                      level="M"
                    />
                  )}
                </div>
                <p className="mt-4 font-display text-lg text-paper">{q.name}</p>
                {q.bank && <p className="mt-1 text-sm text-muted">{q.bank}</p>}
                {q.account && (
                  <p className="font-mono text-sm tracking-wider text-bronze-soft">{q.account}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Panel>
  )
}
