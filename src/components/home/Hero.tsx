import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0D1117' }}>
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-0 left-1/3 w-[600px] h-[400px] opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #06B6D4 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mb-7 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
          Autoryzowany dealer BLink Laser · Serwis w Polsce
        </div>

        {/* H1 — numbers-first, claim-style */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.06]"
          style={{ letterSpacing: '-0.035em', fontFamily: 'var(--font-rubik)', maxWidth: '800px' }}
        >
          TIG: 8 minut. Laser: 2,5 minuty.{' '}
          <span style={{ color: '#06B6D4' }}>Zero szlifowania.</span>
        </h1>

        <p className="text-base md:text-lg mb-10 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Spawarki Blink 1500–3000W — porównania modeli, tabele grubości materiałów
          i bezpłatne doradztwo w&nbsp;24h. Dobieramy maszynę do Twojej produkcji.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-14">
          <Link
            href="/modele"
            className="inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-xl transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: '#06B6D4', color: '#0D1117', boxShadow: '0 4px 24px rgba(6,182,212,0.35)' }}
          >
            Zobacz katalog →
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border transition-all duration-150 hover:border-[#06B6D4] hover:text-[#06B6D4]"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
          >
            Bezpłatna konsultacja
          </Link>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            { value: '39 000 zł', label: 'cena od (netto)' },
            { value: '12', label: 'konfiguracji' },
            { value: 'do 20 mm', label: 'grubość stali' },
            { value: '24h', label: 'czas odpowiedzi' },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-xl font-black" style={{ color: '#06B6D4', fontFamily: 'var(--font-rubik)' }}>
                {s.value}
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
