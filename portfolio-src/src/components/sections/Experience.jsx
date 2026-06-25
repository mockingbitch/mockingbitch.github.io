import { motion } from 'framer-motion'
import { experience } from '../../data/content.js'
import { fadeUp, stagger, inView } from '../../lib/motion.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Icon from '../ui/Icon.jsx'
import Tag from '../ui/Tag.jsx'

function TimelineItem({ job }) {
  return (
    <motion.li variants={fadeUp} className="relative pl-10">
      {/* Node */}
      <span className="absolute left-0 top-1 grid h-7 w-7 -translate-x-[13px] place-items-center rounded-full border border-accent/40 bg-ink text-accent">
        <Icon name="briefcase" size={14} />
      </span>

      <div className="card card-hover p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg font-semibold text-tone-base">
            {job.role}
            <span className="text-accent"> @ {job.company}</span>
          </h3>
          <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-tone-faint">
            {job.type}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs text-tone-faint">{job.period}</p>

        <ul className="mt-4 space-y-2">
          {job.points.map((pt, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-tone-muted">
              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {job.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.stack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  )
}

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index={3}
        eyebrow="Experience"
        title="Where I've been building."
        subtitle="From front-end beginnings to owning full-stack features and the servers they run on."
      />

      <motion.ol
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="relative mt-12 space-y-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-line before:to-transparent"
      >
        {experience.map((job) => (
          <TimelineItem key={`${job.company}-${job.role}`} job={job} />
        ))}
      </motion.ol>
    </Section>
  )
}
