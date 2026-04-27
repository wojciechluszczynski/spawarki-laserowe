const steps = [
  {
    n: '01',
    label: 'Wypełnij formularz w 2 minuty',
    desc: 'Materiał, grubość, skala produkcji. Tyle wystarczy — resztę wyjaśniamy przez telefon lub e-mail.',
  },
  {
    n: '02',
    label: 'Otrzymujesz konkretną rekomendację',
    desc: 'Nie ofertę "do wyboru" — konkretny model z uzasadnieniem: dlaczego ten, a nie droższy. W ciągu jednego dnia roboczego.',
  },
  {
    n: '03',
    label: 'Demo na Twoim materiale',
    desc: 'Przed decyzją organizujemy spawanie próbne — na materiale, który faktycznie produkujesz, z oczekiwaną grubością i spoiną.',
  },
  {
    n: '04',
    label: 'Dostawa, instalacja, szkolenie',
    desc: 'Wliczone w cenę zakupu. Operator pracuje samodzielnie po 1–3 dniach. Serwis i części dostępne w Polsce.',
  },
]

export function ProcessSteps() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
          Jak to działa
        </p>
        <h2 className="text-2xl md:text-3xl font-black" style={{ letterSpacing: '-0.02em' }}>
          Od zapytania do pierwszej spoiny
        </h2>
      </div>

      <ol className="grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex flex-col gap-3">
            {i < steps.length - 1 && (
              <div
                className="hidden md:block absolute top-5 h-px"
                style={{ backgroundColor: 'var(--border)', left: '2.75rem', width: 'calc(100% - 1rem)' }}
              />
            )}
            <div
              className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
              style={{ backgroundColor: '#06B6D4', color: '#0D1117', fontFamily: 'var(--font-rubik)' }}
            >
              {s.n}
            </div>
            <p className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{s.label}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
