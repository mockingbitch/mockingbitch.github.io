// Shared full-screen chapter "panel" for the horizontal deck.
export function ChapterTag({ no, total, label, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-xs tracking-wider2 text-bronze">
        {String(no).padStart(2, '0')}
        <span className="text-faint"> / {String(total).padStart(2, '0')}</span>
      </span>
      <span className="h-px w-8 bg-bronze/50" />
      <span className="kicker">{label}</span>
    </div>
  )
}

export default function Panel({
  image,
  imageAlt,
  overlay,
  children,
  className = '',
  contentClassName = 'items-center justify-center',
  bg = 'bg-ink-800',
}) {
  return (
    <section className={`panel film-grain ${image ? '' : bg} ${className}`}>
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={imageAlt || ''}
            loading="lazy"
            className="h-full w-full scale-105 object-cover"
          />
          <div
            className={`absolute inset-0 ${overlay || 'bg-gradient-to-t from-ink via-ink/60 to-ink/35'}`}
          />
        </div>
      )}
      <div className={`relative z-10 flex h-full w-full px-7 py-20 sm:px-16 ${contentClassName}`}>
        {children}
      </div>
    </section>
  )
}
