'use client'

import React, { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown, Share2, Check, BookOpen, ShieldCheck } from 'lucide-react'

interface CompactOmniHeaderProps {
  lastUpdated?: string
  initialLikes?: number
}

export function CompactOmniHeader({
  lastUpdated = 'August 2026',
  initialLikes = 1248,
}: CompactOmniHeaderProps) {
  const [likes, setLikes] = useState<number>(initialLikes)
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [showSources, setShowSources] = useState<boolean>(false)

  useEffect(() => {
    // Scoped key per page path to prevent vote leaking across tool pages
    const pageKey = `rtc_user_vote_${window.location.pathname}`
    const savedVote = localStorage.getItem(pageKey)
    if (savedVote === 'up' || savedVote === 'down') {
      setHasVoted(savedVote as 'up' | 'down')
      if (savedVote === 'up') {
        setLikes(initialLikes + 1)
      }
    }
  }, [initialLikes])

  const handleVote = (type: 'up' | 'down') => {
    const pageKey = `rtc_user_vote_${window.location.pathname}`

    // 1. Clicking an already active vote button UNLIKES / UNDISLIKES back to normal
    if (hasVoted === type) {
      if (type === 'up') {
        setLikes(initialLikes)
      }
      setHasVoted(null)
      localStorage.removeItem(pageKey)
      return
    }

    // 2. Voting UP
    if (type === 'up') {
      setLikes(initialLikes + 1)
      setHasVoted('up')
      localStorage.setItem(pageKey, 'up')
    } else {
      // Voting DOWN
      if (hasVoted === 'up') {
        setLikes(initialLikes)
      }
      setHasVoted('down')
      localStorage.setItem(pageKey, 'down')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } catch (err) {
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="space-y-3 my-3 pb-3 border-b border-slate-200/80">
      {/* 1. Date & Metadata line */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
        <span>Last updated: <strong>{lastUpdated}</strong></span>
        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Rate Schedules Verified
        </span>
      </div>

      {/* 2. Compact Creators / Reviewers line (Omni Style) */}
      <div className="flex items-center gap-3 text-xs text-slate-700">
        <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center text-[11px] shrink-0 shadow-2xs">
          RTC
        </div>
        <div className="space-y-0.5">
          <div className="text-slate-900 font-bold">
            Creators: <span className="text-brand-700 font-semibold">Reverse Tax Calculator Team</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            Reviewers: <span className="text-slate-700 font-medium">Financial & Accounting Research Group</span>
          </div>
        </div>
      </div>

      {/* 3. Sourcing dropdown trigger */}
      <div className="relative text-xs">
        <button
          onClick={() => setShowSources(!showSources)}
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-600 font-medium transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Based on <strong>4 official sources</strong> (IRS 26 USC, CRA, HMRC, State DORs)</span>
          <span className="text-[10px] text-slate-400">{showSources ? '▲' : '▼'}</span>
        </button>

        {showSources && (
          <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5 shadow-xs">
            <div className="font-bold text-slate-800">Primary Official Sourcing Authorities:</div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              <li>US Internal Revenue Service (IRS 26 USC) & 50 State DOR Rate Schedules</li>
              <li>Canada Revenue Agency (CRA) GST/HST/PST Rates</li>
              <li>UK HM Revenue & Customs (HMRC) & European Commission VAT Directives</li>
              <li>Australian Taxation Office (ATO) GST Guidelines</li>
            </ul>
          </div>
        )}
      </div>

      {/* 4. Interactive Like / Dislike Counter & Share Action Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Helpful Like / Dislike Button Pill */}
        <div className="inline-flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            onClick={() => handleVote('up')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              hasVoted === 'up'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
            title={hasVoted === 'up' ? 'Click to unlike' : 'Mark as helpful'}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{likes.toLocaleString()}</span>
          </button>

          <span className="w-[1px] h-4 bg-slate-300 mx-1" />

          <button
            onClick={() => handleVote('down')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              hasVoted === 'down'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-500 hover:bg-white hover:text-rose-600'
            }`}
            title={hasVoted === 'down' ? 'Click to remove dislike' : 'Mark as unhelpful'}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold shadow-2xs transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Share Tool</span>
            </>
          )}
        </button>

        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline ml-1">
          {likes.toLocaleString()} people found this calculator helpful
        </span>
      </div>
    </div>
  )
}
