import { useEffect } from 'react'
import Lenis from 'lenis'

// Smooth momentum scrolling. Disabled automatically when the user prefers
// reduced motion, and cleaned up on unmount.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Skip smooth-scroll on touch devices — native momentum scrolling is
    // already good there and Lenis just adds per-frame overhead.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Let in-page anchor links drive Lenis for smooth section jumps.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])
}
