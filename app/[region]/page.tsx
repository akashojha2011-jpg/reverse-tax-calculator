import React from 'react'
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { REGIONS, getRegionBySlug, type RegionData } from '@/data/regions'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { Percent, Receipt, Building2, CheckCircle2, Info } from 'lucide-react'

interface PageProps {
  params: {
    region: string
  }
}

// Canonical static route generation (1 clean URL per region)
export async function generateStaticParams() {
  return REGIONS.map((r) => ({
    region: `${r.slug}-reverse-sales-tax-calculator`,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params?.region
  const region = slug ? getRegionBySlug(slug) : undefined
  if (!region) return {}

  const canonicalUrl = `https://www.reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`
  const title = `${region.name} Reverse ${region.taxName} Calculator (${region.rate}%)`
  const description = `Calculate ${region.name} pre-tax net price and ${region.taxName} paid backwards from any receipt or invoice total. Updated for 2026 rates.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: 'Reverse Tax Calculator',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

function getTaxAuthority(region: RegionData): string {
  if (region.country === 'CA') {
    return region.slug === 'quebec' ? 'Revenu Québec & Canada Revenue Agency (CRA)' : 'Canada Revenue Agency (CRA)'
  }
  if (region.country === 'UK') return 'HM Revenue & Customs (HMRC)'
  if (region.slug === 'australia') return 'Australian Taxation Office (ATO)'
  if (region.slug === 'new-zealand') return 'Inland Revenue Department (IRD)'
  if (region.slug === 'singapore') return 'Inland Revenue Authority of Singapore (IRAS)'

  const usAuthorities: Record<string, string> = {
    california: 'California Dept of Tax and Fee Administration (CDTFA)',
    'new-york': 'New York State Dept of Taxation and Finance',
    texas: 'Texas Comptroller of Public Accounts',
    florida: 'Florida Department of Revenue',
    illinois: 'Illinois Department of Revenue',
    pennsylvania: 'Pennsylvania Department of Revenue',
    ohio: 'Ohio Department of Taxation',
    georgia: 'Georgia Department of Revenue',
    'north-carolina': 'North Carolina Department of Revenue',
    michigan: 'Michigan Department of Treasury',
    washington: 'Washington State Department of Revenue',
    massachusetts: 'Massachusetts Department of Revenue',
    arizona: 'Arizona Department of Revenue',
    tennessee: 'Tennessee Department of Revenue',
    indiana: 'Indiana Department of Revenue',
    missouri: 'Missouri Department of Revenue',
    maryland: 'Maryland Comptroller of Maryland',
    wisconsin: 'Wisconsin Department of Revenue',
    colorado: 'Colorado Department of Revenue',
    minnesota: 'Minnesota Department of Revenue',
    'south-carolina': 'South Carolina Department of Revenue',
    alabama: 'Alabama Department of Revenue',
    louisiana: 'Louisiana Department of Revenue',
    kentucky: 'Kentucky Department of Revenue',
    oregon: 'Oregon Department of Revenue (No sales tax)',
    oklahoma: 'Oklahoma Tax Commission',
    connecticut: 'Connecticut Department of Revenue Services',
    utah: 'Utah State Tax Commission',
    iowa: 'Iowa Department of Revenue',
    nevada: 'Nevada Department of Taxation',
    arkansas: 'Arkansas Department of Finance and Administration',
    mississippi: 'Mississippi Department of Revenue',
    kansas: 'Kansas Department of Revenue',
    'new-mexico': 'New Mexico Taxation and Revenue Department',
    nebraska: 'Nebraska Department of Revenue',
    idaho: 'Idaho State Tax Commission',
    'west-virginia': 'West Virginia State Tax Department',
    hawaii: 'Hawaii Department of Taxation',
    'new-hampshire': 'New Hampshire Dept of Revenue (No sales tax)',
    maine: 'Maine Revenue Services',
    montana: 'Montana Department of Revenue (No sales tax)',
    'rhode-island': 'Rhode Island Division of Taxation',
    delaware: 'Delaware Division of Revenue (No sales tax)',
    'south-dakota': 'South Dakota Department of Revenue',
    'north-dakota': 'North Dakota Office of State Tax Commissioner',
    alaska: 'Alaska Municipal League (Local Boroughs)',
    vermont: 'Vermont Department of Taxes',
    wyoming: 'Wyoming Department of Revenue',
    'district-of-columbia': 'DC Office of Tax and Revenue',
  }

  return usAuthorities[region.slug] || `${region.name} Department of Revenue`
}

function getGroceryStatus(slug: string): string {
  const groceryRules: Record<string, string> = {
    mississippi: 'Taxable at 7.00% standard rate',
    alabama: 'Reduced 3.00% state rate',
    arkansas: 'Reduced 0.125% state rate',
    hawaii: 'Taxable under 4.00% General Excise Tax',
    idaho: 'Taxable at 6.00% (grocery tax credit applies on state income tax)',
    illinois: 'Reduced 1.00% state rate',
    kansas: 'Reduced 2.00% state rate',
    missouri: 'Reduced 1.225% state rate',
    'south-dakota': 'Taxable at 4.20%',
    tennessee: 'Reduced 4.00% state rate',
    utah: 'Reduced 3.00% rate',
    virginia: 'Exempt from state tax (1.00% local tax applies)',
    alaska: 'Exempt from state tax (local borough rates may apply)',
    delaware: 'No sales tax',
    montana: 'No sales tax',
    'new-hampshire': 'No sales tax',
    oregon: 'No sales tax',
  }

  return groceryRules[slug] || 'Exempt from state sales tax'
}

export default function RegionalCalculatorPage({ params }: PageProps) {
  const slug = params?.region
  const region = slug ? getRegionBySlug(slug) : undefined
  if (!region) {
    notFound()
  }

  // Enforce canonical URL via 301 Permanent Redirect
  const canonicalSlug = `${region.slug}-reverse-sales-tax-calculator`
  if (slug !== canonicalSlug) {
    permanentRedirect(`/${canonicalSlug}`)
  }

  // Determine parent hub
  let hubUrl = '/reverse-sales-tax-calculator'
  let hubName = 'Reverse Sales Tax Calculator'
  if (region.taxName.includes('HST')) {
    hubUrl = '/reverse-hst-calculator'
    hubName = 'Reverse HST Calculator'
  } else if (region.taxName.includes('GST')) {
    hubUrl = '/reverse-gst-calculator'
    hubName = 'Reverse GST Calculator'
  } else if (region.taxName.includes('VAT')) {
    hubUrl = '/reverse-vat-calculator'
    hubName = 'Reverse VAT Calculator'
  }

  const authorityName = getTaxAuthority(region)
  const groceryStatus = getGroceryStatus(region.slug)

  // Pre-calculate sample lookup table rows
  const sampleAmounts = [10, 25, 50, 100, 250, 500, 1000]
  const isDual = Boolean(region.secondRate && region.secondRate > 0)
  const effectiveTotalRate = isDual ? region.rate + (region.secondRate || 0) : region.rate
  const divisor = 1 + effectiveTotalRate / 100

  const lookupTable = sampleAmounts.map((gross) => {
    if (region.rate === 0 && !isDual) {
      return { gross, net: gross, tax: 0, tax1: 0, tax2: 0 }
    }
    const net = gross / divisor
    if (isDual) {
      const tax1 = net * (region.rate / 100)
      const tax2 = net * ((region.secondRate || 0) / 100)
      return { gross, net, tax: tax1 + tax2, tax1, tax2 }
    }
    return { gross, net, tax: gross - net, tax1: 0, tax2: 0 }
  })

  // Standard high-quality FAQs (genuine questions, no keyword stuffing)
  const defaultFaqs = [
    {
      question: `How do I reverse calculate ${region.name} ${region.taxName}?`,
      answer: `To calculate the pre-tax price from a tax-inclusive ${region.name} total, divide your gross receipt amount by ${(1 + effectiveTotalRate / 100).toFixed(4).replace(/\.?0+$/, '')} (1 + ${effectiveTotalRate}% tax). The difference between the gross total and your pre-tax result is the exact ${region.taxName} paid.`,
    },
    {
      question: `What is the current ${region.taxName} rate in ${region.name}?`,
      answer: `${region.name} enforces a ${region.rate === 0 ? '0.00% state rate' : `${region.rate.toFixed(2).replace(/\.?0+$/, '')}% base ${region.taxName}`}.${
        region.maxCombinedRate && region.maxCombinedRate > region.rate
          ? ` Local city, county, or district surcharges can raise the combined rate up to ${region.maxCombinedRate}%.`
          : ' There are no additional local municipal sales taxes.'
      }`,
    },
    {
      question: `Why can't I just subtract ${region.rate}% from my ${region.name} receipt?`,
      answer: `Subtracting ${region.rate}% directly from the gross total yields an incorrect number because sales tax is legally added to the lower net subtotal, not the final total. Dividing by 1 + tax rate accurately isolates the original pre-tax amount.`,
    },
    {
      question: `Are groceries and essentials taxable in ${region.name}?`,
      answer: `In ${region.name}, grocery items are generally ${groceryStatus.toLowerCase()}. Prescription medications are exempt from sales tax.`,
    },
  ]

  const faqs = region.faqs && region.faqs.length >= 3 ? region.faqs : defaultFaqs

  // Structured Data Schemas
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${region.name} Reverse ${region.taxName} Calculator`,
    url: `https://www.reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: region.currency,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BreadcrumbNav
        items={[
          { name: hubName, url: hubUrl },
          { name: `${region.name} Calculator`, url: `/${region.slug}-reverse-sales-tax-calculator` },
        ]}
      />

      <div className="space-y-8">
        {/* Page Header */}
        <header className="space-y-3 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
              <Percent className="w-3.5 h-3.5" />
              {region.rate}% {region.taxName}
            </span>
            {region.maxCombinedRate && region.maxCombinedRate > region.rate ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                Local rates up to {region.maxCombinedRate}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Uniform statewide rate
              </span>
            )}
            <span className="inline-flex items-center text-slate-500 text-xs">
              Updated for 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {region.name} Reverse {region.taxName} Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter your total gross receipt or invoice amount to calculate the pre-tax price and {region.taxName} paid in {region.name}.
          </p>
        </header>

        {/* Hero Section: Calculator + Instant Rate & Formula Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Calculator */}
          <div className="lg:col-span-7">
            <CalculatorCard
              initialMode={isDual ? 'dual-tax' : 'sales-tax'}
              defaultGross={region.workedExample.total}
              defaultTaxRate={region.rate}
              defaultSecondTaxRate={region.secondRate}
              defaultSecondTaxName={region.secondTaxName}
              taxName={region.taxName}
              currencySymbol={region.currencySymbol}
              regionName={region.name}
              isCompounded={region.isCompounded}
              hideModeSwitcher
            />
          </div>

          {/* Quick Facts & Math Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 m-0">
                <Receipt className="w-4 h-4 text-brand-600" />
                <span>{region.name} Tax Summary</span>
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-600">State / Base Rate:</span>
                  <span className="font-bold text-slate-900">{region.rate}% {region.taxName}</span>
                </div>

                {isDual && region.secondRate ? (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-600">Second Tax ({region.secondTaxName}):</span>
                    <span className="font-bold text-slate-900">{region.secondRate}%</span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-600">Local Surcharges:</span>
                  <span className="font-bold text-slate-900">
                    {region.maxCombinedRate && region.maxCombinedRate > region.rate
                      ? `Up to ${(region.maxCombinedRate - region.rate).toFixed(2)}% (Max ${region.maxCombinedRate}%)`
                      : 'None (Statewide uniform)'}
                  </span>
                </div>

                <div className="flex items-start justify-between pb-2 border-b border-slate-200 gap-2">
                  <span className="text-slate-600 shrink-0">Tax Authority:</span>
                  <span className="font-semibold text-slate-800 text-right text-xs">
                    {authorityName}
                  </span>
                </div>

                <div className="pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Reverse Calculation Formula
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-brand-900 space-y-1">
                    <div>Net Amount = Total ÷ {(1 + effectiveTotalRate / 100).toFixed(4).replace(/\.?0+$/, '')}</div>
                    <div>{region.taxName} = Total - Net Amount</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tip Box */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Need local city/county taxes?</strong> In municipalities with additional local surcharges, adjust the tax percentage field in the calculator to match your exact local receipt rate.
              </div>
            </div>
          </div>
        </section>

        {/* High-Utility Feature: Quick-Lookup Reference Table */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {region.name} Reverse Tax Lookup Table
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Quickly look up pre-tax net prices and sales tax paid for common receipt totals in {region.name} at the official {region.rate}% rate:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Total Receipt (Gross)</th>
                  <th className="py-3 px-4 font-bold">Pre-Tax Net Amount</th>
                  {isDual ? (
                    <>
                      <th className="py-3 px-4 font-bold">{region.taxName} ({region.rate}%)</th>
                      <th className="py-3 px-4 font-bold">{region.secondTaxName} ({region.secondRate}%)</th>
                      <th className="py-3 px-4 font-bold text-brand-700">Total Tax Paid</th>
                    </>
                  ) : (
                    <th className="py-3 px-4 font-bold text-brand-700">
                      {region.taxName} Paid ({region.rate}%)
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lookupTable.map((row) => (
                  <tr key={row.gross} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">
                      {region.currencySymbol}{row.gross.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      {region.currencySymbol}{row.net.toFixed(2)}
                    </td>
                    {isDual ? (
                      <>
                        <td className="py-2.5 px-4 text-slate-600">
                          {region.currencySymbol}{row.tax1.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600">
                          {region.currencySymbol}{row.tax2.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-brand-700">
                          {region.currencySymbol}{row.tax.toFixed(2)}
                        </td>
                      </>
                    ) : (
                      <td className="py-2.5 px-4 font-bold text-brand-700">
                        {region.currencySymbol}{row.tax.toFixed(2)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* State Tax Rules & Exemptions Overview */}
        <section className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-600" />
            <span>Key {region.name} Sales Tax Rules & Exemptions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Groceries & Food</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                {groceryStatus}. Prepared meals and restaurant dining are subject to the standard sales tax rate.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Prescription Drugs & Healthcare</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                Prescription medications and essential medical equipment are 100% exempt from sales tax in {region.name}.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Local Surcharges & Districts</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                {region.maxCombinedRate && region.maxCombinedRate > region.rate
                  ? `Municipalities, counties, and transit districts may levy local taxes between ${(region.maxCombinedRate - region.rate).toFixed(2)}%, bringing total rates up to ${region.maxCombinedRate}%.`
                  : `${region.name} maintains a flat statewide rate with no additional municipal or county sales taxes.`}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Sales Tax vs. Use Tax</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                If an online or out-of-state retailer does not collect sales tax at checkout, {region.name} residents owe a complementary use tax at the same rate.
              </p>
            </div>
          </div>

          {/* New York specific clothing note */}
          {region.slug === 'new-york' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
              <strong>New York Clothing Exemption:</strong> In New York City and select NY counties, individual clothing and footwear items priced under $110 are exempt from state and local sales tax. Items $110 and above are taxed at the full rate.
            </div>
          )}

          {/* Quebec specific non-compounding note */}
          {region.slug === 'quebec' && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium">
              <strong>Quebec GST & QST Rule:</strong> Quebec sales tax (QST 9.975%) and federal GST (5.00%) are calculated independently on the same pre-tax net subtotal. Combined, receipts carry an effective tax rate of 14.975%.
            </div>
          )}
        </section>

        {/* FAQs */}
        <FAQAccordion items={faqs} title={`${region.name} Tax Questions & Answers`} />

        {/* Internal Navigation */}
        <RelatedCalculatorsGrid
          relatedSlugs={region.relatedRegionSlugs}
          currentSlug={region.slug}
          title={`Other State & Regional Tax Calculators`}
        />
      </div>
    </>
  )
}
