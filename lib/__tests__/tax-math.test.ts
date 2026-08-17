import { describe, it, expect } from 'vitest'
import {
  calculateReverseTax,
  calculateReverseTaxRate,
  calculateDualTax,
  calculateReverseTaxAndTip,
  calculateNetToGrossEstimate,
} from '../tax-math'

describe('Reverse Tax Math Library', () => {
  describe('calculateReverseTax', () => {
    it('calculates standard 7% sales tax on $107 gross correctly', () => {
      const result = calculateReverseTax(107, 7)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(7.0)
      expect(result.grossAmount).toBe(107.0)
      expect(result.taxRatePercentage).toBe(7)
    })

    it('calculates 20% UK VAT on £120 gross correctly', () => {
      const result = calculateReverseTax(120, 20)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(20.0)
    })

    it('handles 0% tax rate correctly', () => {
      const result = calculateReverseTax(50, 0)
      expect(result.netAmount).toBe(50.0)
      expect(result.taxAmount).toBe(0.0)
    })

    it('throws error for negative gross or invalid tax rate', () => {
      expect(() => calculateReverseTax(-100, 5)).toThrow()
      expect(() => calculateReverseTax(100, -5)).toThrow()
    })
  })

  describe('calculateReverseTaxRate', () => {
    it('solves tax rate when net is $100 and gross is $110', () => {
      const result = calculateReverseTaxRate(110, 100)
      expect(result.taxRatePercentage).toBe(10)
      expect(result.taxAmount).toBe(10)
    })

    it('solves tax rate for $107 gross and $100 net', () => {
      const result = calculateReverseTaxRate(107, 100)
      expect(result.taxRatePercentage).toBe(7)
    })

    it('throws error if net > gross', () => {
      expect(() => calculateReverseTaxRate(100, 120)).toThrow()
    })
  })

  describe('calculateDualTax', () => {
    it('calculates Quebec modern additive GST (5%) + QST (9.975%)', () => {
      // Total rate = 14.975%. Gross = $114.975 -> Net = $100, GST = $5, QST = $9.975
      const result = calculateDualTax(114.98, 5, 9.975, false, 'GST', 'QST')
      expect(result.netAmount).toBe(100.0)
      expect(result.tax1Amount).toBe(5.0)
      expect(result.tax2Amount).toBe(9.98)
    })

    it('calculates historical compounded GST + QST', () => {
      const result = calculateDualTax(115.47, 5, 9.975, true, 'GST', 'QST')
      expect(result.netAmount).toBe(100.0)
    })
  })

  describe('calculateReverseTaxAndTip', () => {
    it('calculates net, tax (8%), and tip (15%) from $123 total', () => {
      // Net * (1 + 0.08 + 0.15) = Net * 1.23 = 123 -> Net = 100, Tax = 8, Tip = 15
      const result = calculateReverseTaxAndTip(123, 8, 15)
      expect(result.netAmount).toBe(100.0)
      expect(result.taxAmount).toBe(8.0)
      expect(result.tipAmount).toBe(15.0)
    })
  })

  describe('calculateNetToGrossEstimate', () => {
    it('estimates $4,000 net target at 20% effective tax rate', () => {
      // gross = 4000 / (1 - 0.20) = 5000
      const result = calculateNetToGrossEstimate(4000, 20)
      expect(result.estimatedGross).toBe(5000.0)
      expect(result.estimatedTaxWithheld).toBe(1000.0)
      expect(result.disclaimer).toContain('simplified flat effective tax rate')
    })
  })
})
