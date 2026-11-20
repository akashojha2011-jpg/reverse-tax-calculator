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
  Building,
  Info,
} from 'lucide-react'

interface CurrencyOption {
  code: string
  symbol: string
  label: string
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', label: 'INR (₹) — Indian Rupee' },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$) — Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$) — Australian Dollar' },
  { code: 'NZD', symbol: 'NZ$', label: 'NZD (NZ$) — New Zealand Dollar' },
  { code: 'SGD', symbol: 'S$', label: 'SGD (S$) — Singapore Dollar' },
  { code: 'USD', symbol: '$', label: 'USD ($) — US Dollar' },
  { code: 'GBP', symbol: '£', label: 'GBP (£) — British Pound' },
  { code: 'EUR', symbol: '€', label: 'EUR (€) — Euro' },
]

interface JurisdictionOption {
  id: string
  name: string
  note: string
}

const JURISDICTIONS: JurisdictionOption[] = [
  {
    id: 'manual',
    name: 'Manual / General Calculation',
    note: 'Standard mathematical reverse GST calculation for any jurisdiction or custom rate.',
  },
  {
    id: 'india',
    name: 'India (CGST, SGST, IGST Framework)',
    note: 'In India, intra-state transactions split GST equally between CGST and SGST, while inter-state transactions use IGST.',
  },
  {
    id: 'australia',
    name: 'Australia (ATO 10% Standard Rule)',
    note: 'Australia applies a standard 10% GST on most taxable supplies, subject to ATO rules and exemptions.',
  },
  {
    id: 'new-zealand',
    name: 'New Zealand (IRD 15% Standard Rule)',
    note: 'New Zealand applies a standard 15% GST on most goods and services under Inland Revenue rules.',
  },
  {
    id: 'canada',
    name: 'Canada (Federal GST + Provincial)',
    note: 'Canada levies 5% federal GST; depending on province, it combines with provincial tax into HST or separate PST/QST.',
  },
  {
    id: 'singapore',
    name: 'Singapore (IRAS 9% Standard Rule)',
    note: 'Singapore standard GST is 9% (as of 2024), governed by Inland Revenue Authority of Singapore (IRAS).',
  },
]

function formatCurrencyNumber(val: number): string {
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function ReverseGstCalculatorTool() {
  const [grossInput, setGrossInput] = useState<string>('1180.00')
  const [gstRateInput, setGstRateInput] = useState<string>('18')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR')
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('manual')
  const [indiaTxType, setIndiaTxType] = useState<'intra' | 'inter'>('intra')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const presetRates = [
    { label: '0%', value: '0' },
    { label: '3%', value: '3' },
    { label: '5%', value: '5' },
    { label: '7%', value: '7' },
    { label: '10%', value: '10' },
    { label: '12%', value: '12' },
    { label: '15%', value: '15' },
    { label: '18%', value: '18' },
    { label: '20%', value: '20' },
    { label: '28%', value: '28' },
  ]

  const activeCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  }, [selectedCurrency])

  const activeJurisdiction = useMemo(() => {
    return JURISDICTIONS.find((j) => j.id === selectedJurisdiction) || JURISDICTIONS[0]
  }, [selectedJurisdiction])

  const calculation = useMemo(() => {
    const rawGross = parseFloat(grossInput)
    const rawRate = parseFloat(gstRateInput)

    if (isNaN(rawGross) || rawGross < 0) {
      return { error: 'Please enter a valid non-negative GST-inclusive gross amount.' }
    }
    if (isNaN(rawRate) || rawRate < 0 || rawRate > 100) {
      return { error: 'Please enter a valid GST rate between 0% and 100%.' }
    }

    // Formulas:
    // Pre-GST Price = GST-Inclusive Amount / (1 + GST Rate / 100)
    // GST Amount = GST-Inclusive Amount - Pre-GST Price
    if (rawRate === 0) {
      return {
        gross: rawGross,
        rate: 0,
        net: rawGross,
        gst: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        halfRate: 0,
        error: null,
      }
    }

    const divisor = 1 + rawRate / 100
    const netCents = Math.round((rawGross / divisor) * 100)
    const netAmount = netCents / 100
    const gstAmount = Math.round((rawGross - netAmount) * 100) / 100

    // India breakdown
    const halfRate = rawRate / 2
    const halfCents = Math.round((gstAmount / 2) * 100)
    const cgst = halfCents / 100
    const sgst = Math.round((gstAmount - cgst) * 100) / 100
    const igst = gstAmount

    return {
      gross: rawGross,
      rate: rawRate,
      net: netAmount,
      gst: gstAmount,
      cgst,
      sgst,
      igst,
      halfRate,
      error: null,
    }
  }, [grossInput, gstRateInput])

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (calculation.error) {
      setErrorMessage(calculation.error)
    } else {
      setErrorMessage(null)
    }
  }

  const handleReset = () => {
    setGrossInput('1180.00')
    setGstRateInput('18')
    setSelectedCurrency('INR')
    setSelectedJurisdiction('manual')
    setIndiaTxType('intra')
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (
      calculation.error ||
      calculation.net === undefined ||
      calculation.gross === undefined ||
      calculation.gst === undefined ||
      calculation.rate === undefined
    ) {
      return
    }

    const sym = activeCurrency.symbol
    let text = `REVERSE GST CALCULATION
----------------------------------------
GST-Inclusive Total:       ${sym}${formatCurrencyNumber(calculation.gross)}
GST Rate Applied:          ${calculation.rate.toFixed(2)}%
----------------------------------------
Original Price Before GST: ${sym}${formatCurrencyNumber(calculation.net)}
GST Amount Extracted:      ${sym}${formatCurrencyNumber(calculation.gst)}`

    if (selectedJurisdiction === 'india') {
      if (indiaTxType === 'intra') {
        text += `\n----------------------------------------
India Intra-State Breakdown:
- CGST (${calculation.halfRate.toFixed(2)}%): ${sym}${formatCurrencyNumber(calculation.cgst || 0)}
- SGST (${calculation.halfRate.toFixed(2)}%): ${sym}${formatCurrencyNumber(calculation.sgst || 0)}`
      } else {
        text += `\n----------------------------------------
India Inter-State Breakdown:
- IGST (${calculation.rate.toFixed(2)}%): ${sym}${formatCurrencyNumber(calculation.igst || 0)}`
      }
    }

    text += `\n----------------------------------------
Formula: ${sym}${formatCurrencyNumber(calculation.gross)} ÷ (1 + ${calculation.rate} / 100) = ${sym}${formatCurrencyNumber(calculation.net)}
Calculated at ReverseTaxCalculator.pro/tools/reverse-gst-calculator/`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sym = activeCurrency.symbol

  return (
    <div
      id="reverse-gst-tool"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-6"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Reverse GST Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Accurate Net Extraction</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        {/* Input 1: GST-Inclusive Amount */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="gst-gross-price"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. GST-Inclusive Amount (Total Paid)
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{activeCurrency.code}</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              {sym}
            </span>
            <input
              id="gst-gross-price"
              type="number"
              step="any"
              min="0"
              value={grossInput}
              onChange={(e) => {
                setGrossInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="1180.00"
              className="block w-full bg-transparent pl-9 pr-4 py-2.5 text-xl sm:text-2xl font-extrabold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* Input 2: GST Rate & Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="gst-rate"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              2. GST Rate (%)
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              Examples: 18% (IN), 10% (AU), 15% (NZ), 5% (CA), 9% (SG)
            </span>
          </div>

          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <input
              id="gst-rate"
              type="number"
              step="any"
              min="0"
              max="100"
              value={gstRateInput}
              onChange={(e) => {
                setGstRateInput(e.target.value)
                setErrorMessage(null)
              }}
              placeholder="18"
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
                    setGstRateInput(p.value)
                    setErrorMessage(null)
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    parseFloat(gstRateInput) === parseFloat(p.value)
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 m-0 leading-normal">
              Rate presets are convenient examples. Actual GST rates vary by jurisdiction, transaction type, and commodity classification.
            </p>
          </div>
        </div>

        {/* Input 3: Currency Selector */}
        <div>
          <label
            htmlFor="gst-currency"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Currency (Display Formatting)
          </label>
          <div className="relative">
            <select
              id="gst-currency"
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
            Currency selection only changes number formatting and does not determine the applicable GST rate or tax jurisdiction.
          </p>
        </div>

        {/* Input 4: Optional Jurisdiction Context */}
        <div>
          <label
            htmlFor="gst-jurisdiction"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            4. Optional Jurisdiction Context
          </label>
          <div className="relative">
            <select
              id="gst-jurisdiction"
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-medium text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all cursor-pointer shadow-2xs"
            >
              {JURISDICTIONS.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
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
            {activeJurisdiction.note}
          </p>
        </div>

        {/* Section 7: Optional India GST Breakdown Controls */}
        {selectedJurisdiction === 'india' && (
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
              <Building className="w-4 h-4 text-blue-700" />
              <span>India GST Transaction Type (Illustrative Breakdown)</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIndiaTxType('intra')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  indiaTxType === 'intra'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Intra-State (CGST + SGST)
              </button>
              <button
                type="button"
                onClick={() => setIndiaTxType('inter')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  indiaTxType === 'inter'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Inter-State (IGST)
              </button>
            </div>
            <p className="text-[11px] text-blue-800 m-0 leading-normal">
              {indiaTxType === 'intra'
                ? `Intra-state sales split the ${gstRateInput}% GST equally into CGST (${parseFloat(gstRateInput) / 2 || 0}%) and SGST (${parseFloat(gstRateInput) / 2 || 0}%).`
                : `Inter-state transactions apply Integrated GST (IGST) at the full ${gstRateInput}% combined rate.`}
            </p>
          </div>
        )}

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
            <span>Calculate Pre-GST Net</span>
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
                Original Price Before GST (Net)
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

            {/* Giant Hero Pre-GST Price */}
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
              {sym}{formatCurrencyNumber(calculation.net)}
            </div>

            <p className="text-xs text-slate-500 m-0">
              The original pre-tax price extracted from your {sym}{formatCurrencyNumber(calculation.gross)} total at {calculation.rate.toFixed(2)}% GST.
            </p>
          </div>

          {/* Breakdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs tabular-nums">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">Gross Total (With GST)</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.gross)}
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">GST Rate Applied</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {calculation.rate.toFixed(2)}%
              </div>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="text-slate-500 text-[11px] font-medium">GST Amount Included</div>
              <div className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                {sym}{formatCurrencyNumber(calculation.gst)}
              </div>
            </div>
          </div>

          {/* Optional India GST Component Display */}
          {selectedJurisdiction === 'india' && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span>India GST Component Split ({indiaTxType === 'intra' ? 'Intra-State' : 'Inter-State'})</span>
                <span className="text-[11px] font-normal text-blue-700">Combined: {calculation.rate.toFixed(2)}%</span>
              </div>
              {indiaTxType === 'intra' ? (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-blue-100">
                    <div className="text-slate-500 text-[11px]">Central GST (CGST @ {calculation.halfRate.toFixed(2)}%)</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {sym}{formatCurrencyNumber(calculation.cgst || 0)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-blue-100">
                    <div className="text-slate-500 text-[11px]">State GST (SGST @ {calculation.halfRate.toFixed(2)}%)</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {sym}{formatCurrencyNumber(calculation.sgst || 0)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-white border border-blue-100 text-xs">
                  <div className="text-slate-500 text-[11px]">Integrated GST (IGST @ {calculation.rate.toFixed(2)}%)</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {sym}{formatCurrencyNumber(calculation.igst || 0)}
                  </div>
                </div>
              )}
              <p className="text-[11px] text-slate-500 m-0">
                * Note: Illustrative component split based on standard dual GST legislation. Actual tax liability depends on place of supply and applicable notification.
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
              2. Pre-GST Price: {sym}{formatCurrencyNumber(calculation.gross)} ÷ {(1 + calculation.rate / 100).toFixed(4).replace(/\.?0+$/, '')} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.net)}</strong>
            </div>
            <div>
              3. GST Amount: {sym}{formatCurrencyNumber(calculation.gross)} - {sym}{formatCurrencyNumber(calculation.net)} ={' '}
              <strong className="text-blue-900 font-bold">{sym}{formatCurrencyNumber(calculation.gst)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
