import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'

export const metadata: Metadata = {
  title: 'Reverse Tax Calculator — Calculate Pre-Tax Price & Tax Paid Backwards',
  description:
    'Free reverse tax calculator. Instantly find the pre-tax price and exact tax paid backwards from any receipt or invoice total for sales tax, VAT, GST, and HST.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro',
    title: 'Reverse Tax Calculator — Calculate Pre-Tax Price & Tax Paid Backwards',
    description:
      'Free reverse tax calculator. Instantly find the pre-tax price and exact tax paid backwards from any receipt or invoice total.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Tax Calculator — Calculate Tax Backwards',
    description:
      'Free online tool to calculate pre-tax prices and tax paid from total gross charges.',
  },
}

export default function HomePage() {
  const homeFaqs = [
    {
      question: 'What is a reverse tax calculation?',
      answer:
        'A reverse tax calculation determines the original pre-tax price and the exact tax amount from a tax-inclusive total. While standard forward calculations add tax to a net subtotal (Net × [1 + Tax Rate]), reverse calculations work backwards by dividing the final total by (1 + Tax Rate).',
    },
    {
      question: 'How do I calculate sales tax backwards from a receipt?',
      answer:
        'Convert the tax rate to a decimal (e.g., 7% = 0.07), add 1 to get the division factor (1.07), and divide your total receipt price by 1.07. The result is your pre-tax net subtotal. Subtract this net subtotal from your total bill to find the exact sales tax paid.',
    },
    {
      question: 'What is the reverse tax formula?',
      answer:
        'Pre-Tax Price = Total Gross Price ÷ (1 + Tax Rate Decimal). Tax Paid = Total Gross Price - Pre-Tax Price.',
    },
    {
      question: 'Why can’t I just subtract the tax percentage directly from the total?',
      answer:
        'Sales tax is legally levied on the lower pre-tax subtotal, not the higher post-tax total. Subtracting 7% directly from a $107 total gives $99.51 instead of $100.00, which overstates the tax. Dividing by 1.07 reverses the tax addition accurately.',
    },
    {
      question: 'Can I use this tool for VAT, GST, and HST as well as US sales tax?',
      answer:
        'Yes. The reverse tax mathematical formula works identically across US sales tax, UK and European VAT (20%), Canadian GST (5%) and HST (13% or 15%), and Australian GST (10%). Simply select the appropriate tax mode or enter your rate.',
    },
    {
      question: 'Why might a reverse tax calculation differ slightly from a receipt?',
      answer:
        'Small discrepancies (usually 1 or 2 cents) typically occur due to receipt itemization (tax computed line-by-line rather than on the total), different rounding rules (half-up vs. round-to-even), or non-taxable items on the bill (such as unprepared food or prescription items).',
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
    name: 'Reverse Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Reverse Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free online tool to calculate pre-tax net amounts and tax paid backwards from total prices.',
  }

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

      <div className="space-y-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-2 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-1">
            Free Online Financial Tool
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Reverse Tax Calculator
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

        {/* Quick Reference Formula Box */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-7 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2 mt-0">
            How to Calculate Tax Backwards
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
            To find the pre-tax net amount from a tax-inclusive receipt, divide the total gross amount by <strong>1 + the decimal tax rate</strong>. Then subtract the net amount from the total to find the tax paid.
          </p>
          <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-xs md:text-sm text-brand-900 space-y-1 font-semibold">
            <div>Pre-Tax Net Price = Total Receipt ÷ (1 + Tax Rate)</div>
            <div>Tax Paid = Total Receipt - Pre-Tax Net Price</div>
          </div>
        </section>

        {/* State & Regional Directory */}
        <RegionGridDirectory />

        {/* Helpful Explanation */}
        <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mt-0 mb-3">
            Why Use a Reverse Tax Calculator?
          </h2>
          <p className="text-slate-700 leading-relaxed">
            When reviewing receipts, logging business expenses, or filing accounting records, invoices often show only the final gross charge. A reverse tax calculator allows bookkeepers, small business owners, and consumers to extract the original pre-tax price accurately without manual math errors.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
            Why Simple Percentage Subtraction Fails
          </h3>
          <p className="text-slate-700 leading-relaxed">
            A common mistake when calculating tax backwards is subtracting the tax rate percentage directly from the total bill. For example, taking 7% off of a $107.00 total yields $99.51. This is incorrect because sales tax is legally calculated on the lower pre-tax subtotal ($100.00), not the final price ($107.00). Dividing by 1 + tax rate ensures mathematical and legal accuracy.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">
            Explore Regional Calculators
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            Tax rates and regulations vary by jurisdiction. Choose a specialized calculator for your region:
          </p>
          <ul className="text-sm space-y-1.5 text-slate-700">
            <li>
              <Link href="/california-reverse-sales-tax-calculator" className="text-brand-600 font-semibold hover:underline">California Reverse Sales Tax Calculator (7.25%)</Link> and <Link href="/texas-reverse-sales-tax-calculator" className="text-brand-600 font-semibold hover:underline">Texas Reverse Sales Tax (6.25%)</Link>
            </li>
            <li>
              <Link href="/reverse-vat-calculator" className="text-brand-600 font-semibold hover:underline">Reverse VAT Calculator for UK & Europe (20%)</Link>
            </li>
            <li>
              <Link href="/reverse-gst-calculator" className="text-brand-600 font-semibold hover:underline">Reverse GST Calculator for Canada, Australia, and New Zealand</Link>
            </li>
            <li>
              <Link href="/reverse-income-tax-calculator" className="text-brand-600 font-semibold hover:underline">Net to Gross Income Tax Estimator</Link>
            </li>
          </ul>
        </article>

        {/* FAQs */}
        <FAQAccordion items={homeFaqs} title="Frequently Asked Questions" />

        {/* Related Calculators Grid */}
        <RelatedCalculatorsGrid title="Popular Regional Calculators" />
      </div>
    </>
  )
}
