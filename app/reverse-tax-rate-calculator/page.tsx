import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { Percent, HelpCircle, Table } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse Tax Rate Calculator — Solve Tax Percentage',
  description:
    'Free online reverse tax rate calculator. Find the exact tax percentage applied when you know the pre-tax net amount and total gross price.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/reverse-tax-rate-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/reverse-tax-rate-calculator',
    title: 'Reverse Tax Rate Calculator — Solve Tax Percentage',
    description:
      'Solves for the tax rate percentage when net and gross amounts are known. Ideal for invoice auditing and accounting verification.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Tax Rate Calculator — Solve Tax Percentage',
    description: 'Find exact tax rate percentage from net and gross prices.',
  },
}

export default function ReverseTaxRateCalculatorPage() {
  const faqs = [
    {
      question: 'How do I solve for the tax rate percentage?',
      answer:
        'Divide the total gross price by the pre-tax net price, subtract 1, and multiply by 100. Formula: Tax Rate % = [(Gross ÷ Net) - 1] × 100.',
    },
    {
      question: 'Example: How to find tax rate from $100 net and $107 gross?',
      answer:
        'Divide $107 by $100 = 1.07. Subtract 1 = 0.07. Multiply by 100 = 7.00% tax rate.',
    },
    {
      question: 'How do I solve for tax rate if I only know Net amount and Tax paid?',
      answer:
        'Divide the tax paid by the net subtotal and multiply by 100. Formula: Tax Rate % = (Tax Paid ÷ Net Price) × 100. For example, $7.00 tax ÷ $100.00 net × 100 = 7%.',
    },
    {
      question: 'Can I use this tax rate solver for VAT and GST?',
      answer:
        'Yes. The rate solving formula works identically across US sales tax, UK/EU VAT, Canadian HST/GST, and global GST.',
    },
  ]

  const rateReferenceTable = [
    { net: '$100.00', gross: '$105.00', taxPaid: '$5.00', solvedRate: '5.00%' },
    { net: '$100.00', gross: '$106.00', taxPaid: '$6.00', solvedRate: '6.00%' },
    { net: '$100.00', gross: '$106.25', taxPaid: '$6.25', solvedRate: '6.25%' },
    { net: '$100.00', gross: '$107.00', taxPaid: '$7.00', solvedRate: '7.00%' },
    { net: '$100.00', gross: '$108.25', taxPaid: '$8.25', solvedRate: '8.25%' },
    { net: '$100.00', gross: '$108.875', taxPaid: '$8.875', solvedRate: '8.875%' },
    { net: '$100.00', gross: '$110.00', taxPaid: '$10.00', solvedRate: '10.00%' },
    { net: '$100.00', gross: '$113.00', taxPaid: '$13.00', solvedRate: '13.00%' },
    { net: '$100.00', gross: '$115.00', taxPaid: '$15.00', solvedRate: '15.00%' },
    { net: '$100.00', gross: '$120.00', taxPaid: '$20.00', solvedRate: '20.00%' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse Tax Rate Calculator',
    url: 'https://www.reversetaxcalculator.pro/reverse-tax-rate-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <BreadcrumbNav items={[{ name: 'Reverse Tax Rate Calculator', url: '/reverse-tax-rate-calculator' }]} />

      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="space-y-2 pb-2 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Percent className="w-3.5 h-3.5" />
            Tax Percentage Solver
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reverse Tax Rate Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Solve the exact unknown tax percentage from the total gross price and pre-tax net amount on any receipt or invoice.
          </p>
        </header>

        {/* 2-Column Hero: Calculator + Formula Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CalculatorCard initialMode="solve-rate" defaultGross={110} hideModeSwitcher />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 m-0">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                <span>How to Solve for Tax Rate</span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed m-0">
                When an invoice shows the gross bill and net subtotal but omits the tax percentage, use this formula:
              </p>

              <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-brand-900 space-y-1">
                <div>Tax Rate % = [(Gross ÷ Net) - 1] × 100</div>
                <div>Alternative: Tax Rate % = (Tax ÷ Net) × 100</div>
              </div>

              <div className="text-xs text-slate-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3 leading-relaxed">
                <strong>Example:</strong> For a <strong>$100.00</strong> net price and <strong>$108.25</strong> total:
                <br />
                • $108.25 ÷ $100.00 = 1.0825
                <br />
                • (1.0825 - 1) × 100 = <strong>8.25% Tax Rate</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-brand-600" />
              <span>Common Tax Rates Reference Table</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Solved tax percentages for standard gross amounts based on a $100.00 pre-tax subtotal:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Pre-Tax Net</th>
                  <th className="py-3 px-4 font-bold">Gross Total</th>
                  <th className="py-3 px-4 font-bold">Tax Paid</th>
                  <th className="py-3 px-4 font-bold text-brand-700">Solved Tax Rate (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rateReferenceTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-800">{row.net}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.gross}</td>
                    <td className="py-2.5 px-4 text-slate-600">{row.taxPaid}</td>
                    <td className="py-2.5 px-4 font-bold text-brand-700">{row.solvedRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <FAQAccordion items={faqs} title="Frequently Asked Questions" />

        {/* State Directory */}
        <RegionGridDirectory />

        {/* Related Calculators */}
        <RelatedCalculatorsGrid title="Related Tax Calculators" />
      </div>
    </>
  )
}
