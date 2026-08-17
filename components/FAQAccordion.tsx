'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQItem } from '@/data/regions'

interface FAQAccordionProps {
  items: FAQItem[]
  title?: string
}

export function FAQAccordion({ items, title = 'Frequently Asked Questions' }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0])

  const toggle = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx))
    } else {
      setOpenIndexes([...openIndexes, idx])
    }
  }

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="w-full my-12">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 tracking-tight">
        {title}
      </h2>

      <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
        {items.map((item, idx) => {
          const isOpen = openIndexes.includes(idx)
          return (
            <div key={idx} className="py-4">
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between text-left font-semibold text-slate-900 text-base md:text-lg hover:text-brand-600 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed pr-6">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
