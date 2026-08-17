import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'

export const metadata: Metadata = {
  title: 'Reverse Income Tax Calculator — Net to Gross Paycheck Estimator',
  description:
    'Free online reverse income tax calculator. Estimate required gross salary from target net take-home pay based on effective income tax rates.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-income-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-income-tax-calculator',
    title: 'Reverse Income Tax Calculator — Net to Gross Paycheck Estimator',
    description:
      'Estimate required gross salary from target net take-home pay based on effective income tax rates for USA, UK, Canada, Australia, and India.',
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
        'To estimate gross salary from target net pay, divide your desired net pay by (1 - Effective Tax Rate). For example, to take home $4,000 net with a 20% effective tax rate, divide $4,000 by 0.80 to get an estimated gross salary of $5,000.00.',
    },
    {
      question: 'Why is payroll tax different from flat sales tax?',
      answer:
        'Sales tax is added on top of a net price (Gross = Net × 1.07), while income tax is withheld from gross salary (Net = Gross × (1 - Tax Rate)). Furthermore, actual payroll withholding is progressive across income tax brackets.',
    },
    {
      question: 'Is this an authoritative payroll calculation?',
      answer:
        'No. This calculator provides a simplified estimate using a single effective flat rate. Actual payroll withholding depends on progressive tax brackets, local state/provincial taxes, and social security deductions (FICA/EI/CPP).',
    },
    {
      question: 'How do I find my effective income tax rate?',
      answer: 'Your effective income tax rate is your total annual tax paid divided by your total annual gross salary. For most middle earners in the US/UK/Canada, effective tax rates range between 15% and 30%.',
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

  return (
    <>
      <BreadcrumbNav items={[{ name: 'Reverse Income Tax Calculator', url: '/reverse-income-tax-calculator' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="border-b border-slate-200 pb-4">
            <div className="text-xs text-slate-500 font-semibold mb-1">
              Last updated: <strong>August 2026</strong> | Net-to-Gross Salary Guide
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse Income Tax Calculator (Net to Gross)
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Estimate required gross salary from target net take-home pay.
            </p>
          </header>

          <div className="block lg:hidden my-6">
            <CalculatorCard initialMode="income-tax" hideModeSwitcher />
          </div>

          {/* Table of Contents */}
          <nav className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-net-to-gross-works" className="hover:underline">How net-to-gross paycheck estimation works</a></li>
              <li><a href="#the-net-to-gross-payroll-formula" className="hover:underline">The Net to Gross mathematical formula</a></li>
              <li><a href="#net-to-gross-conversion-table" className="hover:underline">Net to Gross Salary Conversion Reference Table</a></li>
              <li><a href="#sales-tax-vs-payroll-withholding" className="hover:underline">Sales Tax vs. Payroll Income Tax Withholding</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              How Net-to-Gross Paycheck Estimation Works (Answer-First Summary)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              Income taxes are withheld as a percentage of gross pay. To estimate the gross salary required to achieve a target take-home pay, divide the desired net amount by <strong>1 - (Effective Tax Rate ÷ 100)</strong>. For example, a target net pay of <strong>$4,000.00</strong> at a <strong>20% effective tax rate</strong> requires an estimated gross pay of <strong>$5,000.00</strong> ($4,000 ÷ 0.80).
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="how-net-to-gross-works" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How net-to-gross paycheck estimation works
            </h2>
            <p>
              When negotiating job offers, contractor agreements, or salary requirements, employees frequently specify their target in terms of <strong>net take-home pay</strong> (e.g., *"I need $4,000 deposited into my bank account every month"*). However, corporate payroll systems operate on <strong>gross salary</strong>, deducting income tax and social security contributions before issuing paychecks. Using a <strong>reverse income tax calculator</strong> allows you to convert target net income into required gross salary.
            </p>

            <h2 id="the-net-to-gross-payroll-formula" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              The Net to Gross mathematical formula
            </h2>
            <p>
              Because income tax is deducted from gross pay rather than added to net pay, the formula differs from sales tax:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Estimated Gross Salary = Target Net Pay ÷ (1 - Effective Tax Rate Decimal)</div>
              <div>Estimated Tax Withheld = Estimated Gross Salary - Target Net Pay</div>
            </div>
            <p>
              If your target net take-home pay is <strong>$4,000.00</strong> and your effective combined tax rate (federal + state/provincial + FICA/EI) is <strong>20%</strong>:
            </p>
            <ol className="list-decimal pl-6 space-y-1 text-slate-700 text-sm">
              <li>1 - 0.20 = 0.80</li>
              <li>Gross Salary = $4,000.00 ÷ 0.80 = <strong>$5,000.00</strong></li>
              <li>Total Tax Withheld = $5,000.00 - $4,000.00 = <strong>$1,000.00</strong></li>
            </ol>

            <h2 id="net-to-gross-conversion-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Net to Gross Salary Conversion Reference Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Target Net Pay</th>
                    <th className="p-2.5">Effective Tax Rate</th>
                    <th className="p-2.5">Estimated Gross Salary</th>
                    <th className="p-2.5">Estimated Tax Withheld</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {netToGrossConversionTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900 font-mono">{row.targetNet}</td>
                      <td className="p-2.5 font-semibold text-slate-700">{row.effectiveRate}</td>
                      <td className="p-2.5 font-bold text-blue-600 font-mono">{row.estimatedGross}</td>
                      <td className="p-2.5 font-mono text-slate-800">{row.taxWithheld}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="sales-tax-vs-payroll-withholding" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Sales Tax vs. Payroll Income Tax Withholding
            </h2>
            <p>
              It is vital to recognize the mathematical difference between reversing sales tax vs. reversing payroll tax:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
              <li>
                <strong>Sales Tax (Additive):</strong> Added to pre-tax subtotal. Formula: $Gross = Net \times (1 + r)$. Divisor: $1 + r$.
              </li>
              <li>
                <strong>Income Tax (Deductive):</strong> Withheld from gross salary. Formula: $Net = Gross \times (1 - r)$. Divisor: $1 - r$.
              </li>
            </ul>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Related Financial Calculators" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard initialMode="income-tax" hideModeSwitcher />
        </div>
      </div>
    </>
  )
}
