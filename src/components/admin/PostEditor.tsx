'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/types/content'

// ─── Constants ────────────────────────────────────────────────────────────────
const TAGS = ['zakup', 'porownania', 'eksploatacja', 'serwis', 'bezpieczenstwo']

// ─── Markdown preview renderer ────────────────────────────────────────────────
function renderMd(text: string): string {
  if (!text.trim()) return '<p style="color:rgba(255,255,255,0.2);font-style:italic">Brak treści…</p>'
  let h = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```([\s\S]*?)```/g, (_m, c) =>
      `<pre style="background:rgba(255,255,255,0.05);padding:1rem;border-radius:.5rem;overflow:auto;margin:1rem 0"><code style="font-size:.8rem;line-height:1.6">${c.trim()}</code></pre>`)
    .replace(/`([^`\n]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:.1em .35em;border-radius:3px;font-size:.85em">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1rem;font-weight:700;margin:1.25rem 0 .4rem;color:#fff">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.2rem;font-weight:800;margin:1.75rem 0 .6rem;color:#fff;letter-spacing:-.02em">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.5rem;font-weight:900;margin:2rem 0 .75rem;color:#fff;letter-spacing:-.03em">$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#06B6D4;text-decoration:underline" target="_blank" rel="noopener">$1</a>')
  // lists
  h = h.replace(/((?:^[-*] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map((l) =>
      `<li style="margin:.2rem 0;padding-left:.25rem">${l.replace(/^[-*] /, '')}</li>`).join('')
    return `<ul style="padding-left:1.25rem;margin:.75rem 0;list-style:disc">${items}</ul>`
  })
  h = h.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map((l) =>
      `<li style="margin:.2rem 0;padding-left:.25rem">${l.replace(/^\d+\. /, '')}</li>`).join('')
    return `<ol style="padding-left:1.25rem;margin:.75rem 0;list-style:decimal">${items}</ol>`
  })
  h = h.replace(/^(?!<[hupoa]|<pre|<li)(.+)$/gm, '<p style="margin:.65rem 0;line-height:1.75;color:rgba(255,255,255,.8)">$1</p>')
  h = h.replace(/\n{2,}/g, '')
  return `<div style="font-size:.875rem">${h}</div>`
}

// ─── Shared UI atoms ──────────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  borderRadius: '0.5rem',
  padding: '0.625rem 0.875rem',
  fontSize: '0.875rem',
  outline: 'none',
  width: '100%',
}

function Field({ label, hint, children, counter }: { label: string; hint?: string; children: React.ReactNode; counter?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</label>
        {counter}
      </div>
      {children}
      {hint && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{hint}</p>}
    </div>
  )
}

function CharCount({ val, max }: { val: string; max: number }) {
  const n = val.length
  const color = n > max ? '#f87171' : n > max * 0.8 ? '#fbbf24' : 'rgba(255,255,255,0.3)'
  return <span className="text-xs tabular-nums" style={{ color }}>{n}/{max}</span>
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-5"
      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {children}
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
type Mode = 'new' | 'edit'

interface PostEditorProps {
  mode: Mode
  initial?: Partial<BlogPost> & { content?: string }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PostEditor({ mode, initial }: PostEditorProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const DRAFT_KEY = `post_draft_${initial?.slug || 'new'}`

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(initial?.tags ?? [])
  const [previewMode, setPreviewMode] = useState(false)
  const [slugEdited, setSlugEdited] = useState(mode === 'edit')
  const [showSlugWarning, setShowSlugWarning] = useState(false)
  const [originalSlug] = useState(initial?.slug ?? '')

  const today = new Date().toISOString().split('T')[0]

  const defaultForm = {
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    metaTitle: initial?.metaTitle ?? '',
    metaDescription: initial?.metaDescription ?? '',
    category: initial?.category ?? 'Poradnik',
    publishStatus: initial?.status ?? 'published',
    publishedAt: initial?.publishedAt ?? today,
    content: initial?.content ?? '## Wprowadzenie\n\nTreść artykułu...\n\n## Pierwsza sekcja\n\nZawartość...\n',
  }

  const [form, setForm] = useState(defaultForm)

  // Load draft from localStorage for new posts
  useEffect(() => {
    if (mode !== 'new') return
    const saved = localStorage.getItem(DRAFT_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setForm((prev) => ({ ...prev, ...parsed }))
        if (parsed.tags) setSelectedTags(parsed.tags)
      } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autosave draft to localStorage for new posts
  useEffect(() => {
    if (mode !== 'new') return
    const t = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, tags: selectedTags }))
    }, 800)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, selectedTags])

  // Cmd+S shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const update = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && mode === 'new' && !slugEdited) {
        next.slug = value
          .toLowerCase()
          .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
          .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
          .replace(/ś/g, 's').replace(/[źż]/g, 'z')
          .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      }
      if (field === 'slug' && mode === 'edit' && value !== originalSlug) {
        setShowSlugWarning(true)
      } else if (field === 'slug') {
        setShowSlugWarning(false)
      }
      return next
    })
    if (field === 'slug') setSlugEdited(true)
  }

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.round(wordCount / 200))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaveStatus('saving')
    setErrorMsg('')

    const frontmatter = [
      '---',
      `title: "${form.title.replace(/"/g, '\\"')}"`,
      `slug: "${form.slug}"`,
      `status: "${form.publishStatus}"`,
      form.metaTitle ? `metaTitle: "${form.metaTitle.replace(/"/g, '\\"')}"` : null,
      form.metaDescription ? `metaDescription: "${form.metaDescription.replace(/"/g, '\\"')}"` : null,
      form.excerpt ? `excerpt: "${form.excerpt.replace(/"/g, '\\"')}"` : null,
      `category: "${form.category}"`,
      selectedTags.length ? `tags: [${selectedTags.map((t) => `"${t}"`).join(', ')}]` : null,
      `publishedAt: "${form.publishedAt}"`,
      '---',
    ].filter(Boolean).join('\n')

    const markdown = `${frontmatter}\n\n${form.content}`
    const filename = `${form.slug}.md`

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, content: markdown }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Błąd zapisu.')
        setSaveStatus('error')
      } else {
        if (mode === 'new') localStorage.removeItem(DRAFT_KEY)
        setSaveStatus('success')
        setTimeout(() => router.push('/admin/posts'), 1500)
      }
    } catch {
      setErrorMsg('Problem z połączeniem.')
      setSaveStatus('error')
    }
  }

  if (saveStatus === 'success') {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-5xl mb-4" style={{ color: '#06B6D4' }}>✓</div>
        <p className="text-white font-bold text-xl">{mode === 'new' ? 'Wpis opublikowany!' : 'Zapisano!'}</p>
        <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Vercel przebudowuje stronę… pojawi się za ~60 sekund.</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push('/admin/posts')}
          className="text-sm px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
          ← Wpisy
        </button>
        <div>
          <h1 className="text-xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
            {mode === 'new' ? 'Nowy wpis' : 'Edytuj wpis'}
          </h1>
          {mode === 'edit' && (
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{form.slug}</p>
          )}
        </div>
        {mode === 'new' && (
          <span className="text-xs px-2.5 py-1 rounded-full ml-auto" style={{ backgroundColor: 'rgba(6,182,212,0.1)', color: '#06B6D4' }}>
            Autosave aktywny
          </span>
        )}
      </div>

      <form ref={formRef} onSubmit={handleSave} className="flex flex-col gap-6">

        {/* Row 1: title + slug */}
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Tytuł *">
            <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)}
              placeholder="Jak wybrać spawarkę laserową…" style={inp} required />
          </Field>
          <Field label="Slug (URL)" hint={showSlugWarning ? undefined : 'Zmiana slug zmienia adres URL wpisu'}>
            <input type="text" value={form.slug} onChange={(e) => update('slug', e.target.value)} style={{
              ...inp,
              borderColor: showSlugWarning ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.1)',
            }} required />
            {showSlugWarning && (
              <p className="text-xs" style={{ color: '#fbbf24' }}>
                Uwaga: zmiana slug&apos;a nie usuwa starego pliku — stary URL przestanie działać.
              </p>
            )}
          </Field>
        </div>

        {/* Row 2: excerpt */}
        <Field label="Zajawka" hint="Wyświetlana na liście wpisów i jako fallback meta description">
          <textarea rows={2} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)}
            placeholder="Krótki opis artykułu…" style={{ ...inp, resize: 'vertical' }} />
        </Field>

        {/* Row 3: SEO */}
        <Section>
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>SEO</p>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Meta title" counter={<CharCount val={form.metaTitle || form.title} max={60} />}
              hint="Zostaw puste = użyje tytułu">
              <input type="text" value={form.metaTitle} onChange={(e) => update('metaTitle', e.target.value)}
                placeholder={form.title || 'Meta title…'} style={inp} />
            </Field>
            <Field label="Meta description" counter={<CharCount val={form.metaDescription} max={155} />}
              hint="Idealnie 120–155 znaków">
              <textarea rows={2} value={form.metaDescription} onChange={(e) => update('metaDescription', e.target.value)}
                placeholder="Opis dla Google…" style={{ ...inp, resize: 'vertical' }} />
            </Field>
          </div>
        </Section>

        {/* Row 4: tags + status + date */}
        <div className="grid md:grid-cols-3 gap-5">
          <Field label="Tagi">
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
                <button key={tag} type="button" onClick={() => toggleTag(tag)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: selectedTags.includes(tag) ? '#06B6D4' : 'rgba(255,255,255,0.06)',
                    color: selectedTags.includes(tag) ? '#0D1117' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${selectedTags.includes(tag) ? '#06B6D4' : 'rgba(255,255,255,0.08)'}`,
                  }}>
                  {tag}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Status">
            <div className="flex flex-col gap-2">
              {[{ value: 'published', label: '🟢 Live' }, { value: 'draft', label: '⚪ Wersja robocza' }].map((opt) => (
                <button key={opt.value} type="button" onClick={() => update('publishStatus', opt.value)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold transition-all text-left"
                  style={{
                    backgroundColor: form.publishStatus === opt.value ? 'rgba(6,182,212,0.12)' : 'rgba(255,255,255,0.03)',
                    color: form.publishStatus === opt.value ? '#06B6D4' : 'rgba(255,255,255,0.4)',
                    border: `1px solid ${form.publishStatus === opt.value ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Data publikacji" hint="Możesz cofnąć lub zaplanować datę">
            <input type="date" value={form.publishedAt} onChange={(e) => update('publishedAt', e.target.value)}
              style={{ ...inp, colorScheme: 'dark' }} />
          </Field>
        </div>

        {/* Row 5: content with preview toggle */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Treść (Markdown) *
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {wordCount} słów · ~{readTime} min
              </span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <button type="button" onClick={() => setPreviewMode(false)}
                  className="px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: !previewMode ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: !previewMode ? '#fff' : 'rgba(255,255,255,0.35)',
                  }}>
                  ✏ Edycja
                </button>
                <button type="button" onClick={() => setPreviewMode(true)}
                  className="px-3 py-1.5 text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: previewMode ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: previewMode ? '#fff' : 'rgba(255,255,255,0.35)',
                  }}>
                  👁 Podgląd
                </button>
              </div>
            </div>
          </div>

          {!previewMode ? (
            <textarea
              rows={28}
              value={form.content}
              onChange={(e) => update('content', e.target.value)}
              style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.8125rem', lineHeight: '1.6' }}
              required
            />
          ) : (
            <div
              className="rounded-lg overflow-auto"
              style={{ ...inp, minHeight: '28rem', padding: '1.25rem 1.5rem', cursor: 'default' }}
              dangerouslySetInnerHTML={{ __html: renderMd(form.content) }}
            />
          )}
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            ## Nagłówek · **bold** · *italic* · - lista · [link](url) · ```blok kodu``` · Cmd+S = zapisz
          </p>
        </div>

        {errorMsg && <p className="text-sm" style={{ color: '#f87171' }}>{errorMsg}</p>}

        {/* Actions */}
        <div className="flex gap-3 pb-10">
          <button type="submit" disabled={saveStatus === 'saving'}
            className="px-8 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
            {saveStatus === 'saving' ? 'Zapisywanie…' : mode === 'new'
              ? (form.publishStatus === 'published' ? 'Opublikuj wpis' : 'Zapisz jako wersję roboczą')
              : 'Zapisz zmiany'}
          </button>
          <button type="button" onClick={() => router.push('/admin/posts')}
            className="px-6 py-3 rounded-lg text-sm transition-all"
            style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  )
}
