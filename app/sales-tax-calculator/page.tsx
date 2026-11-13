import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ForwardSalesTaxTool } from '@/components/ForwardSalesTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { CalculatorCard } from '@/components/CalculatorCard'
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Calculator (2026) — Calculate Tax & Total Price',
  description:
    'Free online sales tax calculator. Calculate the exact sales tax amount and final price from any pre-tax subtotal. Supports state and local tax rates.',
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
      'To calculate sales tax, multiply the pre-tax price (subtotal) by the sales tax rate expressed as a decimal (e.g. 8.25% becomes 0.0825). The formula is: Sales Tax = Subtotal × (Rate ÷ 100). Add the sales tax to your original subtotal to determine the total price due at checkout.',
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

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              Forward Sales Tax Tool
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter your purchase price and sales tax percentage to instantly calculate the sales tax due and total price at checkout.
          </p>
        </header>

        {/* Primary Forward Calculator */}
        <ForwardSalesTaxTool initialAmount={100} initialRate={8.25} />

        {/* Reverse Calculator Callout */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Need to remove sales tax from a receipt instead?</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              If you already have the total bill and want to find the pre-tax price and tax paid backwards, use our dedicated reverse sales tax calculator.
            </p>
          </div>
          <Link
            href="/reverse-sales-tax-calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors shadow-2xs"
          >
            <span>Reverse Sales Tax</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* FAQs */}
        <FAQAccordion items={FAQS} title="Frequently Asked Questions about Sales Tax Calculations" />
      </div>
    </>
  )
}
