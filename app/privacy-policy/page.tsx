import React from 'react'
import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Reverse Tax Calculator. Zero personal data collected.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbNav items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

      <article className="max-w-text-col mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mb-6">Last updated: August 2026</p>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            At <strong>reversetaxcalculator.pro</strong>, we prioritize your privacy. This site operates entirely without user registration, accounts, or personal data collection.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. Client-Side Processing</h2>
          <p>
            All calculations are performed locally in your browser using JavaScript. No financial amounts, tax numbers, or entries are transmitted to any server.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Analytics</h2>
          <p>
            We use lightweight, privacy-friendly Vercel Analytics or Plausible analytics to measure aggregated pageviews without tracking individual users or setting intrusive cookies.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Cookies</h2>
          <p>
            This website does not set third-party tracking or advertising cookies.
          </p>
        </section>
      </article>
    </>
  )
}
