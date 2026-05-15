'use client'
import { useState } from 'react'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{hint}</p>}
    </div>
  )
}

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

type Status = 'idle' | 'saving' | 'success' | 'error'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-5"
      style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>{title}</p>
      {children}
    </div>
  )
}

function SaveButton({ status, label = 'Zapisz zmiany' }: { status: Status; label?: string }) {
  return (
    <button
      type="submit"
      disabled={status === 'saving'}
      className="px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 w-fit"
      style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
    >
      {status === 'saving' ? 'Zapisywanie...' : label}
    </button>
  )
}

// ─── Contact form ────────────────────────────────────────────────────────────
function ContactSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [form, setForm] = useState({ email: '', phone: '' })
  const [loaded, setLoaded] = useState(false)

  // Load current values once
  if (!loaded) {
    fetch('/api/admin/content?file=settings')
      .then((r) => r.json())
      .then((d) => {
        setForm({ email: d.contact?.email ?? '', phone: d.contact?.phone ?? '' })
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
    return (
      <Section title="Dane kontaktowe">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Ładowanie…</p>
      </Section>
    )
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setErrMsg('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'settings', section: 'contact', data: form }),
      })
      const json = await res.json()
      if (!res.ok) { setErrMsg(json.error ?? 'Błąd zapisu.'); setStatus('error') }
      else { setStatus('success'); setTimeout(() => setStatus('idle'), 2500) }
    } catch { setErrMsg('Problem z połączeniem.'); setStatus('error') }
  }

  return (
    <Section title="Dane kontaktowe">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="E-mail">
            <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} style={inp} />
          </Field>
          <Field label="Telefon" hint="Wyświetlany w nagłówku i CTA, np. +48 570 854 886">
            <input type="text" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} style={inp} />
          </Field>
        </div>
        {errMsg && <p className="text-sm" style={{ color: '#f87171' }}>{errMsg}</p>}
        {status === 'success' && <p className="text-sm" style={{ color: '#22c55e' }}>✓ Zapisano! Vercel odbudowuje stronę (~60 s).</p>}
        <SaveButton status={status} />
      </form>
    </Section>
  )
}

// ─── Navigation form ─────────────────────────────────────────────────────────
type NavItem = { label: string; href: string }

function NavigationSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [items, setItems] = useState<NavItem[]>([])
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    fetch('/api/admin/content?file=navigation')
      .then((r) => r.json())
      .then((d) => { setItems(d.main ?? []); setLoaded(true) })
      .catch(() => setLoaded(true))
    return (
      <Section title="Nawigacja">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Ładowanie…</p>
      </Section>
    )
  }

  const update = (i: number, field: keyof NavItem, val: string) =>
    setItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setErrMsg('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'navigation', section: 'main', data: items }),
      })
      const json = await res.json()
      if (!res.ok) { setErrMsg(json.error ?? 'Błąd zapisu.'); setStatus('error') }
      else { setStatus('success'); setTimeout(() => setStatus('idle'), 2500) }
    } catch { setErrMsg('Problem z połączeniem.'); setStatus('error') }
  }

  return (
    <Section title="Nawigacja">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 items-center">
            <Field label={`Pozycja ${i + 1} – etykieta`}>
              <input type="text" value={item.label} onChange={(e) => update(i, 'label', e.target.value)} style={inp} />
            </Field>
            <Field label="URL (href)">
              <input type="text" value={item.href} onChange={(e) => update(i, 'href', e.target.value)} style={inp} />
            </Field>
          </div>
        ))}
        {errMsg && <p className="text-sm" style={{ color: '#f87171' }}>{errMsg}</p>}
        {status === 'success' && <p className="text-sm" style={{ color: '#22c55e' }}>✓ Zapisano! Vercel odbudowuje stronę (~60 s).</p>}
        <SaveButton status={status} />
      </form>
    </Section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContentPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
          Treści strony
        </h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Edytuj dane kontaktowe i nawigację. Zmiany są zapisywane do GitHub i Vercel przebudowuje stronę.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ContactSection />
        <NavigationSection />
      </div>
    </div>
  )
}
