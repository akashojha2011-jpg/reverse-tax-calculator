import React from 'react'
import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { Calculator, ShieldCheck, Binary, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax Data Methodology & Mathematical Models | Reverse Tax Calculator',
  description:
    'Comprehensive explanation of our reverse tax formulas, forward tax algorithms, rounding rules, and multi-tier tax breakdown methodologies.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tax-data-methodology',
  },
}

export default function TaxDataMethodologyPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tax Data Methodology', url: '/tax-data-methodology' },
        ]}
      />

      <header className="space-y-3 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
          <Binary className="w-3.5 h-3.5 text-blue-600" />
          Technical & Mathematical Standards
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tax Data Methodology
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          The mathematical principles, rounding conventions, and jurisdictional aggregation models powering our calculators.
        </p>
      </header>

      <section className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        {/* Section 1: The Core Reverse Tax Formula */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">
            1. The Reverse Tax Mathematical Model
          </h2>
          <p>
            When a sales transaction is completed, forward sales tax is legally defined as:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs sm:text-sm text-slate-800">
            Gross Total = Net Subtotal + (Net Subtotal × Tax Rate)
          </div>
          <p>
            Factoring out <code>Net Subtotal</code> yields:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs sm:text-sm text-slate-800">
            Gross Total = Net Subtotal × (1 + Tax Rate)
          </div>
          <p>
            To isolate the original pre-tax price from any tax-inclusive total, our calculation engine applies the reciprocal divisor:
          </p>
          <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl font-mono text-sm font-bold text-blue-900">
            Pre-Tax Net Price = Gross Total ÷ (1 + [r ÷ 100])
          </div>
          <p>
            Where <code>r</code> is the applicable percentage tax rate. The sales tax paid is subsequently calculated by subtracting the pre-tax net amount from the gross total:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs sm:text-sm text-slate-800">
            Sales Tax Paid = Gross Total - Pre-Tax Net Price
          </div>
        </div>

        {/* Section 2: Currency Rounding Conventions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">
            2. Currency Rounding & Precision Standards
          </h2>
          <p>
            In financial computing, floating-point arithmetic (e.g. <code>0.1 + 0.2 = 0.30000000000000004</code>) can introduce fractional precision errors. Our calculation engine utilizes an epsilon-adjusted <strong>Round Half-Up</strong> algorithm matching US Department of Revenue statutes:
          </p>
          <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs sm:text-sm text-slate-800">
            round(value) = Math.round((value + Number.EPSILON) × 100) ÷ 100
          </div>
          <p>
            Under this model, fractional cents of <code>$0.005</code> and higher are systematically rounded up to the nearest whole cent (<code>$0.01</code>), while values strictly below <code>$0.005</code> round down.
          </p>
        </div>

        {/* Section 3: Dual Tax Systems (Canada & Special US Districts) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">
            3. Multi-Tier & Dual Tax Models
          </h2>
          <p>
            Certain jurisdictions employ dual or multiple sales taxes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Additive Dual Tax (e.g., Canadian GST + PST/QST):</strong> Where two separate taxes are levied on the same pre-tax base, the effective rate is <code>r1 + r2</code>. The net subtotal is <code>Total ÷ (1 + [r1 + r2] / 100)</code>, and each tax is calculated proportionally.
            </li>
            <li>
              <strong>Multi-Jurisdiction Allocation (State + County + City + Special District):</strong> In the US, our breakdown engine calculates the common pre-tax subtotal across all overlapping tiers and allocates exact fractional revenues to each respective taxing authority.
            </li>
          </ul>
        </div>

        {/* Section 4: Data Quality & Disclaimers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900">
            4. Geographic Boundary Limitations
          </h2>
          <p>
            ZIP code tax rates reflect the representative weighted combined rate for each postal code. Because US Postal Service delivery routes occasionally cross municipal boundaries, users with transactions along border zones are advised to verify rooftop street-level addresses.
          </p>
        </div>
      </section>
    </div>
  )
}
