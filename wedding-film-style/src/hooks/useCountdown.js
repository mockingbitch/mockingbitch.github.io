import { useEffect, useState } from 'react'

function diff(target) {
  const now = Date.now()
  const total = Math.max(0, target - now)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { total, days, hours, minutes, seconds }
}

/**
 * Live countdown to an ISO date string. Updates once per second.
 * @param {string} targetDate  e.g. '2026-09-12T16:00:00'
 */
export function useCountdown(targetDate) {
  const target = new Date(targetDate).getTime()
  const [time, setTime] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return { ...time, isComplete: time.total <= 0 }
}
