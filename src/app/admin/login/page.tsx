'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const from = params.get('from') || '/admin'
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push(from)
    } else {
      setError('Nieprawidłowe hasło.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Hasło
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="px-4 py-3 rounded-lg text-sm outline-none transition-colors"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
          }}
          placeholder="••••••••"
        />
      </div>
      {error && <p className="text-sm" style={{ color: '#f87171' }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
      >
        {loading ? 'Logowanie...' : 'Zaloguj się'}
      </button>
    </form>
  )
}

export default function AdminLogin() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#0D1117' }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(6,182,212,0.12)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}
          >
            Panel CMS
          </div>
          <h1 className="text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
            spawarkilaserowe.com
          </h1>
        </div>
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
