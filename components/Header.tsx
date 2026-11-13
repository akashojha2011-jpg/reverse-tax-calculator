'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { ChevronDown, Menu, X, Calculator, MapPin, Tag, Utensils, Layers, Scale, FileSpreadsheet, BookOpen } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-slate-200/90 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 hover:opacity-95 transition-opacity"
          aria-label="Reverse Tax Calculator Homepage"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 whitespace-nowrap">
          <Link href="/reverse-sales-tax-calculator" className="hover:text-blue-600 transition-colors">
            Sales Tax
          </Link>

          <Link href="/us-sales-tax-by-zip-code" className="hover:text-blue-600 transition-colors">
            ZIP Code Lookup
          </Link>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2 focus:outline-hidden"
              aria-expanded={toolsDropdownOpen}
            >
              <span>Tax Tools</span>
              <ChevronDown className="w-4 h-4 opacity-70" />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-1 z-50">
                <Link
                  href="/sales-tax-calculator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Sales Tax Calculator</span>
                </Link>

                <Link
                  href="/remove-sales-tax-calculator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Remove Sales Tax</span>
                </Link>

                <Link
                  href="/discount-and-tax-calculator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Discount & Tax Calculator</span>
                </Link>

                <Link
                  href="/tip-and-tax-calculator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Utensils className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tip & Tax Calculator</span>
                </Link>

                <Link
                  href="/sales-tax-breakdown-calculator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tax Breakdown Calculator</span>
                </Link>

                <Link
                  href="/compare-sales-tax"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Scale className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Compare Tax by State</span>
                </Link>

                <Link
                  href="/bulk-sales-tax-calculator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Bulk Invoice Calculator</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/reverse-tax-formula" className="hover:text-blue-600 transition-colors">
            Formula
          </Link>

          <Link href="/data-sources" className="hover:text-blue-600 transition-colors">
            Tax Rate Data
          </Link>

          <Link
            href="/reverse-vat-calculator"
            className="hover:text-blue-600 transition-colors text-slate-500"
          >
            VAT
          </Link>

          <Link
            href="/reverse-gst-calculator"
            className="hover:text-blue-600 transition-colors text-slate-500"
          >
            GST/HST
          </Link>
        </nav>

        {/* Primary Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
          >
            Reverse Calculator
          </Link>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">Calculators</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold"
            >
              Reverse Calculator
            </Link>
            <Link
              href="/sales-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              Sales Tax
            </Link>
            <Link
              href="/us-sales-tax-by-zip-code"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              ZIP Code Lookup
            </Link>
            <Link
              href="/discount-and-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              Discount & Tax
            </Link>
            <Link
              href="/tip-and-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              Tip & Tax
            </Link>
            <Link
              href="/compare-sales-tax"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              Compare States
            </Link>
            <Link
              href="/bulk-sales-tax-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              Bulk Invoice
            </Link>
            <Link
              href="/reverse-vat-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100"
            >
              VAT Calculator
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 space-y-1">
            <Link
              href="/reverse-tax-formula"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-slate-50"
            >
              Tax Formula & Mathematics
            </Link>
            <Link
              href="/data-sources"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-slate-50"
            >
              Tax Rate Data Sources
            </Link>
            <Link
              href="/editorial-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded hover:bg-slate-50"
            >
              Editorial Policy
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
