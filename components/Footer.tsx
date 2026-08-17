import React from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Logo } from './Logo'
import { REGIONS } from '@/data/regions'

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 text-slate-600 py-12 md:py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 items-start">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-3.5">
            <Link href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Fast, 100% free, client-side reverse tax calculators for sales tax, VAT, GST/HST, and payroll. Calculate pre-tax net amounts and tax paid instantly.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Tax Rates Verified: August 2026</span>
            </div>
          </div>

          {/* Col 2: Core Calculators */}
          <div>
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4">
              Core Calculators
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/reverse-sales-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse Sales Tax Calculator
                </Link>
              </li>
              <li>
                <Link href="/reverse-vat-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse VAT Calculator (UK/EU)
                </Link>
              </li>
              <li>
                <Link href="/reverse-gst-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse GST Calculator
                </Link>
              </li>
              <li>
                <Link href="/reverse-hst-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse HST Calculator (Canada)
                </Link>
              </li>
              <li>
                <Link href="/reverse-tax-rate-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse Tax Rate Solver
                </Link>
              </li>
              <li>
                <Link href="/reverse-income-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Net to Gross Paycheck Estimator
                </Link>
              </li>
              <li>
                <Link href="/reverse-sales-tax-and-tip-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse Tax & Tip Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular State & Region Pages */}
          <div>
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4">
              State & Regional Pages
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {REGIONS.slice(0, 8).map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}-reverse-sales-tax-calculator`}
                    className="text-slate-600 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {r.name} Reverse {r.taxName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Guides & Legal */}
          <div>
            <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4">
              Guides & Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/reverse-tax-formula" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Reverse Tax Formula & Math
                </Link>
              </li>
              <li>
                <Link href="/guides/how-to-calculate-reverse-tax-percentage" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  How to Calculate Reverse Tax %
                </Link>
              </li>
              <li>
                <Link href="/guides/reverse-tax-calculator-vs-forward-tax-calculator" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Forward vs Reverse Tax
                </Link>
              </li>
              <li>
                <Link href="/guides/net-to-gross-salary-explained" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Net to Gross Salary Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/gst-vs-hst-vs-pst-canada-explained" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Canada GST/HST/PST Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  About Us & Accuracy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-blue-600 hover:underline transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="m-0 text-slate-500">© {new Date().getFullYear()} reversetaxcalculator.pro. Free online financial tax calculators. No signup required.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-slate-500 hover:text-slate-900 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
