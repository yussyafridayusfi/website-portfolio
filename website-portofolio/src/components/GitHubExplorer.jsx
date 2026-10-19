import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, RefreshCw, Search, Star } from 'lucide-react'
import {
  fetchRepositories,
  formatRelativeDate,
  GitHubError,
} from '../services/github.js'
import { featuredRepoSlugs, profile } from '../config/portfolio.js'
import SectionHeading from './SectionHeading.jsx'

const SORTS = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'name', label: 'Name (A–Z)' },
]

function SkeletonRow() {
  return (
    <li className="border-t border-rule py-5">
      <div className="h-4 w-48 animate-pulse rounded-sm bg-surface-2" />
      <div className="mt-3 h-3 w-full max-w-lg animate-pulse rounded-sm bg-surface-2" />
    </li>
  )
}

function RepoRow({ repo }) {
  return (
    <li className="border-t border-rule py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline font-mono text-[0.95rem] text-ink"
        >
          {repo.name}
        </a>

        <div className="flex items-center gap-4 font-mono text-xs text-subtle">
          {repo.language && <span>{repo.language}</span>}
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star size={12} aria-hidden="true" />
              {repo.stars}
            </span>
          )}
          <span>updated {formatRelativeDate(repo.updatedAt)}</span>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${repo.name} on GitHub`}
            className="text-muted transition-colors hover:text-accent"
          >
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {repo.description ? (
        <p className="mt-2 max-w-2xl text-sm text-muted">{repo.description}</p>
      ) : (
        <p className="mt-2 text-sm text-subtle italic">No description in the repository.</p>
      )}

      {repo.homepage && (
        <a
          href={repo.homepage}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline mt-2 inline-block text-xs text-subtle"
        >
          {repo.homepage}
        </a>
      )}
    </li>
  )
}

export default function GitHubExplorer() {
  const [state, setState] = useState({ status: 'loading', repos: [], error: null })
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort] = useState('updated')
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    setState((previous) => ({ ...previous, status: 'loading', error: null }))

    fetchRepositories({ signal: controller.signal, force: reloadToken > 0 })
      .then(({ repos }) => {
        setState({ status: 'ready', repos, error: null })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          repos: [],
          error:
            error instanceof GitHubError
              ? error
              : new GitHubError('Something went wrong while loading repositories.'),
        })
      })

    return () => controller.abort()
  }, [reloadToken])

  const others = useMemo(
    () => state.repos.filter((repo) => !featuredRepoSlugs.includes(repo.name)),
    [state.repos],
  )

  const languages = useMemo(() => {
    const counts = new Map()
    others.forEach((repo) => {
      if (!repo.language) return
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
    })
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [others])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const activeLanguage = language && language !== 'all' ? language : null
    const filtered = others.filter((repo) => {
      if (activeLanguage && repo.language !== activeLanguage) return false
      if (!needle) return true
      return (
        repo.name.toLowerCase().includes(needle) ||
        repo.description.toLowerCase().includes(needle) ||
        repo.topics.some((topic) => topic.toLowerCase().includes(needle))
      )
    })

    return filtered.sort((a, b) =>
      sort === 'name'
        ? a.name.localeCompare(b.name)
        : new Date(b.updatedAt) - new Date(a.updatedAt),
    )
  }, [others, query, language, sort])

  const { status, error } = state

  return (
    <section id="repositories" className="border-b border-rule py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          index="04"
          id="Repositories"
          title="Other public repositories"
          description="Pulled live from the GitHub REST API — forks and archived repositories are filtered out. The five projects above are excluded here so nothing is listed twice. Repository names, languages and dates come straight from the API; nothing is ranked by star count."
        />

        <div className="flex flex-col gap-4 border-t border-rule pt-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search
              size={15}
              aria-hidden="true"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-subtle"
            />
            <label className="sr-only" htmlFor="repo-search">
              Search repositories
            </label>
            <input
              id="repo-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repositories"
              className="w-full rounded-full border border-rule bg-surface py-2 pr-4 pl-9 text-sm text-ink placeholder:text-subtle"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="sr-only" htmlFor="repo-language">
                Filter by language
              </label>
              <select
                id="repo-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="rounded-full border border-rule bg-surface py-2 pr-3 pl-4 text-sm text-ink"
              >
                <option value="all">All languages</option>
                {languages.map(([name, count]) => (
                  <option key={name} value={name}>
                    {name} ({count})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="sr-only" htmlFor="repo-sort">
                Sort repositories
              </label>
              <select
                id="repo-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full border border-rule bg-surface py-2 pr-3 pl-4 text-sm text-ink"
              >
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {status === 'loading' && (
          <ul className="mt-8" aria-busy="true" aria-live="polite">
            <li className="eyebrow border-t border-rule pt-4">Loading repositories…</li>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </ul>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="mt-8 border border-rule bg-surface p-6"
          >
            <p className="inline-flex items-center gap-2 text-sm text-ink">
              <AlertCircle size={16} aria-hidden="true" className="text-accent" />
              {error?.message}
            </p>

            {error?.kind === 'rate-limit' && (
              <p className="mt-3 max-w-2xl text-sm text-muted">
                The public GitHub API allows 60 requests per hour per network without a token.
                {error.resetAt
                  ? ` The limit resets at ${error.resetAt.toLocaleTimeString()}.`
                  : ''}{' '}
                In the meantime, the full list is on{' '}
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-accent"
                >
                  the GitHub profile
                </a>
                .
              </p>
            )}

            {error?.kind === 'timeout' && (
              <p className="mt-3 max-w-2xl text-sm text-muted">
                GitHub did not answer within 12 seconds. This is usually temporary.
              </p>
            )}

            <button
              type="button"
              onClick={() => setReloadToken((value) => value + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <RefreshCw size={14} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && (
          <>
            <p className="mt-8 text-xs text-subtle" aria-live="polite">
              {visible.length} of {others.length}{' '}
              {others.length === 1 ? 'repository' : 'repositories'} shown
            </p>

            {visible.length === 0 ? (
              <p className="mt-4 border border-rule bg-surface p-6 text-sm text-muted">
                Nothing matches “{query}”
                {language !== 'all' ? ` in ${language}` : ''}. Try clearing the search or
                choosing a different language.
              </p>
            ) : (
              <ul className="mt-4">
                {visible.map((repo) => (
                  <RepoRow key={repo.id} repo={repo} />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  )
}
