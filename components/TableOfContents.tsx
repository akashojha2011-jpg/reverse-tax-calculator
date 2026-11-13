'use client'

import React, { useState, useEffect } from 'react'
import { ListCollapse, ChevronRight } from 'lucide-react'

export interface TocItem {
  id: string
  label?: string
  text?: string
}

export interface TableOfContentsProps {
  items?: TocItem[]
  headings?: TocItem[]
  title?: string
}

export function TableOfContents({ items, headings, title = 'Table of Contents' }: TableOfContentsProps) {
  const rawList = items || headings || []
  const normalizedList = rawList.map((h) => ({
    id: h.id,
    label: h.label || h.text || h.id,
  }))

  const [activeId, setActiveId] = useState<string>(normalizedList[0]?.id || '')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    )

    normalizedList.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [normalizedList])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
      window.history.pushState(null, '', `#${id}`)
    }
  }

  if (normalizedList.length === 0) return null

  return (
    <nav
      aria-label="Table of Contents"
      className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 my-6 text-sm"
    >
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
          <ListCollapse className="w-4 h-4 text-blue-600" />
          <span>{title}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isOpen && (
        <ol className="space-y-1.5 list-none m-0 p-0 text-xs sm:text-sm">
          {normalizedList.map((item, index) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} className="m-0 p-0">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`group flex items-center justify-between py-1 px-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-blue-700 font-semibold shadow-2xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span className="truncate pr-2">
                    <span className="text-slate-400 font-mono text-xs mr-2 font-normal">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    {item.label}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      )}
    </nav>
  )
}
