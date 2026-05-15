import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'wluszczynski-9654s-projects'
const GITHUB_REPO = process.env.GITHUB_REPO || 'spawarkilaserowe'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function POST(req: Request) {
  // Auth check
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN nie jest skonfigurowany.' }, { status: 500 })
  }

  const { filename, content } = await req.json()
  if (!filename || !content) {
    return NextResponse.json({ error: 'Brakuje danych.' }, { status: 400 })
  }

  const path = `content/posts/${filename}`
  const apiBase = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`

  // Check if file already exists (get sha for update)
  let sha: string | undefined
  try {
    const existing = await fetch(`${apiBase}?ref=${GITHUB_BRANCH}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    })
    if (existing.ok) {
      const data = await existing.json()
      sha = data.sha
    }
  } catch { /* file doesn't exist yet, that's fine */ }

  // Create or update file
  const body: Record<string, unknown> = {
    message: `cms: ${sha ? 'update' : 'add'} ${filename}`,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: GITHUB_BRANCH,
  }
  if (sha) body.sha = sha

  const res = await fetch(apiBase, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message ?? 'GitHub API error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
