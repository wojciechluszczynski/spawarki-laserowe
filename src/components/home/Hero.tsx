import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-[78vh] flex items-center overflow-hidden" style={{ backgroundColor: '#0D1117' }}>
      {/* Background machine - full bleed, dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/bl3015s.jpg"
          alt="Spawarka laserowa fiber"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
      </div>
      {/* Gradient overlay - left side stronger so text is readable */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(13,17,23,0.97) 0%, rgba(13,17,23,0.80) 55%, rgba(13,17,23,0.35) 100%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 px-3.5 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(6,182,212,0.15)', color: 'var(--accent)', border: '1px solid rgba(6,182,212,0.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            Niezależny przewodnik
          </div>

          {/* H1 */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.05]"
            style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}
          >
            Wszystko, co musisz wiedzieć<br />
            przed zakupem{' '}
            <span style={{ color: 'var(--accent)' }}>spawarki laserowej</span>
          </h1>

          <p className="text-lg mb-10 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Niezależne porównania modeli, tabele specyfikacji i kalkulacje ROI.
            Bez presji sprzedażowej - tylko dane i doświadczenie operatorów.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/porownaj"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-[var(--radius-md)] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--accent)', color: '#0D1117', boxShadow: '0 4px 20px rgba(6,182,212,0.45)' }}
            >
              Porównaj modele →
            </Link>
            <Link
              href="/poradniki"
              className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-[var(--radius-md)] transition-all duration-150 hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              Czytaj poradniki
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
