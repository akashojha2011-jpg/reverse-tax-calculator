import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ForwardSalesTaxTool } from '@/components/ForwardSalesTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Calculator, ShieldCheck, ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax-Exclusive Price Calculator — Add Sales Tax to Pre-Tax Cost',
  description:
    'Free tax-exclusive price calculator. Add sales tax to any pre-tax item price to find final checkout total and tax amount.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tax-exclusive-price-calculator',
  },
}

const FAQS = [
  {
    question: 'What does tax-exclusive mean?',
    answer:
      'A tax-exclusive price is the base selling price of a product or service BEFORE any sales tax is added. In the United States, almost all retail merchandise is advertised at tax-exclusive prices, with sales tax calculated and added at checkout.',
  },
  {
    question: 'How do you calculate tax on a tax-exclusive price?',
    answer:
      'Multiply the tax-exclusive base price by your sales tax rate (as a decimal). For example, a $100 item with 8% sales tax incurs $8 tax ($100 × 0.08), resulting in a $108 total at the cash register.',
  },
]

export default function TaxExclusivePriceCalculatorPage() {
  const tocItems: TocItem[] = [
    { id: 'exclusive-definition', label: 'What Is Tax-Exclusive Pricing?' },
    { id: 'calculation-formula', label: 'How to Add Tax to Exclusive Prices' },
    { id: 'faqs', label: 'Frequently Asked Questions' },
  ]

  return (
    <>
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
              Net to Gross Addition
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Updated for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tax-Exclusive Price Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Calculate sales tax due and find the final register total from any tax-exclusive sticker price.
          </p>
        </header>

        <div className="block lg:hidden mb-8">
          <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="Guide Contents" />

            <section id="exclusive-definition" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                What Is Tax-Exclusive Pricing?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Tax-exclusive pricing means that sales tax is not included in the displayed retail price. It is the dominant pricing convention in the United States and Canada because local sales tax rates differ across thousands of city and county jurisdictions.
              </p>
            </section>

            <section id="calculation-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How to Add Tax to Exclusive Prices
              </h2>
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm space-y-1">
                <div>Sales Tax = Tax-Exclusive Subtotal × (Tax Rate ÷ 100)</div>
                <div>Total at Checkout = Tax-Exclusive Subtotal + Sales Tax</div>
              </div>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Frequently Asked Questions" />
            </section>
          </article>

          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Need Reverse Calculation?</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/reverse-sales-tax-calculator" className="block hover:underline">• Reverse Sales Tax Calculator</Link>
                  <Link href="/remove-sales-tax-calculator" className="block hover:underline">• Remove Sales Tax from Total</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
