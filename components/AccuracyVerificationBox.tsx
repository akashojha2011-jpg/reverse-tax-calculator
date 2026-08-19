import React from 'react'
import { ShieldCheck, CheckCircle2, Lock, RefreshCw, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export function AccuracyVerificationBox() {
  return (
    <section aria-label="Calculation Methodology & Rate Verification" className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 m-0">
          Calculation Methodology & Rate Verification
        </h3>
      </div>
      
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
        Reverse Tax Calculator Pro uses standard financial formulas to extract pre-tax subtotals from tax-inclusive totals. We aim to provide clear, transparent rate information and calculation methods.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Rate Sourcing</span>
            <span className="text-slate-500">Standard rates cross-referenced against state DOR, IRS, CRA & HMRC public schedules.</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <RefreshCw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Update Schedule</span>
            <span className="text-slate-500">Rate data is periodically reviewed. Last rate check: <strong>August 2026</strong>.</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Standard Accounting Math</span>
            <span className="text-slate-500">Formula based on standard algebraic division: Net = Gross ÷ (1 + Tax Rate).</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <Lock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">100% Client-Side Execution</span>
            <span className="text-slate-500">Calculations run locally in your browser. No financial data is sent or saved.</span>
          </div>
        </div>
      </div>

      {/* Transparent Usage Disclaimer */}
      <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Important Notice:</span>
          <span>
            These tools are provided for estimation and general accounting reference. For official tax filings, complex multi-district local tax rules, or legal tax compliance, please consult a certified tax professional or CPA.
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2 text-right">
        <Link href="/about#verification-policy" className="text-xs font-bold text-blue-600 hover:underline">
          Learn more about our methodology & sourcing →
        </Link>
      </div>
    </section>
  )
}
