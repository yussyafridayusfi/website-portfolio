import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { projects } from '../config/portfolio.js'
import { fill } from '../config/ui.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { Link } from '../lib/router.jsx'
import ProjectVisual from './ProjectVisual.jsx'

function Bullets({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.slice(0, 48)} className="relative pl-4 text-sm text-muted">
          <span
            className="absolute top-[0.7em] left-0 h-px w-2 bg-subtle"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectPage({ project, index }) {
  const { lang, t } = useLanguage()
  const text = project[lang]
  const total = projects.length
  const previous = projects[(index - 1 + total) % total]
  const next = projects[(index + 1) % total]

  const blocks = [
    { key: 'how', label: t.detail.how },
    { key: 'decisions', label: t.detail.decisions },
    { key: 'schema', label: t.detail.schema },
    { key: 'challenges', label: t.detail.challenges },
  ].filter((block) => text.detail[block.key]?.length)

  const buttonPrimary =
    'inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85'
  const buttonSecondary =
    'inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent'

  return (
    <div className="pb-16 md:pb-24">
      <div className="shell pt-6 md:pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {t.detail.back}
        </Link>
      </div>

      <header className="shell pt-8 pb-2 md:pt-10">
        <p className="eyebrow">
          {fill(t.detail.indexLabel, {
            index: String(index + 1).padStart(2, '0'),
            total: String(total).padStart(2, '0'),
          })}
        </p>

        <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] break-words">
          {project.name}
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">{text.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonPrimary}
          >
            <Github size={15} aria-hidden="true" />
            {t.detail.repo}
          </a>

          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonSecondary}
            >
              <ExternalLink size={15} aria-hidden="true" />
              {t.detail.demo}
            </a>
          )}
        </div>
      </header>

      <div className="shell">
        <ProjectVisual project={project} text={text} />
      </div>

      <div className="shell mt-10 grid gap-x-12 gap-y-10 md:mt-12 md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="space-y-8 md:sticky md:top-8">
            <div>
              <p className="eyebrow">{t.detail.stack}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-rule pt-6">
              <p className="eyebrow">{t.detail.links}</p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                  >
                    <Github size={15} aria-hidden="true" />
                    {t.detail.repo}
                  </a>
                </li>
                {project.links.demo && (
                  <li>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      {t.detail.demo}
                    </a>
                  </li>
                )}
                <li>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
                  >
                    <ArrowLeft size={15} aria-hidden="true" />
                    {t.detail.back}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <div className="space-y-8 md:col-span-8 md:col-start-5">
          <section>
            <h2 className="eyebrow">{t.detail.problem}</h2>
            <p className="mt-3 text-[1.0625rem] text-muted">{text.problem}</p>
          </section>

          <section>
            <h2 className="eyebrow">{t.detail.approach}</h2>
            <p className="mt-3 text-[1.0625rem] text-muted">{text.solution}</p>
          </section>

          {text.highlights?.length > 0 && (
            <section className="border-t border-rule pt-6">
              <h2 className="eyebrow">{t.detail.highlights}</h2>
              <div className="mt-4">
                <Bullets items={text.highlights} />
              </div>
            </section>
          )}

          {blocks.map((block) => (
            <section key={block.key} className="border-t border-rule pt-6">
              <h2 className="eyebrow">{block.label}</h2>
              <div className="mt-4">
                <Bullets items={text.detail[block.key]} />
              </div>
            </section>
          ))}

          {text.detail.limitations?.length > 0 && (
            <section className="border border-rule bg-accent-soft p-5">
              <h2 className="eyebrow">{t.detail.limitations}</h2>
              <div className="mt-4">
                <Bullets items={text.detail.limitations} />
              </div>
            </section>
          )}
        </div>
      </div>

      <nav
        aria-label={t.detail.navigation}
        className="shell mt-12 grid gap-6 border-t border-rule pt-6 sm:grid-cols-2"
      >
        <Link to={`/projects/${previous.slug}`} className="group">
          <span className="eyebrow inline-flex items-center gap-2">
            <ArrowLeft size={13} aria-hidden="true" />
            {t.detail.previous}
          </span>
          <span className="mt-2 block font-display text-xl transition-colors group-hover:text-accent">
            {previous.name}
          </span>
        </Link>

        <Link to={`/projects/${next.slug}`} className="group sm:text-right">
          <span className="eyebrow inline-flex items-center gap-2 sm:justify-end">
            {t.detail.next}
            <ArrowRight size={13} aria-hidden="true" />
          </span>
          <span className="mt-2 block font-display text-xl transition-colors group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      </nav>
    </div>
  )
}
