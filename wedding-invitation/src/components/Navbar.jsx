import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { nav, couple } from '../data/content'
import { EASE } from '../lib/motion'

export default function Navbar({ scrollTo, show }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  // Background shift on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (id) => {
    setOpen(false)
    scrollTo?.(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled ? 'glass border-b border-white/40' : ''
        }`}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-8">
          {/* monogram */}
          <button
            onClick={() => handleNav('hero')}
            data-cursor="hover"
            className="font-display text-xl tracking-tight text-charcoal sm:text-2xl"
          >
            {couple.bride[0]}
            <span className="text-gold">&amp;</span>
            {couple.groom[0]}
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  data-cursor="hover"
                  className="group relative font-sans text-[0.7rem] uppercase tracking-[0.24em] text-charcoal/70 transition-colors hover:text-charcoal"
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ${
                      active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* mobile burger */}
          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="hover"
            aria-label="Menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-px w-6 bg-charcoal" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-px w-6 bg-charcoal" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="h-px w-6 bg-charcoal" />
          </button>
        </nav>

        {/* scroll progress */}
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-champagne via-gold to-rose-gold"
          style={{ scaleX: progress }}
        />
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[85] flex flex-col items-center justify-center lg:hidden"
          >
            <div className="glass absolute inset-0" />
            <ul className="relative flex flex-col items-center gap-7">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 * i }}
                >
                  <button
                    onClick={() => handleNav(item.id)}
                    className="font-display text-4xl text-charcoal"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
