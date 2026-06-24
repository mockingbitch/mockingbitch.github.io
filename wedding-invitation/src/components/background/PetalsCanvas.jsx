import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * A single GPU-friendly <canvas> that renders drifting sakura petals and a
 * fine haze of golden dust. One rAF loop, DPR-aware, particle count scaled to
 * viewport, and paused when the tab is hidden — built to hold 60fps.
 */
export default function PetalsCanvas({ density = 1 }) {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let petals = []
    let dust = []
    let raf
    let running = true
    let t = 0

    const PETAL_COLORS = [
      'rgba(244, 222, 226, OPACITY)', // soft pink
      'rgba(231, 210, 174, OPACITY)', // champagne
      'rgba(251, 248, 241, OPACITY)', // ivory
      'rgba(192, 138, 130, OPACITY)', // rose gold
    ]

    const rand = (min, max) => min + Math.random() * (max - min)

    function makePetal(initial = false) {
      const size = rand(7, 17)
      return {
        x: rand(0, width),
        y: initial ? rand(0, height) : rand(-height * 0.2, -10),
        size,
        speedY: rand(0.25, 0.85) * (size / 12),
        swayAmp: rand(14, 46),
        swayFreq: rand(0.006, 0.016),
        swayPhase: rand(0, Math.PI * 2),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.012, 0.012),
        flip: rand(0.4, 1),
        color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
        opacity: rand(0.35, 0.8),
      }
    }

    function makeDust(initial = false) {
      return {
        x: rand(0, width),
        y: initial ? rand(0, height) : rand(-50, 0),
        r: rand(0.5, 1.8),
        speedY: rand(0.08, 0.35),
        drift: rand(-0.2, 0.2),
        twPhase: rand(0, Math.PI * 2),
        twSpeed: rand(0.01, 0.04),
        opacity: rand(0.15, 0.6),
      }
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = width * height
      const petalCount = Math.round(Math.min(46, (area / 42000) * density))
      const dustCount = Math.round(Math.min(90, (area / 16000) * density))

      petals = Array.from({ length: petalCount }, () => makePetal(true))
      dust = Array.from({ length: dustCount }, () => makeDust(true))
    }

    function drawPetal(p) {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      // gentle 3d "flip" by scaling x with a sine of time
      const fx = Math.cos(t * 0.02 + p.swayPhase) * p.flip
      ctx.scale(fx, 1)
      ctx.beginPath()
      const s = p.size
      // a soft petal shape via two bezier curves
      ctx.moveTo(0, -s * 0.5)
      ctx.bezierCurveTo(s * 0.5, -s * 0.5, s * 0.5, s * 0.45, 0, s * 0.6)
      ctx.bezierCurveTo(-s * 0.5, s * 0.45, -s * 0.5, -s * 0.5, 0, -s * 0.5)
      ctx.fillStyle = p.color.replace('OPACITY', p.opacity.toFixed(2))
      ctx.fill()
      ctx.restore()
    }

    function frame() {
      if (!running) return
      t += 1
      ctx.clearRect(0, 0, width, height)

      // dust
      for (const d of dust) {
        d.y += d.speedY
        d.x += d.drift + Math.sin(t * 0.01 + d.twPhase) * 0.15
        const tw = (Math.sin(t * d.twSpeed + d.twPhase) + 1) / 2
        if (d.y > height + 10) {
          d.y = -10
          d.x = rand(0, width)
        }
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(231, 210, 174, ${(d.opacity * (0.4 + tw * 0.6)).toFixed(2)})`
        ctx.fill()
      }

      // petals
      for (const p of petals) {
        p.y += p.speedY
        p.x += Math.sin(t * p.swayFreq + p.swayPhase) * 0.6
        p.rot += p.rotSpeed
        if (p.y > height + 30) Object.assign(p, makePetal(false))
        if (p.x < -40) p.x = width + 30
        if (p.x > width + 40) p.x = -30
        drawPetal(p)
      }

      raf = requestAnimationFrame(frame)
    }

    function onVisibility() {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    frame()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, density])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
    />
  )
}
