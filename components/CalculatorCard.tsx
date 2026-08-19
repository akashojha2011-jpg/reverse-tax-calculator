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
import { DismissibleNudge } from './DismissibleNudge'

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

  const [hasCalculated, setHasCalculated] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
          formulaNote: `Net = ${currencySymbol}${res.grossAmount} ÷ (1 + ${rateVal}% GST + ${secondRateVal}% ${defaultSecondTaxName}) = ${currencySymbol}${res.netAmount}`,
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
          formulaNote: `Solved Tax Rate = (${currencySymbol}${grossVal} ÷ ${currencySymbol}${netVal}) - 1 = ${res.taxRatePercentage}%`,
        })
      } else if (mode === 'tax-and-tip') {
        if (isNaN(grossVal) || isNaN(rateVal) || isNaN(tipRateVal)) return
        const res = calculateReverseTaxAndTip(grossVal, rateVal, tipRateVal)
        setCalcResult({
          netAmount: res.netAmount,
          taxAmount: res.taxAmount,
          tipAmount: res.tipAmount,
          grossAmount: res.totalPaid,
          formulaNote: `Subtotal Net = ${currencySymbol}${grossVal} ÷ (1 + ${rateVal}% tax + ${tipRateVal}% tip) = ${currencySymbol}${res.netAmount}`,
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
          formulaNote: `Estimated Gross = ${currencySymbol}${netVal} ÷ (1 - ${payrollRateVal}%) = ${currencySymbol}${res.estimatedGross}`,
        })
      } else {
        // Standard single tax
        if (isNaN(grossVal) || isNaN(rateVal)) return
        const res = calculateReverseTax(grossVal, rateVal)
        setCalcResult({
          netAmount: res.netAmount,
          taxAmount: res.taxAmount,
          grossAmount: res.grossAmount,
          formulaNote: `Pre-tax Net = ${currencySymbol}${res.grossAmount} ÷ (1 + ${rateVal}%) = ${currencySymbol}${res.netAmount}`,
        })
      }
      setHasCalculated(true)
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
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-md p-5 md:p-6 transition-all">
      {/* Header badge */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-md">
          {regionName ? `${regionName} Reverse ${taxName} Calculator` : 'Reverse Sales Tax Calculator'}
        </span>
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          ⚡ Instant Client-Side Tool
        </span>
      </div>

      {/* Mode Switcher Tabs */}
      {!hideModeSwitcher && (
        <div className="space-y-1.5 border-b border-slate-100 pb-3.5 mb-5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Select Calculator:
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setMode('sales-tax')}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-md transition-all ${
                mode === 'sales-tax'
                  ? 'bg-brand-600 text-white shadow-xs ring-2 ring-brand-600/20'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100 font-bold border border-brand-200'
              }`}
            >
              ★ Reverse Sales Tax
            </button>
            <button
              onClick={() => setMode('vat')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'vat'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              VAT
            </button>
            <button
              onClick={() => setMode('gst')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'gst'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              GST
            </button>
            <button
              onClick={() => setMode('hst')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'hst'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              HST
            </button>
            <button
              onClick={() => setMode('solve-rate')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'solve-rate'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Solve Rate %
            </button>
            <button
              onClick={() => setMode('tax-and-tip')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'tax-and-tip'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tax + Tip
            </button>
            <button
              onClick={() => setMode('income-tax')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'income-tax'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              <label htmlFor="gross-amount-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Total Price (Gross)
              </label>
              <div className="relative rounded-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-semibold text-sm">
                  {currencySymbol}
                </div>
                <input
                  id="gross-amount-input-card"
                  type="number"
                  step="any"
                  value={grossInput}
                  onChange={(e) => setGrossInput(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 pl-8 pr-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="107.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="net-amount-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Pre-Tax Subtotal (Net)
              </label>
              <div className="relative rounded-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-semibold text-sm">
                  {currencySymbol}
                </div>
                <input
                  id="net-amount-input-card"
                  type="number"
                  step="any"
                  value={netInput}
                  onChange={(e) => setNetInput(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 pl-8 pr-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="100.00"
                />
              </div>
            </div>
          </>
        ) : mode === 'income-tax' ? (
          <>
            <div>
              <label htmlFor="target-net-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Target Net Pay
              </label>
              <div className="relative rounded-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-semibold text-sm">
                  {currencySymbol}
                </div>
                <input
                  id="target-net-input-card"
                  type="number"
                  step="any"
                  value={netInput}
                  onChange={(e) => setNetInput(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 pl-8 pr-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="4000.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="effective-rate-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Effective Income Tax Rate (%)
              </label>
              <div className="relative rounded-lg">
                <input
                  id="effective-rate-input-card"
                  type="number"
                  step="any"
                  value={effectivePayrollRate}
                  onChange={(e) => setEffectivePayrollRate(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all pr-8"
                  placeholder="22"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 font-semibold text-sm">
                  %
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="total-price-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Total Tax-Inclusive Amount (Gross Total)
              </label>
              <div className="relative rounded-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-semibold text-sm">
                  {currencySymbol}
                </div>
                <input
                  id="total-price-input-card"
                  type="number"
                  step="any"
                  value={grossInput}
                  onChange={(e) => setGrossInput(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 pl-8 pr-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                  placeholder="107.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tax-rate-percentage-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                {regionName ? `${regionName} ${taxName} Rate (%)` : `Sales Tax Rate (%)`}
              </label>
              <div className="relative rounded-lg">
                <input
                  id="tax-rate-percentage-input-card"
                  type="number"
                  step="any"
                  value={taxRateInput}
                  onChange={(e) => setTaxRateInput(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all pr-8"
                  placeholder="7"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 font-semibold text-sm">
                  %
                </div>
              </div>
            </div>

            {(mode === 'dual-tax' || defaultSecondTaxRate !== undefined) && (
              <div>
                <label htmlFor="second-tax-rate-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {defaultSecondTaxName} Rate (%)
                </label>
                <div className="relative rounded-lg">
                  <input
                    id="second-tax-rate-input-card"
                    type="number"
                    step="any"
                    value={secondTaxRateInput}
                    onChange={(e) => setSecondTaxRateInput(e.target.value)}
                    className="block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all pr-8"
                    placeholder="7"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 font-semibold text-sm">
                    %
                  </div>
                </div>
              </div>
            )}

            {mode === 'tax-and-tip' && (
              <div>
                <label htmlFor="tip-rate-input-card" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tip Rate (%)
                </label>
                <div className="relative rounded-lg">
                  <input
                    id="tip-rate-input-card"
                    type="number"
                    step="any"
                    value={tipRateInput}
                    onChange={(e) => setTipRateInput(e.target.value)}
                    className="block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base font-bold text-slate-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all pr-8"
                    placeholder="15"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 font-semibold text-sm">
                    %
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Error display */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700">
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

      {hasCalculated && <DismissibleNudge />}
    </div>
  )
}
