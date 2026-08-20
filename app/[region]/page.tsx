import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { REGIONS, getRegionBySlug, type RegionData } from '@/data/regions'
import { CalculatorCard } from '@/components/CalculatorCard'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { RelatedCalculatorsGrid } from '@/components/RelatedCalculatorsGrid'
import { CompactOmniHeader } from '@/components/CompactOmniHeader'

function renderRegionIntroParagraph(region: RegionData) {
  if (region.intro) {
    return <p>{region.intro}</p>
  }

  // 1. Dual Tax (e.g. Canadian provinces with GST + PST/QST)
  if (region.secondRate && region.secondRate > 0) {
    const combinedRate = (region.rate + region.secondRate).toFixed(3).replace(/\.?0+$/, '')
    const divisor = (1 + (region.rate + region.secondRate) / 100).toFixed(4).replace(/\.?0+$/, '')
    return (
      <p>
        In <strong>{region.name}</strong>, purchases carry both <strong>{region.rate}% {region.taxName}</strong> and <strong>{region.secondRate}% {region.secondTaxName}</strong>, bringing the total effective tax rate to <strong>{combinedRate}%</strong>. To reverse calculate any tax-inclusive receipt in {region.name}, divide the total bill by <strong>{divisor}</strong> to isolate the pre-tax item cost from both tax components.
      </p>
    )
  }

  // 2. Zero State Sales Tax (rate === 0)
  if (region.rate === 0) {
    if (region.maxCombinedRate && region.maxCombinedRate > 0) {
      return (
        <p>
          While <strong>{region.name}</strong> has no statewide sales tax (<strong>0.00%</strong>), local municipalities and boroughs levy local sales tax rates up to <strong>{region.maxCombinedRate}%</strong>. To calculate the pre-tax net price from a tax-inclusive bill in {region.name}, divide your total by <strong>1 + your local tax rate</strong> (e.g., divide by <strong>1.05</strong> for a 5% local borough tax).
        </p>
      )
    }
    return (
      <p>
        <strong>{region.name}</strong> levies no retail sales tax (<strong>0.00%</strong>). For purchases made in {region.name}, the total amount charged equals 100% of the net pre-tax price with zero sales tax added.
      </p>
    )
  }

  // 3. States with variable local district / city / county tax additions
  if (region.maxCombinedRate && region.maxCombinedRate > region.rate) {
    const baseDivisor = (1 + region.rate / 100).toFixed(4).replace(/\.?0+$/, '')
    const maxDivisor = (1 + region.maxCombinedRate / 100).toFixed(4).replace(/\.?0+$/, '')
    return (
      <p>
        In <strong>{region.name}</strong>, sales tax starts at a statewide base rate of <strong>{region.rate}%</strong> and reaches up to <strong>{region.maxCombinedRate}%</strong> with local city, county, and district tax surcharges. To calculate the pre-tax price from a total receipt in {region.name}, divide your gross total by <strong>1 + your local tax rate</strong> (e.g., divide by <strong>{baseDivisor}</strong> for the state base rate or up to <strong>{maxDivisor}</strong> for maximum combined district rates).
      </p>
    )
  }

  // 4. Uniform statewide flat rate (no local taxes) or VAT / HST / GST
  const divisor = (1 + region.rate / 100).toFixed(4).replace(/\.?0+$/, '')
  return (
    <p>
      <strong>{region.name}</strong> enforces a standard <strong>{region.rate}% {region.taxName}</strong>. To calculate the pre-tax net price and isolate the exact <strong>{region.rate}%</strong> {region.taxName} paid from any gross bill in {region.name}, divide the final receipt total by <strong>{divisor}</strong>.
    </p>
  )
}

function renderNewYorkArticleSections() {
  return (
    <div className="space-y-6 mt-6">
      <section>
        <h2 id="ny-out-of-state-nexus" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          Does New York Charge Sales Tax on Out-of-State Purchases & Remote Sales?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Under New York State tax law (NYS Tax Law Section 1105), sales tax applies to all retail sales of tangible personal property delivered within New York State unless specifically exempted. For out-of-state transactions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm mt-2">
          <li><strong>Out-of-State Buyers:</strong> If a New York vendor ships merchandise directly to a customer located outside NYS (where the vendor lacks physical or economic nexus), NY sales tax is not charged. However, if an out-of-state customer picks up items in-person at a NY storefront, local sales tax applies at the point of pickup.</li>
          <li><strong>Economic Nexus Rules:</strong> Out-of-state remote sellers must collect and remit NYS sales tax if they generate over <strong>$500,000</strong> in gross revenue AND complete <strong>100 or more separate transactions</strong> delivered into New York State over the trailing 4 quarters.</li>
          <li><strong>Sales Tax vs. Use Tax in NYS:</strong> Sales tax is collected at the register by vendors. <em>Use tax</em> is a complementary tax owed directly by New York residents and businesses when purchasing taxable goods online or from out-of-state retailers who did not collect NY sales tax at checkout. The tax rates for sales tax and use tax in New York are identical.</li>
        </ul>
      </section>

      <section>
        <h2 id="ny-tourist-tax-refunds" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          Can Tourists & Foreign Visitors Claim Sales Tax Refunds in New York?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A frequent point of confusion for international travelers visiting New York City or New York State is whether they can claim a VAT-style sales tax refund at JFK, Newark, or LaGuardia airports upon departure.
        </p>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm my-3 font-medium">
          <strong>Important Clarification for Tourists:</strong> Neither New York State nor the US Federal Government provides sales tax refunds or airport duty-free tax-back schemes for international tourists. Unlike the European Union (EU) or Australia, US sales taxes are collected at state and local levels with no airport refund counters.
        </div>
        <p className="text-slate-700 leading-relaxed">
          However, tourists in New York City can take advantage of <strong>tax-free shopping categories</strong>:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm mt-2">
          <li><strong>Clothing & Footwear Exemption:</strong> In New York City (and several NY counties), any individual item of clothing or footwear costing <strong>under $110</strong> is 100% exempt from both the 4.00% NYS sales tax and local NYC sales tax.</li>
          <li><strong>Items $110 or Over:</strong> If an item of clothing costs $110.00 or more, the entire purchase price is subject to the full combined 8.875% NYC sales tax rate.</li>
        </ul>
      </section>

      <section>
        <h2 id="ny-reverse-tax-methodology" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          What is a Reverse Tax Calculator & How Does It Work for New York Receipts?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          A reverse sales tax calculator allows bookkeepers, small business owners, and shoppers to work backwards from a tax-inclusive total price to extract the original pre-tax item cost and the exact sales tax paid.
        </p>
        <p className="text-slate-700 leading-relaxed mt-2">
          Because sales tax is legally applied to the lower pre-tax subtotal rather than the final gross bill, simply subtracting 8.875% from a total receipt produces an inaccurate number.
        </p>
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-3 space-y-1 font-semibold text-brand-700">
          <div>Pre-Tax Subtotal = Gross Invoice Total ÷ 1.08875 (for NYC 8.875%)</div>
          <div>NYS Sales Tax Paid = Gross Invoice Total - Pre-Tax Subtotal</div>
        </div>
      </section>

      <section>
        <h2 id="ny-tax-rates-2026" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          What is New York State Sales Tax Rate in 2026?
        </h2>
        <p className="text-slate-700 leading-relaxed">
          For 2026, New York State maintains its base sales tax rate of <strong>4.00%</strong>. Local county taxes and the Metropolitan Commuter Transportation District (MCTD) surcharge bring combined sales tax rates between <strong>7.00% and 8.875%</strong> depending on the location:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700 border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-900">
                <th className="p-2.5 border border-slate-200 font-bold">New York Location / County</th>
                <th className="p-2.5 border border-slate-200 font-bold">NYS Base</th>
                <th className="p-2.5 border border-slate-200 font-bold">Local County Rate</th>
                <th className="p-2.5 border border-slate-200 font-bold">MCTD Surcharge</th>
                <th className="p-2.5 border border-slate-200 font-bold">Combined 2026 Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2.5 border border-slate-200 font-bold">New York City (5 Boroughs)</td>
                <td className="p-2.5 border border-slate-200">4.00%</td>
                <td className="p-2.5 border border-slate-200">4.50%</td>
                <td className="p-2.5 border border-slate-200">0.375%</td>
                <td className="p-2.5 border border-slate-200 font-bold text-brand-700">8.875%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2.5 border border-slate-200 font-bold">Nassau County / Long Island</td>
                <td className="p-2.5 border border-slate-200">4.00%</td>
                <td className="p-2.5 border border-slate-200">4.25%</td>
                <td className="p-2.5 border border-slate-200">0.375%</td>
                <td className="p-2.5 border border-slate-200 font-bold">8.625%</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-200 font-bold">Suffolk County / Long Island</td>
                <td className="p-2.5 border border-slate-200">4.00%</td>
                <td className="p-2.5 border border-slate-200">4.25%</td>
                <td className="p-2.5 border border-slate-200">0.375%</td>
                <td className="p-2.5 border border-slate-200 font-bold">8.625%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2.5 border border-slate-200 font-bold">Erie County (Buffalo)</td>
                <td className="p-2.5 border border-slate-200">4.00%</td>
                <td className="p-2.5 border border-slate-200">4.75%</td>
                <td className="p-2.5 border border-slate-200">—</td>
                <td className="p-2.5 border border-slate-200 font-bold">8.75%</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-200 font-bold">Westchester County (Yonkers)</td>
                <td className="p-2.5 border border-slate-200">4.00%</td>
                <td className="p-2.5 border border-slate-200">4.50%</td>
                <td className="p-2.5 border border-slate-200">0.375%</td>
                <td className="p-2.5 border border-slate-200 font-bold">8.875%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2">
          Worked Calculation Example: $100 Purchase in New York
        </h3>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 my-3 space-y-2 text-xs sm:text-sm text-slate-800">
          <div>
            <strong>Forward Tax ($100 Pre-Tax Purchase in NYC at 8.875%):</strong>
            <br />
            • Pre-Tax Net Amount: $100.00
            <br />
            • Sales Tax Charged ($100 × 0.08875): $8.88
            <br />
            • Total Receipt Charged: <strong>$108.88</strong>
          </div>
          <div className="pt-2 border-t border-slate-200">
            <strong>Reverse Tax ($100 Total Receipt in NYC at 8.875%):</strong>
            <br />
            • Total Receipt Amount: $100.00
            <br />
            • Calculated Pre-Tax Net Subtotal ($100 ÷ 1.08875): <strong>$91.85</strong>
            <br />
            • Sales Tax Paid ($100 - $91.85): <strong>$8.15</strong>
          </div>
        </div>
      </section>
    </div>
  )
}

function renderQuebecArticleSections() {
  return (
    <div className="space-y-6 mt-6">
      <section>
        <h2 id="qc-reverse-calculation" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          How to Reverse Calculate Sales Tax in Quebec (GST & QST)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          In Quebec, commercial invoices and consumer receipts display a tax-inclusive total combining <strong>5.00% federal Goods and Services Tax (GST/TPS)</strong> and <strong>9.975% Quebec Sales Tax (QST/TVQ)</strong>, resulting in a total effective rate of <strong>14.975%</strong>.
        </p>
        <p className="text-slate-700 leading-relaxed mt-2">
          To extract the pre-tax item cost and isolate both tax components backwards from a Quebec receipt total:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-sm mt-2">
          <li><strong>Find Pre-Tax Subtotal:</strong> Divide the total receipt amount by <strong>1.14975</strong>.</li>
          <li><strong>Calculate Federal GST (5%):</strong> Multiply the pre-tax subtotal by <strong>0.05</strong>.</li>
          <li><strong>Calculate Quebec QST (9.975%):</strong> Multiply the pre-tax subtotal by <strong>0.09975</strong>.</li>
          <li><strong>Verify Total Tax:</strong> Add GST + QST to equal your total tax paid.</li>
        </ol>
      </section>

      <section>
        <h2 id="qc-canada-sales-tax" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          How to Calculate Reverse Sales Tax Across Canadian Provinces (GST, PST & HST)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Canada uses three distinct sales tax models depending on the province or territory:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm mt-2">
          <li><strong>Dual GST + QST / PST Provinces (Quebec, BC, SK, MB):</strong> Federal GST (5%) is collected alongside a separate provincial sales tax. In Quebec, QST is 9.975% (total 14.975%, divisor 1.14975). In British Columbia, PST is 7% (total 12%, divisor 1.12).</li>
          <li><strong>Harmonized Sales Tax (HST) Provinces (ON, NS, NB, PE, NL):</strong> Federal and provincial taxes are blended into a single HST rate (13% in Ontario, divisor 1.13; 15% in Atlantic Canada, divisor 1.15).</li>
          <li><strong>GST-Only Territories & Alberta:</strong> Alberta, Northwest Territories, Nunavut, and Yukon charge only the 5% federal GST (divisor 1.05) with zero provincial sales tax.</li>
        </ul>
      </section>

      <section>
        <h2 id="qc-gst-qst-explained" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          What Are the Two Sales Taxes in Quebec? (GST vs. QST Explained)
        </h2>
        <p className="text-slate-700 leading-relaxed">
          Quebec is unique in Canadian tax administration. While the Canada Revenue Agency (CRA) administers sales tax in most provinces, <strong>Revenu Québec</strong> jointly administers both federal GST/TPS (5%) and provincial QST/TVQ (9.975%) within Quebec borders.
        </p>
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm my-3 font-medium">
          <strong>Non-Compounding Rule (Since 2013):</strong> Prior to January 1, 2013, QST was calculated on top of the GST-inclusive price. Since 2013, QST (9.975%) and GST (5.00%) are calculated independently on the exact same pre-tax net subtotal.
        </div>
      </section>

      <section>
        <h2 id="qc-formula-worked-example" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-6 mb-3 scroll-mt-24">
          Formula & Worked Examples for Quebec Reverse GST & QST
        </h2>
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs md:text-sm my-3 space-y-1 font-semibold text-brand-700">
          <div>Pre-Tax Net Subtotal = Gross Invoice Total ÷ 1.14975</div>
          <div>Federal GST (5%) = Net Subtotal × 0.05</div>
          <div>Quebec QST (9.975%) = Net Subtotal × 0.09975</div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2">
          Worked Example 1: $114.98 Receipt Total in Quebec
        </h3>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 my-3 space-y-1 text-xs sm:text-sm text-slate-800">
          <div>• Gross Invoice Total: <strong>$114.98 CAD</strong></div>
          <div>• Pre-Tax Net Subtotal ($114.98 ÷ 1.14975): <strong>$100.00 CAD</strong></div>
          <div>• Federal GST (5% of $100.00): <strong>$5.00 CAD</strong></div>
          <div>• Quebec QST (9.975% of $100.00): <strong>$9.98 CAD</strong></div>
          <div>• Total Tax Paid ($5.00 + $9.98): <strong>$14.98 CAD</strong></div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2">
          Worked Example 2: Even $100.00 Total Receipt in Quebec
        </h3>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 my-3 space-y-1 text-xs sm:text-sm text-slate-800">
          <div>• Gross Invoice Total: <strong>$100.00 CAD</strong></div>
          <div>• Pre-Tax Net Subtotal ($100.00 ÷ 1.14975): <strong>$86.98 CAD</strong></div>
          <div>• Federal GST Paid ($86.98 × 0.05): <strong>$4.35 CAD</strong></div>
          <div>• Quebec QST Paid ($86.98 × 0.09975): <strong>$8.67 CAD</strong></div>
          <div>• Total Tax Paid ($4.35 + $8.67): <strong>$13.02 CAD</strong></div>
        </div>
      </section>
    </div>
  )
}

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

  // Structured Data FAQPage schema for Google PAA inclusion
  const faqSchema = region.faqs && region.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: region.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

            {renderRegionIntroParagraph(region)}

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

            {region.slug === 'new-york' && renderNewYorkArticleSections()}
            {region.slug === 'quebec' && renderQuebecArticleSections()}
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
