import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TipAndTaxTool } from '@/components/TipAndTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Utensils, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tip and Tax Calculator — Restaurant Bill & Bill Splitter',
  description:
    'Free tip and sales tax calculator. Calculate tips on pre-tax subtotal vs post-tax total, calculate tax, and split the final bill evenly among guests.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tip-and-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/tip-and-tax-calculator',
    title: 'Tip and Tax Calculator — Restaurant Bill & Bill Splitter',
    description:
      'Free tip and sales tax calculator. Calculate tips on pre-tax subtotal vs post-tax total, calculate tax, and split the final bill evenly among guests.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'Should you tip before or after sales tax is added?',
    answer:
      'Traditional tipping etiquette recommends tipping on the pre-tax food and beverage subtotal. Sales tax is a government charge, not a service provided by waitstaff. However, many digital payment tablets automatically suggest tip percentages based on the post-tax grand total.',
  },
  {
    question: 'What is a standard tip percentage in the United States?',
    answer:
      'In American restaurants, 15% is considered standard for adequate service, 18% to 20% is common for good to great service, and 22% to 25% is customary for exceptional dining experiences.',
  },
  {
    question: 'How do you calculate tip and tax on a restaurant bill?',
    answer:
      '1. Subtotal × (Tax Rate ÷ 100) = Sales Tax. 2. Subtotal × (Tip % ÷ 100) = Tip Amount. 3. Grand Total = Subtotal + Sales Tax + Tip Amount. 4. Divide Grand Total by party size to get each person’s share.',
  },
]

export default function TipAndTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tip and Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/tip-and-tax-calculator',
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
          { name: 'Tip and Tax Calculator', url: '/tip-and-tax-calculator' },
        ]}
      />

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Utensils className="w-3.5 h-3.5 text-blue-600" />
              Dining & Tip Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tip and Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Calculate your restaurant tip on pre-tax subtotal vs post-tax total, calculate exact sales tax, and split the final bill evenly among your party.
          </p>
        </header>

        <TipAndTaxTool />

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Need to remove tip & tax backwards from a credit card charge?</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Use our Reverse Sales Tax and Tip Calculator to extract the meal subtotal and tip from a final bank charge.
            </p>
          </div>
          <Link
            href="/reverse-sales-tax-and-tip-calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors shadow-2xs"
          >
            <span>Reverse Tax & Tip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <FAQAccordion items={FAQS} title="Frequently Asked Questions about Restaurant Tipping & Tax" />
      </div>
    </>
  )
}
