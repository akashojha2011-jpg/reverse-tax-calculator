import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { AuthorByline } from '@/components/AuthorByline'
import { AccuracyVerificationBox } from '@/components/AccuracyVerificationBox'

export const metadata: Metadata = {
  title: 'Free Reverse Tax Calculator — Calculate Pre-Tax Price & Tax Paid',
  description:
    'Free reverse tax calculator for 50+ US states, Canada, UK & more. Instantly calculate pre-tax prices & tax paid from receipts. No signup required.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro',
    title: 'Free Reverse Tax Calculator — Calculate Pre-Tax Prices Instantly',
    description:
      'Instantly calculate pre-tax price & tax paid backwards from gross totals. 100% free, client-side, verified August 2026 rates.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Reverse Tax Calculator — Calculate Tax Backwards from Total',
    description:
      'Free reverse tax calculator for sales tax, VAT, GST, HST, and payroll net-to-gross.',
  },
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'How do you perform a reverse calculation of tax from a total price?',
      answer:
        'To perform a reverse calculation of tax, divide the total gross amount by 1 plus the tax rate in decimal format. For example, with a $107 total and 7% sales tax rate, divide $107 by 1.07 to get the pre-tax net price of $100.00. The tax amount is $107 minus $100, which equals $7.00.',
    },
    {
      question: 'What is the exact formula for a reverse sales tax calculator?',
      answer:
        'The mathematical reverse tax formula is: Pre-Tax Net Amount = Gross Total ÷ (1 + Tax Rate). Tax Amount Paid = Gross Total - Net Amount. For instance, if total gross is $120 and VAT rate is 20%, Net = $120 ÷ 1.20 = $100, and Tax = $20.',
    },
    {
      question: 'Why can’t I just subtract the tax percentage from the total price?',
      answer:
        'Subtracting 7% from $107 gives $99.51, which is mathematically incorrect. Sales tax is added to the pre-tax net price ($100 × 1.07 = $107). To reverse the calculation accurately, you must divide by (1 + tax rate) rather than multiplying or subtracting directly.',
    },
    {
      question: 'Does this online reverse tax calculator work for VAT, GST, and HST?',
      answer:
        'Yes! The reverse calculation formula Net = Gross ÷ (1 + Tax Rate) is mathematically identical across US Sales Tax, European VAT, Australian/Indian GST, and Canadian HST/QST.',
    },
    {
      question: 'Is this free reverse sales tax calculator private and secure?',
      answer:
        'Yes. All calculation logic runs 100% client-side in your web browser. No financial numbers or entries are sent to any external server or stored anywhere.',
    },
  ]

  // Machine-Readable FAQPage Schema for SERP Featured Snippets
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
            ⚡ 100% Free & Client-Side Reverse Tax Utility
          </div>
          
          {/* Strengthened H1 Tag with Primary Keywords */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Free Reverse Tax Calculator — Calculate Pre-Tax Amounts Instantly
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Instantly calculate pre-tax net prices and exact tax paid backwards from any receipt or total amount.
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

        {/* E-E-A-T Author Byline */}
        <AuthorByline
          authorName="Marcus Vance, CPA, CFE"
          authorRole="Lead Financial & Sales Tax Editor (15+ Yrs Exp)"
          lastUpdated="August 2026"
          verificationCode="Verified against IRS 26 USC & State DOR Databases"
        />

        {/* E-E-A-T Transparency & Accuracy Verification Trust Box */}
        <AccuracyVerificationBox />

        {/* 4-Column State & Region Directory Grid */}
        <RegionGridDirectory />

        {/* AI Answer-First Summary targeting exact high-volume keyword in H2 */}
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

        {/* Machine-Readable FAQ Accordion */}
        <FAQAccordion items={homeFaqs} title="Frequently Asked Questions" />

        {/* Related Grid */}
        <RelatedCalculatorsGrid title="Popular Regional Calculators" />
      </div>
    </>
  )
}
