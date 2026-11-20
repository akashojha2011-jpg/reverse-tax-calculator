import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Percent, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator – Extract Net Price & VAT From Gross',
  description:
    'Extract the original price before VAT from a tax-inclusive amount. Free online reverse VAT calculator for UK (20%) and European VAT rates.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
    title: 'Reverse VAT Calculator – Extract Net Price & VAT From Gross',
    description:
      'Extract the original price before VAT from a tax-inclusive amount.',
    siteName: 'ReverseTaxCalculator.pro',
  },
}

const FAQS = [
  {
    question: 'How do I remove 20% VAT from a total price?',
    answer:
      'To remove 20% VAT from a gross total, divide the total price by 1.20. For example, £120.00 gross ÷ 1.20 = £100.00 net price. The VAT portion is £120.00 - £100.00 = £20.00.',
  },
  {
    question: 'What is the UK VAT fraction for 20% VAT?',
    answer:
      'The UK VAT fraction for 20% VAT is 1/6 (or 20/120). To find the VAT amount directly from a gross total, divide the gross total by 6. For example, £120.00 ÷ 6 = £20.00 VAT.',
  },
  {
    question: 'How do I calculate 5% reduced UK VAT backwards?',
    answer: 'Divide the total gross price by 1.05. For example, £105.00 gross ÷ 1.05 = £100.00 net price.',
  },
]

export default function ToolsReverseVATPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reverse VAT Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
    description:
      'Extract the original price before VAT from a tax-inclusive amount.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse VAT Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Reverse VAT Calculator', url: '/tools/reverse-vat-calculator' },
        ]}
      />

      <div className="space-y-16 max-w-7xl mx-auto">
        <section className="pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>Value Added Tax Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Reverse VAT Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Extract the original price before VAT from a tax-inclusive amount. Calculate pre-VAT net amounts and VAT paid backwards from receipts and invoices across UK and European rates.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Online Calculator • No registration required</span>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <CalculatorCard
                initialMode="vat"
                defaultGross={120}
                defaultTaxRate={20}
                taxName="VAT"
                currencySymbol="£"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <FAQAccordion items={FAQS} title="Frequently Asked Questions About Reverse VAT" />
        </section>
      </div>
    </>
  )
}
