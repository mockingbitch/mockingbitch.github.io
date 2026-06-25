// 囍 — the Song Hỷ (Double Happiness) mark, the signature of an Asian wedding.
// Decorative by default (aria-hidden); pass `title` to expose it to AT.
export default function DoubleHappiness({ className = '', gold = false, title }) {
  return (
    <span
      className={`${gold ? 'hy-gold' : 'hy'} ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
    >
      囍
    </span>
  )
}
