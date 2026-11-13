/**
 * Centralized, pure, unit-tested sales tax calculation engine
 * for ReverseTaxCalculator.pro
 *
 * Implements strict financial precision, zero-division safeguards,
 * and transparent algebraic formulas.
 */

export interface ReverseTaxResult {
  netAmount: number
  taxAmount: number
  grossAmount: number
  taxRatePercentage: number
  effectiveRateOnGross: number
}

export interface ForwardSalesTaxResult {
  netAmount: number
  taxAmount: number
  totalAmount: number
  taxRatePercentage: number
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

export interface DiscountAndTaxResult {
  originalPrice: number
  discountPercentage: number
  discountAmount: number
  discountedPrice: number
  taxRatePercentage: number
  taxAmount: number
  finalTotal: number
  totalSavings: number
}

export interface TipAndTaxDetailedResult {
  foodSubtotal: number
  taxRatePercentage: number
  taxAmount: number
  tipPercentage: number
  tipAmount: number
  tipCalculatedOn: 'pre-tax' | 'post-tax'
  finalTotal: number
}

export interface JurisdictionTaxRate {
  stateRate: number
  countyRate?: number
  cityRate?: number
  specialDistrictRate?: number
}

export interface TaxBreakdownResult {
  baseAmount: number
  isTaxInclusive: boolean
  preTaxNet: number
  stateTaxAmount: number
  countyTaxAmount: number
  cityTaxAmount: number
  specialDistrictTaxAmount: number
  totalTaxAmount: number
  finalTotalAmount: number
  combinedRatePercentage: number
}

export interface LocationTaxComparisonResult {
  amount: number
  isTaxInclusive: boolean
  locations: Array<{
    name: string
    rate: number
    preTaxNet: number
    taxAmount: number
    totalAmount: number
    differenceFromLowest: number
  }>
  lowestTaxLocation: string
  highestTaxLocation: string
}

export interface BulkItemInput {
  id?: string
  name?: string
  price: number
  quantity?: number
  taxRatePercentage?: number
  isTaxInclusive?: boolean
}

export interface BulkItemResult {
  id: string
  name: string
  price: number
  quantity: number
  taxRatePercentage: number
  isTaxInclusive: boolean
  lineNet: number
  lineTax: number
  lineTotal: number
}

export interface BulkSalesTaxResult {
  items: BulkItemResult[]
  totalNet: number
  totalTax: number
  totalGross: number
  itemCount: number
}

/**
 * Standard financial rounding: rounds to 2 decimal places (cents)
 * Uses epsilon addition to avoid floating-point binary inaccuracies.
 */
export function roundCurrency(value: number): number {
  if (isNaN(value) || !isFinite(value)) return 0
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/**
 * Currency formatter with sensible fallbacks
 */
export function formatCurrency(amount: number, symbol: string = '$'): string {
  const rounded = roundCurrency(amount)
  return `${symbol}${rounded.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * 1. Standard Reverse Tax Calculation (Remove Tax / Calculate Pre-Tax Price)
 * Formula: Net = Gross / (1 + Rate / 100)
 * Tax = Gross - Net
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
    netAmount: roundCurrency(netAmount),
    taxAmount: roundCurrency(taxAmount),
    grossAmount: roundCurrency(grossAmount),
    taxRatePercentage,
    effectiveRateOnGross: roundCurrency(effectiveRateOnGross),
  }
}

/**
 * 2. Forward Sales Tax Calculation (Add Sales Tax)
 * Formula: Tax = Net * (Rate / 100)
 * Total = Net + Tax
 */
export function calculateForwardSalesTax(
  netAmount: number,
  taxRatePercentage: number
): ForwardSalesTaxResult {
  if (isNaN(netAmount) || netAmount < 0) {
    throw new Error('Net amount must be a non-negative number')
  }
  if (isNaN(taxRatePercentage) || taxRatePercentage < 0 || taxRatePercentage > 500) {
    throw new Error('Tax rate percentage must be between 0% and 500%')
  }

  const taxAmount = netAmount * (taxRatePercentage / 100)
  const totalAmount = netAmount + taxAmount

  return {
    netAmount: roundCurrency(netAmount),
    taxAmount: roundCurrency(taxAmount),
    totalAmount: roundCurrency(totalAmount),
    taxRatePercentage,
  }
}

/**
 * 3. Reverse Tax RATE Solver
 * Formula: Tax Rate = [(Gross / Net) - 1] * 100
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
  const rateDecimal = grossAmount / netAmount - 1
  const taxRatePercentage = rateDecimal * 100

  return {
    netAmount: roundCurrency(netAmount),
    grossAmount: roundCurrency(grossAmount),
    taxAmount: roundCurrency(taxAmount),
    taxRatePercentage: Math.round((taxRatePercentage + Number.EPSILON) * 1000) / 1000,
  }
}

/**
 * 4. Dual-Tax Calculation (e.g. Canada GST + QST/PST)
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
    const factor = (1 + t1) * (1 + t2)
    netAmount = grossAmount / factor
    tax1Amount = netAmount * t1
    tax2Amount = (netAmount + tax1Amount) * t2
  } else {
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
    netAmount: roundCurrency(netAmount),
    tax1Amount: roundCurrency(tax1Amount),
    tax2Amount: roundCurrency(tax2Amount),
    totalTaxAmount: roundCurrency(totalTaxAmount),
    grossAmount: roundCurrency(grossAmount),
    tax1Name,
    tax2Name,
    tax1RatePercentage,
    tax2RatePercentage,
    combinedRatePercentage: Math.round((combinedRatePercentage + Number.EPSILON) * 1000) / 1000,
  }
}

/**
 * 5. Discount and Sales Tax Calculator
 * Applies discount to original price, then calculates sales tax on discounted price.
 */
export function calculateDiscountAndTax(
  originalPrice: number,
  discountPercentage: number,
  taxRatePercentage: number
): DiscountAndTaxResult {
  if (isNaN(originalPrice) || originalPrice < 0) {
    throw new Error('Original price must be non-negative')
  }
  if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0% and 100%')
  }
  if (isNaN(taxRatePercentage) || taxRatePercentage < 0 || taxRatePercentage > 500) {
    throw new Error('Tax rate percentage must be between 0% and 500%')
  }

  const discountAmount = originalPrice * (discountPercentage / 100)
  const discountedPrice = originalPrice - discountAmount
  const taxAmount = discountedPrice * (taxRatePercentage / 100)
  const finalTotal = discountedPrice + taxAmount

  return {
    originalPrice: roundCurrency(originalPrice),
    discountPercentage,
    discountAmount: roundCurrency(discountAmount),
    discountedPrice: roundCurrency(discountedPrice),
    taxRatePercentage,
    taxAmount: roundCurrency(taxAmount),
    finalTotal: roundCurrency(finalTotal),
    totalSavings: roundCurrency(discountAmount),
  }
}

/**
 * 6. Restaurant Tip and Tax Calculator
 * Supports both pre-tax tip (standard etiquette) and post-tax tip calculation.
 */
export function calculateTipAndTaxDetailed(
  billAmount: number,
  taxRatePercentage: number,
  tipPercentage: number,
  isBillTaxInclusive: boolean = false,
  tipOnPreTax: boolean = true
): TipAndTaxDetailedResult {
  if (isNaN(billAmount) || billAmount < 0) {
    throw new Error('Bill amount must be non-negative')
  }
  if (isNaN(taxRatePercentage) || taxRatePercentage < 0) {
    throw new Error('Tax rate must be non-negative')
  }
  if (isNaN(tipPercentage) || tipPercentage < 0) {
    throw new Error('Tip rate must be non-negative')
  }

  const taxDecimal = taxRatePercentage / 100
  const tipDecimal = tipPercentage / 100

  let foodSubtotal: number
  let taxAmount: number

  if (isBillTaxInclusive) {
    foodSubtotal = taxDecimal === 0 ? billAmount : billAmount / (1 + taxDecimal)
    taxAmount = billAmount - foodSubtotal
  } else {
    foodSubtotal = billAmount
    taxAmount = foodSubtotal * taxDecimal
  }

  const tipBase = tipOnPreTax ? foodSubtotal : foodSubtotal + taxAmount
  const tipAmount = tipBase * tipDecimal
  const finalTotal = foodSubtotal + taxAmount + tipAmount

  return {
    foodSubtotal: roundCurrency(foodSubtotal),
    taxRatePercentage,
    taxAmount: roundCurrency(taxAmount),
    tipPercentage,
    tipAmount: roundCurrency(tipAmount),
    tipCalculatedOn: tipOnPreTax ? 'pre-tax' : 'post-tax',
    finalTotal: roundCurrency(finalTotal),
  }
}

/**
 * Backward compatibility alias for calculateReverseTaxAndTip
 */
export function calculateReverseTaxAndTip(
  totalPaid: number,
  taxRatePercentage: number,
  tipPercentage: number,
  tipOnGross: boolean = false
): ReverseTaxAndTipResult {
  const res = calculateTipAndTaxDetailed(
    totalPaid,
    taxRatePercentage,
    tipPercentage,
    true,
    !tipOnGross
  )
  return {
    netAmount: res.foodSubtotal,
    taxAmount: res.taxAmount,
    tipAmount: res.tipAmount,
    totalPaid: res.finalTotal,
    taxRatePercentage,
    tipPercentage,
  }
}

/**
 * 7. Sales Tax Breakdown Calculator
 * Deconstructs tax into State, County, City, and Special District components.
 */
export function calculateTaxBreakdown(
  amount: number,
  rates: JurisdictionTaxRate,
  isTaxInclusive: boolean = false
): TaxBreakdownResult {
  if (isNaN(amount) || amount < 0) {
    throw new Error('Amount must be non-negative')
  }

  const stateR = rates.stateRate || 0
  const countyR = rates.countyRate || 0
  const cityR = rates.cityRate || 0
  const specialR = rates.specialDistrictRate || 0
  const combinedRate = stateR + countyR + cityR + specialR

  let preTaxNet: number

  if (isTaxInclusive) {
    preTaxNet = combinedRate === 0 ? amount : amount / (1 + combinedRate / 100)
  } else {
    preTaxNet = amount
  }

  const stateTax = preTaxNet * (stateR / 100)
  const countyTax = preTaxNet * (countyR / 100)
  const cityTax = preTaxNet * (cityR / 100)
  const specialTax = preTaxNet * (specialR / 100)
  const totalTax = stateTax + countyTax + cityTax + specialTax
  const finalTotal = preTaxNet + totalTax

  return {
    baseAmount: roundCurrency(amount),
    isTaxInclusive,
    preTaxNet: roundCurrency(preTaxNet),
    stateTaxAmount: roundCurrency(stateTax),
    countyTaxAmount: roundCurrency(countyTax),
    cityTaxAmount: roundCurrency(cityTax),
    specialDistrictTaxAmount: roundCurrency(specialTax),
    totalTaxAmount: roundCurrency(totalTax),
    finalTotalAmount: roundCurrency(finalTotal),
    combinedRatePercentage: Math.round((combinedRate + Number.EPSILON) * 1000) / 1000,
  }
}

/**
 * 8. Multiple Location Tax Comparison
 * Compares taxes and final costs across multiple jurisdictions.
 */
export function compareLocationTaxes(
  amount: number,
  locations: Array<{ name: string; rate: number }>,
  isTaxInclusive: boolean = false
): LocationTaxComparisonResult {
  if (isNaN(amount) || amount < 0) {
    throw new Error('Amount must be non-negative')
  }
  if (!locations || locations.length === 0) {
    throw new Error('At least one location must be provided')
  }

  const computed = locations.map((loc) => {
    let preTaxNet: number
    let taxAmount: number
    let totalAmount: number

    if (isTaxInclusive) {
      preTaxNet = loc.rate === 0 ? amount : amount / (1 + loc.rate / 100)
      taxAmount = amount - preTaxNet
      totalAmount = amount
    } else {
      preTaxNet = amount
      taxAmount = amount * (loc.rate / 100)
      totalAmount = amount + taxAmount
    }

    return {
      name: loc.name,
      rate: loc.rate,
      preTaxNet: roundCurrency(preTaxNet),
      taxAmount: roundCurrency(taxAmount),
      totalAmount: roundCurrency(totalAmount),
      differenceFromLowest: 0,
    }
  })

  // Find lowest and highest tax amounts
  const lowestTax = Math.min(...computed.map((c) => c.taxAmount))
  const highestTax = Math.max(...computed.map((c) => c.taxAmount))
  const lowestLoc = computed.find((c) => c.taxAmount === lowestTax)?.name || ''
  const highestLoc = computed.find((c) => c.taxAmount === highestTax)?.name || ''

  computed.forEach((c) => {
    c.differenceFromLowest = roundCurrency(c.taxAmount - lowestTax)
  })

  return {
    amount: roundCurrency(amount),
    isTaxInclusive,
    locations: computed,
    lowestTaxLocation: lowestLoc,
    highestTaxLocation: highestLoc,
  }
}

/**
 * 9. Bulk Sales Tax Calculator
 * Calculates line-by-line and aggregated sales tax for multiple items.
 */
export function calculateBulkSalesTax(
  items: BulkItemInput[],
  defaultTaxRate: number = 0
): BulkSalesTaxResult {
  if (!items || items.length === 0) {
    return {
      items: [],
      totalNet: 0,
      totalTax: 0,
      totalGross: 0,
      itemCount: 0,
    }
  }

  let totalNet = 0
  let totalTax = 0
  let totalGross = 0

  const computedItems: BulkItemResult[] = items.map((item, idx) => {
    const qty = item.quantity !== undefined && item.quantity > 0 ? item.quantity : 1
    const price = isNaN(item.price) || item.price < 0 ? 0 : item.price
    const rate = item.taxRatePercentage !== undefined ? item.taxRatePercentage : defaultTaxRate
    const isInclusive = Boolean(item.isTaxInclusive)

    const rawLineAmount = price * qty
    let lineNet: number
    let lineTax: number
    let lineTotal: number

    if (isInclusive) {
      lineNet = rate === 0 ? rawLineAmount : rawLineAmount / (1 + rate / 100)
      lineTax = rawLineAmount - lineNet
      lineTotal = rawLineAmount
    } else {
      lineNet = rawLineAmount
      lineTax = rawLineAmount * (rate / 100)
      lineTotal = lineNet + lineTax
    }

    const roundedNet = roundCurrency(lineNet)
    const roundedTax = roundCurrency(lineTax)
    const roundedTotal = roundCurrency(lineTotal)

    totalNet += roundedNet
    totalTax += roundedTax
    totalGross += roundedTotal

    return {
      id: item.id || `item-${idx + 1}`,
      name: item.name || `Item ${idx + 1}`,
      price: roundCurrency(price),
      quantity: qty,
      taxRatePercentage: rate,
      isTaxInclusive: isInclusive,
      lineNet: roundedNet,
      lineTax: roundedTax,
      lineTotal: roundedTotal,
    }
  })

  return {
    items: computedItems,
    totalNet: roundCurrency(totalNet),
    totalTax: roundCurrency(totalTax),
    totalGross: roundCurrency(totalGross),
    itemCount: computedItems.length,
  }
}

/**
 * 10. Net-to-Gross Income Estimate
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
    targetNet: roundCurrency(targetNet),
    estimatedGross: roundCurrency(estimatedGross),
    estimatedTaxWithheld: roundCurrency(estimatedTaxWithheld),
    effectiveTaxRatePercentage,
    disclaimer:
      'This estimate uses a simplified flat effective tax rate. Actual payroll withholding is calculated using progressive tax brackets, local exemptions, and payroll deductions (FICA/EI/CPP). Consult a tax professional or official tax table for exact payroll calculations.',
  }
}
