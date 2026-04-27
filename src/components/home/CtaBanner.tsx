import Link from 'next/link'

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-[var(--radius-xl)] px-8 py-14 md:px-14 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden"
          style={{ backgroundColor: '#0D1117' }}
        >
          {/* Decorative */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full opacity-5" style={{ backgroundColor: '#FFA52F' }} />
          <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full opacity-5" style={{ backgroundColor: '#FFA52F' }} />

          <div className="relative max-w-lg">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FFA52F' }}>
              Bezpłatna konsultacja
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-white" style={{ letterSpacing: '-0.02em' }}>
              Masz konkretne pytanie o spawarkę laserową?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Opisz swoje potrzeby - odpiszemy z rekomendacją dopasowaną do Twojej produkcji i budżetu.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 font-black px-6 py-3 rounded-[var(--radius-md)] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: '#FFA52F', color: '#0D1117' }}
            >
              Zapytaj eksperta
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
