import React from 'react'
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { REGIONS, getRegionBySlug } from '@/data/regions'
import { getUsStateTaxRate } from '@/data/us-tax-rates'
import { CalculatorCard } from '@/components/CalculatorCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import {
  Percent,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  MapPin,
  HelpCircle,
  Receipt,
  AlertTriangle,
  FileText,
  Calculator,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  Scale,
} from 'lucide-react'

interface RegionPageProps {
  params: {
    region: string
  }
}

// Generate static routes for all 50 US States + District of Columbia
export async function generateStaticParams() {
  return REGIONS.filter((r) => r.country === 'US').map((r) => ({
    region: `${r.slug}-reverse-sales-tax-calculator`,
  }))
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const slug = params.region.replace('-reverse-sales-tax-calculator', '').toLowerCase()
  const region = getRegionBySlug(slug)

  if (!region) {
    return {
      title: 'Region Not Found — Reverse Tax Calculator',
      description: 'The requested regional reverse tax calculator does not exist.',
    }
  }

  const title = `${region.name} Reverse ${region.taxName} Calculator (2026) — Calculate Pre-Tax Price`
  const description = `Calculate the pre-tax price and ${region.taxName} paid backwards from any receipt or invoice in ${region.name}. Verified 2026 rates, formula, and local tax tables.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function RegionPage({ params }: RegionPageProps) {
  const slug = params.region.toLowerCase()
  const cleanSlug = slug.replace('-reverse-sales-tax-calculator', '')
  const region = getRegionBySlug(cleanSlug)

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
  let hubUrl = '/'
  let hubName = 'Reverse Sales Tax Calculator'
  if (region.taxName.includes('HST')) {
    hubUrl = '/tools/reverse-hst-calculator'
    hubName = 'Reverse HST Calculator'
  } else if (region.taxName.includes('GST')) {
    hubUrl = '/tools/reverse-gst-calculator'
    hubName = 'Reverse GST Calculator'
  } else if (region.taxName.includes('VAT')) {
    hubUrl = '/tools/reverse-vat-calculator'
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
          ? ` Local city, county, or district surtaxes can raise the combined rate up to ${region.maxCombinedRate}%.`
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

  // Define Table of Contents items
  const tocItems: TocItem[] = [
    { id: 'how-to-use', label: `How to Use the ${region.name} Calculator` },
    { id: 'what-is-reverse-tax', label: `What is Reverse Sales Tax?` },
    { id: 'tax-formula', label: `Reverse Sales Tax Formula` },
    { id: 'worked-examples', label: `Step-by-Step Worked Examples` },
    { id: 'why-subtraction-fails', label: `Why Simple Percentage Subtraction Fails` },
    { id: 'state-tax-structure', label: `${region.name} Sales Tax Structure` },
    ...(usStateData?.majorJurisdictions && usStateData.majorJurisdictions.length > 0
      ? [{ id: 'major-municipalities', label: `Major Municipal Rates in ${region.name}` }]
      : []),
    { id: 'tax-exemptions', label: `Exemptions: Groceries, Medicine & Apparel` },
    { id: 'lookup-table', label: `${region.name} Reverse Tax Lookup Table` },
    { id: 'common-mistakes', label: `Common Calculation Mistakes to Avoid` },
    { id: 'faqs', label: `Frequently Asked Questions` },
    { id: 'sources-and-methodology', label: `Sources & Official Authority Data` },
  ]

  // Build municipal/location rate presets for US states
  const customRatePresets: { label: string; rate: number }[] = [
    { label: `Base (${region.rate}%)`, rate: region.rate },
    ...(usStateData?.majorJurisdictions
      ? usStateData.majorJurisdictions.slice(0, 5).map((j) => ({
          label: `${j.name.split(' (')[0]} (${j.combinedRate}%)`,
          rate: j.combinedRate,
        }))
      : []),
  ]

  // Calculator component props
  const calculatorProps = {
    initialMode: (isDual ? 'dual-tax' : 'sales-tax') as any,
    defaultGross: region.workedExample.total,
    defaultTaxRate: region.rate,
    defaultSecondTaxRate: region.secondRate,
    defaultSecondTaxName: region.secondTaxName,
    taxName: region.taxName,
    currencySymbol: region.currencySymbol,
    regionName: region.name,
    isCompounded: region.isCompounded,
    hideModeSwitcher: true,
    customRatePresets: usStateData && customRatePresets.length > 1 ? customRatePresets : undefined,
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

      {/* Main Container */}
      <div className="space-y-8">
        {/* Page Header */}
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <Percent className="w-3.5 h-3.5" />
              {region.rate}% {region.taxName}
            </span>
            {region.maxCombinedRate && region.maxCombinedRate > region.rate ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Local rates up to {region.maxCombinedRate}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Uniform statewide rate
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {region.name} Reverse {region.taxName} Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Use this calculator to find the original pre-tax price and {region.taxName} paid backwards from any tax-inclusive receipt or invoice in {region.name}.
          </p>

          {/* NOMAD 0% State Statutory Alert */}
          {region.rate === 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1.5 mt-3">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{region.name} 0.00% State Sales Tax Notice (NOMAD State)</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed m-0">
                {region.slug === 'alaska' &&
                  'Alaska levies no statewide sales tax. However, over 100 local boroughs and municipalities (including Juneau, Wasilla, and Homer) assess local sales taxes ranging up to 7.85%. Select your municipality from the calculator presets to compute your exact local reverse tax.'}
                {region.slug === 'delaware' &&
                  'Delaware has 0.00% state and local sales tax. Instead of consumer retail sales tax, Delaware assesses a Gross Receipts Tax directly on business merchants ranging between 0.0945% and 0.7468%.'}
                {region.slug === 'montana' &&
                  'Montana has 0.00% general state sales tax. However, designated resort communities (including Whitefish, West Yellowstone, and Big Sky) levy local resort taxes up to 3.00%–4.00% on lodging, restaurants, and retail.'}
                {region.slug === 'new-hampshire' &&
                  'New Hampshire has 0.00% general state sales tax and no local municipal sales tax. However, an 8.5% Meals and Rentals Tax applies to restaurant dining, hotel accommodations, and car rentals.'}
                {region.slug === 'oregon' &&
                  'Oregon has 0.00% state and local sales tax. The state assesses a Corporate Activity Tax (CAT) on commercial businesses, plus minor local taxes on bicycles and transit in specific districts.'}
                {!['alaska', 'delaware', 'montana', 'new-hampshire', 'oregon'].includes(region.slug) &&
                  `${region.name} does not impose a general statewide sales tax on retail purchases.`}
              </p>
            </div>
          )}

          {/* Authoritative State Tax Data Verification */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
            <div>
              Tax Year: <strong className="text-slate-700">2026 Statutory Rates</strong>
            </div>
            {authorityUrl && (
              <>
                <span>•</span>
                <a
                  href={authorityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <span>{authorityName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </>
            )}
          </div>
        </header>

        {/* Mobile-Only Top Calculator (Appears only on mobile screens) */}
        <div className="block lg:hidden mb-8">
          <CalculatorCard {...calculatorProps} />
        </div>

        {/* Desktop Two-Column Layout (Omni-style: Article on Left 65%, Sticky Calculator on Right 35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Comprehensive Educational Content (lg:col-span-7 xl:col-span-8) */}
          <article className="lg:col-span-7 xl:col-span-8 space-y-10 min-w-0">
            {/* Table of Contents */}
            <TableOfContents items={tocItems} title={`${region.name} Tax Guide Contents`} />

            {/* SECTION 1: How to Use the Calculator */}
            <section id="how-to-use" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                How to Use the {region.name} Reverse Sales Tax Calculator
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Calculating sales tax backwards is essential whenever you hold a receipt or invoice showing only the final checkout total and need to log the pre-tax business expense or verify how much tax was remitted.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                <li>
                  <strong>Enter Total Amount Paid (Gross):</strong> Type the total dollar figure from your receipt (e.g.,{' '}
                  <span className="tabular-nums font-semibold">${region.workedExample.total.toFixed(2)}</span>).
                </li>
                <li>
                  <strong>Confirm or Adjust the Tax Rate:</strong> The calculator defaults to the official {region.name} state rate of{' '}
                  <span className="tabular-nums font-semibold">{region.rate}%</span>. If your transaction occurred in a municipality with a local surcharge (e.g., local county or city add-ons), enter that combined rate instead.
                </li>
                <li>
                  <strong>Read the Instant Breakdown:</strong> The tool automatically divides out the tax component to display your pre-tax net subtotal, the exact sales tax paid, and the mathematical formula used.
                </li>
                <li>
                  <strong>Copy Results:</strong> Use the one-click copy button to paste the itemized figures directly into your bookkeeping software, spreadsheet, or expense report.
                </li>
              </ol>
            </section>

            {/* SECTION 2: What is Reverse Sales Tax? */}
            <section id="what-is-reverse-tax" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                What is Reverse Sales Tax?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Standard &ldquo;forward&rdquo; sales tax calculation takes a known net price and adds tax to arrive at a higher checkout total. A <strong>reverse sales tax calculation</strong> does the exact opposite: it begins with the final tax-inclusive amount and works backwards to isolate the original pre-tax price.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-500">
                    1. Pre-Tax Subtotal (Net)
                  </div>
                  <p className="text-slate-600 m-0">
                    The baseline price set by the retailer before any statutory tax is assessed.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-500">
                    2. Sales Tax Paid
                  </div>
                  <p className="text-slate-600 m-0">
                    The mandatory levy collected by the merchant on behalf of state and municipal revenue authorities.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-500">
                    3. Gross Receipt (Total)
                  </div>
                  <p className="text-slate-600 m-0">
                    The final out-of-pocket figure charged to your payment card or cash tender (Net + Tax).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Reverse Sales Tax Formula */}
            <section id="tax-formula" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Reverse Sales Tax Formula
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Because sales tax is legally assessed as a percentage of the lower net subtotal rather than the higher gross total, reversing the calculation requires division by <strong>1 + the decimal tax rate</strong>.
              </p>

              {/* Styled Formula Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-slate-50 text-slate-900 space-y-3 border border-slate-200">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Standard Mathematical Equations:
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 space-y-1.5">
                  <div>Pre-Tax Price = Gross Total ÷ (1 + Tax Rate)</div>
                  <div>Sales Tax Paid = Gross Total − Pre-Tax Price</div>
                </div>
                <div className="text-xs text-slate-600 pt-3 border-t border-slate-200 leading-relaxed">
                  Where <strong>Gross Total</strong> is your receipt amount and{' '}
                  <strong>Tax Rate</strong> is expressed as a decimal (e.g. {region.rate}% becomes{' '}
                  {(1 + effectiveTotalRate / 100).toFixed(4).replace(/\.?0+$/, '')} divisor).
                </div>
              </div>
            </section>

            {/* SECTION 4: Step-by-Step Worked Examples */}
            <section id="worked-examples" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Step-by-Step Worked Examples in {region.name}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Here is how the reverse tax arithmetic operates on real purchases in {region.name} using the baseline {region.rate}% rate:
              </p>

              <div className="space-y-3">
                {/* Example 1 */}
                <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-semibold text-slate-900 text-sm">
                    Example 1: A ${region.workedExample.total.toFixed(2)} Receipt Total
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 tabular-nums">
                    <div>1. Determine divisor: 1 + ({region.rate} ÷ 100) = <strong>{(1 + region.rate / 100).toFixed(4).replace(/\.?0+$/, '')}</strong></div>
                    <div>2. Calculate net price: ${region.workedExample.total.toFixed(2)} ÷ {(1 + region.rate / 100).toFixed(4).replace(/\.?0+$/, '')} = <strong className="text-slate-900">${region.workedExample.net.toFixed(2)}</strong></div>
                    <div>3. Calculate tax component: ${region.workedExample.total.toFixed(2)} − ${region.workedExample.net.toFixed(2)} = <strong className="text-slate-900">${region.workedExample.tax.toFixed(2)}</strong></div>
                  </div>
                </div>

                {/* Example 2: Major Municipal Combined Rate */}
                {usStateData?.majorJurisdictions && usStateData.majorJurisdictions.length > 0 ? (
                  (() => {
                    const topLoc = usStateData.majorJurisdictions[0]
                    const locDivisor = 1 + topLoc.combinedRate / 100
                    const gross = 250
                    const net = gross / locDivisor
                    const tax = gross - net
                    return (
                      <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="font-semibold text-slate-900 text-sm">
                          Example 2: A $250.00 Receipt in {topLoc.name} ({topLoc.combinedRate}% Combined Rate)
                        </div>
                        <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 tabular-nums">
                          <div>1. Determine combined divisor: 1 + ({topLoc.combinedRate} ÷ 100) = <strong>{locDivisor.toFixed(4).replace(/\.?0+$/, '')}</strong></div>
                          <div>2. Calculate net price: $250.00 ÷ {locDivisor.toFixed(4).replace(/\.?0+$/, '')} = <strong className="text-slate-900">${net.toFixed(2)}</strong></div>
                          <div>3. Calculate combined sales tax: $250.00 − ${net.toFixed(2)} = <strong className="text-slate-900">${tax.toFixed(2)}</strong></div>
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-semibold text-slate-900 text-sm">
                      Example 2: A $250.00 Retail Invoice
                    </div>
                    {(() => {
                      const gross = 250
                      const net = gross / divisor
                      const tax = gross - net
                      return (
                        <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 tabular-nums">
                          <div>1. Calculate net price: $250.00 ÷ {(1 + effectiveTotalRate / 100).toFixed(4).replace(/\.?0+$/, '')} = <strong className="text-slate-900">${net.toFixed(2)}</strong></div>
                          <div>2. Calculate tax component: $250.00 − ${net.toFixed(2)} = <strong className="text-slate-900">${tax.toFixed(2)}</strong></div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 5: Why Simple Percentage Subtraction Fails */}
            <section id="why-subtraction-fails" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Why Simple Percentage Subtraction Fails
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                The most frequent calculation mistake made by consumers and unassisted bookkeepers is attempting to subtract {region.rate}% directly from the gross receipt total.
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2">
                <div className="font-semibold text-slate-900">
                  The Subtraction Fallacy Explained:
                </div>
                <p className="m-0 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  If you take a total of <strong>${region.workedExample.total.toFixed(2)}</strong> and subtract {region.rate}% directly:
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 tabular-nums">
                  ${region.workedExample.total.toFixed(2)} − (${region.workedExample.total.toFixed(2)} × {(region.rate / 100).toFixed(4).replace(/\.?0+$/, '')}) = <strong>${(region.workedExample.total * (1 - region.rate / 100)).toFixed(2)}</strong> (Incorrect)
                </div>
                <p className="m-0 text-xs text-slate-500 leading-relaxed">
                  This results in an inaccurate deduction because {region.rate}% was multiplied against the larger post-tax total rather than the true pre-tax net of <strong>${region.workedExample.net.toFixed(2)}</strong>. Dividing by 1 + tax rate ensures your books balance to the exact cent.
                </p>
              </div>
            </section>

            {/* SECTION 6: State Tax Structure */}
            <section id="state-tax-structure" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                {region.name} Sales Tax Structure Explained
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Sales tax in {region.name} is administered by the{' '}
                {authorityUrl ? (
                  <a
                    href={authorityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-semibold"
                  >
                    {authorityName}
                  </a>
                ) : (
                  <strong>{authorityName}</strong>
                )}
                . The baseline statutory rate is <strong>{region.rate}%</strong>.
              </p>

              {region.maxCombinedRate && region.maxCombinedRate > region.rate ? (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  In addition to the state baseline, local counties, cities, and special transit taxing authorities can levy optional local surtaxes, bringing the maximum combined sales tax rate in {region.name} up to <strong>{region.maxCombinedRate}%</strong>.
                </p>
              ) : (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Unlike states with multi-layered local county or city taxes, {region.name} maintains a uniform statewide rate without independent local municipal sales tax surcharges.
                </p>
              )}
            </section>

            {/* SECTION 7: Major Municipalities Table */}
            {usStateData?.majorJurisdictions && usStateData.majorJurisdictions.length > 0 && (
              <section id="major-municipalities" className="scroll-mt-24 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                  Major Municipal Rates in {region.name}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The table below illustrates combined sales tax rates across prominent cities and counties in {region.name}:
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                        <th className="py-2.5 px-3 sm:px-4 font-bold">Jurisdiction</th>
                        <th className="py-2.5 px-3 sm:px-4 font-bold">Type</th>
                        <th className="py-2.5 px-3 sm:px-4 font-bold">State Base</th>
                        <th className="py-2.5 px-3 sm:px-4 font-bold">Local Surcharge</th>
                        <th className="py-2.5 px-3 sm:px-4 font-bold text-blue-700">Combined Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {usStateData.majorJurisdictions.map((loc) => (
                        <tr key={loc.name} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-900">{loc.name}</td>
                          <td className="py-2.5 px-3 sm:px-4 text-slate-600 capitalize">{loc.type}</td>
                          <td className="py-2.5 px-3 sm:px-4 tabular-nums text-slate-600">{region.rate}%</td>
                          <td className="py-2.5 px-3 sm:px-4 tabular-nums text-slate-600">+{loc.rate.toFixed(3).replace(/\.?0+$/, '')}%</td>
                          <td className="py-2.5 px-3 sm:px-4 tabular-nums font-semibold text-slate-900">{loc.combinedRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* SECTION 8: Sales Tax Exemptions */}
            <section id="tax-exemptions" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Sales Tax Exemptions in {region.name}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Not all retail purchases are subject to standard sales tax. Many essential consumer goods qualify for statutory exemptions under {region.name} tax law:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                    Unprepared Groceries
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm m-0 leading-relaxed">
                    {usStateData ? usStateData.rules.groceries : 'Generally exempt or taxed at reduced state rates.'} Prepared restaurant meals remain fully taxable.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                    Prescription Medications
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm m-0 leading-relaxed">
                    {usStateData ? usStateData.rules.prescriptionDrugs : 'Prescription medications and essential medical equipment are exempt.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                    Clothing & Footwear
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm m-0 leading-relaxed">
                    {usStateData ? usStateData.rules.clothing : 'Subject to standard sales tax unless a seasonal holiday or statutory threshold applies.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                    Digital Goods & SaaS
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm m-0 leading-relaxed">
                    {usStateData ? usStateData.rules.digitalGoods : 'Digital goods and software-as-a-service may be taxable depending on state classification.'}
                  </p>
                </div>
              </div>

              {usStateData?.rules.economicNexus && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong>Economic Nexus for Online Sellers:</strong> Remote retailers with no physical presence in {region.name} are obligated to register and collect sales tax if their annual gross revenue into the state exceeds <strong>{usStateData.rules.economicNexus}</strong>.
                </div>
              )}
            </section>

            {/* SECTION 9: Pre-Calculated Lookup Table */}
            <section id="lookup-table" className="scroll-mt-24 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                {region.name} Reverse Tax Lookup Table
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Use this reference table to instantly check pre-tax net values and tax paid on standard purchase amounts at the official {region.rate}% rate:
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-bold">Gross Total</th>
                      <th className="py-2.5 px-4 font-bold">Pre-Tax Net Price</th>
                      <th className="py-2.5 px-4 font-bold text-blue-700">
                        {region.taxName} Paid ({region.rate}%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lookupTable.map((row) => (
                      <tr key={row.gross} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-4 font-semibold tabular-nums text-slate-900">
                          {region.currencySymbol}{row.gross.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 font-medium tabular-nums text-slate-800">
                          {region.currencySymbol}{row.net.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-4 font-semibold tabular-nums text-slate-900">
                          {region.currencySymbol}{row.tax.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: Common Calculation Mistakes to Avoid */}
            <section id="common-mistakes" className="scroll-mt-24 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
                Common Calculation Mistakes to Avoid
              </h2>
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed list-disc pl-5">
                <li>
                  <strong>Confusing State Baseline with Combined Local Rates:</strong> Using only the {region.rate}% state rate for an item bought in a city that charges a local municipal surtax will underestimate the tax paid.
                </li>
                <li>
                  <strong>Rounding Discrepancies:</strong> State revenue departments require rounding at the line-item or final tax level. Multiplying rounded intermediate figures can cause 1-cent differences on itemized receipts.
                </li>
                <li>
                  <strong>Taxing Non-Taxable Line Items:</strong> Receipts with mixed purchases (such as unprepared grocery food and household cleaners) only assess sales tax on the taxable portion. Reverse-calculating the grand total assumes all items were taxed at {region.rate}%.
                </li>
              </ul>
            </section>

            {/* SECTION 11: FAQs */}
            <section id="faqs" className="scroll-mt-24">
              <FAQAccordion items={faqs} title={`${region.name} Sales Tax Frequently Asked Questions`} />
            </section>

            {/* SECTION 12: Sources and Methodology */}
            <section id="sources-and-methodology" className="scroll-mt-24 pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-2">
              <div className="font-bold text-slate-700 uppercase tracking-wider">
                Official Sources & Data Verification:
              </div>
              <p className="m-0 leading-relaxed">
                Sales tax rates, local surtax maximums, and statutory exemptions for {region.name} are reviewed against official statutes published by the{' '}
                {authorityUrl ? (
                  <a href={authorityUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {authorityName}
                  </a>
                ) : (
                  <span>{authorityName}</span>
                )}
                . Verified for the 2026 tax calendar year.
              </p>
            </section>
          </article>

          {/* RIGHT COLUMN: Sticky Interactive Calculator Sidebar (lg:col-span-5 xl:col-span-4) */}
          <aside className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              {/* Interactive Calculator Card */}
              <CalculatorCard {...calculatorProps} />

              {/* Quick Regional Facts Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span>{region.name} Quick Facts</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Base State Rate:</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{region.rate}%</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Max Combined Rate:</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {region.maxCombinedRate ? `${region.maxCombinedRate}%` : `${region.rate}%`}
                    </span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Tax Type:</span>
                    <span className="font-semibold text-slate-900">{region.taxName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Authority:</span>
                    <span className="font-medium text-slate-700 text-right truncate max-w-[160px]">
                      {authorityName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contextual Specialized Tools */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="font-bold text-slate-800">Related Tax Calculators</div>
                <div className="space-y-1.5 text-blue-600 font-medium">
                  <Link href="/us-sales-tax-by-zip-code" className="block hover:underline">
                    • ZIP Code Sales Tax Lookup
                  </Link>
                  <Link href="/tools/sales-tax-calculator" className="block hover:underline">
                    • Standard Sales Tax Calculator
                  </Link>
                  <Link href="/discount-and-tax-calculator" className="block hover:underline">
                    • Discount & Tax Calculator
                  </Link>
                  <Link href="/compare-sales-tax" className="block hover:underline">
                    • Compare Tax Across States
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Other States Directory */}
        <div className="pt-8 border-t border-slate-200">
          <RelatedCalculatorsGrid
            relatedSlugs={region.relatedRegionSlugs}
            currentSlug={region.slug}
            title={`Other State & Regional Tax Calculators`}
          />
        </div>
      </div>
    </>
  )
}
