import { IconPrecision, IconRepeat, IconWaste, IconSpeed, IconAutomation } from '@/components/ui/Icons'

const benefits = [
  {
    icon: IconPrecision,
    title: 'Precyzja 0,05 mm',
    desc: 'Tolerancje na poziomie dziesiątych części milimetra. Krawędź gotowa bez szlifowania.',
  },
  {
    icon: IconRepeat,
    title: 'Powtarzalność 0,02 mm',
    desc: 'Każda sztuka identyczna - niezależnie czy seria ma 10 czy 10 000 elementów.',
  },
  {
    icon: IconWaste,
    title: 'Mniej odpadów blachy',
    desc: 'Precyzyjne gniazdowanie ogranicza straty materiału. Wąska szczelina cięcia.',
  },
  {
    icon: IconSpeed,
    title: 'Do 120 m/min prędkości',
    desc: 'Szybsze cykl, mniej operacji manualnych - więcej sztuk na zmianę.',
  },
  {
    icon: IconAutomation,
    title: 'Sterowanie CNC Windows',
    desc: 'Import DXF/DWG, gniazdowanie, pełna automatyzacja programowania - sterownik Cypcut.',
  },
]

export function Benefits() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ letterSpacing: '-0.02em' }}>
            Dlaczego laser światłowodowy
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Fiber zamiast CO2 i plazmy - konkretne różnice w liczbach.
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
                  className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center transition-colors duration-200"
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
