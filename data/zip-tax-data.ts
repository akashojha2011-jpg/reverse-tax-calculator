export interface ZipTaxRate {
  zip: string
  city: string
  county: string
  stateCode: string
  stateName: string
  stateRate: number
  countyRate: number
  cityRate: number
  specialDistrictRate: number
  combinedRate: number
  notes?: string
}

export const US_ZIP_TAX_DATA: ZipTaxRate[] = [
  // New York
  {
    zip: '10001',
    city: 'New York (Manhattan)',
    county: 'New York County',
    stateCode: 'NY',
    stateName: 'New York',
    stateRate: 4.0,
    countyRate: 0.0,
    cityRate: 4.5,
    specialDistrictRate: 0.375,
    combinedRate: 8.875,
    notes: 'Includes 0.375% Metropolitan Commuter Transportation District (MCTD) surcharge.',
  },
  {
    zip: '11201',
    city: 'Brooklyn',
    county: 'Kings County',
    stateCode: 'NY',
    stateName: 'New York',
    stateRate: 4.0,
    countyRate: 0.0,
    cityRate: 4.5,
    specialDistrictRate: 0.375,
    combinedRate: 8.875,
    notes: 'Clothing and footwear under $110 per item are exempt from NYC & NYS sales tax.',
  },
  {
    zip: '14201',
    city: 'Buffalo',
    county: 'Erie County',
    stateCode: 'NY',
    stateName: 'New York',
    stateRate: 4.0,
    countyRate: 4.75,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 8.75,
  },
  {
    zip: '12207',
    city: 'Albany',
    county: 'Albany County',
    stateCode: 'NY',
    stateName: 'New York',
    stateRate: 4.0,
    countyRate: 4.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 8.0,
  },

  // California
  {
    zip: '90001',
    city: 'Los Angeles',
    county: 'Los Angeles County',
    stateCode: 'CA',
    stateName: 'California',
    stateRate: 7.25,
    countyRate: 1.0,
    cityRate: 0.0,
    specialDistrictRate: 1.25,
    combinedRate: 9.5,
    notes: 'Includes Los Angeles County transit and local district ballot measures.',
  },
  {
    zip: '94102',
    city: 'San Francisco',
    county: 'San Francisco County',
    stateCode: 'CA',
    stateName: 'California',
    stateRate: 7.25,
    countyRate: 0.25,
    cityRate: 0.0,
    specialDistrictRate: 1.125,
    combinedRate: 8.625,
    notes: 'San Francisco city and county are consolidated.',
  },
  {
    zip: '92101',
    city: 'San Diego',
    county: 'San Diego County',
    stateCode: 'CA',
    stateName: 'California',
    stateRate: 7.25,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.5,
    combinedRate: 7.75,
  },
  {
    zip: '95113',
    city: 'San Jose',
    county: 'Santa Clara County',
    stateCode: 'CA',
    stateName: 'California',
    stateRate: 7.25,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 2.125,
    combinedRate: 9.375,
  },

  // Texas
  {
    zip: '77002',
    city: 'Houston',
    county: 'Harris County',
    stateCode: 'TX',
    stateName: 'Texas',
    stateRate: 6.25,
    countyRate: 0.0,
    cityRate: 1.0,
    specialDistrictRate: 1.0,
    combinedRate: 8.25,
    notes: 'State statutory cap on local sales tax is 2.00%, reaching 8.25% maximum.',
  },
  {
    zip: '75201',
    city: 'Dallas',
    county: 'Dallas County',
    stateCode: 'TX',
    stateName: 'Texas',
    stateRate: 6.25,
    countyRate: 0.0,
    cityRate: 1.0,
    specialDistrictRate: 1.0,
    combinedRate: 8.25,
  },
  {
    zip: '78701',
    city: 'Austin',
    county: 'Travis County',
    stateCode: 'TX',
    stateName: 'Texas',
    stateRate: 6.25,
    countyRate: 0.0,
    cityRate: 1.0,
    specialDistrictRate: 1.0,
    combinedRate: 8.25,
  },
  {
    zip: '78205',
    city: 'San Antonio',
    county: 'Bexar County',
    stateCode: 'TX',
    stateName: 'Texas',
    stateRate: 6.25,
    countyRate: 0.0,
    cityRate: 1.0,
    specialDistrictRate: 1.0,
    combinedRate: 8.25,
  },

  // Florida
  {
    zip: '33101',
    city: 'Miami',
    county: 'Miami-Dade County',
    stateCode: 'FL',
    stateName: 'Florida',
    stateRate: 6.0,
    countyRate: 1.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 7.0,
    notes: 'Miami-Dade imposes 1.00% discretionary sales surtax.',
  },
  {
    zip: '32801',
    city: 'Orlando',
    county: 'Orange County',
    stateCode: 'FL',
    stateName: 'Florida',
    stateRate: 6.0,
    countyRate: 0.5,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 6.5,
  },
  {
    zip: '33602',
    city: 'Tampa',
    county: 'Hillsborough County',
    stateCode: 'FL',
    stateName: 'Florida',
    stateRate: 6.0,
    countyRate: 1.5,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 7.5,
  },
  {
    zip: '32202',
    city: 'Jacksonville',
    county: 'Duval County',
    stateCode: 'FL',
    stateName: 'Florida',
    stateRate: 6.0,
    countyRate: 1.5,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 7.5,
  },

  // Illinois
  {
    zip: '60601',
    city: 'Chicago',
    county: 'Cook County',
    stateCode: 'IL',
    stateName: 'Illinois',
    stateRate: 6.25,
    countyRate: 1.75,
    cityRate: 1.25,
    specialDistrictRate: 1.0,
    combinedRate: 10.25,
    notes: 'One of the highest combined sales tax rates in the nation. RTA transit district applies.',
  },
  {
    zip: '62701',
    city: 'Springfield',
    county: 'Sangamon County',
    stateCode: 'IL',
    stateName: 'Illinois',
    stateRate: 6.25,
    countyRate: 1.5,
    cityRate: 2.0,
    specialDistrictRate: 0.0,
    combinedRate: 9.75,
  },

  // Washington
  {
    zip: '98101',
    city: 'Seattle',
    county: 'King County',
    stateCode: 'WA',
    stateName: 'Washington',
    stateRate: 6.5,
    countyRate: 0.0,
    cityRate: 1.3,
    specialDistrictRate: 2.55,
    combinedRate: 10.35,
    notes: 'Includes Sound Transit (RTA) district surcharges.',
  },
  {
    zip: '99201',
    city: 'Spokane',
    county: 'Spokane County',
    stateCode: 'WA',
    stateName: 'Washington',
    stateRate: 6.5,
    countyRate: 0.0,
    cityRate: 1.5,
    specialDistrictRate: 1.1,
    combinedRate: 9.1,
  },

  // Pennsylvania
  {
    zip: '19102',
    city: 'Philadelphia',
    county: 'Philadelphia County',
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    stateRate: 6.0,
    countyRate: 2.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 8.0,
    notes: 'Philadelphia levies a 2.00% local tax on top of Pennsylvania 6.00%.',
  },
  {
    zip: '15219',
    city: 'Pittsburgh',
    county: 'Allegheny County',
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    stateRate: 6.0,
    countyRate: 1.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 7.0,
    notes: 'Allegheny County levies a 1.00% local sales tax surcharge.',
  },

  // Massachusetts (Uniform statewide)
  {
    zip: '02108',
    city: 'Boston',
    county: 'Suffolk County',
    stateCode: 'MA',
    stateName: 'Massachusetts',
    stateRate: 6.25,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 6.25,
    notes: 'Uniform statewide rate. No local municipal sales taxes permitted in Massachusetts.',
  },

  // District of Columbia
  {
    zip: '20001',
    city: 'Washington',
    county: 'District of Columbia',
    stateCode: 'DC',
    stateName: 'District of Columbia',
    stateRate: 6.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 6.0,
    notes: 'Uniform district-wide rate. Restaurant meals are taxed at 10.00%.',
  },

  // Colorado
  {
    zip: '80202',
    city: 'Denver',
    county: 'Denver County',
    stateCode: 'CO',
    stateName: 'Colorado',
    stateRate: 2.9,
    countyRate: 0.0,
    cityRate: 4.81,
    specialDistrictRate: 1.1,
    combinedRate: 8.81,
    notes: 'Colorado is a home-rule state; municipalities independently administer local taxes.',
  },

  // Georgia
  {
    zip: '30303',
    city: 'Atlanta',
    county: 'Fulton County',
    stateCode: 'GA',
    stateName: 'Georgia',
    stateRate: 4.0,
    countyRate: 3.0,
    cityRate: 1.5,
    specialDistrictRate: 0.4,
    combinedRate: 8.9,
    notes: 'Includes MARTA transit and City of Atlanta municipal options.',
  },

  // Arizona
  {
    zip: '85001',
    city: 'Phoenix',
    county: 'Maricopa County',
    stateCode: 'AZ',
    stateName: 'Arizona',
    stateRate: 5.6,
    countyRate: 0.7,
    cityRate: 2.3,
    specialDistrictRate: 0.0,
    combinedRate: 8.6,
    notes: 'Transaction Privilege Tax (TPT) is levied on vendor gross receipts.',
  },

  // North Carolina
  {
    zip: '28202',
    city: 'Charlotte',
    county: 'Mecklenburg County',
    stateCode: 'NC',
    stateName: 'North Carolina',
    stateRate: 4.75,
    countyRate: 2.0,
    cityRate: 0.0,
    specialDistrictRate: 0.5,
    combinedRate: 7.25,
  },
  {
    zip: '27601',
    city: 'Raleigh',
    county: 'Wake County',
    stateCode: 'NC',
    stateName: 'North Carolina',
    stateRate: 4.75,
    countyRate: 2.0,
    cityRate: 0.0,
    specialDistrictRate: 0.5,
    combinedRate: 7.25,
  },

  // Michigan (Uniform statewide)
  {
    zip: '48226',
    city: 'Detroit',
    county: 'Wayne County',
    stateCode: 'MI',
    stateName: 'Michigan',
    stateRate: 6.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 6.0,
    notes: 'Uniform statewide rate. No local county or municipal sales taxes in Michigan.',
  },

  // Ohio
  {
    zip: '43215',
    city: 'Columbus',
    county: 'Franklin County',
    stateCode: 'OH',
    stateName: 'Ohio',
    stateRate: 5.75,
    countyRate: 1.25,
    cityRate: 0.0,
    specialDistrictRate: 0.5,
    combinedRate: 7.5,
  },
  {
    zip: '44114',
    city: 'Cleveland',
    county: 'Cuyahoga County',
    stateCode: 'OH',
    stateName: 'Ohio',
    stateRate: 5.75,
    countyRate: 1.25,
    cityRate: 0.0,
    specialDistrictRate: 1.0,
    combinedRate: 8.0,
  },

  // Nevada
  {
    zip: '89101',
    city: 'Las Vegas',
    county: 'Clark County',
    stateCode: 'NV',
    stateName: 'Nevada',
    stateRate: 6.85,
    countyRate: 1.53,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 8.38,
  },

  // Tennessee
  {
    zip: '37201',
    city: 'Nashville',
    county: 'Davidson County',
    stateCode: 'TN',
    stateName: 'Tennessee',
    stateRate: 7.0,
    countyRate: 2.25,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 9.25,
    notes: 'Single articles over $1,600 have a special state rate cap of $3,200.',
  },
  {
    zip: '38103',
    city: 'Memphis',
    county: 'Shelby County',
    stateCode: 'TN',
    stateName: 'Tennessee',
    stateRate: 7.0,
    countyRate: 2.75,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 9.75,
  },

  // Louisiana
  {
    zip: '70112',
    city: 'New Orleans',
    county: 'Orleans Parish',
    stateCode: 'LA',
    stateName: 'Louisiana',
    stateRate: 4.45,
    countyRate: 2.5,
    cityRate: 2.5,
    specialDistrictRate: 0.0,
    combinedRate: 9.45,
    notes: 'One of the highest local tax rates in the nation. Local parish taxes vary widely.',
  },

  // Indiana (Uniform statewide)
  {
    zip: '46204',
    city: 'Indianapolis',
    county: 'Marion County',
    stateCode: 'IN',
    stateName: 'Indiana',
    stateRate: 7.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 7.0,
    notes: 'Uniform statewide rate. No local sales taxes in Indiana.',
  },

  // Missouri
  {
    zip: '63101',
    city: 'St. Louis',
    county: 'St. Louis City',
    stateCode: 'MO',
    stateName: 'Missouri',
    stateRate: 4.225,
    countyRate: 0.0,
    cityRate: 4.454,
    specialDistrictRate: 1.0,
    combinedRate: 9.679,
  },
  {
    zip: '64106',
    city: 'Kansas City',
    county: 'Jackson County',
    stateCode: 'MO',
    stateName: 'Missouri',
    stateRate: 4.225,
    countyRate: 1.25,
    cityRate: 3.25,
    specialDistrictRate: 0.375,
    combinedRate: 9.1,
  },

  // Minnesota
  {
    zip: '55401',
    city: 'Minneapolis',
    county: 'Hennepin County',
    stateCode: 'MN',
    stateName: 'Minnesota',
    stateRate: 6.875,
    countyRate: 0.65,
    cityRate: 0.5,
    specialDistrictRate: 1.0,
    combinedRate: 9.025,
  },

  // Oregon (No sales tax)
  {
    zip: '97201',
    city: 'Portland',
    county: 'Multnomah County',
    stateCode: 'OR',
    stateName: 'Oregon',
    stateRate: 0.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 0.0,
    notes: 'Oregon has no general sales tax. Prepared food and lodging taxes may apply in select jurisdictions.',
  },

  // New Hampshire (No sales tax)
  {
    zip: '03101',
    city: 'Manchester',
    county: 'Hillsborough County',
    stateCode: 'NH',
    stateName: 'New Hampshire',
    stateRate: 0.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 0.0,
    notes: 'New Hampshire has no general sales tax. An 8.5% Meals and Rooms Tax applies to dining and hotels.',
  },

  // Delaware (No sales tax)
  {
    zip: '19801',
    city: 'Wilmington',
    county: 'New Castle County',
    stateCode: 'DE',
    stateName: 'Delaware',
    stateRate: 0.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 0.0,
    notes: 'Delaware has no state or local sales tax. Businesses pay gross receipts taxes.',
  },

  // Montana (No sales tax)
  {
    zip: '59601',
    city: 'Helena',
    county: 'Lewis and Clark County',
    stateCode: 'MT',
    stateName: 'Montana',
    stateRate: 0.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 0.0,
    notes: 'Montana has no state sales tax. Select resort communities (e.g., Whitefish) levy a 3% resort tax.',
  },

  // Alaska (No state tax, local rates apply)
  {
    zip: '99501',
    city: 'Anchorage',
    county: 'Anchorage Borough',
    stateCode: 'AK',
    stateName: 'Alaska',
    stateRate: 0.0,
    countyRate: 0.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 0.0,
    notes: 'Alaska has no state sales tax, and Anchorage levies no local sales tax.',
  },
  {
    zip: '99801',
    city: 'Juneau',
    county: 'Juneau Borough',
    stateCode: 'AK',
    stateName: 'Alaska',
    stateRate: 0.0,
    countyRate: 5.0,
    cityRate: 0.0,
    specialDistrictRate: 0.0,
    combinedRate: 5.0,
    notes: 'Juneau levies a 5.00% local borough sales tax.',
  },
]

export function searchZipTax(query: string): ZipTaxRate[] {
  const clean = query.trim().toLowerCase()
  if (!clean) return []

  // Check exact 5-digit zip first
  const exactZip = US_ZIP_TAX_DATA.filter((item) => item.zip.startsWith(clean))
  if (exactZip.length > 0) return exactZip

  // Search by city name or state code
  return US_ZIP_TAX_DATA.filter(
    (item) =>
      item.city.toLowerCase().includes(clean) ||
      item.stateName.toLowerCase().includes(clean) ||
      item.stateCode.toLowerCase() === clean ||
      item.county.toLowerCase().includes(clean)
  )
}

export function getZipTax(zip: string): ZipTaxRate | undefined {
  return US_ZIP_TAX_DATA.find((item) => item.zip === zip.trim())
}
