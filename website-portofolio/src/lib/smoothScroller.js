/**
 * Smooth section transitions for the full-screen scroll-snap home page.
 *
 * `scroll-snap-type: y mandatory` makes each wheel notch a hard cut: the
 * browser snaps to the next section with no easing. Wheel gestures are
 * intercepted on `#scroll-root` so a tall section continues scrolling that
 * section internally, and once it reaches a seam the scroller holds and glides
 * to the neighbouring section with an eased animation instead of snapping.
 *
 * Touch and keyboard keep native Scroll Snap. `prefers-reduced-motion` gets
 * instant positioning instead of the eased glide.
 */

const EASE_OUT_CUBIC = (t) => 1 - (1 - t) ** 3
const EASE_IN_OUT_CUBIC = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const GLIDE_MS = 520

const animations = new WeakMap() // scroll root -> { frame, previousSnap }

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** scrollTo that is genuinely instant, bypassing CSS scroll-behavior: smooth. */
function instantScrollTo(root, top) {
  root.style.scrollBehavior = 'auto'
  root.scrollTo({ top, behavior: 'auto' })
  root.style.scrollBehavior = ''
}

/** Suspend CSS snap while a programmatic move runs, then put it back. */
function withSnapSuspended(root, previousSnap, action) {
  root.dataset.snap = 'false'
  try {
    action()
  } finally {
    root.dataset.snap = previousSnap
  }
}

function stopCurrent(root) {
  const state = animations.get(root)
  if (!state) return false
  window.cancelAnimationFrame(state.frame)
  animations.delete(root)
  root.dataset.snap = state.previousSnap
  return true
}

function animateScroll(root, targetTop) {
  stopCurrent(root)

  if (Math.abs(targetTop - root.scrollTop) < 1) return Promise.resolve()

  if (reducedMotion()) {
    root.scrollTo({ top: targetTop, behavior: 'auto' })
    return Promise.resolve()
  }

  const start = root.scrollTop
  const delta = targetTop - start
  const state = { frame: 0, previousSnap: root.dataset.snap || '' }
  animations.set(root, state)
  root.dataset.snap = 'false'

  return new Promise((resolve) => {
    const startedAt = performance.now()
    const step = (now) => {
      const current = animations.get(root)
      if (current !== state) return // cancelled by a newer animation
      const t = Math.min(1, (now - startedAt) / GLIDE_MS)
      const eased = delta > 0 ? EASE_IN_OUT_CUBIC(t) : EASE_OUT_CUBIC(t)
      instantScrollTo(root, start + delta * eased)
      if (t >= 1) {
        animations.delete(root)
        root.dataset.snap = state.previousSnap
        resolve()
        return
      }
      state.frame = window.requestAnimationFrame(step)
    }
    state.frame = window.requestAnimationFrame(step)
  })
}

/**
 * Ease the scroller to a `#hash` target on the current page. Snapshot-style
 * sections reset their internal scroll, exactly as anchor navigation did.
 */
export function smoothSectionScrollTo(hash) {
  const root = document.getElementById('scroll-root')
  if (!root || !hash?.startsWith('#')) return Promise.resolve()
  const target = document.getElementById(hash.slice(1))
  if (!target) return Promise.resolve()
  if (target.classList.contains('snap-section')) {
    target.scrollTop = 0
  }
  return animateScroll(root, target.offsetTop)
}

/**
 * Wheel routing for the scroll-snap home page.
 *
 * Wheel gestures decide between three moves:
 *   1. behave like native if we're inside a tall section's internal scroll
 *   2. keep scrolling into the footer when the last section is open
 *   3. otherwise glide one section up or down with an eased animation
 *
 * All wheel events within the section scroller are preventDefault-ed so the
 * browser never additionally snaps or chains. Returns a teardown function.
 */
export function installSmoothSectionScroll(root) {
  const sectionsOf = () => [...root.querySelectorAll('#main > section[id]')]

  function currentSection() {
    const list = sectionsOf()
    if (list.length === 0) return null
    const index = Math.max(
      0,
      Math.min(list.length - 1, Math.round(root.scrollTop / (root.clientHeight || 1))),
    )
    return list[index]
  }

  function onWheel(event) {
    if (event.ctrlKey) return // pinch zoom
    if (event.deltaX && Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
    if (animations.get(root)) return // an eased glide is already running
    const section = currentSection()
    if (!section) return

    const goingDown = event.deltaY > 0
    const sectionIndex = sectionsOf().indexOf(section)
    const canScrollInDirection = goingDown
      ? section.scrollTop + section.clientHeight < section.scrollHeight - 1
      : section.scrollTop > 1

    // Inside a tall section: use the section's own overflow, one wheel notch at
    // a time, without yanking the outer scroller into a glide.
    if (canScrollInDirection) {
      event.preventDefault()
      const units = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY
      section.scrollBy({ top: units, behavior: 'auto' })
      return
    }

    const atEnd = sectionIndex === sectionsOf().length - 1
    if (atEnd) {
      // Last section reached; continue into the footer (or stay if at max).
      event.preventDefault()
      const units = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY
      root.scrollBy({ top: units, behavior: 'auto' })
      return
    }

    event.preventDefault()
    const list = sectionsOf()
    const target = list[goingDown ? sectionIndex + 1 : sectionIndex - 1]
    if (!target) return
    if (target.classList.contains('snap-section')) target.scrollTop = 0
    animateScroll(root, target.offsetTop)
  }

  root.addEventListener('wheel', onWheel, { passive: false })

  return () => {
    root.removeEventListener('wheel', onWheel)
    stopCurrent(root)
  }
}

/**
 * Scroll to a hash target after a page *load* (not a nav click). Deep links
 * like /#skills land exactly there, without the browser's scroll restore
 * fighting the section layout.
 */
export function initialSectionReveal(hash) {
  const root = document.getElementById('scroll-root')
  if (!root || !hash?.startsWith('#')) return
  const target = document.getElementById(hash.slice(1))
  if (!target) return
  if (target.classList.contains('snap-section')) {
    target.scrollTop = 0
    withSnapSuspended(root, root.dataset.snap || '', () => instantScrollTo(root, target.offsetTop))
    return
  }
  target.scrollIntoView({ block: 'start' })
}
