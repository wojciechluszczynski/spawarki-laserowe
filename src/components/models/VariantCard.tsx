import Image from 'next/image'
import Link from 'next/link'
import { IconArrow } from '@/components/ui/Icons'

export type ProductVariant = {
  family: string
  name: string
  image: string
  workArea: string
  power: string
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

const powerColors: Record<string, { bg: string; text: string }> = {
  '1500W': { bg: '#F0F0F0', text: '#3D3D3D' },
  '2000W': { bg: '#E5E7EB', text: '#1F2937' },
  '3000W': { bg: '#ECFEFF', text: '#06B6D4' },
  '6000W': { bg: '#1B2332', text: '#06B6D4' },
  '12000W': { bg: '#0D1117', text: '#06B6D4' },
}

export function VariantCard({ variant }: { variant: ProductVariant }) {
  const pw = powerColors[variant.power] ?? { bg: 'var(--accent-subtle)', text: 'var(--accent)' }

  return (
    <div
      className="group relative flex flex-col rounded-[var(--radius-lg)] border overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
      style={{ borderColor: variant.bestseller ? 'var(--accent)' : 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      {/* Bestseller ribbon */}
      {variant.bestseller && (
        <div
          className="absolute top-3 left-0 z-10 text-[11px] font-black uppercase tracking-widest px-3 py-1"
          style={{ backgroundColor: 'var(--accent)', color: '#0D1117', borderRadius: '0 4px 4px 0' }}
        >
          Bestseller
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '200px', backgroundColor: 'var(--bg-card)' }}>
        <Image
          src={variant.image}
          alt={`${variant.name} ${variant.power}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {/* Power badge */}
        <div
          className="absolute bottom-3 right-3 text-xs font-black px-2.5 py-1 rounded-full"
          style={{ backgroundColor: pw.bg, color: pw.text }}
        >
          {variant.power}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Name */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-1 font-medium" style={{ color: 'var(--muted-light)' }}>
            {variant.workArea}
          </p>
          <h3 className="font-bold text-base leading-tight" style={{ letterSpacing: '-0.01em' }}>
            {variant.name} <span style={{ color: 'var(--accent)' }}>{variant.power}</span>
          </h3>
        </div>

        {/* Material thickness */}
        <div className="grid grid-cols-3 gap-1 text-center py-2 rounded-[var(--radius-sm)]" style={{ backgroundColor: 'var(--bg)' }}>
          {Object.entries(variant.materialThickness).map(([mat, val]) => (
            <div key={mat}>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted-light)' }}>{mat}</p>
              <p className="text-sm font-bold" style={{ color: 'var(--fg)' }}>do {val}</p>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted-light)' }}>Cena</p>
          <p className="text-2xl font-black" style={{ color: 'var(--fg)', fontFamily: 'var(--font-rubik)' }}>
            {fmt(variant.priceNet)}{' '}
            <span className="text-sm font-normal" style={{ color: 'var(--muted)' }}>zł netto</span>
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-light)' }}>
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
          className="flex items-center justify-center gap-2 w-full text-sm font-bold py-2.5 rounded-[var(--radius-md)] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          Sprawdź w sklepie
          <IconArrow size={14} />
        </a>
        <Link
          href="/kontakt"
          className="flex items-center justify-center w-full text-sm font-semibold py-2 rounded-[var(--radius-md)] border transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)]"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--muted)' }}
        >
          Zapytaj o wycenę
        </Link>
      </div>
    </div>
  )
}
