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
  MapPin,
  ExternalLink,
} from 'lucide-react'

interface CurrencyOption {
  code: string
  symbol: string
  label: string
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$) — Canadian Dollar' },
  { code: 'USD', symbol: '$', label: 'USD ($) — US Dollar' },
  { code: 'GBP', symbol: '£', label: 'GBP (£) — British Pound' },
  { code: 'EUR', symbol: '€', label: 'EUR (€) — Euro' },
]

interface ProvinceOption {
  id: string
  name: string
  type: 'hst' | 'gst-only' | 'gst-pst'
  verifiedHstRate?: number
  federalRate?: number
  provincialRate?: number
  taxLabel: string
  description: string
}

const PROVINCES: ProvinceOption[] = [
  {
    id: 'manual',
    name: 'Manual / Custom Entry (Default)',
    type: 'hst',
    taxLabel: 'Custom Rate Entry',
    description: 'Enter any custom HST or sales tax rate manually.',
  },
  {
    id: 'on',
    name: 'Ontario',
    type: 'hst',
    verifiedHstRate: 13,
    federalRate: 5,
    provincialRate: 8,
    taxLabel: '13% HST (Participating Province)',
    description: 'Ontario levies 13% HST, combining 5% federal GST and 8% provincial sales tax (CRA verified, 2024/2025).',
  },
  {
    id: 'ns',
    name: 'Nova Scotia',
    type: 'hst',
    verifiedHstRate: 15,
    federalRate: 5,
    provincialRate: 10,
    taxLabel: '15% HST (Participating Province)',
    description: 'Nova Scotia levies 15% HST, combining 5% federal GST and 10% provincial sales tax (CRA verified, 2024/2025).',
  },
  {
    id: 'nb',
    name: 'New Brunswick',
    type: 'hst',
    verifiedHstRate: 15,
    federalRate: 5,
    provincialRate: 10,
    taxLabel: '15% HST (Participating Province)',
    description: 'New Brunswick levies 15% HST, combining 5% federal GST and 10% provincial sales tax (CRA verified, 2024/2025).',
  },
  {
    id: 'pe',
    name: 'Prince Edward Island',
    type: 'hst',
    verifiedHstRate: 15,
    federalRate: 5,
    provincialRate: 10,
    taxLabel: '15% HST (Participating Province)',
    description: 'Prince Edward Island levies 15% HST, combining 5% federal GST and 10% provincial sales tax (CRA verified, 2024/2025).',
  },
  {
    id: 'nl',
    name: 'Newfoundland and Labrador',
    type: 'hst',
    verifiedHstRate: 15,
    federalRate: 5,
    provincialRate: 10,
    taxLabel: '15% HST (Participating Province)',
    description: 'Newfoundland and Labrador levies 15% HST, combining 5% federal GST and 10% provincial sales tax (CRA verified, 2024/2025).',
  },
  {
    id: 'bc',
    name: 'British Columbia',
    type: 'gst-pst',
    federalRate: 5,
    provincialRate: 7,
    taxLabel: 'Non-HST: 5% GST + 7% PST',
    description: 'British Columbia does not use HST. It levies 5% federal GST and a separate 7% Provincial Sales Tax (PST).',
  },
  {
    id: 'ab',
    name: 'Alberta',
    type: 'gst-only',
    federalRate: 5,
    provincialRate: 0,
    taxLabel: 'Non-HST: 5% GST Only',
    description: 'Alberta does not use HST and has no provincial sales tax. Only federal 5% GST applies.',
  },
  {
    id: 'sk',
    name: 'Saskatchewan',
    type: 'gst-pst',
    federalRate: 5,
    provincialRate: 6,
    taxLabel: 'Non-HST: 5% GST + 6% PST',
    description: 'Saskatchewan does not use HST. It applies 5% federal GST and a separate 6% Provincial Sales Tax (PST).',
  },
  {
    id: 'mb',
    name: 'Manitoba',
    type: 'gst-pst',
    federalRate: 5,
    provincialRate: 7,
    taxLabel: 'Non-HST: 5% GST + 7% RST',
    description: 'Manitoba does not use HST. It applies 5% federal GST and a separate 7% Retail Sales Tax (RST).',
  },
  {
    id: 'qc',
    name: 'Quebec',
    type: 'gst-pst',
    federalRate: 5,
    provincialRate: 9.975,
    taxLabel: 'Non-HST: 5% GST + 9.975% QST',
    description: 'Quebec does not use HST. It applies 5% federal GST and a separate 9.975% Quebec Sales Tax (QST).',
  },
  {
    id: 'yt',
    name: 'Yukon',
    type: 'gst-only',
    federalRate: 5,
    provincialRate: 0,
    taxLabel: 'Non-HST: 5% GST Only',
    description: 'Yukon does not use HST and levies no territorial sales tax. Only 5% federal GST applies.',
  },
  {
    id: 'nt',
    name: 'Northwest Territories',
    type: 'gst-only',
    federalRate: 5,
    provincialRate: 0,
    taxLabel: 'Non-HST: 5% GST Only',
    description: 'Northwest Territories does not use HST. Only 5% federal GST applies.',
  },
  {
    id: 'nu',
    name: 'Nunavut',
    type: 'gst-only',
    federalRate: 5,
    provincialRate: 0,
    taxLabel: 'Non-HST: 5% GST Only',
    description: 'Nunavut does not use HST. Only 5% federal GST applies.',
  },
]

function formatCurrencyNumber(val: number): string {
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function ReverseHstCalculatorTool() {
  const [grossInput, setGrossInput] = useState<string>('113.00')
  const [hstRateInput, setHstRateInput] = useState<string>('13')
  const [selectedProvince, setSelectedProvince] = useState<string>('manual')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('CAD')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const presetRates = [
    { label: '0%', value: '0' },
    { label: '5%', value: '5' },
    { label: '8%', value: '8' },
    { label: '10%', value: '10' },
    { label: '12%', value: '12' },
    { label: '13%', value: '13' },
    { label: '14%', value: '14' },
    { label: '15%', value: '15' },
  ]

  const activeCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  }, [selectedCurrency])

  const activeProvince = useMemo(() => {
    return PROVINCES.find((p) => p.id === selectedProvince) || PROVINCES[0]
  }, [selectedProvince])

  const calculation = useMemo(() => {
    const rawGross = parseFloat(grossInput)
    const rawRate = parseFloat(hstRateInput)

    if (isNaN(rawGross) || rawGross < 0) {
      return { error: 'Please enter a valid non-negative HST-inclusive gross amount.' }
    }
    if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
      return { error: 'Please enter a valid HST rate between 0% and 100%.' }
    }

    // Formulas:
    // Original Price Before HST = HST-Inclusive Amount / (1 + HST Rate / 100)
    // HST Amount = HST-Inclusive Amount - Original Price Before HST
    if (rawRate === 0) {
      return {
        gross: rawGross,
        rate: 0,
        net: rawGross,
        hst: 0,
        federalPart: 0,
        provincialPart: 0,
        error: null,
      }
    }

    const divisor = 1 + rawRate / 100
    const netCents = Math.round((rawGross / divisor) * 100)
    const netAmount = netCents / 100
    const hstAmount = Math.round((rawGross - netAmount) * 100) / 100

    // Optional federal/provincial portion split if participating HST province
    let federalPart: number | undefined
    let provincialPart: number | undefined

    if (activeProvince.type === 'hst' && activeProvince.verifiedHstRate && activeProvince.federalRate && activeProvince.provincialRate) {
      if (rawRate === activeProvince.verifiedHstRate) {
        const fedRatio = activeProvince.federalRate / activeProvince.verifiedHstRate
        federalPart = Math.round(hstAmount * fedRatio * 100) / 100
        provincialPart = Math.round((hstAmount - federalPart) * 100) / 100
      }
    }

    return {
      gross: rawGross,
      rate: rawRate,
      net: netAmount,
      hst: hstAmount,
      federalPart,
      provincialPart,
      error: null,
    }
  }, [grossInput, hstRateInput, activeProvince])

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (calculation.error) {
      setErrorMessage(calculation.error)
    } else {
      setErrorMessage(null)
    }
  }

  const handleReset = () => {
    setGrossInput('113.00')
    setHstRateInput('13')
    setSelectedProvince('manual')
    setSelectedCurrency('CAD')
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (
      calculation.error ||
      calculation.net === undefined ||
      calculation.gross === undefined ||
      calculation.hst === undefined ||
      calculation.rate === undefined
    ) {
      return
    }

    const sym = activeCurrency.symbol
    let text = `REVERSE HST CALCULATION
----------------------------------------
HST-Inclusive Total:       ${sym}${formatCurrencyNumber(calculation.gross)}
HST Rate Applied:          ${calculation.rate.toFixed(2)}%
----------------------------------------
Original Price Before HST: ${sym}${formatCurrencyNumber(calculation.net)}
HST Amount Extracted:      ${sym}${formatCurrencyNumber(calculation.hst)}`

    if (calculation.federalPart !== undefined && calculation.provincialPart !== undefined && activeProvince.federalRate && activeProvince.provincialRate) {
      text += `\n----------------------------------------
Component Breakdown (${activeProvince.name}):
- Federal Component (${activeProvince.federalRate}%):    ${sym}${formatCurrencyNumber(calculation.federalPart)}
- Provincial Component (${activeProvince.provincialRate}%): ${sym}${formatCurrencyNumber(calculation.provincialPart)}`
    }

    text += `\n----------------------------------------
Formula: ${sym}${formatCurrencyNumber(calculation.gross)} ÷ (1 + ${calculation.rate} / 100) = ${sym}${formatCurrencyNumber(calculation.net)}
Calculated at ReverseTaxCalculator.pro/tools/reverse-hst-calculator/`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApplyProvinceRate = () => {
    if (activeProvince.verifiedHstRate !== undefined) {
      setHstRateInput(activeProvince.verifiedHstRate.toString())
      setErrorMessage(null)
    } else if (activeProvince.federalRate !== undefined) {
      setHstRateInput(activeProvince.federalRate.toString())
      setErrorMessage(null)
    }
  }

  const sym = activeCurrency.symbol

  return (
    <div
      id="reverse-hst-tool"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-6"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Canadian Reverse HST Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>CRA Formula Precision</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: Total amount including HST */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="hst-gross-price"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. Total amount including HST
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{activeCurrency.code}</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              {sym}
            </span>
            <input
              id="hst-gross-price"
              type="number"
              step="any"
              min="0"
              value={grossInput}
              onChange={(e) => {
                setGrossInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="113.00"
              className="block w-full bg-transparent pl-10 pr-4 py-2.5 text-xl sm:text-2xl font-extrabold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: HST Rate & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="hst-rate"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              2. HST Rate (%)
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              Common Canadian HST: 13% (ON), 15% (Atlantic)
            </span>
          </div>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <input
              id="hst-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={hstRateInput}
              onChange={(e) => {
                setHstRateInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="13"
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
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Example Presets:</span>
              {presetRates.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => {
                    setHstRateInput(p.value)
                    setErrorMessage(null)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    parseFloat(hstRateInput) === parseFloat(p.value)
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 m-0 leading-normal">
              Rate presets are convenient examples, not guaranteed current rates for any province.
            </p>
          </div>
        </div>

        {/* Input 3: Province or Territory (Optional) */}
        <div>
          <label
            htmlFor="hst-province"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Province or Territory (Optional Context)
          </label>
          <div className="relative">
            <select
              id="hst-province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all cursor-pointer shadow-2xs"
            >
              {PROVINCES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.type === 'hst' && p.verifiedHstRate ? `(${p.verifiedHstRate}% HST)` : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Contextual Card on Province Selection */}
          {selectedProvince !== 'manual' && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{activeProvince.name} Tax Information</span>
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  activeProvince.type === 'hst' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeProvince.type === 'hst' ? 'HST Participating' : 'Non-HST Jurisdiction'}
                </span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                {activeProvince.description}
              </p>
              {activeProvince.type === 'hst' && activeProvince.verifiedHstRate && (
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Verified rate: <strong>{activeProvince.verifiedHstRate}%</strong> (CRA effective 2024/2025)
                  </span>
                  {parseFloat(hstRateInput) !== activeProvince.verifiedHstRate && (
                    <button
                      type="button"
                      onClick={handleApplyProvinceRate}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      Set rate to {activeProvince.verifiedHstRate}%
                    </button>
                  )}
                </div>
              )}
              {activeProvince.type !== 'hst' && (
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-amber-800">
                    Note: Does not use HST. To extract federal GST only, use 5%.
                  </span>
                  {parseFloat(hstRateInput) !== 5 && (
                    <button
                      type="button"
                      onClick={() => setHstRateInput('5')}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      Set rate to 5% (GST)
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="text-[11px] text-slate-500 mt-1 m-0">
            Province selection provides geographic context and does not determine tax treatment automatically.
          </p>
        </div>

        {/* Input 4: Currency */}
        <div>
          <label
            htmlFor="hst-currency"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            4. Currency (Display Formatting)
          </label>
          <div className="relative">
            <select
              id="hst-currency"
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
            Currency selection only changes display formatting and does not determine applicable tax rates or province.
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
            <span>Calculate Pre-HST Price</span>
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
                Original Price Before HST
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

            {/* Giant Hero Pre-HST Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              {sym}{formatCurrencyNumber(calculation.net)}
            </div>

            <p className="text-xs text-slate-500 m-0">
              The original pre-tax price extracted from your {sym}{formatCurrencyNumber(calculation.gross)} total at {calculation.rate.toFixed(2)}% HST.
            </p>
          </div>

          {/* Breakdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs tabular-nums">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Gross Total (With HST)</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.gross)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">HST Rate Applied</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {calculation.rate.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">HST Amount Included</div>
              <div className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.hst)}
              </div>
            </div>
          </div>

          {/* Optional HST Federal vs Provincial Component Display */}
          {calculation.federalPart !== undefined && calculation.provincialPart !== undefined && activeProvince.federalRate && activeProvince.provincialRate && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span>Harmonized Component Split ({activeProvince.name})</span>
                <span className="text-[11px] font-normal text-blue-700">Combined: {calculation.rate.toFixed(2)}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-blue-100">
                  <div className="text-slate-500 text-[11px]">Federal Component ({activeProvince.federalRate}% GST)</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {sym}{formatCurrencyNumber(calculation.federalPart)}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-blue-100">
                  <div className="text-slate-500 text-[11px]">Provincial Component ({activeProvince.provincialRate}% PST)</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {sym}{formatCurrencyNumber(calculation.provincialPart)}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 m-0">
                * Note: Canada Revenue Agency (CRA) administers both components jointly as one single harmonized tax in participating provinces.
              </p>
            </div>
          )}

          {/* Mathematical Step-by-Step Breakdown */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-950 space-y-1 font-mono">
            <div className="font-sans font-bold text-[11px] text-blue-900 uppercase tracking-wide">
              Step-by-Step Mathematical Derivation:
            </div>
            <div>
              1. Divisor: 1 + ({calculation.rate} ÷ 100) = <strong>{(1 + calculation.rate / 100).toFixed(4).replace(/\.?0+$/, '')}</strong>
            </div>
            <div>
              2. Original Price: {sym}{formatCurrencyNumber(calculation.gross)} ÷ {(1 + calculation.rate / 100).toFixed(4).replace(/\.?0+$/, '')} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.net)}</strong>
            </div>
            <div>
              3. HST Amount: {sym}{formatCurrencyNumber(calculation.gross)} - {sym}{formatCurrencyNumber(calculation.net)} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.hst)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
