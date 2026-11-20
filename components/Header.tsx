'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import {
  Menu,
  X,
  Search,
  Calculator,
  BookOpen,
  Info,
  ShieldCheck,
} from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchItems = [
    { title: 'Reverse Sales Tax Calculator', url: '/reverse-sales-tax-calculator', category: 'Main Tool' },
    { title: 'Remove Sales Tax from Total', url: '/remove-sales-tax-calculator', category: 'Calculators' },
    { title: 'Tax-Inclusive Price Calculator', url: '/tax-inclusive-price-calculator', category: 'Calculators' },
    { title: 'Sales Tax Calculator (Add Tax)', url: '/sales-tax-calculator', category: 'Calculators' },
    { title: 'Add Sales Tax Calculator', url: '/add-sales-tax-calculator', category: 'Calculators' },
    { title: 'Tax-Exclusive Price Calculator', url: '/tax-exclusive-price-calculator', category: 'Calculators' },
    { title: 'Sales Tax Breakdown Calculator', url: '/sales-tax-breakdown-calculator', category: 'Calculators' },
    { title: 'Compare State Sales Tax', url: '/compare-sales-tax', category: 'Calculators' },
    { title: 'Bulk Invoice Sales Tax', url: '/bulk-sales-tax-calculator', category: 'Calculators' },
    { title: 'US Sales Tax by ZIP Code', url: '/us-sales-tax-by-zip-code', category: 'Tax Rates' },
    { title: 'Reverse Tax Formula Guide', url: '/reverse-tax-formula', category: 'Guides' },
    { title: 'How to Calculate Reverse Tax %', url: '/guides/how-to-calculate-reverse-tax-percentage', category: 'Guides' },
    { title: 'Forward vs Reverse Sales Tax', url: '/guides/reverse-tax-calculator-vs-forward-tax-calculator', category: 'Guides' },
    { title: 'All 50 State Tax Portals', url: '/data-sources', category: 'Tax Rates' },
    { title: 'About ReverseTaxCalculator.pro', url: '/about', category: 'Company' },
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

          {/* Simple, Professional Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700 whitespace-nowrap">
            <Link
              href="/"
              className="text-slate-800 hover:text-blue-600 transition-colors py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Home
            </Link>

            <Link
              href="/tools"
              className="text-slate-800 hover:text-blue-600 transition-colors py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Tools
            </Link>

            <Link
              href="/reverse-tax-formula"
              className="text-slate-800 hover:text-blue-600 transition-colors py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              Guides
            </Link>

            <Link
              href="/about"
              className="text-slate-800 hover:text-blue-600 transition-colors py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              About
            </Link>
          </nav>

          {/* Quick Search & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
              title="Search calculators"
              aria-label="Open search dialog"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-sm text-slate-900 py-2 border-b border-slate-100"
            >
              Home
            </Link>

            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2 border-b border-slate-100"
            >
              Tools
            </Link>

            <Link
              href="/reverse-tax-formula"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2 border-b border-slate-100"
            >
              Guides
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-2"
            >
              About
            </Link>
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
                placeholder="Search calculators (e.g. Reverse Sales Tax, Formula, ZIP)..."
                autoFocus
                className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                aria-label="Close search"
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
