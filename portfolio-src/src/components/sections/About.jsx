import { motion } from 'framer-motion'
import { about } from '../../data/content.js'
import { fadeUp, stagger, inView } from '../../lib/motion.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading index={1} eyebrow={about.eyebrow} title={about.title} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16">
        {/* Bio */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="space-y-5"
        >
          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-base leading-relaxed text-tone-muted sm:text-lg"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* Quick facts */}
        <motion.dl
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="card divide-y divide-line self-start overflow-hidden"
        >
          {about.facts.map((f) => (
            <motion.div
              key={f.label}
              variants={fadeUp}
              className="flex items-baseline justify-between gap-4 px-5 py-4"
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-tone-faint">
                {f.label}
              </dt>
              <dd className="text-right text-sm font-medium text-tone-base">{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </Section>
  )
}
