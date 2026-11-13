import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { MinusCircle, ArrowRight, CheckCircle2, ShieldCheck, Calendar, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Remove Sales Tax Calculator — Calculate Pre-Tax Price from Total',
  description:
    'Free calculator to remove sales tax from any total receipt or invoice. Calculate the original pre-tax price and sales tax paid accurately with full formula steps.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/remove-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/remove-sales-tax-calculator',
    title: 'Remove Sales Tax Calculator — Calculate Pre-Tax Price from Total',
    description:
      'Free calculator to remove sales tax from any total receipt or invoice. Calculate the original pre-tax price and sales tax paid accurately.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How do you remove sales tax from a total receipt?',
    answer:
      'To remove sales tax from a total, divide the gross amount by 1 plus the tax rate as a decimal. For instance, with an 8% sales tax, divide your total by 1.08. If your total is $108, $108 ÷ 1.08 = $100 pre-tax price. The tax removed is $8.',
  },
  {
    question: 'Why does subtracting the tax percentage directly give the wrong answer?',
    answer:
      'If you have a $108 total with 8% sales tax and simply subtract 8% ($108 - $8.64 = $99.36), you get an incorrect result. That is because 8% was originally calculated on the $100 base amount, not the $108 final total. Dividing by 1 + 0.08 mathematically reverses the calculation.',
  },
  {
    question: 'What is the formula to remove sales tax?',
    answer:
      'Pre-Tax Amount = Total Price ÷ (1 + [Tax Rate ÷ 100]). Sales Tax Removed = Total Price - Pre-Tax Amount.',
  },
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

  const tocItems: TocItem[] = [
    { id: 'how-to-strip-tax', label: 'How to Strip Sales Tax from a Total' },
    { id: 'reverse-formula', label: 'The Reverse Tax Division Formula' },
    { id: 'worked-examples', label: 'Worked Line-Item Examples' },
    { id: 'subtraction-error', label: 'The Common Subtraction Error' },
    { id: 'accounting-use-cases', label: 'When to Remove Sales Tax' },
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
              Deduct / Strip Sales Tax
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Updated for 2026
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
            <span>Reviewed by <strong>Financial Research Desk</strong> • Verified for 2026</span>
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
            </section>

            <section id="reverse-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                The Reverse Tax Division Formula
              </h2>
              <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono space-y-2 shadow-sm border border-slate-800">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-sans font-semibold">
                  Formula:
                </div>
                <div className="text-sm sm:text-base text-blue-300 font-bold space-y-1">
                  <div>Pre-Tax Price = Gross Total ÷ (1 + Tax Rate ÷ 100)</div>
                  <div>Sales Tax Removed = Gross Total - Pre-Tax Price</div>
                </div>
              </div>
            </section>

            <section id="worked-examples" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Worked Line-Item Examples
              </h2>
              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1 font-mono">
                  <div className="font-bold text-slate-900 font-sans text-sm">
                    Example 1: A $108.25 Receipt with 8.25% Tax
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">
                    <div>1. Divisor: 1 + 0.0825 = 1.0825</div>
                    <div>2. Net Pre-Tax: $108.25 ÷ 1.0825 = <strong className="text-slate-900 font-bold">$100.00</strong></div>
                    <div>3. Tax Removed: $108.25 - $100.00 = <strong className="text-blue-700 font-bold">$8.25</strong></div>
                  </div>
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
                  Subtracting 8.25% directly from $108.25 gives $99.32 instead of $100.00. This is because 8.25% was originally calculated on the $100.00 subtotal, not the $108.25 total.
                </p>
              </div>
            </section>

            <section id="accounting-use-cases" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                When to Remove Sales Tax
              </h2>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
                <li>
                  <strong>Bookkeeping & General Ledger:</strong> Separating deductible business operating expenses from sales tax liabilities.
                </li>
                <li>
                  <strong>Filing Sales Tax Returns:</strong> Reconciling gross receipts to report accurate taxable sales to state departments of revenue.
                </li>
                <li>
                  <strong>Price Auditing:</strong> Checking that a contractor or vendor applied the correct local statutory tax rate.
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
                    • Add Sales Tax Calculator
                  </Link>
                  <Link href="/sales-tax-breakdown-calculator" className="block hover:underline">
                    • Tax Breakdown Calculator
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
