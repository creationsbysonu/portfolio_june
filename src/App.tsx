import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Lottie from 'react-lottie-player'

import './App.css'

type SectionId = 'home' | 'work' | 'about' | 'experience' | 'contact'

const navItems: Array<{ label: string; href: `#${SectionId}` }> = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const featuredProjects = [
  {
    title: 'AI-Powered Visual Search Platform (e-Pasal)',
    description: 'Intelligent image-based product search. Fine-tuned a Vision Transformer on >100,000 images, generating deep feature embeddings for accurate content-based image retrieval.',
    stack: ['ViT', 'Python', 'FastAPI', 'React', 'Tailwind'],
    year: 'AI / ML',
    outcome: 'Real-time search with accurate SKU mapping.',
    lottie: 'https://cdn.lordicon.com/msoeawqm.json',
    demoLink: '#',
    githubLink: '#',
  },
  {
    title: 'Multilingual RAG Question Answering System',
    description: 'Designed a Retrieval Augmented Generation (RAG) pipeline supporting Hindi and Nepali languages. Implemented vector search to retrieve relevant documents before generating contextual answers.',
    stack: ['Python', 'Transformers', 'Vector DB', 'NLP'],
    year: 'AI / ML',
    outcome: 'Improved accessibility for regional users.',
    lottie: 'https://cdn.lordicon.com/zpxybbhl.json',
    demoLink: '#',
    githubLink: '#',
  },
  {
    title: 'Stutter Detection System for Nepali and Hindi',
    description: 'Built a speech analysis system capable of detecting stuttering patterns. Designed preprocessing pipelines and feature extraction methods for regional language audio.',
    stack: ['Python', 'Speech Processing', 'Machine Learning'],
    year: 'AI / ML',
    outcome: 'Classifies fluent versus disfluent speech.',
    lottie: '/lottie-speaking.json',
    demoLink: '#',
    githubLink: '#',
  },
  {
    title: 'Bhoko Pet - Food Delivery Application',
    description: 'Developed a full-stack food delivery platform with authentication, restaurant listings, cart system, and order management.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    year: 'Software',
    outcome: 'Responsive UI and robust REST APIs.',
    lottie: 'https://cdn.lordicon.com/qhviklyi.json',
    demoLink: '#',
    githubLink: '#',
  },
  {
    title: 'Scalable E-Commerce Platform',
    description: 'Built a complete e-commerce platform with product catalog, shopping cart, authentication, admin dashboard, and review systems.',
    stack: ['React.js', 'Node.js', 'MongoDB'],
    year: 'Software',
    outcome: 'Optimized database queries for fast performance.',
    lottie: 'https://cdn.lordicon.com/cllunfud.json',
    demoLink: '#',
    githubLink: '#',
  },
]

const stats = [
  { label: 'Projects shipped', value: 10, suffix: '+' },
  { label: 'Core stacks', value: 6, suffix: '+' },
  { label: 'Primary languages', value: 3, suffix: '' },
  { label: 'Graduation', value: 2026, suffix: '' },
]

const capabilities = [
  'Python',
  'JavaScript (ES6+)',
  'React.js / React Native',
  'Node.js / Express',
  'FastAPI / Flask',
  'Transformers',
  'NLP & RAG Systems',
  'MongoDB / MySQL',
]

const experiences = [
  {
    title: 'Full Stack Engineer (Freelance)',
    period: 'Jul 2022 – Dec 2024',
    description: 'Developed >10 responsive web applications for e-commerce, education, and professional services using the MERN stack.',
  },
  {
    title: 'Computer Teacher & IT Lead',
    period: 'Mar 2025 – Mar 2026',
    description: 'Led IT initiatives and taught computer science curriculum at St. Joseph School Biratnagar.',
  },
]

const achievements = [
  {
    quote: 'Selected for the Google Student Ambassador Program 2026. I value innovation, leadership, and continuous learning.',
    name: 'Google Gemini Student Ambassador ’26',
    title: 'Leadership & Community',
  },
  {
    quote: 'Developed real-world AI systems including computer vision search engines and multilingual question answering platforms.',
    name: 'AI & Open Source',
    title: 'Research & Development',
  },
]

const education = [
  {
    title: 'Bachelor of Engineering in Computer Engineering',
    readTime: 'Tribhuvan University, IOE Purwanchal Campus · Graduated 2026',
    tag: 'Degree',
  },
  {
    title: 'Higher Secondary Education (Science)',
    readTime: 'Lord Buddha Higher Secondary School, Biratnagar · 2019 – 2021',
    tag: '+2 Science',
  },
]

const contactLinks = [
  { label: 'Email', href: 'mailto:sonugupta.ioepc.edu.np@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sonu-gupta-681329340' },
  { label: 'GitHub', href: 'https://github.com/creationsbysonu' },
]

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
      setProgress(Math.min(Math.max(nextProgress, 0), 1))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

function useCounter(target: number, active: boolean, reducedMotion: boolean) {
  const [value, setValue] = useState(reducedMotion ? target : 0)

  useEffect(() => {
    if (!active) {
      return
    }

    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * progress))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [active, reducedMotion, target])

  return value
}

const FOCUS_CARDS = [
  {
    label: "Focus",
    title: "Building intelligent and scalable SaaS platforms.",
    desc: "Computer Vision, NLP, Transformers, and MERN."
  },
  {
    label: "Role",
    title: "Google Gemini Student Ambassador '26.",
    desc: "Empowering global tech communities."
  },
  {
    label: "Background",
    title: "Qualified Computer Engineer.",
    desc: "Tribhuvan University, IOE Purwanchal."
  }
];

const SECONDARY_CARDS = [
  {
    label: "Toolkit",
    title: "TypeScript, Python, C++",
    desc: "Robust languages for scalable systems."
  },
  {
    label: "Databases",
    title: "MongoDB, SQL, Vector DBs",
    desc: "Architecting high-performance data layers."
  },
  {
    label: "Philosophy",
    title: "Clean Code & Architecture",
    desc: "Building for humans and machines alike."
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [isHeaderMode, setIsHeaderMode] = useState(false)
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const [secondaryIndex, setSecondaryIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const papyrusHeight = useTransform(scrollY, [0, 200, 350, 550], [0, 360, 360, 0])

  const scrollProgress = useScrollProgress()
  const heroReveal = useInView<HTMLElement>(0.1)
  const workReveal = useInView<HTMLElement>(0.2)
  const aboutReveal = useInView<HTMLElement>(0.2)
  const servicesReveal = useInView<HTMLElement>(0.2)
  const testimonialsReveal = useInView<HTMLElement>(0.2)
  const articlesReveal = useInView<HTMLElement>(0.2)
  const contactReveal = useInView<HTMLElement>(0.2)
  const heroStats = useCounter(10, heroReveal.isVisible, reducedMotion)
  const stackCount = useCounter(6, heroReveal.isVisible, reducedMotion)
  const languageCount = useCounter(3, heroReveal.isVisible, reducedMotion)

  const tickerItems = useMemo(
    () => [...capabilities, ...capabilities, ...capabilities],
    [],
  )

  const heroMotion = useMemo(
    () => ({ transform: reducedMotion ? 'none' : 'translateY(var(--hero-offset, 0px))' }) as CSSProperties,
    [reducedMotion],
  )

  const scrollProgressMotion = useMemo(
    () => ({ transform: `scaleX(${Math.max(scrollProgress, 0.02)})` }) as CSSProperties,
    [scrollProgress],
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setFocusIndex(prev => (prev + 1) % FOCUS_CARDS.length)
    }, 4500)

    const secondaryTimer = setInterval(() => {
      setSecondaryIndex(prev => (prev + 1) % SECONDARY_CARDS.length)
    }, 5500)

    return () => {
      clearInterval(timer)
      clearInterval(secondaryTimer)
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (visibleEntry?.target instanceof HTMLElement) {
          const sectionId = visibleEntry.target.dataset.section as SectionId | undefined

          if (sectionId) {
            setActiveSection(sectionId)
          }
        }
      },
      { threshold: 0.45 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const element = heroReveal.ref.current

    if (!element) {
      return
    }

    let frame = 0

    const update = () => {
      const offset = Math.min(window.scrollY * 0.08, 48)
      element.style.setProperty('--hero-offset', `${offset}px`)
      frame = 0
    }

    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [heroReveal.ref, reducedMotion])

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    if (hasCompletedIntro) {
      document.body.style.overflow = 'auto'

      let overscrollAmount = 0
      let touchStartY = 0
      let topReachedTime = window.scrollY <= 5 ? Date.now() : 0

      const onScroll = () => {
        if (window.scrollY > 5) {
          topReachedTime = 0
          overscrollAmount = 0
        } else if (topReachedTime === 0) {
          topReachedTime = Date.now()
        }
      }

      const handleWheel = (e: WheelEvent) => {
        if (window.scrollY <= 5 && topReachedTime > 0 && Date.now() - topReachedTime > 800) {
          if (e.deltaY < 0) {
            overscrollAmount += Math.abs(e.deltaY)
            if (overscrollAmount > 500) {
              setIsHeaderMode(false)
              setHasCompletedIntro(false)
              overscrollAmount = 0
            }
          } else {
            overscrollAmount = 0
          }
        } else {
          overscrollAmount = 0
        }
      }

      const handleTouchStart = (e: TouchEvent) => {
        if (window.scrollY <= 5 && topReachedTime > 0 && Date.now() - topReachedTime > 800) {
          touchStartY = e.touches[0].clientY
        } else {
          touchStartY = 0
        }
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (window.scrollY <= 5 && touchStartY > 0) {
          const delta = e.touches[0].clientY - touchStartY
          if (delta > 250) {
            setIsHeaderMode(false)
            setHasCompletedIntro(false)
            touchStartY = 0
          }
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('wheel', handleWheel, { passive: true })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })

      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
      }
    } else {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)

      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 0 && !isHeaderMode) {
          setIsHeaderMode(true)
          setHasCompletedIntro(true)
        }
      }

      const handleTouchMove = () => {
        if (!isHeaderMode) {
          setIsHeaderMode(true)
          setHasCompletedIntro(true)
        }
      }

      window.addEventListener('wheel', handleWheel, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })

      return () => {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [hasCompletedIntro, isHeaderMode])

  return (
    <div className="portfolio-shell">
      <AnimatePresence>
        {!isHeaderMode && (
          <motion.div className="intro-loader">
            <motion.div
              className="intro-loader__bg"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            />
            <div className="intro-loader__panel">
              <motion.div
                className="intro-loader__panel-bg"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              />
              <motion.div
                className="intro-loader__image-wrap"
                layoutId="avatar-container"
                transition={{ layout: { type: "spring", stiffness: 40, damping: 14 }, opacity: { duration: 0 } }}
              >
                <motion.img
                  className="intro-loader__image"
                  src="/image_sonu.jpeg"
                  alt="Sonu Kumar Gupta"
                  layoutId="avatar-image"
                  transition={{ layout: { type: "spring", stiffness: 40, damping: 14 }, opacity: { duration: 0 } }}
                />
              </motion.div>
              <motion.div
                className="intro-loader__copy"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <p className="intro-loader__line" style={{ fontSize: '1.05rem', fontStyle: 'italic', opacity: 0.9, margin: 0 }}>
                  "He who commands both the logic of the machine and the art of the story holds the keys to the modern world."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', alignSelf: 'flex-end', marginTop: '12px', paddingRight: '20px' }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 300 }}>—</span>
                  <motion.p
                    className="signature-text"
                    layoutId="signature-text"
                    transition={{ layout: { type: "spring", stiffness: 40, damping: 14 }, opacity: { duration: 0 } }}
                    style={{ fontSize: '1.5rem', margin: 0 }}
                  >
                    Sonu Gupta
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scroll-progress" aria-hidden="true" style={scrollProgressMotion} />

      <header className="site-header">
        <div className="site-brand">
          <div style={{ width: 40, height: 40, flexShrink: 0 }}>
            <AnimatePresence>
              {isHeaderMode && (
                <motion.div
                  className="brand-avatar-wrap"
                  layoutId="avatar-container"
                  transition={{ layout: { type: "spring", stiffness: 40, damping: 14 }, opacity: { duration: 0 } }}
                >
                  <motion.img
                    className="brand-avatar"
                    src="/image_sonu.jpeg"
                    alt=""
                    layoutId="avatar-image"
                    transition={{ layout: { type: "spring", stiffness: 40, damping: 14 }, opacity: { duration: 0 } }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a className="brand-name" href="#home" style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
            <AnimatePresence>
              {isHeaderMode && (
                <motion.span
                  className="signature-text"
                  layoutId="signature-text"
                  transition={{ layout: { type: "spring", stiffness: 40, damping: 14 }, opacity: { duration: 0 } }}
                  style={{ fontSize: '1.5rem', marginLeft: '4px' }}
                >
                  Sonu Gupta
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        </div>

        <nav className="site-nav" aria-label="Primary">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            Menu
          </button>
          <ul className="nav-links desktop-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className={activeSection === item.href.slice(1) ? 'active' : ''} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#/resume" target="_blank" rel="noopener noreferrer">Resume</a>
            </li>
          </ul>
        </nav>

        <div id="mobile-menu" className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#/resume" target="_blank" rel="noopener noreferrer">Resume</a>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section" data-section="home" ref={heroReveal.ref} style={heroMotion}>
          <div className="hero-layout">
            <aside className="hero-aside">
              <p className="mono-label">AI/ML Engineer</p>
              <p className="mono-label">Full Stack Developer</p>
              <p className="mono-label" style={{ marginTop: '8px' }}>Google Gemini Student Ambassador '26</p>
              <p className="hero-meta">
                Qualified Computer Engineer<br />
                Tribhuvan University, IOE Purwanchal Campus<br />
              </p>
              <div className="hero-divider" />
              <p className="hero-meta">
                Email / GitHub / LinkedIn ready
              </p>

              <div style={{ marginTop: 'auto', paddingBottom: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <motion.div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Top Roll (Dowel) */}
                  <div style={{ width: '100%', height: '24px', flexShrink: 0, borderRadius: '12px', background: 'linear-gradient(to bottom, #d4bda5, #fcfbf8, #a88a65)', boxShadow: '0 6px 10px rgba(0,0,0,0.12)', zIndex: 2, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-8px', top: '4px', width: '8px', height: '16px', background: '#8c6e4a', borderRadius: '4px 0 0 4px', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.2)' }} />
                    <div style={{ position: 'absolute', right: '-8px', top: '4px', width: '8px', height: '16px', background: '#8c6e4a', borderRadius: '0 4px 4px 0', boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.2)' }} />
                  </div>

                  {/* Paper Content */}
                  <motion.div className="papyrus-content" style={{ width: '92%', height: papyrusHeight, background: '#fcfbf8', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 40px rgba(184, 157, 125, 0.15), inset 0 8px 10px rgba(0,0,0,0.04)', position: 'relative' }}>
                    <div style={{ padding: '30px 24px', textAlign: 'center', fontFamily: 'serif', color: '#4a3b2c', fontSize: '1.05rem', lineHeight: 1.8 }}>
                      <span style={{ fontStyle: 'italic' }}>"The true sign of intelligence is not knowledge but imagination."</span>
                      <div style={{ marginTop: '16px', fontWeight: 600, fontSize: '0.9rem', opacity: 0.8 }}>- ALBERT EINSTEIN</div>
                    </div>
                  </motion.div>

                  {/* Bottom Roll (Dowel) */}
                  <div style={{ width: '100%', height: '24px', flexShrink: 0, borderRadius: '12px', background: 'linear-gradient(to bottom, #a88a65, #fcfbf8, #d4bda5)', boxShadow: '0 -2px 10px rgba(0,0,0,0.08), 0 8px 15px rgba(0,0,0,0.15)', zIndex: 2, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-8px', top: '4px', width: '8px', height: '16px', background: '#8c6e4a', borderRadius: '4px 0 0 4px', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.2)' }} />
                    <div style={{ position: 'absolute', right: '-8px', top: '4px', width: '8px', height: '16px', background: '#8c6e4a', borderRadius: '0 4px 4px 0', boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </motion.div>
              </div>
            </aside>

            <div className={`reveal-group hero-copy-block ${heroReveal.isVisible ? 'is-visible' : ''}`}>
              <h1>Intelligent systems. Scalable products. Real impact.</h1>
              <div className="hero-actions">
                <a className="cta-button" href="#work">
                  Selected work
                </a>
                <a className="text-link" href="#/resume" target="_blank" rel="noopener noreferrer">Resume</a>
                <a className="text-link" href="#contact">Contact</a>
              </div>
              <div className="hero-stats" aria-label="Highlights">
                <div>
                  <strong>{heroStats}+</strong>
                  <span>{stats[0].label}</span>
                </div>
                <div>
                  <strong>{stackCount}+</strong>
                  <span>{stats[1].label}</span>
                </div>
                <div>
                  <strong>{languageCount}</strong>
                  <span>{stats[2].label}</span>
                </div>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Snapshot">
              <div className="hero-card hero-card--dark" style={{ position: 'relative', perspective: '1200px' }}>
                <AnimatePresence>
                  <motion.div
                    key={focusIndex}
                    initial={{ opacity: 0, rotateX: 90, y: -40 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: -90, y: 40 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column' }}
                  >
                    <p className="mono-label">{FOCUS_CARDS[focusIndex].label}</p>
                    <h2 style={{ flex: 1, margin: '10px 0 12px', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 0.94 }}>
                      {FOCUS_CARDS[focusIndex].title}
                    </h2>
                    <p>{FOCUS_CARDS[focusIndex].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="hero-card hero-card--dark" style={{ position: 'relative', perspective: '1200px', marginTop: 'auto', marginBottom: '10px' }}>
                <AnimatePresence>
                  <motion.div
                    key={secondaryIndex}
                    initial={{ opacity: 0, rotateX: -90, y: 40 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 90, y: -40 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column' }}
                  >
                    <p className="mono-label">{SECONDARY_CARDS[secondaryIndex].label}</p>
                    <h2 style={{ flex: 1, margin: '10px 0 12px', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.05 }}>
                      {SECONDARY_CARDS[secondaryIndex].title}
                    </h2>
                    <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>{SECONDARY_CARDS[secondaryIndex].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="scroll-indicator" aria-hidden="true">
                <span />
                <span />
              </div>
            </aside>
          </div>
        </section>

        <section className="ticker-band" aria-label="Capabilities ticker">
          <div className={`ticker-track ${reducedMotion ? 'is-static' : ''}`}>
            {tickerItems.map((item, index) => (
              <span key={`${item}-${index}`} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="work" className="section-block section-block--cinematic" data-section="work" ref={workReveal.ref}>
          <div className={`section-heading section-heading--split ${workReveal.isVisible ? 'is-visible' : ''}`}>
            <p className="section-kicker">Technical projects</p>
            <h2>Selected work.</h2>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <article
                key={project.title}
                className="project-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="project-visual" aria-hidden="true">
                  <span className="project-badge">0{index + 1}</span>
                  {project.lottie && (
                    <div className="project-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lottie
                        loop
                        animationData={undefined}
                        path={project.lottie}
                        play
                        style={{ width: '80%', height: '80%', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' }}
                      />
                    </div>
                  )}
                  <div className="project-gradient" />
                  <div className="project-line" />
                </div>
                <div className="project-body">
                  <p className="mono-label">{project.year}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tag-list">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <p className="project-outcome">{project.outcome}</p>
                  <div className="project-links">
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="project-link primary">Try it out ↗</a>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="project-link secondary">GitHub Repo ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section-block section-block--split section-block--cinematic" data-section="about" ref={aboutReveal.ref}>
          <div className={`section-heading section-heading--split ${aboutReveal.isVisible ? 'is-visible' : ''}`}>
            <p className="section-kicker">About</p>
            <h2>AI/ML Engineer.</h2>
          </div>
          <div className="about-panel">
            <div className="about-bio">
              <p>
                I am a qualified Computer Engineer, having graduated from IOE Purwanchal Campus, Tribhuvan University. I am deeply passionate about building intelligent systems and scalable software solutions. My work spans Computer Vision, NLP, Vision Transformers (ViT), and full-stack AI-powered applications using the MERN stack.
              </p>
              <p>
                I enjoy turning research ideas into practical products that create real-world impact. Selected for the Google Gemini Student Ambassador Program 2026, I value innovation, leadership, and continuous learning. Currently, I’m focused on advancing my expertise in AI, SaaS development, and emerging technologies, with aspirations to contribute to world-class technology companies. I believe technology is most powerful when it empowers people—and that’s the kind of future I strive to build. Open to collaborations, research opportunities, and innovative projects.
              </p>
            </div>
            <div>
              <h3>Technical Skills</h3>
              <ul className="capability-list">
                {capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="section-block section-block--cinematic" data-section="experience" ref={servicesReveal.ref}>
          <div className={`section-heading section-heading--split ${servicesReveal.isVisible ? 'is-visible' : ''}`}>
            <p className="section-kicker">Professional Journey</p>
            <h2>Experience.</h2>
          </div>
          <div className="service-grid">
            {experiences.map((exp) => (
              <article key={exp.title} className="service-card">
                <p className="mono-label">{exp.period}</p>
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="section-block section-block--cinematic" data-section="achievements" ref={testimonialsReveal.ref}>
          <div className={`section-heading section-heading--split ${testimonialsReveal.isVisible ? 'is-visible' : ''}`}>
            <p className="section-kicker">Milestones</p>
            <h2>Achievements.</h2>
          </div>
          <div className="testimonial-grid">
            {achievements.map((item) => (
              <figure key={item.name} className="testimonial-card">
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="education" className="section-block section-block--cinematic" data-section="education" ref={articlesReveal.ref}>
          <div className={`section-heading section-heading--split ${articlesReveal.isVisible ? 'is-visible' : ''}`}>
            <p className="section-kicker">Background</p>
            <h2>Education.</h2>
          </div>
          <div className="article-grid">
            {education.map((article) => (
              <article key={article.title} className="article-card">
                <p className="mono-label">{article.tag}</p>
                <h3>{article.title}</h3>
                <p>{article.readTime}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-block section-block--cinematic" data-section="contact" ref={contactReveal.ref}>
          <div className={`section-heading section-heading--split ${contactReveal.isVisible ? 'is-visible' : ''}`}>
            <p className="section-kicker">Contact</p>
            <h2>Internships, collaborations, roles.</h2>
            <p>Open to selective work.</p>
          </div>

          <div className="contact-card">
            <div className="contact-links">
              {contactLinks.map((link) => {
                const isExternal = link.href.startsWith('http')
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
            <a className="cta-button" href="mailto:sonugupta.ioepc.edu.np@gmail.com">
              Send an email
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Designed & developed by Sonu Kumar Gupta · ©2026</p>
        <a href="#home" className="text-link">
          Back to top
        </a>
      </footer>
    </div>
  )
}

export default App
