import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scrolling and exposes the instance via a ref.
 * Respects `prefers-reduced-motion` by skipping smoothing entirely.
 *
 * @param {boolean} enabled  Pause smoothing while the preloader is on screen.
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      gestureOrientation: 'vertical',
    })

    lenisRef.current = lenis

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Lock / unlock scrolling (e.g. while the preloader plays or a lightbox is open)
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) {
      document.documentElement.classList.toggle('lenis-stopped', !enabled)
      document.body.style.overflow = enabled ? '' : 'hidden'
      return
    }
    if (enabled) lenis.start()
    else lenis.stop()
  }, [enabled])

  return lenisRef
}
