import { useEffect, useState } from 'react'

/**
 * A deliberately small client-side router.
 *
 * The site has two route shapes — the home page and one page per curated
 * project — so a router dependency would cost more than it saves. Paths are
 * clean (/projects/<slug>); public/404.html replays deep links on GitHub Pages.
 */

export const BASE = import.meta.env.BASE_URL

export function normalizePath(pathname) {
  let path = pathname || '/'
  if (path.startsWith(BASE)) path = path.slice(BASE.length)
  return '/' + path.replace(/^\/+|\/+$/g, '')
}

export function useRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const update = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return path
}

export function navigate(to) {
  const target = BASE + String(to).replace(/^\//, '')
  window.history.pushState({}, '', target)
  window.dispatchEvent(new PopStateEvent('popstate'))

  const root = document.getElementById('scroll-root')
  if (root) root.scrollTop = 0
  else window.scrollTo({ top: 0, behavior: 'auto' })
}

export function Link({ to, onClick, children, ...rest }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to)
  }

  return (
    <a {...rest} href={BASE + String(to).replace(/^\//, '')} onClick={handleClick}>
      {children}
    </a>
  )
}
