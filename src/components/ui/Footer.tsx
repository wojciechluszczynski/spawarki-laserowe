import Link from 'next/link'
import { IconLaser, IconPhone, IconMail } from './Icons'

const footerLinks = [
  { label: 'Katalog maszyn', href: '/modele' },
  { label: 'Poradniki', href: '/poradniki' },
  { label: 'Porównaj', href: '/porownaj' },
  { label: 'Kontakt', href: '/kontakt' },
]

export function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: 'var(--border)', backgroundColor: '#0D1117' }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 transition-opacity hover:opacity-85">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]"
                style={{ backgroundColor: 'rgba(255,165,47,0.15)', color: '#FFA52F' }}
              >
                <IconLaser size={17} />
              </span>
              <span className="font-black text-[15px]" style={{ fontFamily: 'var(--font-rubik)', color: 'white' }}>
                Spawarki<span style={{ color: '#FFA52F' }}>Laserowe</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Niezależny serwis porównawczy spawarek laserowych fiber. Katalog modeli, poradniki zakupowe i bezplatne doradztwo.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+48570854886" className="flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: '#FFA52F' }}>
                <IconPhone size={14} />
                +48 570 854 886
              </a>
              <a href="/kontakt" className="flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <IconMail size={14} />
                Formularz kontaktowy
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Nawigacja
            </p>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm transition-colors hover:text-white duration-150"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Zapytaj o maszynę
            </p>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Napisz jaki materiał i grubość spawasz - dobierzemy model i wyślemy ofertę w 24h.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-black py-3 px-5 rounded-[var(--radius-md)] transition-all hover:opacity-90"
              style={{ backgroundColor: '#FFA52F', color: '#0D1117' }}
            >
              Wyślij zapytanie
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between gap-3 text-xs" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' }}>
          <p>&copy; {new Date().getFullYear()} spawarkilaserowe.com</p>
          <p>Serwis informacyjny o spawarkach laserowych fiber</p>
        </div>
      </div>
    </footer>
  )
}
