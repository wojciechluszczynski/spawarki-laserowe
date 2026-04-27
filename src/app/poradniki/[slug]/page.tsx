import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return {
    title: post.metaTitle && post.metaTitle !== 'TODO' ? post.metaTitle : post.title,
    description: post.metaDescription && post.metaDescription !== 'TODO' ? post.metaDescription : post.excerpt,
  }
}

export default async function PoradnikPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // Related posts - up to 3 other posts
  const allPosts = getAllPosts().filter((p) => p.slug !== slug && p.status === 'published').slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full rounded-[var(--radius-lg)] overflow-hidden mb-8" style={{ height: '300px' }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 60%)' }} />
          {post.category && (
            <div className="absolute bottom-4 left-4">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ backgroundColor: '#FFA52F', color: '#0D1117' }}
              >
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      <article>
        {!post.coverImage && post.category && (
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FFA52F' }}>
            {post.category}
          </p>
        )}

        <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ color: 'var(--fg)', letterSpacing: '-0.02em' }}>
          {post.title}
        </h1>

        {post.publishedAt && (
          <p className="text-sm mb-8" style={{ color: 'var(--muted-light)' }}>
            {new Date(post.publishedAt).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}

        <div
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* Product CTA block */}
      <div
        className="mt-12 rounded-[var(--radius-lg)] p-7"
        style={{ backgroundColor: '#0D1117' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#FFA52F' }}>
          Gotowy na zakup?
        </p>
        <p className="font-black text-xl text-white mb-1" style={{ fontFamily: 'var(--font-rubik)' }}>
          20+ modeli od 150 000 zł netto
        </p>
        <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Kompaktowe, przemysłowe, do rur i profili. Sprawdź ceny i specyfikacje.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/modele"
            className="inline-flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-[var(--radius-md)] transition-all hover:opacity-90"
            style={{ backgroundColor: '#FFA52F', color: '#0D1117' }}
          >
            Przeglądaj katalog
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[var(--radius-md)] border transition-all hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
          >
            Zapytaj o wycenę
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {allPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: 'var(--muted-light)' }}>
            Przeczytaj też
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {allPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/poradniki/${related.slug}`}
                className="group flex flex-col gap-2 p-4 rounded-[var(--radius-md)] border transition-all hover:border-[#FFA52F] hover:shadow-[var(--shadow-sm)]"
                style={{ borderColor: 'var(--border)' }}
              >
                {related.coverImage && (
                  <div className="relative w-full rounded-[var(--radius-sm)] overflow-hidden" style={{ height: '80px' }}>
                    <Image src={related.coverImage} alt={related.title} fill className="object-cover" />
                  </div>
                )}
                <p className="text-sm font-semibold leading-snug group-hover:text-[#FFA52F] transition-colors" style={{ color: 'var(--fg)' }}>
                  {related.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <Link
          href="/poradniki"
          className="text-sm font-semibold hover:underline"
          style={{ color: '#FFA52F' }}
        >
          ← Wróć do poradników
        </Link>
      </div>
    </div>
  )
}
