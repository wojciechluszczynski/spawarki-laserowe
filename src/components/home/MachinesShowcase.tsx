import Image from 'next/image'
import Link from 'next/link'
import { IconArrow } from '@/components/ui/Icons'

const categories = [
  {
    image: '/images/bl1510.webp',
    tag: 'Dla małych i średnich zakładów',
    title: 'Kompaktowe z pełną obudową',
    desc: 'Maszyna stoi w hali produkcyjnej - bez osobnej kabiny, bez wyciągu. Pole robocze do 1500×1000 mm.',
    href: '/modele#Kompaktowe',
  },
  {
    image: '/images/bl3015l.jpg',
    tag: 'Do ciągłej produkcji seryjnej',
    title: 'Przemysłowe - arkusz 3×1,5 m',
    desc: 'Standardowy arkusz blachy w całości. Stal, nierdzewka i aluminium do 30 mm grubości.',
    href: '/modele#Przemys%C5%82owe-otwarte',
  },
  {
    image: '/images/bl3015s.jpg',
    tag: 'Najwyższa przepustowość',
    title: 'Przemysłowe z wymianą stołu',
    desc: 'Automatyczna wymiana stołu - załadunek i rozładunek bez przerywania cięcia. Praca ciągła.',
    href: '/modele#Przemys%C5%82owe-zabudowane',
  },
  {
    image: '/images/bl220g.jpg',
    tag: 'Rury, kształtowniki, kątowniki',
    title: 'Dedykowane do cięcia rur',
    desc: 'Rury okrągłe, kwadratowe, prostokątne i kątowniki - precyzja 0,05 mm, krawędź bez szlifowania.',
    href: '/modele#Do-rur-i-profili',
  },
]

export function MachinesShowcase() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ letterSpacing: '-0.02em' }}>
            Jakiej maszyny szukasz?
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Dobór zależy od tego co tniesz, w jakiej ilości i ile masz miejsca w hali.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative rounded-[var(--radius-lg)] overflow-hidden border transition-all duration-200 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ backgroundColor: 'var(--bg-card)' }}
                />
                {/* Tag pill */}
                <div
                  className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,165,47,0.15)', color: 'var(--accent)', border: '1px solid rgba(255,165,47,0.25)' }}
                >
                  {cat.tag}
                </div>
              </div>

              {/* Text */}
              <div className="p-5 border-t" style={{ borderColor: 'var(--border)' }}>
                <h3 className="font-black text-base mb-1.5" style={{ letterSpacing: '-0.01em' }}>{cat.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{cat.desc}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-150"
                  style={{ color: 'var(--accent)' }}
                >
                  Zobacz modele
                  <IconArrow size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
