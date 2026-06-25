import { useCallback, useEffect, useRef, useState } from 'react'

// Frequencies for a soft, open C-major-9 voicing (Hz).
const CHORD = [130.81, 196.0, 261.63, 329.63, 392.0, 493.88]

/**
 * A gentle, self-generated ambient pad using the Web Audio API — no audio file
 * required, and crucially it NEVER autoplays (the AudioContext is only created
 * on the first user gesture). Returns a toggle for play/pause with smooth
 * volume fades.
 */
export function useAmbientAudio({ volume = 0.11 } = {}) {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const nodesRef = useRef([])
  const lfoRef = useRef(null)

  const build = useCallback(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    const ctx = new AudioCtx()

    const master = ctx.createGain()
    master.gain.value = 0
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.Q.value = 0.6
    master.connect(filter)
    filter.connect(ctx.destination)

    // breathing LFO on the master gain
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.07
    lfoGain.gain.value = 0.03
    lfo.connect(lfoGain)
    lfoGain.connect(master.gain)
    lfo.start()

    const nodes = CHORD.map((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = freq
      osc.detune.value = (i - CHORD.length / 2) * 4
      const g = ctx.createGain()
      g.gain.value = (i === 0 ? 0.5 : 0.32) / CHORD.length
      osc.connect(g)
      g.connect(master)
      osc.start()
      return { osc, g }
    })

    ctxRef.current = ctx
    masterRef.current = master
    nodesRef.current = nodes
    lfoRef.current = lfo
    return { ctx, master }
  }, [])

  const toggle = useCallback(async () => {
    if (!ctxRef.current) build()
    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    if (ctx.state === 'suspended') await ctx.resume()
    const now = ctx.currentTime

    if (!playing) {
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(volume, now + 2.2)
      setPlaying(true)
    } else {
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 1.4)
      setPlaying(false)
    }
  }, [build, playing, volume])

  useEffect(() => {
    return () => {
      try {
        nodesRef.current.forEach(({ osc }) => osc.stop())
        lfoRef.current?.stop()
        ctxRef.current?.close()
      } catch {
        /* ignore teardown races */
      }
    }
  }, [])

  return { playing, toggle }
}
