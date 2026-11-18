import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroReverseSalesTaxCalculator } from '@/components/HeroReverseSalesTaxCalculator'
import { FAQAccordion } from '@/components/FAQAccordion'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Percent,
  Layers,
  Scale,
  MinusCircle,
  FileSpreadsheet,
  Tag,
  BookOpen,
  MapPin,
  ExternalLink,
  Zap,
  Smartphone,
  Sliders,
  Sparkles,
  AlertTriangle,
  Receipt,
  FileText,
  Briefcase,
  Store,
  HelpCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator | Calculate Pre-Tax Price & Remove Tax',
  description:
    'Calculate sales tax backwards from any total price or receipt. Instantly find original pre-tax price, sales tax paid, and state tax rates with our free calculator.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro',
    title: 'Reverse Sales Tax Calculator | Calculate Pre-Tax Price & Remove Tax',
    description:
      'Free reverse sales tax calculator to remove sales tax from any total receipt or invoice. Calculate original pre-tax price and exact tax paid backwards instantly.',
    siteName: 'ReverseTaxCalculator.pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax Calculator | Calculate Pre-Tax Price from Total',
    description:
      'Free reverse sales tax calculator. Calculate the original price before tax and exact sales tax paid from any receipt total.',
  },
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What is a reverse sales tax calculator?',
      answer:
        'A reverse sales tax calculator is a financial tool that determines the original pre-tax price and the exact sales tax amount from a tax-inclusive total. While standard forward calculations multiply a net subtotal by the tax rate to add tax, reverse calculations work backwards by dividing the final total by (1 + tax rate expressed as a decimal).',
    },
    {
      question: 'How do I calculate sales tax backwards from a total price?',
      answer:
        'To calculate sales tax backwards, convert your tax rate to a decimal, add 1 to create your divisor, and divide your total price by that divisor. For example, with an 8% tax rate, divide your total by 1.08. A $108.00 total divided by 1.08 gives $100.00 pre-tax price. Then subtract $100.00 from $108.00 to determine the $8.00 sales tax paid.',
    },
    {
      question: 'Why can’t I just subtract the tax percentage directly from the total?',
      answer:
        'Subtracting the tax percentage directly produces an incorrect under-calculation because sales tax was originally levied on the smaller pre-tax subtotal, not the larger gross total. For example, subtracting 8% from $108.00 removes $8.64, leaving $99.36. If you add 8% tax back to $99.36, you only reach $107.31—meaning you undercounted your pre-tax base by $0.64. Always divide by (1 + tax rate) to get the true mathematical result.',
    },
    {
      question: 'What is the reverse sales tax formula in Excel or Google Sheets?',
      answer:
        'In Microsoft Excel or Google Sheets, if Cell A2 contains the total tax-inclusive amount and Cell B2 contains the sales tax percentage (e.g. 8% or 0.08):\n• Pre-Tax Price Formula: =A2 / (1 + B2)\n• Sales Tax Amount Formula: =A2 - (A2 / (1 + B2))\nIf Cell B2 is formatted as a whole number (like 8 rather than 8%), use: =A2 / (1 + (B2 / 100)).',
    },
    {
      question: 'How do combined state and local sales taxes affect reverse calculations?',
      answer:
        'In most US states, sales tax consists of a statewide baseline rate plus county, city, or special transit district surtaxes. To calculate in reverse, you must use the total combined rate. For example, in Los Angeles, California, the statewide rate is 7.25% but the combined local rate is 9.50%. You must divide by 1.0950 rather than 1.0725 to accurately reflect receipts issued in Los Angeles.',
    },
    {
      question: 'How do I remove 8.25% Texas sales tax from a receipt?',
      answer:
        'In Texas, where the maximum combined sales tax rate is 8.25%, divide your total receipt amount by 1.0825. For example, for a receipt of $216.50: $216.50 ÷ 1.0825 = $200.00 pre-tax base. The sales tax paid is $216.50 - $200.00 = $16.50.',
    },
    {
      question: 'Is reverse sales tax the same as removing tax from a receipt?',
      answer:
        'Yes. Reverse sales tax, tax removal, calculating tax backwards, and finding the pre-tax price all refer to the identical mathematical operation: separating the original net expense from the sales tax component embedded in a gross price.',
    },
    {
      question: 'What is the difference between tax-inclusive and tax-exclusive pricing?',
      answer:
        'Tax-exclusive pricing displays the product price before taxes, with sales tax added separately at checkout (standard in the United States and Canada). Tax-inclusive pricing displays the final checkout price with taxes already bundled in (standard in Europe for VAT and Australia for GST). Reverse calculators are essential whenever a US receipt displays only the final lump sum.',
    },
    {
      question: 'Is this reverse tax calculator free to use?',
      answer:
        'Yes. ReverseTaxCalculator.pro is 100% free with unlimited calculations. There is no account registration, no subscription fee, and no software download required.',
    },
  ]

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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReverseTaxCalculator.pro',
    url: 'https://www.reversetaxcalculator.pro',
    description:
      'Authoritative reverse sales tax calculation platform. Extract pre-tax prices and sales tax paid backwards from any receipt or invoice.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Reverse Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free reverse sales tax calculator to calculate pre-tax amounts, sales tax paid, and original prices backwards from any total price.',
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Sales Tax Backwards from a Total Price',
    description:
      'Step-by-step mathematical method to remove sales tax from any gross receipt or invoice total.',
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

      <div className="space-y-14 md:space-y-16 max-w-7xl mx-auto">
        {/* =========================================================================
            SECTION 1: HERO SECTION WITH THE ENHANCED INTERACTIVE CALCULATOR
            ========================================================================= */}
        <section className="pt-2 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Hero Editorial Information */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold tracking-wide">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>FREE ONLINE REVERSE TAX PLATFORM</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Reverse Sales Tax Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Remove sales tax from any total price or receipt. Instantly calculate your original pre-tax price, exact sales tax paid, and effective tax rate backwards using verified 2026 state and local rates.
              </p>

              {/* Four Trust & Accuracy Indicators */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2026 US Statutory Rates</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2-Decimal Currency Precision</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Two-Way Forward & Reverse</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No Registration Required</span>
                </div>
              </div>

              {/* Quick Summary Card */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-900 leading-relaxed">
                <strong>Need to separate tax for bookkeeping or receipts?</strong> Simply enter your total receipt amount and select your US state from the calculator dropdown. The tool automatically extracts your deductible pre-tax subtotal and tax paid.
              </div>
            </div>

            {/* Right Column: Hero Calculator Component */}
            <div className="lg:col-span-6">
              <HeroReverseSalesTaxCalculator />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE "SUBTRACTION TRAP" (HIGH-INTENT PROBLEM SOLVING)
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Critical Financial Concept</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Why You Cannot Simply Subtract the Tax Rate (The Subtraction Trap)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
              The most widespread mistake in sales tax accounting is attempting to remove sales tax by multiplying the total price by the tax percentage and subtracting it. This math is fundamentally incorrect because sales tax is originally calculated on the <strong>smaller pre-tax price</strong>, not the <strong>larger gross total</strong>.
            </p>
          </div>

          {/* Visual Comparison: Incorrect vs Correct */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Incorrect Subtraction Method */}
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>❌ The Incorrect Method (Direct Subtraction)</span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed space-y-1.5 font-mono">
                <div>Total Receipt: $108.00 | Tax Rate: 8%</div>
                <div className="p-2.5 bg-white rounded-lg border border-red-200 text-red-900 font-bold">
                  $108.00 - ($108.00 × 0.08) = $108.00 - $8.64 = $99.36
                </div>
                <div className="text-[11px] text-red-700 font-sans pt-1">
                  <strong>The Verification Flaw:</strong> If you add 8% tax back to $99.36 ($99.36 × 1.08), you only get <strong>$107.31</strong>! You have undercounted the true pre-tax expense by $0.64.
                </div>
              </div>
            </div>

            {/* The Correct Divisor Method */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>✅ The Correct Method (The Divisor Formula)</span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed space-y-1.5 font-mono">
                <div>Total Receipt: $108.00 | Divisor: (1 + 0.08) = 1.08</div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-emerald-900 font-bold">
                  $108.00 ÷ 1.08 = $100.00 Pre-Tax Base
                </div>
                <div className="text-[11px] text-emerald-800 font-sans pt-1">
                  <strong>The Verification Proof:</strong> If you add 8% tax back to $100.00 ($100.00 × 1.08), you arrive back at exactly <strong>$108.00</strong>. The sales tax paid was exactly $8.00.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: STEP-BY-STEP MATHEMATICAL FORMULAS
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              The Reverse Sales Tax Mathematical Formula
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
              To mathematically reverse sales tax from any gross receipt, divide the total amount by 1 plus the decimal tax rate:
            </p>
          </div>

          {/* Mathematical Cards */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white text-slate-800 font-mono space-y-3 border border-slate-200 shadow-2xs">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
              Standard Reverse Tax Equations:
            </div>
            <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1.5">
              <div>Pre-Tax Price = Gross Total ÷ (1 + [Tax Rate % ÷ 100])</div>
              <div>Sales Tax Paid = Gross Total - Pre-Tax Price</div>
            </div>
            <div className="text-xs text-slate-600 pt-3 border-t border-slate-100 font-sans leading-relaxed">
              <strong>Worked Walkthrough:</strong> For a <strong>$216.50</strong> purchase in Texas with an <strong>8.25%</strong> sales tax rate:
              <br />
              1. Convert 8.25% to decimal: 8.25 ÷ 100 = 0.0825.
              <br />
              2. Add 1 to find the divisor: 1 + 0.0825 = 1.0825.
              <br />
              3. Divide gross total by divisor: $216.50 ÷ 1.0825 = <strong>$200.00</strong> (Pre-tax price).
              <br />
              4. Subtract pre-tax price from total: $216.50 - $200.00 = <strong>$16.50</strong> (Texas sales tax paid).
            </div>
          </div>

          {/* Link to Dedicated Formula Page */}
          <div>
            <Link
              href="/reverse-tax-formula"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Explore the comprehensive algebraic derivation of the reverse tax formula</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SPREADSHEET FORMULAS (EXCEL & GOOGLE SHEETS)
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-xs">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              How to Calculate Reverse Sales Tax in Excel & Google Sheets
            </h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed m-0">
            If you manage spreadsheets, QuickBooks exports, or invoice batches, use these formulas to calculate pre-tax amounts and sales tax columns automatically:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Box 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-sans font-bold text-slate-700 block uppercase text-[11px]">
                Pre-Tax Price (Net Subtotal)
              </span>
              <code className="block p-2.5 bg-white border border-slate-200 rounded-lg text-blue-700 font-bold text-xs sm:text-sm">
                =A2 / (1 + B2)
              </code>
              <p className="font-sans text-slate-500 text-[11px] m-0">
                Where A2 is the gross total ($108.00) and B2 is the tax percentage (8% or 0.08).
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-sans font-bold text-slate-700 block uppercase text-[11px]">
                Sales Tax Amount Removed
              </span>
              <code className="block p-2.5 bg-white border border-slate-200 rounded-lg text-emerald-700 font-bold text-xs sm:text-sm">
                =A2 - (A2 / (1 + B2))
              </code>
              <p className="font-sans text-slate-500 text-[11px] m-0">
                Extracts the isolated sales tax dollar amount directly from the gross total.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: REFERENCE TABLE - COMMON PRICE POINTS
            ========================================================================= */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Reverse Sales Tax Calculation Examples & Lookup Table
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Quick reference table showing pre-tax net amounts and sales tax removed across common purchase totals and typical state/local tax rates:
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Receipt Total (Gross)</th>
                  <th className="py-3 px-4 font-bold">Tax Rate</th>
                  <th className="py-3 px-4 font-bold">Divisor</th>
                  <th className="py-3 px-4 font-bold">Original Price (Net)</th>
                  <th className="py-3 px-4 font-bold text-emerald-700">Tax Removed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs sm:text-sm">
                {priceTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">${row.gross.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-slate-600">{row.rate}%</td>
                    <td className="py-2.5 px-4 text-slate-500">{row.divisor}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">${row.net.toFixed(2)}</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">+${row.tax.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500 leading-relaxed">
            * Note: All values are rounded to two decimal places following standard GAAP financial currency rules.
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: POPULAR US STATES QUICK DIRECTORY
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Reverse Sales Tax by US State
              </h2>
              <p className="text-slate-600 text-sm mt-1 m-0">
                Explore official statutory base rates and average local combined rates for high-population US states:
              </p>
            </div>
            <Link
              href="/data-sources"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>View All 50 States Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Popular States Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}-reverse-sales-tax-calculator`}
                className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-2xs transition-all block group"
              >
                <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 truncate">
                  {state.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  Base: {state.baseRate}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Avg: {state.avgCombined}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-xs text-slate-500 leading-relaxed pt-2">
            * 5 US states (Alaska, Delaware, Montana, New Hampshire, Oregon) assess zero statewide sales tax, though Alaska allows local municipal taxes up to 7.85%.
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: PRACTICAL BUSINESS & ACCOUNTING USE CASES
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Who Needs to Calculate Sales Tax in Reverse?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Reverse sales tax calculation is an everyday operational requirement across multiple business and personal finance scenarios:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Receipt Auditing</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                When filing employee expense reports or logging business receipts that show only a total credit card charge, reverse calculation isolates the true deductible expense.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Store className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Retail Cash Reconciliation</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Retailers quoting "out-the-door" tax-inclusive cash pricing (e.g., at fairs or events) must calculate reverse sales tax to remit accurate tax liabilities to the state.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Freelancer Invoicing</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Independent contractors who quote flat project rates can easily determine their net take-home revenue versus mandatory sales tax obligations.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">E-Commerce & VAT/GST</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Sellers trading internationally on marketplaces where tax is embedded in display prices need reverse math to file quarterly tax returns.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: EXPLORE REVERSE TAX CALCULATORS
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Specialized Reverse Tax Calculators
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Access dedicated tools designed for specific tax systems, international currencies, and transaction structures:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/reverse-sales-tax-calculator"
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse Sales Tax Calculator
              </h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Remove standard US sales tax from total purchase prices.
              </p>
            </Link>

            <Link
              href="/reverse-vat-calculator"
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse VAT Calculator
              </h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Extract original pre-VAT prices from UK, EU, and international invoices.
              </p>
            </Link>

            <Link
              href="/reverse-gst-calculator"
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse GST Calculator
              </h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Remove GST from Canadian, Australian, and Indian goods and services receipts.
              </p>
            </Link>

            <Link
              href="/reverse-hst-calculator"
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse HST Calculator
              </h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Separate Harmonized Sales Tax (13% - 15%) from Canadian purchases.
              </p>
            </Link>

            <Link
              href="/reverse-pst-calculator"
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse PST Calculator
              </h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Calculate base amounts before provincial sales tax in BC, SK, and MB.
              </p>
            </Link>

            <Link
              href="/tax-inclusive-price-calculator"
              className="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Tax-Inclusive Price Calculator
              </h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Deconstruct bundled tax-inclusive retail pricing.
              </p>
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: RELATED FORWARD SALES TAX TOOLS
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              More Sales Tax Tools
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Calculate sales tax additions, multi-tier splits, and location comparisons:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Sales Tax Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Calculate sales tax to add to a pre-tax price.
              </div>
            </Link>

            <Link
              href="/remove-sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <MinusCircle className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Remove Sales Tax Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Deduct sales tax from any total bill or receipt.
              </div>
            </Link>

            <Link
              href="/us-sales-tax-by-zip-code"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">ZIP Code Tax Lookup</div>
              <div className="text-xs text-slate-500 leading-normal">
                Find state, county, and municipal rates by 5-digit ZIP.
              </div>
            </Link>

            <Link
              href="/sales-tax-breakdown-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Sales Tax Breakdown</div>
              <div className="text-xs text-slate-500 leading-normal">
                Deconstruct state, county, and transit splits.
              </div>
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: FREQUENTLY ASKED QUESTIONS (WITH FAQPAGESCHEMA)
            ========================================================================= */}
        <section className="space-y-4">
          <FAQAccordion items={homeFaqs} title="Frequently Asked Questions about Reverse Sales Tax" />
        </section>
      </div>
    </>
  )
}
