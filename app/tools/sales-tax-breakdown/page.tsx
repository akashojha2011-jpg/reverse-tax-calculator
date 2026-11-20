import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { SalesTaxBreakdownTool } from '@/components/SalesTaxBreakdownTool'
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
  AlertTriangle,
  Landmark,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Breakdown Calculator – State & Local Tax',
  description:
    'Break down sales tax into state, county, city and district components. Enter your purchase price and individual tax rates to calculate each tax amount and total cost.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
  },
  openGraph: {
    title: 'Sales Tax Breakdown Calculator – State & Local Tax',
    description:
      'Break down sales tax into state, county, city and district components. Enter your purchase price and individual tax rates to calculate each tax amount and total cost.',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

const FAQS = [
  {
    question: 'What is a sales tax breakdown calculator?',
    answer:
      'A sales tax breakdown calculator is a financial tool that separates a combined retail sales tax into its individual statutory components—including state, county, municipal (city), and special district taxes. It calculates the exact dollar amount allocated to each jurisdiction from a single pre-tax purchase price.',
  },
  {
    question: 'What is the difference between state and local sales tax?',
    answer:
      'State sales tax is levied by a state government and applies uniformly across the entire state to support state-level public programs. Local sales taxes are additional optional levies imposed by local governing bodies—such as counties, cities, and transit authorities—to fund municipal services, emergency response, and local infrastructure.',
  },
  {
    question: 'How do I calculate combined sales tax?',
    answer:
      'To calculate the combined sales tax rate, add together all applicable individual tax rates: State Rate + County Rate + City Rate + Special District Rate. For example, if your state rate is 5.00%, county is 1.00%, city is 1.50%, and district is 0.50%, your combined sales tax rate is 8.00%.',
  },
  {
    question: 'How are county and city sales taxes calculated?',
    answer:
      'County and city sales taxes are calculated by multiplying the taxable purchase price by each local jurisdiction’s individual percentage rate (divided by 100). Each component is calculated independently from the same pre-tax taxable base rather than compounded on top of the state tax.',
  },
  {
    question: 'What is a special district sales tax?',
    answer:
      'A special district sales tax is a targeted local tax voter-approved to finance specific regional public projects or services. Common examples include regional public transit systems (like subway or light rail authorities), stadium and convention center authorities, emergency medical response districts, and hospital systems.',
  },
  {
    question: 'Can I calculate sales tax by individual components?',
    answer:
      'Yes. By entering the pre-tax item price and each individual component percentage into this calculator, you can view the exact dollar allocation due to the state, county, municipality, and special districts.',
  },
  {
    question: 'Do all states have county and city sales taxes?',
    answer:
      'No. Five states (Alaska, Delaware, Montana, New Hampshire, and Oregon) do not impose a statewide general sales tax, though Alaska permits local municipalities to levy local taxes. Additionally, several states with a state sales tax do not permit local city or county add-on taxes, while others have thousands of overlapping local jurisdictions.',
  },
  {
    question: 'Does this calculator automatically find my local sales tax rate?',
    answer:
      'No. This calculator allows you to enter and evaluate specific rates you provide. It does not automatically look up or determine legally binding rates by address. If you need to search local rate breakdowns across the United States, use our US Sales Tax by ZIP Code lookup tool.',
  },
  {
    question: 'Why might my receipt show a different sales tax amount?',
    answer:
      'Receipt totals may differ because certain items (such as unprepared groceries, prescription drugs, or apparel) may have statutory exemptions or reduced rates. In addition, actual receipts depend on delivery sourcing rules (origin vs. destination taxability) and merchant-specific rounding algorithms.',
  },
]

export default function SalesTaxBreakdownPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sales Tax Breakdown Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
    description:
      'Break down sales tax into state, county, city and district components. Enter your purchase price and individual tax rates to calculate each tax amount and total cost.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sales Tax Breakdown Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
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
    name: 'How to Use the Sales Tax Breakdown Calculator',
    description: 'Calculate and break down sales tax into individual state and local components in three steps.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter purchase price before tax',
        text: 'Enter the original purchase price before tax (subtotal).',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter applicable tax rates',
        text: 'Enter the applicable state, county, city and special district tax rates.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate breakdown',
        text: 'Click Calculate Breakdown to see each tax component, combined rate and final purchase total.',
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
          { name: 'Sales Tax Breakdown Calculator', url: '/tools/sales-tax-breakdown' },
        ]}
      />

      <div className="space-y-16 md:space-y-20 max-w-7xl mx-auto">
        {/* ================================================================= */}
        {/* SECTION 2: HERO AND CALCULATOR                                    */}
        {/* ================================================================= */}
        <section className="pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>State & Local Tax Engine</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Sales Tax Breakdown Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                See how sales tax is divided across state, county, city and special district components. Enter your purchase price and applicable tax rates to calculate each tax amount, combined sales tax and final purchase total.
              </p>

              {/* Three Concise Benefits */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Calculate individual sales tax components.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    See your combined sales tax rate.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    Understand the total tax added to your purchase.
                  </span>
                </div>
              </div>

              {/* Subtle Supporting Example */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium">
                <span className="font-semibold text-slate-900">Example:</span> $100.00 subtotal at 5% State + 1% County + 1.5% City + 0.5% District = $8.00 total tax ($108.00 final).
              </div>

              {/* Trust Statement */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free Online Calculator • No registration required</span>
              </div>
            </div>

            {/* Right Column: Prominent Calculator Tool */}
            <div className="lg:col-span-7 w-full">
              <SalesTaxBreakdownTool />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: HOW TO USE THE CALCULATOR                             */}
        {/* ================================================================= */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Use the Sales Tax Breakdown Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Calculate the jurisdictional division of your sales tax in three simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 1: Enter price</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the original purchase price before tax (subtotal).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 2: Enter tax rates</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Enter the applicable state, county, city and special district tax rates.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Step 3: Calculate</h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate to see each tax component, combined rate and final purchase total.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: UNDERSTANDING SALES TAX COMPONENTS                    */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding State and Local Sales Tax
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When retail sales tax is charged on a transaction, the combined percentage you pay is composed of separate statutory tax levies assessed by multiple governing bodies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm m-0">State Sales Tax</h3>
              <p className="text-slate-600 m-0 leading-relaxed">
                State sales tax is imposed by certain states on qualifying transactions to finance statewide public funds, highways, and social services.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm m-0">County Sales Tax</h3>
              <p className="text-slate-600 m-0 leading-relaxed">
                Some counties impose additional sales taxes to fund county-level courts, county healthcare programs, and local regional infrastructure.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm m-0">City Sales Tax</h3>
              <p className="text-slate-600 m-0 leading-relaxed">
                Some cities and municipalities impose additional local taxes approved through municipal ordinances to support police, firefighting, and public parks.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm m-0">Special District Tax</h3>
              <p className="text-slate-600 m-0 leading-relaxed">
                Designated districts may impose additional sales taxes for specific local purposes, such as regional transit systems, stadiums, or emergency services.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="m-0">
              Not all jurisdictions impose every component. The combined applicable rate depends on the physical location of the transaction and local tax rules.
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
        {/* SECTION 5: SALES TAX BREAKDOWN EXAMPLE                            */}
        {/* ================================================================= */}
        <section className="space-y-6 max-w-4xl">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Example of a State and Local Sales Tax Breakdown
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Review how individual tax component percentages apply to a sample purchase subtotal:
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Illustrative Transaction
                </span>
                <span className="text-xl font-bold text-slate-900">
                  Purchase Price: $500.00
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Combined Rate
                </span>
                <span className="text-xl font-bold text-blue-600">
                  8.00% Combined
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="py-2.5 px-4">Component Tier</th>
                    <th className="py-2.5 px-4">Tax Rate</th>
                    <th className="py-2.5 px-4">Calculation</th>
                    <th className="py-2.5 px-4 text-right">Tax Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">State Sales Tax</td>
                    <td className="py-2.5 px-4 text-slate-600">5.00%</td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-mono">$500.00 × 0.05</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">$25.00</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">County Sales Tax</td>
                    <td className="py-2.5 px-4 text-slate-600">1.00%</td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-mono">$500.00 × 0.01</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">$5.00</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">City Sales Tax</td>
                    <td className="py-2.5 px-4 text-slate-600">1.50%</td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-mono">$500.00 × 0.015</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">$7.50</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Special District Tax</td>
                    <td className="py-2.5 px-4 text-slate-600">0.50%</td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-mono">$500.00 × 0.005</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">$2.50</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t border-slate-200">
                    <td className="py-2.5 px-4 text-slate-900">Total Sales Tax</td>
                    <td className="py-2.5 px-4 text-blue-700">8.00%</td>
                    <td className="py-2.5 px-4 text-slate-500 text-xs font-mono">$25 + $5 + $7.50 + $2.50</td>
                    <td className="py-2.5 px-4 text-right text-blue-700 font-extrabold">$40.00</td>
                  </tr>
                  <tr className="bg-blue-50/50 font-extrabold border-t border-blue-100">
                    <td className="py-2.5 px-4 text-slate-900" colSpan={3}>
                      Final Purchase Price (Subtotal + Total Sales Tax)
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-900 text-base">
                      $540.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 m-0">
              * Note: This is an illustrative example provided for educational and mathematical verification purposes, not an actual location-specific tax calculation.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: WHEN TO USE A SALES TAX BREAKDOWN CALCULATOR           */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              When Should You Use a Sales Tax Breakdown Calculator?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Deconstructing sales tax into its local components is useful across several commercial and personal accounting situations:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  1. Understanding state and local taxes on a purchase
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                When purchasing high-value items like vehicles, appliances, or machinery, see exactly how much of your total tax bill supports your state vs. your immediate municipality.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  2. Reviewing an itemized purchase estimate
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Verify contractor bids, commercial invoices, or vendor proposals where sales taxes are itemized across separate municipal and special district lines.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  3. Comparing tax components across locations
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Evaluate cost differences between purchasing goods in an incorporated city with local sales tax versus an unincorporated county district with lower total rates.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  4. Estimating tax amounts for business purchases
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Help business owners and bookkeepers accurately forecast and account for component-level tax liabilities on capital expenditures and commercial supplies.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: IMPORTANT TAX CALCULATION LIMITATIONS                  */}
        {/* ================================================================= */}
        <section className="max-w-4xl">
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Important Tax Calculation Limitations</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed m-0">
              Actual sales tax calculations may depend on product taxability, transaction location, exemptions, sourcing rules and jurisdiction-specific calculation methods. This calculator uses the rates and taxable purchase amount you provide. It does not independently determine the legally applicable tax rate.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: RELATED CALCULATORS                                   */}
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
            {/* Card 1: Standard Sales Tax Calculator */}
            <Link
              href="/tools/sales-tax-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
                Remove sales tax from a tax-inclusive receipt total to find the original price.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Calculate Backwards →</span>
              </div>
            </Link>

            {/* Card 3: Reverse VAT Calculator */}
            <Link
              href="/tools/reverse-vat-calculator/"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Percent className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse VAT Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Find the original price before VAT from a tax-inclusive amount.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open VAT Tool →</span>
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
            title="Frequently Asked Questions About Sales Tax Breakdown"
          />
        </section>
      </div>
    </>
  )
}
