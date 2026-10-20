import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { fill } from '../config/ui.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { Link } from '../lib/router.jsx'

export default function ProjectCard({ project, index }) {
  const { lang, t } = useLanguage()
  const text = project[lang]
  const visibleTech = project.tech.slice(0, 3)
  const hiddenCount = project.tech.length - visibleTech.length

  return (
    <article className="flex h-full min-w-0 flex-col border border-rule bg-surface p-5 transition-colors hover:border-accent/50">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, '0')}</p>

        <div className="flex items-center gap-3">
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
          >
            <Github size={13} aria-hidden="true" />
            {t.projects.source}
          </a>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
            >
              <ExternalLink size={13} aria-hidden="true" />
              {t.projects.demo}
            </a>
          )}
        </div>
      </div>

      <h3 className="mt-3 font-display text-xl leading-snug break-words md:text-2xl">
        <Link to={`/projects/${project.slug}`} className="link-underline">
          {project.name}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 text-sm text-muted">{text.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {visibleTech.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
        {hiddenCount > 0 && (
          <li className="tag" title={project.tech.slice(3).join(', ')}>
            +{hiddenCount}
            <span className="sr-only">: {project.tech.slice(3).join(', ')}</span>
          </li>
        )}
      </ul>

      <div className="mt-auto pt-5">
        <div className="border-t border-rule pt-3.5">
          <Link
            to={`/projects/${project.slug}`}
            aria-label={fill(t.projects.openProject, { name: project.name })}
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-70"
          >
            {t.projects.read}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
