'use client'

import React, { useState } from 'react'
import { Copy, Check, RotateCcw, Calculator, Info, ShieldCheck } from 'lucide-react'
import { calculateReverseTax, formatCurrency } from '@/lib/tax-math'

export function HeroReverseSalesTaxCalculator() {
  const [totalPriceInput, setTotalPriceInput] = useState<string>('108.00')
  const [taxRateInput, setTaxRateInput] = useState<string>('8')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  // Quick preset pills for tactile speed
  const popularPresets = [
    { label: '$105 @ 5%', price: '105.00', rate: '5' },
    { label: '$108 @ 8%', price: '108.00', rate: '8' },
    { label: '$110 @ 10%', price: '110.00', rate: '10' },
    { label: '$250 @ 7%', price: '250.00', rate: '7' },
  ]

  // Parsing & Calculation Logic
  const parsedPrice = parseFloat(totalPriceInput)
  const parsedRate = parseFloat(taxRateInput)

  let originalPrice = 0
  let taxPaid = 0
  let validCalculation = false

  if (!isNaN(parsedPrice) && !isNaN(parsedRate)) {
    if (parsedPrice < 0) {
      // Invalid negative
    } else if (parsedRate < 0 || parsedRate > 100) {
      // Invalid rate
    } else {
      try {
        const res = calculateReverseTax(parsedPrice, parsedRate)
        originalPrice = res.netAmount
        taxPaid = res.taxAmount
        validCalculation = true
      } catch (err) {
        validCalculation = false
      }
    }
  }

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setErrorMsg(null)

    if (totalPriceInput.trim() === '') {
      setErrorMsg('Please enter a total price.')
      return
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMsg('Please enter a valid, non-negative total price.')
      return
    }
    if (taxRateInput.trim() === '') {
      setErrorMsg('Please enter a sales tax rate.')
      return
    }
    if (isNaN(parsedRate) || parsedRate < 0 || parsedRate > 100) {
      setErrorMsg('Tax rate must be between 0% and 100%.')
      return
    }
  }

  const handleReset = () => {
    setTotalPriceInput('108.00')
    setTaxRateInput('8')
    setErrorMsg(null)
  }

  const handleCopy = () => {
    if (!validCalculation) return
    const text = `Total Price Including Tax: $${parsedPrice.toFixed(2)}\nSales Tax Rate: ${parsedRate}%\nOriginal Price Before Tax: $${originalPrice.toFixed(2)}\nSales Tax Amount: $${taxPaid.toFixed(2)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      id="calculator"
      className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 md:p-7 transition-all text-slate-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight m-0">
            Reverse Sales Tax Calculator
          </h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          title="Reset inputs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: Total Price Including Tax */}
        <div>
          <label
            htmlFor="hero-total-price"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Total Price Including Tax ($)
          </label>
          <div className="relative rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-500/10 transition-all bg-white">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-mono font-bold text-lg">
              $
            </span>
            <input
              id="hero-total-price"
              type="number"
              step="any"
              min="0"
              value={totalPriceInput}
              onChange={(e) => {
                setTotalPriceInput(e.target.value)
                setErrorMsg(null)
              }}
              placeholder="108.00"
              className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl font-bold font-mono text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: Sales Tax Rate (%) */}
        <div>
          <label
            htmlFor="hero-tax-rate"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            Sales Tax Rate (%)
          </label>
          <div className="relative rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-500/10 transition-all bg-white">
            <input
              id="hero-tax-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={taxRateInput}
              onChange={(e) => {
                setTaxRateInput(e.target.value)
                setErrorMsg(null)
              }}
              placeholder="8"
              className="block w-full bg-transparent pl-4 pr-8 py-2.5 text-xl font-bold font-mono text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-mono font-bold text-lg">
              %
            </span>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-0.5">Quick:</span>
            {popularPresets.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setTotalPriceInput(item.price)
                  setTaxRateInput(item.rate)
                  setErrorMsg(null)
                }}
                className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-600 text-xs font-mono transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Reverse Sales Tax</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Validation Error Message */}
      {errorMsg && (
        <div className="mt-3.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Results Display */}
      {validCalculation && !errorMsg && (
        <div className="mt-5 rounded-xl bg-slate-900 text-white p-4 sm:p-5 space-y-4 shadow-sm border border-slate-800">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Calculation Results
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Hero Result: Original Price Before Tax */}
          <div className="bg-slate-800/70 rounded-xl p-3.5 border border-slate-700/60">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Original Price Before Tax
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white mt-0.5">
              ${originalPrice.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Pre-tax subtotal before {parsedRate}% sales tax was added.
            </div>
          </div>

          {/* Secondary Details: 3 metrics */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Sales Tax Amount</div>
              <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5">
                ${taxPaid.toFixed(2)}
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Total Price (Gross)</div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-200 mt-0.5">
                ${parsedPrice.toFixed(2)}
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400">Applied Tax Rate</div>
              <div className="text-base sm:text-lg font-bold font-mono text-blue-300 mt-0.5">
                {parsedRate}%
              </div>
            </div>
          </div>

          {/* Transparent Formula Note */}
          <div className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/80">
            Formula: ${parsedPrice.toFixed(2)} ÷ (1 + {parsedRate / 100}) = ${originalPrice.toFixed(2)}
          </div>
        </div>
      )}

      {/* Educational & Disclaimer Notice */}
      <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p className="m-0 text-[11px]">
          Assumes a single tax rate applied to the taxable base. For estimation and bookkeeping purposes only; not an official tax determination.
        </p>
      </div>
    </div>
  )
}
