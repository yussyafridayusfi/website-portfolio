import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import SectionProgress from './components/SectionProgress.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import CvDocument from './components/CvDocument.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { projects, profile } from './config/portfolio.js'
import { initialSectionReveal } from './lib/smoothScroller.js'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx'
import { useRoute } from './lib/router.jsx'

function Site() {
  const { t } = useLanguage()
  const path = useRoute()

  const match = path.match(/^\/projects\/([^/]+)$/)
  const projectIndex = match
    ? projects.findIndex((project) => project.slug === decodeURIComponent(match[1]))
    : -1
  const project = projectIndex >= 0 ? projects[projectIndex] : null

  useEffect(() => {
    document.title = project
      ? `${project.name} — ${profile.name}`
      : `${profile.name} — ${profile.role.en}, ${profile.focus.en}`

    const root = document.getElementById('scroll-root')
    if (!root) return undefined

    // A section link from a project page arrives as a normal page load with a
    // hash. React renders the home page after that load, so scroll explicitly
    // once the target exists.
    const hash = window.location.hash
    const target = path === '/' && hash ? document.getElementById(hash.slice(1)) : null

    if (target) {
      if (target.classList.contains('snap-section')) target.scrollTop = 0
      const frame = window.requestAnimationFrame(() => {
        initialSectionReveal(hash)
      })
      return () => window.cancelAnimationFrame(frame)
    }

    root.scrollTop = 0
    return undefined
  }, [path, project])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.skip}
      </a>

      <div className="site-shell">
        <Navbar />

        <div
          id="scroll-root"
          className="site-scroll"
          data-snap={path === '/' ? 'true' : undefined}
        >
          <main id="main" tabIndex={-1}>
            {path === '/' ? (
              <HomePage />
            ) : project ? (
              <ProjectPage project={project} index={projectIndex} />
            ) : (
              <NotFoundPage />
            )}
          </main>

          <SiteFooter />
        </div>

        {path === '/' && <SectionProgress />}
      </div>

      <CvDocument />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
