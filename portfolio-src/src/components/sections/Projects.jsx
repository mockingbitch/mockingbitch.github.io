import { motion } from 'framer-motion'
import { projects } from '../../data/content.js'
import { fadeUp, stagger, inView } from '../../lib/motion.js'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Icon from '../ui/Icon.jsx'
import Tag from '../ui/Tag.jsx'

function ProjectCard({ project, featured }) {
  const clickable = Boolean(project.href)
  const newTab = clickable && !project.href.startsWith('#')

  return (
    // The card is always a <div>. When clickable, the title link is a
    // "stretched link" (::after covers the card) so the whole card is the
    // primary target — while the separate "Source" link stays independently
    // focusable. This avoids invalid nested <a> elements.
    <motion.div
      variants={fadeUp}
      className={`card card-hover group relative flex flex-col p-6 ${featured ? 'md:col-span-2' : ''}`}
    >
      {/* top row */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-accent/5 text-accent">
            <Icon name={featured ? 'sparkle' : 'code'} size={18} />
          </span>
          {featured && (
            <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[11px] text-accent">
              Featured{clickable ? ' · Live' : ''}
            </span>
          )}
        </div>
        {clickable && (
          <span className="text-tone-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
            <Icon name="arrowUpRight" size={20} />
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-semibold text-tone-base transition-colors group-hover:text-accent">
        {clickable ? (
          <a
            href={project.href}
            {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="after:absolute after:inset-0 after:rounded-2xl"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tone-muted">{project.blurb}</p>

      {project.accent && (
        <p className="mt-3 font-mono text-xs text-tone-faint">{project.accent}</p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {project.repo && (
        <div className="mt-4 border-t border-line pt-4">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center gap-2 font-mono text-xs text-tone-muted transition-colors hover:text-accent"
          >
            <Icon name="github" size={15} /> Source
          </a>
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index={4}
        eyebrow="Projects"
        title="Things I've shipped."
        subtitle="A mix of a real, deployed product and the kind of back-end & infrastructure work that fills my day."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-12 grid gap-5 md:grid-cols-2"
      >
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} featured={p.featured} />
        ))}
      </motion.div>
    </Section>
  )
}
