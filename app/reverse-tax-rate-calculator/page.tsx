import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { CompactOmniHeader } from '@/components/CompactOmniHeader'

export const metadata: Metadata = {
  title: 'Reverse Tax Rate Calculator — Solve Tax Percentage',
  description:
    'Free online reverse tax rate calculator. Find the exact tax rate percentage charged when you know pre-tax net amount and total gross price. Calculate sales tax or VAT rate instantly.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-tax-rate-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-tax-rate-calculator',
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
        'Divide total gross price by pre-tax net price, subtract 1, and multiply by 100. Formula: Tax Rate % = [(Gross ÷ Net) - 1] × 100.',
    },
    {
      question: 'Example: How to find tax rate from $100 net and $107 gross?',
      answer:
        'Divide $107 by $100 = 1.07. Subtract 1 = 0.07. Multiply by 100 = 7% tax rate.',
    },
    {
      question: 'How do I solve for tax rate if I only have Net amount and Tax paid?',
      answer: 'Divide the tax paid by the net price and multiply by 100. Formula: Tax Rate % = (Tax Paid ÷ Net Price) × 100.',
    },
    {
      question: 'Can I use this tax rate solver for VAT and GST?',
      answer:
        'Yes. The rate solving formula works identically across US sales tax, UK/EU VAT, Canadian HST/PST, and global GST.',
    },
  ]

  const rateReferenceTable = [
    { net: '$100.00', gross: '$105.00', taxPaid: '$5.00', solvedRate: '5.00%' },
    { net: '$100.00', gross: '$106.25', taxPaid: '$6.25', solvedRate: '6.25%' },
    { net: '$100.00', gross: '$107.00', taxPaid: '$7.00', solvedRate: '7.00%' },
    { net: '$100.00', gross: '$108.875', taxPaid: '$8.875', solvedRate: '8.875%' },
    { net: '$100.00', gross: '$110.00', taxPaid: '$10.00', solvedRate: '10.00%' },
    { net: '$100.00', gross: '$113.00', taxPaid: '$13.00', solvedRate: '13.00%' },
    { net: '$100.00', gross: '$115.00', taxPaid: '$15.00', solvedRate: '15.00%' },
    { net: '$100.00', gross: '$120.00', taxPaid: '$20.00', solvedRate: '20.00%' },
  ]

  return (
    <>
      <BreadcrumbNav items={[{ name: 'Reverse Tax Rate Calculator', url: '/reverse-tax-rate-calculator' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="pb-2 border-b border-slate-100">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse Tax Rate Calculator
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-medium mb-3">
              Solve the exact unknown tax percentage from Gross total price and Net pre-tax subtotal.
            </p>

            <CompactOmniHeader lastUpdated="August 2026" initialLikes={543} />
          </header>

          <div className="block lg:hidden my-6">
            <CalculatorCard initialMode="solve-rate" defaultGross={110} hideModeSwitcher />
          </div>

          {/* Table of Contents */}
          <nav className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-to-solve-tax-rate" className="hover:underline">How to solve for tax rate percentage</a></li>
              <li><a href="#the-rate-solver-formulas" className="hover:underline">The Rate Solver algebraic formulas</a></li>
              <li><a href="#common-tax-rate-reference-table" className="hover:underline">Common Tax Rate Solved Reference Table</a></li>
              <li><a href="#real-world-accounting-applications" className="hover:underline">Real-world accounting & audit applications</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              How to Solve for Tax Rate Percentage (Answer-First Summary)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              To determine what sales tax or VAT percentage was applied to an invoice, divide the final gross total by the pre-tax net subtotal, subtract 1, and multiply by 100. For example, if net subtotal is <strong>$100.00</strong> and gross total is <strong>$107.00</strong>, the tax rate is <strong>7%</strong>.
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="how-to-solve-tax-rate" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How to solve for tax rate percentage
            </h2>
            <p>
              In commercial auditing, supplier invoice verification, and accounting reconciliation, you frequently encounter billing statements that display a subtotal amount and a total charge, but omit the explicit tax rate percentage. Using a <strong>reverse tax rate calculator</strong> enables you to reverse-engineer the exact tax percentage applied.
            </p>

            <h2 id="the-rate-solver-formulas" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              The Rate Solver algebraic formulas
            </h2>
            <p>
              Depending on which values are known on your invoice, choose the corresponding algebraic formula:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-2">
              <div>Method 1 (Gross & Net known): Tax Rate % = [(Gross Total ÷ Net Subtotal) - 1] × 100</div>
              <div>Method 2 (Tax Paid & Net known): Tax Rate % = (Tax Amount ÷ Net Subtotal) × 100</div>
              <div>Method 3 (Gross & Tax Paid known): Tax Rate % = [Tax Amount ÷ (Gross Total - Tax Amount)] × 100</div>
            </div>

            <h2 id="common-tax-rate-reference-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Common Tax Rate Solved Reference Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Pre-Tax Net</th>
                    <th className="p-2.5">Gross Total</th>
                    <th className="p-2.5">Tax Amount Paid</th>
                    <th className="p-2.5">Solved Tax Rate (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {rateReferenceTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono">{row.net}</td>
                      <td className="p-2.5 font-mono">{row.gross}</td>
                      <td className="p-2.5 font-mono text-slate-900">{row.taxPaid}</td>
                      <td className="p-2.5 font-bold text-blue-600 font-mono">{row.solvedRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="real-world-accounting-applications" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Real-world accounting & audit applications
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
              <li>
                <strong>Auditing Foreign Vendor Invoices:</strong> Confirming whether an international supplier billed 5%, 8%, 13%, 18%, or 20% tax.
              </li>
              <li>
                <strong>Detecting Billing Software Errors:</strong> Verifying that point-of-sale checkout systems applied the correct combined state, county, and city sales tax rate.
              </li>
              <li>
                <strong>Tax Compliance Reporting:</strong> Populating ERP systems (SAP, NetSuite, QuickBooks) with exact tax rate percentages when logging expenses.
              </li>
            </ul>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Related Tax Tools" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard initialMode="solve-rate" defaultGross={110} hideModeSwitcher />
        </div>
      </div>
    </>
  )
}
