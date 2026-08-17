'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { REGIONS } from '@/data/regions'

export function RegionSelector() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const filtered = REGIONS.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.slug.toLowerCase().includes(search.toLowerCase()) ||
      r.taxName.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value
    if (slug) {
      router.push(`/${slug}-reverse-sales-tax-calculator`)
    }
  }

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 my-8">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Select State or Province Tax Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Dropdown Select */}
        <div className="relative">
          <select
            onChange={handleChange}
            defaultValue=""
            className="w-full bg-white border border-slate-300 text-slate-800 text-sm font-medium rounded-lg px-3.5 py-2.5 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
          >
            <option value="" disabled>
              Select US State or Canadian Province...
            </option>
            <optgroup label="US States">
              {REGIONS.filter((r) => r.country === 'US').map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} ({r.rate}% Sales Tax)
                </option>
              ))}
            </optgroup>
            <optgroup label="Canadian Provinces & Territories">
              {REGIONS.filter((r) => r.country === 'CA').map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} ({r.taxName} {r.rate}%{r.secondRate ? ` + ${r.secondRate}%` : ''})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Quick Filter Input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter state (e.g. California, Quebec)..."
            className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-lg pl-9 pr-3.5 py-2.5 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Quick Filtered Chips */}
      {search && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200">
          {filtered.length > 0 ? (
            filtered.map((r) => (
              <button
                key={r.slug}
                onClick={() => router.push(`/${r.slug}-reverse-sales-tax-calculator`)}
                className="text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-600 hover:text-white px-2.5 py-1 rounded-md transition-all shadow-xs"
              >
                {r.name} ({r.rate}%)
              </button>
            ))
          ) : (
            <span className="text-xs text-slate-500">No matching region found.</span>
          )}
        </div>
      )}
    </div>
  )
}
