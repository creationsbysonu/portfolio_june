import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findApplication } from './applications'
import './App.css'
import './ApplicationPage.css'

const contactActions = [
  { label: 'Email me', href: 'mailto:studybysonugupta@gmail.com', primary: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sonu-gupta-681329340/' },
  { label: 'GitHub', href: 'https://github.com/creationsbysonu' },
]

export default function ApplicationPage() {
  const { number = '' } = useParams()
  const application = findApplication(number)

  useEffect(() => {
    document.title = application
      ? `${application.role} · Recruiter brief · Sonu Kumar Gupta`
      : 'Recruiter brief not found · Sonu Kumar Gupta'
    window.scrollTo(0, 0)
  }, [application])

  return (
    <div className="brief-page">
      <header className="brief-header">
        <Link className="brief-brand" to="/">
          <img src="/image_sonu.jpeg" alt="" className="brief-avatar" />
          <span className="brief-brand-text">
            <strong>Sonu Kumar Gupta</strong>
            <span>Computer Engineer · Kathmandu, Nepal</span>
          </span>
        </Link>
        <div className="brief-header-actions">
          <Link className="brief-action" to="/">
            Full portfolio
          </Link>
          <a className="brief-action" href="#/resume" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <button type="button" className="brief-action" onClick={() => window.print()}>
            Print / save brief
          </button>
        </div>
      </header>

      {!application ? (
        <main className="brief-missing">
          <p className="mono-label">Recruiter brief</p>
          <h1>No brief linked to this number.</h1>
          <p>
            Application numbers are printed on the interview invite. If you typed <strong>{number || '—'}</strong>,
            check the digits — otherwise email me and I will send the right brief directly.
          </p>
          <div className="brief-missing-actions">
            <a className="cta-button" href="mailto:studybysonugupta@gmail.com">
              Email Sonu
            </a>
            <Link className="text-link" to="/">
              Back to the portfolio
            </Link>
          </div>
        </main>
      ) : (
        <main className="brief-main">
          <section className="brief-hero">
            <p className="mono-label">Recruiter brief · Application {application.number}</p>
            <div className="brief-hero-head">
              <div>
                <h1>{application.role}</h1>
                <p className="brief-company">
                  {application.company} <span aria-hidden="true">·</span> {application.location}
                </p>
              </div>
              <div className="brief-stamp">
                <span>{application.statusLabel}</span>
                <strong>{application.interviewedOn}</strong>
              </div>
            </div>
            <p className="brief-summary">{application.summary}</p>
            <ul className="brief-tags">
              {application.focusTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>

          <div className="brief-columns">
            <div className="brief-content">
              <section className="brief-block">
                <h2>Why I fit this role</h2>
                <div className="brief-points">
                  {application.fitPoints.map((point, index) => (
                    <article className="brief-point" key={point.title}>
                      <span className="brief-point-index">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{point.title}</h3>
                      <p>{point.detail}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="brief-block">
                <h2>AI/ML depth</h2>
                <p className="brief-block-note">
                  The panel took the AI/ML side seriously, so here is the evidence behind it — a major project,
                  a research paper, and applied NLP work.
                </p>
                <div className="brief-points brief-points--ai">
                  {application.aiPoints.map((point) => (
                    <article className="brief-point" key={point.title}>
                      <h3>{point.title}</h3>
                      <p>{point.detail}</p>
                    </article>
                  ))}
                </div>
              </section>

            </div>

            <aside className="brief-side">
              <section className="brief-panel">
                <h2>Attached documents</h2>
                {application.documents.map((doc) => (
                  <article className="brief-document" key={doc.file}>
                    <p className="mono-label">{doc.kind}</p>
                    <h3>{doc.title}</h3>
                    <p className="brief-document-detail">{doc.detail}</p>
                    <p className="brief-document-meta">{doc.meta}</p>
                    <div className="brief-document-actions">
                      <a className="brief-doc-button" href={doc.file} target="_blank" rel="noopener noreferrer">
                        Read PDF ↗
                      </a>
                      <a className="brief-doc-download" href={doc.file} download>
                        Download
                      </a>
                    </div>
                  </article>
                ))}
              </section>

              <section className="brief-panel brief-panel--contact">
                <h2>Next step</h2>
                <p>Happy to walk the panel through any of this, or take a support scenario live.</p>
                <div className="brief-contact">
                  {contactActions.map((action) => (
                    <a
                      key={action.label}
                      className={action.primary ? 'cta-button' : 'brief-contact-link'}
                      href={action.href}
                      {...(action.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
                <p className="brief-panel-note">
                  Brief for application {application.number} · unlisted — it only opens with this number.
                </p>
              </section>
            </aside>
          </div>

          <section className="brief-block brief-block--wide">
            <h2>Relevant work</h2>
            <div className="brief-work-grid">
              {application.work.map((item) => (
                <article className="brief-work" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <ul className="brief-work-tags">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {item.href && (
                    <a className="brief-work-link" href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.hrefLabel ?? 'Open ↗'}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        </main>
      )}

      <footer className="brief-footer">
        <p>Sonu Kumar Gupta · studybysonugupta@gmail.com</p>
        <Link to="/">guptasonu.com.np</Link>
      </footer>
    </div>
  )
}
