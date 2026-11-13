import React from 'react'
import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { ShieldCheck, CheckCircle2, FileText, RefreshCw, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Editorial Policy & Accuracy Standards | Reverse Tax Calculator',
  description:
    'Our editorial standards, verification process, calculation methodology, and commitment to financial data accuracy.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/editorial-policy',
  },
}

export default function EditorialPolicyPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Editorial Policy', url: '/editorial-policy' },
        ]}
      />

      <header className="space-y-3 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          Editorial Integrity & Standards
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Editorial & Accuracy Policy
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          How we research, verify, maintain, and mathematically validate tax data across all 50 US states and international jurisdictions.
        </p>
      </header>

      <section className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Our Core Commitment to Mathematical Accuracy</span>
          </h2>
          <p>
            At <strong>Reverse Tax Calculator</strong>, precision is our paramount standard. Our calculators are engineered from the ground up using verified financial algorithms and pure decimal mathematics. We strictly test our algorithms against edge cases, including floating-point fractional rounding, line-item versus transaction-level rounding, and multi-tier compounded taxes.
          </p>
          <p>
            Every calculation engine is validated with automated unit tests that verify compliance with official state department of revenue calculation guidelines.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <span>Tax Rate Research & Verification Process</span>
          </h2>
          <p>
            Sales tax rates and exemption rules in the United States change frequently as state legislatures pass budget bills and local voters approve municipal bond measures or transit surcharges. We maintain rate accuracy through:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Primary Government Sources:</strong> We obtain state base rates, municipal rate caps, and local surcharges directly from official state government agencies, including the California Department of Tax and Fee Administration (CDTFA), the New York State Department of Taxation and Finance, the Texas Comptroller, and Florida Department of Revenue.
            </li>
            <li>
              <strong>Scheduled Rate Audits:</strong> Sales tax rates are reviewed bi-annually and whenever major legislative changes take effect (typically January 1 and July 1 of each calendar year).
            </li>
            <li>
              <strong>Exemption Rule Clarity:</strong> Because items like non-prepared grocery foods, prescription drugs, and clothing are often subject to reduced or zero tax, we explicitly disclose state-level exemption rules to prevent user error.
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Editorial Independence & Transparency</span>
          </h2>
          <p>
            Our content and calculator tools are 100% free for public use. We do not accept sponsored content or paid placement that influences our tax calculators or data representations. While our website displays advertising via Google AdSense to cover hosting and development costs, our calculations remain completely independent and objective.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <span>Corrections & User Feedback</span>
          </h2>
          <p>
            If you identify a recently enacted local municipal tax increase or an error in our database, please contact our editorial team immediately at{' '}
            <a href="mailto:admin@reversetaxcalculator.pro" className="font-semibold text-blue-600 hover:underline">
              admin@reversetaxcalculator.pro
            </a>
            . We review reported rate discrepancies against official state gazettes and publish validated updates promptly.
          </p>
        </div>
      </section>
    </div>
  )
}
