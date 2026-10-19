import { projects, profile, skillGroups } from '../config/portfolio.js'

/**
 * The printed CV.
 *
 * Rendered from the same configuration as the website, so the two can never
 * disagree. It is hidden on screen and swapped in by print.css, which keeps the
 * web layout free of print-specific compromises.
 *
 * Only confirmed information appears: a summary, skills and selected projects.
 * There is deliberately no education or employment section, and no fabricated
 * dates or metrics.
 */
export default function CvDocument() {
  const printableSkills = skillGroups.map((group) => ({
    label: group.label,
    items: group.items.map((item) => item.name),
  }))

  return (
    <div className="cv-document" aria-hidden="true">
      <header className="cv-header">
        <h1 className="cv-name">{profile.name}</h1>
        <p className="cv-role">
          {profile.role} · {profile.focus}
        </p>
        <p className="cv-contact">
          {profile.links.email}
          {'  ·  '}
          github.com/yussyafridayusfi
          {'  ·  '}
          linkedin.com/in/yussyafridacr
        </p>
      </header>

      <section className="cv-section">
        <h2 className="cv-section-title">Summary</h2>
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="cv-paragraph">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Technical skills</h2>
        <dl className="cv-skills">
          {printableSkills.map((group) => (
            <div key={group.label} className="cv-skill-row">
              <dt>{group.label}</dt>
              <dd>{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Selected projects</h2>
        {projects.map((project) => (
          <article key={project.slug} className="cv-entry">
            <h3 className="cv-entry-title">
              {project.name}
              <span className="cv-entry-url">{project.links.repo}</span>
            </h3>
            <p className="cv-entry-summary">{project.summary}</p>
            {project.highlights?.slice(0, 2).map((highlight) => (
              <p key={highlight.slice(0, 40)} className="cv-entry-line">
                — {highlight}
              </p>
            ))}
            <p className="cv-entry-tech">Stack: {project.tech.join(', ')}</p>
          </article>
        ))}
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">Contact</h2>
        <p className="cv-paragraph">
          Email: {profile.links.email} · GitHub: {profile.links.github} · LinkedIn:{' '}
          {profile.links.linkedin}
        </p>
      </section>
    </div>
  )
}
