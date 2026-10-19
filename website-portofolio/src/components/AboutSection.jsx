import { profile } from '../config/portfolio.js'
import SectionHeading from './SectionHeading.jsx'

export default function AboutSection() {
  return (
    <section id="about" className="border-b border-rule py-16 md:py-24">
      <div className="shell">
        <SectionHeading index="01" id="About" title="What I actually do" />

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow md:sticky md:top-24">Summary</p>
          </div>
          <div className="space-y-6 md:col-span-8">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="max-w-2xl text-[1.0625rem] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
