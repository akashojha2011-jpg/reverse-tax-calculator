'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface ResultDisplayProps {
  netAmount: number
  taxAmount: number
  grossAmount: number
  currencySymbol?: string
  taxLabel?: string
  formulaNote?: string
  secondTaxName?: string
  secondTaxAmount?: number
  tipAmount?: number
  isPayroll?: boolean
  payrollDisclaimer?: string
  onCalculated?: () => void
}

export function ResultDisplay({
  netAmount,
  taxAmount,
  grossAmount,
  currencySymbol = '$',
  taxLabel = 'Sales Tax',
  formulaNote,
  secondTaxName,
  secondTaxAmount,
  tipAmount,
  isPayroll = false,
  payrollDisclaimer,
  onCalculated,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false)

  const formatCurrency = (val: number) => {
    return `${currencySymbol}${val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const copyBreakdown = () => {
    let text = `Total Paid (Gross): ${formatCurrency(grossAmount)}\nPre-Tax Subtotal (Net): ${formatCurrency(netAmount)}\n`
    if (secondTaxName && secondTaxAmount !== undefined) {
      text += `${taxLabel}: ${formatCurrency(taxAmount)}\n${secondTaxName}: ${formatCurrency(secondTaxAmount)}\nTotal Tax: ${formatCurrency(taxAmount + secondTaxAmount)}`
    } else if (tipAmount !== undefined) {
      text += `Tax: ${formatCurrency(taxAmount)}\nTip: ${formatCurrency(tipAmount)}`
    } else {
      text += `${taxLabel}: ${formatCurrency(taxAmount)}`
    }

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (onCalculated) onCalculated()
  }

  const totalTax = taxAmount + (secondTaxAmount || 0)

  return (
    <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-5 space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {isPayroll ? 'Payroll Breakdown' : 'Calculation Results'}
        </span>

        <button
          onClick={copyBreakdown}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          title="Copy results to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Primary Hero Display: Net Pre-Tax Amount */}
      <div className="rounded-lg bg-white border border-slate-200 p-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {isPayroll ? 'Target Net Take-Home Pay' : 'Pre-Tax Price (Net Subtotal)'}
        </div>

        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 tabular-nums mt-0.5">
          {formatCurrency(netAmount)}
        </div>

        <p className="text-xs text-slate-500 mt-1 mb-0">
          {isPayroll
            ? 'Estimated net take-home earnings after withholdings.'
            : 'Original subtotal before sales tax was calculated.'}
        </p>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Tax Paid Box */}
        <div className="rounded-lg bg-white border border-slate-200 p-3.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {isPayroll ? 'Estimated Tax' : `${taxLabel} Amount`}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums mt-0.5">
            {formatCurrency(totalTax)}
          </div>
          {secondTaxName && secondTaxAmount !== undefined && (
            <div className="text-[11px] text-slate-500 mt-1.5 flex justify-between tabular-nums pt-1.5 border-t border-slate-100">
              <span>{taxLabel}: {formatCurrency(taxAmount)}</span>
              <span>{secondTaxName}: {formatCurrency(secondTaxAmount)}</span>
            </div>
          )}
          {tipAmount !== undefined && (
            <div className="text-[11px] text-slate-500 mt-1.5 flex justify-between tabular-nums pt-1.5 border-t border-slate-100">
              <span>Tax: {formatCurrency(taxAmount)}</span>
              <span>Tip: {formatCurrency(tipAmount)}</span>
            </div>
          )}
        </div>

        {/* Gross Total Box */}
        <div className="rounded-lg bg-white border border-slate-200 p-3.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {isPayroll ? 'Gross Pay Required' : 'Total Price (Gross Receipt)'}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums mt-0.5">
            {formatCurrency(grossAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5 tabular-nums pt-1.5 border-t border-slate-100">
            Total tax-inclusive amount
          </div>
        </div>
      </div>

      {/* Formula Explanation Note */}
      {formulaNote && (
        <div className="rounded-lg bg-white border border-slate-200 p-3 text-xs text-slate-600">
          <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wide mb-0.5">
            Formula Check:
          </span>
          <span className="tabular-nums">{formulaNote}</span>
        </div>
      )}

      {/* Payroll Disclaimer if applicable */}
      {payrollDisclaimer && (
        <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200 font-sans">
          <strong>Note:</strong> {payrollDisclaimer}
        </div>
      )}
    </div>
  )
}
