import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ReverseGstCalculatorTool } from '@/components/ReverseGstCalculatorTool'
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
  Globe2,
  ExternalLink,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse GST Calculator – Remove GST from Total',
  description:
    'Calculate the original price before GST from a GST-inclusive amount. Enter your total and GST rate to find the pre-tax price and GST amount instantly.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/reverse-gst-calculator/',
  },
  openGraph: {
    title: 'Reverse GST Calculator – Remove GST from Total',
    description:
      'Calculate the original price before GST from a GST-inclusive amount. Enter your total and GST rate to find the pre-tax price and GST amount instantly.',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-gst-calculator/',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is a reverse GST calculator?',
    answer:
      'A reverse GST calculator is a financial tool that calculates the original pre-tax price and extracts the exact Goods and Services Tax (GST) amount included in a tax-inclusive total purchase or invoice price.',
  },
  {
    question: 'How do I remove GST from a total?',
    answer:
      'To remove GST from a total, divide the GST-inclusive gross amount by 1 plus the GST rate expressed as a decimal. For example, to remove 18% GST from ₹1,180: divide ₹1,180 by 1.18 to find the original pre-tax price of ₹1,000. The GST included is ₹180.',
  },
  {
    question: 'What is the formula for calculating GST backwards?',
    answer:
      'The backward GST formulas are: 1. Pre-GST Price = Gross Price ÷ (1 + GST Rate ÷ 100). 2. GST Amount = Gross Price - Pre-GST Price.',
  },
  {
    question: 'How do I calculate the original price before GST?',
    answer:
      'Divide the final invoice total by 1 plus the decimal tax rate. For example, for an Australian invoice of $110 at 10% GST: $110 ÷ 1.10 = $100 original price before GST.',
  },
  {
    question: 'How do I extract GST from a GST-inclusive amount?',
    answer:
      'After finding the pre-tax price using the divisor formula, subtract the pre-tax price from the gross invoice total. Alternatively, multiply the gross amount by the tax fraction: for 18% GST, multiply by 18/118.',
  },
  {
    question: "Why can't I simply subtract the GST percentage?",
    answer:
      'Subtracting the tax percentage directly from the gross total produces an inaccurate figure because statutory GST was originally charged on the lower pre-tax base, not the final gross amount. For instance, subtracting 18% from ₹1,180 subtracts ₹212.40, resulting in ₹967.60—which is ₹32.40 lower than the true ₹1,000 net base.',
  },
  {
    question: 'What is the difference between GST-inclusive and GST-exclusive prices?',
    answer:
      'A GST-exclusive price is the base purchase price before sales tax is added. A GST-inclusive price represents the complete final price paid by the consumer, including all applicable Goods and Services Tax.',
  },
  {
    question: 'Does GST work the same way in every country?',
    answer:
      'No. While the mathematical formula for reverse calculation is uniform, statutory rules differ. India uses a dual GST model (CGST/SGST/IGST), Canada combines federal GST with provincial taxes (HST/PST/QST), Australia levies a 10% standard rate, and New Zealand applies 15%.',
  },
  {
    question: 'What is the difference between CGST, SGST and IGST?',
    answer:
      'In India, Central GST (CGST) and State GST (SGST) are levied equally on intra-state sales within the same state. Integrated GST (IGST) is levied on inter-state sales across state borders and on imports.',
  },
  {
    question: 'Can I use this calculator for Canadian GST and HST?',
    answer:
      'Yes. You can enter Canada’s federal 5% GST or the combined Harmonized Sales Tax (HST) rate for your province (such as 13% for Ontario or 15% for Atlantic provinces) to calculate the pre-tax base price and tax amount.',
  },
]

const CALCULATION_EXAMPLES = [
  { symbol: '₹', gross: 1180.00, rate: 18, net: 1000.00, gst: 180.00, currency: 'INR' },
  { symbol: '₹', gross: 1050.00, rate: 5, net: 1000.00, gst: 50.00, currency: 'INR' },
  { symbol: '₹', gross: 1120.00, rate: 12, net: 1000.00, gst: 120.00, currency: 'INR' },
  { symbol: '$', gross: 110.00, rate: 10, net: 100.00, gst: 10.00, currency: 'AUD' },
  { symbol: '$', gross: 118.00, rate: 18, net: 100.00, gst: 18.00, currency: 'CAD' },
  { symbol: '$', gross: 105.00, rate: 5, net: 100.00, gst: 5.00, currency: 'SGD' },
]

export default function ReverseGSTPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reverse GST Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-gst-calculator/',
    description:
      'Calculate the original price before GST from a GST-inclusive amount. Enter your total and GST rate to find the pre-tax price and GST amount instantly.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse GST Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-gst-calculator/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
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
        name: 'Reverse GST Calculator',
        item: 'https://www.reversetaxcalculator.pro/tools/reverse-gst-calculator/',
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
          { name: 'Reverse GST Calculator', url: '/tools/reverse-gst-calculator/' },
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
              <span>Goods and Services Tax Backwards Engine</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Reverse GST Calculator
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Need to remove GST from a total? Use our free reverse GST calculator to find the original price before Goods and Services Tax. Enter your GST-inclusive amount and tax rate to instantly calculate the net price and GST included.
              </p>
            </div>

            {/* Three Key Value Propositions */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Calculate the original price before GST:</strong>{' '}
                  Quickly isolate pre-tax net values from tax-inclusive purchase totals and receipts.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Extract GST from a tax-inclusive total:</strong>{' '}
                  Accurately determine the exact tax amount included using standard statutory divisor algebra.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">View a clear breakdown of the GST amount:</strong>{' '}
                  Access transparent step-by-step math and optional dual component splits for India (CGST/SGST/IGST).
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
                <span>Multi-Currency Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Instant Copyable Results</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Reverse GST Calculator */}
          <div className="lg:col-span-6">
            <ReverseGstCalculatorTool />
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: UNDERSTANDING GST IN DIFFERENT COUNTRIES               */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding GST in Different Countries
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Goods and Services Tax is an indirect consumption tax enacted internationally, but each country enforces unique frameworks, rate structures, and transaction rules:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Card 1: India */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>India GST Framework</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">Dual GST</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                India&apos;s GST framework includes Central GST (CGST), State GST (SGST), Union Territory GST (UTGST), and Integrated GST (IGST). Intra-state transactions generally involve equal splits between CGST and SGST, while inter-state transactions involve IGST.
              </p>
            </div>

            {/* Card 2: Canada */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Canada GST & HST</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-bold">Federal / Prov.</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Canadian transactions involve a 5% federal GST combined with provincial taxes depending on location. Some provinces use Harmonized Sales Tax (HST, e.g. 13%–15%), while others maintain separate Provincial Sales Tax (PST) or Quebec Sales Tax (QST).
              </p>
            </div>

            {/* Card 3: Australia */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Australia GST (ATO)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">10% Standard</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Australia&apos;s GST is generally applied at a broad-based 10% rate on most taxable goods, services, and other items sold or consumed in Australia, governed by the{' '}
                <a
                  href="https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  <span>Australian Taxation Office (ATO)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </p>
            </div>

            {/* Card 4: New Zealand */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>New Zealand GST (IRD)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold">15% Standard</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                New Zealand has its own comprehensive GST framework with a standard 15% rate applied to almost all goods and services supplied in the country, administered by{' '}
                <a
                  href="https://www.ird.govt.nz/gst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  <span>Inland Revenue (IRD)</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            GST systems, rates and tax components differ between countries. Always enter the applicable rate and consider the rules governing your transaction.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: HOW TO USE THE REVERSE GST CALCULATOR                  */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Reverse GST Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extract pre-tax prices and tax portions from any GST-inclusive amount in three simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Enter the GST-Inclusive Amount
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Input the final total purchase or invoice amount paid, which already includes the Goods and Services Tax.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Enter the GST Percentage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Type the applicable GST rate or choose from one of the quick preset buttons (e.g. 18%, 10%, 15%, 5%).
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Calculate & Review the Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Click calculate to find the original price before GST, extracted GST amount, algebraic formula, and component splits.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: REVERSE GST FORMULA                                    */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Calculate GST Backwards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extracting sales tax from a gross figure requires statutory divisor algebra rather than simple percentage subtraction:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                1. Original Pre-GST Price Formula
              </div>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm sm:text-base font-bold text-slate-900">
                Pre-GST Price = Gross Price ÷ (1 + GST Rate ÷ 100)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Dividing by the statutory tax factor scales the gross total back down to its original pre-tax taxable baseline.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                2. Extracted GST Amount Formula
              </div>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm sm:text-base font-bold text-blue-700">
                GST Amount = Gross Price - Pre-GST Price
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Subtracting the pre-tax price from the gross figure leaves the exact statutory GST remitted to the revenue authority.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 m-0">
              Worked Example: Removing 18% GST from ₹1,180.00
            </h3>
            <div className="font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <div>• Gross Price = ₹1,180.00</div>
              <div>• GST Rate = 18%</div>
              <div>• Divisor = 1 + (18 ÷ 100) = <strong>1.18</strong></div>
              <div>• Pre-GST Price = ₹1,180.00 ÷ 1.18 = <strong className="text-blue-900">₹1,000.00</strong></div>
              <div>• GST Amount = ₹1,180.00 - ₹1,000.00 = <strong className="text-blue-900">₹180.00</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2 leading-relaxed">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Why Subtracting 18% Directly Produces an Inaccurate Result</span>
            </div>
            <p className="m-0 text-slate-700">
              A common accounting mistake is attempting to subtract 18% directly from ₹1,180.00. However, 18% of ₹1,180.00 is ₹212.40, leaving an incorrect figure of ₹967.60. Legally, the 18% GST was assessed on the lower ₹1,000.00 base (18% of ₹1,000.00 = ₹180.00). You must always divide by <code>1 + (Rate ÷ 100)</code> to determine the true net price.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 10: REVERSE GST CALCULATION EXAMPLES                      */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reverse GST Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Reference how pre-tax net values and extracted GST amounts scale across typical international transaction totals:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Gross Price</th>
                  <th className="py-3 px-4">GST Rate</th>
                  <th className="py-3 px-4 text-blue-700">Net Price</th>
                  <th className="py-3 px-4">GST Amount</th>
                  <th className="py-3 px-4 text-slate-500">Currency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CALCULATION_EXAMPLES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {row.symbol}{row.gross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{row.rate}%</td>
                    <td className="py-3 px-4 font-bold text-blue-700">
                      {row.symbol}{row.net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {row.symbol}{row.gst.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{row.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Note: These are mathematical calculation examples for educational reference and do not represent claims regarding the legally applicable statutory GST rate for any specific product, service, or country.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 11: WHEN TO USE A REVERSE GST CALCULATOR                  */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Should You Use a Reverse GST Calculator?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extracting GST backwards from tax-inclusive totals is essential in common personal and professional accounting workflows:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Finding the original price from a GST-inclusive invoice
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Invoices often present a single tax-inclusive figure. Reverse calculating reveals the exact pre-tax commercial value received by the vendor.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Separating GST from a purchase receipt
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Retail cash register receipts frequently display only the final charged amount. Bookkeepers use reverse calculation to log taxable items accurately.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Reviewing business purchases and expenses
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Registered businesses must claim input tax credits (ITC) by isolating the GST portion from commercial equipment, software, or operating expenses.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Calculating the GST portion of a gross transaction
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Pricing contracts often require quote reconciliation to ensure profit margins meet revenue targets after statutory tax obligations are settled.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 12: GST CALCULATION LIMITATIONS DISCLAIMER                */}
        {/* ================================================================= */}
        <section className="space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Important GST Calculation Limitations</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed m-0">
              This calculator extracts GST using the gross amount and rate you provide. Actual GST treatment may depend on the country, product category, transaction type, exemptions and jurisdiction-specific rules. Verify the applicable tax rate with the relevant tax authority.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 13: RELATED CALCULATORS                                   */}
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
            {/* Card 1: Reverse VAT Calculator */}
            <Link
              href="/tools/reverse-vat-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse VAT Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Remove VAT from a tax-inclusive total to find the original net price.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open VAT Tool →</span>
              </div>
            </Link>

            {/* Card 2: Reverse Sales Tax Calculator */}
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

            {/* Card 3: Sales Tax Calculator */}
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
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 14: FAQ ACCORDION                                         */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <FAQAccordion
            items={FAQS}
            title="Frequently Asked Questions About Reverse GST"
          />
        </section>
      </div>
    </>
  )
}
