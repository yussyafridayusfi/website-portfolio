import { useCallback, useEffect, useState } from 'react'
import { Menu, X, Eye, Moon, Sun } from 'lucide-react'
import { navItems, profile } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BASE, navigate, useRoute } from '../lib/router.jsx'
import { useActiveSection } from '../lib/useActiveSection.js'
import LanguageToggle from './LanguageToggle.jsx'

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage can be unavailable; the in-memory theme still applies.
    }
  }, [theme])

  return [theme, setTheme]
}

export default function Navbar() {
  const { t } = useLanguage()
  const themeState = useTheme()
  const [theme, setTheme] = themeState
  const [open, setOpen] = useState(false)
  const path = useRoute()

  const close = useCallback(() => setOpen(false), [])
  const onHome = path === '/'
  const { activeId } = useActiveSection(onHome, false)
  const sectionHref = (id) => (onHome ? `#${id}` : `${BASE}#${id}`)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const isDark = theme === 'dark'

  return (
    <header className="relative z-50 h-16 shrink-0 border-b border-rule bg-bg/95 no-print">
      <div className="shell flex h-full items-center justify-between gap-4">
        <a
          href={onHome ? '#top' : BASE}
          onClick={close}
          className="font-display text-lg tracking-tight whitespace-nowrap"
        >
          {profile.name}
        </a>

        <nav aria-label={t.nav.sections} className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navItems.map((item) => {
            const current = item.id === activeId
            return (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                aria-current={current ? 'location' : undefined}
                className={`text-sm transition-colors hover:text-accent ${
                  current ? 'text-ink' : 'text-muted'
                }`}
              >
                {t.nav[item.id]}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? t.theme.toLight : t.theme.toDark}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => navigate('/cv')}
            className="hidden items-center gap-2 rounded-full border border-rule px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <Eye size={15} aria-hidden="true" />
            {t.cv.showCv}
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.theme.closeMenu : t.theme.openMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-muted lg:hidden"
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={t.nav.sections}
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100svh-4rem)] overflow-y-auto border-y border-rule bg-surface shadow-sm lg:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={sectionHref(item.id)}
                  onClick={close}
                  aria-current={item.id === activeId ? 'location' : undefined}
                  className={`block border-b border-rule py-3 text-sm last:border-0 ${
                    item.id === activeId ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  close()
                  navigate('/cv')
                }}
                className="flex w-full items-center gap-2 py-3 text-left text-sm text-muted"
              >
                <Eye size={15} aria-hidden="true" />
                {t.cv.showCv}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
