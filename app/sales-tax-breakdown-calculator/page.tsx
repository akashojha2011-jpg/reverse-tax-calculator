import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TaxBreakdownTool } from '@/components/TaxBreakdownTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Layers, ArrowRight, ShieldCheck, Calendar, MapPin, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Breakdown Calculator — State, County, City & District (2026)',
  description:
    'Free sales tax breakdown calculator. Visualize how much of your sales tax goes to state government, county authorities, city municipalities, and transit districts.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/sales-tax-breakdown-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/sales-tax-breakdown-calculator',
    title: 'Sales Tax Breakdown Calculator — State, County, City & District (2026)',
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
  {
    question: 'Why do two neighboring towns have different sales tax rates?',
    answer:
      'Even within the same state and county, individual municipalities may pass local sales tax referendums to fund city services, parks, or public safety. Additionally, overlapping transit or hospital districts may cross city boundaries.',
  },
  {
    question: 'How can I look up the exact sales tax breakdown for my ZIP code?',
    answer:
      'Use our US Sales Tax by ZIP Code tool to search over 40,000 US ZIP codes and view the exact state, county, city, and district percentage breakdowns.',
  },
]

const METRO_BREAKDOWN_TABLE = [
  { metro: 'Los Angeles, CA', combined: 9.50, state: 6.00, county: 0.25, cityRate: 1.00, district: 2.25 },
  { metro: 'Chicago, IL', combined: 10.25, state: 6.25, county: 1.75, cityRate: 1.25, district: 1.00 },
  { metro: 'Houston, TX', combined: 8.25, state: 6.25, county: 0.00, cityRate: 1.00, district: 1.00 },
  { metro: 'New York City, NY', combined: 8.875, state: 4.00, county: 0.00, cityRate: 4.50, district: 0.375 },
  { metro: 'Seattle, WA', combined: 10.35, state: 6.50, county: 0.00, cityRate: 1.10, district: 2.75 },
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

  const schemaHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Break Down Sales Tax into Jurisdictional Portions',
    description: 'Learn how to separate a combined sales tax rate into state, county, city, and transit district amounts.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Determine Base Subtotal',
        text: 'Identify the pre-tax purchase price or extract it by dividing the gross total by (1 + Combined Rate).',
      },
      {
        '@type': 'HowToStep',
        name: 'Obtain Component Percentages',
        text: 'Look up the specific rates levied by your state, county, municipality, and special districts.',
      },
      {
        '@type': 'HowToStep',
        name: 'Multiply Base by Each Component Rate',
        text: 'Multiply the base price by each individual percentage to calculate exact dollar allocations.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'breakdown-tool', label: 'Interactive Tax Breakdown Tool' },
    { id: 'tax-jurisdiction-layers', label: 'The 4 Layers of US Sales Tax' },
    { id: 'metro-breakdown-table', label: 'Major US Metro Tax Breakdown Table' },
    { id: 'reverse-breakdown', label: 'Reverse-Calculating Portions from a Receipt' },
    { id: 'faqs', label: 'Frequently Asked Questions' },
  ]

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Sales Tax Breakdown Calculator', url: '/sales-tax-breakdown-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Multi-Jurisdiction Distribution
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sales Tax Breakdown Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            See exactly how your sales tax is divided between state government, county authorities, city municipalities, and transit districts.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>State Department of Revenue and municipal revenue sharing schedules</span>
          </div>
        </header>

        <section id="breakdown-tool">
          <TaxBreakdownTool />
        </section>

        <div className="pt-6 space-y-10">
          <TableOfContents items={tocItems} title="Breakdown Guide Contents" />

          <section id="tax-jurisdiction-layers" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              The 4 Layers of US Sales Tax
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When a cash register charges 8.25% or 9.5% sales tax, that single number is actually an aggregation of several independent taxing authorities:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="text-xs font-bold text-slate-900">1. State Rate</div>
                <p className="text-xs text-slate-600 m-0">The statewide foundation collected for general education and state programs.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="text-xs font-bold text-slate-900">2. County Rate</div>
                <p className="text-xs text-slate-600 m-0">Funds county health systems, courthouses, and county road maintenance.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="text-xs font-bold text-slate-900">3. City Rate</div>
                <p className="text-xs text-slate-600 m-0">Municipal taxes allocated to local police, fire, libraries, and city services.</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                <div className="text-xs font-bold text-slate-900">4. Special Districts</div>
                <p className="text-xs text-slate-600 m-0">Targeted levies for regional transit authorities (BART, MTA) or stadiums.</p>
              </div>
            </div>
          </section>

          <section id="metro-breakdown-table" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Major US Metro Tax Breakdown Table (2026)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Illustrating the jurisdictional division in key American metropolitan centers:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Metropolitan Area</th>
                    <th className="p-3">Combined Rate</th>
                    <th className="p-3">State</th>
                    <th className="p-3">County</th>
                    <th className="p-3">City</th>
                    <th className="p-3">District / Transit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {METRO_BREAKDOWN_TABLE.map((row) => (
                    <tr key={row.metro} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{row.metro}</td>
                      <td className="p-3 text-blue-700 font-bold">{row.combined.toFixed(3).replace(/\.?0+$/, '')}%</td>
                      <td className="p-3 text-slate-700">{row.state.toFixed(2)}%</td>
                      <td className="p-3 text-slate-700">{row.county.toFixed(2)}%</td>
                      <td className="p-3 text-slate-700">{row.cityRate.toFixed(2)}%</td>
                      <td className="p-3 text-slate-700">{row.district.toFixed(3).replace(/\.?0+$/, '')}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="reverse-breakdown" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Reverse-Calculating Portions from a Receipt
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To extract the exact dollars paid to each authority from a final receipt total:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 tabular-nums">
              <div>1. <strong>Find Base Subtotal:</strong> <code>Base = Receipt Total ÷ (1 + Combined Rate)</code></div>
              <div>2. <strong>State Share:</strong> <code>Base × State Rate</code></div>
              <div>3. <strong>County Share:</strong> <code>Base × County Rate</code></div>
              <div>4. <strong>City Share:</strong> <code>Base × City Rate</code></div>
              <div>5. <strong>District Share:</strong> <code>Base × District Rate</code></div>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <FAQAccordion items={FAQS} title="Frequently Asked Questions about Sales Tax Breakdowns" />
          </section>
        </div>
      </div>
    </>
  )
}
