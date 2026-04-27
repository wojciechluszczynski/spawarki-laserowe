import Link from 'next/link'
import Image from 'next/image'
import { IconCheck, IconArrow } from '@/components/ui/Icons'
import type { MachineModel } from '@/types/content'

export function ModelCard({ model, featured }: { model: MachineModel; featured?: boolean }) {
  return (
    <div
      className="relative flex flex-col rounded-[var(--radius-lg)] border overflow-hidden transition-all duration-200 hover:shadow-[var(--shadow-lg)]"
      style={{
        borderColor: featured ? 'var(--accent)' : 'var(--border)',
        backgroundColor: 'var(--bg-card)',
        boxShadow: featured ? '0 0 0 2px var(--accent), var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      {/* Featured ribbon */}
      {featured && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, var(--accent) 0%, #6B87F0 100%)' }}
        />
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #6B87F0 100%)' }}
          >
            Najpopularniejszy
          </span>
        </div>
      )}

      {/* Product image */}
      {model.image && (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '200px', backgroundColor: 'var(--bg)' }}
        >
          <Image
            src={model.image}
            alt={model.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4"
          />
        </div>
      )}

      <div className="p-6 flex flex-col gap-5 flex-1">
        {/* Badge + tier */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={
              featured
                ? { backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }
                : { backgroundColor: 'var(--border)', color: 'var(--muted)' }
            }
          >
            {model.badge}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted-light)' }}>{model.tier}</span>
        </div>

        {/* Name + summary */}
        <div>
          <h3 className="text-xl font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
            {model.name}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{model.summary}</p>
        </div>

        {/* Ideal for */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-light)' }}>
            Idealny dla
          </p>
          <ul className="flex flex-col gap-2">
            {model.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                  <IconCheck size={13} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Advantages */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-light)' }}>
            Przewagi
          </p>
          <ul className="flex flex-col gap-2">
            {model.advantages.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Specs */}
      <div className="px-6 pb-5">
        <div
          className="rounded-[var(--radius-md)] px-4 py-3 grid grid-cols-1 gap-1.5 text-xs"
          style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          {[
            { label: 'Moc', value: model.specs.power },
            { label: 'Pole robocze', value: model.specs.workArea },
            { label: 'Prędkość', value: model.specs.speed },
            { label: 'Grubość materiału', value: model.specs.materialThickness },
          ].map((s) => (
            <div key={s.label} className="flex justify-between gap-2">
              <span style={{ color: 'var(--muted-light)' }}>{s.label}</span>
              <span className="text-right font-medium" style={{ color: 'var(--fg-secondary)' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <Link
          href="/kontakt"
          className="flex items-center justify-center gap-2 w-full text-sm font-semibold py-3 rounded-[var(--radius-md)] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          style={
            featured
              ? {
                  background: 'linear-gradient(135deg, var(--accent) 0%, #6B87F0 100%)',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgb(74 105 226 / 0.35)',
                }
              : {
                  backgroundColor: 'var(--bg)',
                  color: 'var(--fg)',
                  border: '1.5px solid var(--border-strong)',
                }
          }
        >
          Zapytaj o ten model
          <IconArrow size={14} />
        </Link>
      </div>
    </div>
  )
}
