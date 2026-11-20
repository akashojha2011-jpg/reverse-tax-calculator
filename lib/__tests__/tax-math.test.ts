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

    it('calculates reverse VAT for TEST 1: €120 gross at 20% VAT -> €100 net, €20 VAT', () => {
      const result = calculateReverseTax(120, 20)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(20.0)
      expect(result.grossAmount).toBe(120.0)
    })

    it('calculates reverse VAT for TEST 2: €119 gross at 19% VAT -> €100 net, €19 VAT', () => {
      const result = calculateReverseTax(119, 19)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(19.0)
      expect(result.grossAmount).toBe(119.0)
    })

    it('calculates reverse VAT for TEST 3: €121 gross at 21% VAT -> €100 net, €21 VAT', () => {
      const result = calculateReverseTax(121, 21)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(21.0)
      expect(result.grossAmount).toBe(121.0)
    })

    it('calculates reverse VAT for TEST 4: €149.99 gross at 19% VAT -> €126.04 net, €23.95 VAT', () => {
      const result = calculateReverseTax(149.99, 19)
      expect(result.netAmount).toBe(126.04)
      expect(result.taxAmount).toBe(23.95)
      expect(result.grossAmount).toBe(149.99)
    })

    it('calculates reverse VAT for TEST 5: €100 gross at 0% VAT -> €100 net, €0 VAT', () => {
      const result = calculateReverseTax(100, 0)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(0.0)
      expect(result.grossAmount).toBe(100.0)
    })

    it('calculates reverse VAT for additional examples (£240 at 20%, £115 at 15%, $110 at 10%)', () => {
      const res240 = calculateReverseTax(240, 20)
      expect(res240.netAmount).toBe(200.0)
      expect(res240.taxAmount).toBe(40.0)

      const res115 = calculateReverseTax(115, 15)
      expect(res115.netAmount).toBe(100.0)
      expect(res115.taxAmount).toBe(15.0)

      const res110 = calculateReverseTax(110, 10)
      expect(res110.netAmount).toBe(100.0)
      expect(res110.taxAmount).toBe(10.0)
    })

    describe('Reverse GST Calculation Specific Test Cases', () => {
      it('TEST 1: ₹1,180 gross at 18% GST -> ₹1,000 net, ₹180 GST', () => {
        const result = calculateReverseTax(1180, 18)
        expect(result.netAmount).toBe(1000.0)
        expect(result.taxAmount).toBe(180.0)
        expect(result.grossAmount).toBe(1180.0)
      })

      it('TEST 2: ₹1,050 gross at 5% GST -> ₹1,000 net, ₹50 GST', () => {
        const result = calculateReverseTax(1050, 5)
        expect(result.netAmount).toBe(1000.0)
        expect(result.taxAmount).toBe(50.0)
        expect(result.grossAmount).toBe(1050.0)
      })

      it('TEST 3: ₹1,120 gross at 12% GST -> ₹1,000 net, ₹120 GST', () => {
        const result = calculateReverseTax(1120, 12)
        expect(result.netAmount).toBe(1000.0)
        expect(result.taxAmount).toBe(120.0)
        expect(result.grossAmount).toBe(1120.0)
      })

      it('TEST 4: ₹100 gross at 0% GST -> ₹100 net, ₹0 GST', () => {
        const result = calculateReverseTax(100, 0)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(0.0)
        expect(result.grossAmount).toBe(100.0)
      })

      it('handles Australia 10% GST on $110 -> $100 net, $10 GST', () => {
        const result = calculateReverseTax(110, 10)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(10.0)
      })
    })

    describe('Reverse HST Calculation Specific Test Cases', () => {
      it('TEST 1: C$113 gross at 13% HST -> C$100 original price, C$13 HST', () => {
        const result = calculateReverseTax(113, 13)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(13.0)
        expect(result.grossAmount).toBe(113.0)
      })

      it('TEST 2: C$115 gross at 15% HST -> C$100 original price, C$15 HST', () => {
        const result = calculateReverseTax(115, 15)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(15.0)
        expect(result.grossAmount).toBe(115.0)
      })

      it('TEST 3: C$105 gross at 5% HST/GST -> C$100 original price, C$5 HST', () => {
        const result = calculateReverseTax(105, 5)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(5.0)
        expect(result.grossAmount).toBe(105.0)
      })

      it('TEST 4: C$100 gross at 0% HST -> C$100 original price, C$0 HST', () => {
        const result = calculateReverseTax(100, 0)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(0.0)
        expect(result.grossAmount).toBe(100.0)
      })

      it('handles C$108 at 8% and C$120 at 20%', () => {
        const res108 = calculateReverseTax(108, 8)
        expect(res108.netAmount).toBe(100.0)
        expect(res108.taxAmount).toBe(8.0)

        const res120 = calculateReverseTax(120, 20)
        expect(res120.netAmount).toBe(100.0)
        expect(res120.taxAmount).toBe(20.0)
      })
    })

    describe('Reverse PST Calculation Specific Test Cases', () => {
      it('TEST 1: C$112 gross at 7% PST -> C$104.67 original price, C$7.33 PST', () => {
        const result = calculateReverseTax(112, 7)
        expect(result.netAmount).toBe(104.67)
        expect(result.taxAmount).toBe(7.33)
        expect(result.grossAmount).toBe(112.0)
      })

      it('TEST 2: C$105 gross at 5% PST -> C$100.00 original price, C$5.00 PST', () => {
        const result = calculateReverseTax(105, 5)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(5.0)
        expect(result.grossAmount).toBe(105.0)
      })

      it('TEST 3: C$108 gross at 8% PST -> C$100.00 original price, C$8.00 PST', () => {
        const result = calculateReverseTax(108, 8)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(8.0)
        expect(result.grossAmount).toBe(108.0)
      })

      it('TEST 4: C$100 gross at 0% PST -> C$100.00 original price, C$0.00 PST', () => {
        const result = calculateReverseTax(100, 0)
        expect(result.netAmount).toBe(100.0)
        expect(result.taxAmount).toBe(0.0)
        expect(result.grossAmount).toBe(100.0)
      })

      it('handles C$110 at 10% and C$115 at 15%', () => {
        const res110 = calculateReverseTax(110, 10)
        expect(res110.netAmount).toBe(100.0)
        expect(res110.taxAmount).toBe(10.0)

        const res115 = calculateReverseTax(115, 15)
        expect(res115.netAmount).toBe(100.0)
        expect(res115.taxAmount).toBe(15.0)
      })
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

    it('calculates 4-tier breakdown for $100 purchase: State 5%, County 1%, City 1.5%, District 0.5%', () => {
      const result = calculateTaxBreakdown(100, {
        stateRate: 5.0,
        countyRate: 1.0,
        cityRate: 1.5,
        specialDistrictRate: 0.5,
      })
      expect(result.preTaxNet).toBe(100.0)
      expect(result.stateTaxAmount).toBe(5.0)
      expect(result.countyTaxAmount).toBe(1.0)
      expect(result.cityTaxAmount).toBe(1.5)
      expect(result.specialDistrictTaxAmount).toBe(0.5)
      expect(result.combinedRatePercentage).toBe(8.0)
      expect(result.totalTaxAmount).toBe(8.0)
      expect(result.finalTotalAmount).toBe(108.0)
    })

    it('calculates 4-tier breakdown for $500 purchase: State 5%, County 1%, City 1.5%, District 0.5%', () => {
      const result = calculateTaxBreakdown(500, {
        stateRate: 5.0,
        countyRate: 1.0,
        cityRate: 1.5,
        specialDistrictRate: 0.5,
      })
      expect(result.preTaxNet).toBe(500.0)
      expect(result.stateTaxAmount).toBe(25.0)
      expect(result.countyTaxAmount).toBe(5.0)
      expect(result.cityTaxAmount).toBe(7.5)
      expect(result.specialDistrictTaxAmount).toBe(2.5)
      expect(result.combinedRatePercentage).toBe(8.0)
      expect(result.totalTaxAmount).toBe(40.0)
      expect(result.finalTotalAmount).toBe(540.0)
    })

    it('handles zero rates and non-applicable tiers gracefully', () => {
      const result = calculateTaxBreakdown(250, {
        stateRate: 6.0,
        countyRate: 0,
        cityRate: 0,
        specialDistrictRate: 0,
      })
      expect(result.stateTaxAmount).toBe(15.0)
      expect(result.countyTaxAmount).toBe(0)
      expect(result.cityTaxAmount).toBe(0)
      expect(result.specialDistrictTaxAmount).toBe(0)
      expect(result.totalTaxAmount).toBe(15.0)
      expect(result.finalTotalAmount).toBe(265.0)
    })

    it('handles all rates at 0% correctly', () => {
      const result = calculateTaxBreakdown(150, {
        stateRate: 0,
        countyRate: 0,
        cityRate: 0,
        specialDistrictRate: 0,
      })
      expect(result.preTaxNet).toBe(150.0)
      expect(result.stateTaxAmount).toBe(0)
      expect(result.countyTaxAmount).toBe(0)
      expect(result.cityTaxAmount).toBe(0)
      expect(result.specialDistrictTaxAmount).toBe(0)
      expect(result.combinedRatePercentage).toBe(0)
      expect(result.totalTaxAmount).toBe(0)
      expect(result.finalTotalAmount).toBe(150.0)
    })

    it('handles decimal component rates accurately (e.g. NYC 8.875%)', () => {
      const result = calculateTaxBreakdown(100, {
        stateRate: 4.0,
        countyRate: 0,
        cityRate: 4.5,
        specialDistrictRate: 0.375,
      })
      expect(result.preTaxNet).toBe(100.0)
      expect(result.stateTaxAmount).toBe(4.0)
      expect(result.countyTaxAmount).toBe(0)
      expect(result.cityTaxAmount).toBe(4.5)
      expect(result.specialDistrictTaxAmount).toBe(0.38) // 0.375 rounds to 0.38
      expect(result.combinedRatePercentage).toBe(8.875)
      expect(result.totalTaxAmount).toBe(8.88)
      expect(result.finalTotalAmount).toBe(108.88)
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
