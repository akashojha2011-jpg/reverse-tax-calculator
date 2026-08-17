import React from 'react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Unique Custom Icon: Counter-Clockwise Reverse Arrow wrapping a Tax % Symbol */}
      <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-xs shrink-0 group">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-rotate-45"
        >
          {/* Reverse / Undo Circular Arrow Path */}
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          {/* Central Math Percent Dot Accent */}
          <circle cx="12" cy="11" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="1" fill="currentColor" />
          <path d="M16 9l-6 7" strokeWidth="2" />
        </svg>
      </div>

      {/* Distinct Typography */}
      <div className="flex items-center text-lg sm:text-xl font-black tracking-tight font-sans">
        <span className="text-slate-900 font-extrabold">Reverse Tax</span>
        <span className="text-brand-600 font-bold ml-1">Calculator</span>
      </div>
    </div>
  )
}
