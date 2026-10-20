import { useRef, useState } from 'react'
import { skillGroups } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function SkillsSection() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState(0)
  const tabRefs = useRef([])
  const group = skillGroups[active]

  const selectTab = (index) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event, index) => {
    const last = skillGroups.length - 1
    let next = null

    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last

    if (next === null) return
    event.preventDefault()
    selectTab(next)
  }

  return (
    <section
      id="skills"
      className="snap-section border-b border-rule py-10 md:py-14"
      tabIndex={0}
      aria-label={t.nav.skills}
    >
      <div className="shell">
        <SectionHeading
          index={t.skills.index}
          id={t.skills.label}
          title={t.skills.title}
          description={t.skills.description}
        />

        <div
          role="tablist"
          aria-label={t.skills.tabsLabel}
          className="flex flex-wrap gap-2"
        >
          {skillGroups.map((item, index) => {
            const selected = index === active
            return (
              <button
                key={item.key}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`skills-tab-${item.key}`}
                aria-selected={selected}
                aria-controls={`skills-panel-${item.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  selected
                    ? 'border-ink bg-ink text-bg'
                    : 'border-rule text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {item.label[lang]}
                <span
                  className={`font-mono text-[0.65rem] ${selected ? 'text-bg/75' : 'text-subtle'}`}
                  aria-hidden="true"
                >
                  {item.items.length}
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`skills-panel-${group.key}`}
          aria-labelledby={`skills-tab-${group.key}`}
          tabIndex={0}
          className="mt-6"
        >
          <p className="max-w-2xl text-sm text-subtle">{group.description[lang]}</p>

          <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <div key={item.name} className="border-t border-rule pt-3">
                <dt className="text-[0.95rem] text-ink">{item.name}</dt>
                <dd className="mt-0.5 text-sm text-subtle">{item.note[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
