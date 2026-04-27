import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import type { BlogPost } from '@/types/content'

export const metadata: Metadata = {
  title: 'Poradniki o spawarkach laserowych - przewodniki zakupowe i porównania | SpawarkilaserOwe',
  description: 'Eksperckie przewodniki zakupowe, techniczne porównania i kalkulacje kosztów - bez zbędnego marketingu.',
}

const TAG_LABELS: Record<string, string> = {
  zakup: 'Zakup i wybór',
  porownania: 'Porównania techniczne',
  eksploatacja: 'Eksploatacja i koszty',
}

const TAG_ORDER = ['zakup', 'porownania', 'eksploatacja']

export default function PoradnikiPage() {
  const posts = getAllPosts().filter((p) => p.status === 'published')

  // Check if any post has a tag field
  const hasTags = posts.some((p) => p.tags && p.tags.length > 0)

  if (!hasTags) {
    // Flat grid fallback
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>Poradniki</h1>
        <p className="text-base mb-12" style={{ color: 'var(--muted)' }}>
          Eksperckie przewodniki zakupowe, techniczne porównania i kalkulacje kosztów - bez zbędnego marketingu.
        </p>
        <ul className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      </div>
    )
  }

  // Group by tag
  const grouped: Record<string, BlogPost[]> = {}
  const untagged: BlogPost[] = []

  for (const post of posts) {
    const tag = post.tags && post.tags.length > 0 ? post.tags[0] : null
    if (tag && TAG_ORDER.includes(tag)) {
      if (!grouped[tag]) grouped[tag] = []
      grouped[tag].push(post)
    } else {
      untagged.push(post)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>Poradniki</h1>
      <p className="text-base mb-12" style={{ color: 'var(--muted)' }}>
        Eksperckie przewodniki zakupowe, techniczne porównania i kalkulacje kosztów - bez zbędnego marketingu.
      </p>

      {TAG_ORDER.filter((tag) => grouped[tag] && grouped[tag].length > 0).map((tag) => (
        <section key={tag} className="mb-14">
          <h2
            className="text-lg font-bold uppercase tracking-widest mb-6 pb-3 border-b"
            style={{ color: '#FFA52F', borderColor: 'var(--border)' }}
          >
            {TAG_LABELS[tag]}
          </h2>
          <ul className="grid md:grid-cols-2 gap-6">
            {grouped[tag].map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        </section>
      ))}

      {untagged.length > 0 && (
        <section className="mb-14">
          <h2
            className="text-lg font-bold uppercase tracking-widest mb-6 pb-3 border-b"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
          >
            Pozostałe
          </h2>
          <ul className="grid md:grid-cols-2 gap-6">
            {untagged.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link
        href={`/poradniki/${post.slug}`}
        className="block p-6 bg-white border rounded-lg hover:border-[var(--accent)] transition-colors"
        style={{ borderColor: 'var(--border)' }}
      >
        {post.category && (
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--muted)' }}>
            {post.category}
          </p>
        )}
        <h2 className="font-bold text-lg mb-2 leading-snug" style={{ color: 'var(--fg)' }}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{post.excerpt}</p>
        )}
      </Link>
    </li>
  )
}
