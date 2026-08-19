import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { AuthorByline } from '@/components/AuthorByline'
import { AccuracyVerificationBox } from '@/components/AccuracyVerificationBox'
import { CompactOmniHeader } from '@/components/CompactOmniHeader'

export const metadata: Metadata = {
  title: 'Reverse Tax Calculator | Reverse Sales Tax Calculator',
  description:
    'Use our free reverse tax calculator to calculate the pre-tax price and tax amount from a tax-inclusive total. Try our reverse sales tax calculator for fast, accurate results.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro',
    title: 'Reverse Tax Calculator | Reverse Sales Tax Calculator',
    description:
      'Use our free reverse tax calculator to calculate the pre-tax price and tax amount from a tax-inclusive total. Try our reverse sales tax calculator for fast, accurate results.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Tax Calculator | Reverse Sales Tax Calculator',
    description:
      'Use our free reverse tax calculator to calculate the pre-tax price and tax amount from a tax-inclusive total.',
  },
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What is a reverse tax calculator?',
      answer:
        'A reverse tax calculator is a financial tool that computes the original pre-tax price and exact tax amount from a tax-inclusive total price. Unlike standard calculators that add tax to a net subtotal, a reverse tax calculator works backwards by dividing the gross total by (1 + tax rate).',
    },
    {
      question: 'What is a reverse sales tax calculator?',
      answer:
        'A reverse sales tax calculator is a specialized tool designed to isolate the pre-tax item price and sales tax paid from a total retail receipt amount. It uses state and local sales tax percentages to back-calculate the base price before sales tax was added at checkout.',
    },
    {
      question: 'How do I calculate sales tax backwards?',
      answer:
        'To calculate sales tax backwards, convert the sales tax percentage into a decimal (e.g., 7% = 0.07), add 1 to get the division factor (1.07), and divide your total gross price by 1.07. The result is your pre-tax net subtotal. Subtract the net subtotal from your total gross price to find the exact sales tax amount.',
    },
    {
      question: 'How do I remove sales tax from a total?',
      answer:
        'To remove sales tax from a total price, divide the total tax-inclusive amount by 1 plus the sales tax rate in decimal form (Total ÷ 1.XX). Do not subtract the tax percentage directly, as sales tax is levied on the original pre-tax base price, not the post-tax total.',
    },
    {
      question: 'What is the reverse sales tax formula?',
      answer:
        'The mathematical reverse sales tax formula is: Pre-Tax Net Price = Gross Total Price ÷ (1 + Tax Rate Decimal). The sales tax amount is calculated as Sales Tax Paid = Gross Total Price - Pre-Tax Net Price.',
    },
    {
      question: 'How do I find the original price before tax?',
      answer:
        'To find the original price before tax, divide your total gross bill by 1 + (Tax Rate ÷ 100). For example, if a receipt total is $107.00 and sales tax is 7%, dividing $107.00 by 1.07 reveals the original pre-tax price of $100.00.',
    },
    {
      question: 'How do I calculate the tax included in a total?',
      answer:
        'To calculate the tax included in a total price, first calculate the pre-tax net amount by dividing the total price by (1 + tax rate decimal). Then, subtract the pre-tax net amount from the total price. The remaining difference is the exact tax included in the total.',
    },
    {
      question: 'How does a reverse tax calculator work?',
      answer:
        'A reverse tax calculator works by reversing the algebraic forward tax equation (Gross = Net × [1 + Tax Rate]). By applying inverse division (Net = Gross ÷ [1 + Tax Rate]), the tool instantly separates the tax component from the net item value in client-side JavaScript.',
    },
    {
      question: 'What is the difference between a regular tax calculator and a reverse tax calculator?',
      answer:
        'A regular (forward) tax calculator starts with a known pre-tax net subtotal and multiplies it by (1 + tax rate) to determine the final gross price. A reverse tax calculator starts with a known tax-inclusive gross total and divides by (1 + tax rate) to isolate the original pre-tax subtotal and tax paid.',
    },
    {
      question: 'Can I calculate sales tax from a tax-inclusive price?',
      answer:
        'Yes. You can calculate sales tax from any tax-inclusive price by entering the total gross charge and the applicable tax rate percentage into a reverse tax calculator, which automatically divides by (1 + tax rate) to extract both net price and sales tax paid.',
    },
    {
      question: 'What is the reverse tax multiplier?',
      answer:
        'The reverse tax multiplier (or division factor) is 1 + (Tax Rate ÷ 100). For example, for a 7% tax rate, the multiplier is 1.07; for a 20% VAT rate, it is 1.20; for an 8.875% NYC tax rate, it is 1.08875. Dividing a gross price by this multiplier yields the pre-tax net price.',
    },
    {
      question: 'Can I calculate reverse sales tax for any tax rate?',
      answer:
        'Yes! The reverse tax formula Net = Gross ÷ (1 + Tax Rate) works universally for any valid sales tax rate percentage from 0.01% to over 50%, regardless of jurisdiction or tax type.',
    },
    {
      question: 'Why doesn’t simply subtracting the tax rate from the total work?',
      answer:
        'Subtracting the tax rate percentage directly from a total price fails because tax rates are calculated as a percentage of the lower pre-tax base, not the higher post-tax total. Subtracting 7% from $107 yields $99.51 instead of $100.00, overcalculating the tax amount by $0.49 per transaction.',
    },
    {
      question: 'Can I use a reverse sales tax calculator for US sales tax?',
      answer:
        'Yes. Reverse sales tax calculators are widely used across the US for business expense logging, auditing retail receipts, reporting itemized tax deductions on IRS Schedule A, and bookkeeping when vendor receipts display lump-sum totals.',
    },
    {
      question: 'Can I calculate reverse sales tax by state?',
      answer:
        'Yes. You can calculate reverse sales tax for all 50 US states + Washington D.C. by using the specific state sales tax rate (e.g., California 7.25%, Texas 6.25%, Florida 6.00%) plus any local county or city sales tax surcharges.',
    },
    {
      question: 'Why is my reverse tax calculation different from my receipt?',
      answer:
        'Discrepancies between reverse tax calculations and printed receipts usually occur due to local district tax surcharges, tax-exempt line items (such as groceries or prescription drugs), or receipt rounding methods (such as half-up vs. half-even rounding).',
    },
    {
      question: 'Is a reverse tax calculator accurate?',
      answer:
        'Yes. Reverse tax calculators are 100% mathematically exact because they use standard algebraic inverse division (Net = Gross ÷ [1 + r]). When the correct combined tax rate is entered, the calculated net and tax amounts match official accounting standards.',
    },
    {
      question: 'Can I calculate reverse tax from a receipt?',
      answer:
        'Yes. You can calculate reverse tax from any receipt by locating the total gross amount charged and entering the local sales tax percentage displayed on the receipt or mandated by your city/state into the reverse tax calculator.',
    },
  ]

  // Machine-Readable FAQPage Schema for SERP Featured Snippets (All 18 FAQs)
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

  // Machine-Readable Organization Schema for Knowledge Panel Eligibility
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Reverse Tax Calculator',
    url: 'https://reversetaxcalculator.pro',
    logo: 'https://reversetaxcalculator.pro/icon.png',
    description: 'Free reverse sales tax calculator for sales tax, VAT, GST, HST and payroll net to gross.',
    sameAs: [
      'https://twitter.com/reversetaxcalc',
      'https://www.linkedin.com/company/reversetaxcalculator',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://reversetaxcalculator.pro/contact',
    },
  }

  // Machine-Readable WebSite Schema for Sitelinks SearchBox
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Reverse Tax Calculator',
    url: 'https://reversetaxcalculator.pro',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://reversetaxcalculator.pro/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  // SoftwareApplication Schema
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Reverse Tax Calculator',
    url: 'https://reversetaxcalculator.pro',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free online reverse tax calculator to perform reverse calculation of tax and find pre-tax net amounts and tax paid backwards from total prices.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="space-y-10 max-w-7xl mx-auto">
        {/* Homepage Hero Section */}
        <section className="text-center space-y-4 pt-2 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
            ⚡ 100% Free Reverse Sales Tax Calculator
          </div>
          
          {/* H1 Tag */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Reverse Tax Calculator - Calculate Sales Tax Backwards
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Calculate the pre-tax price and sales tax from any tax-inclusive total. Enter your total amount and tax rate to instantly find the original price and tax paid.
          </p>

          {/* Centered Interactive Calculator */}
          <div className="max-w-2xl mx-auto pt-4 text-left">
            <CalculatorCard
              initialMode="sales-tax"
              defaultGross={107}
              defaultTaxRate={7}
              taxName="Sales Tax"
            />
          </div>
        </section>

        {/* How Reverse Calculation of Tax Works */}
        <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-6 md:p-7 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 mt-0">
            How Reverse Calculation of Tax Works
          </h2>
          <p className="text-slate-800 text-base leading-relaxed mb-3">
            To perform a <strong>reverse calculation of tax</strong> from a tax-included total price, divide the total gross amount by <strong>1 + tax rate (in decimal format)</strong> to find the pre-tax net price. Subtract the net price from the total to get the exact tax paid. For example, a receipt of <strong>$107.00</strong> with <strong>7% sales tax</strong> equals a pre-tax price of <strong>$100.00</strong> ($107.00 ÷ 1.07) and <strong>$7.00</strong> in tax.
          </p>
          <div className="text-xs text-slate-500 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <span>Tax rates verified: <strong>August 2026</strong></span>
            <span>Supports US Sales Tax, VAT, GST, HST & Payroll Net-to-Gross</span>
          </div>
        </section>

        {/* 4-Column State & Region Directory Grid */}
        <RegionGridDirectory />

        {/* Comprehensive Deep-Dive SEO Content */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0 mb-4">
            Comprehensive Guide to Reverse Tax Calculation
          </h2>

          <p>
            Managing business accounting, filing personal expense reports, or reviewing commercial receipts frequently requires determining the original pre-tax price of an item when only the tax-inclusive gross total is known. Using a dedicated <strong>reverse tax calculator</strong> simplifies this process, eliminating mathematical errors and saving valuable time for accountants, small business owners, and consumers alike.
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-8 mb-4">
            How Reverse Calculation of Tax Works Step-by-Step
          </h2>
          <p>
            A <strong>reverse calculation of tax</strong> works by isolating the base price before sales tax or VAT was added. While standard forward tax tools multiply a subtotal by $(1 + r)$, reversing the process requires dividing the gross total by $(1 + r)$.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
            What is a Reverse Tax Calculator?
          </h3>
          <p>
            A <strong>tax calculator in reverse</strong> is a specialized financial tool designed to extract the base net price and the tax paid from a final transaction total. Standard forward tax calculators take a pre-tax subtotal and add tax to determine the total price. Conversely, an <strong>online reverse tax calculator</strong> executes a backward mathematical operation to isolate the pre-tax subtotal.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
            The Universal Reverse Sales Tax Formula
          </h3>
          <p>
            The algebraic foundation of a <strong>free reverse sales tax calculator</strong> relies on understanding how sales tax is originally applied. When sales tax (r) is added to a pre-tax net amount (N), the total gross amount (G) is expressed as:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 space-y-1 font-semibold">
            <div>Gross Amount (G) = Net Amount (N) × (1 + Tax Rate Decimal)</div>
            <div>Net Amount (N) = Gross Amount (G) ÷ (1 + Tax Rate Decimal)</div>
            <div>Tax Amount = Gross Amount (G) - Net Amount (N)</div>
          </div>
          <p>
            For a deep dive into formula derivations and mathematical proofs across all tax types, visit our dedicated <Link href="/reverse-tax-formula" className="text-blue-600 font-bold underline">Reverse Tax Formula & Math Guide</Link>.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
            Why Direct Percentage Subtraction Fails
          </h3>
          <p>
            A common mistake when attempting a manual <strong>reverse calculation of tax</strong> is subtracting the tax rate percentage directly from the total price. For example, taking 7% off of a $107.00 total yields $107.00 - (107 × 0.07) = $99.51.
          </p>
          <p>
            This $99.51 result is incorrect because sales tax is legally computed on the lower pre-tax base ($100.00), not the higher post-tax total ($107.00). Subtracting 7% directly overstates tax by $0.49 per transaction!
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
            State-Specific & Global Tax Implementations
          </h3>
          <p className="text-sm leading-relaxed text-slate-700">
            Depending on your jurisdiction, tax rates and division factors vary. Try our state-specific calculators:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
            <li>
              Try our <Link href="/california-reverse-sales-tax-calculator" className="text-blue-600 font-semibold hover:underline">state-specific reverse sales tax calculator for California (7.25%)</Link> or <Link href="/texas-reverse-sales-tax-calculator" className="text-blue-600 font-semibold hover:underline">Texas reverse sales tax calculator (6.25%)</Link>.
            </li>
            <li>
              Need Canadian calculations? Use our <Link href="/reverse-hst-calculator" className="text-blue-600 font-semibold hover:underline">reverse HST calculator for Ontario (13% HST)</Link> or <Link href="/reverse-gst-calculator" className="text-blue-600 font-semibold hover:underline">reverse GST calculator (5%)</Link>.
            </li>
            <li>
              Filing European taxes? Try our <Link href="/reverse-vat-calculator" className="text-blue-600 font-semibold hover:underline">reverse VAT calculator for UK & European VAT (20%)</Link>.
            </li>
            <li>
              Calculating take-home pay? Test our <Link href="/reverse-income-tax-calculator" className="text-blue-600 font-semibold hover:underline">net to gross paycheck estimator for income tax</Link>.
            </li>
          </ul>
        </article>

        {/* 18 Prioritized FAQs with Machine-Readable FAQPage JSON-LD Schema */}
        <FAQAccordion items={homeFaqs} title="Frequently Asked Questions (Reverse Tax & Sales Tax)" />

        {/* Related Grid */}
        <RelatedCalculatorsGrid title="Popular Regional Calculators" />
      </div>
    </>
  )
}
