'use client'

import React, { useState, useMemo } from 'react'
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Percent,
  AlertCircle,
} from 'lucide-react'

interface CurrencyOption {
  code: string
  symbol: string
  label: string
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'EUR', symbol: '€', label: 'EUR (€) — Euro' },
  { code: 'GBP', symbol: '£', label: 'GBP (£) — British Pound' },
  { code: 'USD', symbol: '$', label: 'USD ($) — US Dollar' },
  { code: 'CHF', symbol: 'CHF ', label: 'CHF (CHF) — Swiss Franc' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$) — Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$) — Australian Dollar' },
  { code: 'SEK', symbol: 'kr ', label: 'SEK (kr) — Swedish Krona' },
  { code: 'NOK', symbol: 'kr ', label: 'NOK (kr) — Norwegian Krone' },
  { code: 'DKK', symbol: 'kr. ', label: 'DKK (kr.) — Danish Krone' },
  { code: 'PLN', symbol: 'zł ', label: 'PLN (zł) — Polish Złoty' },
  { code: 'CZK', symbol: 'Kč ', label: 'CZK (Kč) — Czech Koruna' },
  { code: 'INR', symbol: '₹', label: 'INR (₹) — Indian Rupee' },
]

function formatCurrencyNumber(val: number): string {
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function ReverseVatCalculatorTool() {
  const [grossInput, setGrossInput] = useState<string>('120.00')
  const [vatRateInput, setVatRateInput] = useState<string>('20')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const presetRates = [
    { label: '0%', value: '0' },
    { label: '5%', value: '5' },
    { label: '7%', value: '7' },
    { label: '10%', value: '10' },
    { label: '12%', value: '12' },
    { label: '15%', value: '15' },
    { label: '17%', value: '17' },
    { label: '19%', value: '19' },
    { label: '20%', value: '20' },
    { label: '21%', value: '21' },
    { label: '22%', value: '22' },
    { label: '23%', value: '23' },
    { label: '25%', value: '25' },
  ]

  const activeCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  }, [selectedCurrency])

  const calculation = useMemo(() => {
    const rawGross = parseFloat(grossInput)
    const rawRate = parseFloat(vatRateInput)

    if (isNaN(rawGross) || rawGross < 0) {
      return { error: 'Please enter a valid non-negative VAT-inclusive gross amount.' }
    }
    if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
      return { error: 'Please enter a valid VAT rate between 0% and 100%.' }
    }

    // Formulas:
    // Net Price = Gross Amount / (1 + VAT Rate / 100)
    // VAT Amount = Gross Amount - Net Price
    if (rawRate === 0) {
      return {
        gross: rawGross,
        rate: 0,
        net: rawGross,
        vat: 0,
        error: null,
      }
    }

    const divisor = 1 + rawRate / 100
    const netCents = Math.round((rawGross / divisor) * 100)
    const netAmount = netCents / 100
    const vatAmount = Math.round((rawGross - netAmount) * 100) / 100

    return {
      gross: rawGross,
      rate: rawRate,
      net: netAmount,
      vat: vatAmount,
      error: null,
    }
  }, [grossInput, vatRateInput])

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (calculation.error) {
      setErrorMessage(calculation.error)
    } else {
      setErrorMessage(null)
    }
  }

  const handleReset = () => {
    setGrossInput('120.00')
    setVatRateInput('20')
    setSelectedCurrency('EUR')
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (calculation.error || calculation.net === undefined || calculation.gross === undefined || calculation.vat === undefined || calculation.rate === undefined) return
    const sym = activeCurrency.symbol
    const text = `REVERSE VAT CALCULATION
----------------------------------------
VAT-Inclusive Gross Total: ${sym}${formatCurrencyNumber(calculation.gross)}
VAT Rate Applied:          ${calculation.rate.toFixed(2)}%
----------------------------------------
Net Price Before VAT:      ${sym}${formatCurrencyNumber(calculation.net)}
VAT Amount Extracted:      ${sym}${formatCurrencyNumber(calculation.vat)}
----------------------------------------
Formula: ${sym}${formatCurrencyNumber(calculation.gross)} ÷ (1 + ${calculation.rate} / 100) = ${sym}${formatCurrencyNumber(calculation.net)}
Calculated at ReverseTaxCalculator.pro/tools/reverse-vat-calculator/`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sym = activeCurrency.symbol

  return (
    <div
      id="reverse-vat-tool"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-6"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Reverse VAT Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instant Net Extraction</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: VAT-Inclusive Price */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="vat-gross-price"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. VAT-Inclusive Amount (Gross Total)
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{activeCurrency.code}</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              {sym}
            </span>
            <input
              id="vat-gross-price"
              type="number"
              step="any"
              min="0"
              value={grossInput}
              onChange={(e) => {
                setGrossInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="120.00"
              className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-extrabold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: VAT Rate & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="vat-rate"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              2. VAT Rate (%)
            </label>
            <span className="text-[11px] text-slate-500 font-medium">Example: 20% (UK/FR), 19% (DE), 21% (ES/NL)</span>
          </div>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <input
              id="vat-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={vatRateInput}
              onChange={(e) => {
                setVatRateInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="20"
              className="block w-full bg-transparent px-3.5 py-2.5 text-lg font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-bold text-sm">
              %
            </span>
          </div>

          {/* Rate Preset Buttons */}
          <div className="mt-2.5 space-y-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Common Presets:</span>
              {presetRates.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => {
                    setVatRateInput(p.value)
                    setErrorMessage(null)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    parseFloat(vatRateInput) === parseFloat(p.value)
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 m-0 leading-normal">
              Rate presets are convenient examples. Actual VAT rates vary by jurisdiction and product category.
            </p>
          </div>
        </div>

        {/* Input 3: Currency Selector */}
        <div>
          <label
            htmlFor="vat-currency"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Currency (Display Formatting)
          </label>
          <div className="relative">
            <select
              id="vat-currency"
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
            Currency selection only changes display formatting and does not determine tax rules.
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
            <span>Calculate Pre-VAT Net</span>
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
      {calculation.net !== undefined && !calculation.error && (
        <div className="mt-4 pt-5 border-t border-slate-100 space-y-4">
          {/* Main Hero Result Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Original Net Price (Before VAT)
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

            {/* Giant Hero Net Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              {sym}{formatCurrencyNumber(calculation.net)}
            </div>

            <p className="text-xs text-slate-500 m-0">
              The original pre-tax value extracted from your {sym}{formatCurrencyNumber(calculation.gross)} gross total at {calculation.rate.toFixed(2)}% VAT.
            </p>
          </div>

          {/* Breakdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs tabular-nums">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Gross Total (With VAT)</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.gross)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">VAT Rate Applied</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {calculation.rate.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">VAT Amount Included</div>
              <div className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.vat)}
              </div>
            </div>
          </div>

          {/* Mathematical Step-by-Step Breakdown */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-1 font-mono">
            <div className="font-sans font-bold text-[11px] text-blue-900 uppercase tracking-wide">
              Step-by-Step Mathematical Derivation:
            </div>
            <div>
              1. Divisor: 1 + ({calculation.rate} ÷ 100) = <strong>{(1 + calculation.rate / 100).toFixed(4).replace(/\.?0+$/, '')}</strong>
            </div>
            <div>
              2. Net Price: {sym}{formatCurrencyNumber(calculation.gross)} ÷ {(1 + calculation.rate / 100).toFixed(4).replace(/\.?0+$/, '')} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.net)}</strong>
            </div>
            <div>
              3. VAT Amount: {sym}{formatCurrencyNumber(calculation.gross)} - {sym}{formatCurrencyNumber(calculation.net)} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.vat)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
