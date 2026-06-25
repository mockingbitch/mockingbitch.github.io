import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import RevealImage from '../ui/RevealImage'
import { loveStory } from '../../data/content'
import { EASE, fadeUp, viewport } from '../../lib/motion'

function Milestone({ data, index }) {
  const isLeft = index % 2 === 0

  const cardVariant = {
    hidden: { opacity: 0, y: 60, x: 0 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 1.1, ease: EASE } },
  }

  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-16">
      {/* Node on the line */}
      <motion.div
        className="absolute left-[18px] top-2 z-10 md:left-1/2 md:-translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute h-4 w-4 animate-pulse-soft rounded-full bg-gold/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-ivory" />
        </span>
      </motion.div>

      {/* Card */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className={`ml-12 md:ml-0 ${
          isLeft ? 'md:col-start-1 md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4'
        }`}
      >
        <div
          data-cursor="hover"
          className="group glass overflow-hidden rounded-2xl shadow-glass transition-all duration-700 hover:-translate-y-2 hover:shadow-lift"
        >
          <div className="relative overflow-hidden">
            <RevealImage
              src={data.image}
              alt={data.title}
              className="h-56 w-full sm:h-64"
              imgClassName="transition-transform duration-[1.4s] ease-luxe group-hover:scale-110"
              rounded="rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className={`p-7 ${isLeft ? 'md:items-end' : ''}`}>
            <span className="font-display text-5xl text-gold/80">{data.year}</span>
            <p className="eyebrow mt-1">{data.month}</p>
            <h3 className="mt-3 font-display text-2xl text-charcoal">{data.title}</h3>
            <p className="lede mt-3 text-base">{data.text}</p>
          </div>
        </div>
      </motion.div>

      {/* spacer for the empty column on desktop */}
      <div className={isLeft ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'} />
    </div>
  )
}

export default function LoveStory() {
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="story" className="relative mx-auto max-w-content px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow={loveStory.eyebrow}
        title={loveStory.title}
        intro={loveStory.intro}
      />

      <div ref={lineRef} className="relative mt-20">
        {/* the rail */}
        <div className="absolute left-[24px] top-0 h-full w-px bg-gold/15 md:left-1/2 md:-translate-x-1/2" />
        {/* animated fill */}
        <motion.div
          className="absolute left-[24px] top-0 w-px origin-top bg-gradient-to-b from-gold via-rose-gold to-gold md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: fillScale, height: '100%' }}
        />

        <div className="space-y-16 md:space-y-24">
          {loveStory.milestones.map((m, i) => (
            <Milestone key={`${m.year}-${m.month}`} data={m} index={i} />
          ))}
        </div>
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto mt-20 max-w-md text-center font-serif text-2xl italic text-rose-gold"
      >
        …và chương đẹp nhất vẫn đang được viết tiếp.
      </motion.p>
    </section>
  )
}
