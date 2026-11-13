import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ZipTaxLookupTool } from '@/components/ZipTaxLookupTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { MapPin, Info, ShieldCheck, ArrowRight, Building2, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'US Sales Tax by ZIP Code Calculator | Lookup Combined Rates (2026)',
  description:
    'Look up accurate combined sales tax rates by 5-digit US ZIP code. Calculate state, county, city, and special district sales tax forward and in reverse.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/us-sales-tax-by-zip-code',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/us-sales-tax-by-zip-code',
    title: 'US Sales Tax by ZIP Code Calculator | Lookup Combined Rates (2026)',
    description:
      'Look up accurate combined sales tax rates by 5-digit US ZIP code. Calculate state, county, city, and special district sales tax forward and in reverse.',
    siteName: 'Reverse Tax Calculator',
  },
}

const ZIP_FAQS = [
  {
    question: 'How are sales taxes determined by ZIP code in the United States?',
    answer:
      'In the United States, retail sales tax is rarely a single number. Instead, it is an aggregate total composed of the statewide base tax, plus county surcharges, municipal city taxes, and special local district taxes (such as regional transportation authorities, emergency services, or stadium districts). Entering a ZIP code aggregates all active overlapping jurisdictions.',
  },
  {
    question: 'Can a single 5-digit ZIP code have multiple sales tax rates?',
    answer:
      'Yes. ZIP codes were designed by the United States Postal Service (USPS) strictly for mail delivery routes, not taxing jurisdictions. A single ZIP code can cross municipal borders, school districts, and even county lines. In boundary areas, exact address-level rooftop geolocation is recommended for complex corporate invoicing.',
  },
  {
    question: 'How do I remove sales tax from a receipt using my local ZIP rate?',
    answer:
      'To reverse-calculate the pre-tax price from a tax-inclusive receipt, divide the total receipt amount by (1 + Combined Tax Rate / 100). For example, with an 8.875% combined rate in New York City (10001), divide your total by 1.08875. The difference is the tax paid.',
  },
  {
    question: 'Which states have zero local sales taxes?',
    answer:
      'Five states (Alaska, Delaware, Montana, New Hampshire, and Oregon) have zero statewide sales tax. Furthermore, several states with a state sales tax prohibit local county or city taxes altogether, maintaining a completely uniform statewide rate: Connecticut, Kentucky, Indiana, Maryland, Massachusetts, Michigan, and the District of Columbia.',
  },
]

export default function ZipTaxLookupPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'US Sales Tax by ZIP Code Calculator',
    url: 'https://www.reversetaxcalculator.pro/us-sales-tax-by-zip-code',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ZIP_FAQS.map((faq) => ({
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
          { name: 'Sales Tax', url: '/reverse-sales-tax-calculator' },
          { name: 'ZIP Code Tax Lookup', url: '/us-sales-tax-by-zip-code' },
        ]}
      />

      <div className="space-y-10">
        {/* Header Section */}
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              US ZIP Code Tax Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            US Sales Tax by ZIP Code Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Find current combined sales tax rates across 5-digit US ZIP codes. Calculate sales tax to add or reverse-calculate the pre-tax price from any tax-inclusive receipt.
          </p>
        </header>

        {/* Interactive Lookup Tool */}
        <ZipTaxLookupTool />

        {/* Technical Explainer & Educational Section */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Understanding Multi-Jurisdiction US Sales Taxes
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike European and Canadian value-added tax systems where national or provincial rates are largely uniform, the United States features more than 13,000 distinct taxing jurisdictions across 50 states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">State Base Tax</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                45 states and Washington D.C. impose a statewide baseline sales tax ranging from 2.90% (Colorado) to 7.25% (California). 5 states impose 0.00%.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">County & Municipal Taxes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Counties and incorporated municipalities can levy optional local surtaxes to fund local public services, roads, and municipal infrastructure.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-black text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Special Districts (SPDs)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Voter-approved district authorities—such as transit districts (e.g. MTA in NY, BART in CA, RTA in Chicago) or emergency response districts—add specific fractional percentages.
              </p>
            </div>
          </div>

          {/* Precision Notice */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Important Tax Disclaimer on ZIP Boundaries</span>
            </div>
            <p className="m-0">
              Postal ZIP codes do not strictly coincide with municipal boundaries. For high-volume enterprise compliance, physical address geolocation (rooftop geocoding) is required to determine whether an address falls inside or outside an incorporated city limit.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <FAQAccordion items={ZIP_FAQS} title="Frequently Asked Questions about Sales Tax by ZIP Code" />

        {/* State Directory Navigation */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Explore Sales Tax by US State</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed exemption rules, grocery rules, and county rate ranges for all 50 states.
              </p>
            </div>
            <Link
              href="/reverse-sales-tax-calculator"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <span>View All 50 States</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
            {[
              { name: 'California', slug: 'california' },
              { name: 'New York', slug: 'new-york' },
              { name: 'Texas', slug: 'texas' },
              { name: 'Florida', slug: 'florida' },
              { name: 'Illinois', slug: 'illinois' },
              { name: 'Pennsylvania', slug: 'pennsylvania' },
              { name: 'Ohio', slug: 'ohio' },
              { name: 'Georgia', slug: 'georgia' },
              { name: 'North Carolina', slug: 'north-carolina' },
              { name: 'Michigan', slug: 'michigan' },
              { name: 'Washington', slug: 'washington' },
              { name: 'Massachusetts', slug: 'massachusetts' },
            ].map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}-reverse-sales-tax-calculator`}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium transition-colors border border-slate-200/60"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
