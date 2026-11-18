'use client'

import React, { useState, useEffect } from 'react'
import {
  calculateReverseTax,
  calculateReverseTaxRate,
  calculateDualTax,
  calculateReverseTaxAndTip,
  calculateNetToGrossEstimate,
} from '@/lib/tax-math'
import { ResultDisplay } from './ResultDisplay'
import { RotateCcw } from 'lucide-react'

export type CalcMode =
  | 'sales-tax'
  | 'vat'
  | 'gst'
  | 'hst'
  | 'dual-tax'
  | 'solve-rate'
  | 'tax-and-tip'
  | 'income-tax'

interface CalculatorCardProps {
  initialMode?: CalcMode
  defaultGross?: number
  defaultTaxRate?: number
  defaultSecondTaxRate?: number
  defaultSecondTaxName?: string
  taxName?: string
  currencySymbol?: string
  regionName?: string
  isCompounded?: boolean
  hideModeSwitcher?: boolean
}

export function CalculatorCard({
  initialMode = 'sales-tax',
  defaultGross = 107,
  defaultTaxRate = 7,
  defaultSecondTaxRate,
  defaultSecondTaxName = 'PST',
  taxName = 'Sales Tax',
  currencySymbol = '$',
  regionName,
  isCompounded = false,
  hideModeSwitcher = false,
}: CalculatorCardProps) {
  const [mode, setMode] = useState<CalcMode>(initialMode)
  const [grossInput, setGrossInput] = useState<string>(defaultGross.toString())
  const [taxRateInput, setTaxRateInput] = useState<string>(defaultTaxRate.toString())
  const [secondTaxRateInput, setSecondTaxRateInput] = useState<string>(
    defaultSecondTaxRate !== undefined ? defaultSecondTaxRate.toString() : '7'
  )
  const [netInput, setNetInput] = useState<string>('100')
  const [tipRateInput, setTipRateInput] = useState<string>('15')
  const [effectivePayrollRate, setEffectivePayrollRate] = useState<string>('22')

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Quick presets for fast tactile interaction
  const popularAmounts = [50, 100, 107, 250, 500]
  const popularUsRates = [
    { label: 'NY 4%', rate: 4 },
    { label: 'FL 6%', rate: 6 },
    { label: 'TX 6.25%', rate: 6.25 },
    { label: 'CA 7.25%', rate: 7.25 },
    { label: 'NYC 8.875%', rate: 8.875 },
    { label: '10%', rate: 10 },
  ]

  const handleReset = () => {
    setGrossInput(defaultGross.toString())
    setTaxRateInput(defaultTaxRate.toString())
    setNetInput('100')
    setTipRateInput('15')
    setEffectivePayrollRate('22')
    setErrorMsg(null)
  }

  // Computed results state
  const [calcResult, setCalcResult] = useState<{
    netAmount: number
    taxAmount: number
    grossAmount: number
    secondTaxAmount?: number
    secondTaxName?: string
    tipAmount?: number
    formulaNote?: string
    isPayroll?: boolean
    payrollDisclaimer?: string
  }>({
    netAmount: 0,
    taxAmount: 0,
    grossAmount: 0,
  })

  useEffect(() => {
    setErrorMsg(null)
    const grossVal = parseFloat(grossInput)
    const rateVal = parseFloat(taxRateInput)
    const netVal = parseFloat(netInput)
    const secondRateVal = parseFloat(secondTaxRateInput)
    const tipRateVal = parseFloat(tipRateInput)
    const payrollRateVal = parseFloat(effectivePayrollRate)

    try {
      if (mode === 'dual-tax' || defaultSecondTaxRate !== undefined) {
        if (isNaN(grossVal) || isNaN(rateVal) || isNaN(secondRateVal)) return
        const res = calculateDualTax(
          grossVal,
          rateVal,
          secondRateVal,
          isCompounded,
          taxName,
          defaultSecondTaxName
        )
        setCalcResult({
          netAmount: res.netAmount,
          taxAmount: res.tax1Amount,
          secondTaxAmount: res.tax2Amount,
          secondTaxName: defaultSecondTaxName,
          grossAmount: res.grossAmount,
          formulaNote: `Net = ${currencySymbol}${res.grossAmount} ÷ (1 + ${rateVal}% + ${secondRateVal}%) = ${currencySymbol}${res.netAmount}`,
        })
      } else if (mode === 'solve-rate') {
        if (isNaN(grossVal) || isNaN(netVal) || netVal <= 0 || grossVal < netVal) {
          setErrorMsg('Gross amount must be greater than or equal to Net amount.')
          return
        }
        const res = calculateReverseTaxRate(grossVal, netVal)
        setCalcResult({
          netAmount: res.netAmount,
          taxAmount: res.taxAmount,
          grossAmount: res.grossAmount,
          formulaNote: `Tax Rate = (${currencySymbol}${grossVal} ÷ ${currencySymbol}${netVal}) - 1 = ${res.taxRatePercentage}%`,
        })
      } else if (mode === 'tax-and-tip') {
        if (isNaN(grossVal) || isNaN(rateVal) || isNaN(tipRateVal)) return
        const res = calculateReverseTaxAndTip(grossVal, rateVal, tipRateVal)
        setCalcResult({
          netAmount: res.netAmount,
          taxAmount: res.taxAmount,
          tipAmount: res.tipAmount,
          grossAmount: res.totalPaid,
          formulaNote: `Subtotal = ${currencySymbol}${grossVal} ÷ (1 + ${rateVal}% tax + ${tipRateVal}% tip) = ${currencySymbol}${res.netAmount}`,
        })
      } else if (mode === 'income-tax') {
        if (isNaN(netVal) || isNaN(payrollRateVal)) return
        const res = calculateNetToGrossEstimate(netVal, payrollRateVal)
        setCalcResult({
          netAmount: res.targetNet,
          taxAmount: res.estimatedTaxWithheld,
          grossAmount: res.estimatedGross,
          isPayroll: true,
          payrollDisclaimer: res.disclaimer,
          formulaNote: `Required Gross = ${currencySymbol}${netVal} ÷ (1 - ${payrollRateVal}%) = ${currencySymbol}${res.estimatedGross}`,
        })
      } else {
        // Standard single tax
        if (isNaN(grossVal) || isNaN(rateVal)) return
        const res = calculateReverseTax(grossVal, rateVal)
        setCalcResult({
          netAmount: res.netAmount,
          taxAmount: res.taxAmount,
          grossAmount: res.grossAmount,
          formulaNote: `Pre-Tax Net = ${currencySymbol}${res.grossAmount} ÷ (1 + ${rateVal}%) = ${currencySymbol}${res.netAmount}`,
        })
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid input')
    }
  }, [
    mode,
    grossInput,
    taxRateInput,
    secondTaxRateInput,
    netInput,
    tipRateInput,
    effectivePayrollRate,
    isCompounded,
    taxName,
    defaultSecondTaxName,
    defaultSecondTaxRate,
    currencySymbol,
  ])

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 transition-all text-slate-900">
      {/* Top Header & Reset */}
      <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-700">
          {regionName ? `${regionName} Reverse ${taxName} Calculator` : 'Reverse Tax Calculator'}
        </span>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Reset to defaults"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Mode Switcher Tabs */}
      {!hideModeSwitcher && (
        <div className="mb-5">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setMode('sales-tax')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                mode === 'sales-tax'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reverse Tax
            </button>
            <button
              onClick={() => setMode('vat')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                mode === 'vat'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              VAT (20%)
            </button>
            <button
              onClick={() => setMode('gst')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                mode === 'gst'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              GST / HST
            </button>
            <button
              onClick={() => setMode('solve-rate')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                mode === 'solve-rate'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Solve Rate %
            </button>
            <button
              onClick={() => setMode('tax-and-tip')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                mode === 'tax-and-tip'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tax + Tip
            </button>
            <button
              onClick={() => setMode('income-tax')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                mode === 'income-tax'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Net to Gross
            </button>
          </div>
        </div>
      )}

      {/* Input Rows */}
      <div className="space-y-4">
        {mode === 'solve-rate' ? (
          <>
            <div>
              <label
                htmlFor="gross-amount-input-card"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Total Receipt Price (Gross)
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-base sm:text-lg">
                  {currencySymbol}
                </div>
                <input
                  id="gross-amount-input-card"
                  type="number"
                  step="any"
                  value={grossInput}
                  onChange={(e) => setGrossInput(e.target.value)}
                  className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder="107.00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="net-amount-input-card"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Pre-Tax Subtotal (Net Price)
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-base sm:text-lg">
                  {currencySymbol}
                </div>
                <input
                  id="net-amount-input-card"
                  type="number"
                  step="any"
                  value={netInput}
                  onChange={(e) => setNetInput(e.target.value)}
                  className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder="100.00"
                />
              </div>
            </div>
          </>
        ) : mode === 'income-tax' ? (
          <>
            <div>
              <label
                htmlFor="target-net-input-card"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Target Take-Home Pay (Net)
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-base sm:text-lg">
                  {currencySymbol}
                </div>
                <input
                  id="target-net-input-card"
                  type="number"
                  step="any"
                  value={netInput}
                  onChange={(e) => setNetInput(e.target.value)}
                  className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder="4000.00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="effective-rate-input-card"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Effective Withholding Rate (%)
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <input
                  id="effective-rate-input-card"
                  type="number"
                  step="any"
                  value={effectivePayrollRate}
                  onChange={(e) => setEffectivePayrollRate(e.target.value)}
                  className="block w-full bg-transparent pl-4 pr-8 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder="22"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-semibold text-base">
                  %
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Primary Gross Input */}
            <div>
              <label
                htmlFor="total-price-input-card"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Total Receipt Amount (Tax Included)
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold text-base sm:text-lg">
                  {currencySymbol}
                </div>
                <input
                  id="total-price-input-card"
                  type="number"
                  step="any"
                  value={grossInput}
                  onChange={(e) => setGrossInput(e.target.value)}
                  className="block w-full bg-transparent pl-8 pr-4 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder="107.00"
                />
              </div>

              {/* Quick Amount Preset Chips */}
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-slate-400 mr-0.5">Quick:</span>
                {popularAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setGrossInput(amt.toString())}
                    className={`px-2.5 py-1 text-xs tabular-nums rounded-md border transition-all cursor-pointer ${
                      grossInput === amt.toString()
                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tax Rate Input */}
            <div>
              <label
                htmlFor="tax-rate-percentage-input-card"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {regionName ? `${regionName} ${taxName} Rate (%)` : `Combined Sales Tax Rate (%)`}
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                <input
                  id="tax-rate-percentage-input-card"
                  type="number"
                  step="any"
                  value={taxRateInput}
                  onChange={(e) => setTaxRateInput(e.target.value)}
                  className="block w-full bg-transparent pl-4 pr-8 py-2.5 text-xl sm:text-2xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                  placeholder="7"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-semibold text-base">
                  %
                </div>
              </div>

              {/* Quick Rate Preset Chips */}
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[11px] text-slate-400 mr-0.5">Rates:</span>
                {popularUsRates.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setTaxRateInput(item.rate.toString())}
                    className={`px-2.5 py-1 text-xs tabular-nums font-medium rounded-md border transition-all cursor-pointer ${
                      taxRateInput === item.rate.toString()
                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {(mode === 'dual-tax' || defaultSecondTaxRate !== undefined) && (
              <div>
                <label
                  htmlFor="second-tax-rate-input-card"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {defaultSecondTaxName} Rate (%)
                </label>
                <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                  <input
                    id="second-tax-rate-input-card"
                    type="number"
                    step="any"
                    value={secondTaxRateInput}
                    onChange={(e) => setSecondTaxRateInput(e.target.value)}
                    className="block w-full bg-transparent pl-4 pr-8 py-2.5 text-xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                    placeholder="7"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-semibold text-base">
                    %
                  </div>
                </div>
              </div>
            )}

            {mode === 'tax-and-tip' && (
              <div>
                <label
                  htmlFor="tip-rate-input-card"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Tip Percentage (%)
                </label>
                <div className="relative rounded-xl border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all bg-white">
                  <input
                    id="tip-rate-input-card"
                    type="number"
                    step="any"
                    value={tipRateInput}
                    onChange={(e) => setTipRateInput(e.target.value)}
                    className="block w-full bg-transparent pl-4 pr-8 py-2.5 text-xl font-bold tabular-nums text-slate-900 outline-none placeholder:text-slate-300"
                    placeholder="15"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-semibold text-base">
                    %
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Result Display */}
      {!errorMsg && (
        <ResultDisplay
          netAmount={calcResult.netAmount}
          taxAmount={calcResult.taxAmount}
          grossAmount={calcResult.grossAmount}
          secondTaxName={calcResult.secondTaxName}
          secondTaxAmount={calcResult.secondTaxAmount}
          tipAmount={calcResult.tipAmount}
          currencySymbol={currencySymbol}
          taxLabel={taxName}
          formulaNote={calcResult.formulaNote}
          isPayroll={calcResult.isPayroll}
          payrollDisclaimer={calcResult.payrollDisclaimer}
        />
      )}
    </div>
  )
}
