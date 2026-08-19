import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { ShieldCheck, RefreshCw, Lock, Zap, FileText, AlertTriangle, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Calculation Methodology, Rate Sourcing & Legal Disclaimer',
  description:
    'Learn how Reverse Tax Calculator sources rate data, our calculation methodology, jurisdiction coverage, and important disclaimers for tax filings.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/about',
  },
}

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://reversetaxcalculator.pro/about#webpage',
        url: 'https://reversetaxcalculator.pro/about',
        name: 'Calculation Methodology & Rate Verification',
        description:
          'Comprehensive breakdown of rate sourcing, calculation methodology, covered jurisdictions, and legal disclaimers.',
      },
      {
        '@type': 'Organization',
        '@id': 'https://reversetaxcalculator.pro/#organization',
        name: 'Reverse Tax Calculator',
        url: 'https://reversetaxcalculator.pro',
        logo: 'https://reversetaxcalculator.pro/icon.png',
        description: 'Free online financial reverse tax tools for sales tax, VAT, GST, HST, and payroll.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          url: 'https://reversetaxcalculator.pro/contact',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <BreadcrumbNav items={[{ name: 'About Us', url: '/about' }]} />

      <article className="max-w-4xl mx-auto space-y-8">
        {/* Header Hero */}
        <header className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            📋 Methodology & Rate Sourcing Standards
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Calculation Methodology & Rate Verification
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed m-0">
            <strong>reversetaxcalculator.pro</strong> is an independent financial web tool designed to simplify reverse tax math. We provide clear, transparent explanations of how tax rates are sourced, how formulas operate, and where the boundaries of automated calculation tools lie.
          </p>
        </header>

        {/* 5 Key Transparency Pillar Cards */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            1. How Tax Rates Are Sourced
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed m-0">
            Our standard sales tax rates, VAT percentages, and GST thresholds are retrieved from public government tax authority rate schedules:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
            <li><strong>United States</strong>: State Departments of Revenue (e.g. CDTFA in California, Texas Comptroller, NY Department of Taxation and Finance).</li>
            <li><strong>Canada</strong>: Canada Revenue Agency (CRA) official GST/HST schedules and provincial tax authorities (Revenu Québec, BC Ministry of Finance).</li>
            <li><strong>United Kingdom & Europe</strong>: HM Revenue & Customs (HMRC) and European Commission VAT databases.</li>
            <li><strong>Australia & International</strong>: Australian Taxation Office (ATO) and national tax departments.</li>
          </ul>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-2 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            2. When Rates Are Updated
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed m-0">
            Tax rates are periodically reviewed against published state and national tax schedule updates. Our rate data was last checked in <strong>August 2026</strong>. When state legislatures or tax authorities adjust base rates, our single-source rate database is updated accordingly.
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            3. Who Reviews & Tests the Tools
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed m-0">
            Calculations are maintained and tested by our financial software research team. Formulas are verified using standard accounting mathematics ($Net = Gross \div (1 + TaxRate)$) and checked against synthetic receipt samples to prevent floating-point rounding errors.
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-2 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            4. Supported Jurisdictions
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed m-0">
            Our calculator database supports state-level and standard rates for:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed">
            <li>All 50 US States + District of Columbia</li>
            <li>Canadian Provinces & Territories (GST, HST, PST, QST)</li>
            <li>United Kingdom (20% Standard VAT, 5% Reduced VAT)</li>
            <li>European Union Member States</li>
            <li>Australia, New Zealand, India, and Singapore GST</li>
          </ul>
        </section>

        {/* 5. When the Calculator Should NOT Be Relied Upon (Disclaimers) */}
        <section className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4 text-amber-950">
          <h2 className="text-2xl font-extrabold text-amber-900 mt-0 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            5. When This Calculator Should NOT Be Relied Upon
          </h2>
          <p className="text-sm leading-relaxed font-medium">
            While our tools strive for mathematical precision, automated web calculators have inherent limitations and should <strong>NOT</strong> be relied upon in the following situations:
          </p>

          <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 leading-relaxed text-amber-900">
            <li>
              <strong>Official Tax Filings & Tax Return Submissions</strong>: Do not use web estimates as sole documentation for filing state tax returns or corporate IRS tax filings without professional verification.
            </li>
            <li>
              <strong>Complex Special Local Tax Districts</strong>: Certain municipalities impose special district taxes (e.g. stadium taxes, tourism surcharges, local transit fees) that may vary by street address or business category.
            </li>
            <li>
              <strong>Product Tax Exemptions & Reduced Tiers</strong>: Certain items (groceries, prescription drugs, agricultural equipment) enjoy tax-exempt status or reduced rates that require specialized tax engine rules.
            </li>
            <li>
              <strong>Legal Compliance Audits</strong>: For formal tax advice, binding legal rulings, or audit representation, always consult a licensed Certified Public Accountant (CPA), Enrolled Agent (EA), or qualified Tax Attorney.
            </li>
          </ul>

          <div className="pt-2 text-xs font-semibold text-amber-800 border-t border-amber-200">
            Notice a rate schedule change in your county or city? Submit data updates to our team via our <Link href="/contact" className="underline font-bold">Contact Page</Link>.
          </div>
        </section>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <Lock className="w-6 h-6 text-brand-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 m-0 leading-relaxed">
              All calculations run client-side in your web browser. Zero financial data or receipt entries are transmitted or saved.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <Zap className="w-6 h-6 text-brand-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Free & Accessible</h3>
            <p className="text-xs text-slate-600 m-0 leading-relaxed">
              Built to provide instant financial utility with no registration requirements, no paywalls, and no login barriers.
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
