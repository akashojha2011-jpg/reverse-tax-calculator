import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center shrink-0 hover:opacity-95 transition-opacity"
          aria-label="Reverse Tax Calculator Homepage"
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 whitespace-nowrap">
          <Link href="/reverse-sales-tax-calculator" className="hover:text-blue-600 transition-colors">
            Sales Tax
          </Link>
          <Link href="/reverse-vat-calculator" className="hover:text-blue-600 transition-colors">
            VAT
          </Link>
          <Link href="/reverse-gst-calculator" className="hover:text-blue-600 transition-colors">
            GST
          </Link>
          <Link href="/reverse-hst-calculator" className="hover:text-blue-600 transition-colors">
            HST
          </Link>
          <Link href="/reverse-tax-formula" className="hover:text-blue-600 transition-colors">
            Formula
          </Link>
          <Link href="/reverse-income-tax-calculator" className="hover:text-blue-600 transition-colors">
            Net to Gross
          </Link>
        </nav>
      </div>
    </header>
  )
}
