import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ForwardSalesTaxTool } from '@/components/ForwardSalesTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { PlusCircle, ArrowRight, ShieldCheck, Calendar, FileSpreadsheet, Percent, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Add Sales Tax Calculator — Calculate Price Plus Tax (2026)',
  description:
    'Free calculator to add sales tax to any price. Calculate the sales tax added, final checkout total, and find step-by-step formulas and quick reference lookup tables.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/add-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/add-sales-tax-calculator',
    title: 'Add Sales Tax Calculator — Calculate Price Plus Tax (2026)',
    description:
      'Free calculator to add sales tax to any price. Enter your pre-tax amount and tax rate to see the tax added and total checkout price instantly.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How do you add sales tax to a price?',
    answer:
      'To add sales tax to a price, multiply the price by (1 + tax rate / 100). For example, to add 7% sales tax to $50: $50 × 1.07 = $53.50. The sales tax added is $3.50.',
  },
  {
    question: 'What is the formula to add sales tax?',
    answer:
      'Total Price = Pre-Tax Price × (1 + [Sales Tax Rate ÷ 100]). Tax Added = Total Price - Pre-Tax Price.',
  },
  {
    question: 'How do I add multiple local sales taxes together?',
    answer:
      'In jurisdictions with multiple overlapping taxes (such as a 4% state tax, a 2% county tax, and a 1.25% city tax), simply sum the percentages first (4% + 2% + 1.25% = 7.25%), and then calculate the tax based on the 7.25% combined rate.',
  },
  {
    question: 'What is the Excel formula to add sales tax?',
    answer:
      'If your pre-tax item price is in cell A2 and the tax percentage is in cell B2 (e.g., 7.5%), the formula is =A2*(1+B2). This computes the full price with tax included.',
  },
  {
    question: 'Why is sales tax added at the register instead of shown on price tags?',
    answer:
      'In the United States, retail price tags almost never include sales tax because rates vary drastically across more than 13,000 state, county, city, and transit taxing districts. Advertising prices without tax allows national brands to run uniform pricing campaigns nationwide.',
  },
]

const ADD_TAX_LOOKUP_TABLE = [
  { price: 15, tax6: 0.90, total6: 15.90, tax725: 1.09, total725: 16.09, tax825: 1.24, total825: 16.24, tax9: 1.35, total9: 16.35 },
  { price: 30, tax6: 1.80, total6: 31.80, tax725: 2.18, total725: 32.18, tax825: 2.48, total825: 32.48, tax9: 2.70, total9: 32.70 },
  { price: 60, tax6: 3.60, total6: 63.60, tax725: 4.35, total725: 64.35, tax825: 4.95, total825: 64.95, tax9: 5.40, total9: 65.40 },
  { price: 120, tax6: 7.20, total6: 127.20, tax725: 8.70, total725: 128.70, tax825: 9.90, total825: 129.90, tax9: 10.80, total9: 130.80 },
  { price: 250, tax6: 15.00, total6: 265.00, tax725: 18.13, total725: 268.13, tax825: 20.63, total825: 270.63, tax9: 22.50, total9: 272.50 },
  { price: 500, tax6: 30.00, total6: 530.00, tax725: 36.25, total725: 536.25, tax825: 41.25, total825: 541.25, tax9: 45.00, total9: 545.00 },
]

export default function AddSalesTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Add Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/add-sales-tax-calculator',
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
    name: 'How to Add Sales Tax to a Price',
    description: 'Calculate the total register cost by adding sales tax to any sticker or advertised price.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Obtain the Pre-Tax Item Cost',
        text: 'Take the advertised shelf price or net quote amount before taxes.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate the Tax Amount',
        text: 'Multiply the item price by your local sales tax rate as a decimal (e.g. 8.25% = 0.0825). Round to the nearest cent.',
      },
      {
        '@type': 'HowToStep',
        name: 'Add Tax to the Base Cost',
        text: 'Add the calculated tax amount to the base price to reach the grand total due at checkout.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'how-to-add-tax', label: 'How to Add Sales Tax to a Price' },
    { id: 'math-formula', label: 'Mathematical Formula & Example' },
    { id: 'price-plus-tax-table', label: 'Price Plus Tax Reference Table' },
    { id: 'excel-formulas', label: 'Spreadsheet Formulas (Excel / Sheets)' },
    { id: 'take-off-tax', label: 'Need to Deduct Sales Tax Instead?' },
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
          { name: 'Add Sales Tax Calculator', url: '/add-sales-tax-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
              Price Plus Tax Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Add Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Quickly calculate how much sales tax will be added to your purchase and what your total cost will be at the cash register.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Statutory point-of-sale tax calculation methodology</span>
          </div>
        </header>

        {/* Mobile Top Calculator */}
        <div className="block lg:hidden mb-8">
          <ForwardSalesTaxTool initialAmount={100} initialRate={7.5} />
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="Add Tax Guide Contents" />

            <section id="how-to-add-tax" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How to Add Sales Tax to a Price
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When shopping in the United States, shelf tags show the net price before statutory sales tax is applied. To anticipate the total out-of-pocket amount required at the register, you must add the combined state, county, and municipal sales taxes.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Adding sales tax is straightforward: determine your combined jurisdictional rate, multiply it by your subtotal, and add the result to your original figure.
              </p>
            </section>

            <section id="math-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Mathematical Formula & Example
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 tabular-nums space-y-3 border border-slate-200/90 shadow-2xs">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
                  Calculation Formula
                </div>
                <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1">
                  <div>Sales Tax Added = Pre-Tax Price × (Tax Rate ÷ 100)</div>
                  <div>Final Register Total = Pre-Tax Price + Sales Tax Added</div>
                </div>
                <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <strong>Practical Example:</strong> You buy a jacket priced at $80.00 in a city with an 8.5% sales tax rate:
                  <br />
                  1. Tax Added = $80.00 × 0.085 = $6.80
                  <br />
                  2. Register Total = $80.00 + $6.80 = <strong>$86.80</strong>
                </div>
              </div>
            </section>

            <section id="price-plus-tax-table" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Price Plus Tax Reference Table
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Reference standard price points and the resulting out-of-pocket totals across typical US sales tax rates (6.0%, 7.25%, 8.25%, and 9.0%):
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Sticker Price</th>
                      <th className="p-3">6.00% (+ Tax)</th>
                      <th className="p-3">7.25% (+ Tax)</th>
                      <th className="p-3">8.25% (+ Tax)</th>
                      <th className="p-3">9.00% (+ Tax)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {ADD_TAX_LOOKUP_TABLE.map((row) => (
                      <tr key={row.price} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">${row.price.toFixed(2)}</td>
                        <td className="p-3 text-slate-700">${row.total6.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.tax6.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.total725.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.tax725.toFixed(2)})</span></td>
                        <td className="p-3 text-blue-700 font-medium">${row.total825.toFixed(2)} <span className="text-slate-500 font-normal">(+${row.tax825.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.total9.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.tax9.toFixed(2)})</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="excel-formulas" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Spreadsheet Formulas (Excel / Sheets)
              </h2>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="text-xs font-bold text-slate-800">Add Tax in One Step (Gross Total):</div>
                <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                  =A2 * (1 + B2)
                </pre>
                <p className="text-xs text-slate-500 m-0">
                  Where cell <code>A2</code> is the price and cell <code>B2</code> is the tax rate as a percentage (e.g., <code>7.5%</code> or <code>0.075</code>).
                </p>
              </div>
            </section>

            <section id="take-off-tax" className="scroll-mt-24 space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 m-0">Want to take sales tax off an existing total?</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl m-0">
                    If you have a receipt or credit card total and need to extract the pre-tax price backwards, use our dedicated reverse sales tax engine.
                  </p>
                </div>
                <Link
                  href="/remove-sales-tax-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors shadow-2xs"
                >
                  <span>Remove Sales Tax</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Questions & Answers on Adding Sales Tax" />
            </section>
          </article>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <ForwardSalesTaxTool initialAmount={100} initialRate={7.5} />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tools</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/remove-sales-tax-calculator" className="block hover:underline">
                    • Remove Sales Tax from Total
                  </Link>
                  <Link href="/sales-tax-calculator" className="block hover:underline">
                    • Standard Sales Tax Calculator
                  </Link>
                  <Link href="/us-sales-tax-by-zip-code" className="block hover:underline">
                    • ZIP Code Sales Tax Lookup
                  </Link>
                  <Link href="/discount-and-tax-calculator" className="block hover:underline">
                    • Discount & Tax Calculator
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
