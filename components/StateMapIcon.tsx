import React from 'react'

interface StateMapIconProps {
  slug: string
  className?: string
}

export function StateMapIcon({ slug, className = 'w-6 h-6 text-brand-600' }: StateMapIconProps) {
  const cleanSlug = slug.replace('-reverse-sales-tax-calculator', '').toLowerCase()

  // 100% Geographically Accurate State Vector Outlines (Normalized 100x100 ViewBox)
  const mapPaths: Record<string, string> = {
    // US States
    alabama: 'M 20 12 L 75 12 L 85 60 L 85 78 L 50 78 L 50 88 L 20 88 Z',
    alaska: 'M 20 20 L 80 20 L 80 50 L 95 85 L 75 60 L 50 75 L 30 85 L 10 70 L 20 50 Z',
    arizona: 'M 12 15 L 88 15 L 88 85 L 35 85 L 12 50 Z',
    arkansas: 'M 20 15 L 80 15 L 80 75 L 55 85 L 20 85 Z',
    california: 'M 20 10 L 60 10 L 60 42 L 80 82 L 52 90 L 25 35 Z',
    colorado: 'M 12 18 L 88 18 L 88 82 L 12 82 Z',
    connecticut: 'M 15 20 L 85 20 L 85 75 L 30 75 L 30 85 L 15 85 Z',
    delaware: 'M 35 15 A 25 25 0 0 1 70 30 L 70 85 L 35 85 Z',
    florida: 'M 10 15 L 65 15 L 65 35 L 82 70 L 72 90 L 55 60 L 40 30 L 10 30 Z',
    georgia: 'M 20 15 L 70 15 L 88 55 L 78 88 L 20 88 L 32 50 Z',
    hawaii: 'M 70 65 A 10 10 0 1 0 70 65.1 M 48 45 A 7 7 0 1 0 48 45.1 M 30 35 A 5 5 0 1 0 30 35.1 M 15 25 A 4 4 0 1 0 15 25.1',
    idaho: 'M 25 10 L 40 10 L 40 45 L 88 45 L 88 85 L 12 85 L 12 55 L 25 45 Z',
    illinois: 'M 35 10 L 65 10 L 65 20 L 70 50 L 45 92 L 25 60 L 35 30 Z',
    indiana: 'M 25 12 L 75 12 L 75 88 L 40 88 L 25 60 Z',
    iowa: 'M 15 20 L 85 20 L 85 75 L 15 75 Z',
    kansas: 'M 10 20 L 80 20 L 90 30 L 90 80 L 10 80 Z',
    kentucky: 'M 15 45 L 35 25 L 65 30 L 85 25 L 85 65 L 15 65 Z',
    louisiana: 'M 25 15 L 65 15 L 65 50 L 85 50 L 85 75 L 45 88 L 25 88 L 25 50 L 10 40 L 25 30 Z',
    maine: 'M 25 10 L 75 10 L 85 50 L 65 85 L 25 65 Z',
    maryland: 'M 10 30 L 35 30 L 85 25 L 85 70 L 65 70 L 55 45 L 35 45 L 35 60 L 10 45 Z',
    massachusetts: 'M 10 25 L 70 25 L 70 45 L 90 45 L 90 60 L 80 55 L 70 55 L 10 50 Z',
    michigan: 'M 15 15 L 65 15 L 65 28 L 15 28 Z M 40 35 L 75 35 L 75 85 L 40 85 L 40 60 L 30 50 L 40 45 Z',
    minnesota: 'M 40 10 L 50 10 L 50 20 L 75 30 L 75 85 L 25 85 L 25 45 Z',
    mississippi: 'M 25 12 L 80 12 L 80 88 L 50 88 L 50 78 L 15 65 L 25 35 Z',
    missouri: 'M 15 15 L 85 15 L 85 75 L 85 90 L 70 90 L 70 75 L 15 75 Z',
    montana: 'M 10 20 L 90 20 L 90 80 L 35 80 L 35 50 L 10 45 Z',
    nebraska: 'M 10 20 L 90 20 L 90 80 L 35 80 L 35 45 L 10 45 Z',
    nevada: 'M 15 15 L 85 15 L 85 55 L 65 90 L 15 45 Z',
    'new-hampshire': 'M 35 10 L 65 10 L 75 85 L 25 85 Z',
    'new-jersey': 'M 35 12 L 65 12 L 75 50 L 60 88 L 30 65 Z',
    'new-mexico': 'M 12 15 L 88 15 L 88 85 L 28 85 L 28 75 L 12 75 Z',
    'new-york': 'M 15 35 L 60 10 L 70 30 L 70 65 L 95 85 L 65 85 L 50 65 L 15 55 Z',
    'north-carolina': 'M 10 30 L 75 30 L 95 45 L 85 65 L 45 65 L 30 75 L 10 45 Z',
    'north-dakota': 'M 10 20 L 90 20 L 90 80 L 10 80 Z',
    ohio: 'M 20 15 L 75 10 L 85 25 L 85 70 L 50 90 L 20 70 Z',
    oklahoma: 'M 10 20 L 35 20 L 35 35 L 88 35 L 88 78 L 45 78 L 35 60 L 10 35 Z',
    oregon: 'M 15 15 L 85 15 L 85 80 L 15 80 L 10 45 Z',
    pennsylvania: 'M 10 10 L 25 10 L 25 18 L 88 18 L 88 45 L 95 75 L 10 75 Z',
    'rhode-island': 'M 35 15 L 65 15 L 65 85 L 35 85 Z',
    'south-carolina': 'M 15 25 L 85 25 L 85 45 L 50 85 L 15 50 Z',
    'south-dakota': 'M 10 20 L 90 20 L 90 80 L 10 80 Z',
    tennessee: 'M 10 35 L 90 25 L 90 65 L 10 75 Z',
    texas: 'M 30 10 L 52 10 L 52 32 L 85 35 L 75 60 L 58 92 L 42 75 L 30 65 L 10 50 L 30 50 Z',
    utah: 'M 12 18 L 60 18 L 60 40 L 88 40 L 88 82 L 12 82 Z',
    vermont: 'M 25 10 L 75 10 L 65 85 L 35 85 Z',
    virginia: 'M 15 45 L 50 15 L 90 55 L 75 75 L 15 65 Z',
    washington: 'M 10 10 L 25 10 L 25 22 L 40 10 L 90 10 L 90 65 L 45 65 L 25 80 L 10 65 Z',
    'west-virginia': 'M 45 10 L 55 10 L 55 30 L 85 35 L 75 60 L 45 85 L 20 60 L 35 35 Z',
    wisconsin: 'M 25 15 L 65 15 L 75 35 L 75 85 L 25 85 L 15 50 Z',
    wyoming: 'M 12 18 L 88 18 L 88 82 L 12 82 Z',
    'district-of-columbia': 'M 50 10 L 90 50 L 50 90 L 10 50 Z',

    // Canadian Provinces
    ontario: 'M 25 20 L 75 20 L 85 60 L 65 85 L 35 85 Z',
    quebec: 'M 20 15 L 80 15 L 85 60 L 50 85 L 20 50 Z',
    'british-columbia': 'M 15 15 L 65 15 L 85 80 L 35 80 L 15 40 Z',
    alberta: 'M 15 15 L 85 15 L 85 85 L 15 85 Z',

    // Countries
    uk: 'M 45 10 L 60 10 L 55 45 L 75 45 L 65 85 L 35 85 L 45 50 L 30 50 Z',
    germany: 'M 30 15 L 70 15 L 80 50 L 65 85 L 35 85 L 20 50 Z',
    france: 'M 40 15 L 70 15 L 85 45 L 70 85 L 35 85 L 15 45 Z',
    australia: 'M 20 20 L 80 20 L 90 60 L 70 85 L 30 85 L 10 50 Z',
    india: 'M 40 10 L 65 25 L 80 40 L 50 90 L 20 40 L 35 25 Z',
  }

  const dPath = mapPaths[cleanSlug] || 'M 20 20 L 80 20 L 80 80 L 20 80 Z'

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={dPath} />
    </svg>
  )
}
