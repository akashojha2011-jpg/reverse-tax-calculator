import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Layers, ShieldCheck, ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax-Inclusive Price Calculator — Separate Pre-Tax Price & Tax Paid',
  description:
    'Free tax-inclusive price calculator. Separate the base price and sales tax/VAT from any gross tax-inclusive receipt or total invoice accurately.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tax-inclusive-price-calculator',
  },
}

const FAQS = [
  {
    question: 'What is a tax-inclusive price?',
    answer:
      'A tax-inclusive price (also known as gross price) is the total dollar figure that already includes applicable sales tax, VAT, or GST. Retail prices in Europe, Australia, and many global markets are legally tax-inclusive, whereas US retail prices are usually tax-exclusive until checkout.',
  },
  {
    question: 'How do you separate tax from a tax-inclusive price?',
    answer:
      'To separate tax from a tax-inclusive amount, divide the total price by 1 plus the tax rate as a decimal. For example, for a $108 tax-inclusive total with 8% sales tax, divide $108 by 1.08 to find the $100 pre-tax base. The tax component is $8.',
  },
]

export default function TaxInclusivePriceCalculatorPage() {
  const tocItems: TocItem[] = [
    { id: 'inclusive-definition', label: 'What Is Tax-Inclusive Pricing?' },
    { id: 'separation-formula', label: 'How to Separate Tax from Gross' },
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
              Gross to Net Deconstruction
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Updated for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tax-Inclusive Price Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Separate the pre-tax base cost and sales tax from any tax-inclusive purchase total or receipt.
          </p>
        </header>

        <div className="block lg:hidden mb-8">
          <CalculatorCard {...calculatorProps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="Guide Contents" />

            <section id="inclusive-definition" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                What Is Tax-Inclusive Pricing?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A tax-inclusive price represents the total out-of-pocket amount where sales tax, VAT, or GST is already bundled into the sticker price. While common in Europe and international commerce, US businesses often need to deconstruct tax-inclusive receipts to report deductible pre-tax operating expenses.
              </p>
            </section>

            <section id="separation-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How to Separate Tax from Gross
              </h2>
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-1">
                <div>Base Pre-Tax Price = Tax-Inclusive Total ÷ (1 + Tax Rate ÷ 100)</div>
                <div>Tax Paid = Tax-Inclusive Total - Base Pre-Tax Price</div>
              </div>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Frequently Asked Questions" />
            </section>
          </article>

          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <CalculatorCard {...calculatorProps} />
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tools</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/reverse-sales-tax-calculator" className="block hover:underline">• Reverse Sales Tax</Link>
                  <Link href="/remove-sales-tax-calculator" className="block hover:underline">• Remove Sales Tax</Link>
                  <Link href="/sales-tax-calculator" className="block hover:underline">• Standard Sales Tax</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
