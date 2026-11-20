import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 text-slate-600 py-12 md:py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12 items-start">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-3.5 pr-0 md:pr-4">
            <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
              Free online tools for reverse sales tax, tax removal and related sales tax calculations.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Tax Rates Verified: 2026</span>
            </div>
          </div>

          {/* Column 2: Tools */}
          <div>
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 leading-none">
              <Link href="/tools" className="hover:text-blue-600 transition-colors">
                Tools
              </Link>
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/tools/sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Sales Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/reverse-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Sales Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/remove-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Remove Sales Tax from Total
                </Link>
              </li>
              <li>
                <Link href="/sales-tax-breakdown-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Sales Tax Breakdown Tool
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-blue-600 hover:underline transition-colors block font-semibold">
                  View All Tax Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 leading-none">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/guides/how-to-calculate-reverse-tax-percentage" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Sales Tax Guides
                </Link>
              </li>
              <li>
                <Link href="/reverse-tax-formula" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Tax Calculation Formulas
                </Link>
              </li>
              <li>
                <Link href="/us-sales-tax-by-zip-code" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Tax Rates by ZIP Code
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  State Tax Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Trust */}
          <div>
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 leading-none">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Contact
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
                <Link href="/disclaimer" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p className="m-0 text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} ReverseTaxCalculator.pro. Calculations are estimates for informational purposes only. Users should verify applicable tax rates and requirements with official state and local revenue authorities.
          </p>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <Link href="/sitemap.xml" className="text-slate-500 hover:text-slate-900 transition-colors">
              Sitemap
            </Link>
            <Link href="/disclaimer" className="text-slate-500 hover:text-slate-900 transition-colors">
              Disclaimer
            </Link>
            <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
