// Standard <section> wrapper: anchor id, vertical rhythm and max width.
export default function Section({ id, children, className = '', padded = true }) {
  return (
    <section id={id} className={`section scroll-mt-20 ${padded ? 'py-24 sm:py-32' : ''} ${className}`}>
      {children}
    </section>
  )
}
