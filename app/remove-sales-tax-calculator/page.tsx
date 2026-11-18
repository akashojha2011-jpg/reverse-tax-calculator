import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { MinusCircle, ArrowRight, CheckCircle2, ShieldCheck, Calendar, AlertTriangle, FileSpreadsheet, Percent, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Remove Sales Tax Calculator — Calculate Pre-Tax Price from Total (2026)',
  description:
    'Free calculator to remove sales tax from any total receipt or invoice. Calculate the original pre-tax price and sales tax paid accurately with full formula steps and Excel models.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/remove-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/remove-sales-tax-calculator',
    title: 'Remove Sales Tax Calculator — Calculate Pre-Tax Price from Total (2026)',
    description:
      'Free calculator to remove sales tax from any total receipt or invoice. Calculate the original pre-tax price and sales tax paid accurately.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How do you remove sales tax from a total receipt?',
    answer:
      'To remove sales tax from a total, divide the gross amount by 1 plus the tax rate as a decimal. For instance, with an 8.25% sales tax, divide your total by 1.0825. If your total is $108.25, $108.25 ÷ 1.0825 = $100.00 pre-tax price. The tax removed is $8.25.',
  },
  {
    question: 'Why does subtracting the tax percentage directly give the wrong answer?',
    answer:
      'If you have a $108.25 total with 8.25% sales tax and simply subtract 8.25% ($108.25 - $8.93 = $99.32), you get an incorrect result. That is because 8.25% was originally calculated on the $100.00 base amount, not the $108.25 final total. Dividing by 1 + 0.0825 mathematically reverses the calculation.',
  },
  {
    question: 'What is the formula to remove sales tax?',
    answer:
      'Pre-Tax Amount = Total Price ÷ (1 + [Tax Rate ÷ 100]). Sales Tax Removed = Total Price - Pre-Tax Amount.',
  },
  {
    question: 'What is the Excel formula to remove sales tax from a number?',
    answer:
      'If your receipt total is in cell A2 and the tax percentage is in cell B2 (e.g. 8.25%), enter =A2/(1+B2) to get the pre-tax base. To extract just the sales tax amount, enter =A2-(A2/(1+B2)).',
  },
  {
    question: 'Can sales tax be deducted on my federal tax return?',
    answer:
      'Yes. On federal Form 1040 Schedule A, taxpayers who itemize deductions can choose to deduct either state and local income taxes OR state and local general sales taxes paid during the tax year (subject to the SALT limit). Keeping accurate pre-tax and sales tax records on major purchases is essential.',
  },
]

const REMOVAL_LOOKUP_TABLE = [
  { total: 15, base6: 14.15, tax6: 0.85, base7: 14.02, tax7: 0.98, base825: 13.86, tax825: 1.14, base95: 13.70, tax95: 1.30 },
  { total: 35, base6: 33.02, tax6: 1.98, base7: 32.71, tax7: 2.29, base825: 32.33, tax825: 2.67, base95: 31.96, tax95: 3.04 },
  { total: 75, base6: 70.75, tax6: 4.25, base7: 70.09, tax7: 4.91, base825: 69.28, tax825: 5.72, base95: 68.49, tax95: 6.51 },
  { total: 150, base6: 141.51, tax6: 8.49, base7: 140.19, tax7: 9.81, base825: 138.57, tax825: 11.43, base95: 136.99, tax95: 13.01 },
  { total: 300, base6: 283.02, tax6: 16.98, base7: 280.37, tax7: 19.63, base825: 277.14, tax825: 22.86, base95: 273.97, tax95: 26.03 },
  { total: 750, base6: 707.55, tax6: 42.45, base7: 700.93, tax7: 49.07, base825: 692.84, tax825: 57.16, base95: 684.93, tax95: 65.07 },
]

export default function RemoveSalesTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Remove Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/remove-sales-tax-calculator',
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
    name: 'How to Remove Sales Tax from a Total Receipt',
    description: 'Learn how to mathematically remove sales tax from any total purchase amount to determine the pre-tax cost.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Record Total Receipt & Tax Rate',
        text: 'Identify the total amount paid and the applicable sales tax rate percentage.',
      },
      {
        '@type': 'HowToStep',
        name: 'Divide by 1 Plus Decimal Tax Rate',
        text: 'Divide the total receipt amount by (1 + Tax Rate ÷ 100). For example, at 8.25%, divide by 1.0825.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate Tax Removed',
        text: 'Subtract the calculated pre-tax base amount from the original total to find the sales tax amount paid.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'how-to-strip-tax', label: 'How to Strip Sales Tax from a Total' },
    { id: 'reverse-formula', label: 'The Reverse Tax Division Formula' },
    { id: 'removal-lookup-table', label: 'Tax Removal Reference Table' },
    { id: 'excel-formulas', label: 'Excel & Google Sheets Formulas' },
    { id: 'subtraction-error', label: 'The Common Subtraction Error' },
    { id: 'accounting-use-cases', label: 'Tax Deductions & Accounting Uses' },
    { id: 'faqs', label: 'Frequently Asked Questions' },
  ]

  const calculatorProps = {
    initialMode: 'sales-tax' as any,
    defaultGross: 108.25,
    defaultTaxRate: 8.25,
    taxName: 'Sales Tax',
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
          { name: 'Remove Sales Tax Calculator', url: '/remove-sales-tax-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <MinusCircle className="w-3.5 h-3.5 text-blue-600" />
              Tax Removal Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Remove Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter any tax-inclusive total and sales tax percentage to instantly calculate the original pre-tax price and extract the sales tax paid.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mathematical division algorithm aligned with IRS Schedule C and state audit standards</span>
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

            <section id="how-to-strip-tax" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How to Strip Sales Tax from a Total
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When auditing receipts, reimbursing employee expense claims, or logging journal entries in accounting software, transactions are frequently recorded inclusive of sales tax. Removing sales tax extracts the net deductible expense.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Because sales tax was added to a smaller base figure, you cannot simply subtract the tax percentage from the final total. Instead, you divide by one plus the tax rate to recover the original pre-tax base.
              </p>
            </section>

            <section id="reverse-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                The Reverse Tax Division Formula
              </h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 tabular-nums space-y-3 border border-slate-200/90 shadow-2xs">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
                  Mathematical Deduction Formula
                </div>
                <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1.5">
                  <div>Pre-Tax Price = Gross Receipt Total ÷ (1 + [Tax Rate ÷ 100])</div>
                  <div>Sales Tax Removed = Gross Receipt Total - Pre-Tax Price</div>
                </div>
                <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                  <strong>Example:</strong> For a $108.25 receipt with 8.25% sales tax:
                  <br />
                  1. Divisor = 1 + 0.0825 = 1.0825
                  <br />
                  2. Pre-Tax Base = $108.25 ÷ 1.0825 = <strong>$100.00</strong>
                  <br />
                  3. Tax Paid = $108.25 - $100.00 = <strong>$8.25</strong>
                </div>
              </div>
            </section>

            <section id="removal-lookup-table" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Tax Removal Reference Table
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The following table shows the extracted pre-tax base and sales tax removed from common receipt totals across standard sales tax rates:
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Receipt Total</th>
                      <th className="p-3">6.00% (Base / Tax)</th>
                      <th className="p-3">7.00% (Base / Tax)</th>
                      <th className="p-3">8.25% (Base / Tax)</th>
                      <th className="p-3">9.50% (Base / Tax)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {REMOVAL_LOOKUP_TABLE.map((row) => (
                      <tr key={row.total} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">${row.total.toFixed(2)}</td>
                        <td className="p-3 text-slate-700">${row.base6.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax6.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.base7.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax7.toFixed(2)})</span></td>
                        <td className="p-3 text-blue-700 font-medium">${row.base825.toFixed(2)} <span className="text-slate-500 font-normal">(${row.tax825.toFixed(2)})</span></td>
                        <td className="p-3 text-slate-700">${row.base95.toFixed(2)} <span className="text-slate-400 font-normal">(${row.tax95.toFixed(2)})</span></td>
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
                  <div className="text-xs font-bold text-slate-800">Remove Tax and Find Net Base:</div>
                  <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                    =A2 / (1 + B2)
                  </pre>
                  <p className="text-xs text-slate-500 m-0">
                    Where cell <code>A2</code> has the receipt total ($108.25) and cell <code>B2</code> has the percentage (8.25% or 0.0825).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-xs font-bold text-slate-800">Extract Tax Paid Directly:</div>
                  <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                    =A2 - (A2 / (1 + B2))
                  </pre>
                </div>
              </div>
            </section>

            <section id="subtraction-error" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                The Common Subtraction Error
              </h2>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 text-sm text-amber-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Why Subtracting 8.25% Directly Fails:</span>
                </div>
                <p className="m-0 text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  Subtracting 8.25% directly from $108.25 gives $99.32 instead of $100.00. This is because 8.25% was originally calculated on the $100.00 subtotal, not the $108.25 total. Multiplying the larger total by 8.25% extracts too much money ($8.93 instead of $8.25).
                </p>
              </div>
            </section>

            <section id="accounting-use-cases" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Tax Deductions & Accounting Uses
              </h2>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
                <li>
                  <strong>IRS Schedule C Expense Reporting:</strong> Sole proprietors and freelancers deduct the net business expense while logging sales tax separately or capitalizing it into asset basis.
                </li>
                <li>
                  <strong>IRS Schedule A Itemized Deduction:</strong> Individuals can deduct state and local general sales taxes paid instead of state income taxes. This is especially advantageous for residents of states with no income tax (Texas, Florida, Washington, Nevada, Tennessee, Wyoming, Alaska, South Dakota).
                </li>
                <li>
                  <strong>Filing Sales Tax Returns:</strong> Reconciling gross cash receipts to report true taxable sales to state departments of revenue.
                </li>
              </ul>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Frequently Asked Questions on Removing Sales Tax" />
            </section>
          </article>

          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <CalculatorCard {...calculatorProps} />

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tools</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/us-sales-tax-by-zip-code" className="block hover:underline">
                    • ZIP Code Tax Lookup
                  </Link>
                  <Link href="/sales-tax-calculator" className="block hover:underline">
                    • Forward Sales Tax Calculator
                  </Link>
                  <Link href="/sales-tax-breakdown-calculator" className="block hover:underline">
                    • Tax Breakdown Calculator
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
