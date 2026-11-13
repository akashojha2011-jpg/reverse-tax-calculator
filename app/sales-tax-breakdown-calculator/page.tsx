import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TaxBreakdownTool } from '@/components/TaxBreakdownTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Breakdown Calculator — State, County, City & District',
  description:
    'Free sales tax breakdown calculator. Visualize how much of your sales tax goes to state government, county authorities, city municipalities, and transit districts.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/sales-tax-breakdown-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/sales-tax-breakdown-calculator',
    title: 'Sales Tax Breakdown Calculator — State, County, City & District',
    description:
      'Free sales tax breakdown calculator. Visualize how much of your sales tax goes to state government, county authorities, city municipalities, and transit districts.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How is sales tax revenue distributed across government levels?',
    answer:
      'When you pay sales tax, the revenue is shared among several governmental tiers: the state general fund, county operations, municipal city programs, and special purpose districts (such as public transit, schools, or emergency response). Retailers collect the combined percentage and remit it to the state Department of Revenue, which distributes local portions back to counties and municipalities.',
  },
  {
    question: 'What is a Special Purpose District (SPD) tax?',
    answer:
      'Special purpose districts are local taxing entities established to fund specific regional public projects, such as regional transit networks (like MTA in New York or BART in the Bay Area), stadium authorities, flood control, or hospital districts. They usually add between 0.1% and 1.5% to the retail sales tax.',
  },
  {
    question: 'Can I reverse calculate individual tax components from a receipt?',
    answer:
      'Yes! By dividing the gross receipt total by 1 plus the combined decimal rate, you find the base pre-tax subtotal. You then multiply that base subtotal by each individual component percentage (state, county, city, district) to see exactly how many dollars were paid to each authority.',
  },
]

export default function SalesTaxBreakdownPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sales Tax Breakdown Calculator',
    url: 'https://www.reversetaxcalculator.pro/sales-tax-breakdown-calculator',
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
          { name: 'Sales Tax Breakdown Calculator', url: '/sales-tax-breakdown-calculator' },
        ]}
      />

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Multi-Jurisdiction Distribution
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sales Tax Breakdown Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            See exactly how your sales tax is divided between state government, county authorities, city municipalities, and transit districts.
          </p>
        </header>

        <TaxBreakdownTool />

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Want to look up rates by 5-digit ZIP code?</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Use our US Sales Tax by ZIP Code tool to automatically find state, county, city, and transit district rates for thousands of US locations.
            </p>
          </div>
          <Link
            href="/us-sales-tax-by-zip-code"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors shadow-2xs"
          >
            <span>Lookup ZIP Code</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <FAQAccordion items={FAQS} title="Frequently Asked Questions about Sales Tax Breakdowns" />
      </div>
    </>
  )
}
