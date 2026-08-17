import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://reversetaxcalculator.pro'),
  title: {
    default: 'Reverse Tax Calculator — Calculate Tax Included Price Backwards (Free Online Tool)',
    template: '%s | Reverse Tax Calculator',
  },
  description:
    'Free online reverse tax calculator. Instantly find pre-tax net amounts and tax paid backwards from tax-included total price for US sales tax, UK/EU VAT, Canada GST/HST, and income tax.',
  keywords: [
    'reverse tax calculator',
    'reverse sales tax calculator',
    'reverse calculation of tax',
    'reverse tax formula',
    'reverse tax rate calculator',
    'calculate tax backwards',
    'tax included calculator',
    'reverse vat calculator',
    'reverse gst calculator',
    'reverse hst calculation',
    'reverse tax calculator net to gross',
    'reverse paycheck tax calculator',
    'reverse sales tax and tip calculator',
    'how to calculate reverse tax percentage',
    'online reverse tax calculator',
  ],
  authors: [{ name: 'Reverse Tax Calculator Team', url: 'https://reversetaxcalculator.pro/about' }],
  creator: 'Reverse Tax Calculator',
  publisher: 'Reverse Tax Calculator',
  verification: {
    google: 'QlwCi5811ZlbI4jdi6S56_8vF-8QBSH3VoOHgGyfeW8',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/icon.png',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reversetaxcalculator.pro',
    siteName: 'Reverse Tax Calculator',
    title: 'Reverse Tax Calculator — Calculate Tax Included Price Backwards',
    description:
      'Free online tool to calculate pre-tax net prices and tax paid from total gross price. Supports US sales tax, UK/EU VAT, Canada GST/HST/PST, and payroll tax.',
    images: [
      {
        url: 'https://reversetaxcalculator.pro/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reverse Tax Calculator — Free Online Financial Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Tax Calculator — Calculate Tax Backwards from Total',
    description:
      'Free reverse tax calculator for sales tax, VAT, GST, HST, and payroll net-to-gross.',
    images: ['https://reversetaxcalculator.pro/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="QlwCi5811ZlbI4jdi6S56_8vF-8QBSH3VoOHgGyfeW8" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
