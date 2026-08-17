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
  async rewrites() {
    return [
      {
        source: '/:region-reverse-sales-tax-calculator',
        destination: '/:region',
      },
      {
        source: '/reverse-sales-tax-calculator-:region',
        destination: '/:region',
      },
      {
        source: '/:region-sales-tax-calculator',
        destination: '/:region',
      },
      {
        source: '/:region-sales-tax',
        destination: '/:region',
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
