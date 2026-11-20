'use client'

import React, { useState, useMemo } from 'react'
import {
  Copy,
  Check,
  RotateCcw,
  Calculator,
  ShieldCheck,
  Percent,
  Receipt,
  HelpCircle,
  AlertCircle,
} from 'lucide-react'
import { US_TAX_RATES_ARRAY } from '@/data/us-tax-rates'

export function HeroReverseSalesTaxCalculator() {
  // Inputs
  const [amountInput, setAmountInput] = useState<string>('108.00')
  const [taxRateInput, setTaxRateInput] = useState<string>('8.00')
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  // Quick preset rates
  const presetRates = [
    { label: '6%', value: '6.00' },
    { label: '7%', value: '7.00' },
    { label: '8%', value: '8.00' },
    { label: '8.25%', value: '8.25' },
    { label: '9.5%', value: '9.50' },
  ]

  // Handle state auto-fill
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    setSelectedStateSlug(slug)
    if (!slug) return

    const stateData = US_TAX_RATES_ARRAY.find((s) => s.slug === slug)
    if (stateData) {
      setTaxRateInput(stateData.baseRate.toFixed(2))
      setErrorMessage(null)
    }
  }

  // Handle Preset Rate Click
  const handlePresetClick = (rateVal: string) => {
    setTaxRateInput(rateVal)
    setErrorMessage(null)
  }

  // Pure mathematical calculation with decimal precision
  const calculation = useMemo(() => {
    const rawAmount = parseFloat(amountInput)
    const rawRate = parseFloat(taxRateInput)

    if (isNaN(rawAmount) || rawAmount < 0) {
      return { error: 'Please enter a valid positive receipt amount.' }
    }
    if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
      return { error: 'Please enter a valid tax rate between 0% and 100%.' }
    }

    // Mathematical formulas:
    // Divisor = 1 + (Tax Rate / 100)
    // Pre-Tax Price = Total Receipt Amount / Divisor
    // Sales Tax = Total Receipt Amount - Pre-Tax Price
    const divisor = 1 + rawRate / 100
    const netCents = Math.round((rawAmount / divisor) * 100)
    const netAmount = netCents / 100
    const taxAmount = Math.round((rawAmount - netAmount) * 100) / 100

    return {
      gross: rawAmount,
      net: netAmount,
      tax: taxAmount,
      rate: rawRate,
      divisor: divisor,
      error: null,
    }
  }, [amountInput, taxRateInput])

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (calculation.error) {
      setErrorMessage(calculation.error)
    } else {
      setErrorMessage(null)
    }
  }

  const handleReset = () => {
    setAmountInput('108.00')
    setTaxRateInput('8.00')
    setSelectedStateSlug('')
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (calculation.error || !calculation.net) return
    const text = `REVERSE SALES TAX CALCULATION
----------------------------------------
Gross Receipt Total: $${calculation.gross.toFixed(2)}
Sales Tax Rate: ${calculation.rate.toFixed(2)}%
----------------------------------------
Original Pre-Tax Price: $${calculation.net.toFixed(2)}
Sales Tax Included: $${calculation.tax.toFixed(2)}
Calculation Divisor: ${calculation.divisor.toFixed(4)}
Formula: $${calculation.gross.toFixed(2)} ÷ ${calculation.divisor.toFixed(4)} = $${calculation.net.toFixed(2)}
----------------------------------------
Calculated at ReverseTaxCalculator.pro`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      id="main-calculator"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-5"
    >
      {/* Top Header & Trust Status */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Reverse Sales Tax Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Local Browser Calculation</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: Total Receipt Amount */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="receipt-amount"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. Total Receipt Amount (With Tax)
            </label>
            <span className="text-[11px] text-slate-400 font-medium">USD ($)</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              $
            </span>
            <input
              id="receipt-amount"
              type="number"
              step="any"
              min="0"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="108.00"
              className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-extrabold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: Sales Tax Rate & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="tax-rate"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              2. Sales Tax Rate (%)
            </label>
            <span className="text-[11px] text-slate-500 font-medium">Example: 8.00%</span>
          </div>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <input
              id="tax-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={taxRateInput}
              onChange={(e) => {
                setTaxRateInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="8.00"
              className="block w-full bg-transparent px-3.5 py-2.5 text-lg font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-bold text-sm">
              %
            </span>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Rates:</span>
            {presetRates.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => handlePresetClick(p.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  taxRateInput === p.value
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input 3: Optional State Selector */}
        <div>
          <label
            htmlFor="state-selector"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Optional State Benchmark
          </label>
          <div className="relative">
            <select
              id="state-selector"
              value={selectedStateSlug}
              onChange={handleStateChange}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all cursor-pointer shadow-2xs"
            >
              <option value="">Select a state for baseline rate (or enter custom above)</option>
              {US_TAX_RATES_ARRAY.map((st) => (
                <option key={st.slug} value={st.slug}>
                  {st.name} — {st.baseRate}% state base rate
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 m-0">
            Note: Selecting a state loads its baseline rate. It does not automatically calculate city or county taxes; adjust the rate manually if needed.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Reverse Sales Tax</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
            title="Reset to default values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </form>

      {/* Prominent Results Section */}
      {calculation.net !== undefined && !calculation.error && (
        <div className="mt-4 pt-5 border-t border-slate-100 space-y-4">
          {/* Main Hero Result Box (Matching Design Reference Style) */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Original Pre-Tax Price
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                title="Copy calculation results"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Results</span>
                  </>
                )}
              </button>
            </div>

            {/* Giant Hero Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              ${calculation.net.toFixed(2)}
            </div>

            <p className="text-xs text-slate-500 m-0">
              The original sticker cost before <strong>{calculation.rate.toFixed(2)}%</strong> sales tax was applied.
            </p>
          </div>

          {/* 4-Item Breakdown Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs tabular-nums">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Sales Tax Amount</div>
              <div className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                ${calculation.tax.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Gross Receipt Total</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                ${calculation.gross.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Tax Percentage</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {calculation.rate.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Applied Divisor</div>
              <div className="text-sm sm:text-base font-bold text-slate-700 mt-0.5">
                {calculation.divisor.toFixed(4)}
              </div>
            </div>
          </div>

          {/* Step-by-Step Calculation Formula Box */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-1 font-mono">
            <div className="font-sans font-bold text-[11px] text-blue-900 uppercase tracking-wide">
              Transparent Calculation Steps:
            </div>
            <div>
              1. Divisor: 1 + ({calculation.rate} ÷ 100) = {calculation.divisor.toFixed(4)}
            </div>
            <div>
              2. Pre-Tax Price: ${calculation.gross.toFixed(2)} ÷ {calculation.divisor.toFixed(4)} ={' '}
              <strong className="text-blue-900 font-bold">${calculation.net.toFixed(2)}</strong>
            </div>
            <div>
              3. Sales Tax Paid: ${calculation.gross.toFixed(2)} − ${calculation.net.toFixed(2)} ={' '}
              <strong className="text-blue-900 font-bold">${calculation.tax.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
