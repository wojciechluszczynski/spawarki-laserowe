'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

const NAV = [
  { label: 'Przegląd', href: '/admin', icon: '◈', exact: true },
  { label: 'Wpisy', href: '/admin/posts', icon: '✦', exact: false },
  { label: 'Treści strony', href: '/admin/content', icon: '☰', exact: false },
  { label: 'Analytics', href: '/admin/settings', icon: '⚙', exact: false },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#0D1117', fontFamily: 'var(--font-rubik)' }}>

      {/* Mobile topbar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
      >
        <span className="text-xs font-bold" style={{ color: '#06B6D4' }}>CMS Panel</span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${open ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-60 shrink-0 py-6 px-4 border-b md:border-b-0 md:border-r md:min-h-screen`}
        style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
      >
        <div className="hidden md:block mb-8 px-2">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}
          >
            CMS Panel
          </span>
          <p className="mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            spawarkilaserowe.com
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  backgroundColor: active ? 'rgba(6,182,212,0.1)' : 'transparent',
                  color: active ? '#06B6D4' : 'rgba(255,255,255,0.55)',
                }}
              >
                <span style={{ color: active ? '#06B6D4' : 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-all hover:bg-white/5"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            ↗ Podgląd strony
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-all hover:bg-white/5"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              ← Wyloguj
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
