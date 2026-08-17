import React from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Logo } from './Logo'
import { REGIONS } from '@/data/regions'

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 text-slate-600 py-12 md:py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 5-Column Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12 items-start">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed font-normal">
              Fast, 100% free, client-side reverse tax calculators for sales tax, VAT, GST/HST, and payroll. Calculate pre-tax net amounts and tax paid instantly.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Verified: August 2026</span>
            </div>
          </div>

          {/* Col 2: Core Calculators */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-3.5">
              Core Calculators
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/reverse-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Sales Tax Calculator
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
                <Link href="/reverse-tax-rate-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Tax Rate Solver
                </Link>
              </li>
              <li>
                <Link href="/reverse-income-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Net to Gross Paycheck Estimator
                </Link>
              </li>
              <li>
                <Link href="/reverse-sales-tax-and-tip-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Tax & Tip Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular State & Region Pages */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-3.5">
              State & Regional
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              {REGIONS.slice(0, 7).map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}-reverse-sales-tax-calculator`}
                    className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block"
                  >
                    {r.name} Reverse {r.taxName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Guides & Articles (SEPARATE HEADER) */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-3.5">
              Guides & Articles
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/reverse-tax-formula" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Reverse Tax Formula & Math
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-calculate-reverse-tax-percentage" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  How to Calculate Reverse Tax %
                </Link>
              </li>
              <li>
                <Link href="/guides/reverse-tax-calculator-vs-forward-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Forward vs Reverse Tax
                </Link>
              </li>
              <li>
                <Link href="/guides/net-to-gross-salary-explained" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Net to Gross Salary Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/gst-vs-hst-vs-pst-canada-explained" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors block">
                  Canada GST/HST/PST Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal (SEPARATE HEADER) */}
          <div>
            <h3 className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wider mb-3.5">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-xs font-medium">
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
          <p className="m-0 text-slate-500">© {new Date().getFullYear()} reversetaxcalculator.pro. Free online financial tax calculators. No signup required.</p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-slate-500 hover:text-slate-900 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
