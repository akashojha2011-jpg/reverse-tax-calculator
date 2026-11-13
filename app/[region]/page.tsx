import React from 'react'
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { REGIONS, getRegionBySlug, type RegionData } from '@/data/regions'
import { getUsStateTaxRate, type StateTaxData } from '@/data/us-tax-rates'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import {
  Percent,
  Receipt,
  Building2,
  CheckCircle2,
  Info,
  ExternalLink,
  ShieldCheck,
  MapPin,
  HelpCircle,
} from 'lucide-react'

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

  // Look up authoritative state details if US state
  const usStateData = getUsStateTaxRate(region.slug)

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

  const authorityName = usStateData?.authorityName || `${region.name} Department of Revenue`
  const authorityUrl = usStateData?.authorityUrl

  // Pre-calculate sample lookup table rows (12 standard tiers)
  const sampleAmounts = [10, 25, 50, 75, 100, 150, 250, 500, 750, 1000, 2500, 5000]
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

  // Standard high-quality FAQs
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
      answer: usStateData
        ? `In ${region.name}, groceries are ${usStateData.rules.groceries.toLowerCase()}. Prescription drugs are ${usStateData.rules.prescriptionDrugs.toLowerCase()}.`
        : `In ${region.name}, grocery items are generally exempt or taxed at reduced rates, while prescription medications are fully exempt.`,
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
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
                <Receipt className="w-4 h-4 text-blue-600" />
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
                  <span className="text-slate-600 shrink-0">Official Authority:</span>
                  <div className="text-right">
                    {authorityUrl ? (
                      <a
                        href={authorityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 text-xs"
                      >
                        <span>{authorityName}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="font-semibold text-slate-800 text-xs">{authorityName}</span>
                    )}
                  </div>
                </div>

                <div className="pt-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Reverse Calculation Formula
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 font-mono text-xs text-blue-900 space-y-1">
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
                <strong>Need local city or county rates?</strong> If your purchase was made in a city or county with local surtaxes, simply change the tax percentage in the calculator above to match your local combined receipt rate.
              </div>
            </div>
          </div>
        </section>

        {/* Major Localities Table (if state has local taxes) */}
        {usStateData?.majorJurisdictions && usStateData.majorJurisdictions.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-xs space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Major Municipalities & Combined Rates in {region.name}</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Local city and county surcharges across key jurisdictions in {region.name}:
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                    <th className="py-2.5 px-3 sm:px-4 font-bold">City / County Jurisdiction</th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">Type</th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">State Rate</th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">Local Surcharge</th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold text-blue-700">Combined Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usStateData.majorJurisdictions.map((loc) => (
                    <tr key={loc.name} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-900">{loc.name}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-slate-600 capitalize">{loc.type}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-slate-600">{region.rate}%</td>
                      <td className="py-2.5 px-3 sm:px-4 text-slate-600">+{loc.rate.toFixed(3).replace(/\.?0+$/, '')}%</td>
                      <td className="py-2.5 px-3 sm:px-4 font-bold text-blue-700">{loc.combinedRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Quick-Lookup Reference Table (12 Tiers) */}
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
                      <th className="py-3 px-4 font-bold text-blue-700">Total Tax Paid</th>
                    </>
                  ) : (
                    <th className="py-3 px-4 font-bold text-blue-700">
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
                        <td className="py-2.5 px-4 font-bold text-blue-700">
                          {region.currencySymbol}{row.tax.toFixed(2)}
                        </td>
                      </>
                    ) : (
                      <td className="py-2.5 px-4 font-bold text-blue-700">
                        {region.currencySymbol}{row.tax.toFixed(2)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* State Tax Rules & Verified Exemptions Overview */}
        <section className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 m-0">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Key {region.name} Sales Tax Rules & Exemptions</span>
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Groceries & Food</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                {usStateData ? usStateData.rules.groceries : 'Exempt from state sales tax in most jurisdictions.'} Prepared meals and dining out remain subject to standard rates.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Prescription Drugs & Healthcare</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                {usStateData ? usStateData.rules.prescriptionDrugs : 'Prescription medicines and essential healthcare supplies are exempt from sales tax.'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Clothing & Apparel</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                {usStateData ? usStateData.rules.clothing : 'Standard sales tax applies unless a specific local threshold exemption applies.'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Digital Goods & Services</div>
              <p className="text-slate-600 text-xs leading-relaxed m-0">
                {usStateData ? usStateData.rules.digitalGoods : 'Digital subscriptions and downloads may be taxable depending on state classification.'}
              </p>
            </div>
          </div>

          {usStateData?.rules.economicNexus && (
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong>Remote Sellers & Online Nexus:</strong> In {region.name}, remote out-of-state retailers must register and collect sales tax if their annual sales meet or exceed <strong>{usStateData.rules.economicNexus}</strong>.
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
