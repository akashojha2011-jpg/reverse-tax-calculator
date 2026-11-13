import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { DollarSign, HelpCircle, Table } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse Income Tax Calculator — Net to Gross Paycheck Estimator',
  description:
    'Free online reverse income tax calculator. Estimate the gross salary required to reach your target net take-home pay based on your effective income tax rate.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/reverse-income-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/reverse-income-tax-calculator',
    title: 'Reverse Income Tax Calculator — Net to Gross Paycheck Estimator',
    description:
      'Estimate required gross salary from target net take-home pay based on effective income tax rates.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Income Tax Calculator — Net to Gross',
    description: 'Calculate gross salary required for your target net take-home pay.',
  },
}

export default function ReverseIncomeTaxPage() {
  const faqs = [
    {
      question: 'How do you calculate gross salary from net take-home pay?',
      answer:
        'To estimate gross salary from target net pay, divide your desired net pay by (1 - Effective Tax Rate in decimal form). For example, to take home $4,000 net with a 20% effective tax rate, divide $4,000 by 0.80 to get an estimated gross salary of $5,000.00.',
    },
    {
      question: 'Why is payroll tax calculation different from sales tax?',
      answer:
        'Sales tax is added on top of a net item price (Gross = Net × [1 + Tax Rate]), whereas income taxes and payroll contributions are deducted from gross wages (Net = Gross × [1 - Tax Rate]). Therefore, the reverse payroll divisor is 1 minus the tax rate rather than 1 plus.',
    },
    {
      question: 'What is an effective income tax rate?',
      answer:
        'Your effective tax rate is your total annual taxes paid divided by your total annual gross income. Because income taxes use progressive brackets (where higher dollars are taxed at higher percentages), your effective rate is lower than your top marginal tax bracket.',
    },
    {
      question: 'Is this calculation exact for tax filings?',
      answer:
        'This tool provides an estimate based on a single effective rate. Actual employer payroll withholding also factors in pre-tax deductions (401k, health insurance), progressive federal/state brackets, and payroll taxes (FICA, Social Security, Medicare).',
    },
  ]

  const netToGrossConversionTable = [
    { targetNet: '$3,000.00', effectiveRate: '15%', estimatedGross: '$3,529.41', taxWithheld: '$529.41' },
    { targetNet: '$4,000.00', effectiveRate: '20%', estimatedGross: '$5,000.00', taxWithheld: '$1,000.00' },
    { targetNet: '$5,000.00', effectiveRate: '22%', estimatedGross: '$6,410.26', taxWithheld: '$1,410.26' },
    { targetNet: '$6,000.00', effectiveRate: '25%', estimatedGross: '$8,000.00', taxWithheld: '$2,000.00' },
    { targetNet: '$8,000.00', effectiveRate: '28%', estimatedGross: '$11,111.11', taxWithheld: '$3,111.11' },
    { targetNet: '$10,000.00', effectiveRate: '30%', estimatedGross: '$14,285.71', taxWithheld: '$4,285.71' },
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
    name: 'Reverse Income Tax Calculator (Net to Gross)',
    url: 'https://www.reversetaxcalculator.pro/reverse-income-tax-calculator',
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

      <BreadcrumbNav items={[{ name: 'Reverse Income Tax Calculator', url: '/reverse-income-tax-calculator' }]} />

      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="space-y-2 pb-2 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            Net-to-Gross Paycheck Estimator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reverse Income Tax Calculator (Net to Gross)
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Estimate the gross salary required to take home your target net pay based on your effective income tax rate.
          </p>
        </header>

        {/* 2-Column Hero: Calculator + Formula Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CalculatorCard initialMode="income-tax" hideModeSwitcher />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 m-0">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                <span>The Net to Gross Formula</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Unlike sales tax, income taxes are deducted from gross earnings rather than added to net pay.
              </p>

              <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-brand-900 space-y-1">
                <div>Gross Salary = Desired Net Pay ÷ (1 - Tax Rate)</div>
                <div>Estimated Tax = Gross Salary - Net Pay</div>
              </div>

              <div className="text-xs text-slate-700 bg-amber-50 border border-amber-200 rounded-xl p-3 leading-relaxed">
                <strong>Example:</strong> To take home <strong>$4,000.00</strong> net with a <strong>20%</strong> effective tax rate:
                <br />
                • $4,000 ÷ (1 - 0.20) = $4,000 ÷ 0.80 = <strong>$5,000.00 Gross</strong>
                <br />
                • Total Tax & Deductions = <strong>$1,000.00</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Reference Table */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-brand-600" />
              <span>Net to Gross Salary Reference Table</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Estimated gross salary requirements for common monthly take-home pay targets:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Target Net Pay</th>
                  <th className="py-3 px-4 font-bold">Effective Tax Rate</th>
                  <th className="py-3 px-4 font-bold text-brand-700">Estimated Gross Salary</th>
                  <th className="py-3 px-4 font-bold">Estimated Tax Withheld</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {netToGrossConversionTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{row.targetNet}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-700">{row.effectiveRate}</td>
                    <td className="py-2.5 px-4 font-bold text-brand-700">{row.estimatedGross}</td>
                    <td className="py-2.5 px-4 text-slate-600">{row.taxWithheld}</td>
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
