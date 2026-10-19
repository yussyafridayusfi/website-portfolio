import { ArrowUpRight, Github, Linkedin, Mail, Printer } from 'lucide-react'
import { profile } from '../config/portfolio.js'
import SectionHeading from './SectionHeading.jsx'

const channels = [
  {
    label: 'Email',
    value: profile.links.email,
    href: `mailto:${profile.links.email}`,
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/yussyafridayusfi',
    href: profile.links.github,
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yussyafridacr',
    href: profile.links.linkedin,
    icon: Linkedin,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="shell">
        <SectionHeading index="05" id="Contact" title="Get in touch" />

        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-md text-lg text-muted">
              I am open to software development and backend engineering roles, including remote
              work with international teams, and to conversations about the projects above.
            </p>

            <a
              href={`mailto:${profile.links.email}?subject=Software%20development%20role`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
            >
              Email me
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <Printer size={15} aria-hidden="true" />
              Print / save my CV as PDF
            </button>
          </div>

          <ul className="md:col-span-7 md:border-l md:border-rule md:pl-12">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <li key={label} className="border-b border-rule last:border-0">
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span>
                    <span className="eyebrow block">{label}</span>
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
