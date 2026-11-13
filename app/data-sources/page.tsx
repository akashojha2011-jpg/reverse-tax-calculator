import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { US_TAX_RATES_ARRAY } from '@/data/us-tax-rates'
import { Building2, ExternalLink, ShieldCheck, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Official Tax Authorities & Data Sources | Reverse Tax Calculator',
  description:
    'Directory of official state departments of revenue, government tax agencies, and statutory sources powering Reverse Tax Calculator.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/data-sources',
  },
}

export default function DataSourcesPage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Data Sources', url: '/data-sources' },
        ]}
      />

      <header className="space-y-3 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          Authoritative Government Sources
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Official Tax Data Sources
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Every tax rate, municipal surcharge range, and exemption rule on Reverse Tax Calculator is compiled directly from official government tax authorities.
        </p>
      </header>

      {/* International Authorities */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span>Federal & International Tax Authorities</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900">United States</div>
            <div className="text-slate-600">Internal Revenue Service (IRS)</div>
            <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              irs.gov <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900">Canada</div>
            <div className="text-slate-600">Canada Revenue Agency (CRA)</div>
            <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              canada.ca/cra <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900">United Kingdom</div>
            <div className="text-slate-600">HM Revenue & Customs (HMRC)</div>
            <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              gov.uk/hmrc <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900">Australia</div>
            <div className="text-slate-600">Australian Taxation Office (ATO)</div>
            <a href="https://www.ato.gov.au" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              ato.gov.au <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900">New Zealand</div>
            <div className="text-slate-600">Inland Revenue Department (IRD)</div>
            <a href="https://www.ird.govt.nz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              ird.govt.nz <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900">Singapore</div>
            <div className="text-slate-600">Inland Revenue Authority (IRAS)</div>
            <a href="https://www.iras.gov.sg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              iras.gov.sg <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* US State Departments of Revenue Directory */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            All 50 US State Departments of Revenue & Tax Commissions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Primary state agencies responsible for administering sales tax, use tax, and local surcharges:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                <th className="py-2.5 px-3 sm:px-4 font-bold">State</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold">Base Rate</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold">Official Revenue Agency</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold text-right">Official Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {US_TAX_RATES_ARRAY.map((st) => (
                <tr key={st.slug} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-900">
                    <Link
                      href={`/${st.slug}-reverse-sales-tax-calculator`}
                      className="text-blue-600 hover:underline"
                    >
                      {st.name}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-700 font-semibold">{st.baseRate}%</td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-600">{st.authorityName}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-right">
                    <a
                      href={st.authorityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
