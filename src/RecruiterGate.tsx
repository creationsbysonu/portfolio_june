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
} from './access'
import './RecruiterGate.css'

type RecruiterGateProps = {
  open: boolean
  onClose: () => void
}

export default function RecruiterGate({ open, onClose }: RecruiterGateProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [showNumberForm, setShowNumberForm] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const inputRef = useRef<HTMLInputElement>(null)

  const openAccess = isBriefOpenAccess(now)
  const openApplication = OPEN_ACCESS_BRIEF_NUMBER ? findApplication(OPEN_ACCESS_BRIEF_NUMBER) : undefined

  useEffect(() => {
    if (!open) {
      setError('')
      setShowNumberForm(false)
      return
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)
    const ticker = window.setInterval(() => setNow(Date.now()), 30_000)
    setNow(Date.now())

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.clearInterval(ticker)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open || !showNumberForm) {
      return
    }

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(focusTimer)
  }, [open, showNumberForm])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const application = findApplication(value)

    if (!application) {
      setError('No brief is linked to that number yet. Check the number on your interview invite, or email me and I will send it directly.')
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
            <button type="button" className="recruiter-gate__close" onClick={onClose} aria-label="Close">
              ×
            </button>

            <p className="recruiter-gate__eyebrow">
              <span className="recruiter-gate__dot" aria-hidden="true" />
              Recruiters start here
            </p>

            {directAccess ? (
              <>
                <h2 id="recruiter-gate-title">The interview brief is open.</h2>
                <p className="recruiter-gate__copy">
                  I promised the {openApplication?.company ?? 'interview'} panel that the work I showed them
                  would be one click away. Until <strong>{openAccessEndsLabel}</strong> the brief opens directly
                  — no application number needed. After that, the number from the interview invite unlocks it
                  again.
                </p>
                <p className="recruiter-gate__window">
                  <span className="recruiter-gate__window-dot" aria-hidden="true" />
                  {formatTimeLeft(OPEN_ACCESS_ENDS_AT - now)} of open access
                </p>

                <div className="recruiter-gate__open-actions">
                  <a
                    className="cta-button"
                    href={briefHref(OPEN_ACCESS_BRIEF_NUMBER)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                  >
                    Open the interview brief ↗
                  </a>
                </div>

                <div className="recruiter-gate__footer">
                  <button
                    type="button"
                    className="text-link recruiter-gate__dismiss"
                    onClick={() => setShowNumberForm(true)}
                  >
                    I have an application number
                  </button>
                  <a className="text-link" href="#/resume" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </div>
              </>
            ) : (
              <>
                <h2 id="recruiter-gate-title">Enter your application number</h2>
                <p className="recruiter-gate__copy">
                  If you are a recruiter, enter the application number from your interview invite. It opens a
                  dedicated brief for that role — the documents I attached, the matching work, and the short
                  version of why I fit.
                </p>

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
                    placeholder="e.g. 922497"
                    value={value}
                    onChange={(event) => {
                      setValue(event.target.value.replace(/[^0-9]/g, '').slice(0, 12))
                      setError('')
                    }}
                  />
                  <button type="submit" className="cta-button" disabled={!value}>
                    Open my brief ↗
                  </button>
                </form>

                {error && <p className="recruiter-gate__error">{error}</p>}

                <div className="recruiter-gate__footer">
                  <button type="button" className="text-link recruiter-gate__dismiss" onClick={onClose}>
                    Just browsing — show me the portfolio
                  </button>
                  <a className="text-link" href="#/resume" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </div>
              </>
            )}
      </motion.div>
    </motion.div>
  )
}
