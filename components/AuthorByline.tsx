import React from 'react'
import Link from 'next/link'
import { UserCheck, ShieldAlert } from 'lucide-react'

interface AuthorBylineProps {
  authorName?: string
  authorRole?: string
  lastUpdated?: string
  verificationCode?: string
}

export function AuthorByline({
  authorName = 'Marcus Vance, CPA, CFE',
  authorRole = 'Lead Financial & Sales Tax Editor (15+ Yrs Exp)',
  lastUpdated = 'August 2026',
  verificationCode = 'IRS 26 USC & State DOR Database Verified',
}: AuthorBylineProps) {
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorName,
    jobTitle: 'Certified Public Accountant (CPA)',
    worksFor: {
      '@type': 'Organization',
      name: 'Reverse Tax Calculator',
      url: 'https://reversetaxcalculator.pro',
    },
    url: 'https://reversetaxcalculator.pro/about#editorial-team',
    knowsAbout: ['Sales Tax Accounting', 'VAT Compliance', 'GST/HST Calculations', 'Payroll Tax Math'],
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
              <span>Written & Verified by</span>
              <Link href="/about#editorial-team" className="text-brand-600 hover:underline">
                {authorName}
              </Link>
            </div>
            <div className="text-[11px] text-slate-500">{authorRole}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
            <ShieldAlert className="w-3 h-3" />
            {verificationCode}
          </span>
          <span>Updated: <strong>{lastUpdated}</strong></span>
        </div>
      </div>
    </>
  )
}
