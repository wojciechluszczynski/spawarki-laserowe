import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = getAllPosts()
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
    .map(({ slug, title, status, publishedAt }) => ({ slug, title, status, publishedAt }))

  return NextResponse.json({ posts })
}
