'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Copy,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { calculateReverseTax, calculateForwardSalesTax, formatCurrency } from '@/lib/tax-math'
import { US_TAX_RATES_ARRAY } from '@/data/us-tax-rates'

export function HeroReverseSalesTaxCalculator() {
  // Mode: 'reverse' (remove tax from total) vs 'forward' (add tax to subtotal)
  const [calcMode, setCalcMode] = useState<'reverse' | 'forward'>('reverse')

  // Inputs
  const [amountInput, setAmountInput] = useState<string>('108.00')
  const [taxRateInput, setTaxRateInput] = useState<string>('8')
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>('')
  
  // Advanced: Split State and Local tax
  const [enableSplitTax, setEnableSplitTax] = useState<boolean>(false)
  const [stateRateInput, setStateRateInput] = useState<string>('6.25')
  const [localRateInput, setLocalRateInput] = useState<string>('2.00')

  const [copied, setCopied] = useState<boolean>(false)

  // Popular quick tax rate presets
  const quickRates = [
    { label: '4% NY', rate: '4' },
    { label: '6% FL', rate: '6' },
    { label: '6.25% TX', rate: '6.25' },
    { label: '7.25% CA', rate: '7.25' },
    { label: '8.25% TX Avg', rate: '8.25' },
    { label: '8.875% NYC', rate: '8.875' },
    { label: '10%', rate: '10' },
  ]

  // Handle State selection
  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    setSelectedStateSlug(slug)

    if (!slug) return
    const found = US_TAX_RATES_ARRAY.find((s) => s.slug === slug)
    if (found) {
      if (enableSplitTax && found.hasLocalTaxes) {
        setStateRateInput(found.baseRate.toString())
        setLocalRateInput((found.avgLocalRate || 0).toString())
        setTaxRateInput((found.baseRate + (found.avgLocalRate || 0)).toFixed(3).replace(/\.?0+$/, ''))
      } else {
        setTaxRateInput(found.baseRate.toString())
      }
    }
  }

  // Active combined rate
  const activeCombinedRate = useMemo(() => {
    if (enableSplitTax) {
      const s = parseFloat(stateRateInput) || 0
      const l = parseFloat(localRateInput) || 0
      return s + l
    }
    return parseFloat(taxRateInput) || 0
  }, [enableSplitTax, stateRateInput, localRateInput, taxRateInput])

  // Calculation computation
  const calculation = useMemo(() => {
    const amt = parseFloat(amountInput)
    if (isNaN(amt) || amt < 0 || isNaN(activeCombinedRate) || activeCombinedRate < 0 || activeCombinedRate > 100) {
      return null
    }

    if (calcMode === 'reverse') {
      const res = calculateReverseTax(amt, activeCombinedRate)
      const divisor = 1 + activeCombinedRate / 100
      const taxSharePercent = amt > 0 ? (res.taxAmount / amt) * 100 : 0

      let stateTaxAmount = 0
      let localTaxAmount = 0
      if (enableSplitTax && activeCombinedRate > 0) {
        const sRate = parseFloat(stateRateInput) || 0
        stateTaxAmount = Math.round(res.netAmount * (sRate / 100) * 100) / 100
        localTaxAmount = Math.round((res.taxAmount - stateTaxAmount) * 100) / 100
      }

      return {
        gross: amt,
        net: res.netAmount,
        tax: res.taxAmount,
        rate: activeCombinedRate,
        divisor,
        taxSharePercent,
        stateTaxAmount,
        localTaxAmount,
      }
    } else {
      const res = calculateForwardSalesTax(amt, activeCombinedRate)
      const taxSharePercent = res.totalAmount > 0 ? (res.taxAmount / res.totalAmount) * 100 : 0

      let stateTaxAmount = 0
      let localTaxAmount = 0
      if (enableSplitTax && activeCombinedRate > 0) {
        const sRate = parseFloat(stateRateInput) || 0
        stateTaxAmount = Math.round(amt * (sRate / 100) * 100) / 100
        localTaxAmount = Math.round((res.taxAmount - stateTaxAmount) * 100) / 100
      }

      return {
        gross: res.totalAmount,
        net: amt,
        tax: res.taxAmount,
        rate: activeCombinedRate,
        divisor: 1 + activeCombinedRate / 100,
        taxSharePercent,
        stateTaxAmount,
        localTaxAmount,
      }
    }
  }, [calcMode, amountInput, activeCombinedRate, enableSplitTax, stateRateInput, localRateInput])

  const handleReset = () => {
    setAmountInput(calcMode === 'reverse' ? '108.00' : '100.00')
    setTaxRateInput('8')
    setStateRateInput('6.25')
    setLocalRateInput('2.00')
    setSelectedStateSlug('')
  }

  const handleCopy = () => {
    if (!calculation) return
    const text =
      calcMode === 'reverse'
        ? `REVERSE SALES TAX BREAKDOWN\nTotal Amount (With Tax): ${formatCurrency(calculation.gross)}\nSales Tax Rate: ${calculation.rate}%\n----------------------------\nOriginal Pre-Tax Price: ${formatCurrency(calculation.net)}\nSales Tax Extracted: ${formatCurrency(calculation.tax)}\nEffective Tax Share: ${calculation.taxSharePercent.toFixed(2)}% of total\nFormula: ${formatCurrency(calculation.gross)} ÷ ${calculation.divisor.toFixed(4)} = ${formatCurrency(calculation.net)}`
        : `SALES TAX CALCULATION\nPre-Tax Subtotal: ${formatCurrency(calculation.net)}\nSales Tax Rate: ${calculation.rate}%\n----------------------------\nSales Tax Added: ${formatCurrency(calculation.tax)}\nTotal Checkout Amount: ${formatCurrency(calculation.gross)}\nFormula: ${formatCurrency(calculation.net)} × (1 + ${calculation.rate / 100}) = ${formatCurrency(calculation.gross)}`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedStateData = US_TAX_RATES_ARRAY.find((s) => s.slug === selectedStateSlug)

  return (
    <div
      id="calculator"
      className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 text-slate-900 space-y-5"
    >
      {/* Top Segmented Control (Mode Toggle) */}
      <div className="flex items-center justify-between gap-3">
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1 text-xs font-semibold w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setCalcMode('reverse')
              if (amountInput === '100.00') setAmountInput('108.00')
            }}
            className={`py-2 px-4 rounded-lg transition-all text-center cursor-pointer ${
              calcMode === 'reverse'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Remove Tax (Reverse)
          </button>
          <button
            type="button"
            onClick={() => {
              setCalcMode('forward')
              if (amountInput === '108.00') setAmountInput('100.00')
            }}
            className={`py-2 px-4 rounded-lg transition-all text-center cursor-pointer ${
              calcMode === 'forward'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Add Tax (Forward)
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Reset values"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Input Form */}
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label
            htmlFor="hero-amount-input"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            {calcMode === 'reverse' ? 'Total Receipt Amount (Tax Included)' : 'Pre-Tax Subtotal (Net Price)'}
          </label>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-base sm:text-lg">
              $
            </span>
            <input
              id="hero-amount-input"
              type="number"
              step="any"
              min="0"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder={calcMode === 'reverse' ? '108.00' : '100.00'}
              className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* State Selection Dropdown */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="hero-state-select"
              className="block text-xs font-semibold text-slate-700"
            >
              US State (Optional Auto-Fill)
            </label>
            {selectedStateData && (
              <Link
                href={`/${selectedStateData.slug}-reverse-sales-tax-calculator`}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-0.5"
              >
                <span>{selectedStateData.name} Tax Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <div className="relative">
            <select
              id="hero-state-select"
              value={selectedStateSlug}
              onChange={handleStateSelect}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all cursor-pointer"
            >
              <option value="">Select a state or enter rate below</option>
              {US_TAX_RATES_ARRAY.map((st) => (
                <option key={st.slug} value={st.slug}>
                  {st.name} — {st.baseRate}% base {st.maxCombinedRate ? `(up to ${st.maxCombinedRate}% combined)` : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tax Rate Input & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="hero-tax-rate"
              className="block text-xs font-semibold text-slate-700"
            >
              Sales Tax Rate (%)
            </label>
            <button
              type="button"
              onClick={() => setEnableSplitTax(!enableSplitTax)}
              className="text-[11px] font-medium text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>{enableSplitTax ? 'Simple Rate Mode' : 'Split State & Local Rates'}</span>
            </button>
          </div>

          {!enableSplitTax ? (
            <div className="space-y-2">
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <input
                  id="hero-tax-rate"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={taxRateInput}
                  onChange={(e) => {
                    setTaxRateInput(e.target.value)
                    setSelectedStateSlug('')
                  }}
                  placeholder="8.00"
                  className="block w-full bg-transparent pl-4 pr-8 py-2.5 text-xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-semibold text-base">
                  %
                </span>
              </div>

              {/* Quick Rate Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                {quickRates.map((preset) => (
                  <button
                    key={preset.rate}
                    type="button"
                    onClick={() => {
                      setTaxRateInput(preset.rate)
                      setSelectedStateSlug('')
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium tabular-nums transition-colors cursor-pointer ${
                      taxRateInput === preset.rate && !enableSplitTax
                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="state-rate" className="block text-[11px] font-semibold text-slate-600 mb-1">
                    State Base Rate (%)
                  </label>
                  <div className="relative rounded-lg border border-slate-200 bg-white">
                    <input
                      id="state-rate"
                      type="number"
                      step="any"
                      min="0"
                      value={stateRateInput}
                      onChange={(e) => setStateRateInput(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm font-semibold tabular-nums outline-none rounded-lg"
                    />
                    <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">%</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="local-rate" className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Local / City Rate (%)
                  </label>
                  <div className="relative rounded-lg border border-slate-200 bg-white">
                    <input
                      id="local-rate"
                      type="number"
                      step="any"
                      min="0"
                      value={localRateInput}
                      onChange={(e) => setLocalRateInput(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm font-semibold tabular-nums outline-none rounded-lg"
                    />
                    <span className="absolute right-2.5 top-1.5 text-xs text-slate-400">%</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-600 flex justify-between items-center pt-1 border-t border-slate-200/60">
                <span>Combined Tax Rate:</span>
                <span className="font-bold text-slate-900 tabular-nums">{activeCombinedRate}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Itemized Calculation Summary */}
      {calculation && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {calcMode === 'reverse' ? 'Original Pre-Tax Price (Net Subtotal)' : 'Final Checkout Total (With Tax)'}
              </div>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 tabular-nums mt-0.5">
                {formatCurrency(calcMode === 'reverse' ? calculation.net : calculation.gross)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {calcMode === 'reverse'
                  ? `Subtotal before ${calculation.rate}% sales tax was applied.`
                  : `Total amount due at checkout with ${calculation.rate}% sales tax.`}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Line Item Breakdown */}
          <div className="pt-3 border-t border-slate-200/70 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span>Sales Tax {calcMode === 'reverse' ? 'Removed' : 'Added'} ({calculation.rate}%)</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {calcMode === 'reverse' ? '+' : ''}{formatCurrency(calculation.tax)}
                <span className="text-slate-400 text-[11px] font-normal ml-1.5">
                  ({calculation.taxSharePercent.toFixed(1)}% of total)
                </span>
              </span>
            </div>

            {enableSplitTax && (
              <>
                <div className="flex items-center justify-between text-slate-500 pl-3">
                  <span>↳ State Tax Portion ({stateRateInput}%)</span>
                  <span className="font-medium text-slate-700 tabular-nums">{formatCurrency(calculation.stateTaxAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 pl-3">
                  <span>↳ Local Tax Portion ({localRateInput}%)</span>
                  <span className="font-medium text-slate-700 tabular-nums">{formatCurrency(calculation.localTaxAmount)}</span>
                </div>
              </>
            )}

            <div className="flex items-center justify-between text-slate-700">
              <span>Receipt Gross Total</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {formatCurrency(calcMode === 'reverse' ? calculation.gross : calculation.gross)}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200/50 text-[11px]">
              <span>Divisor Applied</span>
              <span className="tabular-nums font-medium text-slate-600">÷ {calculation.divisor.toFixed(4)}</span>
            </div>
          </div>

          {/* Subtle Formula Line */}
          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-1">
            <span>
              {calcMode === 'reverse' ? (
                <>Formula: ${calculation.gross.toFixed(2)} ÷ {calculation.divisor.toFixed(4)} = <strong>${calculation.net.toFixed(2)}</strong></>
              ) : (
                <>Formula: ${calculation.net.toFixed(2)} × (1 + {calculation.rate / 100}) = <strong>${calculation.gross.toFixed(2)}</strong></>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Footer Trust Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>2026 US Statutory Rates</span>
        </span>
        <span className="text-[11px]">GAAP 2-Decimal Precision</span>
      </div>
    </div>
  )
}
