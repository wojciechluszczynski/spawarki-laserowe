'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconLaser, IconPhone } from './Icons'
import nav from '../../../content/site/navigation.json'

type NavItem = { label: string; href: string }

function IconMenu({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconClose({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const items: NavItem[] = nav.main
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: 'var(--border)' }}>
        {/* Top bar */}
        <div style={{ backgroundColor: '#0D1117', color: 'rgba(255,255,255,0.6)' }}>
          <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-between text-xs">
            <span className="hidden sm:block">Katalog modeli, porownania i poradniki zakupowe</span>
            <a
              href="tel:+48570854886"
              className="flex items-center gap-1.5 font-bold transition-colors hover:opacity-80"
              style={{ color: '#FFA52F' }}
            >
              <IconPhone size={13} />
              +48 570 854 886
            </a>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-6xl mx-auto px-6 h-[62px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-85" onClick={() => setOpen(false)}>
            <span
              className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]"
              style={{ backgroundColor: '#0D1117', color: '#FFA52F' }}
            >
              <IconLaser size={17} />
            </span>
            <span className="font-black text-[15px] tracking-tight" style={{ fontFamily: 'var(--font-rubik)', color: '#0D1117' }}>
              Spawarki<span style={{ color: '#FFA52F' }}>Laserowe</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {items.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 rounded-[var(--radius-sm)] text-sm transition-all duration-150"
                  style={{
                    color: active ? '#0D1117' : '#6B7280',
                    backgroundColor: active ? '#FFF5E6' : 'transparent',
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/modele"
            className="hidden md:inline-flex shrink-0 text-sm font-black px-5 py-2.5 rounded-[var(--radius-md)] transition-all duration-150 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#FFA52F', color: '#0D1117', boxShadow: '0 2px 10px rgba(255,165,47,0.35)' }}
          >
            Przeglądaj katalog
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius-sm)] transition-colors"
            style={{ color: '#0D1117' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'white' }}>
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-[var(--radius-md)] text-sm font-medium transition-all"
                    style={{
                      color: active ? '#0D1117' : '#374151',
                      backgroundColor: active ? '#FFF5E6' : 'transparent',
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-3 mt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border)' }}>
                <Link
                  href="/modele"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center text-sm font-black py-3 rounded-[var(--radius-md)]"
                  style={{ backgroundColor: '#FFA52F', color: '#0D1117' }}
                >
                  Przeglądaj katalog
                </Link>
                <a
                  href="tel:+48570854886"
                  className="flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-[var(--radius-md)] border"
                  style={{ borderColor: 'var(--border-strong)', color: '#0D1117' }}
                >
                  <IconPhone size={15} />
                  +48 570 854 886
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
