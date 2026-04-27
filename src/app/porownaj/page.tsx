import type { Metadata } from 'next'
import Link from 'next/link'
import { ComparisonTable } from '@/components/compare/ComparisonTable'

export const metadata: Metadata = {
  title: 'Porównanie spawarek laserowych - Laser vs Plazma, Kompaktowe vs Przemysłowe',
  description:
    'Tabele porównawcze spawarek laserowych: kompaktowe vs przemysłowe, 1500W–12000W, laser światłowodowy vs plazmowy. Niezależna analiza.',
}

const COMPACT_VS_INDUSTRIAL_ROWS = [
  { label: 'Pole robocze', values: ['do 1500×1000 mm', '3000×1500 mm'] },
  { label: 'Maks. grubość stali', values: ['22 mm', '30 mm'] },
  { label: 'Pełna obudowa', values: [true, false] },
  { label: 'Wymienny stół (opcja)', values: [false, true] },
  { label: 'Cena od (netto)', values: ['150 000 PLN', '159 000 PLN'], highlight: true },
  { label: 'Wymagana powierzchnia hali', values: ['ok. 20 m²', 'ok. 60 m²'] },
  {
    label: 'Idealna dla',
    values: [
      'rzemiosło, CNC on-demand, edukacja',
      'seryjne cięcie, konstrukcje, outsourcing',
    ],
  },
]

const LASER_VS_PLASMA_ROWS = [
  { label: 'Precyzja cięcia', values: ['± 0,05 mm', '± 0,5–2 mm'] },
  { label: 'Jakość krawędzi', values: ['gotowa, bez szlifowania', 'wymaga wykończenia'] },
  { label: 'Cena zakupu', values: ['150 000–400 000 PLN', '30 000–80 000 PLN'], highlight: true },
  { label: 'Koszt eksploatacji', values: ['niższy przy gr. do 12 mm', 'niższy przy gr. 15 mm+'] },
  { label: 'Materiały', values: ['stal, nierdzewna, alu, mosiądz, miedź', 'głównie stal węglowa'] },
  { label: 'Hałas pracy', values: ['niski', 'wysoki'] },
  { label: 'Wymagania wentylacyjne', values: ['filtr lub odciąg', 'odciąg obowiązkowy'] },
  { label: 'Amortyzacja', values: ['5–8 lat (pełna produkcja)', '3–5 lat'] },
]

const POWER_CARDS = [
  {
    power: '1500W',
    label: 'Entry level',
    description:
      'Stal do 10 mm, nierdzewna do 8 mm. Najniższy koszt zakupu i eksploatacji. Dobra opcja dla zakładów z umiarkowaną ilością zleceń.',
  },
  {
    power: '2000W',
    label: 'Standard',
    description:
      'Stal do 15 mm, nierdzewna do 10 mm. Złoty środek - większość zakładów nie potrzebuje więcej. Lepsza prędkość na cienkich materiałach.',
  },
  {
    power: '3000W',
    label: 'Wydajny',
    description:
      'Stal do 20 mm, nierdzewna do 16 mm. Zauważalnie szybszy na materiałach do 6 mm. Wybór przy wyższym wolumenie produkcji.',
  },
  {
    power: '6000W+',
    label: 'Przemysłowy',
    description:
      'Stal do 30 mm, nierdzewna do 25 mm. Maksymalna prędkość na cienkich blachach, najniższy koszt/szt. przy serii. Uzasadniony przy 2+ zmianach.',
  },
]

const USE_CASE_ROWS = [
  {
    profile: 'Mały zakład ślusarski',
    volume: 'do 50 zleceń/mies.',
    materials: 'stal do 8 mm',
    recommendation: 'BL1510 2000W',
  },
  {
    profile: 'CNC on-demand / prototypy',
    volume: 'do 100 zleceń/mies.',
    materials: 'stal, alu, nierdzewna do 10 mm',
    recommendation: 'BL1510 3000W',
  },
  {
    profile: 'Producent konstrukcji',
    volume: '200+ zleceń/mies.',
    materials: 'stal do 20 mm',
    recommendation: 'BL3015L 3000–6000W',
  },
  {
    profile: 'Producent z rurami/profilami',
    volume: '200+ zleceń/mies.',
    materials: 'stal, rury, profile',
    recommendation: 'BL3015GL lub BL220G',
  },
  {
    profile: 'Maksymalna przepustowość',
    volume: 'ciągła produkcja',
    materials: 'stal do 30 mm',
    recommendation: 'BL3015S 6000–12000W',
  },
]

export default function PorownajPage() {
  return (
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#06B6D4' }}
          >
            Niezależna analiza
          </p>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}
          >
            Porównanie spawarek laserowych
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Niezależne tabele porównawcze - specyfikacje techniczne, zakresy cenowe i rekomendacje
            dla różnych profili produkcji.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-16">

        {/* Section 1: Compact vs Industrial */}
        <section>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Sekcja 1
          </p>
          <ComparisonTable
            title="Kompaktowe vs. Przemysłowe - kluczowe parametry"
            headers={['Parametr', 'Kompaktowe (BL1313–1510)', 'Przemysłowe (BL3015)']}
            rows={COMPACT_VS_INDUSTRIAL_ROWS}
            footnote="(*) BL3015S ma pełną obudowę. BL3015L i BL3015GL są otwarte."
          />
          <p
            className="mt-5 text-base leading-relaxed max-w-3xl"
            style={{ color: 'var(--fg-secondary)' }}
          >
            Kompaktowe modele serii BL1313–1510 sprawdzają się w zakładach, gdzie liczy się
            przestrzeń i elastyczność. Przemysłowe BL3015 to wybór dla produkcji seryjnej —
            większe pole, grubsze materiały, opcja wymiennego stołu (BL3015S). Różnica cenowa na
            starcie jest niewielka; decyduje profil i wolumen produkcji.
          </p>
        </section>

        {/* Section 2: Laser vs Plasma */}
        <section>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Sekcja 2
          </p>
          <ComparisonTable
            title="Laser światłowodowy vs. Cięcie plazmowe"
            headers={['Kryterium', 'Laser światłowodowy (fiber)', 'Cięcie plazmowe']}
            rows={LASER_VS_PLASMA_ROWS}
          />
          <p
            className="mt-5 text-base leading-relaxed max-w-3xl"
            style={{ color: 'var(--fg-secondary)' }}
          >
            Laser wygrywa wszędzie tam, gdzie liczy się precyzja, różnorodność materiałów i jakość
            krawędzi bez dodatkowej obróbki. Plazma pozostaje uzasadniona przy grubej stali węglowej
            (15 mm+) i niskim budżecie inwestycyjnym. Przy typowej produkcji ślusarskiej do 10 mm —
            laser zwraca się szybciej niż wynikałoby to z wyższej ceny zakupu.
          </p>
        </section>

        {/* Section 3: Power selection cards */}
        <section>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Sekcja 3
          </p>
          <h2
            className="text-xl font-black mb-6"
            style={{ letterSpacing: '-0.01em', fontFamily: 'var(--font-rubik)' }}
          >
            Dobór mocy lasera
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POWER_CARDS.map((card) => (
              <div
                key={card.power}
                className="rounded-[var(--radius-md)] p-5 border flex flex-col gap-3"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="inline-block self-start text-sm font-black px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: '#06B6D4', color: '#fff' }}
                  >
                    {card.power}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--muted)' }}
                  >
                    {card.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: For whom / use cases */}
        <section>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Sekcja 4
          </p>
          <h2
            className="text-xl font-black mb-4"
            style={{ letterSpacing: '-0.01em', fontFamily: 'var(--font-rubik)' }}
          >
            Dla kogo co?
          </h2>
          <div
            style={{
              overflowX: 'auto',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Profil zakładu', 'Wolumen', 'Materiały', 'Rekomendacja'].map((header, i) => (
                    <th
                      key={i}
                      style={{
                        backgroundColor: 'var(--fg)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        padding: '0.875rem 1rem',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USE_CASE_ROWS.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    style={{
                      backgroundColor: rowIdx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)',
                    }}
                  >
                    <td
                      style={{
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        padding: '0.75rem 1rem',
                        borderTop: '1px solid var(--border)',
                        color: 'var(--fg-secondary)',
                        minWidth: '180px',
                      }}
                    >
                      {row.profile}
                    </td>
                    <td
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.75rem 1rem',
                        borderTop: '1px solid var(--border)',
                        color: 'var(--fg)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.volume}
                    </td>
                    <td
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.75rem 1rem',
                        borderTop: '1px solid var(--border)',
                        color: 'var(--fg)',
                      }}
                    >
                      {row.materials}
                    </td>
                    <td
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.75rem 1rem',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      <Link
                        href="/modele"
                        className="font-bold hover:opacity-70 transition-opacity inline-flex items-center gap-1"
                        style={{ color: '#06B6D4' }}
                      >
                        {row.recommendation}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <div
          className="rounded-[var(--radius-md)] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{ backgroundColor: '#0D1117' }}
        >
          <div className="flex-1">
            <p
              className="text-lg font-black text-white mb-2"
              style={{ fontFamily: 'var(--font-rubik)' }}
            >
              Potrzebujesz porównania dla swojego case&apos;u?
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Opisz swoją produkcję - przygotujemy zestawienie dopasowane do Twojego wolumenu i
              materiałów.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 text-sm font-black px-6 py-3 rounded-[var(--radius-md)] transition-all hover:opacity-90 shrink-0"
            style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
          >
            Zapytaj eksperta
          </Link>
        </div>

      </div>
    </div>
  )
}
