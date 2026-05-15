import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'wluszczynski-9654s-projects'
const GITHUB_REPO = process.env.GITHUB_REPO || 'spawarkilaserowe'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

async function authCheck() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  return token === process.env.ADMIN_SECRET
}

function githubUrl(path: string) {
  return `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`
}

// ─── GET: return current file contents ───────────────────────────────────────
export async function GET(req: Request) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const file = searchParams.get('file') // 'settings' | 'navigation'

  const filePath = file === 'navigation'
    ? 'content/site/navigation.json'
    : 'content/site/settings.json'

  const res = await fetch(`${githubUrl(filePath)}?ref=${GITHUB_BRANCH}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  })
  if (!res.ok) return NextResponse.json({ error: 'Nie można pobrać pliku.' }, { status: 500 })

  const { content } = await res.json()
  const decoded = JSON.parse(Buffer.from(content, 'base64').toString('utf-8'))
  return NextResponse.json(decoded)
}

// ─── POST: update a section of a file ────────────────────────────────────────
export async function POST(req: Request) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN nie jest skonfigurowany.' }, { status: 500 })
  }

  const { file, section, data } = await req.json()

  const filePath = file === 'navigation'
    ? 'content/site/navigation.json'
    : 'content/site/settings.json'

  const apiUrl = githubUrl(filePath)
  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  }

  // Fetch current file to get SHA + content
  const existing = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, { headers: ghHeaders })
  if (!existing.ok) return NextResponse.json({ error: 'Nie można pobrać pliku z GitHub.' }, { status: 500 })
  const { sha, content: rawContent } = await existing.json()
  const current = JSON.parse(Buffer.from(rawContent, 'base64').toString('utf-8'))

  // Merge update
  let updated: Record<string, unknown>
  if (file === 'navigation') {
    updated = { ...current, [section]: data }
  } else {
    updated = { ...current, [section]: { ...(current[section] ?? {}), ...data } }
  }

  const commitMsg = file === 'navigation'
    ? 'cms: update navigation'
    : `cms: update ${section}`

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: commitMsg,
      content: Buffer.from(JSON.stringify(updated, null, 2), 'utf-8').toString('base64'),
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
