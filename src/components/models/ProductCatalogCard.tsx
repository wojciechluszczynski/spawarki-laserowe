import Image from 'next/image'
import Link from 'next/link'
import { IconCheck } from '@/components/ui/Icons'

type Variant = { power: string; priceNet: number; priceGross: number }

type Product = {
  family: string
  name: string
  image: string
  workArea: string
  description: string
  materialThickness: { stal: string; nierdzewna: string; aluminium: string }
  variants: Variant[]
  highlights: string[]
}

function fmt(n: number) {
  return n.toLocaleString('pl-PL') + ' zł'
}

export function ProductCatalogCard({ product }: { product: Product }) {
  return (
    <div
      className="flex flex-col rounded-[var(--radius-lg)] border overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      {/* Image */}
      <div className="relative w-full" style={{ height: '220px', backgroundColor: 'var(--bg)' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-5"
        />
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div>
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-2 px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}
          >
            {product.workArea}
          </span>
          <h3 className="text-lg font-bold" style={{ letterSpacing: '-0.01em' }}>
            {product.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {product.description}
        </p>

        {/* Material thickness */}
        <div
          className="rounded-[var(--radius-md)] p-3 grid grid-cols-3 gap-2 text-center"
          style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          {Object.entries(product.materialThickness).map(([mat, val]) => (
            <div key={mat}>
              <p className="text-[10px] uppercase tracking-widest mb-0.5 font-medium" style={{ color: 'var(--muted-light)' }}>{mat}</p>
              <p className="text-sm font-bold" style={{ color: 'var(--fg)' }}>do {val}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs" style={{ color: 'var(--muted)' }}>
              <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                <IconCheck size={12} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Variants / pricing */}
        <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-light)' }}>
            Dostępne warianty mocy
          </p>
          <div className="flex flex-col gap-2">
            {product.variants.map((v) => (
              <div key={v.power} className="flex items-center justify-between">
                <span
                  className="font-semibold px-2.5 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}
                >
                  {v.power}
                </span>
                <div className="text-right">
                  <span className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{fmt(v.priceNet)}</span>
                  <span className="text-xs ml-1" style={{ color: 'var(--muted-light)' }}>netto</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <Link
          href="/kontakt"
          className="flex items-center justify-center gap-2 w-full text-sm font-semibold py-2.5 rounded-[var(--radius-md)] border transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)]"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--fg)' }}
        >
          Zapytaj o wycenę
        </Link>
      </div>
    </div>
  )
}
