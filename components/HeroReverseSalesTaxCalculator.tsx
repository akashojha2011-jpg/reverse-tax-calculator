'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Copy,
  Check,
  RotateCcw,
  Calculator,
  Info,
  ShieldCheck,
  ArrowRight,
  SlidersHorizontal,
  FileSpreadsheet,
  Layers,
  HelpCircle,
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

  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  // Popular quick tax rate presets
  const quickRates = [
    { label: '4% (NY)', rate: '4' },
    { label: '6% (FL)', rate: '6' },
    { label: '6.25% (TX)', rate: '6.25' },
    { label: '7.25% (CA)', rate: '7.25' },
    { label: '8.25% (TX Avg)', rate: '8.25' },
    { label: '8.875% (NYC)', rate: '8.875' },
    { label: '10%', rate: '10' },
  ]

  // Handle State selection
  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    setSelectedStateSlug(slug)
    setErrorMsg(null)

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

      // If split tax is active
      let stateTaxAmount = 0
      let localTaxAmount = 0
      if (enableSplitTax && activeCombinedRate > 0) {
        const sRate = parseFloat(stateRateInput) || 0
        const lRate = parseFloat(localRateInput) || 0
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
      // Forward calculation
      const res = calculateForwardSalesTax(amt, activeCombinedRate)
      const taxSharePercent = res.totalAmount > 0 ? (res.taxAmount / res.totalAmount) * 100 : 0

      let stateTaxAmount = 0
      let localTaxAmount = 0
      if (enableSplitTax && activeCombinedRate > 0) {
        const sRate = parseFloat(stateRateInput) || 0
        const lRate = parseFloat(localRateInput) || 0
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
    setErrorMsg(null)
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
      className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 md:p-7 transition-all text-slate-900 space-y-5"
    >
      {/* Top Header & Calculation Direction Toggle */}
      <div className="space-y-3 pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Tax Engine
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Reset calculator inputs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Tactile Direction Switcher: Reverse vs Forward */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setCalcMode('reverse')
              if (amountInput === '100.00') setAmountInput('108.00')
            }}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              calcMode === 'reverse'
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🔄 Remove Tax (Reverse)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCalcMode('forward')
              if (amountInput === '108.00') setAmountInput('100.00')
            }}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              calcMode === 'forward'
                ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>➕ Add Tax (Forward)</span>
          </button>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="hero-amount-input"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700"
            >
              {calcMode === 'reverse' ? 'Total Price Including Tax (Receipt Amount)' : 'Pre-Tax Subtotal (Sticker Price)'}
            </label>
            <span className="text-[11px] text-slate-500 font-medium font-mono">
              {calcMode === 'reverse' ? 'Gross Total' : 'Net Base'}
            </span>
          </div>

          <div className="relative rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-mono font-bold text-lg">
              $
            </span>
            <input
              id="hero-amount-input"
              type="number"
              step="any"
              min="0"
              value={amountInput}
              onChange={(e) => {
                setAmountInput(e.target.value)
                setErrorMsg(null)
              }}
              placeholder={calcMode === 'reverse' ? '108.00' : '100.00'}
              className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl font-bold font-mono text-slate-900 outline-none placeholder:text-slate-300"
              required
            />
          </div>
        </div>

        {/* State Auto-Fill Dropdown */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="hero-state-select"
              className="block text-xs font-bold text-slate-700"
            >
              Select US State <span className="font-normal text-slate-500">(auto-fills statutory rate)</span>:
            </label>
            {selectedStateData && (
              <Link
                href={`/${selectedStateData.slug}-reverse-sales-tax-calculator`}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
              >
                <span>{selectedStateData.name} Tax Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <select
            id="hero-state-select"
            value={selectedStateSlug}
            onChange={handleStateSelect}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer shadow-2xs"
          >
            <option value="">-- Choose State (or enter custom rate below) --</option>
            {US_TAX_RATES_ARRAY.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({s.baseRate}% base{s.hasLocalTaxes ? ` / up to ${s.maxCombinedRate}% combined` : ''})
              </option>
            ))}
          </select>
        </div>

        {/* Tax Rate Input Section */}
        {!enableSplitTax ? (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="hero-tax-rate"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Sales Tax Rate (%)
              </label>
              <button
                type="button"
                onClick={() => setEnableSplitTax(true)}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Split State & Local Rates</span>
              </button>
            </div>

            <div className="relative rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
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
              <span className="text-slate-400 text-[11px] font-medium mr-0.5">Presets:</span>
              {quickRates.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setTaxRateInput(item.rate)
                    setSelectedStateSlug('')
                    setErrorMsg(null)
                  }}
                  className={`px-2 py-0.5 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
                    taxRateInput === item.rate && !selectedStateSlug
                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                      : 'border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Advanced: Split State & Local Rates */
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-900 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Split State & Local Tax Jurisdictions</span>
              </span>
              <button
                type="button"
                onClick={() => setEnableSplitTax(false)}
                className="text-[11px] font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                Switch to Single Rate
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="split-state-rate" className="block text-[11px] font-bold text-slate-700 mb-1">
                  State Base Rate (%)
                </label>
                <div className="relative rounded-lg border border-slate-300 bg-white">
                  <input
                    id="split-state-rate"
                    type="number"
                    step="any"
                    value={stateRateInput}
                    onChange={(e) => setStateRateInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-sm font-bold font-mono outline-none"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="split-local-rate" className="block text-[11px] font-bold text-slate-700 mb-1">
                  County/City Rate (%)
                </label>
                <div className="relative rounded-lg border border-slate-300 bg-white">
                  <input
                    id="split-local-rate"
                    type="number"
                    step="any"
                    value={localRateInput}
                    onChange={(e) => setLocalRateInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-sm font-bold font-mono outline-none"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-blue-900 font-semibold flex items-center justify-between pt-1 border-t border-blue-200/60">
              <span>Combined Effective Tax Rate:</span>
              <span className="font-mono font-extrabold text-sm">{activeCombinedRate}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Validation Error Message */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Real-Time Calculation Results & Itemized Breakdown */}
      {calculation && (
        <div className="rounded-xl bg-slate-50 border border-slate-200/90 p-4 sm:p-5 space-y-4 shadow-2xs">
          {/* Header & Copy Button */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {calcMode === 'reverse' ? 'Reverse Calculation Breakdown' : 'Forward Tax Calculation'}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied Breakdown</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Breakdown</span>
                </>
              )}
            </button>
          </div>

          {/* Primary Highlight Metric */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">
              {calcMode === 'reverse' ? 'Original Pre-Tax Price (Net Subtotal)' : 'Final Checkout Total (With Tax)'}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-slate-900 mt-0.5">
              {formatCurrency(calcMode === 'reverse' ? calculation.net : calculation.gross)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {calcMode === 'reverse'
                ? `Base price before ${calculation.rate}% sales tax was applied to this transaction.`
                : `Total amount due at checkout including ${calculation.rate}% sales tax.`}
            </div>
          </div>

          {/* 3 Secondary Financial Metrics */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500">Sales Tax Amount</div>
              <div className="text-base sm:text-lg font-bold font-mono text-emerald-700 mt-0.5">
                {formatCurrency(calculation.tax)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                {calculation.taxSharePercent.toFixed(1)}% of total
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500">
                {calcMode === 'reverse' ? 'Gross Total' : 'Pre-Tax Base'}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-900 mt-0.5">
                {formatCurrency(calcMode === 'reverse' ? calculation.gross : calculation.net)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                Receipt total
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-semibold text-slate-500">Applied Rate</div>
              <div className="text-base sm:text-lg font-bold font-mono text-blue-700 mt-0.5">
                {calculation.rate}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                Divisor: {calculation.divisor.toFixed(4)}
              </div>
            </div>
          </div>

          {/* Multi-Jurisdiction Tier Split if applicable */}
          {enableSplitTax && (
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5 shadow-2xs">
              <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                Jurisdiction Tax Distribution:
              </div>
              <div className="flex justify-between text-slate-600 font-mono">
                <span>State Tax ({stateRateInput}%):</span>
                <span className="font-bold text-slate-900">{formatCurrency(calculation.stateTaxAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-mono">
                <span>County / City Tax ({localRateInput}%):</span>
                <span className="font-bold text-slate-900">{formatCurrency(calculation.localTaxAmount)}</span>
              </div>
            </div>
          )}

          {/* Mathematical Formula Verification */}
          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-mono space-y-1 shadow-2xs">
            <div className="text-[11px] text-slate-500 font-sans font-bold uppercase tracking-wider">
              Formula Verification:
            </div>
            {calcMode === 'reverse' ? (
              <>
                <div>Pre-Tax Price = ${calculation.gross.toFixed(2)} ÷ {calculation.divisor.toFixed(4)} = <strong>${calculation.net.toFixed(2)}</strong></div>
                <div>Sales Tax Paid = ${calculation.gross.toFixed(2)} - ${calculation.net.toFixed(2)} = <strong className="text-emerald-700">${calculation.tax.toFixed(2)}</strong></div>
              </>
            ) : (
              <>
                <div>Sales Tax = ${calculation.net.toFixed(2)} × ({calculation.rate} / 100) = <strong className="text-emerald-700">${calculation.tax.toFixed(2)}</strong></div>
                <div>Total Due = ${calculation.net.toFixed(2)} + ${calculation.tax.toFixed(2)} = <strong>${calculation.gross.toFixed(2)}</strong></div>
              </>
            )}
          </div>

          {/* Educational Callout: The Subtraction Trap */}
          {calcMode === 'reverse' && calculation.rate > 0 && (
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Avoid the Common Subtraction Error:</strong> Subtracting {calculation.rate}% directly from ${calculation.gross.toFixed(2)} produces{' '}
                <span className="line-through font-mono text-red-600">
                  ${(calculation.gross - calculation.gross * (calculation.rate / 100)).toFixed(2)}
                </span>
                . The mathematically correct pre-tax price is{' '}
                <strong className="text-emerald-900 font-mono">${calculation.net.toFixed(2)}</strong> (obtained by dividing by {calculation.divisor.toFixed(4)}).
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Trust Indicator */}
      <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Verified for 2026 US Statutory Rates</span>
        </div>
        <span className="text-[11px]">2-Decimal Rounding</span>
      </div>
    </div>
  )
}
