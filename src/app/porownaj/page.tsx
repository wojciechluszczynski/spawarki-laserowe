import type { Metadata } from 'next'
import Link from 'next/link'
import { ComparisonTable } from '@/components/compare/ComparisonTable'

export const metadata: Metadata = {
  title: 'Porównanie spawarek laserowych — laser vs TIG, MIG, moc 1500–3000W',
  description:
    'Tabele porównawcze: spawarka laserowa vs TIG/MIG, pojedyncza vs podwójna oscylacja, dobór mocy 1500–3000W. Niezależna analiza dla firm produkcyjnych.',
}

const LASER_VS_TIG_MIG_ROWS = [
  { label: 'Prędkość spawania', values: ['2–5× szybciej', 'wolniejszy TIG', 'szybszy MIG, niższy estetyka'] },
  { label: 'Strefa wpływu ciepła', values: ['minimalna', 'wysoka', 'umiarkowana'] },
  { label: 'Odkształcenia', values: ['brak / znikome', 'duże', 'umiarkowane'] },
  { label: 'Jakość spoiny', values: ['gotowa, bez szlifowania', 'wymaga obróbki', 'wymaga szlifowania'] },
  { label: 'Materiały', values: ['stal, nierdzewna, aluminium', 'stal, nierdzewna, alu', 'stal, nierdzewna'] },
  { label: 'Koszt zakupu', values: ['39–60 tys. PLN netto', '5–30 tys. PLN', '10–50 tys. PLN'], highlight: true },
  { label: 'Koszt gazu osłonowego', values: ['argon ~1 l/min', 'argon ~10 l/min', 'mieszanka ~15 l/min'] },
  { label: 'Czas szkolenia operatora', values: ['1–3 dni', '6–24 miesiące', '2–6 miesięcy'] },
]

const OSCILLATION_ROWS = [
  { label: 'Szerokość spoiny', values: ['wąska, precyzyjna', 'szersza, lepsza fuzja'] },
  { label: 'Estetyka spoiny', values: ['dobra', 'bardzo dobra / łuskowana'] },
  { label: 'Porowatość', values: ['standardowa', 'niższa'] },
  { label: 'Idealne dla', values: ['stal węglowa, proste złącza', 'nierdzewka, aluminium, złącza widoczne'] },
  { label: 'Cena vs. wariant podstawowy', values: ['podstawa', '+3 000 PLN netto'], highlight: true },
]

const FEEDER_ROWS = [
  { label: 'Liczba szpul', values: ['1', '2 jednocześnie'] },
  { label: 'Zmiana drutu', values: ['zatrzymanie, ręczna wymiana', 'przełączenie w panelu'] },
  { label: 'Praca z mieszanymi materiałami', values: ['ograniczona', 'stal + nierdzewka bez przerwy'] },
  { label: 'Ciągłość długich sesji', values: ['przerwy na wymianę szpuli', 'praca ciągła'] },
  { label: 'Cena vs. wariant podstawowy', values: ['podstawa', '+3 000 PLN netto'], highlight: true },
]

const POWER_CARDS = [
  {
    power: '1500W',
    label: 'Wejście w technologię',
    priceFrom: '39 000',
    description:
      'Stal węglowa do 10 mm, nierdzewka do 6 mm, aluminium do 4 mm. Optymalny wybór dla zakładów przechodzących z TIG/MIG, przy umiarkowanym wolumenie produkcji.',
  },
  {
    power: '2000W',
    label: 'Najczęściej wybierany',
    priceFrom: '45 000',
    description:
      'Stal węglowa do 12 mm, nierdzewka do 8 mm, aluminium do 6 mm. Złoty środek — wyraźna przewaga prędkości nad 1500W, uzasadniona przy regularnej produkcji.',
    highlight: true,
  },
  {
    power: '3000W',
    label: 'Intensywna produkcja',
    priceFrom: '54 000',
    description:
      'Stal węglowa do 20 mm, nierdzewka do 12 mm, aluminium do 10 mm. Maksymalna moc ręczna — wybór przy pracy dwuzmianowej i grubych elementach.',
  },
]

const USE_CASE_ROWS = [
  {
    profile: 'Mały zakład ślusarski',
    volume: 'do 50 zleceń/mies.',
    materials: 'stal do 8 mm',
    recommendation: 'BLS1500 — pojedyncza oscylacja',
  },
  {
    profile: 'Producent mebli metalowych',
    volume: '50–150 zleceń/mies.',
    materials: 'nierdzewka, aluminium do 5 mm',
    recommendation: 'BLS1500 lub BLS2000 — podwójna oscylacja',
  },
  {
    profile: 'Producent konstrukcji stalowych',
    volume: '100+ zleceń/mies.',
    materials: 'stal węglowa do 12 mm',
    recommendation: 'BLS2000 — podwójny podajnik',
  },
  {
    profile: 'Automotive / uchwyty, wsporniki',
    volume: 'seria powtarzalna',
    materials: 'stal, nierdzewka do 6 mm',
    recommendation: 'BLS2000 — podwójna oscylacja + podwójny podajnik',
  },
  {
    profile: 'HVAC, kanały, kołnierze',
    volume: '200+ zleceń/mies.',
    materials: 'nierdzewka 1–4 mm',
    recommendation: 'BLS2000 — podwójna oscylacja',
  },
  {
    profile: 'Produkcja ciężka, stal gruba',
    volume: 'dwie zmiany',
    materials: 'stal do 20 mm',
    recommendation: 'BLS3000 — podwójny podajnik',
  },
]

export default function PorownajPage() {
  return (
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>
            Niezależna analiza
          </p>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}
          >
            Porównanie spawarek laserowych
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Laser vs TIG vs MIG, pojedyncza vs podwójna oscylacja, dobór mocy 1500–3000W.
            Niezależne tabele dla firm produkcyjnych.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-16">

        {/* Section 1: Laser vs TIG vs MIG */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Sekcja 1</p>
          <ComparisonTable
            title="Spawarka laserowa vs TIG vs MIG — kluczowe parametry"
            headers={['Kryterium', 'Laser światłowodowy', 'TIG (WIG)', 'MIG/MAG']}
            rows={LASER_VS_TIG_MIG_ROWS}
            footnote="Ceny orientacyjne netto. Koszt gazu osłonowego przy ciągłej pracy 8h/dzień."
          />
          <p className="mt-5 text-base leading-relaxed max-w-3xl" style={{ color: 'var(--fg-secondary)' }}>
            Laser wygrywa prędkością i estetyką spoiny — zwłaszcza na nierdzewce i aluminium.
            TIG pozostaje uzasadniony przy pracach artystycznych i bardzo cienkich materiałach (poniżej 0,5 mm).
            MIG jest tańszy w zakupie, ale wyższe koszty gazu, szlifowania i czasu operatora zniwelują różnicę w 2–3 lata.
          </p>
        </section>

        {/* Section 2: Oscillation */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Sekcja 2</p>
          <ComparisonTable
            title="Pojedyncza vs podwójna oscylacja głowicy"
            headers={['Kryterium', 'Pojedyncza oscylacja', 'Podwójna oscylacja']}
            rows={OSCILLATION_ROWS}
          />
          <p className="mt-5 text-base leading-relaxed max-w-3xl" style={{ color: 'var(--fg-secondary)' }}>
            Podwójna oscylacja to wiązka poruszająca się jednocześnie w dwóch osiach.
            Spoina jest szersza i lepiej wtopiona — mniejsza porowatość, lepsza estetyka.
            Przy spawaniu stali nierdzewnej i aluminium podwójna oscylacja daje wyraźnie lepszy wynik.
            Różnica cenowa wynosi ok. 3 000 PLN netto — zwraca się szybko przy zleceniach wymagających wysokiej estetyki.
          </p>
        </section>

        {/* Section 3: Feeder */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Sekcja 3</p>
          <ComparisonTable
            title="Pojedynczy vs podwójny podajnik drutu"
            headers={['Kryterium', 'Pojedynczy podajnik', 'Podwójny podajnik']}
            rows={FEEDER_ROWS}
          />
          <p className="mt-5 text-base leading-relaxed max-w-3xl" style={{ color: 'var(--fg-secondary)' }}>
            Podwójny podajnik to dwie szpule drutu załadowane jednocześnie.
            Operator przełącza się między nimi bez przerywania pracy — szczególnie przydatne przy produkcji mieszanej
            (np. stal węglowa i nierdzewna w jednej sesji) lub przy długich sesjach wymagających ciągłości.
          </p>
        </section>

        {/* Section 4: Power selection */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Sekcja 4</p>
          <h2 className="text-xl font-black mb-6" style={{ letterSpacing: '-0.01em' }}>Dobór mocy spawarki</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {POWER_CARDS.map((card) => (
              <div
                key={card.power}
                className="rounded-xl p-5 border flex flex-col gap-3"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: card.highlight ? '#06B6D4' : 'var(--border)',
                }}
              >
                {card.highlight && (
                  <div
                    className="text-[10px] font-black uppercase tracking-widest text-center py-0.5 rounded-full -mt-1"
                    style={{ backgroundColor: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}
                  >
                    Najczęściej wybierany
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-black px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
                  >
                    {card.power}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                    {card.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--fg-secondary)' }}>
                  {card.description}
                </p>
                <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                  od <span className="text-base font-black" style={{ color: 'var(--fg)', fontFamily: 'var(--font-rubik)' }}>{card.priceFrom}</span> zł netto
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Use cases */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Sekcja 5</p>
          <h2 className="text-xl font-black mb-4" style={{ letterSpacing: '-0.01em' }}>Dla kogo który model?</h2>
          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
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
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USE_CASE_ROWS.map((row, rowIdx) => (
                  <tr key={rowIdx} style={{ backgroundColor: rowIdx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg)' }}>
                    <td style={{ fontWeight: 500, fontSize: '0.875rem', padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', color: 'var(--fg-secondary)', minWidth: '180px' }}>
                      {row.profile}
                    </td>
                    <td style={{ fontSize: '0.875rem', padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', color: 'var(--fg)', whiteSpace: 'nowrap' }}>
                      {row.volume}
                    </td>
                    <td style={{ fontSize: '0.875rem', padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', color: 'var(--fg)' }}>
                      {row.materials}
                    </td>
                    <td style={{ fontSize: '0.875rem', padding: '0.75rem 1rem', borderTop: '1px solid var(--border)' }}>
                      <Link
                        href="/modele"
                        className="font-bold hover:opacity-70 transition-opacity inline-flex items-center gap-1"
                        style={{ color: '#06B6D4' }}
                      >
                        {row.recommendation} →
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
            <p className="text-lg font-black text-white mb-2" style={{ fontFamily: 'var(--font-rubik)' }}>
              Nie wiesz który wariant wybrać?
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Opisz co spawasz, grubość materiału i miesięczny wolumen — dobierzemy model z uzasadnieniem.
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
