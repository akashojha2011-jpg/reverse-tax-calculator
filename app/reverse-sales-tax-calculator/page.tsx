import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { Percent, Receipt, Table, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Reverse Sales Tax Calculator — Calculate Pre-Tax Price & Tax Paid',
  description:
    'Free reverse sales tax calculator. Enter your total receipt price to instantly get the pre-tax net amount and sales tax paid. Covers all 50 US states and local rates.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/reverse-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/reverse-sales-tax-calculator',
    title: 'Free Reverse Sales Tax Calculator — Calculate Pre-Tax Price & Tax Paid',
    description:
      'Free reverse sales tax calculator: Enter total price & instantly get pre-tax amount & tax paid. All 50 US states + local rates supported.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reverse Sales Tax Calculator',
    description:
      'Calculate pre-tax price and sales tax paid backwards from any receipt total.',
  },
}

export default function ReverseSalesTaxPage() {
  const faqs = [
    {
      question: 'How do I calculate reverse sales tax?',
      answer:
        'To calculate reverse sales tax, divide your total gross price by 1 plus the sales tax rate in decimal format (e.g., 1 + 0.07 = 1.07 for 7% tax). Subtract the pre-tax net subtotal from the gross bill to find the exact sales tax paid.',
    },
    {
      question: 'What is the formula for a reverse sales tax calculation?',
      answer:
        'Pre-Tax Net Price = Total Gross Price ÷ (1 + [Sales Tax Rate ÷ 100]). Sales Tax Paid = Total Gross Price - Pre-Tax Net Price.',
    },
    {
      question: 'Why can’t I just subtract the tax percentage directly from the total bill?',
      answer:
        'Subtracting 7% directly from $107 yields $99.51, which is incorrect. Sales tax is legally levied on the lower pre-tax base ($100), not the final price ($107). Dividing by (1 + tax rate) reverses the addition accurately.',
    },
    {
      question: 'How does state sales tax vary across the US?',
      answer:
        'State sales tax base rates range from 0% (in Oregon, Delaware, Montana, New Hampshire, Alaska) to 7.25% in California. Local municipal and county taxes push combined maximum rates up to 11.5% in Alabama and Louisiana.',
    },
    {
      question: 'Why might my reverse tax calculation differ slightly from a printed receipt?',
      answer:
        'Small 1-to-2 cent differences can happen when a receipt has tax-exempt items (such as groceries or prescription drugs), when tax is calculated line-by-line rather than on the transaction total, or due to regional half-up rounding rules.',
    },
  ]

  const stateTaxTableData = [
    { state: 'Alabama', stateRate: '4.00%', localRate: '5.29%', maxRate: '11.50%', foodTax: '3.00% (Reduced)' },
    { state: 'Alaska', stateRate: '0.00%', localRate: '1.76%', maxRate: '7.85%', foodTax: 'Exempt' },
    { state: 'Arizona', stateRate: '5.60%', localRate: '2.77%', maxRate: '11.20%', foodTax: 'Exempt' },
    { state: 'Arkansas', stateRate: '6.50%', localRate: '2.94%', maxRate: '11.625%', foodTax: '0.125% (Reduced)' },
    { state: 'California', stateRate: '7.25%', localRate: '1.60%', maxRate: '10.75%', foodTax: 'Exempt' },
    { state: 'Colorado', stateRate: '2.90%', localRate: '4.90%', maxRate: '11.20%', foodTax: 'Exempt' },
    { state: 'Connecticut', stateRate: '6.35%', localRate: '0.00%', maxRate: '6.35%', foodTax: 'Exempt' },
    { state: 'Delaware', stateRate: '0.00%', localRate: '0.00%', maxRate: '0.00%', foodTax: 'Exempt' },
    { state: 'District of Columbia', stateRate: '6.00%', localRate: '0.00%', maxRate: '6.00%', foodTax: 'Exempt' },
    { state: 'Florida', stateRate: '6.00%', localRate: '1.05%', maxRate: '7.50%', foodTax: 'Exempt' },
    { state: 'Georgia', stateRate: '4.00%', localRate: '3.38%', maxRate: '9.00%', foodTax: 'Exempt' },
    { state: 'Hawaii', stateRate: '4.00%', localRate: '0.44%', maxRate: '4.50%', foodTax: 'Taxable' },
    { state: 'Idaho', stateRate: '6.00%', localRate: '0.03%', maxRate: '9.00%', foodTax: 'Taxable' },
    { state: 'Illinois', stateRate: '6.25%', localRate: '2.61%', maxRate: '11.00%', foodTax: '1.00% (Reduced)' },
    { state: 'Indiana', stateRate: '7.00%', localRate: '0.00%', maxRate: '7.00%', foodTax: 'Exempt' },
    { state: 'Iowa', stateRate: '6.00%', localRate: '0.94%', maxRate: '7.00%', foodTax: 'Exempt' },
    { state: 'Kansas', stateRate: '6.50%', localRate: '2.20%', maxRate: '10.60%', foodTax: '2.00% (Reduced)' },
    { state: 'Kentucky', stateRate: '6.00%', localRate: '0.00%', maxRate: '6.00%', foodTax: 'Exempt' },
    { state: 'Louisiana', stateRate: '4.45%', localRate: '5.11%', maxRate: '11.45%', foodTax: 'Exempt' },
    { state: 'Maine', stateRate: '5.50%', localRate: '0.00%', maxRate: '5.50%', foodTax: 'Exempt' },
    { state: 'Maryland', stateRate: '6.00%', localRate: '0.00%', maxRate: '6.00%', foodTax: 'Exempt' },
    { state: 'Massachusetts', stateRate: '6.25%', localRate: '0.00%', maxRate: '6.25%', foodTax: 'Exempt' },
    { state: 'Michigan', stateRate: '6.00%', localRate: '0.00%', maxRate: '6.00%', foodTax: 'Exempt' },
    { state: 'Minnesota', stateRate: '6.875%', localRate: '1.16%', maxRate: '9.03%', foodTax: 'Exempt' },
    { state: 'Mississippi', stateRate: '7.00%', localRate: '0.07%', maxRate: '8.00%', foodTax: '7.00% (Taxable)' },
    { state: 'Missouri', stateRate: '4.225%', localRate: '4.16%', maxRate: '10.10%', foodTax: '1.225% (Reduced)' },
    { state: 'Montana', stateRate: '0.00%', localRate: '0.00%', maxRate: '3.00%', foodTax: 'Exempt' },
    { state: 'Nebraska', stateRate: '5.50%', localRate: '1.47%', maxRate: '8.00%', foodTax: 'Exempt' },
    { state: 'Nevada', stateRate: '6.85%', localRate: '1.39%', maxRate: '8.375%', foodTax: 'Exempt' },
    { state: 'New Hampshire', stateRate: '0.00%', localRate: '0.00%', maxRate: '0.00%', foodTax: 'Exempt' },
    { state: 'New Jersey', stateRate: '6.625%', localRate: '0.00%', maxRate: '6.625%', foodTax: 'Exempt' },
    { state: 'New Mexico', stateRate: '4.875%', localRate: '2.725%', maxRate: '9.0625%', foodTax: 'Exempt' },
    { state: 'New York', stateRate: '4.00%', localRate: '4.53%', maxRate: '8.875%', foodTax: 'Exempt' },
    { state: 'North Carolina', stateRate: '4.75%', localRate: '2.24%', maxRate: '7.50%', foodTax: '2.00% (Reduced)' },
    { state: 'North Dakota', stateRate: '5.00%', localRate: '1.96%', maxRate: '8.50%', foodTax: 'Exempt' },
    { state: 'Ohio', stateRate: '5.75%', localRate: '1.49%', maxRate: '8.00%', foodTax: 'Exempt' },
    { state: 'Oklahoma', stateRate: '4.50%', localRate: '4.49%', maxRate: '11.50%', foodTax: 'Taxable' },
    { state: 'Oregon', stateRate: '0.00%', localRate: '0.00%', maxRate: '0.00%', foodTax: 'Exempt' },
    { state: 'Pennsylvania', stateRate: '6.00%', localRate: '0.34%', maxRate: '8.00%', foodTax: 'Exempt' },
    { state: 'Rhode Island', stateRate: '7.00%', localRate: '0.00%', maxRate: '7.00%', foodTax: 'Exempt' },
    { state: 'South Carolina', stateRate: '6.00%', localRate: '1.43%', maxRate: '9.00%', foodTax: 'Exempt' },
    { state: 'South Dakota', stateRate: '4.20%', localRate: '1.91%', maxRate: '6.50%', foodTax: '4.20% (Taxable)' },
    { state: 'Tennessee', stateRate: '7.00%', localRate: '2.55%', maxRate: '9.75%', foodTax: '4.00% (Reduced)' },
    { state: 'Texas', stateRate: '6.25%', localRate: '1.95%', maxRate: '8.25%', foodTax: 'Exempt' },
    { state: 'Utah', stateRate: '6.10%', localRate: '1.09%', maxRate: '9.05%', foodTax: '3.00% (Reduced)' },
    { state: 'Vermont', stateRate: '6.00%', localRate: '0.36%', maxRate: '7.00%', foodTax: 'Exempt' },
    { state: 'Virginia', stateRate: '5.30%', localRate: '0.45%', maxRate: '7.00%', foodTax: '1.00% (Reduced)' },
    { state: 'Washington', stateRate: '6.50%', localRate: '2.88%', maxRate: '10.60%', foodTax: 'Exempt' },
    { state: 'West Virginia', stateRate: '6.00%', localRate: '0.57%', maxRate: '7.00%', foodTax: 'Exempt' },
    { state: 'Wisconsin', stateRate: '5.00%', localRate: '0.43%', maxRate: '6.75%', foodTax: 'Exempt' },
    { state: 'Wyoming', stateRate: '4.00%', localRate: '1.36%', maxRate: '6.00%', foodTax: 'Exempt' },
  ]

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://www.reversetaxcalculator.pro/reverse-sales-tax-calculator#app',
        name: 'Reverse Sales Tax Calculator',
        url: 'https://www.reversetaxcalculator.pro/reverse-sales-tax-calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.reversetaxcalculator.pro/reverse-sales-tax-calculator#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <BreadcrumbNav items={[{ name: 'Reverse Sales Tax Calculator', url: '/reverse-sales-tax-calculator' }]} />

      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="space-y-2 pb-2 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
            <Receipt className="w-3.5 h-3.5" />
            US Sales Tax Tool
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reverse Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Calculate the pre-tax price and sales tax paid backwards from any receipt or invoice total.
          </p>
        </header>

        {/* 2-Column Hero: Calculator + Formula Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CalculatorCard initialMode="sales-tax" defaultGross={107} defaultTaxRate={7} taxName="Sales Tax" />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 m-0">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                <span>Reverse Sales Tax Formula</span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed m-0">
                To extract the original price before sales tax was added:
              </p>

              <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-brand-900 space-y-1">
                <div>Net Subtotal = Total Receipt ÷ (1 + Tax Rate)</div>
                <div>Sales Tax Paid = Total Receipt - Net Subtotal</div>
              </div>

              <div className="text-xs text-slate-700 bg-blue-50/70 border border-blue-200 rounded-xl p-3 leading-relaxed">
                <strong>Example:</strong> For a <strong>$107.00</strong> receipt with <strong>7.00%</strong> sales tax:
                <br />
                • $107.00 ÷ 1.07 = <strong>$100.00 Net Price</strong>
                <br />
                • $107.00 - $100.00 = <strong>$7.00 Sales Tax Paid</strong>
              </div>
            </div>
          </div>
        </section>

        {/* 50-State Sales Tax Rates Table */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-brand-600" />
              <span>US State & Local Sales Tax Rates Reference (2026)</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Current state base rates, average local additions, and max combined rates for all 50 states and Washington D.C.:
            </p>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-slate-200 rounded-xl">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-slate-100 font-bold text-slate-800 z-10 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">State Rate</th>
                  <th className="py-3 px-4">Avg. Local Rate</th>
                  <th className="py-3 px-4 text-brand-700">Max Combined Rate</th>
                  <th className="py-3 px-4">Grocery Food Tax</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stateTaxTableData.map((row) => {
                  const stateSlug = row.state.toLowerCase().replace(/\s+/g, '-')
                  return (
                    <tr key={row.state} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-slate-900">{row.state}</td>
                      <td className="py-2.5 px-4 font-medium text-slate-800">{row.stateRate}</td>
                      <td className="py-2.5 px-4 text-slate-600">{row.localRate}</td>
                      <td className="py-2.5 px-4 font-bold text-brand-700">{row.maxRate}</td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">{row.foodTax}</td>
                      <td className="py-2.5 px-4 text-xs">
                        <Link
                          href={`/${stateSlug}-reverse-sales-tax-calculator`}
                          className="text-brand-600 font-semibold hover:underline"
                        >
                          Calculate →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
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
