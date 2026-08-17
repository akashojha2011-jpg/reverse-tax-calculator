import { MetadataRoute } from 'next'
import { REGIONS } from '@/data/regions'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reversetaxcalculator.pro'
  const currentDate = new Date().toISOString().split('T')[0]

  // Core static pages
  const corePages = [
    '',
    '/reverse-sales-tax-calculator',
    '/reverse-tax-formula',
    '/reverse-tax-rate-calculator',
    '/reverse-vat-calculator',
    '/reverse-gst-calculator',
    '/reverse-hst-calculator',
    '/reverse-income-tax-calculator',
    '/reverse-sales-tax-and-tip-calculator',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  // MDX Guide pages
  const guidePages = [
    '/guides/how-to-calculate-reverse-tax-percentage',
    '/guides/reverse-tax-calculator-vs-forward-tax-calculator',
    '/guides/net-to-gross-salary-explained',
    '/guides/gst-vs-hst-vs-pst-canada-explained',
    '/guides/vat-reverse-charge-explained',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Regional pages dynamically generated from data/regions.ts
  const regionalPages = REGIONS.map((r) => ({
    url: `${baseUrl}/${r.slug}-reverse-sales-tax-calculator`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...corePages, ...guidePages, ...regionalPages]
}
