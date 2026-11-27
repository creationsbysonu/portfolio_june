// After the Mahalaxmi Bikas Bank interview the promised brief stays open to anyone
// who clicks for a short window. Once the window closes, the application number
// from the interview invite is required again.
export const OPEN_ACCESS_ENDS_AT = new Date('2026-11-30T23:59:59+05:45').getTime()
export const OPEN_ACCESS_BRIEF_NUMBER = '922497'

export const isBriefOpenAccess = (now = Date.now()) => now < OPEN_ACCESS_ENDS_AT

export const openAccessEndsLabel = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kathmandu',
}).format(new Date(OPEN_ACCESS_ENDS_AT))

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
