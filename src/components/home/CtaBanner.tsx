import Link from 'next/link'

export function CtaBanner() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="rounded-2xl px-8 py-14 md:px-14 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden"
          style={{ backgroundColor: '#0D1117', border: '1px solid rgba(6,182,212,0.15)' }}
        >
          {/* Glow */}
          <div
            className="absolute -top-20 right-0 w-72 h-72 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
          />

          <div className="relative max-w-lg">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>
              Bezpłatna konsultacja: odpowiedź w 24h
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-3 text-white" style={{ letterSpacing: '-0.025em' }}>
              Opisz co spawasz. Dobierzemy model i wycenimy.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Materiał, grubość, miesięczny wolumen: trzy informacje wystarczą.
              Odpiszemy z rekomendacją konkretnego wariantu, ceną i uzasadnieniem.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-xl transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: '#06B6D4', color: '#0D1117', boxShadow: '0 4px 20px rgba(6,182,212,0.3)' }}
            >
              Wyślij zapytanie →
            </Link>
            <a
              href="tel:+48570854886"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl border transition-all duration-150 hover:border-[rgba(255,255,255,0.4)]"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)' }}
            >
              +48 570 854 886
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
