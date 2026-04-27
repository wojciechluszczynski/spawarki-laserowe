import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/posts'

const BASE = 'https://spawarkilaserowe.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs()
  const blogUrls = slugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/modele`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/kontakt`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...blogUrls,
  ]
}
