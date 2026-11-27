import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { findApplication } from './applications'
import {
  OPEN_ACCESS_BRIEF_NUMBER,
  OPEN_ACCESS_ENDS_AT,
  briefHref,
  formatTimeLeft,
  isBriefOpenAccess,
  openAccessEndsLabel,
  useOpenAccessClock,
} from './access'
import { gateCopy } from './gateCopy'
import './RecruiterGate.css'

type RecruiterGateProps = {
  open: boolean
  onClose: () => void
}

export default function RecruiterGate({ open, onClose }: RecruiterGateProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [showNumberForm, setShowNumberForm] = useState(false)
  const [copied, setCopied] = useState(false)
  const now = useOpenAccessClock()
  const inputRef = useRef<HTMLInputElement>(null)
  const copyTimer = useRef<number>(0)

  const openAccess = isBriefOpenAccess(now)
  const openApplication = OPEN_ACCESS_BRIEF_NUMBER ? findApplication(OPEN_ACCESS_BRIEF_NUMBER) : undefined

  useEffect(() => {
    if (!open) {
      setError('')
      setShowNumberForm(false)
      setCopied(false)
      return
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !showNumberForm) {
      return
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(focusTimer)
  }, [open, showNumberForm])

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const copyBriefLink = async () => {
    const url = briefHref(OPEN_ACCESS_BRIEF_NUMBER)

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // The async Clipboard API needs a secure origin; fall back to a hidden textarea.
      const field = document.createElement('textarea')
      field.value = url
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }

    setCopied(true)
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const application = findApplication(value)

    if (!application) {
      setError(gateCopy.number.error)
      return
    }

    const url = briefHref(application.number)
    // 'noopener' as a window feature makes window.open return null, which would defeat
    // the popup-blocked fallback below, so detach the opener by hand instead.
    const opened = window.open(url, '_blank')

    if (opened) {
      opened.opener = null
    } else {
      window.location.assign(url)
    }

    setValue('')
    setError('')
    onClose()
  }

  // No exit animation: opening the brief in a new tab backgrounds this page, which pauses
  // rAF and would leave an animating overlay stuck until the recruiter returns.
  if (!open) {
    return null
  }

  const directAccess = openAccess && !showNumberForm

  return (
    <motion.div
      className="recruiter-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="recruiter-gate__backdrop" onClick={onClose} />
      <motion.div
        className="recruiter-gate__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-gate-title"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <button
          type="button"
          className="recruiter-gate__close"
          onClick={onClose}
          aria-label={gateCopy.closeLabel}
        >
          ×
        </button>

        <p className="recruiter-gate__eyebrow">
          <span className="recruiter-gate__dot" aria-hidden="true" />
          {gateCopy.eyebrow}
        </p>

        {directAccess ? (
          <>
            <h2 id="recruiter-gate-title">{gateCopy.open.title}</h2>
            <p className="recruiter-gate__copy">
              {gateCopy.open.body(openApplication?.company ?? 'interview', openAccessEndsLabel)}
            </p>
            <p className="recruiter-gate__window">
              <span className="recruiter-gate__window-dot" aria-hidden="true" />
              {formatTimeLeft(OPEN_ACCESS_ENDS_AT - now)} {gateCopy.open.timeLeftSuffix}
            </p>

            <div className="recruiter-gate__open-actions">
              <a
                className="cta-button"
                href={briefHref(OPEN_ACCESS_BRIEF_NUMBER)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                {gateCopy.open.openBrief}
              </a>
              <button type="button" className="recruiter-gate__copy-link" onClick={copyBriefLink}>
                {copied ? gateCopy.open.copiedLink : gateCopy.open.copyLink}
              </button>
            </div>
            <p className="sr-only" role="status">
              {copied ? 'Brief link copied to the clipboard.' : ''}
            </p>

            <div className="recruiter-gate__footer">
              <button
                type="button"
                className="text-link recruiter-gate__dismiss"
                onClick={() => setShowNumberForm(true)}
              >
                {gateCopy.open.numberLink}
              </button>
              <a className="text-link" href="#/resume" target="_blank" rel="noopener noreferrer">
                {gateCopy.open.resumeLink}
              </a>
            </div>
          </>
        ) : (
          <>
            <h2 id="recruiter-gate-title">{gateCopy.number.title}</h2>
            <p className="recruiter-gate__copy">{gateCopy.number.body}</p>

            <form className="recruiter-gate__form" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="application-number">
                Application number
              </label>
              <input
                id="application-number"
                ref={inputRef}
                className="recruiter-gate__input"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder={gateCopy.number.placeholder}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value.replace(/[^0-9]/g, '').slice(0, 12))
                  setError('')
                }}
              />
              <button type="submit" className="cta-button" disabled={!value}>
                {gateCopy.number.submit}
              </button>
            </form>

            {error && <p className="recruiter-gate__error">{error}</p>}

            <div className="recruiter-gate__footer">
              <button type="button" className="text-link recruiter-gate__dismiss" onClick={onClose}>
                {gateCopy.number.dismiss}
              </button>
              <a className="text-link" href="#/resume" target="_blank" rel="noopener noreferrer">
                {gateCopy.number.resumeLink}
              </a>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
