// 囍 — the Song Hỷ (Double Happiness) mark, the signature of an Asian wedding.
// Variants:
//   default   → solid red glyph (.hy)
//   gold      → gold gradient glyph (.hy-gold)
//   medallion → RED glyph inside a gold-ringed cream disc (reads on any bg)
// Decorative by default (aria-hidden); pass `title` to expose it to AT.
export default function DoubleHappiness({ className = '', gold = false, medallion = false, title }) {
  const aria = {
    role: title ? 'img' : undefined,
    'aria-label': title || undefined,
    'aria-hidden': title ? undefined : 'true',
  }

  if (medallion) {
    return (
      <span
        className={`inline-flex aspect-square items-center justify-center rounded-full border-2 border-gold/70 bg-ivory/95 shadow-[0_10px_34px_-10px_rgba(110,15,30,0.55)] ${className}`}
        {...aria}
      >
        <span className="hy" style={{ fontSize: '0.58em' }}>
          囍
        </span>
      </span>
    )
  }

  return (
    <span className={`${gold ? 'hy-gold' : 'hy'} ${className}`} {...aria}>
      囍
    </span>
  )
}
