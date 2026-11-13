import { describe, it, expect } from 'vitest'
import {
  calculateReverseTax,
  calculateForwardSalesTax,
  calculateReverseTaxRate,
  calculateDualTax,
  calculateDiscountAndTax,
  calculateTipAndTaxDetailed,
  calculateReverseTaxAndTip,
  calculateTaxBreakdown,
  compareLocationTaxes,
  calculateBulkSalesTax,
  calculateNetToGrossEstimate,
  roundCurrency,
  formatCurrency,
} from '../tax-math'

describe('Sales Tax Calculation Engine', () => {
  describe('calculateReverseTax (Remove Sales Tax / Pre-Tax Price)', () => {
    it('calculates standard 7% sales tax on $107 gross correctly', () => {
      const result = calculateReverseTax(107, 7)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(7.0)
      expect(result.grossAmount).toBe(107.0)
      expect(result.taxRatePercentage).toBe(7)
    })

    it('calculates 8.875% NYC sales tax on $108.88 correctly', () => {
      const result = calculateReverseTax(108.88, 8.875)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(8.88)
    })

    it('handles 0% tax rate correctly without division by zero', () => {
      const result = calculateReverseTax(50, 0)
      expect(result.netAmount).toBe(50.0)
      expect(result.taxAmount).toBe(0.0)
    })

    it('throws error for negative gross or invalid tax rate', () => {
      expect(() => calculateReverseTax(-100, 5)).toThrow()
      expect(() => calculateReverseTax(100, -5)).toThrow()
      expect(() => calculateReverseTax(100, 600)).toThrow()
    })
  })

  describe('calculateForwardSalesTax (Add Sales Tax)', () => {
    it('adds 6.25% Texas sales tax to $100.00 subtotal', () => {
      const result = calculateForwardSalesTax(100, 6.25)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(6.25)
      expect(result.totalAmount).toBe(106.25)
    })

    it('handles $0 net amount and 0% tax', () => {
      const result = calculateForwardSalesTax(0, 7)
      expect(result.taxAmount).toBe(0)
      expect(result.totalAmount).toBe(0)
    })
  })

  describe('calculateDiscountAndTax', () => {
    it('applies 20% discount and 8% tax to $100 item', () => {
      // Original: 100, Discount 20% = 20, Subtotal = 80, Tax 8% on 80 = 6.40, Total = 86.40
      const result = calculateDiscountAndTax(100, 20, 8)
      expect(result.originalPrice).toBe(100.0)
      expect(result.discountAmount).toBe(20.0)
      expect(result.discountedPrice).toBe(80.0)
      expect(result.taxAmount).toBe(6.4)
      expect(result.finalTotal).toBe(86.4)
      expect(result.totalSavings).toBe(20.0)
    })
  })

  describe('calculateTipAndTaxDetailed', () => {
    it('calculates tip on pre-tax subtotal (standard etiquette)', () => {
      // Food = $100, Tax 8% ($8), Tip 18% on $100 ($18) -> Total = $126
      const result = calculateTipAndTaxDetailed(100, 8, 18, false, true)
      expect(result.foodSubtotal).toBe(100.0)
      expect(result.taxAmount).toBe(8.0)
      expect(result.tipAmount).toBe(18.0)
      expect(result.finalTotal).toBe(126.0)
    })

    it('calculates tip on post-tax gross total when selected', () => {
      // Food = $100, Tax 8% ($8), Post-tax = $108, Tip 20% on $108 = $21.60 -> Total = $129.60
      const result = calculateTipAndTaxDetailed(100, 8, 20, false, false)
      expect(result.foodSubtotal).toBe(100.0)
      expect(result.taxAmount).toBe(8.0)
      expect(result.tipAmount).toBe(21.6)
      expect(result.finalTotal).toBe(129.6)
    })
  })

  describe('calculateTaxBreakdown', () => {
    it('breaks down combined 8.25% into state, county, and city components', () => {
      // State 6.25%, County 1.0%, City 1.0% on $100 net
      const result = calculateTaxBreakdown(100, {
        stateRate: 6.25,
        countyRate: 1.0,
        cityRate: 1.0,
      })
      expect(result.preTaxNet).toBe(100.0)
      expect(result.stateTaxAmount).toBe(6.25)
      expect(result.countyTaxAmount).toBe(1.0)
      expect(result.cityTaxAmount).toBe(1.0)
      expect(result.totalTaxAmount).toBe(8.25)
      expect(result.finalTotalAmount).toBe(108.25)
    })
  })

  describe('compareLocationTaxes', () => {
    it('compares purchase price of $1,000 across multiple state rates', () => {
      const result = compareLocationTaxes(1000, [
        { name: 'Oregon (0%)', rate: 0 },
        { name: 'New York (8%)', rate: 8 },
        { name: 'California (9.5%)', rate: 9.5 },
      ])
      expect(result.lowestTaxLocation).toBe('Oregon (0%)')
      expect(result.highestTaxLocation).toBe('California (9.5%)')
      expect(result.locations[0].taxAmount).toBe(0)
      expect(result.locations[1].taxAmount).toBe(80)
      expect(result.locations[2].taxAmount).toBe(95)
      expect(result.locations[2].differenceFromLowest).toBe(95)
    })
  })

  describe('calculateBulkSalesTax', () => {
    it('aggregates multiple line items with different prices and quantities', () => {
      const result = calculateBulkSalesTax(
        [
          { name: 'Widget A', price: 10, quantity: 2 }, // 20 net, at 7% = 1.40
          { name: 'Widget B', price: 50, quantity: 1 }, // 50 net, at 7% = 3.50
        ],
        7
      )
      expect(result.itemCount).toBe(2)
      expect(result.totalNet).toBe(70.0)
      expect(result.totalTax).toBe(4.9)
      expect(result.totalGross).toBe(74.9)
    })
  })

  describe('helpers: roundCurrency & formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1234.5)).toBe('$1,234.50')
      expect(formatCurrency(0)).toBe('$0.00')
      expect(roundCurrency(10.005)).toBe(10.01)
    })
  })
})
