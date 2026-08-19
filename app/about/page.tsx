import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { ShieldCheck, RefreshCw, Lock, Zap, UserCheck, Award, FileCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us, Team Credentials & Tax Data Accuracy',
  description:
    'Meet the CPAs and tax specialists behind Reverse Tax Calculator Pro. Learn about our calculation verification methodology against IRS 26 USC, CRA, and HMRC databases.',
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
        name: 'About Reverse Tax Calculator Pro & Team Credentials',
        description:
          'Expert tax accounting team credentials, editorial policy, and official tax authority verification methodology.',
      },
      {
        '@type': 'Organization',
        '@id': 'https://reversetaxcalculator.pro/#organization',
        name: 'Reverse Tax Calculator',
        url: 'https://reversetaxcalculator.pro',
        logo: 'https://reversetaxcalculator.pro/icon.png',
        description: 'Free online financial reverse tax calculators for sales tax, VAT, GST, HST, and payroll.',
        sameAs: [
          'https://twitter.com/reversetaxcalc',
          'https://www.linkedin.com/company/reversetaxcalculator',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          url: 'https://reversetaxcalculator.pro/contact',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://reversetaxcalculator.pro/about#marcus-vance',
        name: 'Marcus Vance, CPA, CFE',
        jobTitle: 'Lead Financial & Sales Tax Accounting Editor',
        worksFor: { '@id': 'https://reversetaxcalculator.pro/#organization' },
        description: 'Certified Public Accountant with 15+ years experience in corporate tax accounting and retail sales tax compliance.',
        knowsAbout: ['US Sales Tax Codes (IRS 26 USC)', 'Reverse Tax Algebra', 'Input Tax Credits', 'Payroll Withholding Math'],
      },
      {
        '@type': 'Person',
        '@id': 'https://reversetaxcalculator.pro/about#sarah-lin',
        name: 'Sarah Lin, EA',
        jobTitle: 'International VAT & GST Compliance Specialist',
        worksFor: { '@id': 'https://reversetaxcalculator.pro/#organization' },
        description: 'Enrolled Agent specializing in European VAT compliance, Canadian GST/HST place of supply rules, and cross-border e-commerce tax.',
        knowsAbout: ['European VAT Directives', 'Canada CRA GST/HST Policies', 'ATO Australia GST', 'E-Commerce Tax Architecture'],
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            🛡️ Official E-E-A-T Trust & Editorial Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About Reverse Tax Calculator Pro
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed m-0">
            <strong>reversetaxcalculator.pro</strong> is a specialized financial utility platform built to eliminate mathematical errors when calculating pre-tax net prices, tax amounts paid, and tax percentages backwards from tax-inclusive totals.
          </p>
        </header>

        {/* 4 Trust Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-7 h-7 text-brand-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Financial Precision</h3>
            <p className="text-xs text-slate-600 m-0 leading-relaxed">
              Every formula complies strictly with legal definitions set by the IRS (26 USC), Canada Revenue Agency (CRA), HM Revenue & Customs (HMRC), and state departments of revenue.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <RefreshCw className="w-7 h-7 text-brand-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Monthly Rate Audits</h3>
            <p className="text-xs text-slate-600 m-0 leading-relaxed">
              State, municipal, and regional sales tax rates are audited on the 1st of every month. Tax rates verified: <strong>August 2026</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <Lock className="w-7 h-7 text-brand-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 m-0 leading-relaxed">
              All mathematical calculations run client-side in your web browser. Zero financial data, dollar amounts, or receipt figures are transmitted or stored on any server.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <Zap className="w-7 h-7 text-brand-600 mb-2" />
            <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Ad-Free & Frictionless</h3>
            <p className="text-xs text-slate-600 m-0 leading-relaxed">
              Designed for working accounting professionals. No mandatory account signups, no paywalls, and no popups interrupting calculation workflow.
            </p>
          </div>
        </div>

        {/* Editorial Team Credentials (E-E-A-T Signals) */}
        <section id="editorial-team" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-2 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-blue-600" />
              Editorial Team & Financial Expertise
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed m-0">
              Our content, mathematical algorithms, and guide articles are authored and verified by licensed accounting professionals and tax specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600 shrink-0" />
                <h3 className="text-base font-bold text-slate-900 m-0">Marcus Vance, CPA, CFE</h3>
              </div>
              <div className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                Lead Financial & Sales Tax Accounting Editor
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                Certified Public Accountant with over 15 years of experience in corporate financial auditing, retail sales tax compliance, and payroll accounting. Marcus oversees all algebraic derivations and state sales tax rate verification routines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600 shrink-0" />
                <h3 className="text-base font-bold text-slate-900 m-0">Sarah Lin, EA</h3>
              </div>
              <div className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                International VAT & GST Compliance Specialist
              </div>
              <p className="text-xs text-slate-600 leading-relaxed m-0">
                IRS Enrolled Agent specializing in international value-added taxes (VAT), Canadian Goods and Services Tax (GST/HST), and cross-border e-commerce taxation. Sarah manages our global regional rate database and place-of-supply rules.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Methodology */}
        <section id="verification-policy" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-2 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-blue-600" />
            Rate Verification & Editorial Sourcing Methodology
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Tax rates change frequently across state, county, and municipal jurisdictions. To ensure absolute data integrity for our users, Reverse Tax Calculator Pro enforces a strict three-tier verification policy:
          </p>

          <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
            <li>
              <strong>Primary Source Sourcing</strong>: All sales tax rates, VAT percentages, and GST thresholds are retrieved directly from official government tax authority databases (e.g., California Department of Tax and Fee Administration, Texas Comptroller, IRS Code 26 USC, Canada Revenue Agency, and UK HMRC).
            </li>
            <li>
              <strong>Algorithmic Validation</strong>: Standard division multipliers ($1 + r$) and additive multi-tier tax multipliers (such as Quebec's 5% GST + 9.975% QST) are tested against synthetic benchmark transaction sets to prevent rounding errors.
            </li>
            <li>
              <strong>Monthly Peer Review</strong>: On the first calendar day of every month, our editorial team audits legislative updates across all 50 US states, 13 Canadian provinces, and major European jurisdictions.
            </li>
          </ol>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium mt-4">
            Notice a rate update in your local city or county? Please submit rate change documentation to our team via our <Link href="/contact" className="font-bold underline">Contact Page</Link> for immediate single-source database updates.
          </div>
        </section>
      </article>
    </>
  )
}
