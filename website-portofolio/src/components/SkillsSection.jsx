import { skillGroups } from '../config/portfolio.js'
import SectionHeading from './SectionHeading.jsx'

export default function SkillsSection() {
  return (
    <section id="skills" className="border-b border-rule py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          index="03"
          id="Skills"
          title="Technical skills"
          description="Grouped by where the experience comes from. There are no proficiency percentages here, because a number out of ten would say more about confidence than about ability."
        />

        <div>
          {skillGroups.map((group) => (
            <div key={group.id} className="grid gap-x-12 gap-y-5 border-t border-rule py-8 md:grid-cols-12">
              <div className="md:col-span-3">
                <h3 className="font-display text-xl">{group.label}</h3>
                <p className="mt-2 max-w-xs text-sm text-subtle">{group.description}</p>
              </div>

              <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2 md:col-span-9">
                {group.items.map((item) => (
                  <div key={item.name} className="border-b border-rule pb-4 last:border-0 sm:border-0 sm:pb-0">
                    <dt className="text-[0.95rem] text-ink">{item.name}</dt>
                    <dd className="mt-0.5 text-sm text-subtle">{item.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
