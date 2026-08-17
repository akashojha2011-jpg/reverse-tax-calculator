import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'

export const metadata: Metadata = {
  title: 'Reverse HST Calculator — Canada 13% & 15% HST Backwards',
  description:
    'Free online reverse HST calculator for Canada. Calculate pre-tax price and HST paid from total price for Ontario 13% HST and Atlantic Canada 15% HST.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-hst-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-hst-calculator',
    title: 'Reverse HST Calculator — Canadian Harmonized Sales Tax',
    description:
      'Extract pre-tax subtotal and HST paid from total receipts in Ontario (13% HST) and Atlantic provinces (15% HST).',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse HST Calculator — Canada HST Finder',
    description: 'Calculate 13% and 15% HST backwards from gross total price.',
  },
}

export default function ReverseHSTPage() {
  const faqs = [
    {
      question: 'How do I reverse 13% HST in Ontario?',
      answer:
        'To remove 13% HST in Ontario, divide total price by 1.13. For example, $113.00 total ÷ 1.13 = $100.00 pre-tax net price, and $13.00 HST.',
    },
    {
      question: 'How do I reverse 15% HST in Atlantic Canada (NS, NB, PE, NL)?',
      answer:
        'Divide total price by 1.15. For example, $115.00 total ÷ 1.15 = $100.00 pre-tax net price, and $15.00 HST.',
    },
    {
      question: 'What is the HST reverse calculation formula?',
      answer: 'Pre-HST Net Amount = Total Gross Price ÷ (1 + (HST Rate ÷ 100)). HST Paid = Total Gross Price - Pre-HST Net Amount.',
    },
    {
      question: 'Which Canadian provinces use HST instead of separate GST/PST?',
      answer:
        'Five Canadian provinces use HST: Ontario (13%), Nova Scotia (15%), New Brunswick (15%), Prince Edward Island (15%), and Newfoundland and Labrador (15%).',
    },
    {
      question: 'Can I use this reverse HST calculator for CRA Input Tax Credits (ITCs)?',
      answer: 'Yes. This tool is built to CRA standards for claiming Input Tax Credits on GST/HST returns.',
    },
  ]

  const canadaProvincesTable = [
    { province: 'Ontario', taxType: 'HST', rate: '13%', federalGst: '5%', provincialTax: '8%', divisor: '1.13' },
    { province: 'Nova Scotia', taxType: 'HST', rate: '15%', federalGst: '5%', provincialTax: '10%', divisor: '1.15' },
    { province: 'New Brunswick', taxType: 'HST', rate: '15%', federalGst: '5%', provincialTax: '10%', divisor: '1.15' },
    { province: 'Prince Edward Island', taxType: 'HST', rate: '15%', federalGst: '5%', provincialTax: '10%', divisor: '1.15' },
    { province: 'Newfoundland & Labrador', taxType: 'HST', rate: '15%', federalGst: '5%', provincialTax: '10%', divisor: '1.15' },
    { province: 'British Columbia', taxType: 'GST + PST', rate: '12%', federalGst: '5%', provincialTax: '7%', divisor: '1.12' },
    { province: 'Quebec', taxType: 'GST + QST', rate: '14.975%', federalGst: '5%', provincialTax: '9.975%', divisor: '1.14975' },
    { province: 'Alberta', taxType: 'GST Only', rate: '5%', federalGst: '5%', provincialTax: '0%', divisor: '1.05' },
  ]

  return (
    <>
      <BreadcrumbNav items={[{ name: 'Reverse HST Calculator', url: '/reverse-hst-calculator' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="border-b border-slate-200 pb-4">
            <div className="text-xs text-slate-500 font-semibold mb-1">
              Last updated: <strong>August 2026</strong> | Canada Revenue Agency (CRA) Verified
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse HST Calculator (Canada)
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Calculate pre-tax price and HST paid backwards for Canadian Harmonized Sales Tax provinces.
            </p>
          </header>

          <div className="block lg:hidden my-6">
            <CalculatorCard
              initialMode="hst"
              defaultGross={113}
              defaultTaxRate={13}
              taxName="HST"
              currencySymbol="$"
              regionName="Ontario"
            />
          </div>

          {/* Table of Contents */}
          <nav className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-to-calculate-reverse-hst" className="hover:underline">How to calculate reverse HST</a></li>
              <li><a href="#ontario-13-percent-hst" className="hover:underline">13% HST Ontario reverse calculation</a></li>
              <li><a href="#atlantic-canada-15-percent-hst" className="hover:underline">15% Atlantic Canada HST reverse calculation</a></li>
              <li><a href="#canada-provinces-tax-table" className="hover:underline">Canadian Provinces Sales Tax Comparison Table</a></li>
              <li><a href="#cra-input-tax-credits" className="hover:underline">CRA Input Tax Credits (ITCs) & bookkeeping rules</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              How to Calculate Reverse HST in Canada (Answer-First Summary)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              Canadian Harmonized Sales Tax (HST) combines federal GST (5%) with provincial sales tax into a single rate (13% in Ontario, 15% in Nova Scotia, New Brunswick, PEI, and Newfoundland). To reverse HST, divide your gross total by <strong>1.13</strong> (for 13%) or <strong>1.15</strong> (for 15%). A receipt of <strong>$113.00</strong> in Ontario has a pre-tax net price of <strong>$100.00</strong> and <strong>$13.00</strong> HST.
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="how-to-calculate-reverse-hst" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How to calculate reverse HST
            </h2>
            <p>
              In Canada, participating provinces blend federal Goods and Services Tax (GST) and Provincial Sales Tax (PST) into a single unified rate called <strong>Harmonized Sales Tax (HST)</strong>. Businesses, freelancers, and corporations filing Canada Revenue Agency (CRA) GST/HST returns must perform <strong>reverse HST calculations</strong> to determine the exact pre-tax subtotal and claim input tax credits (ITCs) accurately.
            </p>

            <h2 id="ontario-13-percent-hst" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              13% HST Ontario reverse calculation
            </h2>
            <p>
              Ontario levies a <strong>13% HST</strong> rate (5% federal GST + 8% provincial component). The formula to calculate pre-tax net subtotal and 13% HST paid is:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Pre-Tax Net = Gross Total ÷ 1.13</div>
              <div>HST Paid = Gross Total - Pre-Tax Net</div>
            </div>

            <h2 id="atlantic-canada-15-percent-hst" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              15% Atlantic Canada HST reverse calculation
            </h2>
            <p>
              Nova Scotia, New Brunswick, Prince Edward Island, and Newfoundland & Labrador charge a <strong>15% HST</strong> rate (5% federal GST + 10% provincial component). The formula is:
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Pre-Tax Net = Gross Total ÷ 1.15</div>
              <div>HST Paid = Gross Total - Pre-Tax Net</div>
            </div>

            <h2 id="canada-provinces-tax-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Canadian Provinces Sales Tax Comparison Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Province</th>
                    <th className="p-2.5">Tax Type</th>
                    <th className="p-2.5">Combined Rate</th>
                    <th className="p-2.5">Federal GST</th>
                    <th className="p-2.5">Provincial Tax</th>
                    <th className="p-2.5">Reverse Divisor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {canadaProvincesTable.map((row) => (
                    <tr key={row.province} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{row.province}</td>
                      <td className="p-2.5 font-semibold text-slate-700">{row.taxType}</td>
                      <td className="p-2.5 font-bold text-blue-600">{row.rate}</td>
                      <td className="p-2.5">{row.federalGst}</td>
                      <td className="p-2.5">{row.provincialTax}</td>
                      <td className="p-2.5 font-mono">{row.divisor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="cra-input-tax-credits" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              CRA Input Tax Credits (ITCs) & bookkeeping rules
            </h2>
            <p>
              Under CRA regulations, GST/HST registrants can claim Input Tax Credits to recover tax paid on commercial operating expenses:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700 text-sm">
              <li>Ensure vendor receipts include the seller’s 9-digit Business Number (BN) + RT GST account extension.</li>
              <li>When calculating ITCs for meals and entertainment expenses, apply the CRA 50% restriction rule after performing the reverse HST calculation.</li>
            </ul>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Canadian Province Tax Calculators" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard
            initialMode="hst"
            defaultGross={113}
            defaultTaxRate={13}
            taxName="HST"
            currencySymbol="$"
            regionName="Ontario"
          />
        </div>
      </div>
    </>
  )
}
