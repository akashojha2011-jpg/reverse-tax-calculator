import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import {
  Calculator,
  Receipt,
  MinusCircle,
  PlusCircle,
  Layers,
  Scale,
  FileSpreadsheet,
  Tag,
  Utensils,
  MapPin,
  Percent,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax Calculators Directory — Online Sales Tax & Reverse Tax Tools',
  description:
    'Browse our comprehensive directory of free online sales tax tools. Calculate forward sales tax, reverse tax from receipts, VAT, GST, discounts, and ZIP code rates.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools',
  },
  openGraph: {
    title: 'Tax Calculators Directory — Online Sales Tax & Reverse Tax Tools',
    description:
      'Browse our comprehensive directory of free online sales tax tools. Calculate forward sales tax, reverse tax from receipts, VAT, GST, discounts, and ZIP code rates.',
    url: 'https://www.reversetaxcalculator.pro/tools',
    siteName: 'ReverseTaxCalculator.pro',
    type: 'website',
  },
}

export default function ToolsDirectoryPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tax Calculators Directory',
    url: 'https://www.reversetaxcalculator.pro/tools',
    description:
      'Directory of online sales tax calculators, reverse tax calculators, and regional tax estimation tools.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <BreadcrumbNav items={[{ name: 'Tools', url: '/tools' }]} />

      <div className="space-y-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="space-y-3 pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Tools Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Online Tax Calculators
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Choose from our specialized collection of financial calculators designed for consumers, retailers, accountants, and businesses. Fast, private, and 100% free with no registration required.
          </p>
        </header>

        {/* Section 1: Standard & Forward Sales Tax Tools */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              <span>Standard Sales Tax Calculators (Add Tax Forward)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Calculate sales tax due on pre-tax subtotals and find final checkout totals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/tools/sales-tax-calculator"
              className="group p-5 rounded-2xl border border-blue-200 bg-blue-50/30 hover:border-blue-400 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                  Sales Tax Calculator
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Featured
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate the exact sales tax amount and final checkout price from any pre-tax purchase price.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/add-sales-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Add Sales Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Quick register price estimator to add statutory sales tax to advertised shelf prices.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/tools/sales-tax-breakdown"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Sales Tax Breakdown Tool
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Visualize how sales tax is divided between state, county, municipal, and transit districts.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/compare-sales-tax"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Compare Sales Tax Across States
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Compare rates and out-of-pocket costs on large purchases across multiple states and cities side-by-side.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/bulk-sales-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Bulk Invoice Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Build multi-item invoices, separate taxable and exempt goods, and export results directly to CSV.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/discount-and-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Discount & Sales Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate discounted sale prices and see sales tax applied to the discounted subtotal.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* Section 2: Reverse Sales Tax & Deduction Tools */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <MinusCircle className="w-5 h-5 text-blue-600" />
              <span>Reverse Tax Calculators (Extract Tax Backwards)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Extract pre-tax prices and sales tax paid from tax-inclusive receipt totals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link
              href="/reverse-sales-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse Sales Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate pre-tax prices and sales tax paid backwards from any receipt or invoice total.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/remove-sales-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <MinusCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Remove Sales Tax from Total
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Deduct sales tax for business expense reports, bookkeeping, and Schedule C tax filings.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/tax-inclusive-price-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Tax-Inclusive Price Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Deconstruct gross inclusive prices into pre-tax revenue and tax payable for GAAP/IFRS accounting.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/reverse-tax-formula"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Reverse Tax Formula Guide
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Step-by-step mathematical derivation of the divisor formula and spreadsheet functions for Excel.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/tip-and-tax-calculator"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                Tip and Tax Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Calculate restaurant tip on pre-tax vs post-tax totals and split group dining checks evenly.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/us-sales-tax-by-zip-code"
              className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5 block"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors m-0">
                US Sales Tax by ZIP Code
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Search state, county, municipal, and district sales tax rates across 40,000+ US ZIP codes.
              </p>
              <div className="pt-1 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Lookup Rates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* Section 3: International Value Added & Goods and Services Tax */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Percent className="w-5 h-5 text-blue-600" />
              <span>International VAT & GST Engines</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Specialized reverse tax tools for Canadian, British, European, and Australian commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <Link
              href="/tools/reverse-vat-calculator"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-1 block"
            >
              <div className="font-bold text-slate-900 text-sm">Reverse VAT Calculator</div>
              <p className="text-slate-600 m-0">For UK & EU 20%, 21%, and 19% standard VAT invoices.</p>
            </Link>

            <Link
              href="/tools/reverse-gst-calculator/"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-1 block"
            >
              <div className="font-bold text-slate-900 text-sm">Reverse GST Calculator</div>
              <p className="text-slate-600 m-0">For India, Australia (10%), New Zealand (15%), and Canada.</p>
            </Link>

            <Link
              href="/reverse-hst-calculator"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-1 block"
            >
              <div className="font-bold text-slate-900 text-sm">Reverse HST Calculator</div>
              <p className="text-slate-600 m-0">For Ontario (13%) and Atlantic Canada (15%).</p>
            </Link>

            <Link
              href="/reverse-pst-calculator"
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-1 block"
            >
              <div className="font-bold text-slate-900 text-sm">Reverse PST Calculator</div>
              <p className="text-slate-600 m-0">For British Columbia, Saskatchewan, and Manitoba.</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
