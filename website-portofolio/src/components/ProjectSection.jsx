import { projects } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import ProjectCard from './ProjectCard.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ProjectSection() {
  const { t } = useLanguage()

  return (
    <section
      id="projects"
      className="snap-section border-b border-rule py-10 md:py-14"
      tabIndex={0}
      aria-label={t.nav.projects}
    >
      <div className="shell">
        <SectionHeading
          index={t.projects.index}
          id={t.projects.label}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <p className="mt-6 text-xs text-subtle">{t.projects.more}</p>
      </div>
    </section>
  )
}
