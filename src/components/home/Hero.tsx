import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#0D1117', minHeight: '88vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      {/* Cyan glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(circle at 70% 30%, #06B6D4 0%, transparent 60%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Lewa strona: tekst */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mb-8 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              Niezależny poradnik zakupowy
            </div>

            <h1
              className="font-black text-white leading-[1.04] mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-rubik)',
              }}
            >
              TIG: 8 minut.<br />
              Laser: 2,5 minuty.<br />
              <span style={{ color: '#06B6D4' }}>Zero szlifowania.</span>
            </h1>

            <p
              className="text-base md:text-lg mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '400px' }}
            >
              Obiektywne porównania spawarek laserowych 1500–3000&nbsp;W.
              Ceny jawne, bez zapytania ofertowego.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href="/modele"
                className="inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-xl transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#06B6D4', color: '#0D1117', boxShadow: '0 4px 28px rgba(6,182,212,0.4)' }}
              >
                Zobacz katalog
              </Link>
              <Link
                href="/porownaj"
                className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl border transition-all duration-150 hover:border-[#06B6D4] hover:text-[#06B6D4]"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)' }}
              >
                Porównaj modele
              </Link>
            </div>

            <div
              className="flex flex-wrap gap-x-8 gap-y-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px' }}
            >
              {[
                { value: 'od 39 000 zł', label: 'netto' },
                { value: '12', label: 'konfiguracji' },
                { value: '20 mm', label: 'maks. grubość stali' },
                { value: '24h', label: 'czas odpowiedzi' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-lg font-black leading-none mb-1" style={{ color: '#06B6D4', fontFamily: 'var(--font-rubik)' }}>
                    {s.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prawa strona: jasny panel — białe tło zdjęcia wtapia się naturalnie */}
          <div className="hidden md:flex items-center justify-center">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                maxWidth: '520px',
                backgroundColor: '#F4F6F8',
                boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              <Image
                src="/images/spawarka-blink.jpg"
                alt="Spawarka laserowa Blink 2000W"
                width={520}
                height={520}
                sizes="520px"
                className="w-full h-auto object-contain"
                style={{ padding: '32px', mixBlendMode: 'multiply' }}
                priority
              />
              {/* Badge z ceną — na dole panelu */}
              <div
                className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 py-3"
                style={{
                  backgroundColor: '#0D1117',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: '#06B6D4', boxShadow: '0 0 8px #06B6D4' }}
                  />
                  <p className="text-xs font-bold text-white">Blink 2000W — Najpopularniejszy</p>
                </div>
                <p className="text-xs font-black" style={{ color: '#06B6D4' }}>od 45 000 zł</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
