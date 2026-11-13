'use client'

import React, { useState, useMemo } from 'react'
import { calculateBulkSalesTax, formatCurrency } from '@/lib/tax-math'
import { Plus, Trash2, Download, Copy, Check, RotateCcw, FileSpreadsheet } from 'lucide-react'

interface LineItemRow {
  id: string
  description: string
  quantity: number
  unitPrice: number
  taxable: boolean
}

export function BulkTaxTool() {
  const [taxRate, setTaxRate] = useState<number>(8.25)
  const [items, setItems] = useState<LineItemRow[]>([
    { id: '1', description: 'Office Chair', quantity: 2, unitPrice: 150.0, taxable: true },
    { id: '2', description: 'Standing Desk', quantity: 1, unitPrice: 399.0, taxable: true },
    { id: '3', description: 'Consulting Service (Exempt)', quantity: 1, unitPrice: 250.0, taxable: false },
  ])
  const [copied, setCopied] = useState(false)

  const handleAddItem = () => {
    const newItem: LineItemRow = {
      id: Date.now().toString(),
      description: `Item #${items.length + 1}`,
      quantity: 1,
      unitPrice: 0.0,
      taxable: true,
    }
    setItems([...items, newItem])
  }

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return
    setItems(items.filter((i) => i.id !== id))
  }

  const handleUpdateItem = (id: string, field: keyof LineItemRow, value: any) => {
    setItems(
      items.map((i) => {
        if (i.id === id) {
          return { ...i, [field]: value }
        }
        return i
      })
    )
  }

  const calculation = useMemo(() => {
    return calculateBulkSalesTax(
      items.map((i) => ({
        id: i.id,
        name: i.description,
        price: i.unitPrice,
        quantity: i.quantity,
        taxRatePercentage: i.taxable ? taxRate : 0,
        isTaxInclusive: false,
      })),
      taxRate
    )
  }, [items, taxRate])

  const taxableSubtotal = useMemo(() => {
    return items
      .filter((i) => i.taxable)
      .reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  }, [items])

  const exemptSubtotal = useMemo(() => {
    return items
      .filter((i) => !i.taxable)
      .reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  }, [items])

  const handleExportCsv = () => {
    const headers = ['Description', 'Quantity', 'Unit Price', 'Line Total', 'Taxable', 'Tax Rate', 'Tax Amount', 'Final Total']
    const rows = items.map((i, idx) => {
      const calcRow = calculation.items[idx]
      return [
        `"${i.description.replace(/"/g, '""')}"`,
        i.quantity,
        i.unitPrice.toFixed(2),
        (i.quantity * i.unitPrice).toFixed(2),
        i.taxable ? 'YES' : 'NO',
        `${taxRate}%`,
        calcRow ? calcRow.lineTax.toFixed(2) : '0.00',
        calcRow ? calcRow.lineTotal.toFixed(2) : '0.00',
      ].join(',')
    })

    const summaryRows = [
      '',
      `"Taxable Subtotal",,,,,"${taxableSubtotal.toFixed(2)}"`,
      `"Tax-Exempt Subtotal",,,,,"${exemptSubtotal.toFixed(2)}"`,
      `"Total Sales Tax (${taxRate}%)",,,,,"${calculation.totalTax.toFixed(2)}"`,
      `"Grand Total",,,,,"${calculation.totalGross.toFixed(2)}"`,
    ]

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows, ...summaryRows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `sales-tax-invoice-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopy = () => {
    const text = `Invoice Tax Summary:\nTaxable Subtotal: ${formatCurrency(taxableSubtotal)}\nExempt Subtotal: ${formatCurrency(exemptSubtotal)}\nSales Tax (${taxRate}%): ${formatCurrency(calculation.totalTax)}\nGrand Total: ${formatCurrency(calculation.totalGross)}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Top Header & Settings */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Invoice Line Items</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add items, toggle tax eligibility, and calculate batch sales tax.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="bulk-tax-rate" className="text-xs font-bold text-slate-700 uppercase">
              Tax Rate (%):
            </label>
            <input
              id="bulk-tax-rate"
              type="number"
              step="any"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
              className="w-20 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-3 font-bold">Item Description</th>
              <th className="py-2.5 px-2 font-bold w-20">Qty</th>
              <th className="py-2.5 px-3 font-bold w-28">Price ($)</th>
              <th className="py-2.5 px-3 font-bold w-24 text-center">Taxable</th>
              <th className="py-2.5 px-3 font-bold w-24 text-right">Tax ($)</th>
              <th className="py-2.5 px-3 font-bold w-28 text-right">Total ($)</th>
              <th className="py-2.5 px-2 font-bold w-12 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, idx) => {
              const calcItem = calculation.items[idx]
              return (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-medium focus:bg-white"
                      placeholder="Item name"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-center focus:bg-white"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.unitPrice}
                      onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold focus:bg-white"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={item.taxable}
                      onChange={(e) => handleUpdateItem(item.id, 'taxable', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-slate-700">
                    {formatCurrency(calcItem ? calcItem.lineTax : 0)}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900">
                    {formatCurrency(calcItem ? calcItem.lineTotal : 0)}
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length <= 1}
                      className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add Row Button */}
      <div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors border border-blue-200/80"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Line Item</span>
        </button>
      </div>

      {/* Invoice Totals Panel */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between max-w-sm">
              <span>Taxable Subtotal:</span>
              <span className="font-semibold text-white">{formatCurrency(taxableSubtotal)}</span>
            </div>
            <div className="flex justify-between max-w-sm">
              <span>Exempt Subtotal:</span>
              <span className="font-semibold text-white">{formatCurrency(exemptSubtotal)}</span>
            </div>
            <div className="flex justify-between max-w-sm">
              <span>Total Sales Tax ({taxRate}%):</span>
              <span className="font-bold text-emerald-400">+{formatCurrency(calculation.totalTax)}</span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-bold">Grand Invoice Total</span>
              <span className="text-2xl sm:text-3xl font-black text-white">{formatCurrency(calculation.totalGross)}</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
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
        </div>
      </div>
    </div>
  )
}
