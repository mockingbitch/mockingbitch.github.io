import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, profile } from '../data/content.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import Icon from './ui/Icon.jsx'

const ids = navItems.map((n) => n.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-line bg-ink/70 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8"
        >
          <a href="#home" className="group flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 font-mono text-accent transition-colors group-hover:bg-accent/10">
              P
            </span>
            <span className="hidden sm:inline">
              {profile.shortName}
              <span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? 'text-accent' : 'text-tone-muted hover:text-tone-base'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden btn-ghost !px-4 !py-2 text-sm sm:inline-flex"
            >
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-tone-base md:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 backdrop-blur-lg md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="flex min-h-full flex-col items-center justify-center gap-6 px-6 py-24"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`font-display text-3xl font-semibold ${
                      active === item.id ? 'text-accent' : 'text-tone-base'
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-4"
                >
                  Download Résumé
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
