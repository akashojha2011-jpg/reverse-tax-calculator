import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CompareTaxTool } from '@/components/CompareTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Scale, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compare Sales Tax Rates by State & City (2026)',
  description:
    'Compare sales tax rates and purchase totals across different US states and cities side-by-side. Calculate how much sales tax you save by shopping in different locations.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/compare-sales-tax',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/compare-sales-tax',
    title: 'Compare Sales Tax Rates by State & City (2026)',
    description:
      'Compare sales tax rates and purchase totals across different US states and cities side-by-side. Calculate how much sales tax you save by shopping in different locations.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'Why do neighboring states have vastly different sales tax rates?',
    answer:
      'State tax structures reflect different state fiscal policies. States without personal income taxes (such as Washington, Tennessee, and Nevada) typically rely more heavily on higher sales taxes. Conversely, states with higher income or property taxes (such as Oregon, Montana, and Delaware) levy 0% general sales tax.',
  },
  {
    question: 'Can I avoid sales tax by purchasing across state lines?',
    answer:
      'Legally, if you buy goods in a lower-tax state or online without paying your home state’s sales tax, your home state requires you to remit a complementary "Use Tax" on your annual state income tax return. For vehicles, boats, and major titled equipment, sales tax is always collected in the state where the vehicle is registered, not where purchased.',
  },
  {
    question: 'Which US states have the highest and lowest combined sales taxes?',
    answer:
      'The highest combined state and local sales tax rates are found in Louisiana (avg 9.55%), Tennessee (avg 9.55%), Arkansas (avg 9.45%), Washington (avg 9.38%), and Alabama (avg 9.29%). The lowest rates are 0% in Alaska (avg local 1.76%), Delaware (0%), Montana (0%), New Hampshire (0%), and Oregon (0%).',
  },
]

export default function CompareSalesTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Compare Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/compare-sales-tax',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
  }

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Compare Sales Tax', url: '/compare-sales-tax' },
        ]}
      />

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Cross-Jurisdiction Comparison
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare Sales Tax Rates by Location
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Compare sales tax rates and out-of-pocket costs on any purchase amount across 2 or 3 states or cities side-by-side.
          </p>
        </header>

        <CompareTaxTool />

        <FAQAccordion items={FAQS} title="Frequently Asked Questions on Cross-State Sales Tax" />
      </div>
    </>
  )
}
