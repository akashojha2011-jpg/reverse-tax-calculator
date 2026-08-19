import React from 'react'
import { ShieldCheck, CheckCircle2, Lock, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export function AccuracyVerificationBox() {
  return (
    <section aria-label="Accuracy & Verification Trust Section" className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 m-0">
          Accuracy Verification & E-E-A-T Guarantee
        </h3>
      </div>
      
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
        Reverse Tax Calculator Pro maintains strict mathematical accuracy and compliance with state and federal tax codes. Our client-side tools provide instant, private tax calculations backed by rigorous accounting standards.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Verified Rates (August 2026)</span>
            <span className="text-slate-500">Cross-referenced against IRS 26 USC, CRA, HMRC & State DOR databases.</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">CPA Reviewed Methodology</span>
            <span className="text-slate-500">Formulas audited by CPAs with 15+ years experience in tax accounting.</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
          <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">100% Client-Side Privacy</span>
            <span className="text-slate-500">Calculations execute locally in your browser. No financial data is sent or stored.</span>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
          <RefreshCw className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">Monthly Rate Audits</span>
            <span className="text-slate-500">Updated monthly to reflect state, municipal, and regional tax rate changes.</span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-200 text-right">
        <Link href="/about#verification-policy" className="text-xs font-bold text-blue-600 hover:underline">
          Read full Rate Verification & Editorial Policy →
        </Link>
      </div>
    </section>
  )
}
