'use client'
import { useState, useEffect } from 'react'

const STEPS = 4

const MATERIALS = [
  'Stal węglowa',
  'Nierdzewka (AISI 304 / 316)',
  'Aluminium',
  'Miedź / mosiądz',
  'Inne',
]

const THICKNESS = [
  { value: 'do 3 mm', hint: 'blacha, cienka ścianka' },
  { value: '3–8 mm', hint: 'profil, płaskownik, kątownik' },
  { value: '8–15 mm', hint: 'gruba blacha, ścianka rury' },
  { value: 'powyżej 15 mm', hint: 'stalowe konstrukcje, trawersy' },
  { value: 'różnie: zależy od zlecenia', hint: '' },
]

const VOLUME = [
  { value: 'Kilka godzin dziennie', hint: 'małoseryjna, zlecenia jednostkowe' },
  { value: 'Jedna zmiana (ok. 8h)', hint: 'regularna produkcja dzienna' },
  { value: 'Dwie zmiany (ok. 16h)', hint: 'intensywna produkcja ciągła' },
  { value: 'Nieregularnie: zlecenia sezonowe', hint: '' },
]

const LABELS = ['A', 'B', 'C', 'D', 'E']

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5 mb-10">
      {Array.from({ length: STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-400"
          style={{ backgroundColor: i < step ? '#06B6D4' : 'var(--border)' }}
        />
      ))}
    </div>
  )
}

function CardOption({
  label,
  hint,
  selected,
  onClick,
}: {
  label: string
  hint?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-150 hover:border-[#06B6D4] group"
      style={{
        borderColor: selected ? '#06B6D4' : 'var(--border)',
        backgroundColor: selected ? 'rgba(6,182,212,0.05)' : 'var(--bg-card)',
      }}
    >
      <span
        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-colors duration-150"
        style={{
          backgroundColor: selected ? '#06B6D4' : 'var(--bg)',
          color: selected ? '#0D1117' : 'var(--muted)',
          border: selected ? 'none' : '1px solid var(--border)',
        }}
      >
        {selected ? '✓' : ''}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--fg)' }}>
          {label}
        </p>
        {hint && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-light)' }}>
            {hint}
          </p>
        )}
      </div>
    </button>
  )
}

export function ContactForm() {
  const [step, setStep] = useState(1)
  const [materials, setMaterials] = useState<string[]>([])
  const [thickness, setThickness] = useState('')
  const [volume, setVolume] = useState('')
  const [name, setName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [company, setCompany] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const toggleMaterial = (m: string) => {
    setMaterials((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]))
  }

  const canAdvance = () => {
    if (step === 1) return true
    if (step === 2) return thickness !== ''
    if (step === 3) return volume !== ''
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !contactInfo) return
    setStatus('sending')

    const isEmail = contactInfo.includes('@')
    const message = [
      materials.length ? `Materiały: ${materials.join(', ')}` : null,
      thickness ? `Grubość materiału: ${thickness}` : null,
      volume ? `Skala produkcji: ${volume}` : null,
      !isEmail ? `Telefon: ${contactInfo}` : null,
      comment ? `Dodatkowe informacje: ${comment}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '923899a5-441e-4c09-8257-0b4b150a9bb6',
          subject: `Zapytanie od ${name}${company ? ` (${company})` : ''} — spawarkilaserowe.com`,
          name,
          email: isEmail ? contactInfo : 'formularz@spawarkilaserowe.com',
          company: company || '',
          message: message || '(brak szczegółów)',
        }),
      })
      const json = await res.json()
      if (!json.success) {
        setErrorMsg(json.message ?? 'Coś poszło nie tak.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Problem z połączeniem. Spróbuj ponownie.')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-10 text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
          style={{ backgroundColor: 'rgba(6,182,212,0.12)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-black mb-2" style={{ color: 'var(--fg)' }}>
          Gotowe: odpiszemy w 24h
        </h3>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Sprawdź skrzynkę odbiorczą. Jeśli masz pilne pytanie, zadzwoń: <a href="tel:+48570854886" className="font-semibold" style={{ color: '#06B6D4' }}>+48 570 854 886</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <ProgressBar step={step} />

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#06B6D4' }}>
            Krok 1 z 4
          </p>
          <h2 className="text-2xl font-black mb-1.5" style={{ letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            Co spawasz?
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
            Zaznacz wszystkie materiały: też jeśli różne zlecenia.
          </p>
          <div className="flex flex-col gap-2.5">
            {MATERIALS.map((m, i) => (
              <CardOption
                key={m}
                label={m}
                selected={materials.includes(m)}
                onClick={() => toggleMaterial(m)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#06B6D4' }}>
            Krok 2 z 4
          </p>
          <h2 className="text-2xl font-black mb-1.5" style={{ letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            Typowa grubość materiału?
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
            Wybierz zakres, który dominuje w Twojej produkcji.
          </p>
          <div className="flex flex-col gap-2.5">
            {THICKNESS.map((t) => (
              <CardOption
                key={t.value}
                label={t.value}
                hint={t.hint}
                selected={thickness === t.value}
                onClick={() => setThickness(t.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#06B6D4' }}>
            Krok 3 z 4
          </p>
          <h2 className="text-2xl font-black mb-1.5" style={{ letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            Skala produkcji?
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
            Mniej więcej: chodzi o to, czy maszyna ma pracować godzinę dziennie czy całą zmianę.
          </p>
          <div className="flex flex-col gap-2.5">
            {VOLUME.map((v) => (
              <CardOption
                key={v.value}
                label={v.value}
                hint={v.hint}
                selected={volume === v.value}
                onClick={() => setVolume(v.value)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#06B6D4' }}>
            Krok 4 z 4
          </p>
          <h2 className="text-2xl font-black mb-1.5" style={{ letterSpacing: '-0.02em', color: 'var(--fg)' }}>
            Jak się z Tobą skontaktować?
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--muted)' }}>
            Odpiszemy z rekomendacją konkretnego modelu: bez spamu, jedno pytanie.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
                Imię i nazwisko <span style={{ color: '#06B6D4' }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jan Kowalski"
                className="w-full px-0 py-2.5 text-base bg-transparent border-0 border-b-2 outline-none transition-colors duration-150"
                style={{ borderColor: name ? '#06B6D4' : 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
                Telefon lub e-mail <span style={{ color: '#06B6D4' }}>*</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
                placeholder="+48 500 000 000 lub jan@firma.pl"
                className="w-full px-0 py-2.5 text-base bg-transparent border-0 border-b-2 outline-none transition-colors duration-150"
                style={{ borderColor: contactInfo ? '#06B6D4' : 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                Firma <span className="font-normal">(opcjonalnie)</span>
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nazwa firmy"
                className="w-full px-0 py-2.5 text-base bg-transparent border-0 border-b-2 outline-none transition-colors duration-150"
                style={{ borderColor: company ? '#06B6D4' : 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                Co jeszcze warto wiedzieć? <span className="font-normal">(opcjonalnie)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="np. mam już ofertę od innego dostawcy, chcę porównać..."
                className="w-full px-0 py-2.5 text-sm bg-transparent border-0 border-b-2 outline-none resize-none transition-colors duration-150"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150 hover:bg-gray-100"
            style={{ color: 'var(--muted)' }}
          >
            ← Wstecz
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: canAdvance() ? '#06B6D4' : 'var(--border)', color: canAdvance() ? '#0D1117' : 'var(--muted)' }}
          >
            {step === 1 && materials.length === 0 ? 'Pomiń i dalej' : 'Dalej'} →
          </button>
        ) : (
          <button
            type="submit"
            disabled={!name || !contactInfo || status === 'sending'}
            className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
            style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
          >
            {status === 'sending' ? 'Wysyłanie…' : 'Wyślij zapytanie →'}
          </button>
        )}
      </div>

      {status === 'error' && (
        <p className="mt-3 text-sm font-medium" style={{ color: '#dc2626' }}>
          {errorMsg}
        </p>
      )}
    </form>
  )
}
