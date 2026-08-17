import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { FAQAccordion } from '@/components/FAQAccordion'

interface GuidePageProps {
  params: {
    slug: string
  }
}

interface GuideData {
  title: string
  metaTitle: string
  metaDesc: string
  lastUpdated: string
  summary: string
  content: React.ReactNode
  faqs: { question: string; answer: string }[]
}

const GUIDES_DATA: Record<string, GuideData> = {
  'how-to-calculate-reverse-tax-percentage': {
    title: 'How to Calculate Reverse Tax Percentage',
    metaTitle: 'How to Calculate Reverse Tax Percentage: Guide & Formula',
    metaDesc: 'Complete guide to calculating reverse tax percentage. Learn exact mathematical formulas, division shortcuts, and step-by-step examples.',
    lastUpdated: 'August 2026',
    summary:
      'To calculate reverse tax percentage from a tax-inclusive total price, divide the total gross price by 1 + (tax rate ÷ 100) to find the pre-tax net subtotal. Subtract the net price from the gross total to calculate the exact tax paid.',
    faqs: [
      {
        question: 'What is the exact formula to calculate tax backwards?',
        answer: 'Pre-Tax Net Price = Gross Total ÷ (1 + Tax Rate). Tax Amount Paid = Gross Total - Pre-Tax Net Price.',
      },
      {
        question: 'Why can’t I just subtract the tax percentage from the total?',
        answer: 'Sales tax is calculated on the pre-tax base, not the total price. Subtracting 7% from $107 gives $99.51 instead of the correct $100.00.',
      },
      {
        question: 'How do I solve for the tax rate percentage when only Net and Gross are known?',
        answer: 'Tax Rate % = [(Gross Total ÷ Net Subtotal) - 1] × 100.',
      },
    ],
    content: (
      <>
        <h2 id="universal-formula" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3">
          1. The Universal Reverse Tax Formula
        </h2>
        <p>
          When a transaction total ($G$) includes a sales tax or VAT rate ($r$), the pre-tax net subtotal ($N$) is calculated using division rather than percentage subtraction:
        </p>
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
          <div>Pre-Tax Net Price = Gross Total Price ÷ (1 + Tax Rate Decimal)</div>
          <div>Tax Amount Paid = Gross Total Price - Pre-Tax Net Price</div>
        </div>

        <h2 id="worked-example" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3">
          2. Step-by-Step Worked Calculation
        </h2>
        <p>
          Suppose you receive an invoice for <strong>$214.00 total</strong> in a jurisdiction with a <strong>7% sales tax rate</strong>:
        </p>
        <ol className="list-decimal pl-6 space-y-1 text-slate-700 text-sm">
          <li><strong>Convert Tax Rate to Decimal</strong>: 7% = 0.07.</li>
          <li><strong>Add 1 to Decimal Rate</strong>: 1 + 0.07 = 1.07.</li>
          <li><strong>Divide Gross Total by Multiplier</strong>: $214.00 ÷ 1.07 = <strong>$200.00 Net Subtotal</strong>.</li>
          <li><strong>Subtract Net from Gross to Find Tax</strong>: $214.00 - $200.00 = <strong>$14.00 Sales Tax Paid</strong>.</li>
        </ol>

        <h2 id="rate-solver" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3">
          3. How to Solve for the Tax Rate Percentage
        </h2>
        <p>
          If your receipt lists a pre-tax subtotal of <strong>$200.00</strong> and a total charge of <strong>$214.00</strong>, but omits the tax rate percentage:
        </p>
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700">
          Tax Rate % = [(Gross Total ÷ Net Subtotal) - 1] × 100
        </div>
        <p>
          Rate = [($214.00 ÷ $200.00) - 1] × 100 = (1.07 - 1) × 100 = <strong>7%</strong>.
        </p>
      </>
    ),
  },

  'reverse-tax-calculator-vs-forward-tax-calculator': {
    title: 'Forward Tax vs. Reverse Tax Calculator Comparison',
    metaTitle: 'Reverse Tax vs. Forward Tax Calculator Comparison',
    metaDesc: 'Learn the difference between forward tax calculators and reverse tax calculators, including formulas, common errors, and practical use cases.',
    lastUpdated: 'August 2026',
    summary:
      'A forward tax calculator adds tax to a pre-tax subtotal to find the gross price (Gross = Net × 1.07). A reverse tax calculator extracts pre-tax price backwards from a tax-inclusive total (Net = Gross ÷ 1.07).',
    faqs: [
      {
        question: 'When should I use a forward tax calculator?',
        answer: 'Use forward calculation when pricing retail items or setting pre-tax rates for sales invoices.',
      },
      {
        question: 'When should I use a reverse tax calculator?',
        answer: 'Use reverse calculation when logging post-tax receipts, filing VAT reclaims, or splitting credit card bills.',
      },
    ],
    content: (
      <>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-3">
          1. Key Differences Between Forward and Reverse Tax
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
          <li><strong>Forward Tax Calculator</strong>: Computes sales tax by applying the tax percentage to a known pre-tax net subtotal ($G = N \times (1 + r)$).</li>
          <li><strong>Reverse Tax Calculator</strong>: Extracts the original pre-tax net subtotal from a known tax-inclusive gross total ($N = G \div (1 + r)$).</li>
        </ul>

        <h2 className="text-2xl font-extrabold text-slate-900 mt-8 mb-3">
          2. Why Direct Subtraction Fails
        </h2>
        <p>
          A common mistake is taking 7% off a $107 total ($107 - $7.49 = $99.51). Sales tax is computed on the pre-tax base ($100), not the total. Division by 1.07 accounts for this correctly ($107 ÷ 1.07 = $100.00).
        </p>
      </>
    ),
  },

  'net-to-gross-salary-explained': {
    title: 'Net to Gross Salary Explained',
    metaTitle: 'Net to Gross Salary Explained: Paycheck Math Guide',
    metaDesc: 'Learn how to convert target net take-home pay into required gross salary. Includes math formulas, tax bracket rules, and conversion tables.',
    lastUpdated: 'August 2026',
    summary:
      'Income taxes are deducted from gross pay. To estimate the gross salary required to achieve a target take-home pay, divide the target net amount by 1 - Effective Tax Rate Decimal.',
    faqs: [
      {
        question: 'How do you calculate gross salary from net pay?',
        answer: 'Required Gross Salary = Target Net Pay ÷ (1 - Effective Tax Rate).',
      },
      {
        question: 'Why is payroll tax different from sales tax?',
        answer: 'Sales tax is added to net cost (Gross = Net × 1.07). Income tax is deducted from gross pay (Net = Gross × 0.80).',
      },
    ],
    content: (
      <>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-3">
          1. The Net to Gross Payroll Formula
        </h2>
        <p>
          To calculate required gross salary from desired take-home pay:
        </p>
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700">
          Required Gross Salary = Target Net Pay ÷ (1 - Effective Tax Rate Decimal)
        </div>
        <p>
          For a <strong>$4,000 net target</strong> with a <strong>20% effective tax rate</strong>: $4,000 ÷ 0.80 = <strong>$5,000.00 Gross Salary</strong>.
        </p>
      </>
    ),
  },

  'gst-vs-hst-vs-pst-canada-explained': {
    title: 'Canada Sales Tax Guide: GST vs. HST vs. PST Explained',
    metaTitle: 'Canada GST vs HST vs PST Guide & Comparison Table',
    metaDesc: 'Comprehensive guide to Canadian sales taxes. Compare GST, HST, PST, and QST rates across all 13 provinces and territories.',
    lastUpdated: 'August 2026',
    summary:
      'Canadian sales taxes include 5% federal GST, provincial PST (BC 7%, SK 6%, MB 7%, QC 9.975%), and blended HST (Ontario 13%, Atlantic Canada 15%).',
    faqs: [
      {
        question: 'Which Canadian provinces use 15% HST?',
        answer: 'Nova Scotia, New Brunswick, Prince Edward Island, and Newfoundland and Labrador charge 15% HST.',
      },
      {
        question: 'What is Ontario’s HST rate?',
        answer: 'Ontario charges 13% HST (5% GST + 8% provincial tax). Divide gross total by 1.13 to reverse tax.',
      },
    ],
    content: (
      <>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-3">
          1. Canadian Sales Tax Types
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
          <li><strong>GST (Goods and Services Tax)</strong>: 5% federal tax applied nationwide.</li>
          <li><strong>PST/QST (Provincial Sales Tax)</strong>: Levied in BC (7%), Manitoba (7%), Saskatchewan (6%), and Quebec (9.975%).</li>
          <li><strong>HST (Harmonized Sales Tax)</strong>: Single blended rate in Ontario (13%) and Atlantic Canada (15%).</li>
        </ul>
      </>
    ),
  },

  'vat-reverse-charge-explained': {
    title: 'VAT Reverse Charge Mechanism: B2B Accounting Rules',
    metaTitle: 'VAT Reverse Charge Explained: B2B Accounting Rules',
    metaDesc: 'Learn how the VAT reverse charge mechanism works for cross-border B2B transactions and UK CIS construction invoicing.',
    lastUpdated: 'August 2026',
    summary:
      'Under the VAT Reverse Charge mechanism, the buyer self-assesses VAT on their tax return instead of paying VAT to the seller.',
    faqs: [
      {
        question: 'What is the Reverse Charge VAT rule?',
        answer: 'It is a B2B accounting rule where the purchaser accounts for both output and input VAT on cross-border or CIS services.',
      },
    ],
    content: (
      <>
        <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-3">
          1. How the Reverse Charge Works
        </h2>
        <p>
          The supplier issues an invoice with 0% VAT noting "Subject to VAT Reverse Charge". The buyer declares both output VAT and input VAT on their VAT return.
        </p>
      </>
    ),
  },
}

export async function generateStaticParams() {
  return Object.keys(GUIDES_DATA).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = GUIDES_DATA[params.slug]
  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    alternates: {
      canonical: `https://reversetaxcalculator.pro/guides/${params.slug}`,
    },
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = GUIDES_DATA[params.slug]

  if (!guide) {
    notFound()
  }

  // Article JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    url: `https://reversetaxcalculator.pro/guides/${params.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Reverse Tax Calculator Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reverse Tax Calculator',
    },
    datePublished: '2026-01-01',
    dateModified: '2026-08-17',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Guides', url: '/reverse-tax-formula' },
          { name: guide.title, url: `/guides/${params.slug}` },
        ]}
      />

      <article className="max-w-text-col mx-auto space-y-6">
        <header className="border-b border-slate-200 pb-4">
          <div className="text-xs text-slate-500 font-semibold mb-1">
            Last updated: <strong>{guide.lastUpdated}</strong> | Financial Math Verified
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {guide.title}
          </h1>
        </header>

        <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
            Summary Answer
          </h2>
          <p className="text-slate-800 text-base leading-relaxed mb-0">
            {guide.summary}
          </p>
        </section>

        <div className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
          {guide.content}
        </div>

        <FAQAccordion items={guide.faqs} title="Frequently Asked Questions" />

        <RelatedCalculatorsGrid title="Try Our Reverse Tax Calculators" />
      </article>
    </>
  )
}
