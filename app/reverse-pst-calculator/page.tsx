import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Percent, ShieldCheck, ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reverse PST Calculator — Calculate Provincial Sales Tax Backwards (BC, SK, MB)',
  description:
    'Free Canadian reverse PST calculator. Calculate pre-tax price and provincial sales tax (PST) paid backwards from total prices in British Columbia (7%), Saskatchewan (6%), and Manitoba (7%).',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/reverse-pst-calculator',
  },
}

const FAQS = [
  {
    question: 'How do I remove PST from a purchase in British Columbia (7% PST)?',
    answer:
      'In BC, retail items carry 5% federal GST and 7% provincial PST (12% combined). To remove both taxes from a tax-inclusive total, divide the gross amount by 1.12. For example, a $112 purchase yields $100 pre-tax, $5 GST, and $7 PST.',
  },
  {
    question: 'What are the current PST rates across Canadian provinces?',
    answer:
      'British Columbia charges 7% PST, Saskatchewan charges 6% PST, and Manitoba charges 7% Retail Sales Tax (RST). Alberta, Yukon, NWT, and Nunavut have no provincial sales tax (0% PST). Ontario and Atlantic provinces use single blended HST instead.',
  },
  {
    question: 'Is PST compounded on GST?',
    answer:
      'No. Under current Canadian provincial tax rules, PST is applied to the pre-tax selling price, not on top of the GST. Both GST and PST are calculated independently on the base subtotal.',
  },
]

export default function ReversePSTPage() {
  const tocItems: TocItem[] = [
    { id: 'how-it-works', label: 'How Reverse PST Calculation Works' },
    { id: 'pst-rates-table', label: 'Canadian PST Rates by Province' },
    { id: 'worked-example', label: 'Worked Line-Item Example' },
    { id: 'faqs', label: 'Frequently Asked Questions' },
  ]

  const calculatorProps = {
    initialMode: 'dual-tax' as any,
    defaultGross: 112,
    defaultTaxRate: 5,
    defaultSecondTaxRate: 7,
    defaultSecondTaxName: 'PST',
    taxName: 'GST',
    currencySymbol: '$',
    hideModeSwitcher: true,
  }

  return (
    <>
      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Reverse PST Calculator', url: '/reverse-pst-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Percent className="w-3.5 h-3.5 text-blue-600" />
              Canada Provincial Sales Tax
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Updated for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Reverse PST Calculator (Canada)
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Calculate the original pre-tax price and separate Provincial Sales Tax (PST) and GST backwards from any Canadian receipt or invoice.
          </p>
        </header>

        <div className="block lg:hidden mb-8">
          <CalculatorCard {...calculatorProps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            <TableOfContents items={tocItems} title="PST Guide Contents" />

            <section id="how-it-works" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How Reverse PST Calculation Works
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In provinces that maintain separate provincial sales tax systems (British Columbia, Saskatchewan, and Manitoba), invoices often show a combined final charge that includes federal GST (5%) plus the provincial PST rate (6% or 7%). To extract the original pre-tax price, divide by <code>1 + (GST% + PST%) ÷ 100</code>.
              </p>
            </section>

            <section id="pst-rates-table" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Canadian PST Rates by Province (2026)
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-bold">Province</th>
                      <th className="py-2.5 px-4 font-bold">Federal GST</th>
                      <th className="py-2.5 px-4 font-bold">PST Rate</th>
                      <th className="py-2.5 px-4 font-bold text-blue-700">Combined Tax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">British Columbia</td>
                      <td className="py-2.5 px-4 tabular-nums">5%</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">7% PST</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">12%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Saskatchewan</td>
                      <td className="py-2.5 px-4 tabular-nums">5%</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">6% PST</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">11%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Manitoba</td>
                      <td className="py-2.5 px-4 tabular-nums">5%</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">7% RST</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">12%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">Alberta & Territories</td>
                      <td className="py-2.5 px-4 tabular-nums">5%</td>
                      <td className="py-2.5 px-4 tabular-nums text-slate-400">0% (No PST)</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900 tabular-nums">5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="worked-example" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Worked Line-Item Example (British Columbia 12% Combined)
              </h2>
              <div className="p-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm tabular-nums space-y-1">
                <div>Total Receipt: $112.00 CAD</div>
                <div>Combined Divisor: 1 + 0.05 + 0.07 = 1.12</div>
                <div>Pre-Tax Net Price: $112.00 ÷ 1.12 = <strong className="text-slate-900 font-bold">$100.00</strong></div>
                <div>GST Paid (5%): $100.00 × 0.05 = <strong className="text-slate-700 font-bold">$5.00</strong></div>
                <div>PST Paid (7%): $100.00 × 0.07 = <strong className="text-blue-700 font-bold">$7.00</strong></div>
              </div>
            </section>

            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={FAQS} title="Frequently Asked Questions about Canadian PST" />
            </section>
          </article>

          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <CalculatorCard {...calculatorProps} />
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Canadian Calculators</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/reverse-gst-calculator" className="block hover:underline">• Reverse GST Calculator</Link>
                  <Link href="/reverse-hst-calculator" className="block hover:underline">• Reverse HST Calculator (ON, Atlantic)</Link>
                  <Link href="/guides/gst-vs-hst-vs-pst-canada-explained" className="block hover:underline">• Canada GST vs HST vs PST Guide</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
