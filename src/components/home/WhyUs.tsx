const reasons = [
  {
    num: '01',
    title: 'Głowica 4w1: spawanie, czyszczenie, hartowanie, lutowanie',
    desc: 'Jedna maszyna, cztery funkcje bez wymiany urządzenia. Zmiana trybu to 3 sekundy w panelu dotykowym. Żaden inny typ spawarki tego nie oferuje.',
  },
  {
    num: '02',
    title: 'Prędkość niemożliwa dla TIG i MIG',
    desc: 'Nierdzewka 3 mm: TIG ok. 8 min, Blink ok. 2,5 min. Na 150 złączach dziennie to 13 roboczogodzin różnicy. Bez dodatkowego operatora.',
  },
  {
    num: '03',
    title: 'Zero szlifowania po spawaniu',
    desc: 'Minimalna strefa wpływu ciepła (poniżej 0,5 mm) eliminuje odkształcenia i przebarwienia. Elementy idą bezpośrednio do lakierni lub do klienta.',
  },
  {
    num: '04',
    title: 'Zużycie argonu 10× niższe niż TIG',
    desc: 'TIG: 10–15 l/min. Laser: ok. 1 l/min. Przy cenie argonu 8 zł/m³ i jednej zmianie to ponad 1 000 zł oszczędności miesięcznie na samym gazie.',
  },
]

export function WhyUs() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Przewagi techniczne
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ letterSpacing: '-0.03em' }}>
            Co wyróżnia spawarki laserowe Blink
          </h2>
          <p className="text-base" style={{ color: 'var(--muted)' }}>
            Konkretne parametry, które decydują o opłacalności inwestycji w Twojej produkcji.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <li
              key={r.num}
              className="flex gap-5 p-6 rounded-2xl border transition-all duration-200 hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)]"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm"
                style={{ backgroundColor: '#ECFEFF', color: '#06B6D4', fontFamily: 'var(--font-rubik)' }}
              >
                {r.num}
              </div>
              <div>
                <p className="font-bold mb-1.5" style={{ color: 'var(--fg)' }}>{r.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{r.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
