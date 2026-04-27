import { IconSpeed, IconPrecision, IconRepeat, IconWaste, IconAutomation } from '@/components/ui/Icons'

const benefits = [
  {
    icon: IconSpeed,
    title: '2–5× szybciej niż TIG/MIG',
    desc: 'Wyższa prędkość spawania przy tej samej lub lepszej jakości spoiny. Mniej roboczogodzin na tę samą serię.',
  },
  {
    icon: IconPrecision,
    title: 'Brak odkształceń termicznych',
    desc: 'Minimalna strefa wpływu ciepła. Cienkie blachy, nierdzewka i aluminium bez deformacji po spawaniu.',
  },
  {
    icon: IconRepeat,
    title: 'Spoina bez szlifowania',
    desc: 'Estetyczna spoina prosto z głowicy — bez dalszej obróbki. Wyroby gotowe szybciej trafiają do lakierni.',
  },
  {
    icon: IconWaste,
    title: 'Jeden agregat, cztery funkcje',
    desc: 'Spawanie, czyszczenie, hartowanie i lutowanie laserowe z jednej głowicy. Zero dodatkowego sprzętu.',
  },
  {
    icon: IconAutomation,
    title: 'Stal, nierdzewka, aluminium',
    desc: 'Zmiana materiału to zmiana parametrów w panelu — ta sama maszyna, bez wymiany dysz ani drutu MIG.',
  },
]

export function Benefits() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ letterSpacing: '-0.02em' }}>
            Dlaczego laser zamiast TIG i MIG
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Konkretne różnice, które przekładają się na czas cyklu i koszty operacyjne.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <li
                key={b.title}
                className="group flex flex-col gap-3 p-6 rounded-[var(--radius-lg)] border transition-all duration-200 hover:border-[#06B6D4] hover:shadow-[var(--shadow-md)] cursor-default"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
              >
                <div
                  className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                  style={{ backgroundColor: '#ECFEFF' }}
                >
                  <Icon size={18} style={{ color: '#06B6D4' }} />
                </div>
                <p className="font-bold" style={{ color: 'var(--fg)' }}>{b.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{b.desc}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
