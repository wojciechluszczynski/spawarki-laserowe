import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { value: '3–4×', label: 'szybciej niż TIG', sub: 'na nierdzewce 3 mm' },
  { value: '<0,5 mm', label: 'strefa ciepła', sub: 'zero odkształceń' },
  { value: '~1 l/min', label: 'zużycie argonu', sub: 'TIG potrzebuje 10–15 l/min' },
  { value: '4w1', label: 'tryby głowicy', sub: 'spawanie, czyszczenie, hartowanie, lutowanie' },
]

export function ProductHighlight() {
  return (
    <section style={{ backgroundColor: '#0D1117' }} className="overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center py-20 md:py-28">

          {/* Lewa strona: zdjęcie maszyny w całości, bez ucięcia */}
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="relative w-full" style={{ maxWidth: '480px' }}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.2) 0%, transparent 65%)' }}
              />
              <Image
                src="/images/spawarka-blink-2.jpg"
                alt="Spawarka laserowa BLink widok boczny"
                width={480}
                height={480}
                sizes="(max-width: 768px) 90vw, 480px"
                className="relative w-full h-auto object-contain"
                style={{ filter: 'drop-shadow(0 16px 48px rgba(6,182,212,0.18))' }}
              />
            </div>
          </div>

          {/* Prawa strona: tekst */}
          <div className="order-1 md:order-2">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#06B6D4' }}>
              Laser vs TIG i MIG
            </p>
            <h2
              className="font-black text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}
            >
              Co konkretnie zyskujesz
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '400px' }}>
              Konkretne liczby z produkcji. Na nierdzewce 3&nbsp;mm: TIG ok.&nbsp;8&nbsp;min,
              laser ok.&nbsp;2,5&nbsp;min.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <p
                    className="text-2xl font-black mb-1 leading-none"
                    style={{ color: '#06B6D4', fontFamily: 'var(--font-rubik)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs font-semibold text-white mb-0.5">{s.label}</p>
                  <p className="text-[11px] leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.sub}</p>
                </div>
              ))}
            </div>

            <Link
              href="/zastosowania"
              className="self-start inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-70"
              style={{ color: '#06B6D4' }}
            >
              Pełne porównanie z TIG/MIG
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
