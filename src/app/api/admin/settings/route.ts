import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import settingsData from '../../../../../content/site/settings.json'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'wluszczynski-9654s-projects'
const GITHUB_REPO = process.env.GITHUB_REPO || 'spawarkilaserowe'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GITHUB_TOKEN nie jest skonfigurowany.' }, { status: 500 })
  }

  const { ga4, gtm, googleAds, metaPixel } = await req.json()

  const updated = {
    ...settingsData,
    analytics: { ga4: ga4 ?? '', gtm: gtm ?? '', googleAds: googleAds ?? '', metaPixel: metaPixel ?? '' },
  }

  const path = 'content/site/settings.json'
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`

  // Get current SHA
  const existing = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  })
  if (!existing.ok) {
    return NextResponse.json({ error: 'Nie można pobrać pliku z GitHub.' }, { status: 500 })
  }
  const { sha } = await existing.json()

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'cms: update analytics settings',
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
