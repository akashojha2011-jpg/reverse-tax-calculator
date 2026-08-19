import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { REGIONS, getRegionBySlug } from '@/data/regions'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { CompactOmniHeader } from '@/components/CompactOmniHeader'

interface PageProps {
  params: {
    region: string
  }
}

export async function generateStaticParams() {
  const paths: { region: string }[] = []
  for (const r of REGIONS) {
    paths.push({ region: r.slug })
    paths.push({ region: `${r.slug}-reverse-sales-tax-calculator` })
    paths.push({ region: `reverse-sales-tax-calculator-${r.slug}` })
    paths.push({ region: `${r.slug}-sales-tax-calculator` })
    paths.push({ region: `${r.slug}-sales-tax` })
  }
  return paths
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params?.region
  const region = slug ? getRegionBySlug(slug) : undefined
  if (!region) return {}

  const title = `${region.name} Reverse Sales Tax Calculator (${region.rate}% ${region.taxName})`
  const description = `Calculate ${region.name} pre-tax price and tax paid backwards. Pre-filled with ${region.name}'s current ${region.rate}% ${region.taxName} rate.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`,
    },
    openGraph: {
      type: 'website',
      url: `https://reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`,
      title: `${region.name} Reverse Sales Tax Calculator — Pre-Tax Price Finder`,
      description: `Free online reverse calculator pre-filled for ${region.name} (${region.rate}% ${region.taxName}). Instantly extract pre-tax subtotal and tax paid.`,
      siteName: 'Reverse Tax Calculator',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${region.name} Reverse ${region.taxName} Calculator`,
      description: `Calculate ${region.name} ${region.taxName} backwards from gross total price.`,
    },
  }
}

export default function RegionalCalculatorPage({ params }: PageProps) {
  const slug = params?.region
  const region = slug ? getRegionBySlug(slug) : undefined
  if (!region) {
    notFound()
  }

  // Determine hub link
  let hubUrl = '/reverse-sales-tax-calculator'
  let hubName = 'Reverse Sales Tax Calculator'
  if (region.taxName.includes('HST')) {
    hubUrl = '/reverse-hst-calculator'
    hubName = 'Reverse HST Calculator'
  } else if (region.taxName.includes('GST')) {
    hubUrl = '/reverse-gst-calculator'
    hubName = 'Reverse GST Calculator'
  }

  // Structured Data WebApplication schema
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${region.name} Reverse Sales Tax Calculator`,
    url: `https://reversetaxcalculator.pro/${region.slug}-reverse-sales-tax-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: region.currency,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <BreadcrumbNav
        items={[
          { name: hubName, url: hubUrl },
          { name: `${region.name} Calculator`, url: `/${region.slug}-reverse-sales-tax-calculator` },
        ]}
      />

      {/* OmniCalculator 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Title, Unique Region Text & SEO Article */}
        <div className="lg:col-span-7 space-y-6">
          <header className="pb-2 border-b border-slate-100">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              {region.name} Reverse {region.taxName} Calculator
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-medium mb-3">
              {region.headline}
            </p>

            <CompactOmniHeader lastUpdated={region.lastVerified} initialLikes={1120} />
          </header>

          {/* Mobile Calculator Placement */}
          <div className="block lg:hidden my-6">
            <CalculatorCard
              initialMode={region.secondRate ? 'dual-tax' : 'sales-tax'}
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

          {/* Unique Region Paragraph Box */}
          <section className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 mt-0">
              About {region.name} {region.taxName} ({region.rate}%)
            </h2>
            <p className="text-slate-800 text-base leading-relaxed mb-3">
              {region.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200/80">
              <span>Rates verified: <strong>{region.lastVerified}</strong></span>
              <Link href={hubUrl} className="text-brand-600 font-semibold hover:underline">
                View full {hubName} →
              </Link>
            </div>
          </section>

          {/* 1000+ Word Comprehensive Regional SEO Article */}
          <article className="prose prose-slate max-w-none bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0 mb-4">
              Comprehensive Guide to Reverse {region.taxName} in {region.name}
            </h2>

            <p>
              Calculating reverse {region.taxName} for transactions in <strong>{region.name}</strong> is an essential step for small business bookkeeping, accounting expense reconciliation, and verifying invoice tax amounts. When you receive a tax-inclusive receipt in {region.name}, the total charge reflects 100% of the pre-tax item cost plus the applicable {region.name} {region.taxName} percentage ({region.rate}%{region.secondRate ? ` + ${region.secondRate}% ${region.secondTaxName}` : ''}).
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              The Mathematics of {region.name} Reverse Tax
            </h3>
            <p>
              To reverse calculate {region.taxName} in {region.name}, divide the gross total price by 1 plus the effective decimal tax rate.
            </p>

            {region.secondRate ? (
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 space-y-1 font-semibold">
                <div>Pre-Tax Subtotal = Gross Total ÷ (1 + {(region.rate / 100).toFixed(4)} {region.taxName} + {(region.secondRate / 100).toFixed(4)} {region.secondTaxName})</div>
                <div>Combined Tax Paid = Gross Total - Pre-Tax Subtotal</div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-4 space-y-1 font-semibold">
                <div>Pre-Tax Subtotal = Gross Total ÷ (1 + {(region.rate / 100).toFixed(4)})</div>
                <div>{region.taxName} Paid = Gross Total - Pre-Tax Subtotal</div>
              </div>
            )}

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              Why Simple Subtraction Fails for {region.name} Receipts
            </h3>
            <p>
              Subtracting {region.rate}% directly from the gross total price produces an incorrect result because tax is legally levied on the lower pre-tax subtotal, not the final gross price. Dividing by (1 + tax rate) ensures exact compliance with official tax department regulations.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              Detailed Worked Example for {region.name}
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 my-4">
              <p className="text-sm text-slate-700 mb-0">
                For a receipt total of <strong>{region.currencySymbol}{region.workedExample.total.toFixed(2)}</strong> in {region.name}:
                <br />
                • Pre-Tax Net Amount: <strong>{region.currencySymbol}{region.workedExample.net.toFixed(2)}</strong>
                <br />
                • Total {region.taxName} Paid: <strong>{region.currencySymbol}{region.workedExample.tax.toFixed(2)}</strong>
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">
              How to Use the {region.name} Reverse Calculator
            </h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-700 text-sm">
              <li>Enter your total gross receipt amount into the input box in the calculator card.</li>
              <li>The pre-filled rate of {region.rate}% ({region.taxName}) is automatically applied (and can be edited if local district rates vary).</li>
              <li>Review the instant calculation breakdown displaying net price and tax paid.</li>
              <li>Click <strong>Copy</strong> to copy the breakdown into your accounting ledger.</li>
            </ol>
          </article>

          {/* Region FAQs */}
          <FAQAccordion items={region.faqs} title={`${region.name} Tax Questions & Answers`} />

          {/* Internal Link Grid */}
          <RelatedCalculatorsGrid
            relatedSlugs={region.relatedRegionSlugs}
            currentSlug={region.slug}
            title={`Calculators Related to ${region.name}`}
          />
        </div>

        {/* Right Column: Sticky Desktop Calculator Card */}
        <div className="hidden lg:block lg:col-span-5 sticky top-20">
          <CalculatorCard
            initialMode={region.secondRate ? 'dual-tax' : 'sales-tax'}
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
      </div>
    </>
  )
}
