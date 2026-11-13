import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BulkTaxTool } from '@/components/BulkTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { FileSpreadsheet, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bulk Sales Tax Calculator — Multi-Item Invoice & Receipt Tool',
  description:
    'Free multi-item invoice and bulk sales tax calculator. Calculate line-by-line sales tax, separate taxable and exempt subtotals, and export results to CSV.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/bulk-sales-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/bulk-sales-tax-calculator',
    title: 'Bulk Sales Tax Calculator — Multi-Item Invoice & Receipt Tool',
    description:
      'Free multi-item invoice and bulk sales tax calculator. Calculate line-by-line sales tax, separate taxable and exempt subtotals, and export results to CSV.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'How do you calculate sales tax on an invoice with both taxable and exempt items?',
    answer:
      'To calculate tax on a mixed invoice, separate items into two categories: taxable goods and tax-exempt services or products. Sum only the taxable line totals to obtain the Taxable Subtotal. Multiply this taxable subtotal by the sales tax rate. Finally, add the sales tax to the sum of all items (both taxable and exempt) to get the Grand Total.',
  },
  {
    question: 'Should sales tax be calculated per line item or on the invoice subtotal?',
    answer:
      'Under most state tax regulations, vendors may calculate sales tax either line-by-line or on the transaction aggregate total, provided they round to the nearest cent using standard mathematical rounding (round half up). Small 1-cent rounding variances between the two methods are legally recognized.',
  },
  {
    question: 'Can I export the calculated invoice to Excel or accounting software?',
    answer:
      'Yes! Use the "Export CSV" button to download a complete spreadsheet containing your item descriptions, quantities, unit prices, tax eligibility flags, line-item taxes, and grand totals ready for Microsoft Excel or Google Sheets.',
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

      <BreadcrumbNav
        items={[
          { name: 'Home', url: '/' },
          { name: 'Bulk Sales Tax Calculator', url: '/bulk-sales-tax-calculator' },
        ]}
      />

      <div className="space-y-10">
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              Multi-Item Invoice Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bulk Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Build multi-item invoices, separate taxable and tax-exempt goods, calculate total sales tax, and export results directly to CSV.
          </p>
        </header>

        <BulkTaxTool />

        <FAQAccordion items={FAQS} title="Frequently Asked Questions on Invoicing & Bulk Sales Tax" />
      </div>
    </>
  )
}
