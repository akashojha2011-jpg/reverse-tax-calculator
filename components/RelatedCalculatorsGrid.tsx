import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { REGIONS, getRegionBySlug } from '@/data/regions'
import { StateMapIcon } from '@/components/StateMapIcon'

interface RelatedCalculatorsGridProps {
  relatedSlugs?: string[]
  currentSlug?: string
  title?: string
}

export function RelatedCalculatorsGrid({
  relatedSlugs,
  currentSlug,
  title = 'Related Reverse Tax Calculators',
}: RelatedCalculatorsGridProps) {
  // If specific slugs passed, fetch those regions; otherwise default to top regions
  let list = relatedSlugs
    ? relatedSlugs.map((s) => getRegionBySlug(s)).filter(Boolean)
    : REGIONS.filter((r) => r.slug !== currentSlug).slice(0, 6)

  return (
    <section className="w-full my-12 border-t border-slate-200 pt-8">
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((r) => {
          if (!r) return null
          return (
            <Link
              key={r.slug}
              href={`/${r.slug}-reverse-sales-tax-calculator`}
              className="group p-4 rounded-xl border border-slate-200 hover:border-brand-300 bg-white hover:bg-brand-50/40 transition-all flex items-start gap-3 shadow-xs"
            >
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors shrink-0 mt-0.5 flex items-center justify-center">
                <StateMapIcon slug={r.slug} className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 group-hover:text-brand-700 text-sm truncate flex items-center justify-between">
                  <span>{r.name} Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-600 shrink-0 ml-1" />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {r.taxName} ({r.rate}%{r.secondRate ? ` + ${r.secondRate}%` : ''})
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
