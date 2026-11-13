'use client'

import React, { useState, useMemo } from 'react'
import { compareLocationTaxes, formatCurrency } from '@/lib/tax-math'
import { US_TAX_RATES_ARRAY } from '@/data/us-tax-rates'
import { Copy, Check, RotateCcw, ArrowRight, ShieldCheck, Scale } from 'lucide-react'

export function CompareTaxTool() {
  const [amount, setAmount] = useState<number>(500)
  const [loc1State, setLoc1State] = useState<string>('new-york')
  const [loc1Rate, setLoc1Rate] = useState<number>(8.875)
  const [loc2State, setLoc2State] = useState<string>('new-jersey')
  const [loc2Rate, setLoc2Rate] = useState<number>(6.625)
  const [loc3State, setLoc3State] = useState<string>('delaware')
  const [loc3Rate, setLoc3Rate] = useState<number>(0.0)
  const [copied, setCopied] = useState(false)

  const handleState1Change = (slug: string) => {
    setLoc1State(slug)
    const found = US_TAX_RATES_ARRAY.find((s) => s.slug === slug)
    if (found) setLoc1Rate(found.baseRate + (found.avgLocalRate || 0))
  }

  const handleState2Change = (slug: string) => {
    setLoc2State(slug)
    const found = US_TAX_RATES_ARRAY.find((s) => s.slug === slug)
    if (found) setLoc2Rate(found.baseRate + (found.avgLocalRate || 0))
  }

  const handleState3Change = (slug: string) => {
    setLoc3State(slug)
    const found = US_TAX_RATES_ARRAY.find((s) => s.slug === slug)
    if (found) setLoc3Rate(found.baseRate + (found.avgLocalRate || 0))
  }

  const comparison = useMemo(() => {
    const s1 = US_TAX_RATES_ARRAY.find((s) => s.slug === loc1State)?.name || 'Location 1'
    const s2 = US_TAX_RATES_ARRAY.find((s) => s.slug === loc2State)?.name || 'Location 2'
    const s3 = US_TAX_RATES_ARRAY.find((s) => s.slug === loc3State)?.name || 'Location 3'

    return compareLocationTaxes(amount, [
      { name: s1, rate: loc1Rate },
      { name: s2, rate: loc2Rate },
      { name: s3, rate: loc3Rate },
    ])
  }, [amount, loc1State, loc1Rate, loc2State, loc2Rate, loc3State, loc3Rate])

  const handleCopy = () => {
    const text = `Sales Tax Comparison on ${formatCurrency(amount)}:\n` +
      comparison.locations.map((r) => `• ${r.name} (${r.rate}%): Tax ${formatCurrency(r.taxAmount)}, Total ${formatCurrency(r.totalAmount)}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Amount Input Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-100 pb-6">
        <div className="md:col-span-6">
          <label htmlFor="compare-amount" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Purchase Subtotal to Compare ($)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              id="compare-amount"
              type="number"
              min="0"
              step="any"
              value={isNaN(amount) ? '' : amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              placeholder="500.00"
              className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="md:col-span-6 flex justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied Comparison</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Comparison</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 Location Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Loc 1 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <label htmlFor="loc1-select" className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Location A
          </label>
          <select
            id="loc1-select"
            value={loc1State}
            onChange={(e) => handleState1Change(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
          >
            {US_TAX_RATES_ARRAY.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} (Avg {s.baseRate + (s.avgLocalRate || 0)}%)
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Rate (%):</span>
            <input
              type="number"
              step="any"
              value={loc1Rate}
              onChange={(e) => setLoc1Rate(parseFloat(e.target.value) || 0)}
              className="w-20 p-1 bg-white border border-slate-200 rounded text-center font-bold"
            />
          </div>
        </div>

        {/* Loc 2 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <label htmlFor="loc2-select" className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Location B
          </label>
          <select
            id="loc2-select"
            value={loc2State}
            onChange={(e) => handleState2Change(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
          >
            {US_TAX_RATES_ARRAY.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} (Avg {s.baseRate + (s.avgLocalRate || 0)}%)
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Rate (%):</span>
            <input
              type="number"
              step="any"
              value={loc2Rate}
              onChange={(e) => setLoc2Rate(parseFloat(e.target.value) || 0)}
              className="w-20 p-1 bg-white border border-slate-200 rounded text-center font-bold"
            />
          </div>
        </div>

        {/* Loc 3 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <label htmlFor="loc3-select" className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Location C
          </label>
          <select
            id="loc3-select"
            value={loc3State}
            onChange={(e) => handleState3Change(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
          >
            {US_TAX_RATES_ARRAY.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} (Avg {s.baseRate + (s.avgLocalRate || 0)}%)
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Rate (%):</span>
            <input
              type="number"
              step="any"
              value={loc3Rate}
              onChange={(e) => setLoc3Rate(parseFloat(e.target.value) || 0)}
              className="w-20 p-1 bg-white border border-slate-200 rounded text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* Comparison Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparison.locations.map((res, idx) => {
          const isLowest = res.name === comparison.lowestTaxLocation && comparison.lowestTaxLocation !== comparison.highestTaxLocation
          return (
            <div
              key={res.name}
              className={`p-5 rounded-2xl border transition-all ${
                isLowest
                  ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-slate-500">Location {idx + 1}</span>
                {isLowest && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                    Lowest Tax
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900">{res.name}</h3>
              <div className="text-sm font-semibold text-blue-600">{res.rate}% Sales Tax</div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Sales Tax:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(res.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Final Total:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(res.totalAmount)}</span>
                </div>
                {res.differenceFromLowest > 0 && (
                  <div className="flex justify-between text-amber-700 font-semibold pt-1">
                    <span>Extra Tax:</span>
                    <span>+{formatCurrency(res.differenceFromLowest)}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Total Savings Callout */}
      {comparison.locations.some((l) => l.differenceFromLowest > 0) && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>
              Purchasing in <strong>{comparison.lowestTaxLocation}</strong> provides the lowest sales tax compared to other locations.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
