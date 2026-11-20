import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { SalesTaxCalculatorTool } from '@/components/SalesTaxCalculatorTool'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Receipt,
  FileText,
  DollarSign,
  Building2,
  HelpCircle,
  Percent,
  Layers,
  MapPin,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Calculator – Calculate Sales Tax and Total Price',
  description:
    'Calculate sales tax instantly. Enter your purchase price and tax rate to find the tax amount and final price including sales tax. Free online calculator.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/sales-tax-calculator/',
  },
  openGraph: {
    title: 'Sales Tax Calculator – Calculate Sales Tax and Total Price',
    description:
      'Calculate sales tax instantly. Enter your purchase price and tax rate to find the tax amount and final price including sales tax. Free online calculator.',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-calculator/',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'How do I calculate sales tax on a purchase?',
    answer:
      'To calculate sales tax on a purchase, multiply the pre-tax item price by the sales tax rate expressed as a decimal (e.g., 8.25% becomes 0.0825). Add the resulting sales tax amount to the original price to determine the total price due at checkout.',
  },
  {
    question: 'What is the formula for calculating sales tax?',
    answer:
      'The forward sales tax formula consists of two calculations: 1. Sales Tax = Original Purchase Price × (Tax Rate ÷ 100). 2. Final Price = Original Purchase Price + Sales Tax.',
  },
  {
    question: 'How do I add sales tax to a price?',
    answer:
      'To add sales tax in a single step, multiply the pre-tax purchase price by (1 + Tax Rate ÷ 100). For example, to add 7% sales tax to a $50.00 item: $50.00 × 1.07 = $53.50 final price.',
  },
  {
    question: 'What is the difference between purchase price and final price?',
    answer:
      'The original purchase price (or subtotal) is the advertised sticker cost of the item before any statutory taxes are assessed. The final price is the complete out-of-pocket total payable at the cash register, which includes the purchase price plus all state and local sales taxes.',
  },
  {
    question: 'How do state and local sales taxes work?',
    answer:
      'In the United States, sales taxes are levied by state governments, county authorities, city municipalities, and special transit or school districts. These individual percentages are combined together into a single combined sales tax rate that is applied to taxable retail sales at checkout.',
  },
  {
    question: 'Can I calculate sales tax using a percentage?',
    answer:
      'Yes. To use a percentage in calculations, convert it into a decimal by dividing by 100. For instance, 6.5% becomes 0.065. Multiplying your purchase price by 0.065 gives the sales tax dollar amount.',
  },
  {
    question: 'Does this calculator include local sales tax?',
    answer:
      'This calculator calculates sales tax using whatever combined percentage rate you enter. If your location has a 6% state tax and a 2% local city tax, simply enter 8% into the sales tax rate field to calculate the total combined tax.',
  },
  {
    question: 'Is the sales tax calculator free to use?',
    answer:
      'Yes, our sales tax calculator is 100% free with unlimited calculations. There is no account sign-up, registration, or software download required.',
  },
]

const CALCULATION_EXAMPLES = [
  { price: 50.00, rate: 5.00, tax: 2.50, final: 52.50 },
  { price: 100.00, rate: 6.00, tax: 6.00, final: 106.00 },
  { price: 100.00, rate: 8.00, tax: 8.00, final: 108.00 },
  { price: 100.00, rate: 8.25, tax: 8.25, final: 108.25 },
  { price: 200.00, rate: 10.00, tax: 20.00, final: 220.00 },
  { price: 500.00, rate: 7.50, tax: 37.50, final: 537.50 },
]

export default function SalesTaxCalculatorPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-calculator/',
    description:
      'Calculate sales tax instantly. Enter your purchase price and tax rate to find the tax amount and final price including sales tax.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-calculator/',
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
    name: 'How to Use the Sales Tax Calculator',
    description: 'Calculate sales tax on any pre-tax purchase price in three easy steps.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter original purchase price',
        text: 'Enter the original purchase price before tax (subtotal).',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter sales tax percentage',
        text: 'Enter the applicable sales tax percentage (e.g. 8.25%).',
      },
      {
        '@type': 'HowToStep',
        name: 'Click Calculate Sales Tax',
        text: 'Click Calculate Sales Tax to see the tax amount and final purchase price.',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
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

      {/* SECTION 1: BREADCRUMBS */}
      <BreadcrumbNav
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Sales Tax Calculator', url: '/tools/sales-tax-calculator' },
        ]}
      />

      <div className="space-y-16 md:space-y-20 max-w-7xl mx-auto">
        {/* ================================================================= */}
        {/* SECTION 2: HERO AND FUNCTIONAL CALCULATOR                         */}
        {/* ================================================================= */}
        <section className="pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>Standard Sales Tax Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Sales Tax Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Calculate sales tax on any purchase in seconds. Enter the original price and sales tax rate to find the tax amount and final price including tax. Use this free sales tax calculator to quickly estimate the total cost of your purchase.
              </p>

              {/* Three Concise Benefits */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Calculate sales tax instantly.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Find the final price including tax.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    See a clear breakdown of your purchase total.
                  </span>
                </div>
              </div>

              {/* Trust Statement */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Online Calculator • No registration required</span>
              </div>
            </div>

            {/* Right Column: Prominent Calculator Tool */}
            <div className="lg:col-span-6 w-full">
              <SalesTaxCalculatorTool />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: HOW TO USE THE CALCULATOR                             */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Sales Tax Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Estimate your total out-of-pocket checkout cost in three simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 1: Enter price</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the original purchase price before tax (the subtotal or advertised shelf price).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 2: Enter tax rate</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the applicable sales tax percentage, or click one of the quick rate presets (e.g. 8.25%).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 3: Calculate</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Click <strong>Calculate Sales Tax</strong> to see the exact tax amount and the final price including tax.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: SALES TAX FORMULA                                     */}
        {/* ================================================================= */}
        <section className="space-y-6 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Calculate Sales Tax
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sales tax is an ad valorem percentage tax added directly to the pre-tax price of taxable goods or services at the point of purchase.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mathematical Formula
            </div>

            <div className="space-y-2 font-mono text-sm sm:text-base text-blue-800 font-bold">
              <div>Sales Tax = Original Price × (Tax Rate ÷ 100)</div>
              <div>Final Price = Original Price + Sales Tax</div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <div className="font-sans font-bold text-slate-900">Worked Numerical Example:</div>
              <div>• Original price: <strong>$200.00</strong></div>
              <div>• Tax rate: <strong>8%</strong> (0.08 in decimal form)</div>
              <div>• Sales tax = $200.00 × 0.08 = <strong>$16.00</strong></div>
              <div>• Final price = $200.00 + $16.00 = <strong>$216.00</strong></div>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Alternatively, you can compute the final checkout price in a single calculation by multiplying the purchase price by <code>1 + (Tax Rate ÷ 100)</code>. In this example: <code>$200 × 1.08 = $216.00</code>.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: SALES TAX CALCULATION EXAMPLES                        */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sales Tax Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Review how sales tax amounts and final purchase totals scale across typical transaction values:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Purchase Price</th>
                  <th className="py-3 px-4">Tax Rate</th>
                  <th className="py-3 px-4 text-blue-700">Sales Tax</th>
                  <th className="py-3 px-4">Final Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CALCULATION_EXAMPLES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">${row.price.toFixed(2)}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{row.rate}%</td>
                    <td className="py-3 px-4 font-bold text-blue-700">+${row.tax.toFixed(2)}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">${row.final.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Note: These calculation examples use hypothetical rates for mathematical reference and do not represent the legally applicable sales tax rate in any specific state or municipality.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: UNDERSTANDING SALES TAX RATES                         */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Sales Tax Rates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When shopping in the United States, retail price tags almost never show the final register cost because sales taxes vary across thousands of local taxing jurisdictions. The combined rate you pay is generally composed of:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">1. State Sales Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                The base tax levied by the state general revenue fund (ranging from 2.9% in Colorado to 7.25% in California).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">2. County Sales Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Taxes imposed by county authorities to fund public health, county courts, and county infrastructure.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">3. City Sales Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Municipal levies voted by city councils or local referendums for emergency services, parks, and libraries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
              <div className="font-bold text-slate-900 text-xs">4. Special District Tax</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Regional transit districts, stadium authorities, or emergency medical response zones that add 0.1% to 2.5%.
              </p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-600 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="m-0">
              Because applicable rates vary depending on your physical delivery location and transaction type, enter the specific combined rate for your area into the calculator.
            </p>
            <Link
              href="/us-sales-tax-by-zip-code"
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 shrink-0"
            >
              <span>Search rates by 5-digit ZIP code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: WHEN TO USE A SALES TAX CALCULATOR                     */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Should You Use a Sales Tax Calculator?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Adding sales tax forward is essential in several everyday personal finance and commercial scenarios:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Estimating the total cost of a purchase
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                When budgeting for electronics, appliances, furniture, or big-ticket retail items, calculate the tax upfront so there are no unexpected surprises at the cash register.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Calculating tax on retail products
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Online retailers and independent merchants calculating quotes can determine exactly how much sales tax must be charged and collected from retail customers.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Comparing prices before and after tax
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Evaluate quotes between vendors located in different taxing districts or compare deals from merchants offering free shipping versus local pickup.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Estimating business purchase expenses
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Contractors, consultants, and procurement managers estimating project budgets can project total cash outlay by factoring in statutory sales taxes on materials.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: RELATED TOOLS                                         */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Related Calculators
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Discover other specialized tools in the ReverseTaxCalculator.pro platform:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Reverse Sales Tax Contextual Card */}
            <Link
              href="/"
              className="group p-5 rounded-2xl border border-blue-200 bg-blue-50/40 hover:border-blue-400 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse Sales Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Already have a tax-inclusive total? Use our Reverse Sales Tax Calculator to find the original price before tax.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Calculate Backwards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Sales Tax Breakdown Tool */}
            <Link
              href="/sales-tax-breakdown-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Sales Tax Breakdown Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                See exactly how sales tax dollars are allocated across state, county, municipal, and transit districts.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Breakdown Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Reverse VAT Calculator */}
            <Link
              href="/reverse-vat-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Percent className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse VAT Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Extract Value Added Tax (VAT) from gross European and British invoices at 20%, 21%, and custom rates.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open VAT Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: FAQ                                                   */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <FAQAccordion
            items={FAQS}
            title="Frequently Asked Questions About Sales Tax"
          />
        </section>
      </div>
    </>
  )
}
