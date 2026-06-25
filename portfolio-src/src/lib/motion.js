// Shared Framer Motion presets so every section animates consistently.

export const EASE = [0.22, 1, 0.36, 1]

// Fade + rise, used for most reveals.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

// Stagger container — children should use `fadeUp` (or similar).
export const stagger = (gap = 0.09, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
})

// Standard viewport config for whileInView reveals.
export const inView = { once: true, margin: '0px 0px -12% 0px' }
