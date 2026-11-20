import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Receipt,
  FileText,
  Building2,
  DollarSign,
  HelpCircle,
  BookOpen,
  MapPin,
} from 'lucide-react'
import { HeroReverseSalesTaxCalculator } from '@/components/HeroReverseSalesTaxCalculator'
import { FAQAccordion } from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator – Remove Tax from Total',
  description:
    'Calculate the original price before sales tax. Enter your receipt total and tax rate to instantly find the pre-tax price and sales tax included. Free reverse sales tax calculator.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro',
  },
  openGraph: {
    title: 'Reverse Sales Tax Calculator – Remove Tax from Total',
    description:
      'Calculate the original price before sales tax. Enter your receipt total and tax rate to instantly find the pre-tax price and sales tax included. Free reverse sales tax calculator.',
    url: 'https://www.reversetaxcalculator.pro',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is a reverse sales tax calculator?',
    answer:
      'A reverse sales tax calculator is a financial tool that determines the original pre-tax price and the sales tax amount from a tax-inclusive total purchase or receipt amount. Instead of adding sales tax forward, it divides by one plus the tax rate decimal to mathematically extract the original price before tax.',
  },
  {
    question: 'How do I remove sales tax from a total?',
    answer:
      'To remove sales tax from a total, divide the gross amount by 1 plus the sales tax rate expressed as a decimal. For example, if your total is $108.00 and your sales tax rate is 8%, convert 8% to 0.08, add 1 to get 1.08, and divide: $108.00 ÷ 1.08 = $100.00 pre-tax price. The sales tax removed is $108.00 − $100.00 = $8.00.',
  },
  {
    question: 'What is the formula for reverse sales tax?',
    answer:
      'The reverse sales tax formula consists of two mathematical steps: 1. Pre-Tax Price = Total Receipt Amount ÷ (1 + [Tax Rate ÷ 100]). 2. Sales Tax Amount = Total Receipt Amount − Pre-Tax Price.',
  },
  {
    question: 'Why can’t I simply subtract the tax percentage?',
    answer:
      'Subtracting the tax percentage directly from the total gives an incorrect result because sales tax was originally calculated on the smaller pre-tax base, not the larger final total. On a $108.00 total with 8% sales tax, subtracting 8% ($8.64) yields $99.36. However, 8% tax on $99.36 is only $7.95 ($107.31 total), leaving a 69¢ deficit. Dividing by 1.08 mathematically reverses the calculation.',
  },
  {
    question: 'How do I calculate the original price before tax?',
    answer:
      'To calculate the original price before tax, take your total price including tax and divide it by (1 + Tax Rate ÷ 100). For instance, for a $54.00 total with 8% tax, divide $54.00 by 1.08 to find the original pre-tax price of $50.00.',
  },
  {
    question: 'Can I calculate sales tax from a receipt?',
    answer:
      'Yes. If your receipt only displays the final total and the tax percentage applied, you can enter both figures into our reverse sales tax calculator to extract the exact pre-tax subtotal and sales tax paid.',
  },
  {
    question: 'How accurate is reverse sales tax calculation?',
    answer:
      'The calculation is mathematically exact to the cent using standard financial rounding (half-up to 2 decimal places). Minor 1-cent variances can occasionally occur on printed receipts if the retailer calculated sales tax line-by-line on individual items rather than on the aggregate total.',
  },
  {
    question: 'Can I use this calculator for different sales tax rates?',
    answer:
      'Yes. You can enter any custom sales tax percentage from 0% to 100%, including fractional rates like 6.25%, 8.25%, or 8.875%, as well as use our quick preset buttons or state baseline selector.',
  },
]

const CALCULATION_EXAMPLES = [
  { total: 108.00, rate: 8.00, preTax: 100.00, tax: 8.00 },
  { total: 54.00, rate: 8.00, preTax: 50.00, tax: 4.00 },
  { total: 108.25, rate: 8.25, preTax: 100.00, tax: 8.25 },
  { total: 216.50, rate: 8.25, preTax: 200.00, tax: 16.50 },
  { total: 110.00, rate: 10.00, preTax: 100.00, tax: 10.00 },
]

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReverseTaxCalculator.pro',
    url: 'https://www.reversetaxcalculator.pro',
    description:
      'Free reverse sales tax calculator to calculate original price before tax and remove sales tax from any total receipt.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
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
    name: 'How to Use the Reverse Sales Tax Calculator',
    description: 'Calculate the pre-tax price and sales tax included in any receipt total.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter your total receipt amount',
        text: 'Input the final out-of-pocket amount paid on your purchase, including sales tax.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter the sales tax percentage',
        text: 'Enter the combined state and local sales tax percentage applied to the transaction.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate to see your original pre-tax price',
        text: 'Click calculate to view your original price before tax, the exact tax amount, and the calculation steps.',
      },
    ],
  }

  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="space-y-16 md:space-y-24">
        {/* ================================================================= */}
        {/* SECTION 2: HERO + MAIN CALCULATOR                                 */}
        {/* ================================================================= */}
        <section className="pt-2 md:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                <Receipt className="w-3.5 h-3.5 text-blue-600" />
                <span>Specialized Reverse Sales Tax Tool</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Reverse Sales Tax Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Calculate the original price before sales tax from any tax-inclusive total. Enter your receipt amount and sales tax rate to instantly find the pre-tax price and the tax included in your purchase.
              </p>

              {/* Three Concise Benefits */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Instantly calculate the original pre-tax price.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Find the sales tax included in your receipt.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    See a transparent, step-by-step calculation.
                  </span>
                </div>
              </div>

              {/* Trust Statement */}
              <div className="pt-3 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free online calculator. No registration required.</span>
              </div>
            </div>

            {/* Right Column: Prominent Interactive Calculator */}
            <div className="lg:col-span-6 w-full">
              <HeroReverseSalesTaxCalculator />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: HOW TO USE THE REVERSE SALES TAX CALCULATOR           */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Reverse Sales Tax Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extract the net price and sales tax from any total receipt in three easy steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 1: Enter receipt amount</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter your total receipt amount, representing the full purchase price including sales tax.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 2: Enter tax percentage</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the sales tax percentage included in the total, or select one of the quick rate presets.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 3: Calculate results</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate to see your original pre-tax price, the sales tax amount, and the step-by-step formula.
              </p>
            </div>
          </div>

          {/* One Practical Example */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">Practical Example: </span>
            For example, if you have a receipt totaling <strong>$108.00</strong> and know your local sales tax is <strong>8%</strong>, enter 108.00 in the receipt amount and 8 in the tax rate. Click calculate to instantly reveal the <strong>$100.00 pre-tax price</strong> and <strong>$8.00 in sales tax</strong>.
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: UNDERSTANDING YOUR CALCULATION                        */}
        {/* ================================================================= */}
        <section className="space-y-6 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Reverse Sales Tax Calculation Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sales tax is calculated on the original pre-tax price, not by simply subtracting the tax percentage from the tax-inclusive total.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mathematical Formula
            </div>

            <div className="space-y-2 font-mono text-sm sm:text-base text-blue-800 font-bold">
              <div>Pre-Tax Price = Receipt Total ÷ (1 + [Tax Rate ÷ 100])</div>
              <div>Sales Tax = Receipt Total − Pre-Tax Price</div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <div className="font-sans font-bold text-slate-900">Formula Example:</div>
              <div>• $108.00 ÷ 1.08 = <strong>$100.00 Pre-Tax Price</strong></div>
              <div>• $108.00 − $100.00 = <strong>$8.00 Sales Tax</strong></div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/50 border border-blue-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1.5">
            <div className="font-bold text-slate-900">Why Direct Percentage Subtraction Produces an Incorrect Result:</div>
            <p className="m-0">
              If you have a $108.00 total with 8% sales tax and simply subtract 8% ($8.64), you arrive at $99.36. This is mathematically incorrect because 8% was originally applied to the smaller $100.00 base, not the $108.00 total. Applying 8% to $99.36 yields only $7.95 in tax ($107.31 total), leaving a 69¢ calculation gap. Dividing by <code>1 + Tax Rate</code> properly reverses the calculation.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: PRACTICAL CALCULATION EXAMPLES                        */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reverse Sales Tax Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Reference common receipt amounts and their corresponding pre-tax prices and sales tax paid across popular tax percentages:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Receipt Total</th>
                  <th className="py-3 px-4">Tax Rate</th>
                  <th className="py-3 px-4 text-blue-700">Pre-Tax Price</th>
                  <th className="py-3 px-4">Tax Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CALCULATION_EXAMPLES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">${row.total.toFixed(2)}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{row.rate}%</td>
                    <td className="py-3 px-4 font-bold text-blue-700">${row.preTax.toFixed(2)}</td>
                    <td className="py-3 px-4 text-slate-700">${row.tax.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Results are rounded to two decimal places for currency display according to standard mathematical rounding rules.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: WHEN TO USE A REVERSE SALES TAX CALCULATOR             */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Do You Need to Remove Sales Tax from a Total?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              There are several common practical situations where extracting the pre-tax price from a total receipt is necessary:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Checking the original price on a receipt
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                When you have a final receipt or bank statement line item that includes sales tax, reverse calculation reveals the original sticker cost of the item before tax was applied at the cash register.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Calculating pre-tax business expenses
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Self-employed professionals, contractors, and businesses often need to separate deductible operating expenses from sales tax paid when submitting reimbursement forms or preparing tax records.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Reviewing tax-inclusive purchase totals
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Commercial contracts, flat-rate trade quotes, concessions, and ticketed events frequently quote all-inclusive prices. Reverse calculation identifies the underlying service cost versus the tax component.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Separating sales tax for bookkeeping
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Small business owners recording register sales must separate taxable revenue from sales tax collected. Because sales tax is a liability owed to state revenue agencies, it cannot be logged as company income.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: SALES TAX RATE EXPLANATION                             */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Sales Tax Rates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In the United States, sales tax is rarely a single number. Instead, the rate you pay is usually a combined percentage made up of several distinct jurisdictional components:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">State Sales Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                The baseline tax established by the state government, ranging from 2.9% to 7.25% across states.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">County Sales Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Local taxes levied by county authorities to fund regional services, jails, and county road maintenance.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">City Sales Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Municipal levies passed by city councils or local referendums for municipal police, fire, and parks.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">Special District Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Targeted district taxes supporting regional public transit networks, hospital districts, or stadiums.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
              <div className="font-bold text-blue-900 text-xs">Combined Rate</div>
              <p className="text-blue-950 m-0 leading-relaxed">
                The sum of all applicable state, county, city, and district taxes applied to your retail transaction.
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-600 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="m-0">
              The exact sales tax percentage depends on the specific physical address where delivery or purchase takes place.
            </p>
            <Link
              href="/us-sales-tax-by-zip-code"
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 shrink-0"
            >
              <span>Look up your rate by ZIP code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: RELATED RESOURCES                                     */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Related Sales Tax Resources
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore helpful guides and reference tools for sales tax calculations:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              href="/data-sources"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                State Sales Tax Rate Guide
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Access official state revenue portals, statutory rates, and local tax rules for all 50 US states.
              </p>
            </Link>

            <Link
              href="/remove-sales-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                How to Remove Sales Tax from a Total
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Detailed instructions and formulas for taking sales tax out of receipts and expense reports.
              </p>
            </Link>

            <Link
              href="/reverse-tax-formula"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse Sales Tax Formula Guide
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Step-by-step mathematical derivation of the reverse tax division formula and spreadsheet examples.
              </p>
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: FAQ                                                   */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <FAQAccordion
            items={FAQS}
            title="Frequently Asked Questions About Reverse Sales Tax"
          />
        </section>
      </div>
    </>
  )
}
