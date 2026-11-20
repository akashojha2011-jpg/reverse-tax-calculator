import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ReversePstCalculatorTool } from '@/components/ReversePstCalculatorTool'
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
  title: 'Reverse PST Calculator – Remove PST from Total',
  description:
    'Remove PST from a tax-inclusive price with our free reverse PST calculator. Enter your total and PST rate to calculate the original price and PST amount instantly.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/reverse-pst-calculator/',
  },
  openGraph: {
    title: 'Reverse PST Calculator – Remove PST from Total',
    description:
      'Remove PST from a tax-inclusive price with our free reverse PST calculator. Enter your total and PST rate to calculate the original price and PST amount instantly.',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-pst-calculator/',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is a reverse PST calculator?',
    answer:
      'A reverse PST calculator is a financial tool designed to extract the original pre-tax price and the exact amount of Provincial Sales Tax (PST) included in a tax-inclusive purchase price or receipt total.',
  },
  {
    question: 'How do I remove PST from a total?',
    answer:
      'To remove PST from a total, divide the PST-inclusive gross amount by 1 plus the PST rate expressed as a decimal. For example, to remove 7% British Columbia PST from C$112.00: divide C$112.00 by 1.07 to find the C$104.67 pre-tax price. The PST amount included is C$7.33.',
  },
  {
    question: 'What is the formula for calculating PST backwards?',
    answer:
      'The backward PST formulas are: 1. Original Price = Gross Price ÷ (1 + PST Rate ÷ 100). 2. PST Amount = Gross Price - Original Price.',
  },
  {
    question: 'How do I calculate the original price before PST?',
    answer:
      'Divide the PST-inclusive invoice total by 1 plus the decimal PST percentage. For example, for a transaction of C$108.00 at 8% PST: C$108.00 ÷ 1.08 = C$100.00 original price before PST.',
  },
  {
    question: 'How do I extract PST from a gross amount?',
    answer:
      'Once you calculate the original pre-tax price using the divisor formula, subtract it from the total gross invoice figure. Alternatively, multiply the gross amount by the PST fraction: for 7% PST, multiply by 7/107.',
  },
  {
    question: "Why can't I simply subtract the PST percentage?",
    answer:
      'Subtracting the PST percentage directly from the gross total produces an inaccurate figure because statutory PST was originally charged on the lower pre-tax base, not the final gross amount. For instance, subtracting 7% directly from C$112.00 subtracts C$7.84, leaving C$104.16—which is C$0.51 less than the true C$104.67 net value.',
  },
  {
    question: 'What is the difference between PST and GST?',
    answer:
      'The Goods and Services Tax (GST) is a federal 5% tax applied uniformly across Canada by the federal government. Provincial Sales Tax (PST) is an independent sales tax enacted and administered separately by specific provincial governments (such as British Columbia and Saskatchewan).',
  },
  {
    question: 'Which Canadian provinces have PST?',
    answer:
      'British Columbia and Saskatchewan levy Provincial Sales Tax (PST). Manitoba imposes a similar provincial tax named Retail Sales Tax (RST). Quebec levies Quebec Sales Tax (QST). Other provinces either use the combined Harmonized Sales Tax (HST) or have no provincial sales tax (Alberta and the territories).',
  },
  {
    question: 'What is the difference between PST, RST and QST?',
    answer:
      'PST is the statutory name used in British Columbia and Saskatchewan. Manitoba uses Retail Sales Tax (RST), a distinct single-stage sales tax. Quebec uses Quebec Sales Tax (QST), a multi-stage provincial value-added tax administered by Revenu Québec that operates similarly to GST.',
  },
  {
    question: 'Can I remove both GST and PST using this calculator?',
    answer:
      'This calculator is designed to extract the specific PST percentage you provide. If a receipt includes both 5% GST and 7% PST calculated on the same pre-tax base, you can calculate total backwards tax by entering the combined 12% rate into the percentage field, or use our specialized Canadian tax calculators.',
  },
  {
    question: 'What is the difference between PST and HST?',
    answer:
      'HST (Harmonized Sales Tax) is a single, unified tax that combines the federal GST and provincial tax into one rate administered jointly by the Canada Revenue Agency. PST is administered separately by provincial ministries alongside the federal GST.',
  },
]

const CALCULATION_EXAMPLES = [
  { gross: 112.00, rate: 7, net: 104.67, pst: 7.33 },
  { gross: 105.00, rate: 5, net: 100.00, pst: 5.00 },
  { gross: 108.00, rate: 8, net: 100.00, pst: 8.00 },
  { gross: 110.00, rate: 10, net: 100.00, pst: 10.00 },
  { gross: 115.00, rate: 15, net: 100.00, pst: 15.00 },
]

export default function ReversePSTPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reverse PST Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-pst-calculator/',
    description:
      'Remove PST from a tax-inclusive price with our free reverse PST calculator. Enter your total and PST rate to calculate the original price and PST amount instantly.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reverse PST Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/reverse-pst-calculator/',
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
        name: 'Reverse PST Calculator',
        item: 'https://www.reversetaxcalculator.pro/tools/reverse-pst-calculator/',
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
          { name: 'Reverse PST Calculator', url: '/tools/reverse-pst-calculator/' },
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
              <span>Provincial Sales Tax Backwards Engine</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Reverse PST Calculator
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Need to remove PST from a total? Use our free reverse PST calculator to find the original price before Provincial Sales Tax. Enter your PST-inclusive amount and tax rate to instantly calculate the original price and PST included.
              </p>
            </div>

            {/* Three Key Value Propositions */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Calculate the original price before PST:</strong>{' '}
                  Quickly isolate pre-tax purchase totals from Canadian invoices and retail receipts.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">Extract PST from a tax-inclusive total:</strong>{' '}
                  Accurately determine the exact provincial sales tax component using statutory algebraic formulas.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-semibold">See a clear breakdown of the PST amount:</strong>{' '}
                  Inspect transparent step-by-step mathematical derivations with Canadian dollar (CAD) precision.
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
                <span>Canadian Provincial Precision</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Instant Copyable Results</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Reverse PST Calculator */}
          <div className="lg:col-span-6">
            <ReversePstCalculatorTool />
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: UNDERSTANDING PROVINCIAL SALES TAX IN CANADA           */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Provincial Sales Tax in Canada
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              PST stands for Provincial Sales Tax, an indirect consumption levy imposed by specific Canadian provinces on qualifying retail purchases:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Card 1: British Columbia PST */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>British Columbia PST</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">7% General</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                British Columbia levies a 7% general Provincial Sales Tax (PST) on retail sales and leases of qualifying goods and software under the Provincial Sales Tax Act, administered by the{' '}
                <a
                  href="https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                >
                  <span>BC Ministry of Finance</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </p>
            </div>

            {/* Card 2: Saskatchewan PST */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Saskatchewan PST</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">6% General</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Saskatchewan applies a 6% Provincial Sales Tax (PST) to taxable sales, leases, and services under the Provincial Sales Tax Act. Regulated by the Saskatchewan Ministry of Finance, it operates alongside federal GST.
              </p>
            </div>

            {/* Card 3: Manitoba RST */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Manitoba RST</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">7% RST</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Manitoba designates its provincial tax as Retail Sales Tax (RST) at 7%, rather than naming it PST. Administered by Manitoba Finance, it applies to retail sales of tangible personal property and specified services.
              </p>
            </div>

            {/* Card 4: Quebec QST */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>Quebec QST</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-bold">9.975% QST</span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                Quebec uses the Quebec Sales Tax (QST) at 9.975%. Administered by Revenu Québec, QST is a multi-stage value-added tax technically distinct from both single-stage PST and the federal GST.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 m-0 leading-relaxed">
            * Note: Provincial tax systems differ significantly. HST is a harmonized federal-provincial system and is not interchangeable with PST, RST, or QST. Always verify current applicable rates with relevant provincial ministries.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: HOW PST AND GST WORK TOGETHER                          */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How PST and GST Work Together
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In non-participating provinces (BC, SK, MB, and QC), retail transactions frequently include both the 5% federal GST and a separate provincial tax:
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 m-0">
              Dual Sales Tax Structure (Simplified Example)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs tabular-nums">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 font-medium text-[11px]">Pre-Tax Subtotal</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">C$100.00</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 font-medium text-[11px]">Federal GST (5%)</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">C$5.00</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 font-medium text-[11px]">Provincial PST (7%)</div>
                <div className="text-base font-bold text-blue-700 mt-0.5">C$7.00</div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <div className="text-blue-700 font-medium text-[11px]">Final Checkout Price</div>
                <div className="text-base font-extrabold text-blue-900 mt-0.5">C$112.00</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed m-0">
              In this scenario, both the 5% GST and the 7% PST apply independently to the same C$100.00 pre-tax base. The combined tax charged is C$12.00 (12%).
            </p>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="font-bold">Important Calculator Scope:</strong>
              <p className="m-0 leading-relaxed">
                This reverse PST calculator is engineered to extract <em>only the PST component</em> entered by the user. It does not automatically remove both GST and PST unless you enter the combined percentage. If your receipt is from a participating province that uses Harmonized Sales Tax, visit our{' '}
                <Link
                  href="/tools/reverse-hst-calculator/"
                  className="font-bold text-blue-700 hover:underline"
                >
                  Reverse HST Calculator →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: HOW TO USE THE REVERSE PST CALCULATOR                  */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Reverse PST Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extract pre-tax prices and provincial tax amounts in three easy steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Enter the Total Amount Including PST
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Input the final receipt or invoice figure paid, which already includes the provincial sales tax portion.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Enter the Applicable PST Percentage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Type the provincial rate (such as 7% for BC, 6% for SK, or 9.975% for QC) or select a quick preset button.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 m-0">
                Calculate & View the Result
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                Click calculate to find the original price before PST, the extracted PST amount, and the step-by-step formula.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: REVERSE PST FORMULA                                    */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Calculate PST Backwards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Deducting sales tax backwards requires dividing by the statutory tax factor rather than subtracting percentages:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                1. Original Price Formula
              </div>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm sm:text-base font-bold text-slate-900">
                Original Price = Gross Price ÷ (1 + PST Rate ÷ 100)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Dividing by the tax divisor scales the inclusive amount down to its true taxable baseline.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                2. Extracted PST Amount Formula
              </div>
              <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm sm:text-base font-bold text-blue-700">
                PST Amount = Gross Price - Original Price
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Subtracting the pre-tax price from the gross figure reveals the exact provincial tax remitted.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 m-0">
              Worked Example: Removing 7% PST from C$112.00
            </h3>
            <div className="font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <div>• Gross Price = C$112.00</div>
              <div>• PST Rate = 7%</div>
              <div>• Divisor = 1 + (7 ÷ 100) = <strong>1.07</strong></div>
              <div>• Original Price = C$112.00 ÷ 1.07 = <strong className="text-blue-900">C$104.67</strong></div>
              <div>• PST Amount = C$112.00 - C$104.67 = <strong className="text-blue-900">C$7.33</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-2 leading-relaxed">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Why Subtracting 7% Directly Produces an Inaccurate Result</span>
            </div>
            <p className="m-0 text-slate-700">
              A common error is taking 7% of C$112.00 (which equals C$7.84) and subtracting it directly, yielding C$104.16. This is mathematically invalid because the 7% tax was legally assessed on the pre-tax base of C$104.67 (7% of C$104.67 = C$7.33). You must always divide by <code>1 + (Rate ÷ 100)</code> to find the true net base.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: REVERSE PST CALCULATION EXAMPLES                       */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reverse PST Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Reference how original pre-tax prices and extracted PST amounts scale across common transaction figures:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4">Gross Price</th>
                  <th className="py-3 px-4">PST Rate</th>
                  <th className="py-3 px-4 text-blue-700">Original Price</th>
                  <th className="py-3 px-4">PST Amount</th>
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
                      C${row.pst.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 m-0">
            * Note: These are mathematical calculation examples for educational reference and do not represent claims regarding current statutory tax rates for any specific product, service, or province.
          </p>
        </section>

        {/* ================================================================= */}
        {/* SECTION 10: WHEN TO USE A REVERSE PST CALCULATOR                  */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Should You Use a Reverse PST Calculator?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Extracting provincial sales tax backwards from inclusive totals is essential in common personal and corporate accounting workflows:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Finding the original price from a PST-inclusive purchase
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Purchases made at point-of-sale terminals often display a single tax-inclusive figure. Reverse calculating isolates the pre-tax price paid.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Separating provincial sales tax from a receipt
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Accounting entries require separate line items for provincial tax paid on commercial goods versus deductible operating expenses.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Reviewing Canadian business expenses
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Unlike GST/HST, PST paid by businesses is generally an unrecoverable expense that is added to the cost basis of assets for tax reporting.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Understanding provincial tax amounts on invoices
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Reconciling contract milestone payments and commercial service invoices ensures billing compliance across provincial tax borders.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 11: PST CALCULATION LIMITATIONS DISCLAIMER                */}
        {/* ================================================================= */}
        <section className="space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Important PST Calculation Limitations</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed m-0">
              This calculator extracts PST using the gross amount and rate you provide. Actual provincial tax treatment may depend on the province, product or service, exemptions and transaction circumstances. Some Canadian jurisdictions use different provincial tax systems, including RST and QST. Verify the applicable tax treatment with the relevant provincial tax authority.
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
            {/* Card 1: Reverse HST Calculator */}
            <Link
              href="/tools/reverse-hst-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse HST Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Remove HST from a tax-inclusive total to find the original price before HST.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open HST Tool →</span>
              </div>
            </Link>

            {/* Card 2: Reverse GST Calculator */}
            <Link
              href="/tools/reverse-gst-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse GST Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Extract GST from a tax-inclusive amount to find the original price.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open GST Tool →</span>
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
            title="Frequently Asked Questions About Reverse PST"
          />
        </section>
      </div>
    </>
  )
}
