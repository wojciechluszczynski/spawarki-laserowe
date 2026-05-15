'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Post = {
  slug: string
  title: string
  status?: string
  publishedAt?: string
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loaded, setLoaded] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/posts-list')
      .then((r) => r.json())
      .then((d) => { setPosts(d.posts ?? []); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  async function handleDelete(slug: string) {
    setDeleting(slug)
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug))
      }
    } finally {
      setDeleting(null)
      setConfirmSlug(null)
    }
  }

  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status !== 'published').length

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.02em' }}>Wpisy</h1>
          {loaded && (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {published} live · {drafts} wersji roboczych
            </p>
          )}
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all hover:opacity-90"
          style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
          + Nowy wpis
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        {/* Header row */}
        <div className="hidden md:grid px-4 py-2.5"
          style={{
            gridTemplateColumns: '76px 1fr 100px 160px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
          {['Status', 'Tytuł', 'Data', 'Akcje'].map((h) => (
            <p key={h} className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>{h}</p>
          ))}
        </div>

        {!loaded && (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Ładowanie…</p>
          </div>
        )}

        {loaded && posts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-3xl mb-3" style={{ color: 'rgba(255,255,255,0.1)' }}>✦</p>
            <p className="text-sm font-medium text-white mb-1">Brak wpisów</p>
            <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>Dodaj pierwszy artykuł do sekcji Poradniki</p>
            <Link href="/admin/posts/new"
              className="inline-flex px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90"
              style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
              + Nowy wpis
            </Link>
          </div>
        )}

        {posts.map((post, i) => (
          <div key={post.slug}>
            {/* Desktop row */}
            <div
              className="hidden md:grid px-4 py-3.5 items-center hover:bg-white/[0.015] transition-colors"
              style={{
                gridTemplateColumns: '76px 1fr 100px 160px',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
              <StatusBadge status={post.status} />
              <p className="text-sm text-white pr-4 truncate font-medium">{post.title}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{post.publishedAt ?? '—'}</p>
              <div className="flex items-center gap-3">
                <Link href={`/admin/posts/${post.slug}`}
                  className="text-xs font-bold hover:underline"
                  style={{ color: '#06B6D4' }}>
                  Edytuj →
                </Link>
                <Link href={`/poradniki/${post.slug}`} target="_blank"
                  className="text-xs hover:underline"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  ↗ podgląd
                </Link>
                {confirmSlug === post.slug ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="text-xs font-bold px-2 py-0.5 rounded transition-all"
                      style={{ backgroundColor: 'rgba(248,113,113,0.15)', color: '#f87171' }}>
                      {deleting === post.slug ? '…' : 'Tak, usuń'}
                    </button>
                    <button
                      onClick={() => setConfirmSlug(null)}
                      className="text-xs"
                      style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Anuluj
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmSlug(post.slug)}
                    className="text-xs transition-all hover:text-red-400"
                    style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Usuń
                  </button>
                )}
              </div>
            </div>

            {/* Mobile card */}
            <div
              className="md:hidden p-4 flex flex-col gap-3"
              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div className="flex items-center gap-2">
                <StatusBadge status={post.status} />
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{post.publishedAt ?? '—'}</p>
              </div>
              <p className="text-sm text-white font-medium">{post.title}</p>
              <div className="flex gap-4">
                <Link href={`/admin/posts/${post.slug}`} className="text-xs font-bold" style={{ color: '#06B6D4' }}>Edytuj →</Link>
                <Link href={`/poradniki/${post.slug}`} target="_blank" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>↗ podgląd</Link>
                {confirmSlug === post.slug ? (
                  <>
                    <button onClick={() => handleDelete(post.slug)} className="text-xs font-bold" style={{ color: '#f87171' }}>
                      {deleting === post.slug ? '…' : 'Tak, usuń'}
                    </button>
                    <button onClick={() => setConfirmSlug(null)} className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Anuluj</button>
                  </>
                ) : (
                  <button onClick={() => setConfirmSlug(post.slug)} className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>Usuń</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status?: string }) {
  const live = status === 'published'
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium w-fit"
      style={{
        backgroundColor: live ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.06)',
        color: live ? '#22c55e' : 'rgba(255,255,255,0.35)',
      }}>
      {live ? 'live' : 'draft'}
    </span>
  )
}
