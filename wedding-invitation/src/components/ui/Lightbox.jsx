import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

/**
 * Full-screen image lightbox with keyboard + button navigation. The overlay
 * carries `data-lenis-prevent` so the page behind stays put while open.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0

  const go = useCallback(
    (dir) => {
      if (!open) return
      const next = (index + dir + images.length) % images.length
      onNavigate(next)
    },
    [index, images.length, onNavigate, open]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-xl" />

          {/* close */}
          <button
            onClick={onClose}
            data-cursor="hover"
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* prev / next */}
          {['prev', 'next'].map((side) => (
            <button
              key={side}
              onClick={(e) => {
                e.stopPropagation()
                go(side === 'next' ? 1 : -1)
              }}
              data-cursor="hover"
              aria-label={side}
              className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ivory/80 transition-colors hover:bg-white/10 hover:text-ivory ${
                side === 'prev' ? 'left-3 sm:left-7' : 'right-3 sm:right-7'
              }`}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ transform: side === 'next' ? 'rotate(180deg)' : 'none' }}>
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="relative z-[1] max-h-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index].src}
                alt={images[index].alt}
                className="max-h-[78vh] w-auto rounded-sm object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center font-serif text-lg italic text-ivory/70">
                {images[index].alt}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-sans text-xs tracking-[0.3em] text-ivory/50">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
