'use client'

import React, { useState, useMemo } from 'react'
import { calculateDiscountAndTax, formatCurrency } from '@/lib/tax-math'
import { US_TAX_RATES } from '@/data/us-tax-rates'
import { Copy, Check, RotateCcw, Tag, Percent, DollarSign } from 'lucide-react'

export function DiscountTaxTool() {
  const [originalPrice, setOriginalPrice] = useState<number>(100)
  const [discountPercent, setDiscountPercent] = useState<number>(20)
  const [taxRate, setTaxRate] = useState<number>(8.25)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    return calculateDiscountAndTax(originalPrice, discountPercent, taxRate)
  }, [originalPrice, discountPercent, taxRate])

  const handleCopy = () => {
    const text = `Original Price: ${formatCurrency(result.originalPrice)}\nDiscount (${discountPercent}%): -${formatCurrency(result.discountAmount)}\nDiscounted Subtotal: ${formatCurrency(result.discountedPrice)}\nSales Tax (${taxRate}%): +${formatCurrency(result.taxAmount)}\nFinal Price: ${formatCurrency(result.finalTotal)}\nYou Saved: ${formatCurrency(result.totalSavings)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setOriginalPrice(100)
    setDiscountPercent(20)
    setTaxRate(8.25)
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <label htmlFor="discount-original-price" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Original Item Sticker Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id="discount-original-price"
                type="number"
                min="0"
                step="any"
                value={isNaN(originalPrice) ? '' : originalPrice}
                onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                placeholder="100.00"
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="discount-percent-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Discount (%)
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                <input
                  id="discount-percent-input"
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={isNaN(discountPercent) ? '' : discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  placeholder="20"
                  className="w-full pl-4 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="discount-tax-rate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Sales Tax (%)
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                <input
                  id="discount-tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={isNaN(taxRate) ? '' : taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  placeholder="8.25"
                  className="w-full pl-4 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Quick Preset Discount Buttons */}
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1.5">Quick Discount Presets:</div>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 20, 25, 30, 40, 50, 70].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPercent(pct)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    discountPercent === pct
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct}% OFF
                </button>
              ))}
            </div>
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

        {/* Right: Output Breakdown */}
        <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Savings & Final Receipt
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
              <span>Original Sticker Price:</span>
              <span className="font-semibold text-white">{formatCurrency(result.originalPrice)}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-emerald-400 font-semibold">
              <span>Discount ({discountPercent}% OFF):</span>
              <span>-{formatCurrency(result.discountAmount)}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Sale Subtotal:</span>
              <span className="font-semibold text-white">{formatCurrency(result.discountedPrice)}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Sales Tax ({taxRate}%):</span>
              <span className="font-semibold text-white">+{formatCurrency(result.taxAmount)}</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block">Final Out-of-Pocket</span>
                <span className="text-2xl sm:text-3xl font-black text-white">{formatCurrency(result.finalTotal)}</span>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-emerald-400 block font-bold">Total Savings</span>
                <span className="text-lg font-black text-emerald-400">{formatCurrency(result.totalSavings)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-slate-300 font-mono space-y-1">
            <div className="text-[11px] text-slate-400 font-sans uppercase font-bold">Calculation Logic:</div>
            <div>Discounted Subtotal = ${result.originalPrice.toFixed(2)} - ${result.discountAmount.toFixed(2)} = ${result.discountedPrice.toFixed(2)}</div>
            <div>Sales Tax = ${result.discountedPrice.toFixed(2)} × {taxRate}% = ${result.taxAmount.toFixed(2)}</div>
            <div>Total = ${result.discountedPrice.toFixed(2)} + ${result.taxAmount.toFixed(2)} = ${result.finalTotal.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
