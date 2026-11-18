import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ForwardSalesTaxTool } from '@/components/ForwardSalesTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Calculator, ShieldCheck, ArrowRight, Calendar, FileSpreadsheet, Building2, Percent } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax-Exclusive Price Calculator — Add Tax to Net Costs (2026)',
  description:
    'Free tax-exclusive price calculator. Convert net quotes and wholesale costs into final customer totals with sales tax added. Includes contractor quoting guides and Excel formulas.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tax-exclusive-price-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/tax-exclusive-price-calculator',
    title: 'Tax-Exclusive Price Calculator — Add Tax to Net Costs (2026)',
    description:
      'Free tax-exclusive price calculator. Convert net quotes and wholesale costs into final customer totals with sales tax added.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'What does tax-exclusive mean in commerce?',
    answer:
      'A tax-exclusive price (net price) is the base cost of a product or service before any statutory taxes are added. In the United States, almost all B2B quotes, wholesale price lists, and retail shelf tags are tax-exclusive, with sales tax calculated and added at checkout or final invoicing.',
  },
  {
    question: 'How do you calculate tax on a tax-exclusive price?',
    answer:
      'Multiply the tax-exclusive base price by your sales tax rate expressed as a decimal. For example, a $100 net item with 8.25% sales tax incurs $8.25 in tax ($100 × 0.0825), resulting in a $108.25 final invoice total.',
  },
  {
    question: 'Why do contractors and B2B suppliers quote tax-exclusive prices?',
    answer:
      'B2B suppliers quote tax-exclusive prices because many clients possess valid resale certificates or direct-pay permits that legally exempt them from paying sales tax. Additionally, if work spans multiple job sites, sales tax rates vary based on the physical delivery location.',
  },
  {
    question: 'What is the Excel formula to calculate gross price from a tax-exclusive quote?',
    answer:
      'If your tax-exclusive cost is in cell A2 and the sales tax percentage is in cell B2 (e.g., 8.25%), enter =A2*(1+B2). This computes the full final invoice amount directly.',
  },
  {
    question: 'What is the difference between tax-exclusive and tax-inclusive pricing?',
    answer:
      'Tax-exclusive pricing states the net price and adds tax at the end (Net + Tax = Total). Tax-inclusive pricing displays the final out-of-pocket price with tax already bundled into the sticker amount (Total = Gross).',
  },
]

const EXCLUSIVE_LOOKUP_TABLE = [
  { net: 50, tax6: 3.00, total6: 53.00, tax7: 3.50, total7: 53.50, tax825: 4.13, total825: 54.13, tax95: 4.75, total95: 54.75 },
  { net: 100, tax6: 6.00, total6: 106.00, tax7: 7.00, total7: 107.00, tax825: 8.25, total825: 108.25, tax95: 9.50, total95: 109.50 },
  { net: 250, tax6: 15.00, total6: 265.00, tax7: 17.50, total7: 267.50, tax825: 20.63, total825: 270.63, tax95: 23.75, total95: 273.75 },
  { net: 500, tax6: 30.00, total6: 530.00, tax7: 35.00, total7: 535.00, tax825: 41.25, total825: 541.25, tax95: 47.50, total95: 547.50 },
  { net: 1000, tax6: 60.00, total6: 1060.00, tax7: 70.00, total7: 1070.00, tax825: 82.50, total825: 1082.50, tax95: 95.00, total95: 1095.00 },
  { net: 2500, tax6: 150.00, total6: 2650.00, tax7: 175.00, total7: 2675.00, tax825: 206.25, total825: 2706.25, tax95: 237.50, total95: 2737.50 },
]

export default function TaxExclusivePriceCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tax-Exclusive Price Calculator',
    url: 'https://www.reversetaxcalculator.pro/tax-exclusive-price-calculator',
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
    name: 'How to Calculate Total Invoice from a Tax-Exclusive Price',
    description: 'Calculate the total customer price when quoting or invoicing at tax-exclusive net amounts.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Determine Net Price',
        text: 'Calculate your base cost, labor, materials, and profit margin to find the net tax-exclusive amount.',
      },
      {
        '@type': 'HowToStep',
        name: 'Ascertain Destination Tax Rate',
        text: 'Identify the sales tax rate for the jurisdiction where delivery or transfer of possession occurs.',
      },
      {
        '@type': 'HowToStep',
        name: 'Add Tax to Compute Gross Total',
        text: 'Multiply the net price by (1 + Tax Rate ÷ 100) to find the final amount billed to the client.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'exclusive-definition', label: 'What Is Tax-Exclusive Pricing?' },
    { id: 'calculation-formula', label: 'Mathematical Formula & Derivation' },
    { id: 'exclusive-lookup-table', label: 'Net-to-Gross Reference Table' },
    { id: 'excel-formulas', label: 'Excel & Google Sheets Formulas' },
    { id: 'contractor-quoting', label: 'B2B & Contractor Invoicing Rules' },
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
          { name: 'Tax-Exclusive Price Calculator', url: '/tax-exclusive-price-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              Net-to-Gross Calculation
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tax-Exclusive Price Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Calculate sales tax due and find the final register or invoice total from any tax-exclusive sticker price or contractor quote.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Standard commercial B2B invoicing and contractor quote modeling</span>
          </div>
        </header>

        {/* Mobile Top Calculator */}
        <div className="block lg:hidden mb-8">
          <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="Guide Contents" />

            <section id="exclusive-definition" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                What Is Tax-Exclusive Pricing?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Tax-exclusive pricing means that sales tax is not included in the displayed or quoted price. It is the dominant pricing structure across North America for commercial wholesale, retail commerce, and trade estimates.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Because local tax rates vary by city, county, and transit district across thousands of jurisdictions, businesses quote tax-exclusive prices so that the tax applied accurately reflects the customer&apos;s physical delivery address.
              </p>
            </section>

            <section id="calculation-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Mathematical Formula & Derivation
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 tabular-nums space-y-3 border border-slate-200/90 shadow-2xs">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
                  Net to Gross Mathematical Equations
                </div>
                <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1.5">
                  <div>Sales Tax Added = Tax-Exclusive Base Price × (Tax Rate ÷ 100)</div>
                  <div>Final Invoice Total = Tax-Exclusive Base Price × (1 + [Tax Rate ÷ 100])</div>
                </div>
                <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <strong>Example:</strong> For a contractor net estimate of $2,500.00 at an 8.25% sales tax rate:
                  <br />
                  Sales Tax = $2,500.00 × 0.0825 = $206.25
                  <br />
                  Total Billed = $2,500.00 + $206.25 = <strong>$2,706.25</strong>
                </div>
              </div>
            </section>

            <section id="exclusive-lookup-table" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Net-to-Gross Reference Table
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Reference standard tax-exclusive quote amounts and their total invoice values across common US sales tax rates (6.0%, 7.0%, 8.25%, and 9.5%):
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Net Quote</th>
                      <th className="p-3">6.00% (+ Tax)</th>
                      <th className="p-3">7.00% (+ Tax)</th>
                      <th className="p-3">8.25% (+ Tax)</th>
                      <th className="p-3">9.50% (+ Tax)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {EXCLUSIVE_LOOKUP_TABLE.map((row) => (
                      <tr key={row.net} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">${row.net.toFixed(2)}</td>
                        <td className="p-3 text-slate-700">${row.total6.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.tax6.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.total7.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.tax7.toFixed(2)})</span></td>
                        <td className="p-3 text-blue-700 font-medium">${row.total825.toFixed(2)} <span className="text-slate-500 font-normal">(+${row.tax825.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.total95.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.tax95.toFixed(2)})</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="excel-formulas" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Excel & Google Sheets Formulas
              </h2>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-slate-800">Calculate Gross Billable Total Directly:</div>
                <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                  =A2 * (1 + B2)
                </pre>
                <p className="text-xs text-slate-500 m-0">
                  Where cell <code>A2</code> contains the net tax-exclusive quote ($2,500) and cell <code>B2</code> contains the tax percentage (8.25%).
                </p>
              </div>
            </section>

            <section id="contractor-quoting" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                B2B & Contractor Invoicing Rules
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When preparing quotes or bids for commercial clients, keep these critical tax guidelines in mind:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Resale Certificates:</strong> If your client is reselling the merchandise or incorporating it into manufactured goods, collect a valid resale exemption certificate to justify omitting tax.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Separately Stated Labor:</strong> In many states (such as Texas and Florida), pure installation or fabrication labor may be exempt if separated line-by-line from materials on the invoice.
                </div>
              </div>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Frequently Asked Questions" />
            </section>
          </article>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tools</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/tax-inclusive-price-calculator" className="block hover:underline">
                    • Tax-Inclusive Price Calculator
                  </Link>
                  <Link href="/reverse-sales-tax-calculator" className="block hover:underline">
                    • Reverse Sales Tax Calculator
                  </Link>
                  <Link href="/remove-sales-tax-calculator" className="block hover:underline">
                    • Remove Sales Tax from Total
                  </Link>
                  <Link href="/bulk-sales-tax-calculator" className="block hover:underline">
                    • Bulk Multi-Item Invoice Tool
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
