'use client'

import React, { useState, useMemo } from 'react'
import { calculateTaxBreakdown, formatCurrency } from '@/lib/tax-math'
import { US_ZIP_TAX_DATA } from '@/data/zip-tax-data'
import { Copy, Check, RotateCcw, PieChart, Layers } from 'lucide-react'

export function TaxBreakdownTool() {
  const [amount, setAmount] = useState<number>(100)
  const [isReverse, setIsReverse] = useState<boolean>(false)
  const [stateRate, setStateRate] = useState<number>(4.0)
  const [countyRate, setCountyRate] = useState<number>(0.0)
  const [cityRate, setCityRate] = useState<number>(4.5)
  const [specialRate, setSpecialRate] = useState<number>(0.375)
  const [copied, setCopied] = useState(false)

  const handlePreset = (zip: string) => {
    const found = US_ZIP_TAX_DATA.find((z) => z.zip === zip)
    if (found) {
      setStateRate(found.stateRate)
      setCountyRate(found.countyRate)
      setCityRate(found.cityRate)
      setSpecialRate(found.specialDistrictRate)
    }
  }

  const breakdown = useMemo(() => {
    return calculateTaxBreakdown(
      amount,
      {
        stateRate,
        countyRate,
        cityRate,
        specialDistrictRate: specialRate,
      },
      isReverse
    )
  }, [amount, stateRate, countyRate, cityRate, specialRate, isReverse])

  const totalRate = stateRate + countyRate + cityRate + specialRate

  const tiers = [
    { name: 'State Tax', rate: stateRate, taxAmount: breakdown.stateTaxAmount, color: 'text-blue-400' },
    { name: 'County Tax', rate: countyRate, taxAmount: breakdown.countyTaxAmount, color: 'text-indigo-400' },
    { name: 'City / Municipal Tax', rate: cityRate, taxAmount: breakdown.cityTaxAmount, color: 'text-emerald-400' },
    { name: 'Special District / Transit', rate: specialRate, taxAmount: breakdown.specialDistrictTaxAmount, color: 'text-amber-400' },
  ]

  const handleCopy = () => {
    const text = `Purchase: ${formatCurrency(amount)} (${isReverse ? 'Reverse from total' : 'Adding to subtotal'})\nTotal Tax Rate: ${totalRate}%\nTotal Tax: ${formatCurrency(breakdown.totalTaxAmount)}\nFinal Total: ${formatCurrency(breakdown.finalTotalAmount)}\n` +
      tiers.map((t) => `• ${t.name} (${t.rate}%): ${formatCurrency(t.taxAmount)}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="breakdown-amount" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {isReverse ? 'Tax-Inclusive Receipt Total ($)' : 'Pre-Tax Subtotal ($)'}
              </label>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setIsReverse(false)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${!isReverse ? 'bg-white shadow-2xs text-blue-700' : 'text-slate-600'}`}
                >
                  Forward (Add)
                </button>
                <button
                  type="button"
                  onClick={() => setIsReverse(true)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${isReverse ? 'bg-white shadow-2xs text-blue-700' : 'text-slate-600'}`}
                >
                  Reverse (Extract)
                </button>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                id="breakdown-amount"
                type="number"
                min="0"
                step="any"
                value={isNaN(amount) ? '' : amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="100.00"
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Quick Metro Presets */}
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1.5">Popular Jurisdictions:</div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'NYC (8.875%)', zip: '10001' },
                { name: 'Chicago (10.25%)', zip: '60601' },
                { name: 'Los Angeles (9.5%)', zip: '90001' },
                { name: 'Seattle (10.35%)', zip: '98101' },
                { name: 'Houston (8.25%)', zip: '77002' },
                { name: 'Denver (8.81%)', zip: '80202' },
              ].map((m) => (
                <button
                  key={m.zip}
                  type="button"
                  onClick={() => handlePreset(m.zip)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Tax Component Sliders/Inputs */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Component Tax Rates (%):
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="state-rate-input" className="block text-[11px] font-semibold text-slate-600 mb-1">State Rate (%)</label>
                <input
                  id="state-rate-input"
                  type="number"
                  min="0"
                  step="any"
                  value={stateRate}
                  onChange={(e) => setStateRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="county-rate-input" className="block text-[11px] font-semibold text-slate-600 mb-1">County Rate (%)</label>
                <input
                  id="county-rate-input"
                  type="number"
                  min="0"
                  step="any"
                  value={countyRate}
                  onChange={(e) => setCountyRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="city-rate-input" className="block text-[11px] font-semibold text-slate-600 mb-1">City Rate (%)</label>
                <input
                  id="city-rate-input"
                  type="number"
                  min="0"
                  step="any"
                  value={cityRate}
                  onChange={(e) => setCityRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="special-rate-input" className="block text-[11px] font-semibold text-slate-600 mb-1">Special District (%)</label>
                <input
                  id="special-rate-input"
                  type="number"
                  min="0"
                  step="any"
                  value={specialRate}
                  onChange={(e) => setSpecialRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Output Breakdown */}
        <div className="md:col-span-6 bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tax Revenue Distribution
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Visual Stacked Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Combined Sales Tax:</span>
              <span className="font-bold text-white">{totalRate.toFixed(3).replace(/\.?0+$/, '')}% ({formatCurrency(breakdown.totalTaxAmount)})</span>
            </div>
            {totalRate > 0 && (
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${(stateRate / totalRate) * 100}%` }} className="bg-blue-500 h-full" title={`State: ${stateRate}%`} />
                <div style={{ width: `${(countyRate / totalRate) * 100}%` }} className="bg-indigo-500 h-full" title={`County: ${countyRate}%`} />
                <div style={{ width: `${(cityRate / totalRate) * 100}%` }} className="bg-emerald-500 h-full" title={`City: ${cityRate}%`} />
                <div style={{ width: `${(specialRate / totalRate) * 100}%` }} className="bg-amber-500 h-full" title={`Special: ${specialRate}%`} />
              </div>
            )}
          </div>

          {/* Individual Tier Breakdown */}
          <div className="space-y-2.5 pt-2">
            {tiers.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60">
                <span className={`font-semibold ${tier.color}`}>
                  {tier.name} ({tier.rate}%):
                </span>
                <span className="font-bold text-white">{formatCurrency(tier.taxAmount)}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 block">
                {isReverse ? 'Original Net Subtotal' : 'Grand Total at Register'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(isReverse ? breakdown.preTaxNet : breakdown.finalTotalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
