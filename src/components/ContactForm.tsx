'use client'
import { useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const fields = [
  { name: 'name',    label: 'Imię i nazwisko', type: 'text',  required: true },
  { name: 'company', label: 'Firma',            type: 'text',  required: false },
  { name: 'email',   label: 'E-mail',           type: 'email', required: false },
  { name: 'phone',   label: 'Telefon',          type: 'tel',   required: false },
]

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData(e.currentTarget)
    const payload = Object.fromEntries(data.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrorMsg(json.error ?? 'Coś poszło nie tak.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Problem z połączeniem. Spróbuj ponownie.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-[var(--radius-lg)] p-6 border"
        style={{ borderColor: '#16a34a33', backgroundColor: '#f0fdf4' }}
      >
        <p className="font-black text-lg mb-1" style={{ color: '#166534' }}>
          Wiadomość wysłana!
        </p>
        <p className="text-sm" style={{ color: '#15803d' }}>
          Odpiszemy w ciągu 1 dnia roboczego na podany e-mail lub telefon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
            {field.label}
            {field.required && <span style={{ color: 'var(--accent)' }}> *</span>}
          </label>
          <input
            name={field.name}
            type={field.type}
            required={field.required}
            disabled={status === 'sending'}
            className="border rounded px-3 py-2 text-sm focus:outline-none disabled:opacity-50"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)', backgroundColor: 'var(--bg-card)' }}
          />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
          Wiadomość <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          required
          disabled={status === 'sending'}
          placeholder="Jakie materiały spawasz? Jaka grubość? Jak duża produkcja miesięczna?"
          className="border rounded px-3 py-2 text-sm focus:outline-none disabled:opacity-50"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)', backgroundColor: 'var(--bg-card)' }}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="text-white px-6 py-3 rounded font-medium hover:opacity-90 transition-opacity self-start disabled:opacity-50"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {status === 'sending' ? 'Wysyłanie…' : 'Wyślij zapytanie'}
      </button>
    </form>
  )
}
