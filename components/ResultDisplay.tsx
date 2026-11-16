'use client'

import React, { useState } from 'react'
import { Copy, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

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
    <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200/90 p-5 sm:p-6 shadow-2xs transition-all">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isPayroll ? 'Payroll Computation' : 'Calculation Breakdown'}
          </span>
        </div>

        <button
          onClick={copyBreakdown}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer"
          title="Copy breakdown to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Breakdown</span>
            </>
          )}
        </button>
      </div>

      {/* Primary Hero Display: Net Pre-Tax Amount */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 sm:p-5 mb-4 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
          <span className="uppercase tracking-wider font-bold text-slate-500">
            {isPayroll ? 'Target Net Take-Home Pay' : 'Pre-Tax Subtotal (Original Price)'}
          </span>
          <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Verified Net
          </span>
        </div>

        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono tracking-tight text-slate-900 mt-1">
          {formatCurrency(netAmount)}
        </div>

        <p className="text-xs text-slate-500 mt-2 mb-0">
          {isPayroll
            ? 'Net take-home cash received after federal and state withholdings.'
            : 'The base expense amount before any sales tax was applied.'}
        </p>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Tax Paid Box */}
        <div className="rounded-xl bg-white border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {isPayroll ? 'Est. Tax Withheld' : `${taxLabel} Paid`}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 mt-1">
            {formatCurrency(totalTax)}
          </div>
          {secondTaxName && secondTaxAmount !== undefined && (
            <div className="text-[11px] text-slate-500 mt-1.5 flex justify-between font-mono pt-1.5 border-t border-slate-100">
              <span>{taxLabel}: {formatCurrency(taxAmount)}</span>
              <span>{secondTaxName}: {formatCurrency(secondTaxAmount)}</span>
            </div>
          )}
          {tipAmount !== undefined && (
            <div className="text-[11px] text-slate-500 mt-1.5 flex justify-between font-mono pt-1.5 border-t border-slate-100">
              <span>Tax: {formatCurrency(taxAmount)}</span>
              <span>Tip: {formatCurrency(tipAmount)}</span>
            </div>
          )}
        </div>

        {/* Gross Total Box */}
        <div className="rounded-xl bg-white border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {isPayroll ? 'Est. Gross Required' : 'Total Price (Gross Receipt)'}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1">
            {formatCurrency(grossAmount)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5 font-mono pt-1.5 border-t border-slate-100">
            100% Tax-Inclusive Total
          </div>
        </div>
      </div>

      {/* Formula Explanation Note */}
      {formulaNote && (
        <div className="rounded-xl bg-white border border-slate-200 p-3.5 text-xs text-slate-700 font-mono flex items-start gap-2 shadow-2xs">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-slate-500 block text-[11px] uppercase tracking-wider mb-0.5 font-sans font-bold">
              Formula Breakdown:
            </span>
            <span>{formulaNote}</span>
          </div>
        </div>
      )}

      {/* Payroll Disclaimer if applicable */}
      {payrollDisclaimer && (
        <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3 font-sans">
          <strong>Note:</strong> {payrollDisclaimer}
        </div>
      )}
    </div>
  )
}
