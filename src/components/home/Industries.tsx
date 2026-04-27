import { IconFactory } from '@/components/ui/Icons'

const industries = [
  { name: 'Konstrukcje stalowe', desc: 'Ramy, wsporniki, kratownice, połączenia kątowe' },
  { name: 'Produkcja metalowa', desc: 'Obudowy, blachy, detale seryjne ze stali i nierdzewki' },
  { name: 'Automotive', desc: 'Uchwyty, wsporniki, komponenty podwozia bez odkształceń' },
  { name: 'HVAC i wentylacja', desc: 'Kanały, kołnierze, obudowy - estetyczna spoina bez szlifowania' },
  { name: 'Meble metalowe i design', desc: 'Precyzyjne spoiny widoczne w finalnym produkcie' },
  { name: 'Modernizacja spawalnictwa', desc: 'Zamiana TIG/MIG na laser — wyższa prędkość i jakość' },
]

export function Industries() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
          Zastosowania
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
          Dla jakich branż
        </h2>
        <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
          Spawarka laserowa sprawdza się wszędzie tam, gdzie liczy się precyzja, powtarzalność i efektywność produkcji metalowych elementów.
        </p>
      </div>

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {industries.map((item) => (
          <li
            key={item.name}
            className="group flex items-start gap-3 p-5 rounded-[var(--radius-lg)] border transition-all duration-150 hover:border-[var(--accent)] hover:shadow-[var(--shadow-sm)]"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <div
              className="mt-0.5 shrink-0 w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center transition-colors duration-150 group-hover:bg-[var(--accent-subtle)]"
              style={{ backgroundColor: 'var(--accent-subtle)' }}
            >
              <IconFactory size={14} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--fg)' }}>{item.name}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
