'use client'
import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
type CellValue = string | true | false | 'best' | 'ok' | 'bad'
type Tab = 'laser' | 'oscylacja' | 'podajnik' | 'moc'
type PowerLevel = '1500W' | '2000W' | '3000W'

// ─── Data ─────────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
  { id: 'laser', label: 'Laser vs TIG vs MIG' },
  { id: 'oscylacja', label: 'Oscylacja głowicy' },
  { id: 'podajnik', label: 'Podajnik drutu' },
  { id: 'moc', label: 'Dobór mocy' },
]

const LASER_ROWS: { label: string; laser: CellValue; tig: CellValue; mig: CellValue; note?: string }[] = [
  { label: 'Prędkość spawania', laser: 'best', tig: 'bad', mig: 'ok', note: 'Laser 3–4× szybszy niż TIG na stali nierdzewnej 3 mm' },
  { label: 'Odkształcenia termiczne', laser: 'best', tig: 'bad', mig: 'ok' },
  { label: 'Jakość spoiny', laser: 'best', tig: 'ok', mig: 'bad' },
  { label: 'Szlifowanie po spawaniu', laser: 'best', tig: 'bad', mig: 'bad', note: 'Laser: zero. TIG/MIG wymagają szlifierki' },
  { label: 'Zużycie gazu (l/min)', laser: 'best', tig: 'bad', mig: 'bad', note: 'Laser ~1 l/min, TIG 10–15 l/min, MIG 12–20 l/min' },
  { label: 'Czas szkolenia operatora', laser: 'best', tig: 'bad', mig: 'ok', note: 'Laser 1–3 dni, TIG 6–24 miesięcy' },
  { label: 'Cena zakupu', laser: 'bad', tig: 'ok', mig: 'ok', note: 'Laser droższy, ale TCO po 2 latach niższy' },
  { label: 'Aluminium i nierdzewka', laser: 'best', tig: 'ok', mig: 'bad' },
  { label: 'Elastyczność (detale nieregularne)', laser: 'best', tig: 'ok', mig: 'ok' },
]

const OSC_ROWS: { label: string; single: CellValue; double: CellValue }[] = [
  { label: 'Szerokość spoiny', single: 'ok', double: 'best' },
  { label: 'Estetyka spoiny', single: 'ok', double: 'best' },
  { label: 'Porowatość', single: 'ok', double: 'best' },
  { label: 'Nierdzewka i aluminium', single: 'ok', double: 'best' },
  { label: 'Stal węglowa, proste złącza', single: 'best', double: 'ok' },
  { label: 'Cena', single: 'best', double: 'ok' },
]

const FEEDER_ROWS: { label: string; single: CellValue; double: CellValue }[] = [
  { label: 'Zmiana drutu', single: 'bad', double: 'best' },
  { label: 'Produkcja mieszana', single: 'bad', double: 'best' },
  { label: 'Praca ciągła (długie sesje)', single: 'ok', double: 'best' },
  { label: 'Cena', single: 'best', double: 'ok' },
  { label: 'Prostota obsługi', single: 'best', double: 'ok' },
]

const POWER_DATA: Record<PowerLevel, { stal: string; nierdzewna: string; aluminium: string; priceFrom: string; for: string[]; not: string[] }> = {
  '1500W': {
    stal: '10 mm',
    nierdzewna: '6 mm',
    aluminium: '4 mm',
    priceFrom: '39 000',
    for: ['Zakłady do 8h spawania dziennie', 'Pierwsza maszyna laserowa', 'Nierdzewka i aluminium do 4–6 mm', 'Zlecenia mieszane, małe serie'],
    not: ['Gruba stal powyżej 10 mm', 'Produkcja ciągła na dwie zmiany'],
  },
  '2000W': {
    stal: '12 mm',
    nierdzewna: '8 mm',
    aluminium: '6 mm',
    priceFrom: '45 000',
    for: ['Regularna produkcja dzienna', 'Stal węglowa do 12 mm', 'Nierdzewka do 8 mm', 'Automotive i HVAC'],
    not: ['Gruba stal powyżej 12 mm regularnie'],
  },
  '3000W': {
    stal: '20 mm',
    nierdzewna: '12 mm',
    aluminium: '10 mm',
    priceFrom: '54 000',
    for: ['Dwie zmiany produkcji', 'Gruba stal do 20 mm', 'Konstrukcje stalowe, trawersy', 'Kooperacja przemysłowa'],
    not: ['Budżet poniżej 54 000 zł netto'],
  },
}

// ─── Cell renderer ────────────────────────────────────────────────────────────
function Cell({ value, highlight = false }: { value: CellValue; highlight?: boolean }) {
  if (value === 'best') return (
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Tak
      </span>
    </div>
  )
  if (value === 'ok') return (
    <div className="flex items-center justify-center">
      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
        Częściowo
      </span>
    </div>
  )
  if (value === 'bad') return (
    <div className="flex items-center justify-center">
      <span className="text-xs font-medium" style={{ color: 'var(--muted-light)' }}>✕</span>
    </div>
  )
  if (value === true) return <Cell value="best" />
  if (value === false) return <Cell value="bad" />
  return <span className="text-sm" style={{ color: 'var(--fg)' }}>{value}</span>
}

// ─── Tab button ───────────────────────────────────────────────────────────────
function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap"
      style={{
        backgroundColor: active ? '#06B6D4' : 'transparent',
        color: active ? '#0D1117' : 'var(--muted)',
        fontWeight: active ? 700 : 500,
      }}
    >
      {children}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PorownajPage() {
  const [tab, setTab] = useState<Tab>('laser')
  const [power, setPower] = useState<PowerLevel>('2000W')

  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>Niezależna analiza</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}>
            Porównanie spawarek laserowych
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Laser vs TIG vs MIG, oscylacja, podajnik, dobór mocy. Wybierz temat i porównaj parametry.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Tab strip */}
        <div
          className="flex gap-1 p-1.5 rounded-2xl mb-10 overflow-x-auto"
          style={{ backgroundColor: 'var(--bg)' }}
        >
          {TABS.map((t) => (
            <TabBtn key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </TabBtn>
          ))}
        </div>

        {/* ── Tab: Laser vs TIG vs MIG ── */}
        {tab === 'laser' && (
          <div>
            {/* Column headers */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div />
              {[
                { label: 'Laser światłowodowy', sub: 'Blink 1500–3000W', accent: true },
                { label: 'TIG / WIG', sub: 'argon, wolframowa elektroda', accent: false },
                { label: 'MIG / MAG', sub: 'drut, mieszanka gazów', accent: false },
              ].map((col) => (
                <div
                  key={col.label}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    backgroundColor: col.accent ? 'rgba(6,182,212,0.08)' : 'var(--bg)',
                    border: col.accent ? '2px solid rgba(6,182,212,0.3)' : '2px solid var(--border)',
                  }}
                >
                  <p className="font-black text-sm mb-0.5" style={{ color: col.accent ? '#06B6D4' : 'var(--fg)' }}>{col.label}</p>
                  <p className="text-[11px]" style={{ color: 'var(--muted-light)' }}>{col.sub}</p>
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-0.5">
              {LASER_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-4 gap-2 items-center py-3 px-2 rounded-xl transition-colors hover:bg-[var(--bg)] group"
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>{row.label}</p>
                    {row.note && <p className="text-[11px] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--muted-light)' }}>{row.note}</p>}
                  </div>
                  <div className="flex justify-center"><Cell value={row.laser} highlight /></div>
                  <div className="flex justify-center"><Cell value={row.tig} /></div>
                  <div className="flex justify-center"><Cell value={row.mig} /></div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs" style={{ color: 'var(--muted-light)' }}>
              Najedź kursorem na wiersz, aby zobaczyć szczegóły. Dane orientacyjne dla typowych zastosowań przemysłowych.
            </p>

            <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                <strong>Kiedy TIG wciąż ma sens?</strong> Prace artystyczne, materiały poniżej 0,5 mm grubości, jednorazowe zlecenia naprawcze przy braku budżetu na laser.
                Przy regularnej produkcji metalowej powyżej 200 złączy miesięcznie laser zwraca się w 6–18 miesięcy wyłącznie na oszczędnościach czasu i gazu.
              </p>
            </div>
          </div>
        )}

        {/* ── Tab: Oscylacja ── */}
        {tab === 'oscylacja' && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-2">
              <div />
              {[
                { label: 'Pojedyncza oscylacja', sub: 'wiązka w jednej osi', accent: false },
                { label: 'Podwójna oscylacja', sub: 'wiązka w dwóch osiach jednocześnie', accent: true },
              ].map((col) => (
                <div
                  key={col.label}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    backgroundColor: col.accent ? 'rgba(6,182,212,0.08)' : 'var(--bg)',
                    border: col.accent ? '2px solid rgba(6,182,212,0.3)' : '2px solid var(--border)',
                  }}
                >
                  <p className="font-black text-sm mb-0.5" style={{ color: col.accent ? '#06B6D4' : 'var(--fg)' }}>{col.label}</p>
                  <p className="text-[11px]" style={{ color: 'var(--muted-light)' }}>{col.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-0.5">
              {OSC_ROWS.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-3 items-center py-3 px-2 rounded-xl transition-colors hover:bg-[var(--bg)]">
                  <p className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>{row.label}</p>
                  <div className="flex justify-center"><Cell value={row.single} /></div>
                  <div className="flex justify-center"><Cell value={row.double} /></div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="font-bold mb-2 text-sm" style={{ color: 'var(--fg)' }}>Kiedy wybrać podwójną oscylację?</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                Jeśli spawasz nierdzewkę lub aluminium, albo spoiny są widoczne w finalnym produkcie — podwójna oscylacja daje
                wyraźnie lepszy wynik estetyczny i mniejszą porowatość. Dopłata ok. 3 000 zł netto zwraca się
                szybko przy zleceniach premium. Na zwykłej stali węglowej różnica jest mniejsza.
              </p>
            </div>
          </div>
        )}

        {/* ── Tab: Podajnik ── */}
        {tab === 'podajnik' && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-2">
              <div />
              {[
                { label: 'Pojedynczy podajnik', sub: 'jedna szpula drutu', accent: false },
                { label: 'Podwójny podajnik', sub: 'dwie szpule jednocześnie', accent: true },
              ].map((col) => (
                <div
                  key={col.label}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    backgroundColor: col.accent ? 'rgba(6,182,212,0.08)' : 'var(--bg)',
                    border: col.accent ? '2px solid rgba(6,182,212,0.3)' : '2px solid var(--border)',
                  }}
                >
                  <p className="font-black text-sm mb-0.5" style={{ color: col.accent ? '#06B6D4' : 'var(--fg)' }}>{col.label}</p>
                  <p className="text-[11px]" style={{ color: 'var(--muted-light)' }}>{col.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-0.5">
              {FEEDER_ROWS.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-3 items-center py-3 px-2 rounded-xl transition-colors hover:bg-[var(--bg)]">
                  <p className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>{row.label}</p>
                  <div className="flex justify-center"><Cell value={row.single} /></div>
                  <div className="flex justify-center"><Cell value={row.double} /></div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="font-bold mb-2 text-sm" style={{ color: 'var(--fg)' }}>Kiedy wybrać podwójny podajnik?</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                Jeśli w jednej sesji spawasz różne materiały (np. stal węglową i nierdzewkę) albo pracujesz na długich
                sesjach bez przerw — podwójny podajnik eliminuje przestoje na wymianę szpuli. Przy jednorodnej produkcji
                z jednego materiału pojedynczy podajnik w pełni wystarczy.
              </p>
            </div>
          </div>
        )}

        {/* ── Tab: Dobór mocy ── */}
        {tab === 'moc' && (
          <div>
            {/* Power selector */}
            <div className="flex gap-2 mb-8 p-1.5 rounded-2xl self-start inline-flex" style={{ backgroundColor: 'var(--bg)' }}>
              {(['1500W', '2000W', '3000W'] as PowerLevel[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPower(p)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-150"
                  style={{
                    backgroundColor: power === p ? '#06B6D4' : 'transparent',
                    color: power === p ? '#0D1117' : 'var(--muted)',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Specs grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { mat: 'Stal węglowa', val: POWER_DATA[power].stal },
                { mat: 'Nierdzewka', val: POWER_DATA[power].nierdzewna },
                { mat: 'Aluminium', val: POWER_DATA[power].aluminium },
              ].map((s) => (
                <div
                  key={s.mat}
                  className="rounded-2xl p-5 text-center"
                  style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: 'var(--muted-light)' }}>{s.mat}</p>
                  <p className="text-3xl font-black" style={{ color: '#06B6D4', fontFamily: 'var(--font-rubik)' }}>do {s.val}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>Wybierz {power} jeśli</p>
                <ul className="flex flex-col gap-2">
                  {POWER_DATA[power].for.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                      <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="rgba(6,182,212,0.15)"/>
                        <path d="M4 7l2 2 4-4" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {POWER_DATA[power].not.length > 0 && (
                <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Rozważ inny model jeśli</p>
                  <ul className="flex flex-col gap-2">
                    {POWER_DATA[power].not.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                        <span className="shrink-0 mt-0.5 text-xs">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl" style={{ backgroundColor: '#0D1117' }}>
              <div>
                <p className="text-white font-black mb-0.5">Blink {power}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-sm">od {POWER_DATA[power].priceFrom} zł netto · gwarancja producenta</p>
              </div>
              <Link
                href="/modele"
                className="text-sm font-black px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
              >
                Zobacz modele →
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8" style={{ backgroundColor: '#0D1117', border: '1px solid rgba(6,182,212,0.15)' }}>
          <div className="flex-1">
            <p className="text-lg font-black text-white mb-2" style={{ fontFamily: 'var(--font-rubik)' }}>
              Wciąż nie wiesz który wariant wybrać?
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Opisz produkcję w formularzu — odpiszemy z konkretnym modelem i uzasadnieniem w 24h.
            </p>
          </div>
          <Link href="/kontakt" className="inline-flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl transition-all hover:opacity-90 shrink-0" style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
            Zapytaj eksperta →
          </Link>
        </div>
      </div>
    </div>
  )
}
