# Reverse Tax Calculator (reversetaxcalculator.pro)

Production-ready, SEO-first, AI-search-optimized reverse tax calculator website built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **Static Site Generation (SSG)**.

Designed in the clean, minimal, calculator-first style of **omnicalculator.com**.

---

## Features

- **Pure Client-Side Math Engine**: Zero API roundtrips, instant calculations, unit-tested in `lib/tax-math.ts`.
- **Comprehensive Tax Modes**: US Sales Tax, UK/EU VAT, Australia/India GST, Canada HST, Quebec dual-tax (GST+QST), Tax & Tip calculator, and Net-to-Gross payroll estimator.
- **Programmatic Regional Pages**: Static generation via `generateStaticParams()` from a single source of truth (`data/regions.ts`).
- **AI-Engine Optimization**: `/llms.txt`, answer-first 40-60 word summaries, explicit worked numeric examples, structured JSON-LD schemas (`WebApplication`, `FAQPage`, `BreadcrumbList`, `Article`).
- **MDX Guides**: Long-form math explanations and tax comparison articles in `content/guides/`.
- **Strict Accessibility & Core Web Vitals**: Minimal JS footprint, WCAG AA compliance, no ads/popups, fast static loading.

---

## Getting Started

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm or pnpm

### Local Installation & Development

```bash
# Install dependencies
npm install

# Run Vitest unit tests
npm test

# Launch local development server
npm run dev

# Build production SSG bundle
npm run build
```

---

## How to Add a New State, Province, or Country Region

Adding a new regional reverse tax calculator page requires **a single data-file entry** in [`data/regions.ts`](file:///Users/akashojha/Desktop/reverse%20tax%20calculator/data/regions.ts) — **zero new routing or component code required!**

### Step-by-Step Instructions:

1. Open `data/regions.ts`.
2. Add a new object entry to the `REGIONS` array:

```typescript
{
  slug: 'florida',
  name: 'Florida',
  country: 'US',
  type: 'state',
  taxName: 'Sales Tax',
  rate: 6.0,
  currency: 'USD',
  currencySymbol: '$',
  lastVerified: 'August 2026',
  headline: 'Calculate Florida sales tax backwards from total total.',
  description: 'Florida levies a 6.0% state sales tax. County surtaxes can add 0.5% to 1.5%...',
  workedExample: {
    total: 106.0,
    net: 100.0,
    tax: 6.0,
  },
  faqs: [
    {
      question: 'What is Florida state sales tax?',
      answer: 'Florida state sales tax is 6.0%, plus local discretionary surtaxes up to 1.5%.',
    },
  ],
  relatedRegionSlugs: ['texas', 'california', 'georgia', 'new-york'],
}
```

3. Run `npm run build`. Next.js automatically generates `https://reversetaxcalculator.pro/florida-reverse-sales-tax-calculator` with canonical tags, schema, pre-filled calculator card, and internal links!

---

## Deployment to Vercel

1. Push code to your GitHub repository.
2. Import the repository in Vercel.
3. Vercel automatically detects Next.js. Framework Preset: **Next.js**.
4. Click **Deploy**. Vercel will build all SSG static pages, sitemap, robots, and `/llms.txt`.
