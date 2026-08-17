import React from 'react'
import type { Metadata } from 'next'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RegionGridDirectory } from '@/components/RegionGridDirectory'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'

export const metadata: Metadata = {
  title: 'Reverse VAT Calculator — Remove 20% VAT from Total Price',
  description:
    'Free online reverse VAT calculator. Calculate pre-VAT net price and VAT paid backwards from total price for UK 20% VAT, EU standard rates (19%, 21%), and reduced rates.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/reverse-vat-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://reversetaxcalculator.pro/reverse-vat-calculator',
    title: 'Reverse VAT Calculator — Remove 20% VAT from Total Price',
    description:
      'Free online tool to remove 20% UK VAT or European VAT rates from total prices instantly.',
    siteName: 'Reverse Tax Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse VAT Calculator — UK & EU VAT Finder',
    description: 'Calculate VAT backwards from gross totals across UK and European rates.',
  },
}

export default function ReverseVATPage() {
  const faqs = [
    {
      question: 'How do I remove 20% VAT from a total price?',
      answer:
        'To remove 20% VAT, divide the total price by 1.20. For example, £120 gross ÷ 1.20 = £100 net amount. The VAT amount is £120 minus £100, which equals £20.',
    },
    {
      question: 'What is the UK VAT fraction for 20% VAT?',
      answer:
        'The UK VAT fraction for 20% VAT is 1/6 (or 20/120). To find the VAT amount directly from a gross total, divide the gross total by 6. For example, £120 ÷ 6 = £20 VAT.',
    },
    {
      question: 'How do I calculate 5% reduced UK VAT backwards?',
      answer: 'Divide the total gross price by 1.05. For example, £105 gross ÷ 1.05 = £100 net price.',
    },
    {
      question: 'What is the difference between Reverse VAT and Reverse Charge VAT?',
      answer:
        'Reverse VAT calculation is finding the pre-VAT price from a total receipt. Reverse Charge VAT (under HMRC / EU rules) is a B2B accounting mechanism where the buyer accounts for VAT instead of the seller.',
    },
    {
      question: 'Can I use this calculator for HMRC VAT returns and expense claims?',
      answer:
        'Yes. This reverse VAT calculator complies with official HMRC rounding rules and provides exact net and VAT breakdowns for VAT returns.',
    },
  ]

  const euVatTableData = [
    { country: 'United Kingdom', standardRate: '20%', reducedRate: '5%', divisor: '1.20', fraction: '1/6' },
    { country: 'Germany (MwSt)', standardRate: '19%', reducedRate: '7%', divisor: '1.19', fraction: '19/119' },
    { country: 'France (TVA)', standardRate: '20%', reducedRate: '5.5% / 10%', divisor: '1.20', fraction: '1/6' },
    { country: 'Spain (IVA)', standardRate: '21%', reducedRate: '10%', divisor: '1.21', fraction: '21/121' },
    { country: 'Italy (IVA)', standardRate: '22%', reducedRate: '10%', divisor: '1.22', fraction: '22/122' },
    { country: 'Netherlands (BTW)', standardRate: '21%', reducedRate: '9%', divisor: '1.21', fraction: '21/121' },
    { country: 'Belgium (TVA/BTW)', standardRate: '21%', reducedRate: '6% / 12%', divisor: '1.21', fraction: '21/121' },
    { country: 'Ireland (VAT)', standardRate: '23%', reducedRate: '13.5% / 9%', divisor: '1.23', fraction: '23/123' },
    { country: 'Poland (PTU/VAT)', standardRate: '23%', reducedRate: '8% / 5%', divisor: '1.23', fraction: '23/123' },
    { country: 'Sweden (Moms)', standardRate: '25%', reducedRate: '12% / 6%', divisor: '1.25', fraction: '1/5' },
  ]

  return (
    <>
      <BreadcrumbNav items={[{ name: 'Reverse VAT Calculator', url: '/reverse-vat-calculator' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <header className="border-b border-slate-200 pb-4">
            <div className="text-xs text-slate-500 font-semibold mb-1">
              Last updated: <strong>August 2026</strong> | UK HMRC & EU Verified
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Reverse VAT Calculator
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Find pre-VAT price and exact VAT paid backwards from total price (UK & EU).
            </p>
          </header>

          <div className="block lg:hidden my-6">
            <CalculatorCard
              initialMode="vat"
              defaultGross={120}
              defaultTaxRate={20}
              taxName="VAT"
              currencySymbol="£"
            />
          </div>

          {/* Table of Contents */}
          <nav className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs">
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider mb-3 mt-0">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-sm text-blue-600 font-semibold list-decimal pl-5">
              <li><a href="#how-to-calculate-reverse-vat" className="hover:underline">How to calculate reverse VAT</a></li>
              <li><a href="#vat-fraction-explained" className="hover:underline">HMRC VAT fractions explained (20% & 5%)</a></li>
              <li><a href="#european-vat-rates-table" className="hover:underline">European & UK VAT Rates Table</a></li>
              <li><a href="#reverse-vat-vs-reverse-charge" className="hover:underline">Reverse VAT vs. Reverse Charge mechanism</a></li>
              <li><a href="#vat-reclaim-accounting" className="hover:underline">VAT accounting & input tax reclaim guidelines</a></li>
              <li><a href="#faqs" className="hover:underline">Frequently Asked Questions (FAQs)</a></li>
            </ol>
          </nav>

          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              How to Calculate Reverse VAT (Answer-First Summary)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-0">
              To remove VAT from a total price, divide the total gross invoice by <strong>1 + (VAT rate ÷ 100)</strong>. At the standard UK <strong>20% VAT rate</strong>, divide the total price by <strong>1.20</strong> (or multiply by the VAT fraction 1/6 to get VAT paid directly). A receipt total of <strong>£120.00</strong> contains <strong>£100.00</strong> net price and <strong>£20.00</strong> in VAT.
            </p>
          </section>

          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 id="how-to-calculate-reverse-vat" className="text-2xl font-extrabold text-slate-900 mt-0 mb-3 scroll-mt-24">
              How to calculate reverse VAT
            </h2>
            <p>
              Value Added Tax (VAT) is an indirect consumption tax applied to goods and services across the UK, European Union, and over 160 countries worldwide. Under European consumer protection regulations, retail shelf prices and commercial invoices must legally display VAT-inclusive totals.
            </p>
            <p>
              When filing quarterly VAT returns, calculating input tax credits, or recording business expenses, bookkeepers need to extract the original pre-VAT net subtotal from the total invoice.
            </p>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 font-bold text-blue-700 space-y-1">
              <div>Net Subtotal = Gross Invoice Total ÷ (1 + (VAT Rate ÷ 100))</div>
              <div>VAT Amount = Gross Invoice Total - Net Subtotal</div>
            </div>

            <h2 id="vat-fraction-explained" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              HMRC VAT fractions explained (20% & 5%)
            </h2>
            <p>
              The UK tax authority, Her Majesty’s Revenue and Customs (HMRC), defines official <strong>VAT fractions</strong> to allow accountants to calculate VAT amounts directly from gross figures without intermediate rounding.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
              <li>
                <strong>20% Standard Rate Fraction</strong>: 20/120 = <strong>1/6</strong>. Dividing any gross total by 6 yields the exact 20% VAT component. (£120 ÷ 6 = £20).
              </li>
              <li>
                <strong>5% Reduced Rate Fraction</strong>: 5/105 = <strong>1/21</strong>. Dividing a 5% reduced gross receipt by 21 yields the VAT component. (£105 ÷ 21 = £5).
              </li>
            </ul>

            <h2 id="european-vat-rates-table" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              European & UK VAT Rates Table
            </h2>
            <div className="my-6 overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Country</th>
                    <th className="p-2.5">Standard Rate</th>
                    <th className="p-2.5">Reduced Rate</th>
                    <th className="p-2.5">Divisor</th>
                    <th className="p-2.5">VAT Fraction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {euVatTableData.map((row) => (
                    <tr key={row.country} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{row.country}</td>
                      <td className="p-2.5 font-semibold text-blue-600">{row.standardRate}</td>
                      <td className="p-2.5">{row.reducedRate}</td>
                      <td className="p-2.5 font-mono">{row.divisor}</td>
                      <td className="p-2.5 font-mono">{row.fraction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="reverse-vat-vs-reverse-charge" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Reverse VAT vs. Reverse Charge mechanism
            </h2>
            <p>
              It is important to distinguish between <strong>reverse VAT mathematical calculation</strong> and the <strong>Reverse Charge VAT accounting rule</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm">
              <li>
                <strong>Reverse VAT Calculation:</strong> The mathematical process of extracting pre-tax net cost from a tax-inclusive total receipt.
              </li>
              <li>
                <strong>Reverse Charge VAT Mechanism:</strong> An anti-fraud tax accounting rule for cross-border B2B services or construction industry transactions (CIS), where the purchaser self-assesses VAT instead of paying supplier VAT.
              </li>
            </ul>

            <h2 id="vat-reclaim-accounting" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              VAT accounting & input tax reclaim guidelines
            </h2>
            <p>
              VAT-registered businesses can reclaim input VAT paid on business expenses. When logging receipt data into Xero, QuickBooks, or Sage:
            </p>
            <ol className="list-decimal pl-6 space-y-1 text-slate-700 text-sm">
              <li>Always check whether the supplier receipt contains a valid VAT Registration Number.</li>
              <li>Ensure the correct rate (Standard 20%, Reduced 5%, or Zero-rated 0%) is selected before applying the reverse calculation.</li>
              <li>Keep detailed digitized copies of all invoices for 6 years in compliance with HMRC records policy.</li>
            </ol>

            <h2 id="faqs" className="text-2xl font-extrabold text-slate-900 mt-8 mb-3 scroll-mt-24">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion items={faqs} title="" />
          </article>

          <RegionGridDirectory />
          <RelatedCalculatorsGrid title="Related Tax Calculators" />
        </div>

        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard
            initialMode="vat"
            defaultGross={120}
            defaultTaxRate={20}
            taxName="VAT"
            currencySymbol="£"
          />
        </div>
      </div>
    </>
  )
}
