import Image from 'next/image'
import Link from 'next/link'

export type ProductVariant = {
  family: string
  name: string
  image: string
  workArea: string
  power: string
  oscillation: string
  feeder: string
  priceNet: number
  priceGross: number
  bestseller: boolean
  shopUrl: string
  materialThickness: { stal: string; nierdzewna: string; aluminium: string }
  highlights: string[]
}

function fmt(n: number) {
  return n.toLocaleString('pl-PL')
}

const POWER_ACCENT: Record<string, string> = {
  '1500W': '#6B7280',
  '2000W': '#374151',
  '3000W': '#06B6D4',
}

export function VariantCard({ variant }: { variant: ProductVariant }) {
  const accentColor = POWER_ACCENT[variant.power] ?? '#06B6D4'
  const isDouble = variant.oscillation === 'podwójna'
  const hasDualFeeder = variant.feeder === 'podwójny'

  return (
    <article
      className="group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
      style={{
        borderColor: variant.bestseller ? '#06B6D4' : 'var(--border)',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      {variant.bestseller && (
        <div
          className="absolute top-0 left-0 right-0 z-10 text-center text-[10px] font-black uppercase tracking-widest py-1"
          style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
        >
          Bestseller
        </div>
      )}

      {/* Image */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '180px', backgroundColor: '#F7F8FC', marginTop: variant.bestseller ? '22px' : 0 }}
      >
        <Image
          src={variant.image}
          alt={`${variant.name} ${variant.oscillation} oscylacja ${variant.feeder} podajnik`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        {/* Power badge */}
        <div
          className="absolute bottom-2.5 right-2.5 text-xs font-black px-2 py-0.5 rounded-full"
          style={{ backgroundColor: accentColor, color: '#fff', opacity: 0.92 }}
        >
          {variant.power}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-light)' }}>
            {variant.workArea}
          </p>
          <h3 className="font-black text-[15px] leading-snug" style={{ letterSpacing: '-0.02em' }}>
            {variant.name}
          </h3>
        </div>

        {/* Config chips */}
        <div className="flex flex-wrap gap-1.5">
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border"
            style={
              isDouble
                ? { backgroundColor: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)', color: '#06B6D4' }
                : { backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--muted)' }
            }
          >
            {isDouble ? '◉' : '○'} {variant.oscillation} oscylacja
          </span>
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border"
            style={
              hasDualFeeder
                ? { backgroundColor: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)', color: '#06B6D4' }
                : { backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--muted)' }
            }
          >
            {hasDualFeeder ? '⇉' : '→'} {variant.feeder} podajnik
          </span>
        </div>

        {/* Material thickness */}
        <div className="grid grid-cols-3 gap-0.5 rounded-xl overflow-hidden text-center text-xs" style={{ backgroundColor: 'var(--border)' }}>
          {(Object.entries(variant.materialThickness) as [string, string][]).map(([mat, val]) => (
            <div key={mat} className="py-2 px-1" style={{ backgroundColor: 'var(--bg)' }}>
              <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted-light)' }}>{mat}</p>
              <p className="font-bold text-sm" style={{ color: 'var(--fg)' }}>do {val}</p>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[11px] uppercase tracking-widest mb-0.5 font-medium" style={{ color: 'var(--muted-light)' }}>od</p>
          <p className="text-2xl font-black leading-none" style={{ fontFamily: 'var(--font-rubik)', color: 'var(--fg)' }}>
            {fmt(variant.priceNet)}{' '}
            <span className="text-sm font-normal" style={{ color: 'var(--muted)' }}>zł netto</span>
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-light)' }}>
            {fmt(variant.priceGross)} zł brutto
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-5 pb-5 flex flex-col gap-2">
        <a
          href={variant.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full text-sm font-bold py-2.5 rounded-xl transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
        >
          Kup w sklepie →
        </a>
        <Link
          href="/kontakt"
          className="flex items-center justify-center w-full text-sm font-semibold py-2 rounded-xl border transition-all duration-150 hover:border-[#06B6D4] hover:text-[#06B6D4]"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--muted)' }}
        >
          Zapytaj o wycenę
        </Link>
      </div>
    </article>
  )
}
