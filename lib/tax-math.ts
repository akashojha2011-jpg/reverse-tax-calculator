/**
 * Shared, pure, unit-tested tax calculation logic for reversetaxcalculator.pro
 */

export interface ReverseTaxResult {
  netAmount: number
  taxAmount: number
  grossAmount: number
  taxRatePercentage: number
  effectiveRateOnGross: number
}

export interface DualTaxResult {
  netAmount: number
  tax1Amount: number
  tax2Amount: number
  totalTaxAmount: number
  grossAmount: number
  tax1Name: string
  tax2Name: string
  tax1RatePercentage: number
  tax2RatePercentage: number
  combinedRatePercentage: number
}

export interface ReverseTaxAndTipResult {
  netAmount: number
  taxAmount: number
  tipAmount: number
  totalPaid: number
  taxRatePercentage: number
  tipPercentage: number
}

export interface ReverseRateResult {
  netAmount: number
  grossAmount: number
  taxAmount: number
  taxRatePercentage: number
}

export interface NetToGrossResult {
  targetNet: number
  estimatedGross: number
  estimatedTaxWithheld: number
  effectiveTaxRatePercentage: number
  disclaimer: string
}

/**
 * Standard Reverse Tax Calculation (Sales Tax, VAT, GST, HST)
 * Formula: netAmount = grossAmount / (1 + taxRate)
 */
export function calculateReverseTax(
  grossAmount: number,
  taxRatePercentage: number
): ReverseTaxResult {
  if (isNaN(grossAmount) || grossAmount < 0) {
    throw new Error('Gross amount must be a non-negative number')
  }
  if (isNaN(taxRatePercentage) || taxRatePercentage < 0 || taxRatePercentage > 500) {
    throw new Error('Tax rate percentage must be between 0% and 500%')
  }

  const rateDecimal = taxRatePercentage / 100
  const netAmount = rateDecimal === 0 ? grossAmount : grossAmount / (1 + rateDecimal)
  const taxAmount = grossAmount - netAmount
  const effectiveRateOnGross = grossAmount > 0 ? (taxAmount / grossAmount) * 100 : 0

  return {
    netAmount: Math.round(netAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    grossAmount: Math.round(grossAmount * 100) / 100,
    taxRatePercentage,
    effectiveRateOnGross: Math.round(effectiveRateOnGross * 100) / 100,
  }
}

/**
 * Reverse Tax RATE Solver
 * Formula: taxRate = (grossAmount / netAmount) - 1
 */
export function calculateReverseTaxRate(
  grossAmount: number,
  netAmount: number
): ReverseRateResult {
  if (isNaN(grossAmount) || grossAmount <= 0) {
    throw new Error('Gross amount must be a positive number')
  }
  if (isNaN(netAmount) || netAmount <= 0) {
    throw new Error('Net amount must be a positive number')
  }
  if (netAmount > grossAmount) {
    throw new Error('Net amount cannot be greater than gross amount')
  }

  const taxAmount = grossAmount - netAmount
  const rateDecimal = (grossAmount / netAmount) - 1
  const taxRatePercentage = rateDecimal * 100

  return {
    netAmount: Math.round(netAmount * 100) / 100,
    grossAmount: Math.round(grossAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    taxRatePercentage: Math.round(taxRatePercentage * 1000) / 1000,
  }
}

/**
 * Canada / Regional Dual-Tax Calculation (e.g. Quebec GST + QST)
 * Compounded formula (historical QST on GST): gross = net * (1 + tax1) * (1 + tax2)
 * Additive formula (modern QST): gross = net * (1 + tax1 + tax2)
 */
export function calculateDualTax(
  grossAmount: number,
  tax1RatePercentage: number,
  tax2RatePercentage: number,
  isCompounded: boolean = false,
  tax1Name: string = 'GST',
  tax2Name: string = 'QST'
): DualTaxResult {
  if (isNaN(grossAmount) || grossAmount < 0) {
    throw new Error('Gross amount must be non-negative')
  }

  const t1 = tax1RatePercentage / 100
  const t2 = tax2RatePercentage / 100

  let netAmount: number
  let tax1Amount: number
  let tax2Amount: number

  if (isCompounded) {
    // gross = net * (1 + t1) * (1 + t2)
    const factor = (1 + t1) * (1 + t2)
    netAmount = grossAmount / factor
    tax1Amount = netAmount * t1
    // tax2 applies to (net + tax1)
    tax2Amount = (netAmount + tax1Amount) * t2
  } else {
    // gross = net * (1 + t1 + t2)
    const totalRate = t1 + t2
    netAmount = totalRate === 0 ? grossAmount : grossAmount / (1 + totalRate)
    tax1Amount = netAmount * t1
    tax2Amount = netAmount * t2
  }

  const totalTaxAmount = tax1Amount + tax2Amount
  const combinedRatePercentage = isCompounded
    ? ((1 + t1) * (1 + t2) - 1) * 100
    : tax1RatePercentage + tax2RatePercentage

  return {
    netAmount: Math.round(netAmount * 100) / 100,
    tax1Amount: Math.round(tax1Amount * 100) / 100,
    tax2Amount: Math.round(tax2Amount * 100) / 100,
    totalTaxAmount: Math.round(totalTaxAmount * 100) / 100,
    grossAmount: Math.round(grossAmount * 100) / 100,
    tax1Name,
    tax2Name,
    tax1RatePercentage,
    tax2RatePercentage,
    combinedRatePercentage: Math.round(combinedRatePercentage * 1000) / 1000,
  }
}

/**
 * Reverse Sales Tax + Tip Calculator
 * Calculates Subtotal (Net), Tax Paid, and Tip Paid from Total Bill.
 * Tip calculated on net subtotal by default (standard US/Canadian restaurant norm).
 */
export function calculateReverseTaxAndTip(
  totalPaid: number,
  taxRatePercentage: number,
  tipPercentage: number,
  tipOnGross: boolean = false
): ReverseTaxAndTipResult {
  if (isNaN(totalPaid) || totalPaid < 0) {
    throw new Error('Total paid must be non-negative')
  }

  const taxDecimal = taxRatePercentage / 100
  const tipDecimal = tipPercentage / 100

  let netAmount: number
  let taxAmount: number
  let tipAmount: number

  if (tipOnGross) {
    // total = (net * (1 + tax)) * (1 + tip)
    const grossBeforeTip = totalPaid / (1 + tipDecimal)
    tipAmount = totalPaid - grossBeforeTip
    netAmount = grossBeforeTip / (1 + taxDecimal)
    taxAmount = grossBeforeTip - netAmount
  } else {
    // tip on subtotal net: total = net * (1 + tax + tip)
    const combinedMultiplier = 1 + taxDecimal + tipDecimal
    netAmount = totalPaid / combinedMultiplier
    taxAmount = netAmount * taxDecimal
    tipAmount = netAmount * tipDecimal
  }

  return {
    netAmount: Math.round(netAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    taxRatePercentage,
    tipPercentage,
  }
}

/**
 * Net-to-Gross Income / Payroll Simplified Estimate
 * Note: Progressive income tax brackets apply in practice. This provides a flat effective estimate.
 */
export function calculateNetToGrossEstimate(
  targetNet: number,
  effectiveTaxRatePercentage: number
): NetToGrossResult {
  if (isNaN(targetNet) || targetNet < 0) {
    throw new Error('Target net income must be non-negative')
  }
  if (isNaN(effectiveTaxRatePercentage) || effectiveTaxRatePercentage < 0 || effectiveTaxRatePercentage >= 100) {
    throw new Error('Effective tax rate must be between 0% and 99.9%')
  }

  const rateDecimal = effectiveTaxRatePercentage / 100
  const estimatedGross = targetNet / (1 - rateDecimal)
  const estimatedTaxWithheld = estimatedGross - targetNet

  return {
    targetNet: Math.round(targetNet * 100) / 100,
    estimatedGross: Math.round(estimatedGross * 100) / 100,
    estimatedTaxWithheld: Math.round(estimatedTaxWithheld * 100) / 100,
    effectiveTaxRatePercentage,
    disclaimer:
      'This estimate uses a simplified flat effective tax rate. Actual payroll withholding is calculated using progressive tax brackets, local exemptions, and payroll deductions (FICA/EI/CPP). Consult a tax professional or official tax table for exact payroll calculations.',
  }
}
