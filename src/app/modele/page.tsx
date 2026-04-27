import type { Metadata } from 'next'
import Link from 'next/link'
import { VariantCard } from '@/components/models/VariantCard'
import type { ProductVariant } from '@/components/models/VariantCard'
import productsData from '../../../content/site/products.json'

export const metadata: Metadata = {
  title: 'Spawarki laserowe - katalog modeli, ceny, specyfikacje',
  description: 'Spawarki laserowe fiber - ręczne 1–3 kW i automatyczne stacje spawalnicze. Ceny, dane techniczne, grubości spawania. Dobierz model do swojej produkcji.',
}

type RawVariant = {
  power: string
  priceNet: number
  priceGross: number
  bestseller: boolean
  shopUrl: string
}

type RawProduct = {
  family: string
  name: string
  image: string
  workArea: string
  description: string
  materialThickness: { stal: string; nierdzewna: string; aluminium: string }
  variants: RawVariant[]
  highlights: string[]
}

// Flatten product families → individual variant cards
function flattenVariants(products: RawProduct[]): ProductVariant[] {
  const result: ProductVariant[] = []
  for (const p of products) {
    for (const v of p.variants) {
      result.push({
        family: p.family,
        name: p.name,
        image: p.image,
        workArea: p.workArea,
        power: v.power,
        priceNet: v.priceNet,
        priceGross: v.priceGross,
        bestseller: v.bestseller,
        shopUrl: v.shopUrl,
        materialThickness: p.materialThickness,
        highlights: p.highlights,
      })
    }
  }
  return result
}

const CATEGORIES = [
  { label: 'Ręczne (Handheld)', families: ['SL1000H', 'SL1500H', 'SL2000H', 'SL3000H'] },
  { label: 'Automatyczne stacje spawalnicze', families: ['SL2000A', 'SL3000A'] },
]

export default function ModelePage() {
  const allVariants = flattenVariants(productsData as RawProduct[])

  return (
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FFA52F' }}>
            Katalog spawarek laserowych BLink Laser
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}>
            Katalog spawarek laserowych
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            6 modeli w 2 kategoriach - ręczne spawarki laserowe do elastycznej pracy i automatyczne stacje do produkcji seryjnej.
            Każda maszyna z gwarancją producenta i serwisem w Polsce.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            {[
              { value: '6', label: 'modeli' },
              { value: '1–3 kW', label: 'zakres mocy' },
              { value: 'do 20 mm', label: 'grubość stali' },
              { value: '1 dzień', label: 'czas odpowiedzi' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-black text-lg" style={{ color: '#FFA52F' }}>{s.value}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Category sections */}
        {CATEGORIES.map((cat) => {
          const catVariants = allVariants.filter((v) => cat.families.includes(v.family))
          if (catVariants.length === 0) return null
          return (
            <div key={cat.label} className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-black" style={{ letterSpacing: '-0.01em' }}>{cat.label}</h2>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: '#FFA52F' }}
                >
                  {catVariants.length} {catVariants.length === 1 ? 'model' : 'modele/modeli'}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catVariants.map((v) => (
                  <VariantCard key={`${v.family}-${v.power}`} variant={v} />
                ))}
              </div>
            </div>
          )
        })}

        {/* Contact nudge */}
        <div
          className="rounded-[var(--radius-xl)] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{ backgroundColor: '#0D1117' }}
        >
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#FFA52F' }}>Nie wiesz który wybrać?</p>
            <p className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-rubik)' }}>
              Opisz co spawasz - dobierzemy model
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Materiał, grubość, miesięczny wolumen. Odpiszemy z konkretnym modelem i uzasadnieniem.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-sm font-black px-6 py-3 rounded-[var(--radius-md)] transition-all hover:opacity-90"
              style={{ backgroundColor: '#FFA52F', color: '#0D1117' }}
            >
              Wyślij zapytanie
            </Link>
            <a
              href="tel:+48570854886"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-[var(--radius-md)] border transition-all hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
            >
              +48 570 854 886
            </a>
          </div>
        </div>

        {/* SEO content */}
        <div className="mt-16 prose prose-neutral max-w-none">
          <h2>Spawarki laserowe fiber - co warto wiedzieć przed zakupem</h2>
          <p>
            Spawarki laserowe fiber (światłowodowe) to rosnący standard w przemysłowym spawaniu blach i profili metalowych.
            W porównaniu do spawania TIG i MIG oferują wyższą prędkość (2–5× szybciej), minimalną strefę wpływu ciepła
            i estetyczną spoinę gotową bez szlifowania. Dostępne są w wersji ręcznej (handheld) i jako automatyczne stacje spawalnicze.
          </p>
          <h3>Ręczne spawarki laserowe (SL1000H–SL3000H)</h3>
          <p>
            Spawarki ręczne to najpopularniejszy punkt wejścia w technologię laserową. Operator prowadzi głowicę ręcznie,
            co daje elastyczność przy spawaniu dużych lub nieregularnych detali. Dostępne w mocach 1000W, 1500W, 2000W i 3000W.
            Głowica wielofunkcyjna obsługuje spawanie, czyszczenie i lutowanie laserowe. Ceny od ok. 28 000 zł netto.
          </p>
          <h3>Automatyczne stacje spawalnicze (SL2000A, SL3000A)</h3>
          <p>
            Stacje automatyczne wyposażone są w stolik roboczy z uchwytem CNC i programowalnym sterownikiem.
            SL2000A (stolik 800×600 mm) sprawdza się przy średnich seriach standaryzowanych detali.
            SL3000A (stolik 1200×800 mm) z podwójnym wymiennym stołem umożliwia ciągłą produkcję bez przestoju.
            Powtarzalność 0,02 mm - każda sztuka identyczna jak pierwsza. Ceny od ok. 180 000 zł netto.
          </p>
          <h3>Grubości spawania - jaka moc lasera?</h3>
          <p>
            Model 1 kW spawa stal węglową do 8 mm, nierdzewną do 5 mm.
            Model 1,5 kW — stal do 10 mm, nierdzewna do 6 mm.
            Model 2 kW — stal do 12 mm, nierdzewna do 8 mm, aluminium do 6 mm.
            Model 3 kW — stal do 20 mm, nierdzewna do 12 mm, aluminium do 10 mm.
            Przy doborze mocy kluczowy jest nie tylko maksymalny zakres, ale prędkość przy najczęściej używanych grubościach w Twojej produkcji.
          </p>
        </div>
      </div>
    </div>
  )
}
