import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { AlertTriangle, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Financial & Legal Disclaimer | Reverse Tax Calculator',
  description:
    'Important financial, accounting, and legal disclaimer regarding the calculation tools and tax rate information provided on reversetaxcalculator.pro.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Disclaimer', url: '/disclaimer' },
        ]}
      />

      <header className="space-y-3 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          Financial Notice
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Disclaimer
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Important disclosures regarding the use of Reverse Tax Calculator and its financial estimation tools.
        </p>
      </header>

      <section className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">1. Not Financial, Tax, or Legal Advice</h2>
          <p>
            The calculators, articles, guides, tax rate tables, and data published on <strong>Reverse Tax Calculator</strong> (<code>reversetaxcalculator.pro</code>) are provided strictly for general informational, educational, and quick estimation purposes.
          </p>
          <p>
            The content on this website does not constitute formal tax advice, financial counseling, legal counsel, or certified accounting opinions. Tax laws, exemptions, local surcharges, and filing obligations are complex and subject to interpretation. You should consult a licensed Certified Public Accountant (CPA), certified tax attorney, or your relevant state department of revenue before filing tax returns, submitting commercial invoices, or making binding business decisions.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">2. Calculation Accuracy & Limitations</h2>
          <p>
            While we apply rigorous mathematical models and verify rates against official state revenue publications, tax laws and local municipal boundaries change constantly. We do not warrant or guarantee that the calculations, rates, or exemptions are completely error-free or reflect real-time legislative updates enacted mid-period.
          </p>
          <p>
            Small variances (such as 1-cent differences) may occur between our calculators and cash register receipts due to differing point-of-sale rounding algorithms (e.g. line-item rounding vs. transaction-total rounding) or specific local product-level tax exemptions.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">3. Limitation of Liability</h2>
          <p>
            In no event shall Reverse Tax Calculator, its owners, operators, or contributors be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of or reliance on our calculators, formulas, or informational content.
          </p>
        </div>
      </section>
    </div>
  )
}
