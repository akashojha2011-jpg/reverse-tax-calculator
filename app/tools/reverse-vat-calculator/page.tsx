import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ReverseVatCalculatorTool } from '@/components/ReverseVatCalculatorTool'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Receipt,
  FileText,
  DollarSign,
  Building2,
  Percent,
  Layers,
  AlertTriangle,
  BookOpen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator – Remove VAT from Total',
  description:
    'Remove VAT from a gross price with our free reverse VAT calculator. Enter your VAT-inclusive amount and rate to calculate the original net price and VAT amount.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
  },
  openGraph: {
    title: 'Reverse VAT Calculator – Remove VAT from Total',
    description:
      'Remove VAT from a gross price with our free reverse VAT calculator. Enter your VAT-inclusive amount and rate to calculate the original net price and VAT amount.',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is a reverse VAT calculator?',
    answer:
      'A reverse VAT calculator is a financial tool that calculates the original net price before tax and the exact amount of Value Added Tax (VAT) included in a tax-inclusive gross purchase price.',
  },
  {
    question: 'How do I remove VAT from a total?',
    answer:
      'To remove VAT from a total, divide the gross VAT-inclusive amount by 1 plus the VAT rate expressed as a decimal. For example, to remove 20% VAT from €120.00: divide €120.00 by 1.20 to get the €100.00 net price. The VAT included is €20.00.',
  },
  {
    question: 'What is the formula for calculating VAT backwards?',
    answer:
      'The backward VAT formulas are: 1. Net Price = Gross Amount ÷ (1 + VAT Rate ÷ 100). 2. VAT Amount = Gross Amount - Net Price.',
  },
  {
    question: 'How do I calculate the net price before VAT?',
    answer:
      'Divide the total gross figure by 1 plus the decimal VAT rate. For example, for an invoice of £240.00 at 20% VAT: £240.00 ÷ 1.20 = £200.00 net price.',
  },
  {
    question: 'How do I extract VAT from a gross amount?',
    answer:
      'Once you calculate the net price using the divisor formula, subtract the net price from the gross invoice total. Alternatively, multiply the gross price by the VAT fraction: for 20% VAT, multiply by 20/120 (or 1/6).',
  },
  {
    question: "Why can't I simply subtract the VAT percentage?",
    answer:
      'Subtracting the VAT percentage directly from the gross total produces an inaccurate figure because statutory VAT was originally assessed as a percentage of the lower pre-tax base, not the final gross amount. For instance, subtracting 20% from €120.00 subtracts €24.00, yielding €96.00—which is €4.00 less than the true €100.00 net value.',
  },
  {
    question: 'What is the difference between zero-rated and VAT-exempt goods?',
    answer:
      'Zero-rated goods and services are generally taxable at a 0% VAT rate, while exempt transactions are not subject to VAT under the applicable exemption rules. The treatment of input VAT can also differ. Exact rules depend on the country.',
  },
  {
    question: 'Can I calculate reverse VAT using different currencies?',
    answer:
      'Yes. Mathematical reverse VAT calculations function identically regardless of currency, whether in Euros (€), British Pounds (£), US Dollars ($), Swiss Francs (CHF), Canadian Dollars (C$), or Australian Dollars (A$). Currency formatting updates display symbols only.',
  },
  {
    question: 'Do VAT rates vary between countries?',
    answer:
      'Yes. Standard VAT rates vary internationally—for example, 20% in the United Kingdom and France, 19% in Germany, 21% in Spain and the Netherlands, and 25% in Sweden. Most jurisdictions also enforce reduced rates for essential commodities, energy, books, or food.',
  },
  {
    question: 'What is the difference between net price and gross price?',
    answer:
      'The net price is the pre-tax value of goods or services received by the merchant. The gross price is the final tax-inclusive amount paid by the customer, which includes the net price plus all assessed VAT.',
  },
]

const CALCULATION_EXAMPLES = [
  { symbol: '€', gross: 120.00, rate: 20, net: 100.00, vat: 20.00, currency: 'EUR' },
  { symbol: '€', gross: 149.99, rate: 19, net: 126.04, vat: 23.95, currency: 'EUR' },
  { symbol: '€', gross: 240.00, rate: 20, net: 200.00, vat: 40.00, currency: 'EUR' },
  { symbol: '€', gross: 119.00, rate: 19, net: 100.00, vat: 19.00, currency: 'EUR' },
  { symbol: '€', gross: 121.00, rate: 21, net: 100.00, vat: 21.00, currency: 'EUR' },
  { symbol: '£', gross: 115.00, rate: 15, net: 100.00, vat: 15.00, currency: 'GBP' },
  { symbol: '$', gross: 110.00, rate: 10, net: 100.00, vat: 10.00, currency: 'USD' },
]

export default function ReverseVATPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reverse VAT Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
    description:
      'Remove VAT from a gross price with our free reverse VAT calculator. Enter your VAT-inclusive amount and rate to calculate the original net price and VAT amount.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse VAT Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-vat-calculator/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
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
    name: 'How to Use the Reverse VAT Calculator',
    description: 'Extract net price and Value Added Tax from a gross total in three steps.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter VAT-inclusive total price',
        text: 'Enter the total price including VAT (gross amount).',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter VAT percentage',
        text: 'Enter the VAT percentage applied to the purchase or click a preset rate.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate',
        text: 'Click Calculate to see the original net price and VAT amount included.',
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
          { name: 'Reverse VAT Calculator', url: '/tools/reverse-vat-calculator' },
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
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>Value Added Tax Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Reverse VAT Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Need to remove VAT from a total? Use our free reverse VAT calculator to find the original price before VAT from a VAT-inclusive amount. Enter your gross price and VAT rate to instantly calculate the net amount and VAT included.
              </p>

              {/* Three Concise Benefits */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Calculate the original price before VAT.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Extract the VAT amount from a gross total.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    See a clear calculation breakdown.
                  </span>
                </div>
              </div>

              {/* Subtle Supporting Example */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium">
                <span className="font-semibold text-slate-900">Example:</span> €120.00 gross total with 20% VAT = €100.00 net price and €20.00 VAT included.
              </div>

              {/* Trust Statement */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Online Calculator • No registration required</span>
              </div>
            </div>

            {/* Right Column: Prominent Calculator Tool */}
            <div className="lg:col-span-6 w-full">
              <ReverseVatCalculatorTool />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: HOW TO USE THE CALCULATOR                             */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Reverse VAT Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extract net amounts and tax components from any gross purchase in three simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 1: Enter gross price</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the total price including VAT (the gross checkout amount or receipt total).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 2: Enter VAT rate</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the applicable VAT percentage, or click one of the quick rate presets (e.g. 20%, 19%, 21%).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 3: Calculate</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Click <strong>Calculate Pre-VAT Net</strong> to see the original net price and VAT amount included.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: REVERSE VAT FORMULA                                    */}
        {/* ================================================================= */}
        <section className="space-y-6 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Calculate VAT Backwards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When a price already includes Value Added Tax, extracting the original net figure requires dividing by the tax factor rather than multiplying:
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mathematical Formula
            </div>

            <div className="space-y-2 font-mono text-sm sm:text-base text-blue-800 font-bold">
              <div>Net Price = Gross Price ÷ (1 + VAT Rate ÷ 100)</div>
              <div>VAT Amount = Gross Price - Net Price</div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <div className="font-sans font-bold text-slate-900">Worked Numerical Example:</div>
              <div>• Gross price: <strong>€120.00</strong></div>
              <div>• VAT rate: <strong>20%</strong> (0.20 in decimal form)</div>
              <div>• Net price = €120.00 ÷ 1.20 = <strong>€100.00</strong></div>
              <div>• VAT amount = €120.00 - €100.00 = <strong>€20.00</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2 leading-relaxed">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Why Subtracting 20% Directly Produces an Inaccurate Result</span>
            </div>
            <p className="m-0 text-slate-700">
              A common misconception is that subtracting 20% directly from a €120.00 gross total gives the pre-tax price. However, 20% of €120.00 is €24.00, which leaves €96.00—an incorrect figure. Statutory VAT was legally charged as 20% of the original €100.00 net base (€20.00), not of the €120.00 total. You must always divide by <code>1 + (Rate ÷ 100)</code> to find the true net price.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: REVERSE VAT CALCULATION EXAMPLES                       */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reverse VAT Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Reference how pre-tax net values and extracted VAT amounts scale across typical international transaction totals:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Gross Price</th>
                  <th className="py-3 px-4">VAT Rate</th>
                  <th className="py-3 px-4 text-blue-700">Net Price</th>
                  <th className="py-3 px-4">VAT Amount</th>
                  <th className="py-3 px-4 text-slate-500">Currency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CALCULATION_EXAMPLES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {row.symbol}{row.gross.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{row.rate}%</td>
                    <td className="py-3 px-4 font-bold text-blue-700">
                      {row.symbol}{row.net.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {row.symbol}{row.vat.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{row.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Note: These are mathematical calculation examples for educational reference and do not represent claims regarding the legally applicable statutory VAT rate for any specific product, service, or country.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: UNDERSTANDING VAT RATES                                */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding VAT Rates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Value Added Tax is an indirect consumption tax levied incrementally on the value added to goods and services at each stage of production and distribution:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs">Standard VAT Rates</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Standard VAT rates generally apply to most taxable goods and services in a particular jurisdiction.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs">Reduced VAT Rates</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Some qualifying goods and services may receive reduced VAT rates depending on the country&apos;s tax legislation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs">Zero-Rated Supplies</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Zero-rated supplies are generally taxable supplies charged at 0% VAT, subject to local rules.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs">Exempt Transactions</div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Exempt transactions are not subject to VAT under the applicable exemption rules. Input VAT recovery treatment may differ.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            VAT rates and tax treatments vary by country, product category and transaction. Always enter the rate applicable to your purchase.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: WHEN TO USE A REVERSE VAT CALCULATOR                   */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Should You Use a Reverse VAT Calculator?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extracting VAT backwards from tax-inclusive totals is essential in common personal and professional accounting workflows:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Finding the net price from a VAT-inclusive invoice
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                In B2C retail transactions where prices must be displayed inclusive of VAT by law, extract the original pre-tax selling price for internal accounting and ERP systems.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Separating VAT from a purchase receipt
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Retail receipts from fuel stations, hotels, and hardware stores frequently list only the final gross total, requiring bookkeepers to separate VAT for periodic tax returns.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Reviewing business expenses
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Ensure employees, sole traders, and contractors accurately split expense reimbursements into claimable input VAT and operational base costs.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Calculating the VAT portion of a gross transaction
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Cross-border merchants reconciling digital sales can determine the precise tax liabilities owed across different national tax authorities.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: VAT CALCULATION LIMITATIONS                            */}
        {/* ================================================================= */}
        <section className="max-w-4xl">
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Important VAT Calculation Limitations</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed m-0">
              This calculator extracts VAT using the gross amount and VAT rate you provide. Actual VAT treatment may depend on country-specific rules, product categories, exemptions, rounding methods and transaction circumstances. Always verify the applicable VAT rate with the relevant tax authority.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: RELATED CALCULATORS                                   */}
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
            {/* Card 1: Reverse Sales Tax Calculator */}
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
                Remove sales tax from a tax-inclusive receipt total to find the original price.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Calculate Backwards →</span>
              </div>
            </Link>

            {/* Card 2: Sales Tax Calculator */}
            <Link
              href="/tools/sales-tax-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Sales Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate sales tax on a purchase and find the final price including tax.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Sales Tax Tool →</span>
              </div>
            </Link>

            {/* Card 3: Sales Tax Breakdown Calculator */}
            <Link
              href="/tools/sales-tax-breakdown/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Sales Tax Breakdown Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Separate sales tax into state, county, city and special district components.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Breakdown Tool →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 10: FAQ                                                   */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <FAQAccordion
            items={FAQS}
            title="Frequently Asked Questions About Reverse VAT"
          />
        </section>
      </div>
    </>
  )
}
