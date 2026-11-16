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
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator - Remove Tax from Total',
  description:
    'Use our free reverse sales tax calculator to remove sales tax from a total price. Find the original price, tax amount and pre-tax cost instantly.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro',
    title: 'Reverse Sales Tax Calculator - Remove Tax from Total',
    description:
      'Use our free reverse sales tax calculator to remove sales tax from a total price. Find the original price, tax amount and pre-tax cost instantly.',
    siteName: 'ReverseTaxCalculator.pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax Calculator - Remove Tax from Total',
    description:
      'Free reverse sales tax calculator. Calculate the original price before tax and exact sales tax paid from any receipt total.',
  },
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What is a reverse sales tax calculator?',
      answer:
        'A reverse sales tax calculator is a financial tool that determines the original pre-tax price and the exact sales tax amount from a tax-inclusive total. While regular calculations add tax to a net subtotal, reverse calculations work backwards by dividing out the tax rate.',
    },
    {
      question: 'How do I calculate sales tax backwards?',
      answer:
        'To calculate sales tax backwards, convert your sales tax rate to a decimal, add 1, and divide the total price by that number. For example, with an 8% tax rate, divide your total by 1.08. Then subtract the resulting pre-tax amount from your total price to find the sales tax paid.',
    },
    {
      question: 'How do I remove 8% sales tax from a price?',
      answer:
        'To remove 8% sales tax from a total, divide the total amount by 1.08 (not by subtracting 8%). For example, if your tax-inclusive total is $108.00: $108.00 ÷ 1.08 = $100.00 pre-tax price. The sales tax removed is $8.00 ($108.00 - $100.00).',
    },
    {
      question: 'Is reverse sales tax the same as removing tax?',
      answer:
        'Yes. Reverse sales tax, sales tax removal, and calculating tax backwards refer to the identical mathematical operation: extracting the original pre-tax price and tax amount from a gross tax-inclusive total.',
    },
    {
      question: 'How do I find the original price before tax?',
      answer:
        'Use the formula: Original Price = Total Price ÷ (1 + Tax Rate ÷ 100). For instance, a $220 total with 10% tax yields an original price of $200 ($220 ÷ 1.10).',
    },
    {
      question: 'Can I calculate reverse sales tax using any percentage?',
      answer:
        'Yes. Our reverse tax calculator accepts any percentage rate, including fractional state and local rates (such as 8.875% or 7.25%), international VAT rates (such as 20%), or Canadian GST/HST rates (such as 5%, 13%, or 15%).',
    },
    {
      question: 'What is the difference between reverse sales tax and regular sales tax?',
      answer:
        'Regular (forward) sales tax starts with the net price and adds tax to determine the total checkout cost (Total = Price × [1 + Rate]). Reverse sales tax starts with the final checkout total and divides by (1 + Rate) to isolate the original price and tax paid.',
    },
    {
      question: 'Is the reverse sales tax calculator free?',
      answer:
        'Yes. ReverseTaxCalculator.pro is 100% free to use with no account registration, no credit card, and no software download required.',
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

  const popularStates = [
    { name: 'California', slug: 'california', rate: '7.25%' },
    { name: 'Texas', slug: 'texas', rate: '6.25%' },
    { name: 'Florida', slug: 'florida', rate: '6.00%' },
    { name: 'New York', slug: 'new-york', rate: '4.00%' },
    { name: 'Illinois', slug: 'illinois', rate: '6.25%' },
    { name: 'Washington', slug: 'washington', rate: '6.50%' },
    { name: 'Pennsylvania', slug: 'pennsylvania', rate: '6.00%' },
    { name: 'Ohio', slug: 'ohio', rate: '5.75%' },
    { name: 'New Jersey', slug: 'new-jersey', rate: '6.625%' },
    { name: 'Georgia', slug: 'georgia', rate: '4.00%' },
    { name: 'Arizona', slug: 'arizona', rate: '5.60%' },
    { name: 'Colorado', slug: 'colorado', rate: '2.90%' },
  ]

  return (
    <>
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

      <div className="space-y-14 md:space-y-16 max-w-7xl mx-auto">
        {/* =========================================================================
            SECTION 2: HERO SECTION WITH MAIN CALCULATOR (Two-column desktop)
            ========================================================================= */}
        <section className="pt-2 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold tracking-wide">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>FREE ONLINE TAX CALCULATOR</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Reverse Sales Tax Calculator
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Remove sales tax from any total price and find the original price before tax. Calculate the pre-tax amount, sales tax paid and total purchase price instantly using any sales tax rate.
              </p>

              {/* Three Small Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Free to Use</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>No Registration Required</span>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Calculator Card */}
            <div className="lg:col-span-6">
              <HeroReverseSalesTaxCalculator />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: SHORT INTRODUCTION
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
            What Is a Reverse Sales Tax Calculator?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
            A reverse sales tax calculator helps you determine the original price of an item before sales tax was added. When reviewing store receipts, calculating business expenses, or auditing invoices that display only the final grand total, this tool extracts the pre-tax subtotal and exact tax paid without manual errors.
          </p>
          <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-1">
            <div className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
              Simple Calculation Example:
            </div>
            <div>Total Price: $108.00</div>
            <div>Sales Tax Rate: 8%</div>
            <div>Original Price: $100.00 ($108.00 ÷ 1.08)</div>
            <div>Sales Tax Paid: $8.00</div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: EXPLORE REVERSE TAX CALCULATORS
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Explore Reverse Tax Calculators
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Find the right calculator to remove sales tax, VAT or GST from a tax-inclusive price.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Card 1 */}
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
                Remove sales tax from a total purchase price.
              </p>
            </Link>

            {/* Card 2 */}
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
                Find the original price before VAT was added.
              </p>
            </Link>

            {/* Card 3 */}
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
                Calculate the pre-tax price before GST.
              </p>
            </Link>

            {/* Card 4 */}
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
                Remove HST from Canadian purchase totals.
              </p>
            </Link>

            {/* Card 5 */}
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
                Calculate the original price before provincial sales tax.
              </p>
            </Link>

            {/* Card 6 */}
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
                Separate the original price and tax amount.
              </p>
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: RELATED SALES TAX CALCULATORS
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              More Sales Tax Calculators
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Explore additional tools for calculating, adding, removing and understanding sales tax.
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
              href="/add-sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Add Sales Tax Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Add state and local tax to find checkout total.
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
              href="/reverse-tax-rate-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Percent className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Sales Tax Rate Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Solve the exact tax percentage from gross and net.
              </div>
            </Link>

            <Link
              href="/sales-tax-breakdown-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Sales Tax Breakdown Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Deconstruct state, county, and municipal splits.
              </div>
            </Link>

            <Link
              href="/tax-exclusive-price-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Tag className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Tax-Exclusive Price Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Compute total purchase price from pre-tax cost.
              </div>
            </Link>

            <Link
              href="/compare-sales-tax"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <Scale className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Sales Tax Comparison Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Compare sales tax costs across multiple US states.
              </div>
            </Link>

            <Link
              href="/bulk-sales-tax-calculator"
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-1.5 block hover:shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <div className="font-bold text-sm text-slate-900">Sales Tax Percentage Calculator</div>
              <div className="text-xs text-slate-500 leading-normal">
                Calculate multi-item invoice taxes and export CSV.
              </div>
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REVERSE SALES TAX BY STATE
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Reverse Sales Tax Calculator by State
              </h2>
              <p className="text-slate-600 text-sm mt-1 m-0">
                Sales tax rates vary depending on the state and local jurisdiction. Explore sales tax information and reverse tax calculations for different locations across the United States.
              </p>
            </div>
            <Link
              href="/data-sources"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>View All State Sales Tax Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Popular States Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}-reverse-sales-tax-calculator`}
                className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all block group"
              >
                <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 truncate">
                  {state.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  Base: {state.rate}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-xs text-slate-500 leading-relaxed pt-2">
            * Note: State rates shown reflect baseline statewide statutory rates. Local municipal, county, and transit district surtaxes may apply depending on the specific city or ZIP code.
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: HOW TO CALCULATE SALES TAX BACKWARDS
            ========================================================================= */}
        <section className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              How to Calculate Sales Tax Backwards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed m-0">
              To calculate sales tax backwards from a tax-inclusive total, divide the gross amount by 1 plus the sales tax rate expressed as a decimal. Then subtract the original pre-tax price from the gross total to determine the exact sales tax paid.
            </p>
          </div>

          {/* Visually Attractive Formula Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 font-mono space-y-3 border border-slate-200/90 shadow-2xs">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
              The Reverse Sales Tax Formulas:
            </div>
            <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1.5">
              <div>Original Price = Total Price ÷ (1 + Tax Rate ÷ 100)</div>
              <div>Sales Tax Paid = Total Price - Original Price</div>
            </div>
            <div className="text-xs text-slate-600 pt-3 border-t border-slate-200 font-sans leading-relaxed">
              <strong>Worked Numerical Example:</strong> For a <strong>$108.00</strong> receipt total with an <strong>8%</strong> sales tax rate:
              <br />
              1. Divide $108.00 by 1.08 = <strong>$100.00</strong> (Original Price).
              <br />
              2. Subtract $100.00 from $108.00 = <strong>$8.00</strong> (Sales Tax Paid).
            </div>
          </div>

          <div>
            <Link
              href="/guides/how-to-calculate-reverse-tax-percentage"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Read the full Reverse Sales Tax Calculation Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: REVERSE SALES TAX EXAMPLES
            ========================================================================= */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Reverse Sales Tax Calculation Examples
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Reference table showing pre-tax net amounts and sales tax removed across common price points and standard tax percentages:
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Total Price (Gross)</th>
                  <th className="py-3 px-4 font-bold">Tax Rate</th>
                  <th className="py-3 px-4 font-bold">Original Price (Pre-Tax)</th>
                  <th className="py-3 px-4 font-bold text-blue-700">Tax Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">$105.00</td>
                  <td className="py-3 px-4 text-slate-600">5%</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">$100.00</td>
                  <td className="py-3 px-4 font-bold text-blue-700">$5.00</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">$108.00</td>
                  <td className="py-3 px-4 text-slate-600">8%</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">$100.00</td>
                  <td className="py-3 px-4 font-bold text-blue-700">$8.00</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">$110.00</td>
                  <td className="py-3 px-4 text-slate-600">10%</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">$100.00</td>
                  <td className="py-3 px-4 font-bold text-blue-700">$10.00</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">$220.00</td>
                  <td className="py-3 px-4 text-slate-600">10%</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">$200.00</td>
                  <td className="py-3 px-4 font-bold text-blue-700">$20.00</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">$540.00</td>
                  <td className="py-3 px-4 text-slate-600">8%</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">$500.00</td>
                  <td className="py-3 px-4 font-bold text-blue-700">$40.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500 leading-relaxed">
            * Note: Results are rounded to two decimal places in accordance with standard financial accounting and currency rounding conventions.
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: WHY USE OUR REVERSE SALES TAX CALCULATOR?
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Why Use ReverseTaxCalculator.pro?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              Dedicated to delivering fast, transparent, and accurate sales tax calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Instant Calculations</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Calculate original prices and sales tax amounts quickly without manual calculations.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Transparent Formulas</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Understand exactly how reverse sales tax calculations work.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Flexible Tax Rates</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Enter the tax rate applicable to your purchase or transaction.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Mobile-Friendly Tools</h3>
              <p className="text-xs text-slate-500 m-0 leading-relaxed">
                Use our calculators on desktop, tablet and mobile devices.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: TAX CALCULATION GUIDES
            ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Learn More About Sales Tax Calculations
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed m-0">
              In-depth guides explaining formulas, accounting practices, and multi-jurisdiction rules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  How to Calculate Sales Tax Backwards
                </h3>
                <p className="text-xs text-slate-500 m-0 leading-relaxed">
                  Step-by-step mathematical breakdown for extracting pre-tax subtotals from gross totals.
                </p>
              </div>
              <Link
                href="/guides/how-to-calculate-reverse-tax-percentage"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  How to Remove Sales Tax from a Total
                </h3>
                <p className="text-xs text-slate-500 m-0 leading-relaxed">
                  Learn why simple subtraction fails and how to strip sales tax accurately for expense filing.
                </p>
              </div>
              <Link
                href="/remove-sales-tax-calculator"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  Reverse Sales Tax Formula Explained
                </h3>
                <p className="text-xs text-slate-500 m-0 leading-relaxed">
                  Detailed mathematical analysis of the reverse tax division formula and divisor derivation.
                </p>
              </div>
              <Link
                href="/reverse-tax-formula"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 m-0">
                  Forward vs. Reverse Sales Tax
                </h3>
                <p className="text-xs text-slate-500 m-0 leading-relaxed">
                  Understanding tax-inclusive versus tax-exclusive pricing in retail, e-commerce, and invoicing.
                </p>
              </div>
              <Link
                href="/guides/reverse-tax-calculator-vs-forward-tax-calculator"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS
            ========================================================================= */}
        <section className="space-y-4">
          <FAQAccordion items={homeFaqs} title="Frequently Asked Questions" />
        </section>
      </div>
    </>
  )
}
