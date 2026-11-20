import { MetadataRoute } from 'next'
import { REGIONS } from '@/data/regions'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.reversetaxcalculator.pro'
  const currentDate = new Date().toISOString().split('T')[0]

  // Core static & specialized calculator pages
  const corePages = [
    '',
    '/tools',
    '/tools/sales-tax-calculator',
    '/tools/sales-tax-breakdown',
    '/tools/reverse-vat-calculator',
    '/tools/reverse-gst-calculator',
    '/tools/reverse-hst-calculator',
    '/tools/reverse-pst-calculator',
    '/us-sales-tax-by-zip-code',
    '/discount-and-tax-calculator',
    '/tip-and-tax-calculator',
    '/compare-sales-tax',
    '/bulk-sales-tax-calculator',
    '/data-sources',
    '/tax-data-methodology',
    '/editorial-policy',
    '/disclaimer',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('calculator') || route.includes('zip') ? 0.9 : 0.7,
  }))

  // MDX Guide pages
  const guidePages = [
    '/guides',
    '/guides/how-to-calculate-reverse-tax-percentage',
    '/guides/reverse-tax-calculator-vs-forward-tax-calculator',
    '/guides/net-to-gross-salary-explained',
    '/guides/gst-vs-hst-vs-pst-canada-explained',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: route === '/guides' ? 0.9 : 0.8,
  }))

  // US State pages dynamically generated from data/regions.ts (50 States + DC)
  const regionalPages = REGIONS.filter((r) => r.country === 'US').map((r) => ({
    url: `${baseUrl}/${r.slug}-reverse-sales-tax-calculator`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...corePages, ...guidePages, ...regionalPages]
}
