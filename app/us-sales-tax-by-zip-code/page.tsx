import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ZipTaxLookupTool } from '@/components/ZipTaxLookupTool'
import { FAQAccordion } from '@/components/FAQAccordion'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { MapPin, Info, ArrowRight, ShieldCheck, CheckCircle2, Building, Scale, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'US Sales Tax by ZIP Code Calculator (2026) — State, County & City Rates',
  description:
    'Free US sales tax rate lookup by 5-digit ZIP code. Calculate sales tax to add or reverse calculate pre-tax amounts from receipts with combined state, county, and local rates.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/us-sales-tax-by-zip-code',
  },
}

const ZIP_FAQS = [
  {
    question: 'How do I calculate sales tax using a 5-digit ZIP code?',
    answer:
      'To calculate sales tax with a ZIP code, determine the combined tax rate (state baseline + county surtax + city municipal tax + special transit/district assessments). For forward calculations, multiply your pre-tax subtotal by the combined decimal rate (e.g., $100 × 0.08875 = $8.88 in NYC 10001). For reverse calculations from a receipt total, divide the total bill by (1 + tax rate decimal) (e.g., $108.88 ÷ 1.08875 = $100.00).',
  },
  {
    question: 'Why do tax rates differ within the same ZIP code?',
    answer:
      'Postal ZIP codes were created by the USPS in 1963 solely to optimize mail delivery routes and do not follow municipal or county borders. An estimated 18% to 22% of US ZIP codes are "split ZIP codes" that span multiple county borders or cross incorporated city limits. Addresses on opposite sides of a street in the same 5-digit ZIP code can have different local tax rates.',
  },
  {
    question: 'What is the difference between origin-based and destination-based sales tax?',
    answer:
      'In destination-based states (the majority of US states, including New York, Florida, and Georgia), sales tax is calculated based on where the buyer takes possession or where the item is shipped. In origin-based states (such as Texas, Pennsylvania, Ohio, and Virginia), sales tax on intrastate orders is calculated based on the seller’s location, office, or warehouse.',
  },
  {
    question: 'What are Special Purpose Districts (SPDs) in sales tax rates?',
    answer:
      'Special Purpose Districts (also known as Special District Taxes or SPDs) are local authorities approved by voters to fund dedicated public services—such as mass transit (e.g., MTA in New York, BART in San Francisco, RTA in Chicago), hospital systems, flood control, or police/fire infrastructure. SPDs typically add between 0.10% and 1.50% to the combined sales tax rate.',
  },
  {
    question: 'How do businesses ensure 100% accurate sales tax compliance?',
    answer:
      'While 5-digit ZIP lookups provide a strong baseline estimate, enterprise e-commerce merchants and retailers rely on 9-digit ZIP codes (ZIP+4) or rooftop geocoding (matching latitude and longitude against official state Department of Revenue GIS boundary shapefiles) to verify whether an address lies inside or outside an incorporated city or special tax boundary.',
  },
]

export default function ZipTaxLookupPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'US Sales Tax by ZIP Code Calculator',
    url: 'https://www.reversetaxcalculator.pro/us-sales-tax-by-zip-code',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Interactive US sales tax calculator by ZIP code. Compute combined state, county, and municipal sales taxes backwards and forwards.',
  }

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ZIP_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  const stackingExamples = [
    {
      city: 'New York, NY',
      zip: '10001',
      state: '4.000%',
      county: '0.000%',
      cityRate: '4.500%',
      district: '0.375% (MCTD)',
      total: '8.875%',
      taxOn100: '$8.88',
    },
    {
      city: 'Beverly Hills, CA',
      zip: '90210',
      state: '6.000%',
      county: '0.250%',
      cityRate: '1.250%',
      district: '2.000% (Transit/H)',
      total: '9.500%',
      taxOn100: '$9.50',
    },
    {
      city: 'Chicago, IL',
      zip: '60601',
      state: '6.250%',
      county: '1.750%',
      cityRate: '1.250%',
      district: '1.000% (RTA)',
      total: '10.250%',
      taxOn100: '$10.25',
    },
    {
      city: 'Houston, TX',
      zip: '77002',
      state: '6.250%',
      county: '0.000%',
      cityRate: '1.000%',
      district: '1.000% (METRO)',
      total: '8.250%',
      taxOn100: '$8.25',
    },
    {
      city: 'Seattle, WA',
      zip: '98101',
      state: '6.500%',
      county: '0.000%',
      cityRate: '3.850%',
      district: '0.000%',
      total: '10.350%',
      taxOn100: '$10.35',
    },
    {
      city: 'Miami, FL',
      zip: '33101',
      state: '6.000%',
      county: '1.000%',
      cityRate: '0.000%',
      district: '0.000%',
      total: '7.000%',
      taxOn100: '$7.00',
    },
    {
      city: 'Portland, OR',
      zip: '97201',
      state: '0.000%',
      county: '0.000%',
      cityRate: '0.000%',
      district: '0.000%',
      total: '0.000%',
      taxOn100: '$0.00',
    },
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

      <BreadcrumbNav
        items={[
          { name: 'Sales Tax', url: '/reverse-sales-tax-calculator' },
          { name: 'ZIP Code Tax Lookup', url: '/us-sales-tax-by-zip-code' },
        ]}
      />

      <div className="space-y-12">
        {/* Header Section */}
        <header className="space-y-3 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              US ZIP Code Tax Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            US Sales Tax by ZIP Code Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Look up current combined sales tax rates across 5-digit US ZIP codes. Calculate sales tax to add or reverse-calculate the pre-tax price from any tax-inclusive receipt.
          </p>
        </header>

        {/* Interactive Lookup Tool */}
        <ZipTaxLookupTool />

        {/* Multi-Jurisdiction Stacking Data Table */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="max-w-3xl space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Multi-Jurisdiction Tax Stacking Across US ZIP Codes
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike European and Canadian tax systems where national or provincial rates are uniform, the United States features more than 13,000 distinct taxing jurisdictions. A single purchase often triggers 3 to 5 layered taxes that combine into the final register rate.
            </p>
          </div>

          {/* Real Data Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Metropolitan Area (ZIP)</th>
                  <th className="py-3 px-4 font-bold">State Base</th>
                  <th className="py-3 px-4 font-bold">County Surtax</th>
                  <th className="py-3 px-4 font-bold">City / Municipal</th>
                  <th className="py-3 px-4 font-bold">Special District (SPD)</th>
                  <th className="py-3 px-4 font-bold text-blue-700">Combined Rate</th>
                  <th className="py-3 px-4 font-bold text-slate-900">Tax on $100</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stackingExamples.map((item) => (
                  <tr key={item.zip} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {item.city} <span className="text-slate-400 font-mono text-xs">({item.zip})</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{item.state}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{item.county}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{item.cityRate}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{item.district}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{item.total}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.taxOn100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-slate-500 leading-relaxed">
            * Note: Tax rates reflect baseline tangible personal property retail transactions. Certain categories (groceries, prescription drugs, apparel) may qualify for statutory state exemptions or reduced rates.
          </div>
        </section>

        {/* In-Depth Technical Guide: The ZIP Code Boundary Problem */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              The ZIP Code Boundary Problem: Why ZIP Codes Aren&apos;t Tax Jurisdictions
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
              A common misconception in retail and e-commerce is that a 5-digit ZIP code uniquely identifies a tax rate. In reality, relying exclusively on 5-digit ZIP codes introduces compliance risk because postal delivery zones and municipal taxing districts serve completely different purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200/90 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Building className="w-4 h-4 text-blue-600" />
                <span>USPS Routes vs. Legal Municipal Charters</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                The United States Postal Service created 5-digit ZIP codes in 1963 purely to optimize delivery truck routes and mail sorting facilities. ZIP codes regularly cross city boundaries, school districts, and county lines. Tax authorities, by contrast, levy taxes based strictly on statutory municipal and county charter boundaries.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/90 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>The &ldquo;Split ZIP&rdquo; Phenomenon</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Over 20% of US ZIP codes are &ldquo;split ZIPs&rdquo; that span more than one taxing jurisdiction. For example, in Colorado ZIP 80111, addresses on one side of Belleview Avenue fall inside Greenwood Village (6.75% rate), while addresses a block south belong to Centennial (7.25% to 7.75% rate). A 5-digit lookup alone cannot differentiate between them.
              </p>
            </div>
          </div>

          {/* Technical Compliance Advice */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/90 text-sm text-blue-900 leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Enterprise Tax Compliance Recommendation:</strong>
              For high-volume online businesses and accountants filing quarterly returns, use 9-digit ZIP codes (ZIP+4) or rooftop-level geocoding (matching street latitude and longitude against state GIS shapefiles) to ensure exact local tax determination.
            </div>
          </div>
        </section>

        {/* Origin-Based vs. Destination-Based Sourcing Rules */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="max-w-3xl space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Origin vs. Destination Sourcing: Which Rate Applies?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When ordering goods online or shipping between cities, the applicable sales tax rate depends on whether the transaction takes place in an origin-based or destination-based state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md uppercase">
                Destination-Based Sourcing (38+ States)
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Tax is levied based on the <strong>shipping destination</strong> where the buyer takes physical possession of the merchandise. If a customer in Buffalo, NY orders from a merchant in Manhattan, the lower Erie County tax rate applies.
              </p>
              <div className="text-xs text-slate-500 font-medium pt-1">
                Examples: New York, Florida, Georgia, Washington, North Carolina, Colorado, New Jersey.
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase">
                Origin-Based Sourcing (11 States)
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Tax on in-state shipments is levied based on the <strong>seller&apos;s physical location</strong> (office, store, or warehouse). If a Dallas merchant ships to Austin, the Dallas local rate is collected.
              </p>
              <div className="text-xs text-slate-500 font-medium pt-1">
                Examples: Texas, Ohio, Pennsylvania, Virginia, Arizona, Illinois, New Mexico, Utah.
              </div>
            </div>
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
