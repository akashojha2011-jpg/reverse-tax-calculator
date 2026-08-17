import React from 'react'
import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use and financial disclaimer for Reverse Tax Calculator.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <BreadcrumbNav items={[{ name: 'Terms of Use', url: '/terms' }]} />

      <article className="max-w-text-col mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          Terms of Use & Disclaimer
        </h1>
        <p className="text-xs text-slate-500 mb-6">Last updated: August 2026</p>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            By accessing <strong>reversetaxcalculator.pro</strong>, you agree to the following terms and conditions.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. Educational & Informational Tool</h2>
          <p>
            The calculations provided by this website are for general informational and educational purposes only. While we make every effort to maintain accurate tax rate data, tax laws change frequently and local exemptions may apply.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Financial & Legal Disclaimer</h2>
          <p>
            This website does not provide official tax, legal, or accounting advice. Users should consult a certified public accountant (CPA), registered tax agent, or official revenue authority before filing tax returns or making legal financial decisions.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Limitation of Liability</h2>
          <p>
            Under no circumstances shall reversetaxcalculator.pro or its operators be held liable for any direct or indirect damages resulting from the use or reliance on calculated outputs.
          </p>
        </section>
      </article>
    </>
  )
}
