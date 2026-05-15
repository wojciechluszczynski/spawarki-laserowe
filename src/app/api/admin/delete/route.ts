import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'wluszczynski-9654s-projects'
const GITHUB_REPO = process.env.GITHUB_REPO || 'spawarkilaserowe'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function DELETE(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN nie jest skonfigurowany.' }, { status: 500 })
  }

  const { slug } = await req.json()
  if (!slug) return NextResponse.json({ error: 'Brak slug.' }, { status: 400 })

  const path = `content/posts/${slug}.md`
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  }

  // Get current SHA
  const existing = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, { headers })
  if (!existing.ok) {
    return NextResponse.json({ error: 'Nie znaleziono pliku w GitHub.' }, { status: 404 })
  }
  const { sha } = await existing.json()

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `cms: delete post ${slug}`,
      sha,
      branch: GITHUB_BRANCH,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'GitHub API error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
