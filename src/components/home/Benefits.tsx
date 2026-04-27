import { IconSpeed, IconPrecision, IconRepeat, IconWaste, IconAutomation } from '@/components/ui/Icons'

const benefits = [
  {
    icon: IconSpeed,
    stat: '3–4×',
    title: 'szybciej niż TIG',
    desc: 'Na stali nierdzewnej 3 mm: TIG ok. 8 min, laser ok. 2,5 min. Różnica rośnie wraz z wolumenem — przy 150 złączach dziennie to 13 roboczogodzin oszczędności.',
  },
  {
    icon: IconPrecision,
    stat: '<0,5 mm',
    title: 'strefa wpływu ciepła',
    desc: 'Minimalne ciepło wejściowe — zero odkształceń na cienkiej blasze i nierdzewce. Elementy idą prosto do lakierni, bez prostowania.',
  },
  {
    icon: IconRepeat,
    stat: '0',
    title: 'szlifowania po spawaniu',
    desc: 'Spoina gotowa z głowicy — bez szlifierki, bez tarcz, bez dodatkowego operatora. Na estetycznych złączach ze stali nierdzewnej różnica jest natychmiastowo widoczna.',
  },
  {
    icon: IconWaste,
    stat: '~1 l/min',
    title: 'zużycie argonu',
    desc: 'TIG pobiera 10–15 l/min — laser potrzebuje ok. 10× mniej. Przy cenie argonu 8 zł/m³ i jednej zmianie to ponad 1 000 zł mniej na miesiąc.',
  },
  {
    icon: IconAutomation,
    stat: '4w1',
    title: 'funkcje z jednej głowicy',
    desc: 'Spawanie, czyszczenie laserowe, hartowanie i lutowanie — bez zmiany maszyny. Zmiana funkcji to zmiana trybu w panelu.',
  },
]

export function Benefits() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Laser vs TIG i MIG
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ letterSpacing: '-0.02em' }}>
            Co konkretnie zyskujesz
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Nie "wyższa jakość" i "lepsza wydajność" — liczby z rzeczywistej produkcji.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <li
                key={b.title}
                className="flex flex-col gap-3 p-6 rounded-2xl border transition-all duration-200 hover:border-[#06B6D4] hover:shadow-[var(--shadow-md)] cursor-default"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#ECFEFF' }}
                  >
                    <Icon size={18} style={{ color: '#06B6D4' }} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black leading-none" style={{ color: '#06B6D4', fontFamily: 'var(--font-rubik)' }}>
                      {b.stat}
                    </p>
                    <p className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>{b.title}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{b.desc}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
