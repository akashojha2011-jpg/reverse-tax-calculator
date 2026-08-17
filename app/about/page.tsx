import React from 'react'
import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { ShieldCheck, RefreshCw, Lock, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us & Tax Data Accuracy',
  description:
    'Learn about Reverse Tax Calculator. Maintained by financial tools developers with verified state, provincial, and global tax rates.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbNav items={[{ name: 'About Us', url: '/about' }]} />

      <article className="max-w-text-col mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          About Reverse Tax Calculator
        </h1>

        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          <strong>reversetaxcalculator.pro</strong> is a free, high-precision financial web utility designed to solve one specific problem cleanly: working backwards from tax-included total prices to extract pre-tax net amounts and tax paid.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Financial Precision</h3>
              <p className="text-xs text-slate-600 mb-0">
                All formulas follow exact legal definitions for US sales tax, UK/EU VAT, Canadian GST/HST/PST, and global tax codes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <RefreshCw className="w-6 h-6 text-brand-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Visibly Dated Rates</h3>
              <p className="text-xs text-slate-600 mb-0">
                Tax rates are routinely reviewed and updated. Rates last verified: <strong>August 2026</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Lock className="w-6 h-6 text-brand-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">100% Privacy Focused</h3>
              <p className="text-xs text-slate-600 mb-0">
                All calculations run client-side in your web browser. No financial data or inputs are stored or transmitted.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Zap className="w-6 h-6 text-brand-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">No Distractions</h3>
              <p className="text-xs text-slate-600 mb-0">
                No signups required, no popups, no interstitial ads blocking your calculator workflow.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 pt-6 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Editorial & Data Review</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our calculations are maintained by web tool developers specializing in financial UX and web accessibility. If you notice a tax rate change in your city or province, please notify us via our <a href="/contact" className="text-brand-600 font-semibold underline">Contact page</a> so we can update our single-source database.
          </p>
        </section>
      </article>
    </>
  )
}
