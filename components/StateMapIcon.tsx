import React from 'react'

interface StateMapIconProps {
  slug: string
  className?: string
}

export function StateMapIcon({ slug, className }: StateMapIconProps) {
  const cleanSlug = slug.replace('-reverse-sales-tax-calculator', '').toLowerCase()

  // 100% Correct Official State & Country Regional Postal Badges & Flags
  const regionBadges: Record<string, { code: string; flag?: string }> = {
    // US 50 States + DC
    alabama: { code: 'AL' },
    alaska: { code: 'AK' },
    arizona: { code: 'AZ' },
    arkansas: { code: 'AR' },
    california: { code: 'CA' },
    colorado: { code: 'CO' },
    connecticut: { code: 'CT' },
    delaware: { code: 'DE' },
    'district-of-columbia': { code: 'DC' },
    florida: { code: 'FL' },
    georgia: { code: 'GA' },
    hawaii: { code: 'HI' },
    idaho: { code: 'ID' },
    illinois: { code: 'IL' },
    indiana: { code: 'IN' },
    iowa: { code: 'IA' },
    kansas: { code: 'KS' },
    kentucky: { code: 'KY' },
    louisiana: { code: 'LA' },
    maine: { code: 'ME' },
    maryland: { code: 'MD' },
    massachusetts: { code: 'MA' },
    michigan: { code: 'MI' },
    minnesota: { code: 'MN' },
    mississippi: { code: 'MS' },
    missouri: { code: 'MO' },
    montana: { code: 'MT' },
    nebraska: { code: 'NE' },
    nevada: { code: 'NV' },
    'new-hampshire': { code: 'NH' },
    'new-jersey': { code: 'NJ' },
    'new-mexico': { code: 'NM' },
    'new-york': { code: 'NY' },
    'north-carolina': { code: 'NC' },
    'north-dakota': { code: 'ND' },
    ohio: { code: 'OH' },
    oklahoma: { code: 'OK' },
    oregon: { code: 'OR' },
    pennsylvania: { code: 'PA' },
    'rhode-island': { code: 'RI' },
    'south-carolina': { code: 'SC' },
    'south-dakota': { code: 'SD' },
    tennessee: { code: 'TN' },
    texas: { code: 'TX' },
    utah: { code: 'UT' },
    vermont: { code: 'VT' },
    virginia: { code: 'VA' },
    washington: { code: 'WA' },
    'west-virginia': { code: 'WV' },
    wisconsin: { code: 'WI' },
    wyoming: { code: 'WY' },

    // Canadian Provinces
    ontario: { code: 'ON', flag: '🇨🇦' },
    quebec: { code: 'QC', flag: '🇨🇦' },
    'british-columbia': { code: 'BC', flag: '🇨🇦' },
    alberta: { code: 'AB', flag: '🇨🇦' },
    saskatchewan: { code: 'SK', flag: '🇨🇦' },
    manitoba: { code: 'MB', flag: '🇨🇦' },
    'nova-scotia': { code: 'NS', flag: '🇨🇦' },
    'new-brunswick': { code: 'NB', flag: '🇨🇦' },
    'prince-edward-island': { code: 'PE', flag: '🇨🇦' },
    'newfoundland-and-labrador': { code: 'NL', flag: '🇨🇦' },

    // Global Countries
    uk: { code: 'UK', flag: '🇬🇧' },
    australia: { code: 'AU', flag: '🇦🇺' },
    india: { code: 'IN', flag: '🇮🇳' },
    germany: { code: 'DE', flag: '🇩🇪' },
    france: { code: 'FR', flag: '🇫🇷' },
    spain: { code: 'ES', flag: '🇪🇸' },
    singapore: { code: 'SG', flag: '🇸🇬' },
    'new-zealand': { code: 'NZ', flag: '🇳🇿' },
  }

  const badge = regionBadges[cleanSlug] || { code: cleanSlug.slice(0, 2).toUpperCase() }

  return (
    <span className={`inline-flex items-center justify-center font-extrabold text-xs tracking-wide select-none transition-colors ${className || 'text-brand-700'}`}>
      {badge.flag ? `${badge.flag} ${badge.code}` : badge.code}
    </span>
  )
}
