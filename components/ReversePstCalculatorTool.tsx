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
  taxType: 'pst' | 'rst' | 'qst' | 'manual'
  taxName: string
  verifiedRate?: number
  officialSource: string
  effectiveDate: string
  description: string
}

const PROVINCES: ProvinceOption[] = [
  {
    id: 'manual',
    name: 'Other / Manual Calculation (Default)',
    taxType: 'manual',
    taxName: 'Custom Provincial Rate',
    officialSource: 'Provincial Tax Schedule',
    effectiveDate: 'Current',
    description: 'Manually enter any provincial sales tax percentage for your transaction.',
  },
  {
    id: 'bc',
    name: 'British Columbia',
    taxType: 'pst',
    taxName: 'Provincial Sales Tax (PST)',
    verifiedRate: 7,
    officialSource: 'BC Ministry of Finance',
    effectiveDate: '2024/2025',
    description: 'British Columbia levies a 7% general Provincial Sales Tax (PST) on qualifying goods and services, separate from the 5% federal GST.',
  },
  {
    id: 'sk',
    name: 'Saskatchewan',
    taxType: 'pst',
    taxName: 'Provincial Sales Tax (PST)',
    verifiedRate: 6,
    officialSource: 'Saskatchewan Ministry of Finance',
    effectiveDate: '2024/2025',
    description: 'Saskatchewan applies a 6% general Provincial Sales Tax (PST) to taxable goods and services under provincial legislation.',
  },
  {
    id: 'mb',
    name: 'Manitoba',
    taxType: 'rst',
    taxName: 'Retail Sales Tax (RST)',
    verifiedRate: 7,
    officialSource: 'Manitoba Finance',
    effectiveDate: '2024/2025',
    description: 'Manitoba designates its provincial tax as Retail Sales Tax (RST) at 7%, rather than naming it PST. It applies alongside federal 5% GST.',
  },
  {
    id: 'qc',
    name: 'Quebec',
    taxType: 'qst',
    taxName: 'Quebec Sales Tax (QST)',
    verifiedRate: 9.975,
    officialSource: 'Revenu Québec',
    effectiveDate: '2024/2025',
    description: 'Quebec administers Quebec Sales Tax (QST) at 9.975%. QST is a distinct provincial value-added tax separate from both PST and GST.',
  },
]

function formatCurrencyNumber(val: number): string {
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function ReversePstCalculatorTool() {
  const [grossInput, setGrossInput] = useState<string>('112.00')
  const [pstRateInput, setPstRateInput] = useState<string>('7')
  const [selectedProvince, setSelectedProvince] = useState<string>('manual')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('CAD')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const presetRates = [
    { label: '0%', value: '0' },
    { label: '5%', value: '5' },
    { label: '6%', value: '6' },
    { label: '7%', value: '7' },
    { label: '7.5%', value: '7.5' },
    { label: '8%', value: '8' },
    { label: '9%', value: '9' },
    { label: '10%', value: '10' },
    { label: '12%', value: '12' },
  ]

  const activeCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  }, [selectedCurrency])

  const activeProvince = useMemo(() => {
    return PROVINCES.find((p) => p.id === selectedProvince) || PROVINCES[0]
  }, [selectedProvince])

  const calculation = useMemo(() => {
    const rawGross = parseFloat(grossInput)
    const rawRate = parseFloat(pstRateInput)

    if (isNaN(rawGross) || rawGross < 0) {
      return { error: 'Please enter a valid non-negative amount including PST.' }
    }
    if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
      return { error: 'Please enter a valid PST rate between 0% and 100%.' }
    }

    // Formulas:
    // Original Price Before PST = PST-Inclusive Amount / (1 + PST Rate / 100)
    // PST Amount = PST-Inclusive Amount - Original Price Before PST
    if (rawRate === 0) {
      return {
        gross: rawGross,
        rate: 0,
        net: rawGross,
        pst: 0,
        error: null,
      }
    }

    const divisor = 1 + rawRate / 100
    const netCents = Math.round((rawGross / divisor) * 100)
    const netAmount = netCents / 100
    const pstAmount = Math.round((rawGross - netAmount) * 100) / 100

    return {
      gross: rawGross,
      rate: rawRate,
      net: netAmount,
      pst: pstAmount,
      error: null,
    }
  }, [grossInput, pstRateInput])

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (calculation.error) {
      setErrorMessage(calculation.error)
    } else {
      setErrorMessage(null)
    }
  }

  const handleReset = () => {
    setGrossInput('112.00')
    setPstRateInput('7')
    setSelectedProvince('manual')
    setSelectedCurrency('CAD')
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (
      calculation.error ||
      calculation.net === undefined ||
      calculation.gross === undefined ||
      calculation.pst === undefined ||
      calculation.rate === undefined
    ) {
      return
    }

    const sym = activeCurrency.symbol
    const text = `REVERSE PST CALCULATION
----------------------------------------
PST-Inclusive Total:       ${sym}${formatCurrencyNumber(calculation.gross)}
PST Rate Applied:          ${calculation.rate.toFixed(2)}%
----------------------------------------
Original Price Before PST: ${sym}${formatCurrencyNumber(calculation.net)}
PST Amount Extracted:      ${sym}${formatCurrencyNumber(calculation.pst)}
----------------------------------------
Formula: ${sym}${formatCurrencyNumber(calculation.gross)} ÷ (1 + ${calculation.rate} / 100) = ${sym}${formatCurrencyNumber(calculation.net)}
Calculated at ReverseTaxCalculator.pro/tools/reverse-pst-calculator/`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApplyProvinceRate = () => {
    if (activeProvince.verifiedRate !== undefined) {
      setPstRateInput(activeProvince.verifiedRate.toString())
      setErrorMessage(null)
    }
  }

  const sym = activeCurrency.symbol

  return (
    <div
      id="reverse-pst-tool"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-6"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Canadian Reverse PST Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Provincial Net Extraction</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: Total amount including PST */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="pst-gross-price"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. Total amount including PST
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{activeCurrency.code}</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              {sym}
            </span>
            <input
              id="pst-gross-price"
              type="number"
              step="any"
              min="0"
              value={grossInput}
              onChange={(e) => {
                setGrossInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="112.00"
              className="block w-full bg-transparent pl-10 pr-4 py-2.5 text-xl sm:text-2xl font-extrabold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: PST Rate & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="pst-rate"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              2. PST Rate (%)
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              Common: 7% (BC PST / MB RST), 6% (SK PST), 9.975% (QC QST)
            </span>
          </div>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <input
              id="pst-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={pstRateInput}
              onChange={(e) => {
                setPstRateInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="7"
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
                    setPstRateInput(p.value)
                    setErrorMessage(null)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    parseFloat(pstRateInput) === parseFloat(p.value)
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 m-0 leading-normal">
              Rate presets are convenient examples, not guaranteed current rates for every province.
            </p>
          </div>
        </div>

        {/* Input 3: Province (Optional Context) */}
        <div>
          <label
            htmlFor="pst-province"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Province (Optional Context)
          </label>
          <div className="relative">
            <select
              id="pst-province"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all cursor-pointer shadow-2xs"
            >
              {PROVINCES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.verifiedRate ? `(${p.taxName}: ${p.verifiedRate}%)` : ''}
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
                  <span>{activeProvince.name} — {activeProvince.taxName}</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {activeProvince.officialSource} ({activeProvince.effectiveDate})
                </span>
              </div>
              <p className="text-slate-600 m-0 leading-relaxed">
                {activeProvince.description}
              </p>
              {activeProvince.verifiedRate !== undefined && (
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Official statutory rate: <strong>{activeProvince.verifiedRate}%</strong>
                  </span>
                  {parseFloat(pstRateInput) !== activeProvince.verifiedRate && (
                    <button
                      type="button"
                      onClick={handleApplyProvinceRate}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      Set rate to {activeProvince.verifiedRate}%
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="text-[11px] text-slate-500 mt-1 m-0">
            Provincial tax systems differ. Selecting a province provides geographic context and does not automatically determine the tax rate.
          </p>
        </div>

        {/* Input 4: Currency */}
        <div>
          <label
            htmlFor="pst-currency"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            4. Currency (Display Formatting)
          </label>
          <div className="relative">
            <select
              id="pst-currency"
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
            Currency selection only changes display formatting and does not automatically determine the applicable tax rate.
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
            <span>Calculate Pre-PST Price</span>
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
                Original Price Before PST
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

            {/* Giant Hero Pre-PST Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              {sym}{formatCurrencyNumber(calculation.net)}
            </div>

            <p className="text-xs text-slate-500 m-0">
              The original pre-tax price extracted from your {sym}{formatCurrencyNumber(calculation.gross)} total at {calculation.rate.toFixed(2)}% PST.
            </p>
          </div>

          {/* Breakdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs tabular-nums">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Gross Total (With PST)</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.gross)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">PST Rate Applied</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {calculation.rate.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">PST Amount Included</div>
              <div className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.pst)}
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
              2. Original Price: {sym}{formatCurrencyNumber(calculation.gross)} ÷ {(1 + calculation.rate / 100).toFixed(4).replace(/\.?0+$/, '')} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.net)}</strong>
            </div>
            <div>
              3. PST Amount: {sym}{formatCurrencyNumber(calculation.gross)} - {sym}{formatCurrencyNumber(calculation.net)} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.pst)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
