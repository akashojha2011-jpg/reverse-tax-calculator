import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'

export const metadata: Metadata = {
  title: 'Reverse Tax Formula — How to Calculate Tax Backwards',
  description:
    'Complete guide to reverse tax formulas. Learn the exact algebra to find pre-tax net prices, tax amounts, and solve tax rates from total gross amounts.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-tax-formula',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-tax-formula',
    title: 'Reverse Tax Formula — How to Calculate Tax Backwards',
    description:
      'Complete guide to reverse tax formulas. Learn the exact algebra to find pre-tax net prices, tax amounts, and solve tax rates from total gross amounts.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Tax Formula & Math Guide',
    description: 'Learn the exact mathematical formulas for calculating tax backwards.',
  },
}

export default function ReverseTaxFormulaPage() {
  const faqs = [
    {
      question: 'What is the general reverse tax formula?',
      answer:
        'The general reverse tax formula is: Net Price = Gross Total ÷ (1 + Tax Rate). Tax Amount = Gross Total - Net Price.',
    },
    {
      question: 'How do you solve for the tax rate percentage when you know net and gross?',
      answer:
        'Tax Rate % = [(Gross Amount ÷ Net Amount) - 1] × 100. For example, if net is $100 and gross is $115, Tax Rate = [(115 ÷ 100) - 1] × 100 = 15%.',
    },
    {
      question: 'Why doesn’t multiplying the gross by the tax percentage work?',
      answer:
        'Tax rate is defined as a percentage of the pre-tax (net) price, not the total gross price. Multiplying the gross by the tax rate calculates a percentage of a larger base, overestimating the tax paid.',
    },
    {
      question: 'How does the formula differ between Sales Tax and Payroll Income Tax?',
      answer:
        'Sales tax is added to pre-tax net cost: Net = Gross ÷ (1 + r). Payroll income tax is deducted from gross salary: Gross = Net ÷ (1 - r).',
    },
  ]

  const formulaSummaryTable = [
    { calculationType: 'Standard Reverse Tax (Sales Tax / VAT / GST)', knownVariables: 'Gross Total & Tax Rate %', targetResult: 'Pre-Tax Net Subtotal', formula: 'Net = Gross ÷ (1 + Tax Rate Decimal)' },
    { calculationType: 'Reverse Tax Amount Paid', knownVariables: 'Gross Total & Tax Rate %', targetResult: 'Tax Amount Paid ($)', formula: 'Tax = Gross - [Gross ÷ (1 + Tax Rate)]' },
    { calculationType: 'Tax Rate Solver', knownVariables: 'Gross Total & Net Subtotal', targetResult: 'Tax Rate (%)', formula: 'Rate % = [(Gross ÷ Net) - 1] × 100' },
    { calculationType: 'Payroll Net to Gross Salary', knownVariables: 'Target Net & Effective Tax Rate %', targetResult: 'Required Gross Salary', formula: 'Gross = Net ÷ (1 - Effective Rate Decimal)' },
    { calculationType: 'Reverse Tax & Tip Split', knownVariables: 'Gross Total, Tax % & Tip %', targetResult: 'Pre-Tax Net Food Subtotal', formula: 'Net = Gross ÷ (1 + Tax Rate + Tip Rate)' },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Reverse Tax Formula: How to Calculate Tax Backwards from a Total Price',
    description:
      'Mathematical guide and step-by-step formula derivations for calculating pre-tax net prices and tax paid from gross amounts.',
    author: {
      '@type': 'Organization',
      name: 'Reverse Tax Calculator Team',
      url: 'https://reversetaxcalculator.pro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reverse Tax Calculator',
      url: 'https://reversetaxcalculator.pro',
    },
    datePublished: '2026-01-01',
    dateModified: '2026-08-17',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbNav items={[{ name: 'Reverse Tax Formula', url: '/reverse-tax-formula' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="border-b border-slate-200 pb-4">
            <div className="text-xs text-slate-500 font-semibold mb-1">
              Last updated: <strong>August 2026</strong> | Universal Algebra Verified
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse Tax Formula & Math Guide
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Learn the exact mathematical formulas used to calculate pre-tax amounts, tax paid, and tax rates backwards from gross totals.
            </p>
          </header>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#algebraic-derivation" className="hover:underline">Algebraic Derivation of Reverse Sales Tax</a></li>
              <li><a href="#formula-summary-table" className="hover:underline">Complete Formula Reference Table</a></li>
              <li><a href="#solving-for-tax-rate" className="hover:underline">Solving for Tax Rate Given Net & Gross</a></li>
              <li><a href="#canadian-dual-tax-rules" className="hover:underline">Canadian Dual Tax Rules (GST + PST / QST)</a></li>
              <li><a href="#payroll-net-to-gross-formula" className="hover:underline">Payroll Net-to-Gross Salary Formula</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          {/* AI Answer-First Block */}
          <section className="bg-brand-50 border border-brand-200 rounded-2xl p-6 md:p-7">
            <h2 className="text-sm font-bold text-brand-900 mt-0 mb-2 uppercase tracking-wide">
              Summary Formula Answer
            </h2>
            <p className="text-slate-900 text-base md:text-lg leading-relaxed font-semibold mb-0">
              The universal reverse tax formula is: <br />
              <span className="font-mono bg-white px-3 py-1 rounded border border-brand-200 text-brand-700 inline-block my-2">
                Net Amount = Gross Total ÷ (1 + Tax Rate)
              </span>
              <br />
              To find the tax paid: <span className="font-mono bg-white px-3 py-1 rounded border border-brand-200 text-slate-800 inline-block">Tax Paid = Gross Total - Net Amount</span>. For example, a receipt of <strong>$107.00</strong> with a <strong>7% tax rate</strong> yields a pre-tax amount of <strong>$100.00</strong> ($107.00 ÷ 1.07) and <strong>$7.00 tax paid</strong>.
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="algebraic-derivation" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              1. Algebraic Derivation of Reverse Sales Tax
            </h2>
            <p>
              When tax is added to a transaction, the gross price ($G$) is equal to the net price ($N$) plus the tax amount ($T$).
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-sm space-y-2 my-4">
              <div>G = N + T</div>
              <div>Since Tax T = N × r (where r is the tax rate as a decimal):</div>
              <div>G = N + (N × r)</div>
              <div>G = N × (1 + r)</div>
              <div className="font-bold text-blue-700">N = G ÷ (1 + r)</div>
            </div>
            <p>
              This derivation proves why dividing by $(1 + r)$ is mathematically required when reversing sales tax, VAT, GST, or HST.
            </p>

            <h2 id="formula-summary-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              2. Complete Formula Reference Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Calculation Type</th>
                    <th className="p-2.5">Known Inputs</th>
                    <th className="p-2.5">Target Output</th>
                    <th className="p-2.5">Exact Formula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {formulaSummaryTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{row.calculationType}</td>
                      <td className="p-2.5">{row.knownVariables}</td>
                      <td className="p-2.5 font-semibold text-slate-800">{row.targetResult}</td>
                      <td className="p-2.5 font-mono text-blue-600 font-bold">{row.formula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="solving-for-tax-rate" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              3. Solving for Tax Rate Given Net & Gross
            </h2>
            <p>
              If you know both the pre-tax net price ($N$) and the tax-included gross total ($G$), you can solve for the tax rate percentage ($r\%$) using:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 text-blue-700 font-bold">
              Tax Rate % = [(Gross ÷ Net) - 1] × 100
            </div>
            <p>
              <strong>Worked Example:</strong> If an invoice lists a net price of $100.00 and a total price of $115.00:
              <br />
              Rate = [($115.00 ÷ $100.00) - 1] × 100 = (1.15 - 1) × 100 = <strong>15%</strong>.
            </p>

            <h2 id="canadian-dual-tax-rules" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              4. Canadian Dual Tax Rules (GST + PST / QST)
            </h2>
            <p>
              In dual-tax jurisdictions like Quebec or British Columbia, two taxes apply to the transaction.
            </p>
            <div className="space-y-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mt-0 mb-1">
                  A. Additive Rule (Modern Quebec QST & BC PST)
                </h3>
                <p className="text-xs text-slate-700 mb-0 font-mono">
                  Gross = Net × (1 + rate1 + rate2)
                  <br />
                  Net = Gross ÷ (1 + 0.05 GST + 0.09975 QST) = Gross ÷ 1.14975
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mt-0 mb-1">
                  B. Historical Compounded Rule
                </h3>
                <p className="text-xs text-slate-700 mb-0 font-mono">
                  Gross = Net × (1 + rate1) × (1 + rate2)
                </p>
              </div>
            </div>

            <h2 id="payroll-net-to-gross-formula" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              5. Payroll Net-to-Gross Salary Formula
            </h2>
            <p>
              Unlike flat sales taxes where tax is added to the net ($G = N \times (1 + r)$), income taxes are withheld as a percentage of the <em>gross salary</em> ($N = G \times (1 - t)$).
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700">
              Estimated Gross Salary = Target Net Pay ÷ (1 - Effective Tax Rate)
            </div>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Calculators Using These Formulas" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard initialMode="sales-tax" defaultGross={107} defaultTaxRate={7} taxName="Sales Tax" />
        </div>
      </div>
    </>
  )
}
