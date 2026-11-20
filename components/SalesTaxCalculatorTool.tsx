'use client'

import React, { useState, useMemo } from 'react'
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Percent,
  DollarSign,
  AlertCircle,
} from 'lucide-react'

interface CurrencyOption {
  code: string
  symbol: string
  label: string
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
]

export function SalesTaxCalculatorTool() {
  const [priceInput, setPriceInput] = useState<string>('100.00')
  const [taxRateInput, setTaxRateInput] = useState<string>('8.25')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const presetRates = [
    { label: '0%', value: '0.00' },
    { label: '5%', value: '5.00' },
    { label: '5.5%', value: '5.50' },
    { label: '6%', value: '6.00' },
    { label: '7%', value: '7.00' },
    { label: '7.25%', value: '7.25' },
    { label: '7.5%', value: '7.50' },
    { label: '8%', value: '8.00' },
    { label: '8.25%', value: '8.25' },
    { label: '9.5%', value: '9.50' },
    { label: '10%', value: '10.00' },
  ]

  const activeCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  }, [selectedCurrency])

  const calculation = useMemo(() => {
    const rawPrice = parseFloat(priceInput)
    const rawRate = parseFloat(taxRateInput)

    if (isNaN(rawPrice) || rawPrice < 0) {
      return { error: 'Please enter a valid positive purchase price.' }
    }
    if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
      return { error: 'Please enter a valid tax rate between 0% and 100%.' }
    }

    // Formulas:
    // Sales Tax = Purchase Price * (Tax Rate / 100)
    // Final Price = Purchase Price + Sales Tax
    const taxCents = Math.round(rawPrice * (rawRate / 100) * 100)
    const taxAmount = taxCents / 100
    const finalAmount = Math.round((rawPrice + taxAmount) * 100) / 100

    return {
      price: rawPrice,
      rate: rawRate,
      tax: taxAmount,
      final: finalAmount,
      error: null,
    }
  }, [priceInput, taxRateInput])

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (calculation.error) {
      setErrorMessage(calculation.error)
    } else {
      setErrorMessage(null)
    }
  }

  const handleReset = () => {
    setPriceInput('100.00')
    setTaxRateInput('8.25')
    setSelectedCurrency('USD')
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (calculation.error || calculation.final === undefined) return
    const sym = activeCurrency.symbol
    const text = `SALES TAX CALCULATION
----------------------------------------
Original Purchase Price: ${sym}${calculation.price.toFixed(2)}
Sales Tax Rate: ${calculation.rate.toFixed(2)}%
----------------------------------------
Sales Tax Amount: ${sym}${calculation.tax.toFixed(2)}
Final Price (Including Tax): ${sym}${calculation.final.toFixed(2)}
Formula: ${sym}${calculation.price.toFixed(2)} + ${sym}${calculation.tax.toFixed(2)} = ${sym}${calculation.final.toFixed(2)}
----------------------------------------
Calculated at ReverseTaxCalculator.pro/tools/sales-tax-calculator/`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sym = activeCurrency.symbol

  return (
    <div
      id="sales-tax-tool"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-6"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Standard Sales Tax Calculator
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instant Browser Calculation</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: Original Purchase Price */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="original-price"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. Original Purchase Price (Pre-Tax)
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{activeCurrency.code}</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              {sym}
            </span>
            <input
              id="original-price"
              type="number"
              step="any"
              min="0"
              value={priceInput}
              onChange={(e) => {
                setPriceInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="100.00"
              className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-extrabold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: Sales Tax Rate & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="sales-tax-rate"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              2. Sales Tax Rate (%)
            </label>
            <span className="text-[11px] text-slate-500 font-medium">Example: 8.25%</span>
          </div>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <input
              id="sales-tax-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={taxRateInput}
              onChange={(e) => {
                setTaxRateInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="8.25"
              className="block w-full bg-transparent px-3.5 py-2.5 text-lg font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-bold text-sm">
              %
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Presets:</span>
            {presetRates.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => {
                  setTaxRateInput(p.value)
                  setErrorMessage(null)
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  parseFloat(taxRateInput) === parseFloat(p.value)
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 m-0 leading-normal">
            Example rates shown for convenience only. Applicable rates depend on your local taxing jurisdiction.
          </p>
        </div>

        {/* Optional Input 3: Currency */}
        <div>
          <label
            htmlFor="currency-selector"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Currency (Display Formatting)
          </label>
          <div className="relative">
            <select
              id="currency-selector"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all cursor-pointer shadow-2xs"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
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
            Note: Changing currency updates symbol formatting only; applicable tax rules depend on your local taxing jurisdiction.
          </p>
        </div>

        {/* Error message */}
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
            <span>Calculate Sales Tax</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
            title="Reset calculator values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </form>

      {/* Prominent Results Section */}
      {calculation.final !== undefined && !calculation.error && (
        <div className="mt-4 pt-5 border-t border-slate-100 space-y-4">
          {/* Main Hero Result Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Final Price (Including Sales Tax)
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
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Results</span>
                  </>
                )}
              </button>
            </div>

            {/* Giant Hero Final Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              {sym}{calculation.final.toFixed(2)}
            </div>

            <p className="text-xs text-slate-500 m-0">
              Total checkout cost with <strong>{calculation.rate.toFixed(2)}%</strong> sales tax added to the original purchase price.
            </p>
          </div>

          {/* Breakdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs tabular-nums">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Original Purchase Price</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {sym}{calculation.price.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Applied Sales Tax Rate</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {calculation.rate.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Sales Tax Amount Added</div>
              <div className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                +{sym}{calculation.tax.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Step-by-Step Mathematical Calculation Steps */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-1 font-mono">
            <div className="font-sans font-bold text-[11px] text-blue-900 uppercase tracking-wide">
              Step-by-Step Calculation:
            </div>
            <div>
              1. Sales Tax Due: {sym}{calculation.price.toFixed(2)} × ({calculation.rate} ÷ 100) ={' '}
              <strong className="text-blue-900 font-bold">{sym}{calculation.tax.toFixed(2)}</strong>
            </div>
            <div>
              2. Final Checkout Total: {sym}{calculation.price.toFixed(2)} + {sym}{calculation.tax.toFixed(2)} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{calculation.final.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
