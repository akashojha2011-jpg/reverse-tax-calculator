import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const fullList = [{ name: 'Home', url: '/' }, ...items]

  // BreadcrumbList JSON-LD Schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullList.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `https://reversetaxcalculator.pro${item.url}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 font-medium">
        {fullList.map((item, idx) => {
          const isLast = idx === fullList.length - 1
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              {isLast ? (
                <span className="text-slate-800 font-semibold truncate max-w-[200px] md:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-brand-600 transition-colors flex items-center gap-1"
                >
                  {idx === 0 && <Home className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
