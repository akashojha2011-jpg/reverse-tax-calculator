'use client'

import React, { useState, useMemo } from 'react'
import { calculateTipAndTaxDetailed, formatCurrency } from '@/lib/tax-math'
import { Copy, Check, RotateCcw, Users, Info } from 'lucide-react'

export function TipAndTaxTool() {
  const [billAmount, setBillAmount] = useState<number>(85)
  const [taxRate, setTaxRate] = useState<number>(8.875)
  const [tipPercent, setTipPercent] = useState<number>(20)
  const [tipOnPreTax, setTipOnPreTax] = useState<boolean>(true)
  const [partySize, setPartySize] = useState<number>(2)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    return calculateTipAndTaxDetailed(billAmount, taxRate, tipPercent, false, tipOnPreTax)
  }, [billAmount, taxRate, tipPercent, tipOnPreTax])

  const perPersonTotal = useMemo(() => {
    return partySize > 0 ? result.finalTotal / partySize : result.finalTotal
  }, [result.finalTotal, partySize])

  const handleCopy = () => {
    const text = `Bill Subtotal: ${formatCurrency(result.foodSubtotal)}\nSales Tax (${taxRate}%): ${formatCurrency(result.taxAmount)}\nTip (${tipPercent}% on ${tipOnPreTax ? 'Pre-Tax' : 'Total'}): ${formatCurrency(result.tipAmount)}\nGrand Total: ${formatCurrency(result.finalTotal)}\nPer Person (${partySize} guests): ${formatCurrency(perPersonTotal)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setBillAmount(85)
    setTaxRate(8.875)
    setTipPercent(20)
    setTipOnPreTax(true)
    setPartySize(2)
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <label htmlFor="tip-subtotal" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Food & Beverage Subtotal ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id="tip-subtotal"
                type="number"
                min="0"
                step="any"
                value={isNaN(billAmount) ? '' : billAmount}
                onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
                placeholder="85.00"
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tip-tax-rate" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Sales Tax (%)
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                <input
                  id="tip-tax-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={isNaN(taxRate) ? '' : taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  placeholder="8.875"
                  className="w-full pl-4 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tip-party-size" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Split Bill (# Guests)
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="tip-party-size"
                  type="number"
                  min="1"
                  max="50"
                  value={partySize}
                  onChange={(e) => setPartySize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Tip Presets */}
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1.5">Select Tip Percentage:</div>
            <div className="flex flex-wrap gap-2">
              {[15, 18, 20, 22, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercent(pct)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    tipPercent === pct
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct}%
                </button>
              ))}
              <div className="relative inline-flex items-center">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                  placeholder="Custom"
                />
                <span className="text-[11px] text-slate-400 ml-1 font-bold">%</span>
              </div>
            </div>
          </div>

          {/* Etiquette Toggle */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-700">Calculate tip on pre-tax subtotal:</span>
            <button
              type="button"
              onClick={() => setTipOnPreTax(!tipOnPreTax)}
              className={`px-3 py-1 rounded-md font-bold transition-colors ${
                tipOnPreTax
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {tipOnPreTax ? 'Yes (Standard Etiquette)' : 'No (Post-Tax)'}
            </button>
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

        {/* Right: Output Receipt */}
        <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Receipt & Tip Breakdown
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

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-300">
              <span>Food & Drink Subtotal:</span>
              <span className="font-semibold text-white">{formatCurrency(result.foodSubtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span>Sales Tax ({taxRate}%):</span>
              <span className="font-semibold text-white">+{formatCurrency(result.taxAmount)}</span>
            </div>

            <div className="flex items-center justify-between text-emerald-400 font-semibold">
              <span>Tip ({tipPercent}% on {tipOnPreTax ? 'subtotal' : 'total'}):</span>
              <span>+{formatCurrency(result.tipAmount)}</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 block">Grand Total</span>
                <span className="text-2xl sm:text-3xl font-black text-white">{formatCurrency(result.finalTotal)}</span>
              </div>

              {partySize > 1 && (
                <div className="text-right bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <span className="text-[11px] uppercase tracking-wider text-blue-300 block font-bold">
                    Each ({partySize} people)
                  </span>
                  <span className="text-xl font-black text-white">{formatCurrency(perPersonTotal)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-slate-300 font-mono space-y-1">
            <div className="text-[11px] text-slate-400 font-sans uppercase font-bold">Etiquette Note:</div>
            <div className="font-sans leading-relaxed text-slate-300">
              {tipOnPreTax
                ? 'Standard etiquette recommends tipping on the food and beverage subtotal before tax, so you avoid paying a tip on government taxes.'
                : 'Tipping on the post-tax bill is common when credit card terminals calculate suggested tips automatically.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
