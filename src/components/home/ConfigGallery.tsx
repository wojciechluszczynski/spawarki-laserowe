import Image from 'next/image'
import Link from 'next/link'

const configs = [
  {
    image: '/images/spawarka-2000w-single-single.jpg',
    title: 'Pojedyncza oscylacja',
    subtitle: 'Pojedynczy podajnik',
    tag: 'Standard',
    desc: 'Podstawowa konfiguracja, optymalna dla większości zastosowań przemysłowych.',
    href: '/modele#2000W',
  },
  {
    image: '/images/spawarka-2000w-double-single.jpg',
    title: 'Podwójna oscylacja',
    subtitle: 'Pojedynczy podajnik',
    tag: 'Prędkość',
    desc: 'Szersza ścieżka spawania, wyższa prędkość na stali i aluminium.',
    href: '/modele#2000W',
  },
  {
    image: '/images/spawarka-2000w-double-double.jpg',
    title: 'Podwójna oscylacja',
    subtitle: 'Podwójny podajnik',
    tag: 'Maksimum',
    desc: 'Dwa podajniki drutu: pełna elastyczność przy różnych materiałach wypełnienia.',
    href: '/modele#2000W',
  },
]

export function ConfigGallery() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              Konfiguracje głowicy
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ letterSpacing: '-0.03em' }}>
              12 wariantów do wyboru
            </h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>
              Każdy model w kombinacji oscylacji i liczby podajników drutu.
            </p>
          </div>
          <Link
            href="/modele"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            Wszystkie konfiguracje
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {configs.map((c) => (
            <Link
              key={c.title + c.subtitle}
              href={c.href}
              className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
            >
              {/* Image — 16:9 exact */}
              <div
                className="relative w-full shrink-0 overflow-hidden"
                style={{ aspectRatio: '16/9', backgroundColor: 'var(--bg)' }}
              >
                <Image
                  src={c.image}
                  alt={`${c.title} ${c.subtitle}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ padding: '16px', mixBlendMode: 'multiply' }}
                />
                {/* Tag */}
                <div
                  className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: 'rgba(6,182,212,0.12)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.25)' }}
                >
                  {c.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-base font-black mb-0.5" style={{ letterSpacing: '-0.01em' }}>{c.title}</p>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>{c.subtitle}</p>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>{c.desc}</p>
                <p
                  className="mt-4 text-sm font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  Zobacz szczegóły →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
