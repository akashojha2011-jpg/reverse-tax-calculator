'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Building2, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { US_ZIP_TAX_DATA, type ZipTaxRate } from '@/data/zip-tax-data'
import { calculateForwardSalesTax, calculateReverseTax, formatCurrency } from '@/lib/tax-math'

export function ZipTaxLookupTool() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedZip, setSelectedZip] = useState<ZipTaxRate>(US_ZIP_TAX_DATA[0])
  const [amount, setAmount] = useState<number>(100)
  const [copied, setCopied] = useState(false)

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return US_ZIP_TAX_DATA.slice(0, 10)

    return US_ZIP_TAX_DATA.filter(
      (z) =>
        z.zip.startsWith(q) ||
        z.city.toLowerCase().includes(q) ||
        z.stateName.toLowerCase().includes(q) ||
        z.stateCode.toLowerCase() === q
    ).slice(0, 10)
  }, [searchTerm])

  // Perform calculation
  const forwardResult = useMemo(() => {
    return calculateForwardSalesTax(amount, selectedZip.combinedRate)
  }, [amount, selectedZip.combinedRate])

  const reverseResult = useMemo(() => {
    return calculateReverseTax(amount, selectedZip.combinedRate)
  }, [amount, selectedZip.combinedRate])

  const handleCopy = () => {
    const text = `Location: ${selectedZip.city}, ${selectedZip.stateCode} (${selectedZip.zip})\nCombined Tax Rate: ${selectedZip.combinedRate}%\nPre-Tax Subtotal: $${forwardResult.netAmount.toFixed(2)}\nSales Tax Paid: $${forwardResult.taxAmount.toFixed(2)}\nTotal Amount: $${forwardResult.totalAmount.toFixed(2)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Search & Selector Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-7">
            <label htmlFor="zip-search" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter 5-Digit US ZIP Code or City
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="zip-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. 10001, 90001, Chicago, Miami..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-5">
            <label htmlFor="amount-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Test Purchase Amount ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id="amount-input"
                type="number"
                min="0"
                step="any"
                value={isNaN(amount) ? '' : amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="100.00"
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Quick Suggestions / Filter Results */}
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-2">Select a jurisdiction:</div>
          <div className="flex flex-wrap gap-2">
            {searchResults.map((item) => {
              const isSelected = selectedZip.zip === item.zip
              return (
                <button
                  key={item.zip}
                  type="button"
                  onClick={() => setSelectedZip(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 opacity-70" />
                  <span>
                    {item.zip} - {item.city}, {item.stateCode}
                  </span>
                  <span className={`ml-1 text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500 font-normal'}`}>
                    ({item.combinedRate}%)
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Results Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Selected Jurisdiction Details & Breakdown */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>
                  ZIP {selectedZip.zip} • {selectedZip.city}, {selectedZip.stateName}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedZip.combinedRate.toFixed(3).replace(/\.?0+$/, '')}% Total Sales Tax
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">{selectedZip.county}</div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified 2026</span>
              </span>
            </div>
          </div>

          {/* Tax Component Rate Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Component Tax Rate Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">State Base</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{selectedZip.stateRate}%</div>
                <div className="text-xs text-slate-400">{selectedZip.stateCode} State</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">County Tax</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{selectedZip.countyRate}%</div>
                <div className="text-xs text-slate-400">County Surcharge</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">City Tax</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{selectedZip.cityRate}%</div>
                <div className="text-xs text-slate-400">Municipal Surcharge</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium">Special District</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{selectedZip.specialDistrictRate}%</div>
                <div className="text-xs text-slate-400">Transit / SPD</div>
              </div>
            </div>

            {selectedZip.notes && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{selectedZip.notes}</span>
              </div>
            )}
          </div>

          {/* Quick link to state page */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need statewide exemptions and rules?</span>
            <Link
              href={`/${selectedZip.stateName.toLowerCase().replace(/\s+/g, '-')}-reverse-sales-tax-calculator`}
              className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <span>{selectedZip.stateName} Sales Tax Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Calculation Matrix: Forward & Reverse */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calculations for {formatCurrency(amount)}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy Results'}
              </button>
            </div>

            {/* Mode 1: Forward (Add Tax) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                1. Adding Sales Tax (Purchasing ${amount})
              </div>
              <div className="bg-slate-800/80 rounded-xl p-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Pre-Tax Subtotal:</span>
                  <span className="font-semibold text-white">{formatCurrency(forwardResult.netAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Sales Tax ({selectedZip.combinedRate}%):</span>
                  <span className="font-semibold text-emerald-400">+{formatCurrency(forwardResult.taxAmount)}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-700/80 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount at Register:</span>
                  <span className="text-blue-300">{formatCurrency(forwardResult.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Mode 2: Reverse (Extract Tax from Receipt) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                2. Reverse Tax (Receipt Total was ${amount})
              </div>
              <div className="bg-slate-800/80 rounded-xl p-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Tax-Inclusive Receipt:</span>
                  <span className="font-semibold text-white">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Original Pre-Tax Price:</span>
                  <span className="font-semibold text-white">{formatCurrency(reverseResult.netAmount)}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-700/80 flex justify-between text-sm font-bold text-white">
                  <span>Sales Tax Included in Total:</span>
                  <span className="text-amber-400">{formatCurrency(reverseResult.taxAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
