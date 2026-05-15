'use client'
import PostEditor from '@/components/admin/PostEditor'
import type { BlogPost } from '@/types/content'

export default function PostEditForm({ initial }: { initial: BlogPost & { content?: string } }) {
  return <PostEditor mode="edit" initial={initial} />
}
