'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Globe, Flag, Search } from 'lucide-react'
import { REGIONS, RegionData } from '@/data/regions'
import { StateMapIcon } from '@/components/StateMapIcon'

export function RegionGridDirectory() {
  const [activeTab, setActiveTab] = useState<'us' | 'ca' | 'global'>('us')
  const [search, setSearch] = useState('')

  const usRegions = REGIONS.filter((r) => r.country === 'US')
  const caRegions = REGIONS.filter((r) => r.country === 'CA')
  const globalRegions = REGIONS.filter((r) => r.country !== 'US' && r.country !== 'CA')

  let currentList: RegionData[] = usRegions
  if (activeTab === 'ca') currentList = caRegions
  if (activeTab === 'global') currentList = globalRegions

  if (search.trim() !== '') {
    currentList = REGIONS.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.slug.toLowerCase().includes(search.toLowerCase()) ||
        r.taxName.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <section className="w-full bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-xs my-8">
      {/* Header & Tabs */}
      <div className="space-y-4 border-b border-slate-200 pb-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
            <span>Select Your State or Region Tax Calculator</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
            Pre-filled with official state & regional tax rates. Click any region to calculate backwards.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl w-fit">
          <button
            onClick={() => {
              setActiveTab('us')
              setSearch('')
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'us' && !search
                ? 'bg-white text-brand-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>US States ({usRegions.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('ca')
              setSearch('')
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ca' && !search
                ? 'bg-white text-brand-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🇨🇦 Canada ({caRegions.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('global')
              setSearch('')
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'global' && !search
                ? 'bg-white text-brand-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Global VAT/GST</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter regions by name (e.g. California, Texas, New York, Ontario, United Kingdom)..."
          className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
        />
      </div>

      {/* 4-Column Grid of State Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
        {currentList.map((r) => (
          <Link
            key={r.slug}
            href={`/${r.slug}-reverse-sales-tax-calculator`}
            className="group px-3.5 py-3 rounded-xl bg-slate-50 hover:bg-brand-600 border border-slate-200/80 hover:border-brand-600 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-brand-50 group-hover:bg-white/20 text-brand-600 group-hover:text-white transition-colors shrink-0 flex items-center justify-center">
              <StateMapIcon slug={r.slug} className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-white transition-colors truncate block">
                {r.name}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 group-hover:text-brand-100 transition-colors mt-0.5 block truncate">
                {r.taxName} ({r.rate}%{r.secondRate ? ` + ${r.secondRate}%` : ''})
              </span>
            </div>
          </Link>
        ))}
      </div>

      {currentList.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No region matching &quot;{search}&quot; found.
        </div>
      )}
    </section>
  )
}
