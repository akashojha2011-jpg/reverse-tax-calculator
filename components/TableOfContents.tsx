'use client'

import React from 'react'

export interface TOCHeading {
  id: string
  text: string
  level?: number
}

interface TableOfContentsProps {
  headings: TOCHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings || headings.length === 0) return null

  return (
    <nav aria-label="Table of Contents" className="p-4 rounded-xl bg-slate-50 border border-slate-200 my-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
        On This Page
      </h3>
      <ul className="space-y-2 text-xs font-medium text-slate-600">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level && h.level > 2 ? `${(h.level - 2) * 12}px` : '0px' }}>
            <a
              href={`#${h.id}`}
              className="hover:text-brand-600 hover:underline transition-colors block py-0.5"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
