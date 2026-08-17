import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'

export const metadata: Metadata = {
  title: 'Reverse Sales Tax and Tip Calculator — Restaurant Receipt Split',
  description:
    'Free online reverse sales tax and tip calculator. Instantly split total credit card restaurant bills into pre-tax food subtotal, sales tax paid, and tip amount.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-sales-tax-and-tip-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-sales-tax-and-tip-calculator',
    title: 'Reverse Sales Tax and Tip Calculator — Restaurant Receipt Split',
    description:
      'Split restaurant charges backwards into food subtotal (net), sales tax amount, and tip paid.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax and Tip Calculator',
    description: 'Reverse calculate food subtotal, tax, and tip from total restaurant receipts.',
  },
}

export default function ReverseTaxAndTipPage() {
  const faqs = [
    {
      question: 'How do you calculate food subtotal backwards from restaurant total?',
      answer:
        'Divide total receipt amount by (1 + Tax Rate + Tip Rate). For example, a $123 total with 8% sales tax and 15% tip equals $123 ÷ (1 + 0.08 + 0.15) = $123 ÷ 1.23 = $100.00 food subtotal.',
    },
    {
      question: 'Is tip usually calculated on pre-tax or tax-included total?',
      answer:
        'Standard US dining etiquette recommends tipping on the pre-tax food subtotal. Our reverse tax and tip calculator defaults to subtotal tipping.',
    },
    {
      question: 'Can this tool handle business expense receipt splitting for IRS compliance?',
      answer:
        'Yes. Many corporate expense policies disallow tipping over 18% or require separate tax reporting. This tool isolates food, tax, and tip line items accurately.',
    },
    {
      question: 'What if tip was calculated on the post-tax total instead of pre-tax subtotal?',
      answer: 'If tip was calculated on the post-tax total, first reverse sales tax to get the post-tax subtotal, then apply the tip percentage.',
    },
  ]

  const receiptSplitTable = [
    { totalPaid: '$123.00', taxRate: '8%', tipRate: '15%', foodSubtotal: '$100.00', taxPaid: '$8.00', tipPaid: '$15.00' },
    { totalPaid: '$126.00', taxRate: '8%', tipRate: '18%', foodSubtotal: '$100.00', taxPaid: '$8.00', tipPaid: '$18.00' },
    { totalPaid: '$128.00', taxRate: '8%', tipRate: '20%', foodSubtotal: '$100.00', taxPaid: '$8.00', tipPaid: '$20.00' },
    { totalPaid: '$254.00', taxRate: '7%', tipRate: '20%', foodSubtotal: '$200.00', taxPaid: '$14.00', tipPaid: '$40.00' },
    { totalPaid: '$381.00', taxRate: '7%', tipRate: '20%', foodSubtotal: '$300.00', taxPaid: '$21.00', tipPaid: '$60.00' },
  ]

  return (
    <>
      <BreadcrumbNav items={[{ name: 'Reverse Tax & Tip Calculator', url: '/reverse-sales-tax-and-tip-calculator' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="border-b border-slate-200 pb-4">
            <div className="text-xs text-slate-500 font-semibold mb-1">
              Last updated: <strong>August 2026</strong> | Restaurant Receipt Accounting Standard
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse Tax and Tip Calculator
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Split total restaurant charges backwards into food subtotal, sales tax, and tip.
            </p>
          </header>

          <div className="block lg:hidden my-6">
            <CalculatorCard initialMode="tax-and-tip" defaultGross={123} defaultTaxRate={8} hideModeSwitcher />
          </div>

          {/* Table of Contents */}
          <nav className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-restaurant-tax-and-tip-works" className="hover:underline">How reverse restaurant tax & tip calculation works</a></li>
              <li><a href="#the-combined-reverse-formula" className="hover:underline">The Combined Tax & Tip algebraic formula</a></li>
              <li><a href="#receipt-split-reference-table" className="hover:underline">Restaurant Receipt Split Reference Table</a></li>
              <li><a href="#business-dining-expense-policy" className="hover:underline">Business dining expense policy & IRS compliance</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              How Reverse Restaurant Tax & Tip Calculation Works (Answer-First Summary)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              When splitting a restaurant receipt, the total paid represents <strong>Food Subtotal + Sales Tax + Tip</strong>. Assuming tip is calculated on the pre-tax food subtotal, divide the total paid by <strong>1 + tax rate decimal + tip rate decimal</strong>. A <strong>$123.00</strong> receipt with <strong>8% tax</strong> and <strong>15% tip</strong> resolves to <strong>$100.00 food subtotal</strong>, <strong>$8.00 tax</strong>, and <strong>$15.00 tip</strong>.
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="how-restaurant-tax-and-tip-works" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How reverse restaurant tax & tip calculation works
            </h2>
            <p>
              When filing expense reports for business dining, splitting bills among colleagues, or accounting for corporate entertainment, credit card statements often show only a single lump-sum charge (e.g. $123.00). Using a <strong>reverse sales tax and tip calculator</strong> allows you to dissect the total into its three constituent elements: <strong>Food Subtotal (Net)</strong>, <strong>Sales Tax Paid</strong>, and <strong>Tip Paid</strong>.
            </p>

            <h2 id="the-combined-reverse-formula" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              The Combined Tax & Tip algebraic formula
            </h2>
            <p>
              Assuming tip is calculated on the pre-tax food subtotal (standard US dining norm):
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Food Subtotal = Total Paid ÷ (1 + (Sales Tax Rate ÷ 100) + (Tip Rate ÷ 100))</div>
              <div>Sales Tax Paid = Food Subtotal × (Sales Tax Rate ÷ 100)</div>
              <div>Tip Paid = Food Subtotal × (Tip Rate ÷ 100)</div>
            </div>
            <p>
              For a <strong>$123.00 total bill</strong> with an <strong>8% sales tax rate</strong> and a <strong>15% tip rate</strong>:
            </p>
            <ol className="list-decimal pl-6 space-y-1 text-slate-700 text-sm">
              <li>1 + 0.08 + 0.15 = 1.23</li>
              <li>Food Subtotal = $123.00 ÷ 1.23 = <strong>$100.00</strong></li>
              <li>Sales Tax Paid = $100.00 × 0.08 = <strong>$8.00</strong></li>
              <li>Tip Paid = $100.00 × 0.15 = <strong>$15.00</strong></li>
            </ol>

            <h2 id="receipt-split-reference-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Restaurant Receipt Split Reference Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Total Paid</th>
                    <th className="p-2.5">Tax Rate</th>
                    <th className="p-2.5">Tip Rate</th>
                    <th className="p-2.5">Food Subtotal</th>
                    <th className="p-2.5">Tax Amount</th>
                    <th className="p-2.5">Tip Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {receiptSplitTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900 font-mono">{row.totalPaid}</td>
                      <td className="p-2.5">{row.taxRate}</td>
                      <td className="p-2.5">{row.tipRate}</td>
                      <td className="p-2.5 font-bold text-blue-600 font-mono">{row.foodSubtotal}</td>
                      <td className="p-2.5 font-mono">{row.taxPaid}</td>
                      <td className="p-2.5 font-mono text-slate-800">{row.tipPaid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="business-dining-expense-policy" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Business dining expense policy & IRS compliance
            </h2>
            <p>
              Under IRS business expense rules and corporate travel policies:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 text-sm">
              <li>Corporate credit card audit teams require separating food costs from tips to enforce maximum 18-20% tipping limits.</li>
              <li>Under the 50% business meal deduction rule (IRS Publication 463), isolating the food subtotal ensures compliant tax deduction filing.</li>
            </ul>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Related Receipt Calculators" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard initialMode="tax-and-tip" defaultGross={123} defaultTaxRate={8} hideModeSwitcher />
        </div>
      </div>
    </>
  )
}
