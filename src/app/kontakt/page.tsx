import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt - Spawarki Laserowe BLink Laser',
  description:
    'Skontaktuj się z autoryzowanym dealerem BLink Laser w Polsce. Dobierzemy spawarkę laserową do potrzeb Twojej firmy produkcyjnej. Odpowiadamy w 1 dzień roboczy.',
}

export default function KontaktPage() {
  return (
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FFA52F' }}>
            Katalog spawarek laserowych BLink Laser
          </p>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}
          >
            Zapytaj o maszynę
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Opisz co spawasz i w jakiej skali - dobierzemy model i odpiszemy z konkretnymi danymi
            technicznymi i ceną.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Form */}
          <div>
            <h2 className="text-xl font-black mb-2" style={{ letterSpacing: '-0.01em' }}>
              Formularz zapytania
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
              Napisz kilka zdań o swojej produkcji. Odpiszemy w ciągu 1 dnia roboczego.
            </p>
            <ContactForm />
          </div>

          {/* Contact info sidebar */}
          <div className="flex flex-col gap-4">

            {/* Phone */}
            <div
              className="rounded-[var(--radius-lg)] p-6"
              style={{ backgroundColor: '#0D1117' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FFA52F' }}>
                Telefon
              </p>
              <a
                href="tel:+48570854886"
                className="text-2xl font-black text-white hover:opacity-80 transition-opacity block mb-1"
                style={{ fontFamily: 'var(--font-rubik)' }}
              >
                +48 570 854 886
              </a>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Pn–Pt, 8:00–17:00
              </p>
            </div>

            {/* Email */}
            <div
              className="rounded-[var(--radius-lg)] p-6 border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
                E-mail
              </p>
              <a
                href="mailto:kontakt@spawarkilaserowe.com"
                className="font-bold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--fg)' }}
              >
                kontakt@spawarkilaserowe.com
              </a>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                Odpowiadamy w 1 dzień roboczy
              </p>
            </div>

            {/* What to include */}
            <div
              className="rounded-[var(--radius-lg)] p-6 border"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Co warto napisać
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Jakie materiały spawasz (stal, nierdzewka, aluminium)',
                  'Grubość materiału i miesięczny wolumen',
                  'Dostępne miejsce w hali (m²)',
                  'Przybliżony budżet inwestycji',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: 'rgba(255,165,47,0.15)', color: '#FFA52F' }}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
