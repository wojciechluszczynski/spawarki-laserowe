import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import settings from '../../../content/site/settings.json'

export default function AdminDashboard() {
  const posts = getAllPosts().sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length
  const { ga4, gtm } = settings.analytics
  const analyticsOk = !!(ga4 || gtm)

  return (
    <div className="p-6 md:p-10 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
          Przegląd
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          spawarkilaserowe.com · Panel zarządzania treścią
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: 'Opublikowanych', value: published, accent: true },
          { label: 'Wersji roboczych', value: drafts, accent: false },
          { label: 'Wpisy łącznie', value: posts.length, accent: false },
          { label: 'Analytics', value: analyticsOk ? 'ON' : 'OFF', accent: analyticsOk, warn: !analyticsOk },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4"
            style={{
              backgroundColor: s.accent ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${s.accent ? 'rgba(6,182,212,0.2)' : s.warn ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.06)'}`,
            }}>
            <p className="text-3xl font-black mb-1 tabular-nums"
              style={{ color: s.accent ? '#06B6D4' : s.warn ? '#f87171' : '#fff', letterSpacing: '-0.03em' }}>
              {s.value}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Szybkie akcje
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          {
            href: '/admin/posts/new',
            icon: '✦',
            label: 'Nowy wpis',
            desc: 'Dodaj artykuł do Poradników',
            primary: true,
          },
          {
            href: '/admin/posts',
            icon: '☰',
            label: 'Wszystkie wpisy',
            desc: `${posts.length} wpisów w bazie`,
          },
          {
            href: '/admin/content',
            icon: '◈',
            label: 'Treści strony',
            desc: 'Kontakt, nawigacja',
          },
          {
            href: '/admin/settings',
            icon: '⚙',
            label: 'Analytics',
            desc: analyticsOk ? 'GA4/GTM skonfigurowane ✓' : 'Nie skonfigurowane',
            warn: !analyticsOk,
          },
        ].map((card) => (
          <Link key={card.href} href={card.href}
            className="flex flex-col gap-2 p-4 rounded-xl border transition-all hover:border-[#06B6D4]/40 group"
            style={{
              backgroundColor: card.primary ? 'rgba(6,182,212,0.06)' : 'rgba(255,255,255,0.02)',
              borderColor: card.primary ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.06)',
            }}>
            <span style={{
              color: card.primary ? '#06B6D4' : card.warn ? '#f87171' : 'rgba(255,255,255,0.3)',
              fontSize: '1.25rem',
            }}>{card.icon}</span>
            <p className="font-bold text-white text-sm group-hover:text-[#06B6D4] transition-colors">{card.label}</p>
            <p className="text-xs" style={{ color: card.warn ? 'rgba(248,113,113,0.7)' : 'rgba(255,255,255,0.3)' }}>
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent posts */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Ostatnie wpisy
        </h2>
        <Link href="/admin/posts" className="text-xs font-semibold" style={{ color: '#06B6D4' }}>
          Wszystkie →
        </Link>
      </div>
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        {posts.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Brak wpisów —{' '}
              <Link href="/admin/posts/new" style={{ color: '#06B6D4' }}>dodaj pierwszy</Link>
            </p>
          </div>
        ) : (
          posts.slice(0, 6).map((post, i) => (
            <Link key={post.slug} href={`/admin/posts/${post.slug}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.025] transition-colors group"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: post.status === 'published' ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.05)',
                    color: post.status === 'published' ? '#22c55e' : 'rgba(255,255,255,0.3)',
                  }}>
                  {post.status === 'published' ? 'live' : 'draft'}
                </span>
                <p className="text-sm text-white truncate group-hover:text-[#06B6D4] transition-colors">{post.title}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <p className="text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {post.publishedAt ?? '—'}
                </p>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>Edytuj →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
