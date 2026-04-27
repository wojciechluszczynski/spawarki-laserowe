'use client'
import { useState } from 'react'
import { IconChevron } from '@/components/ui/Icons'
import type { FAQItem } from '@/types/content'

function FaqItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-150 hover:text-[var(--accent)]"
        style={{ color: 'var(--fg)' }}
        aria-expanded={open}
      >
        <span className="font-medium text-[0.95rem] leading-snug">{item.question}</span>
        <span
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--muted)' }}
        >
          <IconChevron size={18} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FaqSection({ items }: { items: FAQItem[] }) {
  return (
    <section id="faq" className="py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            FAQ
          </p>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--fg)', letterSpacing: '-0.01em' }}>
            Najczęstsze pytania
          </h2>
        </div>

        <div>
          {items.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
