import React from 'react'
import Link from 'next/link'
import { UserCheck, ShieldCheck } from 'lucide-react'

interface AuthorBylineProps {
  authorName?: string
  authorRole?: string
  lastUpdated?: string
  verificationCode?: string
}

export function AuthorByline({
  authorName = 'Reverse Tax Calculator Editorial Team',
  authorRole = 'Financial Calculation & Tax Research Team',
  lastUpdated = 'August 2026',
  verificationCode = 'Standard Rate Data Checked',
}: AuthorBylineProps) {
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Reverse Tax Calculator Editorial Team',
    url: 'https://reversetaxcalculator.pro/about',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 my-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-700 font-bold shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>Prepared & Reviewed by</span>
              <Link href="/about" className="text-brand-600 hover:underline font-semibold">
                {authorName}
              </Link>
            </div>
            <div className="text-[11px] text-slate-500">{authorRole}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1 text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-semibold">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            {verificationCode}
          </span>
          <span>Last Rate Review: <strong>{lastUpdated}</strong></span>
        </div>
      </div>
    </>
  )
}
