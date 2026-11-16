import React from 'react'
import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* Official Brand Logo Icon */}
      <div className="relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
        <Image
          src="/icon.png"
          alt="ReverseTaxCalculator.pro Logo"
          width={32}
          height={32}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Site Name Typography */}
      <div className="flex items-center text-base sm:text-lg md:text-xl tracking-tight font-sans whitespace-nowrap">
        <span className="text-slate-900 font-extrabold">ReverseTax</span>
        <span className="text-blue-600 font-bold">Calculator</span>
        <span className="text-slate-400 font-medium text-xs sm:text-sm ml-0.5">.pro</span>
      </div>
    </div>
  )
}
