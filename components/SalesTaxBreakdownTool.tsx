'use client'

import React, { useState, useMemo } from 'react'
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Layers,
  AlertCircle,
  Building,
  Landmark,
  MapPin,
  TrendingUp,
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

interface JurisdictionPreset {
  name: string
  state: string
  county: string
  city: string
  district: string
}

const POPULAR_PRESETS: JurisdictionPreset[] = [
  { name: 'Standard Example (8.00%)', state: '5.00', county: '1.00', city: '1.50', district: '0.50' },
  { name: 'Sample Scenario A (6.00%)', state: '4.00', county: '1.00', city: '1.00', district: '0.00' },
  { name: 'Sample Scenario B (7.25%)', state: '6.00', county: '0.25', city: '1.00', district: '0.00' },
  { name: 'Sample Scenario C (8.25%)', state: '6.25', county: '0.00', city: '1.00', district: '1.00' },
  { name: 'Sample Scenario D (9.50%)', state: '6.00', county: '0.50', city: '1.50', district: '1.50' },
]

export function SalesTaxBreakdownTool() {
  const [priceInput, setPriceInput] = useState<string>('100.00')
  const [stateRateInput, setStateRateInput] = useState<string>('5.00')
  const [countyRateInput, setCountyRateInput] = useState<string>('1.00')
  const [cityRateInput, setCityRateInput] = useState<string>('1.50')
  const [districtRateInput, setDistrictRateInput] = useState<string>('0.50')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const activeCurrency = useMemo(() => {
    return CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  }, [selectedCurrency])

  const calculation = useMemo(() => {
    const rawPrice = parseFloat(priceInput)
    const rawStateRate = parseFloat(stateRateInput || '0')
    const rawCountyRate = parseFloat(countyRateInput || '0')
    const rawCityRate = parseFloat(cityRateInput || '0')
    const rawDistrictRate = parseFloat(districtRateInput || '0')

    if (isNaN(rawPrice) || rawPrice < 0) {
      return { error: 'Please enter a valid non-negative purchase price.' }
    }
    if (isNaN(rawStateRate) || rawStateRate < 0 || rawStateRate > 100) {
      return { error: 'Please enter a valid state rate between 0% and 100%.' }
    }
    if (isNaN(rawCountyRate) || rawCountyRate < 0 || rawCountyRate > 100) {
      return { error: 'Please enter a valid county rate between 0% and 100%.' }
    }
    if (isNaN(rawCityRate) || rawCityRate < 0 || rawCityRate > 100) {
      return { error: 'Please enter a valid city rate between 0% and 100%.' }
    }
    if (isNaN(rawDistrictRate) || rawDistrictRate < 0 || rawDistrictRate > 100) {
      return { error: 'Please enter a valid special district rate between 0% and 100%.' }
    }

    // Component calculations from pre-tax base subtotal
    const stateTaxCents = Math.round(rawPrice * (rawStateRate / 100) * 100)
    const stateTax = stateTaxCents / 100

    const countyTaxCents = Math.round(rawPrice * (rawCountyRate / 100) * 100)
    const countyTax = countyTaxCents / 100

    const cityTaxCents = Math.round(rawPrice * (rawCityRate / 100) * 100)
    const cityTax = cityTaxCents / 100

    const districtTaxCents = Math.round(rawPrice * (rawDistrictRate / 100) * 100)
    const districtTax = districtTaxCents / 100

    const totalTax = Math.round((stateTax + countyTax + cityTax + districtTax) * 100) / 100
    const combinedRate =
      Math.round((rawStateRate + rawCountyRate + rawCityRate + rawDistrictRate + Number.EPSILON) * 1000) / 1000
    const finalPrice = Math.round((rawPrice + totalTax) * 100) / 100

    return {
      price: rawPrice,
      stateRate: rawStateRate,
      stateTax,
      countyRate: rawCountyRate,
      countyTax,
      cityRate: rawCityRate,
      cityTax,
      districtRate: rawDistrictRate,
      districtTax,
      combinedRate,
      totalTax,
      finalPrice,
      error: null,
    }
  }, [priceInput, stateRateInput, countyRateInput, cityRateInput, districtRateInput])

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
    setStateRateInput('5.00')
    setCountyRateInput('1.00')
    setCityRateInput('1.50')
    setDistrictRateInput('0.50')
    setSelectedCurrency('USD')
    setErrorMessage(null)
  }

  const handleApplyPreset = (preset: JurisdictionPreset) => {
    setStateRateInput(preset.state)
    setCountyRateInput(preset.county)
    setCityRateInput(preset.city)
    setDistrictRateInput(preset.district)
    setErrorMessage(null)
  }

  const handleCopy = () => {
    if (calculation.error || calculation.finalPrice === undefined) return
    const sym = activeCurrency.symbol
    const text = `SALES TAX BREAKDOWN CALCULATION
----------------------------------------
Original Purchase Price: ${sym}${calculation.price.toFixed(2)}
----------------------------------------
• State Sales Tax (${calculation.stateRate.toFixed(2)}%): ${sym}${calculation.stateTax.toFixed(2)}
• County Sales Tax (${calculation.countyRate.toFixed(2)}%): ${sym}${calculation.countyTax.toFixed(2)}
• City Sales Tax (${calculation.cityRate.toFixed(2)}%): ${sym}${calculation.cityTax.toFixed(2)}
• Special District Tax (${calculation.districtRate.toFixed(2)}%): ${sym}${calculation.districtTax.toFixed(2)}
----------------------------------------
Combined Sales Tax Rate: ${calculation.combinedRate.toFixed(3).replace(/\.?0+$/, '')}%
Total Sales Tax Added:   ${sym}${calculation.totalTax.toFixed(2)}
Final Purchase Price:    ${sym}${calculation.finalPrice.toFixed(2)}
----------------------------------------
Calculated at ReverseTaxCalculator.pro/tools/sales-tax-breakdown/`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sym = activeCurrency.symbol

  return (
    <div
      id="sales-tax-breakdown-tool"
      className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 text-slate-900 space-y-6"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Sales Tax Breakdown Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instant Tax Component Calculation</span>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-5">
        {/* Input 1: Original Purchase Price */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="breakdown-price"
              className="block text-xs font-bold text-slate-800 uppercase tracking-wide"
            >
              1. Purchase Price Before Tax (Subtotal)
            </label>
            <span className="text-[11px] text-slate-400 font-medium">{activeCurrency.code}</span>
          </div>
          <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-lg">
              {sym}
            </span>
            <input
              id="breakdown-price"
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

        {/* Component Tax Rates Section */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              2. Individual Tax Component Rates (%)
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              Enter 0% for non-applicable components
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Input 2: State Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="state-rate"
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <Landmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>State Sales Tax</span>
                </label>
                <span className="text-[10px] text-slate-400">Rate %</span>
              </div>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
                <input
                  id="state-rate"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={stateRateInput}
                  onChange={(e) => {
                    setStateRateInput(e.target.value)
                    setErrorMessage(null)
                  }}
                  placeholder="5.00"
                  className="block w-full bg-transparent px-3 py-2 text-base font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 font-bold text-xs">
                  %
                </span>
              </div>
            </div>

            {/* Input 3: County Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="county-rate"
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  <span>County Sales Tax</span>
                </label>
                <span className="text-[10px] text-slate-400">Rate %</span>
              </div>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
                <input
                  id="county-rate"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={countyRateInput}
                  onChange={(e) => {
                    setCountyRateInput(e.target.value)
                    setErrorMessage(null)
                  }}
                  placeholder="1.00"
                  className="block w-full bg-transparent px-3 py-2 text-base font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 font-bold text-xs">
                  %
                </span>
              </div>
            </div>

            {/* Input 4: City Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="city-rate"
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>City / Municipal Tax</span>
                </label>
                <span className="text-[10px] text-slate-400">Rate %</span>
              </div>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
                <input
                  id="city-rate"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={cityRateInput}
                  onChange={(e) => {
                    setCityRateInput(e.target.value)
                    setErrorMessage(null)
                  }}
                  placeholder="1.50"
                  className="block w-full bg-transparent px-3 py-2 text-base font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 font-bold text-xs">
                  %
                </span>
              </div>
            </div>

            {/* Input 5: Special District Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="district-rate"
                  className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Special District Tax</span>
                </label>
                <span className="text-[10px] text-slate-400">Rate %</span>
              </div>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white shadow-2xs">
                <input
                  id="district-rate"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={districtRateInput}
                  onChange={(e) => {
                    setDistrictRateInput(e.target.value)
                    setErrorMessage(null)
                  }}
                  placeholder="0.50"
                  className="block w-full bg-transparent px-3 py-2 text-base font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 font-bold text-xs">
                  %
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 m-0 leading-normal">
            Enter only the tax components applicable to your transaction. Leave non-applicable rates at 0%.
          </p>
        </div>

        {/* Quick Example Presets */}
        <div>
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
            Illustrative Rate Presets:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 m-0">
            Sample combinations for quick testing. Enter your specific rates above.
          </p>
        </div>

        {/* Currency Formatting Selector */}
        <div>
          <label
            htmlFor="breakdown-currency"
            className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5"
          >
            3. Currency (Display Formatting)
          </label>
          <div className="relative">
            <select
              id="breakdown-currency"
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
            <span>Calculate Breakdown</span>
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
      {calculation.finalPrice !== undefined && !calculation.error && (
        <div className="mt-4 pt-5 border-t border-slate-100 space-y-4">
          {/* Main Hero Result Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Final Price (Purchase Price + Total Sales Tax)
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                title="Copy breakdown results"
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
              {sym}{calculation.finalPrice.toFixed(2)}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <div>
                Combined Tax Rate:{' '}
                <strong className="text-slate-900 font-bold">
                  {calculation.combinedRate.toFixed(3).replace(/\.?0+$/, '')}%
                </strong>
              </div>
              <div>•</div>
              <div>
                Total Sales Tax Added:{' '}
                <strong className="text-blue-700 font-bold">
                  +{sym}{calculation.totalTax.toFixed(2)}
                </strong>
              </div>
            </div>
          </div>

          {/* Simple Visual Representation of Tax Distribution */}
          {calculation.combinedRate > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
                  Tax Component Distribution
                </span>
                <span className="text-slate-500 font-medium text-[11px]">
                  {calculation.combinedRate.toFixed(3).replace(/\.?0+$/, '')}% Combined
                </span>
              </div>

              {/* Segmented Bar */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                {calculation.stateRate > 0 && (
                  <div
                    style={{ width: `${(calculation.stateRate / calculation.combinedRate) * 100}%` }}
                    className="bg-blue-600 h-full"
                    title={`State: ${calculation.stateRate}% (${sym}${calculation.stateTax.toFixed(2)})`}
                  />
                )}
                {calculation.countyRate > 0 && (
                  <div
                    style={{ width: `${(calculation.countyRate / calculation.combinedRate) * 100}%` }}
                    className="bg-indigo-600 h-full"
                    title={`County: ${calculation.countyRate}% (${sym}${calculation.countyTax.toFixed(2)})`}
                  />
                )}
                {calculation.cityRate > 0 && (
                  <div
                    style={{ width: `${(calculation.cityRate / calculation.combinedRate) * 100}%` }}
                    className="bg-emerald-600 h-full"
                    title={`City: ${calculation.cityRate}% (${sym}${calculation.cityTax.toFixed(2)})`}
                  />
                )}
                {calculation.districtRate > 0 && (
                  <div
                    style={{ width: `${(calculation.districtRate / calculation.combinedRate) * 100}%` }}
                    className="bg-amber-500 h-full"
                    title={`Special District: ${calculation.districtRate}% (${sym}${calculation.districtTax.toFixed(2)})`}
                  />
                )}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 shrink-0" />
                  <span className="text-slate-600 truncate">State: {calculation.stateRate}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 shrink-0" />
                  <span className="text-slate-600 truncate">County: {calculation.countyRate}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 shrink-0" />
                  <span className="text-slate-600 truncate">City: {calculation.cityRate}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0" />
                  <span className="text-slate-600 truncate">District: {calculation.districtRate}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Itemized Results Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs tabular-nums">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 uppercase tracking-wide text-[11px]">
                <tr>
                  <th className="py-2.5 px-3.5">Component</th>
                  <th className="py-2.5 px-3.5">Rate</th>
                  <th className="py-2.5 px-3.5 text-right">Tax Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span>State Sales Tax</span>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-600">{calculation.stateRate.toFixed(2)}%</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-slate-900">
                    +{sym}{calculation.stateTax.toFixed(2)}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                    <span>County Sales Tax</span>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-600">{calculation.countyRate.toFixed(2)}%</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-slate-900">
                    +{sym}{calculation.countyTax.toFixed(2)}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>City / Municipal Tax</span>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-600">{calculation.cityRate.toFixed(2)}%</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-slate-900">
                    +{sym}{calculation.cityTax.toFixed(2)}
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>Special District Tax</span>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-600">{calculation.districtRate.toFixed(2)}%</td>
                  <td className="py-2.5 px-3.5 text-right font-bold text-slate-900">
                    +{sym}{calculation.districtTax.toFixed(2)}
                  </td>
                </tr>

                {/* Subtotals & Grand Total Rows */}
                <tr className="bg-slate-50 font-bold border-t border-slate-200">
                  <td className="py-2.5 px-3.5 text-slate-800">Total Sales Tax</td>
                  <td className="py-2.5 px-3.5 text-slate-800">
                    {calculation.combinedRate.toFixed(3).replace(/\.?0+$/, '')}%
                  </td>
                  <td className="py-2.5 px-3.5 text-right text-blue-700 font-extrabold">
                    +{sym}{calculation.totalTax.toFixed(2)}
                  </td>
                </tr>

                <tr className="bg-blue-50/50 font-extrabold border-t border-blue-100">
                  <td className="py-2.5 px-3.5 text-slate-900">Final Price (Grand Total)</td>
                  <td className="py-2.5 px-3.5 text-slate-500 font-normal">Pre-tax + Tax</td>
                  <td className="py-2.5 px-3.5 text-right text-slate-900 text-sm">
                    {sym}{calculation.finalPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Taxable Base Assumption Note */}
          <p className="text-[11px] text-slate-500 m-0 leading-relaxed italic">
            Illustrative breakdown: each entered rate is applied independently to the taxable purchase amount. Actual jurisdiction rules may use different taxable bases or calculation methods.
          </p>

          {/* Mathematical Step-by-Step Breakdown */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 space-y-1 font-mono">
            <div className="font-sans font-bold text-[11px] text-slate-800 uppercase tracking-wide">
              Calculation Logic:
            </div>
            <div>• Base Purchase Price: {sym}{calculation.price.toFixed(2)}</div>
            <div>• State: {sym}{calculation.price.toFixed(2)} × ({calculation.stateRate}% ÷ 100) = {sym}{calculation.stateTax.toFixed(2)}</div>
            <div>• County: {sym}{calculation.price.toFixed(2)} × ({calculation.countyRate}% ÷ 100) = {sym}{calculation.countyTax.toFixed(2)}</div>
            <div>• City: {sym}{calculation.price.toFixed(2)} × ({calculation.cityRate}% ÷ 100) = {sym}{calculation.cityTax.toFixed(2)}</div>
            <div>• Special District: {sym}{calculation.price.toFixed(2)} × ({calculation.districtRate}% ÷ 100) = {sym}{calculation.districtTax.toFixed(2)}</div>
            <div>• Combined Rate: {calculation.stateRate}% + {calculation.countyRate}% + {calculation.cityRate}% + {calculation.districtRate}% = {calculation.combinedRate.toFixed(3).replace(/\.?0+$/, '')}%</div>
            <div>• Total Tax: {sym}{calculation.stateTax.toFixed(2)} + {sym}{calculation.countyTax.toFixed(2)} + {sym}{calculation.cityTax.toFixed(2)} + {sym}{calculation.districtTax.toFixed(2)} = {sym}{calculation.totalTax.toFixed(2)}</div>
            <div>• Final Total: {sym}{calculation.price.toFixed(2)} + {sym}{calculation.totalTax.toFixed(2)} = {sym}{calculation.finalPrice.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
