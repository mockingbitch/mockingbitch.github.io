import { motion } from 'framer-motion'
import { contact, socials, profile } from '../../data/content.js'
import { fadeUp, stagger, inView } from '../../lib/motion.js'
import Section from '../ui/Section.jsx'
import Icon from '../ui/Icon.jsx'
import MagneticButton from '../ui/MagneticButton.jsx'

const details = [
  { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'phone', label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
  { icon: 'mapPin', label: 'Location', value: contact.location, href: null },
]

export default function Contact() {
  return (
    <Section id="contact">
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="card relative overflow-hidden p-8 text-center sm:p-14"
      >
        {/* glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]" />

        <motion.p variants={fadeUp} className="kicker mb-4">
          {contact.eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-2xl font-display text-3xl font-bold text-balance sm:text-5xl"
        >
          {contact.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-tone-muted">
          {contact.text}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
          <MagneticButton href={`mailto:${contact.email}`} className="btn-primary">
            <Icon name="mail" size={18} /> Say hello
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} className="btn-ghost">
            Download résumé
            <Icon name="arrowUpRight" size={18} />
          </MagneticButton>
        </motion.div>

        {/* Details */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-12 grid max-w-2xl gap-4 border-t border-line pt-8 sm:grid-cols-3"
        >
          {details.map((d) => {
            const inner = (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line text-accent">
                  <Icon name={d.icon} size={18} />
                </span>
                <span className="text-left">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-tone-faint">
                    {d.label}
                  </span>
                  <span className="block text-sm text-tone-base">{d.value}</span>
                </span>
              </>
            )
            return d.href ? (
              <a
                key={d.label}
                href={d.href}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                {inner}
              </a>
            ) : (
              <div key={d.label} className="flex items-center gap-3">
                {inner}
              </div>
            )
          })}
        </motion.div>

        {/* Socials */}
        <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-tone-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
            >
              <Icon name={s.icon} size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
