import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import {
  BookOpen,
  Calculator,
  ArrowRight,
  FileText,
  Scale,
  DollarSign,
  Globe2,
  Clock,
  CheckCircle2,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax Calculation & Accounting Guides — ReverseTaxCalculator.pro',
  description:
    'Explore comprehensive financial and tax accounting guides. Learn reverse tax algebra, forward vs. reverse tax differences, Canadian GST/HST rules, and payroll conversions.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/guides',
  },
  openGraph: {
    title: 'Tax Calculation & Accounting Guides — ReverseTaxCalculator.pro',
    description:
      'Explore comprehensive financial and tax accounting guides. Learn reverse tax algebra, forward vs. reverse tax differences, Canadian GST/HST rules, and payroll conversions.',
    url: 'https://www.reversetaxcalculator.pro/guides',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

interface GuideCard {
  title: string
  slug: string
  category: string
  readingTime: string
  description: string
  keyTakeaways: string[]
  icon: React.ReactNode
  featured?: boolean
}

const GUIDES_LIST: GuideCard[] = [
  {
    title: 'How to Calculate Reverse Tax Percentage: Master Formula & Proof Guide',
    slug: 'how-to-calculate-reverse-tax-percentage',
    category: 'Formulas & Math',
    readingTime: '10 min read',
    featured: true,
    description:
      'Master the exact mathematics of extracting pre-tax prices and sales tax paid from tax-inclusive totals. Features algebraic proofs, division shortcuts, and global rate multiplier tables.',
    keyTakeaways: [
      'Universal formula: Net = Gross ÷ (1 + Tax Rate)',
      'Mathematical proof of why direct subtraction fails (the 7% fallacy)',
      'Division multipliers for US, UK, EU, Canada, and Australia',
      'Step-by-step worked examples and multi-tier tax proofs',
    ],
    icon: <Calculator className="w-5 h-5" />,
  },
  {
    title: 'Reverse Tax vs. Forward Tax Calculator: Comprehensive Comparison',
    slug: 'reverse-tax-calculator-vs-forward-tax-calculator',
    category: 'Accounting Principles',
    readingTime: '8 min read',
    description:
      'Understand the fundamental differences between adding sales tax forward to a base price and extracting tax backwards from an inclusive receipt. Learn which method applies to your accounting needs.',
    keyTakeaways: [
      'Side-by-side comparison of input, target output, and math operators',
      'Point-of-sale checkout vs. expense audit and VAT reclaim workflows',
      'Cross-border e-commerce compliance and price presentation laws',
      'Half-up rounding rules and currency precision standards',
    ],
    icon: <Scale className="w-5 h-5" />,
  },
  {
    title: 'Canada Sales Tax Master Guide: GST vs. HST vs. PST vs. QST Explained',
    slug: 'gst-vs-hst-vs-pst-canada-explained',
    category: 'Canadian Tax',
    readingTime: '12 min read',
    description:
      'The definitive guide to navigating Canada’s unique multi-tier sales tax architecture. Covers all 13 provinces and territories, CRA Input Tax Credit (ITC) filings, and reverse HST math.',
    keyTakeaways: [
      'Complete 13-province tax rate matrix and combined multipliers',
      'Federal 5% GST vs. provincial PST/QST dual-tax calculations',
      'Harmonized Sales Tax (HST) blending in Ontario and Atlantic Canada',
      'How Canadian businesses claim back ITCs from expense receipts',
    ],
    icon: <Globe2 className="w-5 h-5" />,
  },
  {
    title: 'Net to Gross Salary Explained: Ultimate Paycheck Conversion Guide',
    slug: 'net-to-gross-salary-explained',
    category: 'Payroll & Compensation',
    readingTime: '9 min read',
    description:
      'Learn how HR professionals, recruiters, and contractors calculate the gross salary required to achieve a target take-home paycheck after federal, state, and payroll tax deductions.',
    keyTakeaways: [
      'Why payroll withholding math differs from retail sales tax math',
      'Gross salary back-calculation formula using effective tax rates',
      'FICA, Medicare, and statutory payroll withholding components',
      'W-2 employee vs. 1099 independent contractor compensation models',
    ],
    icon: <DollarSign className="w-5 h-5" />,
  },
]

export default function GuidesDirectoryPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tax Calculation & Accounting Guides Directory',
    url: 'https://www.reversetaxcalculator.pro/guides',
    description:
      'Comprehensive educational guides on reverse sales tax algebra, forward vs. reverse tax calculation, Canadian sales taxes, and payroll net-to-gross math.',
    hasPart: GUIDES_LIST.map((g, idx) => ({
      '@type': 'Article',
      position: idx + 1,
      headline: g.title,
      url: `https://www.reversetaxcalculator.pro/guides/${g.slug}`,
      description: g.description,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <BreadcrumbNav items={[{ name: 'Guides', url: '/guides' }]} />

      <div className="space-y-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="space-y-3 pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Educational Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tax Calculation & Accounting Guides
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            In-depth references written for accountants, small business owners, consumers, and payroll specialists. Explore rigorous mathematical formulas, algebraic proofs, jurisdiction rate tables, and accounting workflows.
          </p>
        </header>

        {/* Guides Grid */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUIDES_LIST.map((guide) => (
              <article
                key={guide.slug}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-200 ${
                  guide.featured
                    ? 'border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white shadow-xs hover:border-blue-400 hover:shadow-md'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  {/* Badges & Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {guide.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {guide.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {guide.title}
                    </Link>
                  </h2>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {guide.description}
                  </p>

                  {/* Key Takeaways */}
                  <div className="pt-2 border-t border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Topics Covered:
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {guide.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Read Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Verified Accounting Math
                  </span>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quick Tools CTA Banner */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider inline-block">
              Interactive Calculators
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Put the Formulas to Work with Our Free Tax Tools
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Don’t want to crunch the math by hand? Use our suite of dedicated calculators for reverse sales tax, international VAT, Canadian GST/HST, and local sales tax by ZIP code.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md transition-all"
              >
                <span>Browse All Calculators</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-all"
              >
                <span>Reverse Sales Tax Tool</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
