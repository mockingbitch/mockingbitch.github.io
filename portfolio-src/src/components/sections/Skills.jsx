import { motion } from 'framer-motion'
import { skillGroups, practices } from '../../data/content.js'
import { fadeUp, stagger, inView, EASE } from '../../lib/motion.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Icon from '../ui/Icon.jsx'
import Tag from '../ui/Tag.jsx'

function SkillBar({ name, level }) {
  return (
    <motion.div variants={fadeUp}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-tone-base">{name}</span>
        <span className="font-mono text-xs text-tone-faint">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-300">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent-soft"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index={2}
        eyebrow="Skills"
        title="The tools I reach for."
        subtitle="A pragmatic, full-stack toolkit — weighted toward the back-end, with enough front-end to ship complete products."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.name}
            variants={stagger(0.07, gi * 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="card card-hover p-6"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/5 text-accent">
                <Icon name={group.icon} size={20} />
              </span>
              <h3 className="font-display text-lg font-semibold text-tone-base">{group.name}</h3>
            </motion.div>
            <div className="space-y-4">
              {group.skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Practices */}
      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-10"
      >
        <motion.p variants={fadeUp} className="mb-4 font-mono text-xs uppercase tracking-wider text-tone-faint">
          // also in my toolbox
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
          {practices.map((p) => (
            <Tag key={p}>{p}</Tag>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
