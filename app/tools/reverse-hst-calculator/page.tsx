import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ReverseHstCalculatorTool } from '@/components/ReverseHstCalculatorTool'
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
  MapPin,
  ExternalLink,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse HST Calculator – Remove HST from Total',
  description:
    'Remove HST from a tax-inclusive price with our free reverse HST calculator. Enter your total and HST rate to calculate the original price and HST amount instantly.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/reverse-hst-calculator/',
  },
  openGraph: {
    title: 'Reverse HST Calculator – Remove HST from Total',
    description:
      'Remove HST from a tax-inclusive price with our free reverse HST calculator. Enter your total and HST rate to calculate the original price and HST amount instantly.',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-hst-calculator/',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is a reverse HST calculator?',
    answer:
      'A reverse HST calculator is a specialized financial tool that extracts the original pre-tax price and the exact Harmonized Sales Tax (HST) amount from a tax-inclusive Canadian purchase receipt or invoice total.',
  },
  {
    question: 'How do I remove HST from a total?',
    answer:
      'To remove HST from a total, divide the tax-inclusive gross amount by 1 plus the HST rate expressed as a decimal. For example, to remove 13% Ontario HST from C$113.00: divide C$113.00 by 1.13 to find the C$100.00 pre-tax price. The HST included is C$13.00.',
  },
  {
    question: 'What is the formula for calculating HST backwards?',
    answer:
      'The backward HST formulas are: 1. Original Price = Gross Price ÷ (1 + HST Rate ÷ 100). 2. HST Amount = Gross Price - Original Price.',
  },
  {
    question: 'How do I calculate the original price before HST?',
    answer:
      'Divide the final gross invoice figure by 1 plus the decimal HST rate. For example, for an Atlantic Canada invoice of C$115.00 at 15% HST: C$115.00 ÷ 1.15 = C$100.00 original price before HST.',
  },
  {
    question: 'How do I extract HST from a gross amount?',
    answer:
      'Once you calculate the original pre-tax price using the divisor formula, subtract it from the total gross invoice figure. Alternatively, multiply the gross amount by the HST fraction: for 13% HST, multiply by 13/113; for 15% HST, multiply by 15/115.',
  },
  {
    question: "Why can't I simply subtract the HST percentage?",
    answer:
      'Subtracting the HST percentage directly from the gross total produces an inaccurate figure because statutory HST was originally assessed on the lower pre-tax base, not the final gross total. For example, subtracting 13% from C$113.00 subtracts C$14.69, yielding C$98.31—which is C$1.69 less than the true C$100.00 net value.',
  },
  {
    question: 'What is the difference between HST and GST?',
    answer:
      'The Goods and Services Tax (GST) is a federal 5% tax applied across all of Canada. The Harmonized Sales Tax (HST) combines the federal 5% GST with a participating province’s provincial sales tax into a single, unified tax administered jointly by the Canada Revenue Agency (CRA).',
  },
  {
    question: 'Do all Canadian provinces use HST?',
    answer:
      'No. Only five Canadian provinces currently participate in the HST system: Ontario (13%), Nova Scotia (15%), New Brunswick (15%), Prince Edward Island (15%), and Newfoundland and Labrador (15%). Other provinces use separate provincial taxes or federal GST only.',
  },
  {
    question: 'What is the difference between HST and PST?',
    answer:
      'PST (Provincial Sales Tax) is levied and administered separately by individual provincial governments (such as British Columbia and Saskatchewan) alongside the federal GST. In contrast, HST is a single blended tax collected jointly under a single federal administration.',
  },
  {
    question: 'Can I use this calculator for GST-only provinces?',
    answer:
      'Yes. For provinces and territories without a provincial sales tax (Alberta, Yukon, Northwest Territories, Nunavut), you can enter the federal 5% rate into the calculator to extract the 5% GST backwards from tax-inclusive totals.',
  },
]

const CALCULATION_EXAMPLES = [
  { gross: 113.00, rate: 13, net: 100.00, hst: 13.00 },
  { gross: 115.00, rate: 15, net: 100.00, hst: 15.00 },
  { gross: 105.00, rate: 5, net: 100.00, hst: 5.00 },
  { gross: 108.00, rate: 8, net: 100.00, hst: 8.00 },
  { gross: 120.00, rate: 20, net: 100.00, hst: 20.00 },
]

export default function ReverseHSTPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reverse HST Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-hst-calculator/',
    description:
      'Remove HST from a tax-inclusive price with our free reverse HST calculator. Enter your total and HST rate to calculate the original price and HST amount instantly.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse HST Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-hst-calculator/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.reversetaxcalculator.pro/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://www.reversetaxcalculator.pro/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Reverse HST Calculator',
        item: 'https://www.reversetaxcalculator.pro/tools/reverse-hst-calculator/',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Reverse HST Calculator', url: '/tools/reverse-hst-calculator/' },
        ]}
      />

      <div className="space-y-12 sm:space-y-16 max-w-7xl mx-auto">
        {/* ================================================================= */}
        {/* HERO SECTION WITH DUAL COLUMN LAYOUT                              */}
        {/* ================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
          {/* Left Column: Headline, Value Proposition, Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide">
              <Percent className="w-3.5 h-3.5 text-blue-600" />
              <span>Harmonized Sales Tax Backwards Engine</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Reverse HST Calculator
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Need to remove HST from a total? Use our free reverse HST calculator to find the original price before Harmonized Sales Tax. Enter your HST-inclusive amount and tax rate to instantly calculate the original price and HST included.
              </p>
            </div>

            {/* Three Key Value Propositions */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Calculate the original price before HST:</strong>{' '}
                  Accurately isolate pre-tax purchase amounts from any Canadian tax-inclusive receipt or commercial invoice.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Extract HST from a tax-inclusive total:</strong>{' '}
                  Quickly determine the exact tax amount included using standard Canada Revenue Agency divisor formulas.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">See a clear breakdown of the HST amount:</strong>{' '}
                  View transparent step-by-step arithmetic and optional federal vs. provincial component splits for participating provinces.
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Canadian Dollar (CAD) Precision</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Instant Copyable Results</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Reverse HST Calculator */}
          <div className="lg:col-span-6">
            <ReverseHstCalculatorTool />
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: UNDERSTANDING HARMONIZED SALES TAX IN CANADA           */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Harmonized Sales Tax in Canada
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Consumption taxes in Canada are structured through a blend of federal and provincial frameworks, with HST providing a unified system in participating jurisdictions:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Harmonized Sales Tax */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Harmonized Sales Tax (HST)</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">Unified</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 m-0 leading-relaxed">
                HST combines the 5% federal GST with a participating province’s sales tax into a single, harmonized rate. Administered jointly by the{' '}
                <a
                  href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  <span>Canada Revenue Agency (CRA)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>, it simplifies compliance by replacing dual tax filings with one combined percentage.
              </p>
            </div>

            {/* Card 2: GST and Provincial Sales Tax */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>GST & Separate Provincial Tax</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold">Dual System</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 m-0 leading-relaxed">
                Several provinces (British Columbia, Saskatchewan, Manitoba, and Quebec) choose not to participate in the HST framework. Instead, they collect the 5% federal GST alongside a separately administered provincial tax (PST, RST, or QST).
              </p>
            </div>

            {/* Card 3: Provincial Tax Differences */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Provincial Tax Differences</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Territories</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 m-0 leading-relaxed">
                Applicable sales tax rates and collection rules vary across Canadian provinces and territories. Alberta and the three territories (Yukon, Northwest Territories, Nunavut) do not levy any provincial or territorial sales tax, meaning only the 5% federal GST applies.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            * Note: Tax treatment can depend on the province, product or service category, place of supply rules, and transaction circumstances. Always verify current applicable rates with official revenue authorities.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: PROVINCE AND RATE GUIDANCE                             */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Does HST Differ by Province?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Yes. HST applies only in participating Canadian provinces under bilateral agreements with the federal government. Current statutory rates (verified with the Canada Revenue Agency for 2024/2025) are structured as follows:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Province / Territory</th>
                  <th className="py-3 px-4">Tax System</th>
                  <th className="py-3 px-4 text-blue-700">Combined Rate</th>
                  <th className="py-3 px-4">Federal GST</th>
                  <th className="py-3 px-4">Provincial Part</th>
                  <th className="py-3 px-4 text-slate-500">Reverse Divisor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Ontario</td>
                  <td className="py-3 px-4 font-medium text-blue-700">HST Participating</td>
                  <td className="py-3 px-4 font-bold text-blue-700">13%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">8%</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.13</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Nova Scotia</td>
                  <td className="py-3 px-4 font-medium text-blue-700">HST Participating</td>
                  <td className="py-3 px-4 font-bold text-blue-700">15%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.15</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">New Brunswick</td>
                  <td className="py-3 px-4 font-medium text-blue-700">HST Participating</td>
                  <td className="py-3 px-4 font-bold text-blue-700">15%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.15</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Prince Edward Island</td>
                  <td className="py-3 px-4 font-medium text-blue-700">HST Participating</td>
                  <td className="py-3 px-4 font-bold text-blue-700">15%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.15</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Newfoundland and Labrador</td>
                  <td className="py-3 px-4 font-medium text-blue-700">HST Participating</td>
                  <td className="py-3 px-4 font-bold text-blue-700">15%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.15</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">British Columbia</td>
                  <td className="py-3 px-4 text-slate-600">GST + PST (Separate)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">12% (5% + 7%)</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">7% PST</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.12</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Quebec</td>
                  <td className="py-3 px-4 text-slate-600">GST + QST (Separate)</td>
                  <td className="py-3 px-4 font-bold text-slate-900">14.975%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">9.975% QST</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.14975</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">Alberta & Territories</td>
                  <td className="py-3 px-4 text-slate-600">GST Only</td>
                  <td className="py-3 px-4 font-bold text-slate-900">5%</td>
                  <td className="py-3 px-4">5%</td>
                  <td className="py-3 px-4">0%</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">1.05</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Source: Canada Revenue Agency (CRA) GST/HST rate schedules, effective 2024/2025. In non-HST provinces, provincial sales tax may have distinct taxable bases and exemptions.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: HOW TO USE THE REVERSE HST CALCULATOR                  */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Reverse HST Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extract pre-tax amounts and Harmonized Sales Tax in three straightforward steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Enter the Total Amount Including HST
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Type the final receipt or invoice figure paid, which already includes the Harmonized Sales Tax.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Enter the Applicable HST Percentage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Input your province’s rate (e.g. 13% for Ontario or 15% for Atlantic Canada) or choose from preset buttons.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Calculate & Review the Extracted Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Click calculate to instantly see the pre-tax price, total HST paid, algebraic formula, and component splits.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: REVERSE HST FORMULA                                    */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Calculate HST Backwards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extracting sales tax backwards requires dividing by the statutory tax factor rather than subtracting percentages:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                1. Original Price Formula
              </div>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm sm:text-base font-bold text-slate-900">
                Original Price = Gross Price ÷ (1 + HST Rate ÷ 100)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Dividing by the tax factor accounts for the fact that HST was assessed on the lower pre-tax base.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                2. Extracted HST Amount Formula
              </div>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm sm:text-base font-bold text-blue-700">
                HST Amount = Gross Price - Original Price
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Subtracting the calculated pre-tax net amount from the gross invoice total reveals the exact HST paid.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 m-0">
              Worked Example: Removing 13% Ontario HST from C$113.00
            </h3>
            <div className="font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <div>• Gross Price = C$113.00</div>
              <div>• HST Rate = 13%</div>
              <div>• Divisor = 1 + (13 ÷ 100) = <strong>1.13</strong></div>
              <div>• Original Price = C$113.00 ÷ 1.13 = <strong className="text-blue-900">C$100.00</strong></div>
              <div>• HST Amount = C$113.00 - C$100.00 = <strong className="text-blue-900">C$13.00</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2 leading-relaxed">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Why Subtracting 13% Directly Produces an Inaccurate Result</span>
            </div>
            <p className="m-0 text-slate-700">
              A frequent accounting mistake is taking 13% of the C$113.00 total (which equals C$14.69) and subtracting it, leaving C$98.31. This is mathematically incorrect because the merchant legally charged 13% on the original C$100.00 base (13% of C$100.00 = C$13.00). You must always divide by <code>1 + (Rate ÷ 100)</code> to find the true net base.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: REVERSE HST CALCULATION EXAMPLES                       */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reverse HST Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Examine how original pre-tax prices and extracted HST amounts scale across common transaction figures:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Gross Price</th>
                  <th className="py-3 px-4">HST Rate</th>
                  <th className="py-3 px-4 text-blue-700">Original Price</th>
                  <th className="py-3 px-4">HST Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CALCULATION_EXAMPLES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      C${row.gross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{row.rate}%</td>
                    <td className="py-3 px-4 font-bold text-blue-700">
                      C${row.net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      C${row.hst.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Note: These are mathematical calculation examples for educational reference and do not represent claims regarding the statutory HST rate for any specific product, service, or province.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 10: WHEN TO USE A REVERSE HST CALCULATOR                  */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Should You Use a Reverse HST Calculator?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extracting Harmonized Sales Tax from tax-inclusive totals is essential in common Canadian business and bookkeeping situations:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Finding the original price from an HST-inclusive receipt
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Retail and dining receipts often display a single bottom-line total. Reverse calculation determines the exact pre-tax cost of goods and services purchased.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Separating HST from a Canadian purchase invoice
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Vendor invoices formatted with inclusive pricing must be decomposed into net operational expense and sales tax payable for general ledger entries.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Reviewing business expenses and accounting records
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                GST/HST registrant businesses claim Input Tax Credits (ITCs) on business expenses. Reverse calculations identify the exact recoverable tax credit paid.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Calculating the HST portion of a gross transaction
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Fixed-price client contracts or lump-sum fee agreements require backwards tax deduction to determine true net service revenue.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 11: HST CALCULATION LIMITATIONS DISCLAIMER                */}
        {/* ================================================================= */}
        <section className="space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Important HST Calculation Limitations</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed m-0">
              This calculator extracts HST using the gross amount and rate you provide. Actual Canadian sales tax treatment may depend on the province, product or service, place of supply, exemptions and transaction circumstances. Some jurisdictions use GST and separate provincial sales taxes rather than HST. Verify the applicable tax treatment with the Canada Revenue Agency or relevant provincial tax authority.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 12: RELATED CALCULATORS                                   */}
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
            {/* Card 1: Reverse GST Calculator */}
            <Link
              href="/tools/reverse-gst-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse GST Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Remove GST from a tax-inclusive total to find the original price before GST.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open GST Tool →</span>
              </div>
            </Link>

            {/* Card 2: Reverse VAT Calculator */}
            <Link
              href="/tools/reverse-vat-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse VAT Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Extract VAT from a gross price to calculate the original net amount.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open VAT Tool →</span>
              </div>
            </Link>

            {/* Card 3: Reverse Sales Tax Calculator */}
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
                Remove sales tax from a receipt total to find the original pre-tax price.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Calculate Backwards →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 13: FAQ ACCORDION                                         */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <FAQAccordion
            items={FAQS}
            title="Frequently Asked Questions About Reverse HST"
          />
        </section>
      </div>
    </>
  )
}
