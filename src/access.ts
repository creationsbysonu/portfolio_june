// A brief can be published openly for a window by setting `openAccessUntil` on its
// entry in applications.ts. The window comes straight from those entries, so opening
// the next interview's brief is one field next to that brief — no dates in this file.
// Once the window closes, the application number from the interview invite is required again.
import { useEffect, useState } from 'react'
import { applications } from './applications'

export type OpenBriefWindow = {
  number: string
  endsAt: number
}

const publishedWindows: OpenBriefWindow[] = Object.values(applications)
  .flatMap((application) => {
    const endsAt = application.openAccessUntil ? Date.parse(application.openAccessUntil) : Number.NaN
    return Number.isFinite(endsAt) ? [{ number: application.number, endsAt }] : []
  })
  .sort((first, second) => second.endsAt - first.endsAt)

export const OPEN_BRIEF_WINDOW: OpenBriefWindow | null = publishedWindows[0] ?? null
export const OPEN_ACCESS_ENDS_AT = OPEN_BRIEF_WINDOW?.endsAt ?? 0
export const OPEN_ACCESS_BRIEF_NUMBER = OPEN_BRIEF_WINDOW?.number ?? ''

export const isBriefOpenAccess = (now = Date.now()) => now < OPEN_ACCESS_ENDS_AT

export const isBriefPublished = (number: string, now = Date.now()) =>
  number === OPEN_ACCESS_BRIEF_NUMBER && isBriefOpenAccess(now)

export const openAccessEndsLabel = OPEN_BRIEF_WINDOW
  ? new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Kathmandu',
    }).format(new Date(OPEN_BRIEF_WINDOW.endsAt))
  : ''

export function formatTimeLeft(milliseconds: number) {
  if (milliseconds <= 0) {
    return 'Closed'
  }

  const days = Math.floor(milliseconds / 86_400_000)
  const hours = Math.floor((milliseconds % 86_400_000) / 3_600_000)
  const minutes = Math.floor((milliseconds % 3_600_000) / 60_000)

  if (days > 0) {
    return `${days}d ${hours}h left`
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m left`
  }

  return `${Math.max(minutes, 1)}m left`
}

export const briefHref = (number: string) =>
  `${window.location.origin}${window.location.pathname}#/application/${number}`

/**
 * Re-renders on a timer while a public window exists, so a tab left open past the
 * deadline drops back to number-only access without a rebuild or a refresh.
 * When no brief is published there is nothing to watch, so no timer runs.
 */
export function useOpenAccessClock(intervalMs = 30_000) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!OPEN_BRIEF_WINDOW) {
      return
    }

    const tick = () => setNow(Date.now())
    tick()
    const timer = window.setInterval(tick, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs])

  return now
}
