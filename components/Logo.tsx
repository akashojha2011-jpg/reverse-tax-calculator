import React from 'react'
import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official Brand Logo Icon */}
      <div className="relative w-8 h-8 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
        <Image
          src="/icon.png"
          alt="Reverse Tax Calculator Icon"
          width={32}
          height={32}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Distinct Typography */}
      <div className="flex items-center text-lg sm:text-xl font-black tracking-tight font-sans">
        <span className="text-slate-900 font-extrabold">Reverse Tax</span>
        <span className="text-brand-600 font-bold ml-1">Calculator</span>
      </div>
    </div>
  )
}
