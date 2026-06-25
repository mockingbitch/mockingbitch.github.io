import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A horizontal, snap-scrolling "deck" of full-screen chapter panels.
// - vertical wheel is translated to horizontal scroll (desktop)
// - native swipe + scroll-snap on touch
// - ← / → keys, on-screen arrows and chapter dots navigate
export default function Deck({ children, labels = [] }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const count = Children.count(children)

  // Translate vertical wheel into horizontal movement (unless the cursor is
  // over an element that scrolls vertically on its own).
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onWheel = (e) => {
      const vs = e.target.closest && e.target.closest('[data-vscroll]')
      if (vs && vs.scrollHeight > vs.clientHeight + 4) return
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Track the active panel from scroll position.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() =>
        setActive(Math.round(el.scrollLeft / el.clientWidth)),
      )
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current
      if (!el) return
      const idx = Math.max(0, Math.min(count - 1, i))
      el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
      if (window.history?.replaceState) window.history.replaceState(null, '', `#${idx + 1}`)
    },
    [count],
  )

  // Deep-link: jump to the chapter named in the URL hash (#3) on load.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const n = parseInt((window.location.hash || '').slice(1), 10)
    if (n >= 1 && n <= count) {
      requestAnimationFrame(() => {
        el.scrollLeft = (n - 1) * el.clientWidth
      })
    }
  }, [count])

  useEffect(() => {
    const onKey = (e) => {
      // Let the lightbox own the keyboard while it is open.
      if (document.body.hasAttribute('data-lightbox-open')) return
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        goTo(active + 1)
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goTo(active - 1)
      } else if (e.key === 'Home') goTo(0)
      else if (e.key === 'End') goTo(count - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, goTo, count])

  const atStart = active <= 0
  const atEnd = active >= count - 1

  return (
    <>
      <div
        ref={trackRef}
        className="no-scrollbar flex h-[100svh] w-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {children}
      </div>

      {/* Fixed masthead */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-7 py-6 sm:px-16">
        <span className="font-display text-lg italic text-paper/90">
          TD <span className="text-bronze">&amp;</span> QP
        </span>
        <span className="font-mono text-xs tracking-wider2 text-paper/70">
          {String(active + 1).padStart(2, '0')}
          <span className="text-faint"> / {String(count).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Active chapter label (bottom-left) */}
      <div className="pointer-events-none fixed bottom-7 left-7 z-50 hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="kicker"
          >
            {labels[active]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Dots + arrows (bottom-right) */}
      <div className="fixed bottom-6 right-7 z-50 flex items-center gap-4 sm:right-16">
        <div className="hidden items-center gap-2 sm:flex">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Chương ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-bronze' : 'w-1.5 bg-paper/30 hover:bg-paper/60'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(active - 1)}
            disabled={atStart}
            aria-label="Chương trước"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-paper/80 transition-colors hover:border-bronze/60 hover:text-bronze disabled:opacity-30"
          >
            ←
          </button>
          <button
            onClick={() => goTo(active + 1)}
            disabled={atEnd}
            aria-label="Chương sau"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-paper/80 transition-colors hover:border-bronze/60 hover:text-bronze disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="fixed inset-x-0 bottom-0 z-50 h-[2px] bg-paper/10">
        <div
          className="h-full bg-bronze transition-[width] duration-300"
          style={{ width: `${((active + 1) / count) * 100}%` }}
        />
      </div>

      {/* Swipe hint, only on the first chapter */}
      <AnimatePresence>
        {atStart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pointer-events-none fixed bottom-16 left-1/2 z-50 -translate-x-1/2 sm:bottom-7"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-paper/60">
              Vuốt / cuộn sang ngang&nbsp;&nbsp;→
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
