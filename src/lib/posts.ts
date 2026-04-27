import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { BlogPost } from '@/types/content'

const postsDir = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
    const { data, content } = matter(raw)
    return {
      slug: data.slug ?? filename.replace('.md', ''),
      title: data.title ?? '',
      excerpt: data.excerpt ?? '',
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      status: data.status ?? 'draft',
      content,
      publishedAt: data.publishedAt,
      category: data.category,
      tags: data.tags ?? [],
      coverImage: data.image ?? data.coverImage,
    }
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost & { contentHtml: string }> {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  const file = files.find((f) => {
    const { data } = matter(fs.readFileSync(path.join(postsDir, f), 'utf8'))
    return (data.slug ?? f.replace('.md', '')) === slug
  })
  if (!file) throw new Error(`Post not found: ${slug}`)
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    title: data.title ?? '',
    excerpt: data.excerpt ?? '',
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    status: data.status ?? 'draft',
    content,
    contentHtml: processed.toString(),
    publishedAt: data.publishedAt,
    category: data.category,
    tags: data.tags ?? [],
    coverImage: data.image ?? data.coverImage,
  }
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}
