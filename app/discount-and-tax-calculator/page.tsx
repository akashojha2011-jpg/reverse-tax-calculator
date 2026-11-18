import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DiscountTaxTool } from '@/components/DiscountTaxTool'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { FAQAccordion } from '@/components/FAQAccordion'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import { Tag, ArrowRight, ShieldCheck, Calendar, Percent, AlertTriangle, FileSpreadsheet } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Discount and Sales Tax Calculator — Calculate Sale Price & Tax (2026)',
  description:
    'Free discount and sales tax calculator. Calculate your discounted sale price, sales tax amount, and final total out-of-pocket at checkout. Learn store coupon vs manufacturer rebate tax rules.',
  alternates: {
    canonical: 'https://www.reversetaxcalculator.pro/discount-and-tax-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.reversetaxcalculator.pro/discount-and-tax-calculator',
    title: 'Discount and Sales Tax Calculator — Calculate Sale Price & Tax (2026)',
    description:
      'Free discount and sales tax calculator. Calculate your discounted sale price, sales tax amount, and final total out-of-pocket at checkout.',
    siteName: 'Reverse Tax Calculator',
  },
}

const FAQS = [
  {
    question: 'Is sales tax calculated before or after a store discount?',
    answer:
      'In nearly all US states, retail sales tax is calculated on the discounted sale price (the actual amount paid by the consumer), NOT the original sticker price. For store sales, clearance markdowns, and retailer coupons, you only pay tax on the net price after the discount is subtracted.',
  },
  {
    question: 'How do manufacturer coupons affect sales tax compared to store discounts?',
    answer:
      'Store discounts (such as a 20% off sale) reduce the taxable sale price. However, manufacturer coupons are legally treated as third-party cash payments in many states (such as California Reg 1700 and New York Tax Law § 1101). In those jurisdictions, sales tax is charged on the full price before the manufacturer coupon value is deducted.',
  },
  {
    question: 'What is the mathematical formula for calculating discount and sales tax?',
    answer:
      '1. Discount Amount = Original Price × (Discount % ÷ 100). 2. Discounted Subtotal = Original Price - Discount Amount. 3. Sales Tax = Discounted Subtotal × (Tax Rate ÷ 100). 4. Final Total = Discounted Subtotal + Sales Tax.',
  },
  {
    question: 'What is the Excel formula for discount and sales tax?',
    answer:
      'If your original price is in A2, discount % in B2, and tax % in C2, calculate the final checkout price with =A2*(1-B2)*(1+C2). To find just the discounted subtotal before tax, enter =A2*(1-B2).',
  },
  {
    question: 'Does sales tax apply to the post-discount price online?',
    answer:
      'Yes. Major online retailers like Amazon, Walmart, and Target apply promotional promo codes to reduce the item subtotal first, and then calculate destination-based state and local sales tax on the discounted subtotal.',
  },
]

const DISCOUNT_TAX_LOOKUP_TABLE = [
  { original: 25, disc10: 22.50, tax10: 1.86, total10: 24.36, disc20: 20.00, tax20: 1.65, total20: 21.65, disc30: 17.50, tax30: 1.44, total30: 18.94 },
  { original: 50, disc10: 45.00, tax10: 3.71, total10: 48.71, disc20: 40.00, tax20: 3.30, total20: 43.30, disc30: 35.00, tax30: 2.89, total30: 37.89 },
  { original: 100, disc10: 90.00, tax10: 7.43, total10: 97.43, disc20: 80.00, tax20: 6.60, total20: 86.60, disc30: 70.00, tax30: 5.78, total30: 75.78 },
  { original: 200, disc10: 180.00, tax10: 14.85, total10: 194.85, disc20: 160.00, tax20: 13.20, total20: 173.20, disc30: 140.00, tax30: 11.55, total30: 151.55 },
  { original: 500, disc10: 450.00, tax10: 37.13, total10: 487.13, disc20: 400.00, tax20: 33.00, total20: 433.00, disc30: 350.00, tax30: 28.88, total30: 378.88 },
]

export default function DiscountAndTaxPage() {
  const schemaApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Discount and Sales Tax Calculator',
    url: 'https://www.reversetaxcalculator.pro/discount-and-tax-calculator',
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
    name: 'How to Calculate Discount and Sales Tax',
    description: 'Calculate your discounted price and final register total with sales tax.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Subtract Discount from Sticker Price',
        text: 'Multiply original price by discount % and subtract to find the discounted subtotal.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calculate Sales Tax on Discounted Subtotal',
        text: 'Multiply discounted subtotal by the sales tax rate to determine tax due.',
      },
      {
        '@type': 'HowToStep',
        name: 'Sum Discounted Subtotal and Tax',
        text: 'Add the tax amount to the discounted subtotal to find the final total.',
      },
    ],
  }

  const tocItems: TocItem[] = [
    { id: 'discount-tool', label: 'Interactive Discount & Tax Calculator' },
    { id: 'coupon-tax-rules', label: 'Store Discount vs. Manufacturer Coupon Rules' },
    { id: 'calculation-formula', label: 'Mathematical Formula & Derivation' },
    { id: 'discount-lookup-table', label: 'Discount & Tax Reference Table' },
    { id: 'excel-formulas', label: 'Excel & Google Sheets Formulas' },
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
          { name: 'Discount and Tax Calculator', url: '/discount-and-tax-calculator' },
        ]}
      />

      <div className="space-y-8">
        <header className="space-y-3 pb-3 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Sale Price & Tax Engine
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Calendar className="w-3 h-3" />
              Verified for 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Discount and Sales Tax Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Enter the original item price, your discount percentage, and local sales tax rate to find your final out-of-pocket register cost and total savings.
          </p>

          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Retail pricing and coupon taxability standards</span>
          </div>
        </header>

        <section id="discount-tool">
          <DiscountTaxTool />
        </section>

        <div className="pt-6 space-y-10">
          <TableOfContents items={tocItems} title="Discount & Tax Guide Contents" />

          <section id="coupon-tax-rules" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Store Discount vs. Manufacturer Coupon Tax Rules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              One of the most confusing retail tax experiences occurs when a shopper uses a coupon and discovers sales tax is higher than expected. The taxability depends on who funds the discount:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
                <div className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  Store Discounts (Retailer-Funded)
                </div>
                <p className="text-xs text-slate-700 leading-relaxed m-0">
                  Storewide sales, clearance markdowns, loyalty discounts, and retailer-issued coupons <strong>reduce the taxable base</strong>. If an item is $100 with 20% off ($80), tax is charged only on $80.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5">
                <div className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Manufacturer Coupons (Third-Party)
                </div>
                <p className="text-xs text-slate-700 leading-relaxed m-0">
                  Because the manufacturer reimburses the store for the coupon value, states treat the coupon as cash. In states like California and New York, <strong>tax is charged on the original pre-coupon price</strong>.
                </p>
              </div>
            </div>
          </section>

          <section id="calculation-formula" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Mathematical Formula & Derivation
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 text-slate-800 tabular-nums space-y-3 border border-slate-200/90 shadow-2xs">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-sans font-bold">
                Standard Store Discount Equations
              </div>
              <div className="text-sm sm:text-base text-blue-700 font-bold space-y-1">
                <div>Discount Amount = Original Price × (Discount % ÷ 100)</div>
                <div>Discounted Subtotal = Original Price - Discount Amount</div>
                <div>Sales Tax = Discounted Subtotal × (Tax Rate ÷ 100)</div>
                <div>Final Register Total = Discounted Subtotal + Sales Tax</div>
              </div>
              <div className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                <strong>Worked Example:</strong> A $100.00 jacket on a 20% sale in an 8.25% sales tax district:
                <br />
                Discount = $100.00 × 0.20 = $20.00 savings
                <br />
                Discounted Subtotal = $100.00 - $20.00 = $80.00
                <br />
                Sales Tax Due = $80.00 × 0.0825 = $6.60
                <br />
                Final Total = $80.00 + $6.60 = <strong>$86.60</strong>
              </div>
            </div>
          </section>

          <section id="discount-lookup-table" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Discount & Tax Reference Table (At 8.25% Tax Rate)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Reference sample prices, sale subtotals, tax paid, and final register cost at an 8.25% sales tax rate:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm tabular-nums">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Original Price</th>
                    <th className="p-3">10% Off (Subtotal / Total)</th>
                    <th className="p-3">20% Off (Subtotal / Total)</th>
                    <th className="p-3">30% Off (Subtotal / Total)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {DISCOUNT_TAX_LOOKUP_TABLE.map((row) => (
                    <tr key={row.original} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">${row.original.toFixed(2)}</td>
                      <td className="p-3 text-slate-700">${row.disc10.toFixed(2)} <span className="text-slate-400 font-normal">(${row.total10.toFixed(2)})</span></td>
                      <td className="p-3 text-blue-700 font-medium">${row.disc20.toFixed(2)} <span className="text-slate-500 font-normal">(${row.total20.toFixed(2)})</span></td>
                      <td className="p-3 text-slate-700">${row.disc30.toFixed(2)} <span className="text-slate-400 font-normal">(${row.total30.toFixed(2)})</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="excel-formulas" className="scroll-mt-24 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight m-0">
              Excel & Google Sheets Formulas
            </h2>
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="text-xs font-bold text-slate-800">Direct Single-Cell Formula for Final Total:</div>
              <pre className="p-2.5 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
                =A2 * (1 - B2) * (1 + C2)
              </pre>
              <p className="text-xs text-slate-500 m-0">
                Where <code>A2</code> is original price ($100), <code>B2</code> is discount (20%), and <code>C2</code> is sales tax (8.25%).
              </p>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-24">
            <FAQAccordion items={FAQS} title="Frequently Asked Questions about Discounts & Sales Tax" />
          </section>
        </div>
      </div>
    </>
  )
}
