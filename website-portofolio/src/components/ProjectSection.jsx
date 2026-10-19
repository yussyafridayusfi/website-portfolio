import { projects } from '../config/portfolio.js'
import ProjectCard from './ProjectCard.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ProjectSection() {
  return (
    <section id="projects" className="border-b border-rule py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          index="02"
          id="Projects"
          title="Selected work"
          description="Five repositories chosen from twenty-eight public ones because they show working code rather than finished tutorials. Projects that were lessons, forks, or unfinished experiments were left out. Each description is drawn from the source in the repository."
        />

        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <p className="mt-12 border-t border-rule pt-6 text-sm text-subtle">
          Everything else is listed in the repository explorer below, pulled live from the GitHub
          API.
        </p>
      </div>
    </section>
  )
}
