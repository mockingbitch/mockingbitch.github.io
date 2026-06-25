import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gallery } from '../../data/content'
import { fadeUp, stagger } from '../../lib/motion'
import Panel, { ChapterTag } from '../ui/Panel'
import Lightbox from '../ui/Lightbox'

export default function Gallery({ no, total }) {
  const [index, setIndex] = useState(null)

  // While the lightbox is open, mark the body so the Deck ignores arrow keys.
  useEffect(() => {
    if (index !== null) document.body.setAttribute('data-lightbox-open', '')
    else document.body.removeAttribute('data-lightbox-open')
    return () => document.body.removeAttribute('data-lightbox-open')
  }, [index])

  return (
    <Panel bg="bg-ink-800" contentClassName="items-center justify-center">
      <div className="w-full max-w-6xl">
        <motion.div
          variants={stagger(0.06, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="mb-6 flex items-center justify-between">
            <ChapterTag no={no} total={total} label="Khoảnh Khắc" />
            <span className="hidden font-mono text-[0.65rem] tracking-wider2 text-faint sm:block">
              Bấm để phóng to
            </span>
          </motion.div>

          {/* contact sheet */}
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
            {gallery.images.map((img, i) => (
              <motion.button
                key={i}
                variants={fadeUp}
                onClick={() => setIndex(i)}
                className="group relative aspect-[4/5] overflow-hidden bg-ink"
                aria-label={`Ảnh ${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[0.25] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute inset-0 ring-1 ring-inset ring-paper/10 transition group-hover:ring-bronze/50" />
                <span className="absolute left-2 top-2 font-mono text-[0.6rem] text-paper/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <Lightbox
        images={gallery.images}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </Panel>
  )
}
