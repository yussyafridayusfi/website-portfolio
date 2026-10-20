/**
 * Public GitHub REST API access.
 *
 * Uses the unauthenticated endpoint only. No personal access token is read or
 * bundled — a token in front-end code would be public the moment it shipped.
 * Unauthenticated requests are limited to 60 per hour per IP, so results are
 * cached in sessionStorage and the repository list is fetched exactly once.
 */

import { githubApiUrl } from '../config/portfolio.js'

const CACHE_KEY = 'github-repos-cache-v2'
const CACHE_TTL_MS = 5 * 60 * 1000
const REQUEST_TIMEOUT_MS = 12 * 1000

export class GitHubError extends Error {
  constructor(message, { kind = 'unknown', resetAt = null } = {}) {
    super(message)
    this.name = 'GitHubError'
    this.kind = kind
    this.resetAt = resetAt
  }
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed.at !== 'number' || !Array.isArray(parsed.repos)) return null
    if (Date.now() - parsed.at > CACHE_TTL_MS) return null
    return parsed.repos
  } catch {
    // A defective cache entry should never break the page.
    return null
  }
}

function writeCache(repos) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }))
  } catch {
    // Private mode or a full quota: caching is an optimisation, not a requirement.
  }
}

function mapRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || '',
    url: repo.html_url,
    homepage: repo.homepage || '',
    language: repo.language || '',
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    updatedAt: repo.updated_at,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    fork: Boolean(repo.fork),
    archived: Boolean(repo.archived),
  }
}

/**
 * Returns repositories, excluding forks and archived repos by default.
 * @param {{ signal?: AbortSignal, force?: boolean }} options
 */
export async function fetchRepositories({ signal, force = false } = {}) {
  if (!force) {
    const cached = readCache()
    if (cached) return { repos: cached, fromCache: true }
  }

  const timeoutController = new AbortController()
  const timer = setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS)
  const onExternalAbort = () => timeoutController.abort()
  signal?.addEventListener('abort', onExternalAbort)

  let response
  try {
    response = await fetch(githubApiUrl, {
      signal: timeoutController.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
  } catch (error) {
    if (error?.name === 'AbortError') {
      if (signal?.aborted) throw error
      throw new GitHubError('The request to GitHub timed out.', { kind: 'timeout' })
    }
    throw new GitHubError('Could not reach GitHub. Check your network connection.', {
      kind: 'network',
    })
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', onExternalAbort)
  }

  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get('x-ratelimit-remaining')
    const resetHeader = response.headers.get('x-ratelimit-reset')
    const resetAt = resetHeader ? new Date(Number(resetHeader) * 1000) : null
    const limited = remaining === '0' || response.status === 429
    throw new GitHubError(
      limited
        ? 'GitHub’s unauthenticated rate limit has been reached.'
        : 'GitHub refused the request (403).',
      { kind: limited ? 'rate-limit' : 'forbidden', resetAt },
    )
  }

  if (response.status === 404) {
    throw new GitHubError('That GitHub user could not be found.', { kind: 'not-found' })
  }

  if (!response.ok) {
    throw new GitHubError(`GitHub returned an unexpected status (${response.status}).`, {
      kind: 'server',
    })
  }

  const payload = await response.json()
  if (!Array.isArray(payload)) {
    throw new GitHubError('GitHub returned data in an unexpected shape.', { kind: 'shape' })
  }

  const repos = payload.filter((repo) => !repo.fork && !repo.archived).map(mapRepo)
  writeCache(repos)
  return { repos, fromCache: false }
}

const RELATIVE_LABELS = {
  en: {
    today: 'today',
    yesterday: 'yesterday',
    days: (count) => `${count} days ago`,
    months: (count) => `${count} month${count === 1 ? '' : 's'} ago`,
    years: (count) => `${count} year${count === 1 ? '' : 's'} ago`,
  },
  id: {
    today: 'hari ini',
    yesterday: 'kemarin',
    days: (count) => `${count} hari lalu`,
    months: (count) => `${count} bulan lalu`,
    years: (count) => `${count} tahun lalu`,
  },
}

export function formatRelativeDate(isoString, lang = 'en') {
  if (!isoString) return ''
  const then = new Date(isoString)
  if (Number.isNaN(then.getTime())) return ''

  const labels = RELATIVE_LABELS[lang] ?? RELATIVE_LABELS.en
  const days = Math.floor((Date.now() - then.getTime()) / 86_400_000)
  if (days <= 0) return labels.today
  if (days === 1) return labels.yesterday
  if (days < 30) return labels.days(days)

  const months = Math.floor(days / 30)
  if (months < 12) return labels.months(months)

  return labels.years(Math.floor(months / 12))
}
