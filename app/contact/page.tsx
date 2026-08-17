import React from 'react'
import type { Metadata } from 'next'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'
import { Mail, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — Rate Corrections & Support',
  description:
    'Contact the Reverse Tax Calculator team for tax rate updates, feedback, or general inquiries.',
  alternates: {
    canonical: 'https://reversetaxcalculator.pro/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbNav items={[{ name: 'Contact Us', url: '/contact' }]} />

      <article className="max-w-text-col mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          Contact Us
        </h1>
        <p className="text-slate-700 text-base leading-relaxed mb-6">
          Have feedback, a feature suggestion, or noticed a recent tax rate change in your local state or province? We welcome your input!
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-brand-600 shrink-0" />
            <div>
              <div className="text-xs uppercase font-bold text-slate-500">Email Support</div>
              <div className="font-semibold text-slate-900">support@reversetaxcalculator.pro</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-brand-600 shrink-0" />
            <div>
              <div className="text-xs uppercase font-bold text-slate-500">Rate Corrections</div>
              <div className="text-sm text-slate-700">Please include region name, old rate, new rate, and official source link.</div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
