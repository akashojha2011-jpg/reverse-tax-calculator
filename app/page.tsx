import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Calculator,
  ArrowRight,
  Receipt,
  Store,
  Briefcase,
  FileText,
  Percent,
  MinusCircle,
  MapPin,
  Layers,
  FileSpreadsheet,
} from 'lucide-react'
import { HeroReverseSalesTaxCalculator } from '@/components/HeroReverseSalesTaxCalculator'
import { FAQAccordion } from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator | Calculate Pre-Tax Price & Remove Tax',
  description:
    'Free reverse sales tax calculator. Calculate original pre-tax price and remove sales tax from any receipt or total bill using official 2026 US state and local tax rates.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro',
  },
  openGraph: {
    title: 'Reverse Sales Tax Calculator | Calculate Pre-Tax Price & Remove Tax',
    description:
      'Free reverse sales tax calculator. Calculate original pre-tax price and remove sales tax from any receipt or total bill using official 2026 US state and local tax rates.',
    url: 'https://www.reversetaxcalculator.pro',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What is a reverse sales tax calculation?',
      answer:
        'A reverse sales tax calculation extracts the original pre-tax price (net subtotal) and the exact sales tax amount from a tax-inclusive total receipt. Instead of multiplying by the tax rate, you divide the gross total by 1 plus the tax rate in decimal form (e.g. Total ÷ 1.08 for an 8% tax rate).',
    },
    {
      question: 'Why can I not just subtract the tax percentage from the total?',
      answer:
        'Subtracting the tax percentage directly from the total gives an incorrect result. Sales tax is originally calculated on the smaller pre-tax subtotal, not the larger gross total. For example, on a $108.00 total with 8% sales tax, subtracting 8% ($8.64) yields $99.36. However, 8% sales tax on $99.36 is only $7.95, resulting in $107.31—leaving a 64¢ deficit. Dividing $108.00 by 1.08 correctly yields the exact original $100.00 subtotal.',
    },
    {
      question: 'What is the exact formula to remove sales tax from a receipt?',
      answer:
        'The formula to find the pre-tax price is: Pre-Tax Price = Gross Total ÷ (1 + [Tax Rate ÷ 100]). To find the sales tax amount paid, subtract the pre-tax price from the gross total: Sales Tax = Gross Total - Pre-Tax Price.',
    },
    {
      question: 'How do I calculate reverse sales tax in Excel or Google Sheets?',
      answer:
        'In Excel or Google Sheets, if cell A2 contains the gross receipt amount ($108.00) and cell B2 contains the sales tax rate (8% or 0.08), the formula for the pre-tax price is =A2 / (1 + B2). The formula to calculate just the sales tax amount is =A2 - (A2 / (1 + B2)).',
    },
    {
      question: 'What if my receipt has both state and city sales tax?',
      answer:
        'In the United States, most purchases are subject to combined state, county, and local city tax rates. To perform a reverse calculation, add all statutory rates together into a single combined rate (e.g. 6.25% state + 2.00% local = 8.25% combined). Divide your gross total by 1.0825 to find the pre-tax base, then multiply the pre-tax base by each tier to isolate state and local tax portions.',
    },
    {
      question: 'Which US states do not have a statewide sales tax?',
      answer:
        'Five US states do not impose a general statewide sales tax (the "NOMAD" states): Alaska, Delaware, Montana, New Hampshire, and Oregon. However, Alaska permits local municipalities and boroughs to levy local sales taxes up to 7.85%.',
    },
    {
      question: 'Can I use this reverse calculator for Canadian GST, HST, or PST?',
      answer:
        'Yes. Canadian federal GST (5%), Harmonized Sales Tax (HST: 13% or 15%), and provincial sales taxes (PST) follow the exact same mathematical divisor rule. We also provide dedicated tools for Canadian tax systems.',
    },
    {
      question: 'Is reverse sales tax the same as reverse VAT?',
      answer:
        'Yes, mathematically they use the identical divisor formula. Value Added Tax (VAT) in the UK, European Union, and Latin America is typically included directly on price tags and receipts, requiring buyers and businesses to calculate backwards to reclaim VAT.',
    },
    {
      question: 'How does rounding work for reverse sales tax?',
      answer:
        'Sales tax calculations follow standard financial rounding rules (half-up to the nearest cent / 2 decimal places). Because divisions can yield fractional cents (e.g. $92.5925...), statutory rounding occurs at the final penny level in accordance with state Department of Revenue guidelines.',
    },
  ]

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReverseTaxCalculator.pro',
    url: 'https://www.reversetaxcalculator.pro',
    description:
      'Authoritative US reverse sales tax calculator, pre-tax price extraction tool, and statutory state rate directory.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Reverse Sales Tax Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Reverse sales tax extraction (remove tax from total)',
      'Pre-tax net subtotal calculation',
      'Forward sales tax calculation (add tax to subtotal)',
      'All 50 US states statutory tax rate auto-fill',
      'Split state and local municipal tax distribution',
      'Excel and Google Sheets copyable formula generator',
      'Mathematical arithmetic verification proof',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Reverse Sales Tax (Remove Tax from Total)',
    description:
      'Learn how to calculate the pre-tax price and extract sales tax from a tax-inclusive receipt or total invoice amount.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Step 1: Identify Total Gross Price',
        text: 'Locate the final tax-inclusive amount shown on your receipt, invoice, or credit card charge (e.g. $108.00).',
      },
      {
        '@type': 'HowToStep',
        name: 'Step 2: Determine the Applicable Sales Tax Rate',
        text: 'Find your combined state and local sales tax rate as a percentage (e.g. 8%).',
      },
      {
        '@type': 'HowToStep',
        name: 'Step 3: Convert the Tax Rate into a Decimal Divisor',
        text: 'Divide the tax percentage by 100, then add 1 (e.g. 8 ÷ 100 = 0.08; 1 + 0.08 = 1.08 divisor).',
      },
      {
        '@type': 'HowToStep',
        name: 'Step 4: Divide Total Price by Divisor',
        text: 'Divide the total gross price by your decimal divisor to determine the pre-tax price ($108.00 ÷ 1.08 = $100.00).',
      },
      {
        '@type': 'HowToStep',
        name: 'Step 5: Subtract Pre-Tax Price from Total to Find Tax Paid',
        text: 'Subtract the pre-tax price from the total gross amount ($108.00 - $100.00 = $8.00 sales tax paid).',
      },
    ],
  }

  const popularStates = [
    { name: 'California', slug: 'california', baseRate: '7.25%', avgCombined: '8.85%' },
    { name: 'Texas', slug: 'texas', baseRate: '6.25%', avgCombined: '8.20%' },
    { name: 'Florida', slug: 'florida', baseRate: '6.00%', avgCombined: '7.02%' },
    { name: 'New York', slug: 'new-york', baseRate: '4.00%', avgCombined: '8.53%' },
    { name: 'Illinois', slug: 'illinois', baseRate: '6.25%', avgCombined: '8.86%' },
    { name: 'Washington', slug: 'washington', baseRate: '6.50%', avgCombined: '9.38%' },
    { name: 'Pennsylvania', slug: 'pennsylvania', baseRate: '6.00%', avgCombined: '6.34%' },
    { name: 'Ohio', slug: 'ohio', baseRate: '5.75%', avgCombined: '7.24%' },
    { name: 'New Jersey', slug: 'new-jersey', baseRate: '6.625%', avgCombined: '6.60%' },
    { name: 'Georgia', slug: 'georgia', baseRate: '4.00%', avgCombined: '7.38%' },
    { name: 'North Carolina', slug: 'north-carolina', baseRate: '4.75%', avgCombined: '7.00%' },
    { name: 'Michigan', slug: 'michigan', baseRate: '6.00%', avgCombined: '6.00%' },
  ]

  const priceTableData = [
    { gross: 25.0, rate: 5, divisor: 1.05, net: 23.81, tax: 1.19 },
    { gross: 50.0, rate: 6, divisor: 1.06, net: 47.17, tax: 2.83 },
    { gross: 75.0, rate: 7, divisor: 1.07, net: 70.09, tax: 4.91 },
    { gross: 100.0, rate: 8, divisor: 1.08, net: 92.59, tax: 7.41 },
    { gross: 108.0, rate: 8, divisor: 1.08, net: 100.0, tax: 8.0 },
    { gross: 150.0, rate: 8.25, divisor: 1.0825, net: 138.57, tax: 11.43 },
    { gross: 200.0, rate: 8.875, divisor: 1.08875, net: 183.7, tax: 16.3 },
    { gross: 250.0, rate: 10, divisor: 1.1, net: 227.27, tax: 22.73 },
    { gross: 500.0, rate: 8.25, divisor: 1.0825, net: 461.89, tax: 38.11 },
    { gross: 1000.0, rate: 7.25, divisor: 1.0725, net: 932.4, tax: 67.6 },
  ]

  return (
    <>
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="space-y-16 max-w-7xl mx-auto">
        {/* =========================================================================
            SECTION 1: HERO SECTION & CALCULATOR
            ========================================================================= */}
        <section className="pt-4 pb-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Clear, Authoritative Editorial Introduction */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                  Reverse Sales Tax Calculator
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4">
                  Calculate the pre-tax price, isolate sales tax paid, and verify receipt math backwards using statutory state and local tax rates across the United States.
                </p>
              </div>

              {/* 3 Simple Workflow Steps */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    1
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 m-0">Enter Receipt Total</h2>
                    <p className="text-xs text-slate-500 m-0 mt-0.5">The final amount paid including sales tax.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 m-0">Choose State or Custom Rate</h2>
                    <p className="text-xs text-slate-500 m-0 mt-0.5">Auto-fills statutory state rates or your combined local rate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    3
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 m-0">Instant Itemized Breakdown</h2>
                    <p className="text-xs text-slate-500 m-0 mt-0.5">Extracts the pre-tax subtotal, sales tax amount, and divisor proof.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 border-t border-slate-100">
                Verified against 2026 US state statutory Department of Revenue guidelines.
              </div>
            </div>

            {/* Right Column: Hero Calculator Component */}
            <div className="lg:col-span-6">
              <HeroReverseSalesTaxCalculator />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE "SUBTRACTION TRAP" (EDITORIAL COMPARISON)
            ========================================================================= */}
        <section className="space-y-6 pt-4 border-t border-slate-200/80">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Fundamental Tax Accounting Rule
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              Why You Cannot Simply Subtract the Tax Rate
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
              The most common error in sales tax bookkeeping is multiplying the gross receipt total by the sales tax percentage and subtracting it. This math is fundamentally incorrect because sales tax is originally calculated on the <strong>smaller pre-tax price</strong>, not the <strong>larger gross total</strong>.
            </p>
          </div>

          {/* Clean Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Incorrect Subtraction Method */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Common Mistake: Direct Subtraction
              </div>
              <p className="text-xs text-slate-600 m-0">
                Receipt Total: <strong>$108.00</strong> • Tax Rate: <strong>8%</strong>
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-900 text-sm tabular-nums">
                $108.00 − ($108.00 × 0.08) = $108.00 − $8.64 = <strong>$99.36</strong>
              </div>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                <strong>Why it fails:</strong> If you add 8% tax back to $99.36 ($99.36 × 1.08), you arrive at only <strong>$107.31</strong>. You have undercounted the true pre-tax expense by 64¢.
              </p>
            </div>

            {/* The Correct Divisor Method */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Correct Method: The Divisor Formula
              </div>
              <p className="text-xs text-slate-600 m-0">
                Receipt Total: <strong>$108.00</strong> • Divisor: (1 + 0.08) = <strong>1.08</strong>
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-900 text-sm tabular-nums">
                $108.00 ÷ 1.08 = <strong>$100.00 Pre-Tax Subtotal</strong>
              </div>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                <strong>Verification proof:</strong> Adding 8% tax back to $100.00 ($100.00 × 1.08) equals exactly <strong>$108.00</strong>. The sales tax paid is exactly $8.00.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: STEP-BY-STEP MATHEMATICAL FORMULAS
            ========================================================================= */}
        <section className="space-y-6 pt-4 border-t border-slate-200/80">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              The Reverse Sales Tax Mathematical Formula
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
              To reverse sales tax from any total receipt amount, divide the gross figure by 1 plus the decimal tax rate:
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="text-xs font-semibold uppercase text-slate-500">Pre-Tax Price Equation</div>
                <div className="text-base font-bold text-slate-900">
                  Pre-Tax Price = Gross Total ÷ (1 + Tax Rate)
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="text-xs font-semibold uppercase text-slate-500">Sales Tax Extracted Equation</div>
                <div className="text-base font-bold text-slate-900">
                  Sales Tax = Gross Total − Pre-Tax Price
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
              <strong>Example Walkthrough:</strong> For a <strong>$216.50</strong> receipt in Texas with an <strong>8.25%</strong> combined tax rate:
              <br />
              1. Convert tax rate to decimal: 8.25 ÷ 100 = 0.0825.
              <br />
              2. Add 1 to find the divisor: 1 + 0.0825 = 1.0825.
              <br />
              3. Divide total by divisor: $216.50 ÷ 1.0825 = <strong>$200.00</strong> (Pre-tax price).
              <br />
              4. Subtract subtotal from gross total: $216.50 − $200.00 = <strong>$16.50</strong> (Sales tax paid).
            </div>

            <div>
              <Link
                href="/reverse-tax-formula"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>Read the complete algebraic derivation and proof</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SPREADSHEET FORMULAS (EXCEL & GOOGLE SHEETS)
            ========================================================================= */}
        <section className="space-y-6 pt-4 border-t border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              Formulas for Excel & Google Sheets
            </h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed m-0 max-w-3xl">
            For bookkeeping batches, QuickBooks reconciliations, or spreadsheet audits, copy and paste these exact formulas into your worksheet:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Pre-Tax Price (Net Subtotal)
              </span>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-sm">
                =A2 / (1 + B2)
              </div>
              <p className="text-xs text-slate-500 m-0">
                Where <strong>A2</strong> is the gross receipt ($108.00) and <strong>B2</strong> is the tax rate (8% or 0.08).
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
                Sales Tax Amount Isolated
              </span>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-sm">
                =A2 - (A2 / (1 + B2))
              </div>
              <p className="text-xs text-slate-500 m-0">
                Extracts the isolated tax dollar amount directly from the total bill.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: REFERENCE LOOKUP TABLE
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              Reverse Sales Tax Reference Table
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0 mt-1">
              Common receipt totals and corresponding pre-tax net amounts across standard US sales tax rates:
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Receipt Total (Gross)</th>
                  <th className="py-3 px-4 font-semibold">Tax Rate</th>
                  <th className="py-3 px-4 font-semibold">Divisor</th>
                  <th className="py-3 px-4 font-semibold">Pre-Tax Price (Net)</th>
                  <th className="py-3 px-4 font-semibold">Sales Tax Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm tabular-nums">
                {priceTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">${row.gross.toFixed(2)}</td>
                    <td className="py-3 px-4 text-slate-600">{row.rate}%</td>
                    <td className="py-3 px-4 text-slate-500">{row.divisor}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">${row.net.toFixed(2)}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">${row.tax.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-400">
            * All values rounded to two decimal places under standard GAAP financial currency rules.
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: POPULAR US STATES QUICK DIRECTORY
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
                Sales Tax Rates by State
              </h2>
              <p className="text-slate-600 text-sm mt-1 m-0">
                Baseline statutory rates and average combined local rates for major US states:
              </p>
            </div>
            <Link
              href="/data-sources"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>All 50 States Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}-reverse-sales-tax-calculator`}
                className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all block group"
              >
                <div className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 truncate">
                  {state.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                  Base: {state.baseRate}
                </div>
                <div className="text-[10px] text-slate-400 tabular-nums">
                  Avg: {state.avgCombined}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-xs text-slate-400">
            * 5 US states (Alaska, Delaware, Montana, New Hampshire, Oregon) levy zero statewide sales tax.
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: PRACTICAL BUSINESS & ACCOUNTING USE CASES
            ========================================================================= */}
        <section className="space-y-6 pt-4 border-t border-slate-200/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              Common Accounting & Bookkeeping Scenarios
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0 mt-1">
              Practical situations where calculating sales tax in reverse is necessary:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 m-0">Expense Reporting</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                When employee receipts or credit card records only show the gross total, reverse math isolates the true deductible expense.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Store className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 m-0">Retail Cash Sales</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Vendors quoting flat tax-inclusive prices at events must reverse the tax to remit the correct liability to the Department of Revenue.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 m-0">Freelancer Invoicing</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Contractors quoting flat project rates can easily separate net earnings from mandatory statutory tax charges.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 m-0">Global Commerce</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Sellers dealing with VAT and GST jurisdictions where display prices include tax need reverse calculations to prepare returns.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: SPECIALIZED REVERSE TAX CALCULATORS
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              Specialized Reverse Tax Calculators
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0 mt-1">
              Dedicated calculators for international jurisdictions and specific tax structures:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/reverse-sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Reverse Sales Tax Calculator</div>
              <div className="text-xs text-slate-500">Remove US sales tax from any total price.</div>
            </Link>

            <Link
              href="/reverse-vat-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Reverse VAT Calculator</div>
              <div className="text-xs text-slate-500">Extract pre-VAT amounts from UK and European receipts.</div>
            </Link>

            <Link
              href="/reverse-gst-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Reverse GST Calculator</div>
              <div className="text-xs text-slate-500">Calculate base prices before GST for Canada, Australia, and India.</div>
            </Link>

            <Link
              href="/reverse-hst-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Reverse HST Calculator</div>
              <div className="text-xs text-slate-500">Separate Canadian Harmonized Sales Tax (13% - 15%).</div>
            </Link>

            <Link
              href="/reverse-pst-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Reverse PST Calculator</div>
              <div className="text-xs text-slate-500">Calculate pre-tax base for BC, Saskatchewan, and Manitoba.</div>
            </Link>

            <Link
              href="/tax-inclusive-price-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Tax-Inclusive Price Calculator</div>
              <div className="text-xs text-slate-500">Deconstruct bundled consumer retail pricing.</div>
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: RELATED FORWARD SALES TAX TOOLS
            ========================================================================= */}
        <section className="space-y-4 pt-4 border-t border-slate-200/80">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight m-0">
              Related Sales Tax Tools
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0 mt-1">
              Forward sales tax additions, municipal lookups, and multi-tier breakdowns:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Sales Tax Calculator</div>
              <div className="text-xs text-slate-500">Add sales tax to any pre-tax amount.</div>
            </Link>

            <Link
              href="/remove-sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Remove Sales Tax Calculator</div>
              <div className="text-xs text-slate-500">Deduct sales tax from total bills.</div>
            </Link>

            <Link
              href="/us-sales-tax-by-zip-code"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">ZIP Code Tax Lookup</div>
              <div className="text-xs text-slate-500">Find state and city rates by 5-digit ZIP.</div>
            </Link>

            <Link
              href="/sales-tax-breakdown-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all space-y-1 block"
            >
              <div className="font-semibold text-sm text-slate-900">Sales Tax Breakdown</div>
              <div className="text-xs text-slate-500">Separate state, county, and transit splits.</div>
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: FAQS
            ========================================================================= */}
        <section className="pt-4 border-t border-slate-200/80">
          <FAQAccordion items={homeFaqs} title="Frequently Asked Questions about Reverse Sales Tax" />
        </section>
      </div>
    </>
  )
}
