import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ForwardSalesTaxTool } from '@/components/ForwardSalesTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { PlusCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Add Sales Tax Calculator — Calculate Price Plus Tax',
  description:
    'Free calculator to add sales tax to any price. Enter your pre-tax amount and tax rate to see the tax added and total checkout price instantly.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/add-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/add-sales-tax-calculator',
    title: 'Add Sales Tax Calculator — Calculate Price Plus Tax',
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
      'In jurisdictions with multiple overlapping taxes (such as a 4% state tax, a 2% county tax, and a 1% city tax), simply sum the percentages first (4% + 2% + 1% = 7%), and then calculate the tax based on the 7% combined rate.',
  },
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
          { name: 'Add Sales Tax Calculator', url: '/add-sales-tax-calculator' },
        ]}
      />

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
              Price Plus Tax
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Add Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Quickly calculate how much sales tax will be added to your purchase and what your total cost will be at the cash register.
          </p>
        </header>

        <ForwardSalesTaxTool initialAmount={100} initialRate={7.5} />

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Want to take sales tax off an existing total?</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Use our Remove Sales Tax Calculator to extract the pre-tax price from any tax-inclusive invoice or receipt.
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

        <FAQAccordion items={FAQS} title="Questions & Answers on Adding Sales Tax" />
      </div>
    </>
  )
}
