// Shared Framer Motion variants + easings used across the site so every
// reveal feels like it came from the same hand.

export const EASE = [0.22, 1, 0.36, 1] // expo-out, the "luxe" curve
export const EASE_SMOOTH = [0.65, 0, 0.35, 1]

// Standard viewport trigger config for scroll reveals
export const viewport = { once: true, amount: 0.3 }
export const viewportSoft = { once: true, amount: 0.18 }

export const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE } },
}

// Parent that staggers its children
export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// A single line of text masked from below
export const lineReveal = {
  hidden: { y: '115%' },
  show: {
    y: '0%',
    transition: { duration: 1.05, ease: EASE },
  },
}

// Image clip-reveal (curtain wipe up)
export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.25, ease: EASE },
  },
}
