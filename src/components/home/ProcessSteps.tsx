const steps = [
  {
    n: '01',
    label: 'Opisz swoją produkcję',
    desc: 'Co tniesz, z jakiego materiału, jakie grubości i ile sztuk miesięcznie. Im więcej szczegółów - tym trafniejszy dobór.',
  },
  {
    n: '02',
    label: 'Otrzymasz konkretną propozycję',
    desc: 'Odpiszemy z rekomendacją konkretnego modelu i uzasadnieniem - w ciągu jednego dnia roboczego.',
  },
  {
    n: '03',
    label: 'Demo na Twoim materiale',
    desc: 'Organizujemy demonstrację na materiale, który faktycznie tniesz. Możliwość przetestowania przed podjęciem decyzji.',
  },
  {
    n: '04',
    label: 'Dostawa i uruchomienie',
    desc: 'Dostawa, montaż, szkolenie operatora. Gwarancja producenta, serwis i części dostępne w Polsce.',
  },
]

export function ProcessSteps() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-black" style={{ letterSpacing: '-0.02em' }}>
          Jak wygląda zakup
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
              className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center text-sm font-black shrink-0"
              style={{ backgroundColor: '#FFA52F', color: '#0D1117', fontFamily: 'var(--font-rubik)' }}
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
