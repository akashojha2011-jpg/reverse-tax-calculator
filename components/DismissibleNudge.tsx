'use client'

import React, { useState } from 'react'
import { Bookmark, X } from 'lucide-react'

export function DismissibleNudge() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="mt-4 p-3 rounded-xl bg-slate-100/80 border border-slate-200/80 flex items-center justify-between gap-3 text-xs text-slate-700">
      <div className="flex items-center gap-2">
        <Bookmark className="w-4 h-4 text-brand-600 shrink-0" />
        <span>
          <strong>Tip:</strong> Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-[10px]">Ctrl+D</kbd> or <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-[10px]">Cmd+D</kbd> to bookmark this reverse tax calculator for quick access.
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
        title="Dismiss note"
        aria-label="Dismiss note"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
