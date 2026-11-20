import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TaxBreakdownTool } from '@/components/TaxBreakdownTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Layers, ArrowRight, ShieldCheck, MapPin, Building2, Calculator, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sales Tax Breakdown Calculator – State, County, City & District',
  description:
    'Understand how sales tax is divided across state, county, city and special district components. Free online breakdown calculator.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
    title: 'Sales Tax Breakdown Calculator – State, County, City & District',
    description:
      'Understand how sales tax is divided across state, county, city and special district components.',
    siteName: 'ReverseTaxCalculator.pro',
  },
}

const FAQS = [
  {
    question: 'How is sales tax revenue distributed across government levels?',
    answer:
      'When you pay sales tax, the revenue is shared among several governmental tiers: the state general fund, county operations, municipal city programs, and special purpose districts (such as public transit, schools, or emergency response). Retailers collect the combined percentage and remit it to the state Department of Revenue, which distributes local portions back to counties and municipalities.',
  },
  {
    question: 'What is a Special Purpose District (SPD) tax?',
    answer:
      'Special purpose districts are local taxing entities established to fund specific regional public projects, such as regional transit networks (like MTA in New York or BART in the Bay Area), stadium authorities, flood control, or hospital districts.',
  },
  {
    question: 'Can I reverse calculate individual tax components from a receipt?',
    answer:
      'Yes. By dividing the gross receipt total by (1 + combined tax rate), you find the pre-tax base subtotal. You then multiply that base subtotal by each individual component percentage to see exactly how much went to state, county, city, and district authorities.',
  },
]

export default function ToolsSalesTaxBreakdownPage() {
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sales Tax Breakdown Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
    description:
      'Understand how sales tax is divided across state, county, city and special district components.',
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sales Tax Breakdown Calculator',
    url: 'https://www.reversetaxcalculator.pro/tools/sales-tax-breakdown/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <BreadcrumbNav
        items={[
          { name: 'Tools', url: '/tools' },
          { name: 'Sales Tax Breakdown Calculator', url: '/tools/sales-tax-breakdown' },
        ]}
      />

      <div className="space-y-16 max-w-7xl mx-auto">
        <section className="pt-2">
          <div className="max-w-3xl space-y-4 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Jurisdictional Allocation Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Sales Tax Breakdown Calculator
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Understand how sales tax is divided across applicable state, county, city and special district components. Enter a purchase price and the breakdown percentages to view the exact dollar allocations.
            </p>
          </div>

          <TaxBreakdownTool />
        </section>

        <section className="space-y-6">
          <FAQAccordion items={FAQS} title="Frequently Asked Questions About Sales Tax Breakdowns" />
        </section>
      </div>
    </>
  )
}
