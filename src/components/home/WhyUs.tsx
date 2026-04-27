const criteria = [
  {
    num: '01',
    title: 'Precyzja i powtarzalność',
    desc: 'Sprawdzamy deklarowane tolerancje vs. rzeczywiste wyniki na stali węglowej, nierdzewnej i aluminium.',
  },
  {
    num: '02',
    title: 'Całkowity koszt posiadania',
    desc: 'Liczymy nie tylko cenę zakupu, ale serwis, części eksploatacyjne i czas przestoju maszyny.',
  },
  {
    num: '03',
    title: 'Wsparcie techniczne',
    desc: 'Oceniamy czas reakcji serwisu, dostępność części zamiennych i jakość dokumentacji.',
  },
  {
    num: '04',
    title: 'Pozycja rynkowa',
    desc: 'Współpracujemy z BlinkLaser jako autoryzowanym dystrybutorem - to pozwala nam pokrywać koszty serwisu bez wpływu na oceny.',
  },
]

export function WhyUs() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black max-w-lg mb-3" style={{ letterSpacing: '-0.02em' }}>
            Jak oceniamy spawarki laserowe
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Nie jesteśmy sklepem. Analizujemy maszyny z perspektywy operatora.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 gap-5">
          {criteria.map((r) => (
            <li
              key={r.num}
              className="flex gap-5 p-6 rounded-[var(--radius-lg)] border transition-all duration-200 hover:shadow-[var(--shadow-md)]"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
            >
              <div
                className="shrink-0 w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center font-black text-lg"
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
