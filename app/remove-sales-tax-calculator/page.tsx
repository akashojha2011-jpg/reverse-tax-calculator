import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { MinusCircle, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Remove Sales Tax Calculator — Calculate Pre-Tax Price from Total',
  description:
    'Free calculator to remove sales tax from any total receipt or invoice. Calculate the original pre-tax price and sales tax paid accurately.',
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

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <MinusCircle className="w-3.5 h-3.5 text-blue-600" />
              Deduct / Strip Sales Tax
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Remove Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter any tax-inclusive total and sales tax percentage to instantly calculate the original pre-tax price and extract the sales tax paid.
          </p>
        </header>

        <div className="max-w-3xl">
          <CalculatorCard
            initialMode="sales-tax"
            defaultGross={108.25}
            defaultTaxRate={8.25}
            taxName="Sales Tax"
            currencySymbol="$"
            hideModeSwitcher
          />
        </div>

        <FAQAccordion items={FAQS} title="Frequently Asked Questions on Removing Sales Tax" />
      </div>
    </>
  )
}
