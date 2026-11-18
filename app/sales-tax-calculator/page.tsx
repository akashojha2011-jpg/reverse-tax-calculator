import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ForwardSalesTaxTool } from '@/components/ForwardSalesTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  Percent,
  FileSpreadsheet,
  Layers,
  BookOpen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Calculator (2026) — Calculate Tax & Total Price',
  description:
    'Free online sales tax calculator. Calculate the exact sales tax amount and final price from any pre-tax subtotal. Supports state and local tax rates with spreadsheet formulas and state rate reference.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/sales-tax-calculator',
    title: 'Sales Tax Calculator (2026) — Calculate Tax & Total Price',
    description:
      'Free online sales tax calculator. Calculate the exact sales tax amount and final price from any pre-tax subtotal. Supports state and local tax rates with full formula breakdown.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How do you calculate sales tax on a purchase?',
    answer:
      'To calculate sales tax, multiply the pre-tax price (subtotal) by the sales tax rate expressed as a decimal (e.g., 8.25% becomes 0.0825). The formula is: Sales Tax = Subtotal × (Rate ÷ 100). Add the sales tax to your original subtotal to determine the total price due at checkout.',
  },
  {
    question: 'What is the difference between a forward and reverse sales tax calculator?',
    answer:
      'A forward sales tax calculator starts with the pre-tax price and adds sales tax to find the final total amount. A reverse sales tax calculator does the opposite: it starts with the final tax-inclusive receipt total and removes sales tax to determine the original pre-tax price and the tax paid.',
  },
  {
    question: 'How do I know my local sales tax rate?',
    answer:
      'In the United States, sales tax rates are composed of state, county, municipal, and special transit district taxes. You can look up your exact combined rate using our US Sales Tax by ZIP Code Calculator or select your state from our rate directory.',
  },
  {
    question: 'Do all US states have a sales tax?',
    answer:
      'No. Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon (commonly known as the NOMAD states). However, local municipalities in Alaska may levy local sales taxes up to 7.5%.',
  },
  {
    question: 'How do you calculate sales tax in Excel or Google Sheets?',
    answer:
      'If your subtotal is in cell A2 and your sales tax rate is in cell B2 (as a percentage, e.g., 8.25%), enter =A2*(1+B2) to get the final total including tax. To calculate just the tax dollar amount, use =A2*B2.',
  },
  {
    question: 'Are shipping charges subject to sales tax in the United States?',
    answer:
      'Taxability of freight and shipping varies by state. In states like California, delivery charges by common carrier are generally non-taxable if separately stated on the invoice. In states like New York, Texas, and Washington, shipping and handling charges are generally taxable if the underlying merchandise is taxable.',
  },
]

const POPULAR_RATES_TABLE = [
  { amount: 10, rate6: 0.60, total6: 10.60, rate7: 0.70, total7: 10.70, rate825: 0.83, total825: 10.83, rate95: 0.95, total95: 10.95 },
  { amount: 25, rate6: 1.50, total6: 26.50, rate7: 1.75, total7: 26.75, rate825: 2.06, total825: 27.06, rate95: 2.38, total95: 27.38 },
  { amount: 50, rate6: 3.00, total6: 53.00, rate7: 3.50, total7: 53.50, rate825: 4.13, total825: 54.13, rate95: 4.75, total95: 54.75 },
  { amount: 100, rate6: 6.00, total6: 106.00, rate7: 7.00, total7: 107.00, rate825: 8.25, total825: 108.25, rate95: 9.50, total95: 109.50 },
  { amount: 250, rate6: 15.00, total6: 265.00, rate7: 17.50, total7: 267.50, rate825: 20.63, total825: 270.63, rate95: 23.75, total95: 273.75 },
  { amount: 500, rate6: 30.00, total6: 530.00, rate7: 35.00, total7: 535.00, rate825: 41.25, total825: 541.25, rate95: 47.50, total95: 547.50 },
  { amount: 1000, rate6: 60.00, total6: 1060.00, rate7: 70.00, total7: 1070.00, rate825: 82.50, total825: 1082.50, rate95: 95.00, total95: 1095.00 },
]

export default function SalesTaxCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/sales-tax-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
    name: 'How to Calculate Sales Tax and Total Checkout Price',
    description: 'A 3-step guide to calculating sales tax on any taxable retail purchase or invoice subtotal.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Identify the Net Subtotal',
        text: 'Determine the base price of taxable goods before any taxes are added. Ensure all discounts and promotions have already been subtracted.',
      },
      {
        '@type': 'HowToStep',
        name: 'Multiply by the Decimal Tax Rate',
        text: 'Convert your combined sales tax percentage to a decimal by dividing by 100 (e.g., 8.25% ÷ 100 = 0.0825). Multiply the net subtotal by this decimal to find the sales tax due.',
      },
      {
        '@type': 'HowToStep',
        name: 'Sum the Subtotal and Sales Tax',
        text: 'Add the calculated sales tax to your original net subtotal to arrive at the final total payable at checkout.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'how-to-calculate', label: 'How Forward Sales Tax Works' },
    { id: 'sales-tax-formula', label: 'Mathematical Formula & Derivation' },
    { id: 'quick-reference-table', label: 'Quick Reference Calculation Table' },
    { id: 'excel-formulas', label: 'Excel & Google Sheets Formulas' },
    { id: 'nomad-states', label: 'States with 0% Statewide Sales Tax (NOMAD)' },
    { id: 'forward-vs-reverse', label: 'Forward vs. Reverse Tax Calculations' },
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
          { name: 'Sales Tax Calculator', url: '/sales-tax-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              Standard Sales Tax Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter your purchase price and applicable sales tax percentage to instantly calculate the sales tax due and total price due at checkout.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Updated with official state statutory rates • Tax Foundation 2026 benchmarks</span>
          </div>
        </header>

        {/* Mobile-Only Top Calculator */}
        <div className="block lg:hidden mb-8">
          <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: In-Depth Editorial Content */}
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="Sales Tax Guide Contents" />

            <section id="how-to-calculate" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How Forward Sales Tax Works
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Sales tax is an <em>ad valorem</em> consumption tax imposed by state and municipal governments on the retail sale of tangible personal property and designated services. In the United States, retail prices are advertised <strong>tax-exclusive</strong>, meaning the sales tax is computed and added to the purchase amount at the point of sale.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The total rate you pay is generally an aggregate of multiple overlapping jurisdictional layers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 text-xs">1. State Tax</div>
                  <div className="text-xs text-slate-600 mt-1">Levied by the state government (typically 2.9% to 7.25%).</div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 text-xs">2. County Tax</div>
                  <div className="text-xs text-slate-600 mt-1">Imposed by county commissioners for local services (0.25% to 3.0%).</div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 text-xs">3. City & District</div>
                  <div className="text-xs text-slate-600 mt-1">Municipal and transit district levies (0.1% to 2.5%).</div>
                </div>
              </div>
            </section>

            <section id="sales-tax-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Mathematical Formula & Derivation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Forward sales tax calculation takes the pre-tax base price and scales it by the statutory tax percentage:
              </p>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 tabular-nums space-y-3 border border-slate-200/90 shadow-2xs">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
                  Standard Mathematical Formulation
                </div>
                <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1.5">
                  <div>Sales Tax Due = Pre-Tax Subtotal × (Tax Rate ÷ 100)</div>
                  <div>Final Checkout Total = Pre-Tax Subtotal × (1 + [Tax Rate ÷ 100])</div>
                </div>
                <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <strong>Example:</strong> For a $100 purchase at an 8.25% combined tax rate:
                  <br />
                  Tax Due = $100.00 × 0.0825 = $8.25
                  <br />
                  Total Price = $100.00 + $8.25 = $108.25
                </div>
              </div>
            </section>

            <section id="quick-reference-table" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Quick Reference Calculation Table
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The table below illustrates the exact sales tax due and resulting total cost for common transaction amounts across popular combined tax rates (6.0%, 7.0%, 8.25%, and 9.50%):
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Subtotal</th>
                      <th className="p-3">6.00% Tax (Total)</th>
                      <th className="p-3">7.00% Tax (Total)</th>
                      <th className="p-3">8.25% Tax (Total)</th>
                      <th className="p-3">9.50% Tax (Total)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {POPULAR_RATES_TABLE.map((row) => (
                      <tr key={row.amount} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">${row.amount.toFixed(2)}</td>
                        <td className="p-3 text-slate-700">${row.rate6.toFixed(2)} <span className="text-slate-400 font-normal">(${row.total6.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.rate7.toFixed(2)} <span className="text-slate-400 font-normal">(${row.total7.toFixed(2)})</span></td>
                        <td className="p-3 text-blue-700 font-medium">${row.rate825.toFixed(2)} <span className="text-slate-500 font-normal">(${row.total825.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.rate95.toFixed(2)} <span className="text-slate-400 font-normal">(${row.total95.toFixed(2)})</span></td>
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
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                If you are building quotes, invoices, or budget spreadsheets in Microsoft Excel or Google Sheets, use these standardized formulas:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-xs font-bold text-slate-800">Calculate Sales Tax Dollar Amount:</div>
                  <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                    =A2 * B2
                  </pre>
                  <p className="text-xs text-slate-500 m-0">
                    Assuming cell A2 contains the pre-tax price ($100) and cell B2 contains the percentage (8.25% or 0.0825).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-xs font-bold text-slate-800">Calculate Total Price Including Tax in One Step:</div>
                  <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                    =A2 * (1 + B2)
                  </pre>
                  <p className="text-xs text-slate-500 m-0">
                    Calculates the full out-of-pocket invoice total directly without creating an intermediate column.
                  </p>
                </div>
              </div>
            </section>

            <section id="nomad-states" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                States with 0% Statewide Sales Tax (The NOMAD States)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Five US states do not levy a general statewide sales tax, frequently remembered by the acronym <strong>NOMAD</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>New Hampshire:</strong> 0.00% statewide sales tax.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Oregon:</strong> 0.00% statewide sales tax.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Montana:</strong> 0.00% statewide sales tax (resort communities may levy local taxes).
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Alaska:</strong> 0.00% state rate, but local boroughs may levy municipal sales tax up to 7.5%.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2">
                  <strong>Delaware:</strong> 0.00% sales tax (levies gross receipts tax on businesses instead).
                </div>
              </div>
            </section>

            <section id="forward-vs-reverse" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Forward vs. Reverse Tax Calculations
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A common mistake in bookkeeping is trying to remove sales tax from a receipt by multiplying the final total by the tax percentage and subtracting it. This is mathematically incorrect because the tax was calculated on the smaller base subtotal, not the inflated total.
              </p>
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-900 space-y-2">
                <div className="font-bold">Need to work backwards from a receipt?</div>
                <p className="m-0 leading-relaxed">
                  Use our reverse tax formula: <code>Pre-Tax = Total ÷ (1 + Tax Rate)</code>. Or open our dedicated reverse sales tax engine.
                </p>
                <div className="pt-1">
                  <Link
                    href="/reverse-sales-tax-calculator"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 underline"
                  >
                    <span>Launch Reverse Sales Tax Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Frequently Asked Questions about Sales Tax Calculations" />
            </section>
          </article>

          {/* RIGHT COLUMN: Sticky Sidebar on Desktop */}
          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Need to Extract Tax Backwards?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed m-0">
                  If your receipt already includes sales tax and you need the pre-tax price for accounting or expense reporting:
                </p>
                <Link
                  href="/reverse-sales-tax-calculator"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs"
                >
                  <span>Open Reverse Tax Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tax Engines</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/us-sales-tax-by-zip-code" className="block hover:underline">
                    • US Sales Tax by ZIP Code Lookup
                  </Link>
                  <Link href="/discount-and-tax-calculator" className="block hover:underline">
                    • Discount & Sales Tax Calculator
                  </Link>
                  <Link href="/bulk-sales-tax-calculator" className="block hover:underline">
                    • Bulk Multi-Item Invoice Tool
                  </Link>
                  <Link href="/sales-tax-breakdown-calculator" className="block hover:underline">
                    • State vs City Tax Breakdown
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
