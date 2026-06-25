// Lightweight inline SVG icon set — no icon-library dependency.
// Stroke icons inherit `currentColor`; brand glyphs are filled.

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const PATHS = {
  // UI / stroke
  arrowUpRight: <path {...STROKE} d="M7 17 17 7M8 7h9v9" />,
  arrowDown: <path {...STROKE} d="M12 5v14M19 12l-7 7-7-7" />,
  arrowRight: <path {...STROKE} d="M5 12h14M13 6l6 6-6 6" />,
  external: (
    <g {...STROKE}>
      <path d="M14 5h5v5" />
      <path d="M19 5 10 14" />
      <path d="M19 13v6H5V5h6" />
    </g>
  ),
  mapPin: (
    <g {...STROKE}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </g>
  ),
  phone: (
    <path
      {...STROKE}
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
    />
  ),
  mail: (
    <g {...STROKE}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </g>
  ),
  server: (
    <g {...STROKE}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </g>
  ),
  layout: (
    <g {...STROKE}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </g>
  ),
  terminal: (
    <g {...STROKE}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </g>
  ),
  code: <path {...STROKE} d="m8 6-6 6 6 6M16 6l6 6-6 6" />,
  sparkle: (
    <path
      {...STROKE}
      d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M6.3 17.7l2.4-2.4M15.3 8.7l2.4-2.4"
    />
  ),
  briefcase: (
    <g {...STROKE}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </g>
  ),
  check: <path {...STROKE} d="M20 6 9 17l-5-5" />,
  menu: <path {...STROKE} d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...STROKE} d="M6 6l12 12M18 6 6 18" />,
  // Brand / fill
  github: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34v-7.2H6v7.2h2.34ZM7.17 9.9a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72ZM18 18.34v-4.13c0-2.2-1.18-3.23-2.75-3.23-1.27 0-1.84.7-2.16 1.19v-1.03H10.7v7.2h2.34v-3.86c0-.94.18-1.85 1.34-1.85 1.14 0 1.16 1.07 1.16 1.91v3.8H18Z"
    />
  ),
}

export default function Icon({ name, size = 20, className = '', ...rest }) {
  const glyph = PATHS[name]
  if (!glyph) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
