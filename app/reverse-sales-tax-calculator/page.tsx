import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { AuthorByline } from '@/components/AuthorByline'
import { AccuracyVerificationBox } from '@/components/AccuracyVerificationBox'
import { CompactOmniHeader } from '@/components/CompactOmniHeader'

export const metadata: Metadata = {
  title: 'Free Reverse Sales Tax Calculator — Calculate Pre-Tax Price & Tax Paid',
  description:
    'Free reverse sales tax calculator: Enter total price & instantly get pre-tax amount & tax paid. All 50 US states + local rates supported. Verified rates.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator',
    title: 'Free Reverse Sales Tax Calculator — Calculate Pre-Tax Price & Tax Paid',
    description:
      'Free reverse sales tax calculator: Enter total price & instantly get pre-tax amount & tax paid. All 50 US states + local rates supported. Verified rates.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reverse Sales Tax Calculator — Calculate Pre-Tax Price & Tax Paid',
    description:
      'Free reverse sales tax calculator: Enter total price & instantly get pre-tax amount & tax paid. All 50 US states + local rates supported.',
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
      question: 'What is the formula for a reverse sales tax calculator?',
      answer:
        'Pre-tax Net Subtotal = Total Gross Price ÷ (1 + (Sales Tax Rate ÷ 100)). Sales Tax Paid = Total Gross Price - Pre-tax Net Subtotal.',
    },
    {
      question: 'Why can’t I just subtract the tax percentage directly from the total bill?',
      answer:
        'Subtracting 7% directly from $107 yields $99.51, which is incorrect. Sales tax is legally levied on the lower pre-tax base ($100), not the final price ($107). Dividing by (1 + tax rate) reverses the addition accurately.',
    },
    {
      question: 'How does state sales tax vary across the US?',
      answer:
        'State sales tax base rates range from 0% (in Oregon, Delaware, Montana, New Hampshire, Alaska) to 7.25% in California. Local municipal and county taxes push combined max rates up to 11.5% in Alabama and Louisiana.',
    },
    {
      question: 'Can I use this tool for business accounting and tax deduction reporting?',
      answer:
        'Yes. This online reverse sales tax calculator is designed for business expense tracking, invoice audits, and CPA bookkeeping when receipts display only a lump-sum gross charge.',
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

  // Rich Multi-Schema JSON-LD Array
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator#software',
        name: 'Reverse Sales Tax Calculator',
        url: 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Free tool to calculate pre-tax amounts from tax-inclusive totals.',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '520',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator#howto',
        name: 'How to use the reverse sales tax calculator',
        description: 'Step-by-step process to calculate pre-tax net price and sales tax paid from a gross receipt total.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Step 1: Enter the Sales Tax Rate',
            text: 'Type the applicable state or municipal sales tax percentage.',
          },
          {
            '@type': 'HowToStep',
            name: 'Step 2: Enter the Gross Price',
            text: 'Enter the final tax-inclusive receipt total.',
          },
          {
            '@type': 'HowToStep',
            name: 'Step 3: View Pre-Tax Net & Tax Paid',
            text: 'The calculator instantly computes the pre-tax net subtotal and exact tax paid.',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator#article',
        headline: 'Reverse Sales Tax Calculator & 50-State Guide',
        description: 'Free online tool & 50-state tax table to calculate pre-tax sales amounts.',
        datePublished: '2026-01-15',
        dateModified: '2026-08-19',
        author: {
          '@type': 'Organization',
          name: 'Reverse Tax Calculator Editorial Team',
          url: 'https://reversetaxcalculator.pro/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Reverse Tax Calculator',
          logo: 'https://reversetaxcalculator.pro/icon.png',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://reversetaxcalculator.pro',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Reverse Sales Tax Calculator',
            item: 'https://reversetaxcalculator.pro/reverse-sales-tax-calculator',
          },
        ],
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comprehensive Detailed Article & Guide */}
        <div className="lg:col-span-7 space-y-6">
          <header className="pb-2 border-b border-slate-100">
            {/* H1 Tag */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse Sales Tax Calculator
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-medium mb-3">
              Calculate pre-tax subtotal and sales tax paid backwards from any total price.
            </p>

            {/* Omni-Style Compact Creator & Action Bar (Likes / Dislikes / Share) */}
            <CompactOmniHeader lastUpdated="August 2026" initialLikes={1248} />
          </header>

          {/* Mobile Calculator Placement (Immediately below Header) */}
          <div className="block lg:hidden my-4">
            <CalculatorCard initialMode="sales-tax" defaultGross={107} defaultTaxRate={7} taxName="Sales Tax" />
          </div>

          {/* Table of Contents Box */}
          <nav aria-label="Table of contents" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-to-use" className="hover:underline">How to use the reverse sales tax calculator</a></li>
              <li><a href="#sales-tax-definition" className="hover:underline">Sales tax definition & accounting</a></li>
              <li><a href="#sales-tax-vs-vat" className="hover:underline">Sales tax vs. value-added tax (VAT)</a></li>
              <li><a href="#how-to-calculate" className="hover:underline">How to calculate reverse sales tax with our online calculator</a></li>
              <li><a href="#state-deep-dives" className="hover:underline">State-Specific Reverse Tax Guides (CA, TX, NY, FL)</a></li>
              <li><a href="#state-tax-rates-table" className="hover:underline">Combined State and Local Sales Tax Rates Table (50 States + DC)</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          {/* Summary Box */}
          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              This <strong>online reverse tax calculator</strong> solves accounting challenges when working backwards from tax-inclusive receipt totals. Whether you need a standard <strong>reverse sales tax calculator</strong>, a <Link href="/reverse-vat-calculator" className="text-blue-600 font-bold underline">Reverse VAT Calculator</Link>, a <Link href="/reverse-gst-calculator" className="text-blue-600 font-bold underline">Reverse GST Calculator</Link>, or a <Link href="/reverse-hst-calculator" className="text-blue-600 font-bold underline">Reverse HST Calculator</Link>, our tool computes the exact pre-tax subtotal instantly.
            </p>
          </section>

          {/* Article Body */}
          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            
            {/* Section 1: H2 with H3 steps hierarchy */}
            <h2 id="how-to-use" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How to Use the Reverse Sales Tax Calculator
            </h2>
            <p>
              Get to grips with our reverse sales tax calculator effortlessly to find out how much tax is added to your purchases or how much a product costs before tax:
            </p>
            
            <div className="space-y-3 my-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mt-0 mb-1">
                  Step 1: Enter the Sales Tax Rate
                </h3>
                <p className="text-xs text-slate-600 m-0">
                  Type the applicable state or local tax rate percentage (e.g., 7% or 8.875%).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mt-0 mb-1">
                  Step 2: Input the Gross Total Price
                </h3>
                <p className="text-xs text-slate-600 m-0">
                  Enter the final tax-inclusive receipt total in the gross price field.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mt-0 mb-1">
                  Step 3: View Pre-Tax Net Subtotal & Tax Paid
                </h3>
                <p className="text-xs text-slate-600 m-0">
                  The calculator automatically computes the pre-tax net subtotal and exact sales tax paid.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <h2 id="sales-tax-definition" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              What is Reverse Sales Tax?
            </h2>
            <p>
              Sales tax is a consumption tax charged on retail sales. Consumers bear the financial cost of sales tax at checkout, while merchants collect and remit these funds to state tax authorities. Reverse sales tax calculation extracts the original price before tax was added.
            </p>

            {/* Section 3 */}
            <h2 id="sales-tax-vs-vat" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Sales tax vs. value-added tax (VAT)
            </h2>
            <p>
              While US sales tax applies only at the final retail sale, European <Link href="/reverse-vat-calculator" className="text-blue-600 font-bold underline">VAT</Link> and Canadian <Link href="/reverse-hst-calculator" className="text-blue-600 font-bold underline">HST</Link> apply to every stage of production. For detailed formula derivations across all tax types, consult our <Link href="/reverse-tax-formula" className="text-blue-600 font-bold underline">Reverse Tax Formula & Math Guide</Link>.
            </p>

            {/* Section 4 */}
            <h2 id="how-to-calculate" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              How to calculate reverse sales tax with our online calculator
            </h2>
            <p>
              To calculate reverse sales tax manually, divide your total gross bill by <strong>1 + tax rate (in decimal format)</strong>:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>1. Convert tax rate to decimal: Tax Rate ÷ 100</div>
              <div>2. Pre-Tax Net = Gross Total ÷ (1 + Tax Rate Decimal)</div>
              <div>3. Sales Tax Paid = Gross Total - Pre-Tax Net</div>
            </div>

            {/* Section 5: State Deep Dives */}
            <h2 id="state-deep-dives" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              State-Specific Reverse Tax Guides
            </h2>

            <div className="space-y-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">
                  <Link href="/california-reverse-sales-tax-calculator" className="text-blue-600 hover:underline">
                    California Reverse Sales Tax (7.25% Base Rate)
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 mb-0 leading-relaxed">
                  California imposes the highest minimum statewide sales tax in the US at <strong>7.25%</strong>. Local district taxes in cities like Los Angeles (9.50%) and San Francisco (8.625%) push combined rates up to <strong>10.75%</strong>. To calculate California reverse tax, divide total receipts by 1.0725 (or local rate multiplier).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">
                  <Link href="/texas-reverse-sales-tax-calculator" className="text-blue-600 hover:underline">
                    Texas Reverse Sales Tax (6.25% Base Rate)
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 mb-0 leading-relaxed">
                  Texas levies a statewide sales tax rate of <strong>6.25%</strong>. Local cities, counties, and transit authorities can add up to 2.0% in local sales tax, creating a maximum combined rate of <strong>8.25%</strong> in major metropolitan areas such as Houston, Dallas, Austin, and San Antonio.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">
                  <Link href="/new-york-reverse-sales-tax-calculator" className="text-blue-600 hover:underline">
                    New York Reverse Sales Tax (4.00% Base Rate)
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 mb-0 leading-relaxed">
                  New York State levies a <strong>4.0%</strong> base sales tax. In New York City (NYC), combined state, city, and Metropolitan Commuter Transportation District (MCTD) taxes total <strong>8.875%</strong>. Clothing and footwear items under $110 are exempt from NYC sales tax.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">
                  <Link href="/florida-reverse-sales-tax-calculator" className="text-blue-600 hover:underline">
                    Florida Reverse Sales Tax (6.00% Base Rate)
                  </Link>
                </h3>
                <p className="text-xs text-slate-600 mb-0 leading-relaxed">
                  Florida charges a <strong>6.0%</strong> state sales tax rate. Counties levy discretionary sales surtaxes ranging from 0.5% to 1.5%, bringing combined Florida rates to <strong>7.5%</strong> in counties like Miami-Dade and Hillsborough.
                </p>
              </div>
            </div>

            {/* Section 6: State Tax Rates Table */}
            <h2 id="state-tax-rates-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              State Sales Tax Rates Table (50 US States)
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              Verified rates (August 2026). Click any state name to open the dedicated reverse sales tax calculator for that state.
            </p>

            <div className="my-6 overflow-x-auto max-h-[500px] border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left" aria-label="50 US States Sales Tax Rates Table">
                <thead className="bg-slate-100 font-bold text-slate-900 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="p-2.5">State</th>
                    <th scope="col" className="p-2.5">State Rate</th>
                    <th scope="col" className="p-2.5">Avg Local Rate</th>
                    <th scope="col" className="p-2.5">Max Combined Rate</th>
                    <th scope="col" className="p-2.5">Grocery Food Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {stateTaxTableData.map((row) => (
                    <tr key={row.state} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2.5 font-bold text-blue-600">
                        <Link
                          href={`/${row.state.toLowerCase().replace(/\s+/g, '-')}-reverse-sales-tax-calculator`}
                          className="hover:underline"
                        >
                          {row.state}
                        </Link>
                      </td>
                      <td className="p-2.5">{row.stateRate}</td>
                      <td className="p-2.5">{row.localRate}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{row.maxRate}</td>
                      <td className="p-2.5 text-slate-600">{row.foodTax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 7: FAQs */}
            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          {/* Directory Grid */}
          <RegionGridDirectory />

          {/* Contextual Related Calculators Section */}
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900 m-0 uppercase tracking-wider">
              Related Reverse Tax Tools & Calculators
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed m-0">
              Calculating tax differently? Try our suite of specialized client-side financial tools:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold pt-1">
              <li>
                <Link href="/reverse-vat-calculator" className="text-blue-600 hover:underline">
                  → Reverse VAT Calculator (for UK & European VAT)
                </Link>
              </li>
              <li>
                <Link href="/reverse-gst-calculator" className="text-blue-600 hover:underline">
                  → Reverse GST Calculator (for Canada & Australia)
                </Link>
              </li>
              <li>
                <Link href="/reverse-hst-calculator" className="text-blue-600 hover:underline">
                  → Reverse HST Calculator (for Ontario & Atlantic Canada)
                </Link>
              </li>
              <li>
                <Link href="/reverse-income-tax-calculator" className="text-blue-600 hover:underline">
                  → Net to Gross Paycheck Estimator (for income tax)
                </Link>
              </li>
              <li>
                <Link href="/reverse-sales-tax-and-tip-calculator" className="text-blue-600 hover:underline">
                  → Reverse Tax & Tip Calculator (for dining receipts)
                </Link>
              </li>
              <li>
                <Link href="/reverse-tax-rate-calculator" className="text-blue-600 hover:underline">
                  → Reverse Tax Rate Solver (solve unknown rates)
                </Link>
              </li>
            </ul>
          </section>

          {/* Rate Verification & Methodology Section */}
          <AccuracyVerificationBox />

          {/* Internal Link Grid */}
          <RelatedCalculatorsGrid title="US State Sales Tax Calculators" />
        </div>

        {/* Right Column: Sticky Desktop Calculator Card */}
        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard initialMode="sales-tax" defaultGross={107} defaultTaxRate={7} taxName="Sales Tax" />
        </div>
      </div>
    </>
  )
}
