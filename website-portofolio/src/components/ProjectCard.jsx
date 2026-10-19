import { ArrowUpRight, ChevronDown, ExternalLink, Github } from 'lucide-react'

const detailBlocks = [
  { key: 'how', label: 'How it works' },
  { key: 'decisions', label: 'Implementation decisions' },
  { key: 'schema', label: 'Data model' },
  { key: 'challenges', label: 'Challenges and fixes' },
]

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

export default function ProjectCard({ project, index }) {
  const { name, summary, problem, solution, tech, links, highlights, detail } = project
  const hasDetail =
    detail && Object.values(detail).some((value) => Array.isArray(value) && value.length > 0)

  return (
    <article className="border-t border-rule py-10 first:border-t-0 first:pt-0">
      <div className="grid gap-x-12 gap-y-6 md:grid-cols-12">
        <div className="md:col-span-1">
          <p className="font-mono text-[0.8125rem] text-subtle">
            {String(index + 1).padStart(2, '0')}
          </p>
        </div>

        <div className="md:col-span-11">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <h3 className="font-display text-2xl md:text-3xl">{name}</h3>

            <div className="flex items-center gap-5">
              <a
                href={links.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <Github size={15} aria-hidden="true" />
                Source
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              {links.demo && (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Live demo
                </a>
              )}
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-lg text-ink">{summary}</p>

          <div className="mt-4 max-w-3xl space-y-2 text-sm text-muted">
            {problem && (
              <p>
                <span className="font-mono text-xs tracking-wide text-subtle uppercase">
                  Problem{' '}
                </span>
                {problem}
              </p>
            )}
            {solution && (
              <p>
                <span className="font-mono text-xs tracking-wide text-subtle uppercase">
                  Approach{' '}
                </span>
                {solution}
              </p>
            )}
          </div>

          {highlights?.length > 0 && (
            <div className="mt-6 max-w-3xl">
              <Bullets items={highlights} />
            </div>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>

          {hasDetail && (
            <details className="group mt-8 border-t border-rule pt-4">
              <summary className="inline-flex items-center gap-2 text-sm text-accent">
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-180"
                />
                Technical detail
              </summary>

              <div className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
                {detailBlocks.map((block) =>
                  detail[block.key]?.length ? (
                    <div key={block.key}>
                      <p className="eyebrow mb-3">{block.label}</p>
                      <Bullets items={detail[block.key]} />
                    </div>
                  ) : null,
                )}
              </div>

              {detail.limitations?.length > 0 && (
                <div className="mt-8 border border-rule bg-accent-soft p-5">
                  <p className="eyebrow mb-3">Limitations — stated openly</p>
                  <Bullets items={detail.limitations} />
                </div>
              )}
            </details>
          )}
        </div>
      </div>
    </article>
  )
}
