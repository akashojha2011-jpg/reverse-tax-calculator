const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/sales-tax-calculator',
        destination: '/tools/sales-tax-calculator/',
        permanent: true,
      },
      {
        source: '/sales-tax-breakdown-calculator',
        destination: '/tools/sales-tax-breakdown/',
        permanent: true,
      },
      {
        source: '/reverse-vat-calculator',
        destination: '/tools/reverse-vat-calculator/',
        permanent: true,
      },
      {
        source: '/reverse-gst-calculator',
        destination: '/tools/reverse-gst-calculator/',
        permanent: true,
      },
      {
        source: '/reverse-hst-calculator',
        destination: '/tools/reverse-hst-calculator/',
        permanent: true,
      },
      {
        source: '/reverse-pst-calculator',
        destination: '/tools/reverse-pst-calculator/',
        permanent: true,
      },
      {
        source: '/reverse-sales-tax-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/remove-sales-tax-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tax-inclusive-price-calculator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/add-sales-tax-calculator',
        destination: '/tools/sales-tax-calculator/',
        permanent: true,
      },
      {
        source: '/tax-exclusive-price-calculator',
        destination: '/tools/sales-tax-calculator/',
        permanent: true,
      },
      {
        source: '/reverse-sales-tax-and-tip-calculator',
        destination: '/tip-and-tax-calculator',
        permanent: true,
      },
      {
        source: '/reverse-tax-formula',
        destination: '/guides/how-to-calculate-reverse-tax-percentage',
        permanent: true,
      },
      {
        source: '/reverse-tax-rate-calculator',
        destination: '/guides/how-to-calculate-reverse-tax-percentage',
        permanent: true,
      },
      {
        source: '/reverse-income-tax-calculator',
        destination: '/guides/net-to-gross-salary-explained',
        permanent: true,
      },
      // Legacy International Regional URLs redirected to dedicated tools
      {
        source: '/united-kingdom-reverse-sales-tax-calculator',
        destination: '/tools/reverse-vat-calculator/',
        permanent: true,
      },
      {
        source: '/germany-reverse-sales-tax-calculator',
        destination: '/tools/reverse-vat-calculator/',
        permanent: true,
      },
      {
        source: '/france-reverse-sales-tax-calculator',
        destination: '/tools/reverse-vat-calculator/',
        permanent: true,
      },
      {
        source: '/spain-reverse-sales-tax-calculator',
        destination: '/tools/reverse-vat-calculator/',
        permanent: true,
      },
      {
        source: '/australia-reverse-sales-tax-calculator',
        destination: '/tools/reverse-gst-calculator/',
        permanent: true,
      },
      {
        source: '/india-reverse-sales-tax-calculator',
        destination: '/tools/reverse-gst-calculator/',
        permanent: true,
      },
      {
        source: '/singapore-reverse-sales-tax-calculator',
        destination: '/tools/reverse-gst-calculator/',
        permanent: true,
      },
      {
        source: '/new-zealand-reverse-sales-tax-calculator',
        destination: '/tools/reverse-gst-calculator/',
        permanent: true,
      },
      {
        source: '/alberta-reverse-sales-tax-calculator',
        destination: '/tools/reverse-gst-calculator/',
        permanent: true,
      },
      {
        source: '/ontario-reverse-sales-tax-calculator',
        destination: '/tools/reverse-hst-calculator/',
        permanent: true,
      },
      {
        source: '/nova-scotia-reverse-sales-tax-calculator',
        destination: '/tools/reverse-hst-calculator/',
        permanent: true,
      },
      {
        source: '/new-brunswick-reverse-sales-tax-calculator',
        destination: '/tools/reverse-hst-calculator/',
        permanent: true,
      },
      {
        source: '/prince-edward-island-reverse-sales-tax-calculator',
        destination: '/tools/reverse-hst-calculator/',
        permanent: true,
      },
      {
        source: '/newfoundland-and-labrador-reverse-sales-tax-calculator',
        destination: '/tools/reverse-hst-calculator/',
        permanent: true,
      },
      {
        source: '/british-columbia-reverse-sales-tax-calculator',
        destination: '/tools/reverse-pst-calculator/',
        permanent: true,
      },
      {
        source: '/quebec-reverse-sales-tax-calculator',
        destination: '/tools/reverse-pst-calculator/',
        permanent: true,
      },
      {
        source: '/saskatchewan-reverse-sales-tax-calculator',
        destination: '/tools/reverse-pst-calculator/',
        permanent: true,
      },
      {
        source: '/manitoba-reverse-sales-tax-calculator',
        destination: '/tools/reverse-pst-calculator/',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
