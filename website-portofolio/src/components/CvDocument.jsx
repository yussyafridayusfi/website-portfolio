import { projects, profile, skillGroups } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

/**
 * The printed CV.
 *
 * Rendered from the same configuration as the website, so the two can never
 * disagree, and it follows the active language. It is hidden on screen and
 * swapped in by print.css, which keeps the web layout free of print-specific
 * compromises.
 *
 * Only confirmed information appears: a summary, skills and selected projects.
 * There is deliberately no education or employment section, and no fabricated
 * dates or metrics. The full name and summary come from the owner's CV.
 *
 * The 2025 internal innovation award is included here but deliberately kept
 * out of the public About section.
 */
export default function CvDocument() {
  const { lang, t } = useLanguage()

  const cvParagraphs = [...profile.about[lang]]
  if (profile.cvAchievement?.[lang]) {
    cvParagraphs.splice(2, 0, profile.cvAchievement[lang])
  }

  const printableSkills = skillGroups.map((group) => ({
    label: group.label[lang],
    items: group.items.map((item) => item.name),
  }))

  return (
    <div className="cv-document" aria-hidden="true">
      <header className="cv-header">
        <h1 className="cv-name">{profile.fullName}</h1>
        <p className="cv-role">
          {profile.role[lang]} · {profile.focus[lang]}
        </p>
        <p className="cv-contact">
          {profile.location[lang]}
          {'  ·  '}
          {profile.links.email}
          {'  ·  '}
          github.com/yussyafridayusfi
          {'  ·  '}
          linkedin.com/in/yussyafridacr
        </p>
      </header>

      <section className="cv-section">
        <h2 className="cv-section-title">{t.cv.summary}</h2>
        {cvParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="cv-paragraph">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">{t.cv.skills}</h2>
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
        <h2 className="cv-section-title">{t.cv.projects}</h2>
        {projects.map((project) => {
          const text = project[lang]
          return (
            <article key={project.slug} className="cv-entry">
              <h3 className="cv-entry-title">
                {project.name}
                <span className="cv-entry-url">{project.links.repo}</span>
              </h3>
              <p className="cv-entry-summary">{text.summary}</p>
              {text.highlights?.slice(0, 2).map((highlight) => (
                <p key={highlight.slice(0, 40)} className="cv-entry-line">
                  — {highlight}
                </p>
              ))}
              <p className="cv-entry-tech">
                {t.cv.stack}: {project.tech.join(', ')}
              </p>
            </article>
          )
        })}
      </section>

      <section className="cv-section">
        <h2 className="cv-section-title">{t.cv.contact}</h2>
        <p className="cv-paragraph">
          {profile.links.email} · {profile.links.github} · {profile.links.linkedin}
        </p>
      </section>
    </div>
  )
}
