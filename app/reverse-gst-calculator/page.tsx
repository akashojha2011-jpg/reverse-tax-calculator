import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { CompactOmniHeader } from '@/components/CompactOmniHeader'

export const metadata: Metadata = {
  title: 'Reverse GST Calculator — Calculate GST Backwards from Total',
  description:
    'Free online reverse GST calculator. Find pre-GST net amount and GST paid from total price for 10% Australia GST, 18% India GST, 9% Singapore GST, and NZ 15% GST.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-gst-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-gst-calculator',
    title: 'Reverse GST Calculator — Australia, India, Singapore & Global GST',
    description:
      'Instantly remove GST from total prices across Australian 10% GST, India 18% GST, and Singapore 9% GST rates.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse GST Calculator — Global GST Finder',
    description: 'Calculate GST backwards from total price for ATO Australia, India, and Singapore.',
  },
}

export default function ReverseGSTPage() {
  const faqs = [
    {
      question: 'How do I calculate GST backwards in Australia (10% GST)?',
      answer:
        'To calculate 10% GST backwards under ATO rules, divide total price by 11 (or divide by 1.10). For example, $110 total ÷ 11 = $10 GST paid, pre-GST net price = $100.',
    },
    {
      question: 'How do I reverse 18% GST in India?',
      answer:
        'Divide total price by 1.18 to get pre-GST price. Multiply total price by (18 ÷ 118) to get GST amount directly. For ₹11,800 gross, Net = ₹10,000 and GST = ₹1,800.',
    },
    {
      question: 'What is 9% Singapore GST reverse formula?',
      answer: 'Divide total price by 1.09 to calculate pre-tax net subtotal. For $109 SGD gross, Net = $100 SGD and GST = $9 SGD.',
    },
    {
      question: 'Is GST calculated on the total or pre-tax amount?',
      answer: 'GST is legally calculated as a percentage of the pre-tax net subtotal. Reversing requires dividing by (1 + GST rate) rather than subtracting percentages directly.',
    },
    {
      question: 'Can I use this reverse GST calculator for Business Activity Statements (BAS)?',
      answer: 'Yes. This tool conforms to ATO Australia and IRAS Singapore BAS reporting rules for extracting GST input tax credits.',
    },
  ]

  const globalGstTable = [
    { country: 'Australia (ATO)', rate: '10%', divisor: '1.10', quickFormula: 'Divide Gross by 11' },
    { country: 'India (GST Slabs)', rate: '5% / 12% / 18% / 28%', divisor: '1.18 (for 18%)', quickFormula: 'Gross ÷ 1.18' },
    { country: 'Singapore (IRAS)', rate: '9%', divisor: '1.09', quickFormula: 'Gross ÷ 1.09' },
    { country: 'New Zealand (IRD)', rate: '15%', divisor: '1.15', quickFormula: 'Multiply Gross by 3/23' },
    { country: 'Canada (Federal GST)', rate: '5%', divisor: '1.05', quickFormula: 'Gross ÷ 1.05' },
  ]

  return (
    <>
      <BreadcrumbNav items={[{ name: 'Reverse GST Calculator', url: '/reverse-gst-calculator' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="pb-2 border-b border-slate-100">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse GST Calculator
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-medium mb-3">
              Calculate pre-GST net price and GST paid backwards (Australia, India, Singapore, NZ).
            </p>

            <CompactOmniHeader lastUpdated="August 2026" initialLikes={874} />
          </header>

          <div className="block lg:hidden my-6">
            <CalculatorCard
              initialMode="gst"
              defaultGross={110}
              defaultTaxRate={10}
              taxName="GST"
              currencySymbol="$"
            />
          </div>

          {/* Table of Contents */}
          <nav className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-to-calculate-reverse-gst" className="hover:underline">How to calculate reverse GST</a></li>
              <li><a href="#ato-australia-10-percent-gst" className="hover:underline">Australian ATO 10% GST rule (Divide by 11)</a></li>
              <li><a href="#india-gst-slabs" className="hover:underline">India GST Slabs (18% & 28%)</a></li>
              <li><a href="#singapore-iras-gst" className="hover:underline">Singapore 9% GST (IRAS)</a></li>
              <li><a href="#global-gst-rates-table" className="hover:underline">Global GST Rates & Formulas Comparison Table</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              How to Calculate Reverse GST (Answer-First Summary)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              To calculate GST backwards, divide the total GST-inclusive price by <strong>1 + (GST rate ÷ 100)</strong>. For Australia’s <strong>10% GST</strong>, divide the total price by <strong>1.10</strong> (or divide by 11 to find the GST portion directly under ATO guidance). A <strong>$110.00</strong> receipt includes <strong>$100.00</strong> pre-GST price and <strong>$10.00</strong> GST.
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="how-to-calculate-reverse-gst" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How to calculate reverse GST
            </h2>
            <p>
              Goods and Services Tax (GST) is a comprehensive value-added consumption tax applied to sales of goods and services in Australia, India, Singapore, New Zealand, and Canada. Because commercial invoices display GST-inclusive pricing, business owners and accounting professionals require an accurate <strong>reverse GST calculator</strong> to calculate pre-GST subtotals and claim input tax credits.
            </p>

            <h2 id="ato-australia-10-percent-gst" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Australian ATO 10% GST rule (Divide by 11)
            </h2>
            <p>
              In Australia, the Australian Taxation Office (ATO) imposes a 10% GST. The official ATO shortcut to determine GST from a tax-inclusive bill is:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>GST Amount = Total Price ÷ 11</div>
              <div>Pre-GST Net Price = Total Price ÷ 1.10</div>
            </div>
            <p>
              For example, for a tax invoice of <strong>$550.00 AUD</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 text-sm">
              <li>GST Paid = $550.00 ÷ 11 = <strong>$50.00 AUD</strong></li>
              <li>Pre-GST Net Price = $550.00 ÷ 1.10 = <strong>$500.00 AUD</strong></li>
            </ul>

            <h2 id="india-gst-slabs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              India GST Slabs (18% & 28%)
            </h2>
            <p>
              India uses a four-tier GST rate structure (5%, 12%, 18%, and 28%). For standard commercial transactions taxed at <strong>18% GST</strong>:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Pre-GST Net = Gross Invoice ÷ 1.18</div>
              <div>GST Amount = Gross Invoice × (18 ÷ 118)</div>
            </div>

            <h2 id="singapore-iras-gst" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Singapore 9% GST (IRAS)
            </h2>
            <p>
              Under the Inland Revenue Authority of Singapore (IRAS), the standard GST rate is <strong>9%</strong>:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Pre-GST Net = Total SGD ÷ 1.09</div>
              <div>GST Paid = Total SGD × (9 ÷ 109)</div>
            </div>

            <h2 id="global-gst-rates-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Global GST Rates & Formulas Comparison Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Country / Tax Authority</th>
                    <th className="p-2.5">Standard Rate</th>
                    <th className="p-2.5">Reverse Divisor</th>
                    <th className="p-2.5">Quick Formula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {globalGstTable.map((row) => (
                    <tr key={row.country} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{row.country}</td>
                      <td className="p-2.5 font-semibold text-blue-600">{row.rate}</td>
                      <td className="p-2.5 font-mono">{row.divisor}</td>
                      <td className="p-2.5 font-mono text-slate-800">{row.quickFormula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Related Tax Tools" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard
            initialMode="gst"
            defaultGross={110}
            defaultTaxRate={10}
            taxName="GST"
            currencySymbol="$"
          />
        </div>
      </div>
    </>
  )
}
