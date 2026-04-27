const signals = [
  'Niezależna analiza',
  'Dane z rynku 2025',
  'Bez ukrytych prowizji',
]

export function EditorialBanner() {
  return (
    <div
      className="w-full py-3"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <ul className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-10">
          {signals.map((signal) => (
            <li
              key={signal}
              className="flex items-center gap-2"
              style={{ color: 'var(--muted)', fontSize: '0.8125rem' }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <circle cx="7" cy="7" r="7" fill="var(--accent)" opacity="0.15" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {signal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
