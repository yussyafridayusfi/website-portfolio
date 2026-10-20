import { useEffect, useState } from 'react'

/**
 * Tracks which full-screen section is active and how far the section scroller
 * has travelled. Sections are exactly one scrollport tall, so the active section
 * can be derived from scrollTop without an IntersectionObserver.
 *
 * `enabled` is false on project detail pages, where the same container scrolls
 * normally and there is no section rail.
 */
export function useActiveSection(enabled = true, trackProgress = true) {
  const [state, setState] = useState({ activeId: null, progress: 0 })

  useEffect(() => {
    if (!enabled) {
      setState({ activeId: null, progress: 0 })
      return undefined
    }

    const root = document.getElementById('scroll-root')
    if (!root) return undefined

    let frame = 0

    const update = () => {
      frame = 0
      const height = root.clientHeight || 1
      const sections = [...document.querySelectorAll('#main > section[id]')]
      if (sections.length === 0) {
        setState({ activeId: null, progress: 0 })
        return
      }

      const index = Math.max(
        0,
        Math.min(
          sections.length - 1,
          Math.floor((root.scrollTop + height / 2) / height),
        ),
      )
      const max = root.scrollHeight - root.clientHeight
      const progress =
        trackProgress && max > 0
          ? Math.min(1, Math.max(0, root.scrollTop / max))
          : 0

      setState((previous) => {
        if (
          previous.activeId === sections[index].id &&
          (!trackProgress || previous.progress === progress)
        ) {
          return previous
        }
        return { activeId: sections[index].id, progress }
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    root.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    const observer = new ResizeObserver(update)
    observer.observe(root)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [enabled, trackProgress])

  return state
}
