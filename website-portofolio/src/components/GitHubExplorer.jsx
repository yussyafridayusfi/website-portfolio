import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, ChevronDown, RefreshCw, Search, Star } from 'lucide-react'
import { fetchRepositories, formatRelativeDate, GitHubError } from '../services/github.js'
import { featuredRepoSlugs, profile } from '../config/portfolio.js'
import { fill } from '../config/ui.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

const INITIAL_VISIBLE = 6

function SkeletonRow() {
  return (
    <li className="border-t border-rule py-5">
      <div className="h-4 w-48 animate-pulse rounded-sm bg-surface-2" />
      <div className="mt-3 h-3 w-full max-w-lg animate-pulse rounded-sm bg-surface-2" />
    </li>
  )
}

function RepoRow({ repo, t, lang }) {
  return (
    <li className="border-t border-rule py-3.5">
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
          <span>
            {fill(t.repositories.updated, { date: formatRelativeDate(repo.updatedAt, lang) })}
          </span>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={fill(t.repositories.openOnGitHub, { name: repo.name })}
            className="text-muted transition-colors hover:text-accent"
          >
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {repo.description ? (
        <p className="mt-1 max-w-2xl text-sm text-muted">{repo.description}</p>
      ) : (
        <p className="mt-1 text-sm text-subtle italic">{t.repositories.noDescription}</p>
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
  const { lang, t } = useLanguage()
  const [state, setState] = useState({ status: 'loading', repos: [], error: null })
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort] = useState('updated')
  const [reloadToken, setReloadToken] = useState(0)
  const [expanded, setExpanded] = useState(false)

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
          error: error instanceof GitHubError ? error : new GitHubError('Unknown error'),
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
  const trimmedQuery = query.trim()
  const shown = expanded ? visible : visible.slice(0, INITIAL_VISIBLE)

  const sortOptions = [
    { value: 'updated', label: t.repositories.sorts.updated },
    { value: 'name', label: t.repositories.sorts.name },
  ]

  const emptyMessage =
    trimmedQuery && language !== 'all'
      ? fill(t.repositories.emptyBoth, { query: trimmedQuery, language })
      : trimmedQuery
        ? fill(t.repositories.emptyQuery, { query: trimmedQuery })
        : fill(t.repositories.emptyLanguage, { language })

  const resetTime = error?.resetAt
    ? error.resetAt.toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <section
      id="repositories"
      className="snap-section border-b border-rule py-10 md:py-14"
      tabIndex={0}
      aria-label={t.nav.repositories}
    >
      <div className="shell">
        <SectionHeading
          index={t.repositories.index}
          id={t.repositories.label}
          title={t.repositories.title}
          description={t.repositories.description}
        />

        <div className="flex flex-col gap-3 border-t border-rule pt-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search
              size={15}
              aria-hidden="true"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-subtle"
            />
            <label className="sr-only" htmlFor="repo-search">
              {t.repositories.searchLabel}
            </label>
            <input
              id="repo-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.repositories.search}
              className="w-full rounded-full border border-rule bg-surface py-2 pr-4 pl-9 text-sm text-ink placeholder:text-subtle"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="sr-only" htmlFor="repo-language">
                {t.repositories.languageLabel}
              </label>
              <select
                id="repo-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="rounded-full border border-rule bg-surface py-2 pr-3 pl-4 text-sm text-ink"
              >
                <option value="all">{t.repositories.allLanguages}</option>
                {languages.map(([name, count]) => (
                  <option key={name} value={name}>
                    {name} ({count})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="sr-only" htmlFor="repo-sort">
                {t.repositories.sortLabel}
              </label>
              <select
                id="repo-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full border border-rule bg-surface py-2 pr-3 pl-4 text-sm text-ink"
              >
                {sortOptions.map((option) => (
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
            <li className="eyebrow border-t border-rule pt-4">{t.repositories.loading}</li>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </ul>
        )}

        {status === 'error' && (
          <div role="alert" className="mt-8 border border-rule bg-surface p-6">
            <p className="inline-flex items-center gap-2 text-sm text-ink">
              <AlertCircle size={16} aria-hidden="true" className="text-accent" />
              {t.repositories.errors[error?.kind] ?? t.repositories.errors.unknown}
            </p>

            {error?.kind === 'rate-limit' && (
              <p className="mt-3 max-w-2xl text-sm text-muted">
                {t.repositories.rateLimitBefore}
                {resetTime ? ` ${fill(t.repositories.rateLimitReset, { time: resetTime })}` : ''}{' '}
                {t.repositories.rateLimitAfter}{' '}
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-accent"
                >
                  {t.repositories.profileLink}
                </a>
                .
              </p>
            )}

            {error?.kind === 'timeout' && (
              <p className="mt-3 max-w-2xl text-sm text-muted">{t.repositories.timeoutBody}</p>
            )}

            <button
              type="button"
              onClick={() => setReloadToken((value) => value + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <RefreshCw size={14} aria-hidden="true" />
              {t.repositories.retry}
            </button>
          </div>
        )}

        {status === 'ready' && (
          <>
            <p className="mt-6 text-xs text-subtle" aria-live="polite">
              {fill(t.repositories.shown, { shown: shown.length, total: others.length })}
            </p>

            {visible.length === 0 ? (
              <div className="mt-4 border border-rule bg-surface p-5 text-sm text-muted">
                <p>{emptyMessage}</p>
                <p className="mt-1 text-subtle">{t.repositories.emptyHint}</p>
              </div>
            ) : (
              <>
                <ul id="repo-list" className="mt-3">
                  {shown.map((repo) => (
                    <RepoRow key={repo.id} repo={repo} t={t} lang={lang} />
                  ))}
                </ul>

                {visible.length > INITIAL_VISIBLE && (
                  <button
                    type="button"
                    onClick={() => setExpanded((value) => !value)}
                    aria-expanded={expanded}
                    aria-controls="repo-list"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {expanded
                      ? t.repositories.showFewer
                      : fill(t.repositories.showAll, { count: visible.length })}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
