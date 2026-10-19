import { useCallback, useEffect, useState } from 'react'
import { Menu, X, Printer, Moon, Sun } from 'lucide-react'
import { navItems, profile } from '../config/portfolio.js'

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
  const [theme, setTheme] = useTheme()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

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
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/85 backdrop-blur-sm no-print">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          onClick={close}
          className="font-display text-lg tracking-tight whitespace-nowrap"
        >
          {profile.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm text-muted transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="hidden items-center gap-2 rounded-full border border-rule px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent sm:inline-flex"
          >
            <Printer size={15} aria-hidden="true" />
            Print CV
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-muted md:hidden"
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Sections"
          className="border-t border-rule bg-surface md:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={close}
                  className="block border-b border-rule py-3 text-sm text-muted last:border-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  close()
                  window.print()
                }}
                className="flex w-full items-center gap-2 py-3 text-left text-sm text-muted"
              >
                <Printer size={15} aria-hidden="true" />
                Print CV
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
