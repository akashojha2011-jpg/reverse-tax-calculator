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
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Calculator (2026) — Calculate Tax & Total Price',
  description:
    'Free online sales tax calculator. Calculate the exact sales tax amount and final price from any pre-tax subtotal. Supports state and local tax rates with full formula breakdown.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/sales-tax-calculator',
    title: 'Sales Tax Calculator (2026) — Calculate Tax & Total Price',
    description:
      'Free online sales tax calculator. Calculate the exact sales tax amount and final price from any pre-tax subtotal. Supports state and local tax rates.',
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
      'No. Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon (commonly known as the NOMAD states). However, local municipalities in Alaska may levy local sales taxes.',
  },
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

  const tocItems: TocItem[] = [
    { id: 'how-to-calculate', label: 'How Forward Sales Tax Works' },
    { id: 'sales-tax-formula', label: 'Sales Tax Mathematical Formula' },
    { id: 'worked-examples', label: 'Step-by-Step Numerical Examples' },
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
              Updated for 2026
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
            <span>Reviewed by <strong>Financial Calculation Desk</strong> • Verified for 2026</span>
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
                Sales tax is an ad valorem consumption tax imposed by state and municipal governments on the retail sale of goods and taxable services. In forward calculations, you begin with the item&apos;s sticker price (the net subtotal) and add the tax percentage to calculate the final register price.
              </p>
            </section>

            <section id="sales-tax-formula" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Sales Tax Mathematical Formula
              </h2>
              <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono space-y-2 shadow-sm border border-slate-800">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-sans font-semibold">
                  Standard Calculation:
                </div>
                <div className="text-sm sm:text-base text-blue-300 font-bold space-y-1">
                  <div>Sales Tax Due = Subtotal × (Tax Rate ÷ 100)</div>
                  <div>Final Checkout Total = Subtotal + Sales Tax Due</div>
                </div>
              </div>
            </section>

            <section id="worked-examples" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Step-by-Step Numerical Examples
              </h2>
              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 font-mono">
                  <div className="font-bold text-slate-900 font-sans text-sm">
                    Example 1: A $100 Item with 8.25% Tax (Dallas, TX)
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">
                    <div>1. Convert rate: 8.25% = 0.0825</div>
                    <div>2. Tax due: $100.00 × 0.0825 = <strong className="text-blue-700 font-bold">$8.25</strong></div>
                    <div>3. Total checkout: $100.00 + $8.25 = <strong className="text-slate-900 font-bold">$108.25</strong></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 font-mono">
                  <div className="font-bold text-slate-900 font-sans text-sm">
                    Example 2: A $49.99 Item with 7% Tax (Florida)
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">
                    <div>1. Tax due: $49.99 × 0.07 = $3.4993 (rounds to $3.50)</div>
                    <div>2. Total checkout: $49.99 + $3.50 = <strong className="text-slate-900 font-bold">$53.49</strong></div>
                  </div>
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
                If you already have a receipt showing the final total and want to extract the pre-tax price backwards, remember not to simply subtract the percentage. Dividing by <code>1 + Tax Rate</code> ensures mathematical accuracy.
              </p>
              <Link
                href="/reverse-sales-tax-calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Switch to Reverse Sales Tax Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
                <div className="font-bold text-slate-800">Related Tools</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/us-sales-tax-by-zip-code" className="block hover:underline">
                    • ZIP Code Sales Tax Lookup
                  </Link>
                  <Link href="/discount-and-tax-calculator" className="block hover:underline">
                    • Discount & Tax Calculator
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
