interface ComparisonRow {
  label: string
  values: (string | boolean | number)[]
  highlight?: boolean
}

interface ComparisonTableProps {
  title: string
  headers: string[]
  rows: ComparisonRow[]
  footnote?: string
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-label="Tak"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <circle cx="9" cy="9" r="9" fill="rgba(6,182,212,0.15)" />
      <path
        d="M5 9.5L7.5 12L13 6.5"
        stroke="#06B6D4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function renderCellValue(value: string | boolean | number) {
  if (value === true) {
    return <CheckIcon />
  }
  if (value === false) {
    return (
      <span style={{ color: 'var(--muted)', fontSize: '1.2em', lineHeight: 1 }}>
        —
      </span>
    )
  }
  return <span>{String(value)}</span>
}

export function ComparisonTable({ title, headers, rows, footnote }: ComparisonTableProps) {
  return (
    <div>
      <h2
        className="text-xl font-black mb-4"
        style={{ letterSpacing: '-0.01em', fontFamily: 'var(--font-rubik)' }}
      >
        {title}
      </h2>

      <div
        style={{
          overflowX: 'auto',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  style={{
                    backgroundColor: 'var(--fg)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    padding: '0.875rem 1rem',
                    textAlign: i === 0 ? 'left' : 'center',
                    minWidth: i === 0 ? '180px' : undefined,
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.01em',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const isEven = rowIdx % 2 === 0
              const rowBg = row.highlight
                ? 'var(--accent-subtle)'
                : isEven
                ? 'var(--bg-card)'
                : 'var(--bg)'

              return (
                <tr key={rowIdx} style={{ backgroundColor: rowBg }}>
                  {/* Label column */}
                  <td
                    style={{
                      color: 'var(--fg-secondary)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      padding: '0.75rem 1rem',
                      borderTop: '1px solid var(--border)',
                      minWidth: '180px',
                    }}
                  >
                    {row.label}
                  </td>

                  {/* Data columns */}
                  {row.values.map((value, colIdx) => (
                    <td
                      key={colIdx}
                      style={{
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        padding: '0.75rem 1rem',
                        borderTop: '1px solid var(--border)',
                        color: 'var(--fg)',
                      }}
                    >
                      {renderCellValue(value)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {footnote && (
        <p
          className="mt-2 text-xs"
          style={{ color: 'var(--muted)', lineHeight: 1.6 }}
        >
          {footnote}
        </p>
      )}
    </div>
  )
}
