import { ChevronDown } from 'lucide-react'
import { profile } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function AboutSection() {
  const { lang, t } = useLanguage()
  const paragraphs = profile.about[lang]
  const lead = paragraphs.slice(0, 2)
  const rest = paragraphs.slice(2)

  return (
    <section
      id="about"
      className="snap-section border-b border-rule py-10 md:py-14"
      tabIndex={0}
      aria-label={t.nav.about}
    >
      <div className="shell">
        <SectionHeading index={t.about.index} id={t.about.label} title={t.about.title} />

        <div className="grid gap-x-8 gap-y-5 md:grid-cols-12">
          <div className="hidden md:col-span-3 md:block">
            <p className="eyebrow md:sticky md:top-8">{t.about.aside}</p>
          </div>

          <div className="md:col-span-8">
            <div className="max-w-3xl space-y-4">
              {lead.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-[0.975rem] leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {rest.length > 0 && (
              <details className="group mt-5 border-t border-rule pt-4">
                <summary className="inline-flex items-center gap-1.5 text-sm text-accent">
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className="transition-transform group-open:rotate-180"
                  />
                  {t.about.more}
                </summary>

                <div className="mt-4 max-w-3xl space-y-4">
                  {rest.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-[0.975rem] leading-relaxed text-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
