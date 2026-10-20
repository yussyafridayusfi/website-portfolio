import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { navItems } from '../config/portfolio.js'
import { fill } from '../config/ui.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useActiveSection } from '../lib/useActiveSection.js'

const sections = [{ id: 'top' }, ...navItems]

function resetSectionScroll(hash) {
  if (!hash?.startsWith('#')) return
  const target = document.getElementById(hash.slice(1))
  if (target?.classList.contains('snap-section')) target.scrollTop = 0
}

export default function SectionProgress() {
  const { t } = useLanguage()
  const { activeId, progress } = useActiveSection()
  const [showScrollHint, setShowScrollHint] = useState(false)

  // An in-page section link should reveal the top of that section, even if its
  // internal scroll area was left near the bottom on an earlier visit.
  useEffect(() => {
    const onClick = (event) => {
      const link =
        event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (link) resetSectionScroll(link.getAttribute('href'))
    }
    const onHashChange = () => resetSectionScroll(window.location.hash)

    // Back/forward between section hashes: the browser may restore the old
    // pixel position instead of the hash target. Align the section scroller
    // after that restoration has happened.
    const onPopState = () => {
      const hash = window.location.hash
      if (!hash) return
      const target = document.getElementById(hash.slice(1))
      if (!target?.classList.contains('snap-section')) return
      window.requestAnimationFrame(() => {
        target.scrollTop = 0
        const root = document.getElementById('scroll-root')
        if (root) root.scrollTop = target.offsetTop
      })
    }

    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  // A visual cue for sections whose content is taller than the viewport. It
  // hides once the reader reaches the end of that section.
  useEffect(() => {
    const section = activeId ? document.getElementById(activeId) : null
    if (!section) {
      setShowScrollHint(false)
      return undefined
    }

    let frame = 0
    const update = () => {
      frame = 0
      const overflowing = section.scrollHeight > section.clientHeight + 1
      const atEnd =
        section.scrollTop + section.clientHeight >= section.scrollHeight - 8
      setShowScrollHint(overflowing && !atEnd)
    }
    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    section.addEventListener('scroll', schedule, { passive: true })
    const observer = new ResizeObserver(schedule)
    observer.observe(section)
    if (section.firstElementChild) observer.observe(section.firstElementChild)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      section.removeEventListener('scroll', schedule)
      observer.disconnect()
    }
  }, [activeId])

  return (
    <>
      <div className="progress-track no-print" aria-hidden="true">
        <span
          className="progress-track__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label={t.progress.label}
        className="section-rail no-print hidden xl:block"
      >
        <ol>
          {sections.map(({ id }) => {
            const current = id === activeId
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? 'location' : undefined}
                  aria-label={fill(t.progress.goTo, { section: t.nav[id] })}
                >
                  <span className="rail-label" aria-hidden="true">
                    {t.nav[id]}
                  </span>
                  <span className="rail-dot" aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      {showScrollHint && (
        <p className="section-hint no-print lg:hidden" aria-hidden="true">
          <ChevronDown size={13} />
          {t.progress.scrollForMore}
        </p>
      )}
    </>
  )
}
