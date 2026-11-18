import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CompareTaxTool } from '@/components/CompareTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Scale, ArrowRight, ShieldCheck, Calendar, MapPin, AlertCircle, FileSpreadsheet } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compare Sales Tax Rates by State & City (2026)',
  description:
    'Compare sales tax rates and purchase totals across different US states and cities side-by-side. Calculate how much sales tax you save by shopping in different locations and learn use tax rules.',
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
      'State tax structures reflect different state fiscal policies. States without personal income taxes (such as Washington, Tennessee, and Nevada) typically rely more heavily on higher sales taxes to fund public services. Conversely, states with higher income or property taxes (such as Oregon, Montana, and Delaware) levy 0% general sales tax.',
  },
  {
    question: 'Can I avoid sales tax by purchasing across state lines?',
    answer:
      'Legally, if you buy goods in a lower-tax state or online without paying your home state’s sales tax and bring them back, your home state requires you to remit a complementary "Use Tax" on your annual state income tax return. For vehicles, boats, and major titled equipment, sales tax is always collected in the state where the vehicle is titled and registered, not where purchased.',
  },
  {
    question: 'Which US states have the highest and lowest combined sales taxes?',
    answer:
      'The highest average combined state and local sales tax rates in 2026 are Louisiana (~9.55%), Tennessee (~9.55%), Arkansas (~9.45%), Washington (~9.38%), and Alabama (~9.29%). The lowest rates are 0% in Delaware, Montana, New Hampshire, and Oregon, followed by Alaska (~1.76% average local rate).',
  },
  {
    question: 'How does Wayfair v. South Dakota affect cross-state online shopping?',
    answer:
      'Since the 2018 Supreme Court Wayfair decision, out-of-state online retailers with economic nexus (usually $100,000+ in sales or 200+ transactions) must collect sales tax based on the customer’s destination delivery address, regardless of where the warehouse or company is located.',
  },
  {
    question: 'Are there sales tax holidays where rates are temporarily 0%?',
    answer:
      'Yes! Over 15 states host annual sales tax holidays, typically in July or August for back-to-school items (clothing, school supplies, computers) or in spring for severe weather preparedness gear.',
  },
]

const HIGHEST_LOWEST_STATES = [
  { state: 'Louisiana', rank: 'Highest #1', stateRate: '4.45%', avgLocal: '5.10%', avgCombined: '9.55%' },
  { state: 'Tennessee', rank: 'Highest #2', stateRate: '7.00%', avgLocal: '2.55%', avgCombined: '9.55%' },
  { state: 'Arkansas', rank: 'Highest #3', stateRate: '6.50%', avgLocal: '2.95%', avgCombined: '9.45%' },
  { state: 'Washington', rank: 'Highest #4', stateRate: '6.50%', avgLocal: '2.88%', avgCombined: '9.38%' },
  { state: 'Alabama', rank: 'Highest #5', stateRate: '4.00%', avgLocal: '5.29%', avgCombined: '9.29%' },
  { state: 'Oregon', rank: 'Lowest (NOMAD)', stateRate: '0.00%', avgLocal: '0.00%', avgCombined: '0.00%' },
  { state: 'New Hampshire', rank: 'Lowest (NOMAD)', stateRate: '0.00%', avgLocal: '0.00%', avgCombined: '0.00%' },
  { state: 'Montana', rank: 'Lowest (NOMAD)', stateRate: '0.00%', avgLocal: '0.00%', avgCombined: '0.00%' },
  { state: 'Delaware', rank: 'Lowest (NOMAD)', stateRate: '0.00%', avgLocal: '0.00%', avgCombined: '0.00%' },
  { state: 'Alaska', rank: 'Lowest Local', stateRate: '0.00%', avgLocal: '1.76%', avgCombined: '1.76%' },
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

  const schemaHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compare Sales Tax Across Multiple Locations',
    description: 'Compare effective sales tax rates and out-of-pocket costs on large purchases across states and cities.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter Purchase Amount',
        text: 'Input the pre-tax price of the product or equipment you plan to purchase.',
      },
      {
        '@type': 'HowToStep',
        name: 'Select Comparison Locations',
        text: 'Choose two or three states, cities, or ZIP codes to compare.',
      },
      {
        '@type': 'HowToStep',
        name: 'Compare Net Savings & Use Tax Implications',
        text: 'Examine the total cost difference and verify whether use tax obligations apply upon returning home.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'compare-tool', label: 'Interactive Location Comparison Tool' },
    { id: 'highest-lowest-table', label: 'Highest vs. Lowest Combined Tax Rates (2026)' },
    { id: 'use-tax-rules', label: 'Cross-Border Shopping & Use Tax Rules' },
    { id: 'vehicles-big-ticket', label: 'Vehicles & Big-Ticket Titled Purchases' },
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
          { name: 'Compare Sales Tax', url: '/compare-sales-tax' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Cross-Jurisdiction Comparison
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare Sales Tax Rates by Location
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Compare sales tax rates and out-of-pocket costs on any purchase amount across 2 or 3 states or cities side-by-side.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Tax Foundation combined state-local sales tax benchmarks</span>
          </div>
        </header>

        <section id="compare-tool">
          <CompareTaxTool />
        </section>

        <div className="pt-6 space-y-10">
          <TableOfContents items={tocItems} title="Comparison Guide Contents" />

          <section id="highest-lowest-table" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Highest vs. Lowest Combined Tax Rates (2026)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sales tax rates vary widely across the United States. Below is a comparison of states with the highest and lowest average combined state and local sales tax rates according to the Tax Foundation:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">State</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">State Rate</th>
                    <th className="p-3">Avg Local</th>
                    <th className="p-3">Avg Combined Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {HIGHEST_LOWEST_STATES.map((row) => (
                    <tr key={row.state} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{row.state}</td>
                      <td className="p-3 text-slate-600">{row.rank}</td>
                      <td className="p-3 text-slate-700">{row.stateRate}</td>
                      <td className="p-3 text-slate-700">{row.avgLocal}</td>
                      <td className="p-3 text-blue-700 font-bold">{row.avgCombined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="use-tax-rules" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Cross-Border Shopping & Use Tax Rules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A common misconception among consumers is that driving into a 0% sales tax state (like Oregon or Delaware) allows one to permanently bypass home state sales tax. State tax departments enforce complementary <strong>Use Tax</strong> statutes:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="font-bold text-slate-900">How Use Tax Operates:</div>
              <p className="m-0 leading-relaxed">
                If you purchase taxable tangible personal property outside your home state and bring it home for storage, use, or consumption without having paid sales tax equal to or greater than your home jurisdiction&apos;s rate, you are legally required to report and pay the difference as Use Tax on your state personal income tax return.
              </p>
            </div>
          </section>

          <section id="vehicles-big-ticket" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Vehicles & Big-Ticket Titled Purchases
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              For motor vehicles, boats, RVs, and airplanes, you cannot avoid sales tax by purchasing out of state. Departments of Motor Vehicles (DMVs) require proof of sales tax payment (or collect sales/use tax directly) when you title and register the vehicle at your residential address.
            </p>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <FAQAccordion items={FAQS} title="Frequently Asked Questions on Cross-State Sales Tax" />
          </section>
        </div>
      </div>
    </>
  )
}
