import { ArrowUpRight, Github, Linkedin, Mail, Printer } from 'lucide-react'
import { profile } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

const channels = [
  {
    key: 'email',
    value: profile.links.email,
    href: `mailto:${profile.links.email}`,
    icon: Mail,
  },
  {
    key: 'github',
    value: 'github.com/yussyafridayusfi',
    href: profile.links.github,
    icon: Github,
  },
  {
    key: 'linkedin',
    value: 'linkedin.com/in/yussyafridacr',
    href: profile.links.linkedin,
    icon: Linkedin,
  },
]

export default function ContactSection() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="snap-section py-10 md:py-14"
      tabIndex={0}
      aria-label={t.nav.contact}
    >
      <div className="shell">
        <SectionHeading index={t.contact.index} id={t.contact.label} title={t.contact.title} />

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-md text-[0.975rem] text-muted">{t.contact.body}</p>

            <a
              href={`mailto:${profile.links.email}?subject=${encodeURIComponent(t.contact.subject)}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
            >
              {t.contact.emailCta}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <Printer size={15} aria-hidden="true" />
              {t.contact.print}
            </button>
          </div>

          <ul className="md:col-span-7 md:border-l md:border-rule md:pl-12">
            {channels.map(({ key, value, href, icon: Icon }) => (
              <li key={key} className="border-b border-rule last:border-0">
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
                  className="group flex items-center justify-between gap-6 py-4"
                >
                  <span>
                    <span className="eyebrow block">{t.contact.labels[key]}</span>
                    <span className="mt-1 block font-mono text-sm text-ink group-hover:text-accent">
                      {value}
                    </span>
                  </span>
                  <Icon size={16} aria-hidden="true" className="text-subtle group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
