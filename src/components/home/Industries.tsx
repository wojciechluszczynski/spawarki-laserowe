import { IconFactory } from '@/components/ui/Icons'

const industries = [
  {
    name: 'Konstrukcje stalowe',
    desc: 'Ramy, trawersy, kratownice: spawanie do 20 mm jedną głowicą, bez wymiany urządzenia.',
  },
  {
    name: 'Produkcja ze stali nierdzewnej',
    desc: 'Zero przebarwień, spoina gotowa bez szlifowania. Wyroby prosto do lakierni lub klienta.',
  },
  {
    name: 'Automotive i kooperacja',
    desc: 'Uchwyty, wsporniki, elementy podwozia: precyzja bez odkształceń termicznych na cienkiej blasze.',
  },
  {
    name: 'HVAC i wentylacja',
    desc: 'Kanały, kołnierze, skrzynki rozdzielcze: nierdzewka do 8 mm z estetyką gotową do montażu.',
  },
  {
    name: 'Meble metalowe i design',
    desc: 'Spoiny widoczne w finalnym produkcie: laser daje jakość niemożliwą do osiągnięcia TIG-iem w porównywalnym czasie.',
  },
  {
    name: 'Migracja z TIG i MIG',
    desc: 'Zakłady z 5+ operatorami TIG zwracają inwestycję w 6–12 miesięcy tylko na oszczędnościach czasu i gazu.',
  },
]

export function Industries() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
          Zastosowania
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
          Kto korzysta ze spawarki laserowej
        </h2>
        <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>
          Laser sprawdza się wszędzie tam, gdzie czas cyklu, estetyka spoiny lub koszt wykańczania mają znaczenie dla marży.
        </p>
      </div>

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {industries.map((item) => (
          <li
            key={item.name}
            className="group flex items-start gap-3 p-5 rounded-2xl border transition-all duration-150 hover:border-[var(--accent)] hover:shadow-[var(--shadow-sm)]"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <div
              className="mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-150"
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
