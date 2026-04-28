import Image from 'next/image'
import Link from 'next/link'

const tiers = [
  {
    image: '/images/spawarka-blink.jpg',
    power: '1500W',
    tag: 'Wejście w technologię',
    title: 'Blink 1500W: start z laserem',
    desc: 'Stal węglowa do 10 mm, nierdzewka do 6 mm, aluminium do 4 mm. Idealny wybór dla zakładów przechodzących z TIG/MIG na spawanie laserowe.',
    priceFrom: '39 000',
    href: '/modele#1500W',
  },
  {
    image: '/images/spawarka-blink-2.jpg',
    power: '2000W',
    tag: 'Najczęściej wybierany',
    title: 'Blink 2000W: produkcja codzienna',
    desc: 'Stal węglowa do 12 mm, nierdzewka do 8 mm, aluminium do 6 mm. Optymalny balans mocy, prędkości i ceny dla regularnej produkcji metalowej.',
    priceFrom: '45 000',
    href: '/modele#2000W',
    highlight: true,
  },
  {
    image: '/images/spawarka-blink-3.jpg',
    power: '3000W',
    tag: 'Intensywna produkcja',
    title: 'Blink 3000W: heavy-duty',
    desc: 'Stal węglowa do 20 mm, nierdzewka do 12 mm, aluminium do 10 mm. Dla zakładów pracujących na dwie zmiany z grubymi elementami stalowymi.',
    priceFrom: '54 000',
    href: '/modele#3000W',
  },
]

export function MachinesShowcase() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Dobór modelu
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ letterSpacing: '-0.02em' }}>
            Jakiej mocy potrzebujesz?
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            Dobór zależy od grubości materiału, miesięcznego wolumenu i rodzaju spawanego metalu.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <Link
              key={tier.power}
              href={tier.href}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 flex flex-col"
              style={{
                borderColor: tier.highlight ? '#06B6D4' : 'var(--border)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              {tier.highlight && (
                <div
                  className="text-center text-[10px] font-black uppercase tracking-widest py-1"
                  style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
                >
                  Najpopularniejszy
                </div>
              )}

              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '200px', backgroundColor: '#F7F8FC' }}>
                <Image
                  src={tier.image}
                  alt={`Spawarka laserowa Blink ${tier.power}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(6,182,212,0.12)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.25)' }}
                >
                  {tier.tag}
                </div>
              </div>

              {/* Text */}
              <div className="p-5 border-t flex-1 flex flex-col" style={{ borderColor: 'var(--border)' }}>
                <div
                  className="text-xs font-black mb-2 px-2 py-0.5 rounded-full self-start"
                  style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                >
                  {tier.power}
                </div>
                <h3 className="font-black text-base mb-2" style={{ letterSpacing: '-0.02em' }}>{tier.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>{tier.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted-light)' }}>od</p>
                    <p className="text-lg font-black" style={{ fontFamily: 'var(--font-rubik)', color: 'var(--fg)' }}>
                      {tier.priceFrom} <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>zł netto</span>
                    </p>
                  </div>
                  <span className="text-sm font-bold transition-colors duration-150" style={{ color: '#06B6D4' }}>
                    Zobacz →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
