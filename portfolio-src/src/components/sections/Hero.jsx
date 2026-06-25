import { motion } from 'framer-motion'
import { profile, socials, stats } from '../../data/content.js'
import { fadeUp, stagger, EASE } from '../../lib/motion.js'
import Icon from '../ui/Icon.jsx'
import MagneticButton from '../ui/MagneticButton.jsx'

// Decorative "code window" shown beside the intro.
function CodeCard() {
  const line = (indent, content) => (
    <motion.div
      variants={fadeUp}
      className="flex gap-3 whitespace-pre font-mono text-[12px] leading-6 sm:text-[13px]"
      style={{ paddingLeft: indent * 14 }}
    >
      {content}
    </motion.div>
  )
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
      className="card relative w-full max-w-md overflow-hidden shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-2 border-b border-line bg-ink-200/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-tone-faint">developer.js</span>
      </div>
      <motion.div
        variants={stagger(0.12, 0.4)}
        initial="hidden"
        animate="show"
        className="space-y-1 overflow-x-auto p-4 sm:p-5"
      >
        {line(0, <span className="text-tone-faint">const <span className="text-cyan-glow">dev</span> = {'{'}</span>)}
        {line(1, <span><span className="text-accent">name</span>: <span className="text-tone-base">'Phong'</span>,</span>)}
        {line(1, <span><span className="text-accent">role</span>: <span className="text-tone-base">'Full-stack'</span>,</span>)}
        {line(1, <span><span className="text-accent">stack</span>: [<span className="text-tone-base">'Laravel'</span>, <span className="text-tone-base">'React'</span>],</span>)}
        {line(1, <span><span className="text-accent">ships</span>: <span className="text-cyan-glow">true</span>,</span>)}
        {line(0, <span className="text-tone-faint">{'}'}<span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent animate-blink" /></span>)}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="section relative flex min-h-[100svh] flex-col justify-center scroll-mt-20 pt-24 pb-16 sm:pt-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Intro */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          {profile.available && (
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-accent">Open to opportunities</span>
            </motion.div>
          )}

          <motion.p variants={fadeUp} className="kicker mb-4">
            {profile.role}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {profile.headline[0]}{' '}
            <span className="text-gradient">{profile.headline[1]}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-tone-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" className="btn-primary">
              View my work
              <Icon name="arrowDown" size={18} />
            </MagneticButton>
            <MagneticButton href={profile.resumeUrl} className="btn-ghost">
              Download résumé
              <Icon name="arrowUpRight" size={18} />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
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

        {/* Code card */}
        <div className="flex justify-center lg:justify-end" style={{ perspective: 1000 }}>
          <CodeCard />
        </div>
      </div>

      {/* Stats strip */}
      <motion.div
        variants={stagger(0.1, 0.3)}
        initial="hidden"
        animate="show"
        className="mt-16 grid grid-cols-3 gap-4 border-t border-line pt-8 sm:max-w-xl"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <div className="font-display text-2xl font-bold text-tone-base sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs leading-snug text-tone-faint sm:text-sm">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
