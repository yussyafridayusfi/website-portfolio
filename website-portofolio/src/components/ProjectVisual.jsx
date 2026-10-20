import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BASE } from '../lib/router.jsx'

/**
 * A real screenshot when the project has a hosted demo, otherwise an honest
 * typographic cover. Nothing is presented as a screenshot when it is not one.
 */
export default function ProjectVisual({ project, text }) {
  const { t } = useLanguage()

  if (project.image) {
    return (
      <figure className="mt-8 md:mt-10">
        <div className="overflow-hidden border border-rule bg-surface">
          <img
            src={`${BASE}${project.image}`}
            alt={text.imageAlt ?? project.name}
            width="1600"
            height="1000"
            className="block h-auto w-full"
            decoding="async"
          />
        </div>
        <figcaption className="mt-2 font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">
          {t.detail.screenshot}
        </figcaption>
      </figure>
    )
  }

  return (
    <div className="project-cover mt-8 border border-rule md:mt-10">
      <div className="flex min-h-[13rem] flex-col justify-between gap-7 p-6 md:min-h-[16rem] md:p-8">
        <p className="eyebrow">{t.detail.noVisualLabel}</p>

        <p className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
          {project.name}
        </p>

        <div className="grid gap-x-8 gap-y-4 border-t border-rule pt-5 md:grid-cols-12">
          <p className="font-mono text-xs text-subtle md:col-span-5">
            {project.tech.join(' · ')}
          </p>
          <p className="max-w-xl text-sm text-muted md:col-span-7">{t.detail.noVisualBody}</p>
        </div>
      </div>
    </div>
  )
}
