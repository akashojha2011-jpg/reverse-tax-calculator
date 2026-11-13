import React from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Logo } from './Logo'
import { REGIONS } from '@/data/regions'

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 text-slate-600 py-12 md:py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 12-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-12 items-start">
          {/* Col 1: Brand & Overview (Spans 4 columns) */}
          <div className="sm:col-span-2 md:col-span-4 space-y-3.5 pr-0 md:pr-4">
            <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal max-w-sm">
              Fast, accurate financial calculators for US sales tax, VAT, GST/HST, discounts, tips, and payroll. Calculate pre-tax net amounts and tax paid instantly.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Tax Rates Verified: August 2026</span>
            </div>
          </div>

          {/* Col 2: Core Calculators (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-4 leading-none">
              Core Calculators
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/reverse-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Sales Tax
                </Link>
              </li>
              <li>
                <Link href="/sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Sales Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/add-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Add Sales Tax
                </Link>
              </li>
              <li>
                <Link href="/remove-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Remove Sales Tax
                </Link>
              </li>
              <li>
                <Link href="/discount-and-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Discount & Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/tip-and-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Tip & Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/sales-tax-breakdown-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Tax Breakdown Tool
                </Link>
              </li>
              <li>
                <Link href="/compare-sales-tax" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Compare State Tax Rates
                </Link>
              </li>
              <li>
                <Link href="/bulk-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Bulk Invoice Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: State & ZIP Data (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-4 leading-none">
              States & ZIP Codes
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/us-sales-tax-by-zip-code" className="text-blue-600 font-bold hover:underline transition-colors block">
                  ZIP Code Tax Lookup
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  All 50 State Tax Portals
                </Link>
              </li>
              {['california', 'new-york', 'texas', 'florida', 'illinois', 'washington', 'pennsylvania'].map((slug) => {
                const r = REGIONS.find((reg) => reg.slug === slug)
                return r ? (
                  <li key={slug}>
                    <Link
                      href={`/${slug}-reverse-sales-tax-calculator`}
                      className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block"
                    >
                      {r.name} ({r.rate}%)
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </div>

          {/* Col 4: Guides & Global (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-4 leading-none">
              Guides & Global
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/reverse-tax-formula" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Tax Formula
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-calculate-reverse-tax-percentage" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Tax % Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/reverse-tax-calculator-vs-forward-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Forward vs Reverse Tax
                </Link>
              </li>
              <li>
                <Link href="/reverse-vat-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse VAT Calculator
                </Link>
              </li>
              <li>
                <Link href="/reverse-gst-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse GST Calculator
                </Link>
              </li>
              <li>
                <Link href="/reverse-hst-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse HST Calculator
                </Link>
              </li>
              <li>
                <Link href="/reverse-income-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Net to Gross Paycheck
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Trust, Methodology & Legal (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-4 leading-none">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/editorial-policy" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/tax-data-methodology" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Tax Data Methodology
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Official Data Sources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  About Us & Accuracy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Financial Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-normal">
          <p className="m-0 text-slate-500">
            © {new Date().getFullYear()} reversetaxcalculator.pro. Financial tax calculation tools. For estimation purposes only.
          </p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/editorial-policy" className="text-slate-500 hover:text-slate-900 transition-colors">Editorial</Link>
            <Link href="/tax-data-methodology" className="text-slate-500 hover:text-slate-900 transition-colors">Methodology</Link>
            <Link href="/disclaimer" className="text-slate-500 hover:text-slate-900 transition-colors">Disclaimer</Link>
            <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-slate-500 hover:text-slate-900 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
