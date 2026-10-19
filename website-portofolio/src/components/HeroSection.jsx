import { ArrowDown, Github, Linkedin, Mail, Printer } from 'lucide-react'
import { profile } from '../config/portfolio.js'

const facts = [
  {
    term: 'Focus',
    detail: 'Backend engineering in Node.js — API design, data modelling, error handling.',
  },
  {
    term: 'Background',
    detail: 'Laravel, C# / ASP.NET Core, Vue.js, SQL databases, REST API integration.',
  },
  {
    term: 'Looking for',
    detail: 'Software development and backend roles, including remote positions.',
  },
]

export default function HeroSection() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="shell pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="eyebrow">Portfolio — selected work</p>

        <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.98]">
          {profile.name}
        </h1>

        <p className="mt-5 font-display text-[clamp(1.1rem,2.6vw,1.6rem)] text-muted">
          {profile.role}
          <span className="px-3 text-rule" aria-hidden="true">
            |
          </span>
          {profile.focus}
        </p>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-2xl text-lg text-muted">{profile.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
              >
                View projects
                <ArrowDown size={15} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <Printer size={15} aria-hidden="true" />
                Print / save CV
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-6">
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
              <li>
                <a
                  href={`mailto:${profile.links.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Mail size={15} aria-hidden="true" />
                  {profile.links.email}
                </a>
              </li>
            </ul>
          </div>

          <dl className="md:col-span-5 md:border-l md:border-rule md:pl-12">
            {facts.map((fact) => (
              <div key={fact.term} className="border-b border-rule py-5 first:pt-0 last:border-0">
                <dt className="eyebrow">{fact.term}</dt>
                <dd className="mt-2 text-sm text-muted">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
