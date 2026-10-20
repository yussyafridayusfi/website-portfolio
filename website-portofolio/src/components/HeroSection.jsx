import { ArrowDown, Download, Eye, Github, Linkedin, Mail, Printer } from 'lucide-react'
import { cvFiles, heroFacts, profile } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BASE, navigate } from '../lib/router.jsx'

export default function HeroSection() {
  const { lang, t } = useLanguage()

  return (
    <section
      id="top"
      className="snap-section border-b border-rule"
      tabIndex={0}
      aria-label={t.nav.top}
    >
      <div className="shell pt-10 pb-8 md:pt-14 md:pb-12">
        <p className="eyebrow">{t.hero.eyebrow}</p>

        <div className="mt-4 grid gap-x-10 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02]">
              {profile.name}
            </h1>

            <p className="mt-3 font-display text-base text-muted md:text-xl">
              <span>{profile.role[lang]}</span>
              <span className="hidden px-2.5 text-rule sm:inline" aria-hidden="true">
                |
              </span>
              <span className="block sm:inline">{profile.focus[lang]}</span>
            </p>

            <p className="mt-5 max-w-2xl text-[0.95rem] text-muted md:text-[1.0625rem]">
              {profile.intro[lang]}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
              >
                {t.hero.viewProjects}
                <ArrowDown size={15} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => navigate('/cv')}
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <Eye size={15} aria-hidden="true" />
                {t.hero.showCv}
              </button>

              <a
                href={`${BASE}${cvFiles[lang] ?? cvFiles.en}`}
                download
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <Download size={15} aria-hidden="true" />
                {t.hero.downloadCv}
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-rule pt-5">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Github size={15} aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Linkedin size={15} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={`mailto:${profile.links.email}`}
                  aria-label="Email"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Mail size={15} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <dl className="md:col-span-4 md:border-l md:border-rule md:pl-8">
            {heroFacts.map((fact, index) => (
              <div
                key={fact.term.en}
                className={`border-b border-rule py-3.5 first:pt-0 last:border-0 last:pb-0 ${
                  index === 0 ? 'hidden sm:block' : ''
                }`}
              >
                <dt className="eyebrow">{fact.term[lang]}</dt>
                <dd className="mt-1.5 text-sm text-muted">{fact.detail[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
