const signals = [
  { icon: '✓', text: 'Autoryzowany dealer BLink Laser' },
  { icon: '✓', text: 'Gwarancja i serwis w Polsce' },
  { icon: '✓', text: 'Szkolenie operatora w cenie' },
  { icon: '✓', text: 'Odpowiedź w 24h robocze' },
]

export function EditorialBanner() {
  return (
    <div
      className="w-full py-3.5"
      style={{
        backgroundColor: '#0D1117',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {signals.map((s) => (
            <li
              key={s.text}
              className="flex items-center gap-2 text-[12px] font-medium"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <span style={{ color: '#06B6D4' }}>{s.icon}</span>
              {s.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
