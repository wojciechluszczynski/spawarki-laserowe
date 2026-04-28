const reasons = [
  {
    num: '01',
    title: 'Autoryzowany dealer: gwarancja producenta',
    desc: 'Kupujesz bezpośrednio od autoryzowanego dealera BLink Laser w Polsce. Gwarancja producenta, nie resellerska. Dokumentacja techniczna prosto od wytwórcy.',
  },
  {
    num: '02',
    title: 'Serwis w Polsce: reakcja w 48h',
    desc: 'Części zamienne na magazynie w kraju. Czas reakcji serwisu do 48h roboczych. Brak tygodniowych przestojów na import: to realna różnica przy maszynie pracującej na zmianę.',
  },
  {
    num: '03',
    title: 'Szkolenie operatora w cenie',
    desc: 'Dostawa, instalacja i szkolenie obsługi wliczone w cenę zakupu. Operator samodzielnie pracuje po 1–3 dniach. Bez ukrytych kosztów uruchomienia.',
  },
  {
    num: '04',
    title: 'Merytorycznie: nie tylko sprzedażowo',
    desc: 'Jeśli 1500W wystarczy do Twojej produkcji: powiemy to wprost. Nie zaproponujemy 3000W dla wyższej marży. Naszym celem jest maszyna, która zarobi na siebie w zakładanym czasie.',
  },
]

export function WhyUs() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Dlaczego przez nas
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ letterSpacing: '-0.02em' }}>
            Co różni nas od zwykłego sklepu
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Nie wystawiamy faktur i znikamy. Współpracujemy z zakładem przez cały cykl: od doboru modelu po serwis pogwarancyjny.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <li
              key={r.num}
              className="flex gap-5 p-6 rounded-2xl border transition-all duration-200 hover:shadow-[var(--shadow-md)]"
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
