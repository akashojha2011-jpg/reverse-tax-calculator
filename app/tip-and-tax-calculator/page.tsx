import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TipAndTaxTool } from '@/components/TipAndTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Utensils, ArrowRight, ShieldCheck, Calendar, Users, HelpCircle, FileSpreadsheet } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tip and Tax Calculator — Restaurant Bill & Bill Splitter (2026)',
  description:
    'Free tip and sales tax calculator. Calculate tips on pre-tax subtotal vs post-tax total, calculate meal tax, and split the final bill evenly among guests.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tip-and-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/tip-and-tax-calculator',
    title: 'Tip and Tax Calculator — Restaurant Bill & Bill Splitter (2026)',
    description:
      'Free tip and sales tax calculator. Calculate tips on pre-tax subtotal vs post-tax total, calculate tax, and split the final bill evenly among guests.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'Should you tip before or after sales tax is added?',
    answer:
      'Traditional dining etiquette (endorsed by the Emily Post Institute) recommends tipping on the pre-tax food and beverage subtotal. Sales tax is a government charge, not a service provided by waitstaff. However, many modern digital POS terminals (Square, Toast, Clover) calculate tip suggestions on the post-tax grand total by default.',
  },
  {
    question: 'What is a standard tip percentage in US restaurants?',
    answer:
      'In American restaurants, 15% is standard for adequate service, 18% to 20% is standard for good to great service, and 22% to 25% is customary for exceptional service or fine dining.',
  },
  {
    question: 'How do you calculate tip and tax on a restaurant bill?',
    answer:
      '1. Sales Tax = Food Subtotal × (Tax Rate ÷ 100). 2. Tip = Subtotal × (Tip % ÷ 100). 3. Grand Total = Subtotal + Sales Tax + Tip. 4. Per Person = Grand Total ÷ Party Size.',
  },
  {
    question: 'Are automatic gratuities for large parties taxed as sales tax?',
    answer:
      'In the United States, IRS Ruling 2012-18 clarifies that mandatory service charges (such as an automatic 18% gratuity on parties of 6 or more) are technically service charges rather than discretionary tips. In many states, mandatory service charges are subject to state sales tax.',
  },
  {
    question: 'How do I extract pre-tax meal cost from a combined credit card charge?',
    answer:
      'If your credit card statement shows a single lump sum that included both tip and sales tax, use our Reverse Sales Tax and Tip Calculator to separate the meal cost, tip, and tax accurately.',
  },
]

const TIP_COMPARISON_TABLE = [
  { subtotal: 50, tax: 4.13, postTax: 54.13, tipPre18: 9.00, tipPost18: 9.74, diff18: 0.74, tipPre20: 10.00, tipPost20: 10.83, diff20: 0.83 },
  { subtotal: 100, tax: 8.25, postTax: 108.25, tipPre18: 18.00, tipPost18: 19.49, diff18: 1.49, tipPre20: 20.00, tipPost20: 21.65, diff20: 1.65 },
  { subtotal: 150, tax: 12.38, postTax: 162.38, tipPre18: 27.00, tipPost18: 29.23, diff18: 2.23, tipPre20: 30.00, tipPost20: 32.48, diff20: 2.48 },
  { subtotal: 250, tax: 20.63, postTax: 270.63, tipPre18: 45.00, tipPost18: 48.71, diff18: 3.71, tipPre20: 50.00, tipPost20: 54.13, diff20: 4.13 },
  { subtotal: 400, tax: 33.00, postTax: 433.00, tipPre18: 72.00, tipPost18: 77.94, diff18: 5.94, tipPre20: 80.00, tipPost20: 86.60, diff20: 6.60 },
]

export default function TipAndTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tip and Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/tip-and-tax-calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
  }

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const schemaHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Tip, Tax, and Split a Restaurant Bill',
    description: 'Calculate restaurant tip on food subtotal, apply sales tax, and split evenly among party members.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Check the Pre-Tax Food Subtotal',
        text: 'Look at the receipt to find the subtotal before state and municipal meals tax.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate Tip Percentage',
        text: 'Multiply food subtotal by your desired tip rate (e.g. 18% or 20%).',
      },
      {
        '@type': 'HowToStep',
        name: 'Add Meals Tax and Tip to Subtotal',
        text: 'Add the calculated tip and statutory meals tax to find the final table total.',
      },
      {
        '@type': 'HowToStep',
        name: 'Divide by Number of Guests',
        text: 'Divide the grand total by the number of paying guests to determine each person’s share.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'tip-tool', label: 'Interactive Tip & Tax Tool' },
    { id: 'pre-vs-post-tax-tipping', label: 'Tipping on Pre-Tax Subtotal vs. Post-Tax Total' },
    { id: 'tip-comparison-table', label: 'Pre-Tax vs. Post-Tax Tip Comparison Table' },
    { id: 'party-splitting', label: 'Party Bill Splitting & Large Group Rules' },
    { id: 'reverse-tip-tax', label: 'Extract Tip & Tax from a Credit Card Charge' },
    { id: 'faqs', label: 'Frequently Asked Questions' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tip and Tax Calculator', url: '/tip-and-tax-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Utensils className="w-3.5 h-3.5 text-blue-600" />
              Dining & Tip Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tip and Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Calculate your restaurant tip on pre-tax subtotal vs post-tax total, calculate exact sales tax, and split the final bill evenly among your party.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Hospitality standards aligned with IRS restaurant reporting guidelines</span>
          </div>
        </header>

        <section id="tip-tool">
          <TipAndTaxTool />
        </section>

        <div className="pt-6 space-y-10">
          <TableOfContents items={tocItems} title="Tip & Tax Guide Contents" />

          <section id="pre-vs-post-tax-tipping" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Tipping on Pre-Tax Subtotal vs. Post-Tax Total
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When dining at American restaurants, a widespread debate is whether gratuity should be calculated on the subtotal before taxes or the total after taxes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">
                  Traditional Etiquette (Pre-Tax)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed m-0">
                  Etiquette authorities, including The Emily Post Institute, recommend tipping on the <strong>pre-tax subtotal</strong>. The reasoning is that sales and meals taxes are government revenue, not services rendered by your server.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">
                  Digital POS Terminals (Post-Tax)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed m-0">
                  Handheld POS terminals (Square, Toast, Clover) calculate recommended tip buttons (18%, 20%, 22%) on the <strong>post-tax total</strong> by default. This causes customers to pay tip on tax, increasing the server&apos;s tip by 1% to 2% of the check.
                </p>
              </div>
            </div>
          </section>

          <section id="tip-comparison-table" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Pre-Tax vs. Post-Tax Tip Comparison Table (At 8.25% Tax)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              See the exact dollar difference between tipping on the pre-tax food subtotal vs post-tax total:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Food Subtotal</th>
                    <th className="p-3">Post-Tax Total</th>
                    <th className="p-3">18% Tip (Pre-Tax)</th>
                    <th className="p-3">18% Tip (Post-Tax)</th>
                    <th className="p-3">20% Tip (Pre-Tax)</th>
                    <th className="p-3">20% Tip (Post-Tax)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {TIP_COMPARISON_TABLE.map((row) => (
                    <tr key={row.subtotal} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">${row.subtotal.toFixed(2)}</td>
                      <td className="p-3 text-slate-700">${row.postTax.toFixed(2)}</td>
                      <td className="p-3 text-slate-700">${row.tipPre18.toFixed(2)}</td>
                      <td className="p-3 text-blue-700 font-medium">${row.tipPost18.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.diff18.toFixed(2)})</span></td>
                      <td className="p-3 text-slate-700">${row.tipPre20.toFixed(2)}</td>
                      <td className="p-3 text-blue-700 font-medium">${row.tipPost20.toFixed(2)} <span className="text-slate-400 font-normal">(+${row.diff20.toFixed(2)})</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="party-splitting" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Party Bill Splitting & Large Group Rules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When splitting a group check, the simplest method is equal division: <code>(Subtotal + Tax + Tip) ÷ Guests</code>.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <div className="font-bold text-slate-900">Note on Automatic Gratuities:</div>
              <p className="m-0 leading-relaxed">
                Always review the bottom of your itemized receipt before adding a tip. Many restaurants automatically apply an 18% or 20% &quot;auto-gratuity&quot; on parties of 6 or more. Adding an extra 20% on top results in accidental double tipping.
              </p>
            </div>
          </section>

          <section id="reverse-tip-tax" className="scroll-mt-24 space-y-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 m-0">Need to extract meal cost backwards from a bank statement?</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xl m-0">
                  Learn the reverse calculation formula to separate food subtotal, service tip, and sales tax from any total receipt charge.
                </p>
              </div>
              <Link
                href="/guides/how-to-calculate-reverse-tax-percentage#section-7"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors shadow-2xs"
              >
                <span>Reverse Tip Formula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <FAQAccordion items={FAQS} title="Frequently Asked Questions about Restaurant Tipping & Tax" />
          </section>
        </div>
      </div>
    </>
  )
}
