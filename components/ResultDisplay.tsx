'use client'

import React, { useState } from 'react'
import { Copy, Check, Info } from 'lucide-react'

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
  taxLabel = 'Tax',
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

  return (
    <div className="mt-5 rounded-xl bg-brand-50 border border-brand-200 p-4 sm:p-5 text-slate-900 transition-all">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-brand-200/80 pb-2.5 mb-3.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-700">
          Calculation Breakdown
        </span>
        <button
          onClick={copyBreakdown}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800 bg-white px-2.5 py-1 rounded-md border border-brand-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
          title="Copy breakdown to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-brand-600" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Main Net Amount Hero Box */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-brand-200/80 shadow-2xs mb-3">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          {isPayroll ? 'Target Net Take-Home Pay' : 'Pre-Tax Amount (Net Subtotal)'}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 tracking-tight mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {formatCurrency(netAmount)}
        </div>
      </div>

      {/* Secondary Breakdown Rows (2 Columns or Stacked) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Tax Amount Box */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {isPayroll ? 'Est. Tax Withheld' : `${taxLabel} Paid`}
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
            {formatCurrency(taxAmount + (secondTaxAmount || 0))}
          </div>
          {secondTaxName && secondTaxAmount !== undefined && (
            <div className="text-[10px] text-slate-500 mt-1 flex justify-between font-medium">
              <span>{taxLabel}: {formatCurrency(taxAmount)}</span>
              <span>{secondTaxName}: {formatCurrency(secondTaxAmount)}</span>
            </div>
          )}
          {tipAmount !== undefined && (
            <div className="text-[10px] text-slate-500 mt-1 flex justify-between font-medium">
              <span>Tax: {formatCurrency(taxAmount)}</span>
              <span>Tip: {formatCurrency(tipAmount)}</span>
            </div>
          )}
        </div>

        {/* Gross Amount Box */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {isPayroll ? 'Est. Gross Salary' : 'Tax-Included Price (Gross)'}
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
            {formatCurrency(grossAmount)}
          </div>
        </div>
      </div>

      {/* Formula Explanation Note */}
      {formulaNote && (
        <div className="flex items-start gap-2 text-xs text-slate-600 bg-white/80 p-2.5 rounded-lg border border-brand-100 mt-3 font-medium">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <span>{formulaNote}</span>
        </div>
      )}

      {/* Payroll Disclaimer if applicable */}
      {payrollDisclaimer && (
        <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-3">
          <strong>Note:</strong> {payrollDisclaimer}
        </div>
      )}
    </div>
  )
}
