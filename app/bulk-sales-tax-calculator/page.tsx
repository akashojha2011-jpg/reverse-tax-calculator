import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BulkTaxTool } from '@/components/BulkTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { FileSpreadsheet, ArrowRight, ShieldCheck, Calendar, CheckCircle2, HelpCircle, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bulk Sales Tax Calculator — Multi-Item Invoice & Receipt Tool (2026)',
  description:
    'Free multi-item invoice and bulk sales tax calculator. Calculate line-by-line sales tax, separate taxable and exempt subtotals, export to CSV, and follow SSUTA rounding standards.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/bulk-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/bulk-sales-tax-calculator',
    title: 'Bulk Sales Tax Calculator — Multi-Item Invoice & Receipt Tool (2026)',
    description:
      'Free multi-item invoice and bulk sales tax calculator. Calculate line-by-line sales tax, separate taxable and exempt subtotals, and export results to CSV.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How do you calculate sales tax on an invoice with both taxable and exempt items?',
    answer:
      'To calculate tax on a mixed invoice, categorize each line item as either taxable (such as prepared food, general merchandise, or taxable services) or tax-exempt (such as non-prepared groceries, prescription drugs, or pure consulting labor). Sum only the taxable line totals to calculate the Taxable Subtotal. Multiply this taxable subtotal by the combined tax rate. Finally, add the calculated sales tax to the sum of all items (taxable + exempt) to determine the Grand Total.',
  },
  {
    question: 'Should sales tax be calculated per line item or on the invoice subtotal?',
    answer:
      'Under Streamlined Sales and Use Tax Agreement (SSUTA) Section 324, sellers may calculate tax on an item-by-item basis or an invoice-level basis, provided the rounding rule is applied consistently to the nearest whole cent using standard half-up rounding. Small 1-cent rounding variances between the two methods are legally recognized.',
  },
  {
    question: 'How do I export calculated invoices to Excel or QuickBooks?',
    answer:
      'After entering your items, quantities, unit prices, and tax checkboxes, click the "Export CSV" button. The downloaded CSV file can be opened directly in Microsoft Excel, Google Sheets, or imported into bookkeeping platforms like QuickBooks, Xero, or FreshBooks.',
  },
  {
    question: 'What are common tax-exempt items in US retail?',
    answer:
      'Common exemptions include: grocery foods (in over 30 states), prescription medications (in all 50 states), medical equipment, clothing below certain thresholds (such as in Pennsylvania, New Jersey, and Minnesota), and items purchased for resale with an active resale certificate.',
  },
  {
    question: 'How are multi-item discounts handled across line items?',
    answer:
      'If an invoice features a lump-sum dollar discount (e.g., $20 off an entire order), the discount must be apportioned pro-rata across all items based on their relative values before calculating tax on the taxable lines.',
  },
]

export default function BulkSalesTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bulk Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/bulk-sales-tax-calculator',
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
    name: 'How to Calculate Sales Tax on a Multi-Item Invoice',
    description: 'A 4-step process for calculating sales tax across mixed taxable and tax-exempt line items.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Calculate Line Item Totals',
        text: 'Multiply quantity by unit price for each item on the invoice.',
      },
      {
        '@type': 'HowToStep',
        name: 'Flag Taxable vs. Exempt Lines',
        text: 'Identify items subject to state and local sales tax versus statutory exemptions (e.g. groceries, medical supplies).',
      },
      {
        '@type': 'HowToStep',
        name: 'Sum Taxable Subtotal',
        text: 'Add together only the line totals of taxable goods to determine the taxable base.',
      },
      {
        '@type': 'HowToStep',
        name: 'Apply Tax Rate & Sum Grand Total',
        text: 'Multiply taxable subtotal by the sales tax rate. Add the tax amount to the total of all items (taxable and exempt).',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'bulk-tax-tool', label: 'Interactive Multi-Item Invoice Tool' },
    { id: 'mixed-tax-rules', label: 'Taxable vs. Tax-Exempt Line Items' },
    { id: 'rounding-rules', label: 'SSUTA Invoicing Rounding Standards' },
    { id: 'sample-invoice', label: 'Worked Multi-Item Invoice Example' },
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
          { name: 'Bulk Sales Tax Calculator', url: '/bulk-sales-tax-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              Multi-Item Invoice Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bulk Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Build multi-item invoices, separate taxable and tax-exempt goods, calculate total sales tax, and export results directly to CSV.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Complies with Streamlined Sales and Use Tax Agreement (SSUTA) rounding rules</span>
          </div>
        </header>

        <section id="bulk-tax-tool">
          <BulkTaxTool />
        </section>

        <div className="pt-6 space-y-10">
          <TableOfContents items={tocItems} title="Bulk Invoicing Guide Contents" />

          <section id="mixed-tax-rules" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Taxable vs. Tax-Exempt Line Items
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Real-world invoices rarely contain exclusively taxable goods. Supermarkets, department stores, wholesalers, and general contractors routinely issue receipts combining taxable merchandise with non-taxable staples, professional services, or shipping charges.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Typically Taxable
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>General retail consumer goods</li>
                  <li>Prepared hot food and restaurant meals</li>
                  <li>Digital software, SaaS (in ~30 states)</li>
                  <li>Cosmetics, alcohol, and tobacco products</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Commonly Tax-Exempt
                </div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  <li>Unprepared grocery food staples</li>
                  <li>Prescription drugs & medical prosthetics</li>
                  <li>Pure consulting or repair labor (state-dependent)</li>
                  <li>Items purchased with a valid Resale Certificate</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="rounding-rules" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              SSUTA Invoicing Rounding Standards
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The Streamlined Sales and Use Tax Agreement (SSUTA Section 324) specifies mathematical rounding standards adopted by over 24 US states:
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 space-y-2 border border-slate-200/90 text-xs sm:text-sm">
              <div className="font-bold text-slate-900">Standard Half-Up Rounding Rule:</div>
              <p className="text-slate-600 leading-relaxed m-0">
                Tax must be computed to the third decimal place. If the third decimal is <strong>5 or greater</strong>, round up to the next cent ($3.455 becomes $3.46). If the third decimal is <strong>4 or less</strong>, round down ($3.454 becomes $3.45).
              </p>
            </div>
          </section>

          <section id="sample-invoice" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Worked Multi-Item Invoice Example
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Unit Price</th>
                    <th className="p-3">Line Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Tax (8%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Desk Organizer</td>
                    <td className="p-3">2</td>
                    <td className="p-3">$25.00</td>
                    <td className="p-3">$50.00</td>
                    <td className="p-3 text-emerald-700 font-semibold">Taxable</td>
                    <td className="p-3 text-blue-700">$4.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Office Coffee (Food Staple)</td>
                    <td className="p-3">1</td>
                    <td className="p-3">$18.00</td>
                    <td className="p-3">$18.00</td>
                    <td className="p-3 text-slate-500 font-semibold">Exempt</td>
                    <td className="p-3 text-slate-400">$0.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Ergonomic Mouse</td>
                    <td className="p-3">1</td>
                    <td className="p-3">$45.00</td>
                    <td className="p-3">$45.00</td>
                    <td className="p-3 text-emerald-700 font-semibold">Taxable</td>
                    <td className="p-3 text-blue-700">$3.60</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                    <td colSpan={3} className="p-3 text-slate-900">Summary: Non-Taxable $18.00 | Taxable $95.00</td>
                    <td className="p-3">$113.00</td>
                    <td className="p-3 text-blue-700 font-sans">Total Tax:</td>
                    <td className="p-3 text-blue-700">$7.60</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold text-blue-900">
                    <td colSpan={5} className="p-3 text-right">Invoice Grand Total (Items + Tax):</td>
                    <td className="p-3 text-base">$120.60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <FAQAccordion items={FAQS} title="Frequently Asked Questions on Invoicing & Bulk Sales Tax" />
          </section>
        </div>
      </div>
    </>
  )
}
