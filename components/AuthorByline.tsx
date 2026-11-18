import React from 'react'
import Link from 'next/link'

interface AuthorBylineProps {
  authorName?: string
  authorRole?: string
  lastUpdated?: string
  verificationCode?: string
}

export function AuthorByline({
  authorName = 'Reverse Tax Calculator Editorial Team',
  authorRole = 'Financial Research',
  lastUpdated = '2026',
}: AuthorBylineProps) {
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Reverse Tax Calculator Editorial Team',
    url: 'https://www.reversetaxcalculator.pro/about',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 py-3 border-t border-b border-slate-100 text-xs text-slate-500 my-6">
        <div>
          Published by{' '}
          <Link href="/about" className="text-slate-800 hover:text-blue-600 font-medium">
            {authorName}
          </Link>
        </div>

        <div>
          Last updated: <span className="font-medium text-slate-700">{lastUpdated}</span>
        </div>
      </div>
    </>
  )
}
