import Image from 'next/image'
import Link from 'next/link'

const tiers = [
  {
    image: '/images/spawarka-1500w.jpg',
    power: '1500W',
    badge: 'Start z laserem',
    title: 'Blink 1500W',
    specs: [
      { mat: 'Stal węglowa', val: '10 mm' },
      { mat: 'Nierdzewka', val: '6 mm' },
      { mat: 'Aluminium', val: '4 mm' },
    ],
    desc: 'Optymalny dla firm przechodzących z TIG/MIG. Operator samodzielny po 1–2 dniach szkolenia.',
    price: '39 000',
    href: '/modele#1500W',
    featured: false,
  },
  {
    image: '/images/spawarka-2000w.jpg',
    power: '2000W',
    badge: 'Najczęściej wybierany',
    title: 'Blink 2000W',
    specs: [
      { mat: 'Stal węglowa', val: '12 mm' },
      { mat: 'Nierdzewka', val: '8 mm' },
      { mat: 'Aluminium', val: '6 mm' },
    ],
    desc: 'Złoty środek dla regularnej produkcji. Wyraźna przewaga prędkości nad 1500W powyżej 5 mm.',
    price: '45 000',
    href: '/modele#2000W',
    featured: true,
  },
  {
    image: '/images/spawarka-3000w.jpg',
    power: '3000W',
    badge: 'Intensywna produkcja',
    title: 'Blink 3000W',
    specs: [
      { mat: 'Stal węglowa', val: '20 mm' },
      { mat: 'Nierdzewka', val: '12 mm' },
      { mat: 'Aluminium', val: '10 mm' },
    ],
    desc: 'Dla zakładów na dwie zmiany lub z grubymi detalami stalowymi.',
    price: '54 000',
    href: '/modele#3000W',
    featured: false,
  },
]

export function MachinesShowcase() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              Katalog modeli
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ letterSpacing: '-0.03em' }}>
              Jakiej mocy potrzebujesz?
            </h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>
              Dobór zależy od grubości materiału, wolumenu miesięcznego i rodzaju metalu.
            </p>
          </div>
          <Link
            href="/porownaj"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            Pełna tabela porównawcza
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        {/* pt-8 tworzy miejsce na badge pływający ponad kartą */}
        <div className="grid sm:grid-cols-3 gap-5 pt-8">
          {tiers.map((tier) => (
            <div key={tier.power} className="relative flex flex-col">

              {/* Badge absolutnie PONAD kartą, poza jej flow */}
              {tier.featured && (
                <div className="absolute -top-8 inset-x-0 flex justify-center z-10">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full"
                    style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
                  >
                    Najpopularniejszy
                  </span>
                </div>
              )}

              <Link
                href={tier.href}
                className="group flex flex-col flex-1 rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{
                  borderColor: tier.featured ? '#06B6D4' : 'var(--border)',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                {/* Zdjęcie — mix-blend-mode:multiply usuwa białe tło JPEGa */}
                <div
                  className="relative w-full shrink-0 overflow-hidden"
                  style={{ aspectRatio: '16/9', backgroundColor: 'var(--bg-card)' }}
                >
                  <Image
                    src={tier.image}
                    alt={`Spawarka laserowa ${tier.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ padding: '12px', mixBlendMode: 'multiply' }}
                  />
                  <div
                    className="absolute bottom-3 right-3 text-xs font-black px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: '#0D1117', color: '#06B6D4' }}
                  >
                    {tier.power}
                  </div>
                </div>

                {/* Treść */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
                    {tier.badge}
                  </p>
                  <h3 className="text-lg font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
                    {tier.title}
                  </h3>

                  <div className="rounded-xl overflow-hidden mb-4" style={{ border: '1px solid var(--border)' }}>
                    {tier.specs.map((s, i) => (
                      <div
                        key={s.mat}
                        className="flex items-center justify-between px-3 py-2 text-sm"
                        style={{
                          backgroundColor: i % 2 === 0 ? 'var(--bg)' : 'transparent',
                          borderBottom: i < tier.specs.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        <span style={{ color: 'var(--muted)' }}>{s.mat}</span>
                        <span className="font-bold" style={{ color: 'var(--fg)' }}>do {s.val}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--muted)' }}>
                    {tier.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted)' }}>od</p>
                      <p className="text-xl font-black leading-none" style={{ fontFamily: 'var(--font-rubik)', color: 'var(--fg)' }}>
                        {tier.price} <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>zł netto</span>
                      </p>
                    </div>
                    <span
                      className="text-sm font-black px-4 py-2 rounded-xl transition-all duration-150"
                      style={{
                        backgroundColor: tier.featured ? '#06B6D4' : 'transparent',
                        color: tier.featured ? '#0D1117' : 'var(--accent)',
                        border: `1.5px solid ${tier.featured ? '#06B6D4' : 'var(--accent)'}`,
                      }}
                    >
                      Szczegóły
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
