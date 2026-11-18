import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Layers, ShieldCheck, ArrowRight, Calendar, FileSpreadsheet, BookOpen, Percent } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax-Inclusive Price Calculator — Separate Pre-Tax Price & Tax (2026)',
  description:
    'Free tax-inclusive price calculator. Separate the base price and sales tax/VAT from any gross tax-inclusive receipt or total invoice. Includes formulas, Excel models, and bookkeeping rules.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tax-inclusive-price-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/tax-inclusive-price-calculator',
    title: 'Tax-Inclusive Price Calculator — Separate Pre-Tax Price & Tax (2026)',
    description:
      'Free tax-inclusive price calculator. Separate the base price and sales tax/VAT from any gross tax-inclusive receipt or total invoice.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'What is a tax-inclusive price?',
    answer:
      'A tax-inclusive price (also known as a gross price) is a total dollar amount that already includes all applicable sales tax, VAT, or GST. Retail prices in the UK, Europe, Australia, and New Zealand are legally mandated to be tax-inclusive, whereas US retail pricing is typically tax-exclusive.',
  },
  {
    question: 'How do you separate tax from a tax-inclusive price?',
    answer:
      'To separate tax from a tax-inclusive amount, divide the total price by 1 plus the tax rate as a decimal. For example, for a $108 tax-inclusive total with 8% sales tax: $108 ÷ 1.08 = $100 pre-tax base. The tax component is $108 - $100 = $8.',
  },
  {
    question: 'Why can’t I just multiply the gross total by the tax rate and subtract it?',
    answer:
      'Multiplying $108 by 8% yields $8.64, leaving $99.36. This is mathematically wrong because sales tax was originally levied on the $100 net amount ($8.00), not the $108 gross amount. Dividing by 1 + 0.08 is the mathematically correct inverse operation.',
  },
  {
    question: 'What is the Excel formula to extract pre-tax price from a tax-inclusive total?',
    answer:
      'If cell A2 has the tax-inclusive price ($108.00) and cell B2 has the tax percentage (8%), enter =A2/(1+B2) to calculate the net base price ($100.00). To calculate the tax amount directly, enter =A2-(A2/(1+B2)) or =A2*(B2/(1+B2)).',
  },
  {
    question: 'How do businesses account for tax-inclusive sales in bookkeeping?',
    answer:
      'When recording a $108 tax-inclusive sale with 8% tax, a business debits Cash/Accounts Receivable for $108, credits Sales Revenue for $100, and credits Sales Tax Payable for $8. The tax is a balance sheet liability, not business revenue.',
  },
]

const INCLUSIVE_LOOKUP_TABLE = [
  { gross: 20, net5: 19.05, tax5: 0.95, net8: 18.52, tax8: 1.48, net10: 18.18, tax10: 1.82, net15: 17.39, tax15: 2.61, net20: 16.67, tax20: 3.33 },
  { gross: 50, net5: 47.62, tax5: 2.38, net8: 46.30, tax8: 3.70, net10: 45.45, tax10: 4.55, net15: 43.48, tax15: 6.52, net20: 41.67, tax20: 8.33 },
  { gross: 100, net5: 95.24, tax5: 4.76, net8: 92.59, tax8: 7.41, net10: 90.91, tax10: 9.09, net15: 86.96, tax15: 13.04, net20: 83.33, tax20: 16.67 },
  { gross: 250, net5: 238.10, tax5: 11.90, net8: 231.48, tax8: 18.52, net10: 227.27, tax10: 22.73, net15: 217.39, tax15: 32.61, net20: 208.33, tax20: 41.67 },
  { gross: 500, net5: 476.19, tax5: 23.81, net8: 462.96, tax8: 37.04, net10: 454.55, tax10: 45.45, net15: 434.78, tax15: 65.22, net20: 416.67, tax20: 83.33 },
  { gross: 1000, net5: 952.38, tax5: 47.62, net8: 925.93, tax8: 74.07, net10: 909.09, tax10: 90.91, net15: 869.57, tax15: 130.43, net20: 833.33, tax20: 166.67 },
]

export default function TaxInclusivePriceCalculatorPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tax-Inclusive Price Calculator',
    url: 'https://www.reversetaxcalculator.pro/tax-inclusive-price-calculator',
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
    name: 'How to Separate Tax from a Tax-Inclusive Price',
    description: 'Step-by-step method to deconstruct a tax-inclusive price into pre-tax revenue and tax payable.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Identify Gross Total & Tax Rate',
        text: 'Record the total out-of-pocket payment and the statutory tax percentage applied to the transaction.',
      },
      {
        '@type': 'HowToStep',
        name: 'Divide by One Plus the Decimal Rate',
        text: 'Divide the gross total by (1 + Rate ÷ 100). For an 8% tax rate, divide by 1.08.',
      },
      {
        '@type': 'HowToStep',
        name: 'Extract the Sales Tax Component',
        text: 'Subtract the calculated pre-tax base from your original gross total to find the exact tax paid.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'inclusive-definition', label: 'What Is Tax-Inclusive Pricing?' },
    { id: 'separation-formula', label: 'Mathematical Formula & Derivation' },
    { id: 'gross-to-net-table', label: 'Gross-to-Net Lookup Table' },
    { id: 'excel-formulas', label: 'Excel & Google Sheets Formulas' },
    { id: 'accounting-journal-entry', label: 'Bookkeeping & Journal Entries' },
    { id: 'faqs', label: 'Frequently Asked Questions' },
  ]

  const calculatorProps = {
    initialMode: 'sales-tax' as any,
    defaultGross: 108,
    defaultTaxRate: 8,
    taxName: 'Tax',
    currencySymbol: '$',
    hideModeSwitcher: true,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tax-Inclusive Price Calculator', url: '/tax-inclusive-price-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Gross-to-Net Deconstruction
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tax-Inclusive Price Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Separate the pre-tax base cost and sales tax or VAT from any tax-inclusive purchase total, receipt, or gross invoice.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Standard GAAP & IFRS gross-to-net accounting principles</span>
          </div>
        </header>

        {/* Mobile Top Calculator */}
        <div className="block lg:hidden mb-8">
          <CalculatorCard {...calculatorProps} />
        </div>

        {/* Desktop Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="Guide Contents" />

            <section id="inclusive-definition" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                What Is Tax-Inclusive Pricing?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A tax-inclusive price represents the total out-of-pocket amount where sales tax, VAT, or GST is already bundled into the sticker price. While standard consumer pricing in the United States is tax-exclusive, tax-inclusive transactions frequently arise in:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm sm:text-base">
                <li><strong>Gasoline and Fuel:</strong> Federal and state excise taxes are bundled directly into the pump price.</li>
                <li><strong>Fixed-Fee Commercial Contracts:</strong> Turnkey services where contractors quote an &quot;all-in&quot; final price.</li>
                <li><strong>Concessions & Ticketed Events:</strong> Sporting events, bars, and festivals often price beers and tickets tax-inclusive to speed cash handling.</li>
                <li><strong>International Invoicing:</strong> In Europe, Canada, Australia, and New Zealand, B2C transactions are legally required to display gross inclusive prices.</li>
              </ul>
            </section>

            <section id="separation-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Mathematical Formula & Derivation
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 tabular-nums space-y-3 border border-slate-200/90 shadow-2xs">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
                  Gross to Net Mathematical Equations
                </div>
                <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1.5">
                  <div>Base Pre-Tax Price = Tax-Inclusive Total ÷ (1 + [Tax Rate ÷ 100])</div>
                  <div>Tax Amount = Tax-Inclusive Total - Base Pre-Tax Price</div>
                </div>
                <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <strong>Worked Proof:</strong> If an all-inclusive receipt is $108.00 at an 8% tax rate:
                  <br />
                  Base Price = $108.00 ÷ 1.08 = $100.00
                  <br />
                  Tax Paid = $108.00 - $100.00 = $8.00
                </div>
              </div>
            </section>

            <section id="gross-to-net-table" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Gross-to-Net Lookup Table
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Quickly lookup the pre-tax base and separated tax component for common inclusive price points across standard tax and VAT rates:
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Inclusive Total</th>
                      <th className="p-3">5% Tax (Base / Tax)</th>
                      <th className="p-3">8% Tax (Base / Tax)</th>
                      <th className="p-3">10% Tax (Base / Tax)</th>
                      <th className="p-3">15% Tax (Base / Tax)</th>
                      <th className="p-3">20% Tax (Base / Tax)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {INCLUSIVE_LOOKUP_TABLE.map((row) => (
                      <tr key={row.gross} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">${row.gross.toFixed(2)}</td>
                        <td className="p-3 text-slate-700">${row.net5.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax5.toFixed(2)})</span></td>
                        <td className="p-3 text-blue-700 font-medium">${row.net8.toFixed(2)} <span className="text-slate-500 font-normal">(${row.tax8.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.net10.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax10.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.net15.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax15.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.net20.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax20.toFixed(2)})</span></td>
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
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-xs font-bold text-slate-800">Formula for Pre-Tax Base Price:</div>
                  <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                    =A2 / (1 + B2)
                  </pre>
                  <p className="text-xs text-slate-500 m-0">
                    Where cell <code>A2</code> is the inclusive gross total ($108) and cell <code>B2</code> is the tax rate (8% or 0.08).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-xs font-bold text-slate-800">Formula for Tax Amount Only:</div>
                  <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                    =A2 - (A2 / (1 + B2))
                  </pre>
                  <p className="text-xs text-slate-500 m-0">
                    Extracts just the sales tax or VAT component without requiring helper columns.
                  </p>
                </div>
              </div>
            </section>

            <section id="accounting-journal-entry" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Bookkeeping & Journal Entries
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When accounting for tax-inclusive revenue, remember that sales tax collected is not company revenue—it is a fiduciary trust liability owed to the state Department of Revenue.
              </p>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 font-sans">Sample Journal Entry ($1,080 Gross Cash Receipt at 8% Tax):</div>
                <div className="space-y-1 font-mono text-xs bg-white p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-700">Debit: Cash (Asset) ............................. $1,080.00</div>
                  <div className="text-slate-700 pl-4">Credit: Sales Revenue (Income) .............. $1,000.00</div>
                  <div className="text-slate-700 pl-4">Credit: Sales Tax Payable (Liability) ....... $80.00</div>
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
              <CalculatorCard {...calculatorProps} />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tools</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/tax-exclusive-price-calculator" className="block hover:underline">
                    • Tax-Exclusive Price Calculator
                  </Link>
                  <Link href="/reverse-sales-tax-calculator" className="block hover:underline">
                    • Reverse Sales Tax Calculator
                  </Link>
                  <Link href="/remove-sales-tax-calculator" className="block hover:underline">
                    • Remove Sales Tax from Total
                  </Link>
                  <Link href="/sales-tax-calculator" className="block hover:underline">
                    • Forward Sales Tax Calculator
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
