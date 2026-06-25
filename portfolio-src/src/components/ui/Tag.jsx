// Small pill used for tech tags / practices.
export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-ink-200/60 px-3 py-1 font-mono text-xs text-tone-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent ${className}`}
    >
      {children}
    </span>
  )
}
