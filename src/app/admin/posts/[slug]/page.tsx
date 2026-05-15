import { getPostBySlug } from '@/lib/posts'
import PostEditForm from './PostEditForm'
import { notFound } from 'next/navigation'

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return <PostEditForm initial={post} />
  } catch {
    notFound()
  }
}
