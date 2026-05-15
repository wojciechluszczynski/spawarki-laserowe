'use client'
import { useState, useEffect } from 'react'

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

export default function AdminSettings() {
  const [form, setForm] = useState({ ga4: '', gtm: '', googleAds: '', metaPixel: '' })
  const [loaded, setLoaded] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch('/api/admin/content?file=settings')
      .then((r) => r.json())
      .then((d) => {
        const a = d.analytics ?? {}
        setForm({ ga4: a.ga4 ?? '', gtm: a.gtm ?? '', googleAds: a.googleAds ?? '', metaPixel: a.metaPixel ?? '' })
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) { setErrorMsg(json.error ?? 'Błąd zapisu.'); setStatus('error') }
      else { setStatus('success'); setTimeout(() => setStatus('idle'), 4000) }
    } catch { setErrorMsg('Problem z połączeniem.'); setStatus('error') }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const gtmActive = !!form.gtm

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.02em' }}>Analytics</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Tagi wstrzykiwane automatycznie do każdej strony.
        </p>
      </div>

      {!loaded ? (
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Ładowanie…</p>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-5">

          {/* Google box */}
          <div className="rounded-xl p-5 flex flex-col gap-5"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>Google</p>
              {gtmActive && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                  GTM aktywny · zarządza wszystkim
                </span>
              )}
            </div>

            <Field label="GTM Container ID" hint="Zalecane — jeden tag rządzi resztą. Format: GTM-XXXXXXX">
              <input type="text" value={form.gtm} onChange={set('gtm')} placeholder="GTM-XXXXXXX" style={inp} />
            </Field>

            <Field label="GA4 Measurement ID"
              hint={gtmActive ? 'Wyłączone gdy GTM jest aktywny' : 'Tylko gdy NIE używasz GTM. Format: G-XXXXXXXXXX'}>
              <input type="text" value={form.ga4} onChange={set('ga4')} placeholder="G-XXXXXXXXXX"
                disabled={gtmActive} style={{ ...inp, opacity: gtmActive ? 0.35 : 1 }} />
            </Field>

            <Field label="Google Ads Conversion ID"
              hint={gtmActive ? 'Wyłączone gdy GTM jest aktywny' : 'Tylko gdy NIE używasz GTM. Format: AW-XXXXXXXXXX'}>
              <input type="text" value={form.googleAds} onChange={set('googleAds')} placeholder="AW-XXXXXXXXXX"
                disabled={gtmActive} style={{ ...inp, opacity: gtmActive ? 0.35 : 1 }} />
            </Field>
          </div>

          {/* Meta box */}
          <div className="rounded-xl p-5 flex flex-col gap-5"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>Meta / Facebook</p>
            <Field label="Meta Pixel ID" hint="15-cyfrowy numer ze strony Meta Business Suite">
              <input type="text" value={form.metaPixel} onChange={set('metaPixel')} placeholder="123456789012345" style={inp} />
            </Field>
          </div>

          {/* Info */}
          <div className="rounded-xl p-4 text-xs leading-relaxed"
            style={{ backgroundColor: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.1)', color: 'rgba(255,255,255,0.4)' }}>
            <strong style={{ color: '#06B6D4' }}>Jak to działa:</strong> Wartości są zapisywane do{' '}
            <code style={{ color: 'rgba(255,255,255,0.6)' }}>settings.json</code> przez GitHub API.
            Vercel automatycznie przebudowuje stronę (ok. 60 s) i tagi działają na każdej podstronie.
          </div>

          {errorMsg && <p className="text-sm" style={{ color: '#f87171' }}>{errorMsg}</p>}

          <button type="submit" disabled={status === 'saving'}
            className="px-6 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 w-fit"
            style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
            {status === 'saving' ? 'Zapisywanie…'
              : status === 'success' ? '✓ Zapisano — Vercel buduje stronę…'
              : 'Zapisz ustawienia'}
          </button>
        </form>
      )}
    </div>
  )
}
