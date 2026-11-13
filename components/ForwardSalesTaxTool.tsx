'use client'

import React, { useState, useMemo } from 'react'
import { calculateForwardSalesTax, formatCurrency } from '@/lib/tax-math'
import { US_TAX_RATES_ARRAY } from '@/data/us-tax-rates'
import { Copy, Check, RotateCcw, ArrowRight, Percent, DollarSign, Calculator } from 'lucide-react'

interface Props {
  initialAmount?: number
  initialRate?: number
}

export function ForwardSalesTaxTool({ initialAmount = 100, initialRate = 8.25 }: Props) {
  const [subtotal, setSubtotal] = useState<number>(initialAmount)
  const [taxRate, setTaxRate] = useState<number>(initialRate)
  const [selectedState, setSelectedState] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    setSelectedState(slug)
    if (!slug) return
    const found = US_TAX_RATES_ARRAY.find((s) => s.slug === slug)
    if (found) {
      setTaxRate(found.baseRate)
    }
  }

  const result = useMemo(() => {
    return calculateForwardSalesTax(subtotal, taxRate)
  }, [subtotal, taxRate])

  const handleCopy = () => {
    const text = `Pre-Tax Subtotal: ${formatCurrency(result.netAmount)}\nSales Tax (${result.taxRatePercentage}%): ${formatCurrency(result.taxAmount)}\nTotal with Tax: ${formatCurrency(result.totalAmount)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setSubtotal(100)
    setTaxRate(8.25)
    setSelectedState('')
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <label htmlFor="forward-subtotal" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Original Price Before Tax (Subtotal)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id="forward-subtotal"
                type="number"
                min="0"
                step="any"
                value={isNaN(subtotal) ? '' : subtotal}
                onChange={(e) => setSubtotal(parseFloat(e.target.value) || 0)}
                placeholder="100.00"
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="forward-rate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Sales Tax Percentage (%)
            </label>
            <div className="relative">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              <input
                id="forward-rate"
                type="number"
                min="0"
                max="100"
                step="any"
                value={isNaN(taxRate) ? '' : taxRate}
                onChange={(e) => {
                  setTaxRate(parseFloat(e.target.value) || 0)
                  setSelectedState('')
                }}
                placeholder="8.25"
                className="w-full pl-4 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="forward-state-preset" className="block text-xs font-medium text-slate-500 mb-1.5">
              Or pick a US State to load base rate:
            </label>
            <select
              id="forward-state-preset"
              value={selectedState}
              onChange={handleStateSelect}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="">-- Custom Rate / Select State --</option>
              {US_TAX_RATES_ARRAY.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} ({s.baseRate}%)
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right: Output Card */}
        <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Calculation Breakdown
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Original Pre-Tax Subtotal:</span>
              <span className="font-semibold text-white">{formatCurrency(result.netAmount)}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Sales Tax Added ({result.taxRatePercentage}%):</span>
              <span className="font-bold text-emerald-400">+{formatCurrency(result.taxAmount)}</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block">Total Due at Checkout</span>
                <span className="text-2xl sm:text-3xl font-black text-white">{formatCurrency(result.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-slate-300 font-mono space-y-1">
            <div className="text-[11px] text-slate-400 font-sans uppercase font-bold">Standard Forward Formula:</div>
            <div>Tax = ${result.netAmount.toFixed(2)} × ({result.taxRatePercentage} / 100) = ${result.taxAmount.toFixed(2)}</div>
            <div>Total = ${result.netAmount.toFixed(2)} + ${result.taxAmount.toFixed(2)} = ${result.totalAmount.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
