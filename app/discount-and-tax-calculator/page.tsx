import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DiscountTaxTool } from '@/components/DiscountTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Tag, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Discount and Sales Tax Calculator — Calculate Sale Price & Tax',
  description:
    'Free discount and sales tax calculator. Calculate your discounted sale price, sales tax amount, and final total out-of-pocket at checkout.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/discount-and-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/discount-and-tax-calculator',
    title: 'Discount and Sales Tax Calculator — Calculate Sale Price & Tax',
    description:
      'Free discount and sales tax calculator. Calculate your discounted sale price, sales tax amount, and final total out-of-pocket at checkout.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'Is sales tax calculated before or after a store discount?',
    answer:
      'In nearly all US states, retail sales tax is calculated on the discounted sale price (the actual amount paid by the consumer), NOT the original sticker price. For store sales, promotional markdowns, and retailer coupons, you only pay tax on the net price after discount.',
  },
  {
    question: 'How do manufacturer coupons affect sales tax compared to store discounts?',
    answer:
      'Store discounts (e.g., 20% off sale) reduce the taxable sale price. However, manufacturer coupons are legally treated as third-party cash payments in many states (like California and New York), meaning tax is charged on the price before the coupon value is deducted.',
  },
  {
    question: 'What is the formula for calculating discount and sales tax?',
    answer:
      '1. Discount Amount = Original Price × (Discount % ÷ 100). 2. Discounted Subtotal = Original Price - Discount Amount. 3. Sales Tax = Discounted Subtotal × (Tax Rate ÷ 100). 4. Final Total = Discounted Subtotal + Sales Tax.',
  },
]

export default function DiscountAndTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Discount and Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/discount-and-tax-calculator',
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
          { name: 'Discount and Tax Calculator', url: '/discount-and-tax-calculator' },
        ]}
      />

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Sale Price & Tax Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Discount and Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter the original item price, your discount percentage, and local sales tax rate to find your final out-of-pocket register cost and total savings.
          </p>
        </header>

        <DiscountTaxTool />

        <FAQAccordion items={FAQS} title="Frequently Asked Questions about Discounts & Sales Tax" />
      </div>
    </>
  )
}
