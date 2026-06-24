import { useEffect, useState } from 'react'

/**
 * Subscribe to a CSS media query. SSR-safe and event-driven.
 * @param {string} query  e.g. '(min-width: 768px)'
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export const useIsTouch = () => useMediaQuery('(pointer: coarse)')

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
