import { profile, socials, navItems } from '../../data/content.js'
import Icon from '../ui/Icon.jsx'

export default function Footer() {
  return (
    <footer className="section border-t border-line py-10">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 font-mono text-accent">
            P
          </span>
          <span>
            {profile.name}
            <span className="text-accent">.</span>
          </span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm text-tone-muted transition-colors hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={s.label}
              className="text-tone-muted transition-colors hover:text-accent"
            >
              <Icon name={s.icon} size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-2 text-center font-mono text-xs text-tone-faint sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind.</p>
        <a href="#home" className="transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
