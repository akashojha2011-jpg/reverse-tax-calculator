'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Calculator,
  MapPin,
  Tag,
  Layers,
  Scale,
  FileSpreadsheet,
  BookOpen,
  MinusCircle,
  Percent,
} from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reverseMenuOpen, setReverseMenuOpen] = useState(false)
  const [salesMenuOpen, setSalesMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchItems = [
    { title: 'Reverse Sales Tax Calculator', url: '/reverse-sales-tax-calculator', category: 'Reverse Tax' },
    { title: 'Remove Sales Tax from Total', url: '/remove-sales-tax-calculator', category: 'Reverse Tax' },
    { title: 'Reverse VAT Calculator (20%)', url: '/reverse-vat-calculator', category: 'Reverse Tax' },
    { title: 'Reverse GST Calculator', url: '/reverse-gst-calculator', category: 'Reverse Tax' },
    { title: 'Reverse HST Calculator (Canada)', url: '/reverse-hst-calculator', category: 'Reverse Tax' },
    { title: 'Reverse PST Calculator (BC, SK, MB)', url: '/reverse-pst-calculator', category: 'Reverse Tax' },
    { title: 'Tax-Inclusive Price Calculator', url: '/tax-inclusive-price-calculator', category: 'Reverse Tax' },
    { title: 'Sales Tax Calculator (Add Tax)', url: '/sales-tax-calculator', category: 'Sales Tax' },
    { title: 'Add Sales Tax Calculator', url: '/add-sales-tax-calculator', category: 'Sales Tax' },
    { title: 'Tax-Exclusive Price Calculator', url: '/tax-exclusive-price-calculator', category: 'Sales Tax' },
    { title: 'Sales Tax Breakdown Calculator', url: '/sales-tax-breakdown-calculator', category: 'Sales Tax' },
    { title: 'Compare State Sales Tax', url: '/compare-sales-tax', category: 'Sales Tax' },
    { title: 'Bulk Invoice Sales Tax', url: '/bulk-sales-tax-calculator', category: 'Sales Tax' },
    { title: 'US Sales Tax by ZIP Code', url: '/us-sales-tax-by-zip-code', category: 'Tax Rates' },
    { title: 'All 50 State Tax Portals', url: '/data-sources', category: 'Tax Rates' },
    { title: 'Reverse Tax Formula Guide', url: '/reverse-tax-formula', category: 'Tax Guides' },
    { title: 'How to Calculate Reverse Tax %', url: '/guides/how-to-calculate-reverse-tax-percentage', category: 'Tax Guides' },
    { title: 'Forward vs Reverse Sales Tax', url: '/guides/reverse-tax-calculator-vs-forward-tax-calculator', category: 'Tax Guides' },
  ]

  const filteredSearch = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / Site Name */}
          <Link
            href="/"
            className="flex items-center shrink-0 hover:opacity-95 transition-opacity"
            aria-label="ReverseTaxCalculator.pro Homepage"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-700 whitespace-nowrap">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Home
            </Link>

            {/* Reverse Tax Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setReverseMenuOpen(true)}
              onMouseLeave={() => setReverseMenuOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2 cursor-pointer focus:outline-none"
                aria-expanded={reverseMenuOpen}
              >
                <span>Reverse Tax Calculators</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {reverseMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-1 z-50">
                  <Link
                    href="/reverse-sales-tax-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Reverse Sales Tax Calculator</span>
                  </Link>
                  <Link
                    href="/remove-sales-tax-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <MinusCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Remove Sales Tax from Total</span>
                  </Link>
                  <Link
                    href="/tax-inclusive-price-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Tax-Inclusive Price Calculator</span>
                  </Link>
                  <Link
                    href="/reverse-vat-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Percent className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Reverse VAT Calculator</span>
                  </Link>
                  <Link
                    href="/reverse-gst-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Percent className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Reverse GST Calculator</span>
                  </Link>
                  <Link
                    href="/reverse-hst-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Percent className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Reverse HST Calculator</span>
                  </Link>
                  <Link
                    href="/reverse-pst-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Percent className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Reverse PST Calculator</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Sales Tax Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSalesMenuOpen(true)}
              onMouseLeave={() => setSalesMenuOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2 cursor-pointer focus:outline-none"
                aria-expanded={salesMenuOpen}
              >
                <span>Sales Tax Calculators</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {salesMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-1 z-50">
                  <Link
                    href="/sales-tax-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Sales Tax Calculator (Add Tax)</span>
                  </Link>
                  <Link
                    href="/add-sales-tax-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Add Sales Tax Calculator</span>
                  </Link>
                  <Link
                    href="/tax-exclusive-price-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Tag className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Tax-Exclusive Price Calculator</span>
                  </Link>
                  <Link
                    href="/sales-tax-breakdown-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Tax Breakdown Tool</span>
                  </Link>
                  <Link
                    href="/compare-sales-tax"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Scale className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Compare Tax Across States</span>
                  </Link>
                  <Link
                    href="/bulk-sales-tax-calculator"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Bulk Invoice Tax Tool</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/us-sales-tax-by-zip-code"
              className="hover:text-blue-600 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Tax Rates
            </Link>

            <Link
              href="/reverse-tax-formula"
              className="hover:text-blue-600 transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Tax Guides
            </Link>
          </nav>

          {/* Quick Search & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
              title="Search Tax Calculators"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search Calculators...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-sm text-slate-900 py-1"
            >
              Home
            </Link>

            <div className="space-y-1 pt-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Reverse Tax Calculators
              </div>
              <Link
                href="/reverse-sales-tax-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Reverse Sales Tax Calculator
              </Link>
              <Link
                href="/remove-sales-tax-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Remove Sales Tax
              </Link>
              <Link
                href="/tax-inclusive-price-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Tax-Inclusive Calculator
              </Link>
              <Link
                href="/reverse-vat-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Reverse VAT Calculator
              </Link>
              <Link
                href="/reverse-gst-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Reverse GST Calculator
              </Link>
              <Link
                href="/reverse-hst-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Reverse HST Calculator
              </Link>
              <Link
                href="/reverse-pst-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Reverse PST Calculator
              </Link>
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sales Tax Calculators
              </div>
              <Link
                href="/sales-tax-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Sales Tax Calculator (Add Tax)
              </Link>
              <Link
                href="/add-sales-tax-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Add Sales Tax
              </Link>
              <Link
                href="/tax-exclusive-price-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Tax-Exclusive Calculator
              </Link>
              <Link
                href="/sales-tax-breakdown-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Tax Breakdown Tool
              </Link>
              <Link
                href="/compare-sales-tax"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Compare State Tax
              </Link>
            </div>

            <div className="space-y-1 pt-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Rates & Guides
              </div>
              <Link
                href="/us-sales-tax-by-zip-code"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                ZIP Code Tax Lookup
              </Link>
              <Link
                href="/data-sources"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                All 50 State Rates
              </Link>
              <Link
                href="/reverse-tax-formula"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-medium text-slate-700 py-1"
              >
                Reverse Tax Formula Guide
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Calculator Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g. Reverse Sales Tax, VAT, ZIP)..."
                autoFocus
                className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100">
              {filteredSearch.length > 0 ? (
                filteredSearch.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={() => setSearchModalOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
                  >
                    <span>{item.title}</span>
                    <span className="text-[11px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  No calculators found for &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
