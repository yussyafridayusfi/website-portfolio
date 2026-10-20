import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex items-center rounded-full border border-rule p-0.5"
    >
      {[
        { code: 'en', label: t.language.english },
        { code: 'id', label: t.language.indonesian },
      ].map((option) => {
        const active = lang === option.code
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            className={`rounded-full px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-wide transition-colors ${
              active ? 'bg-ink text-bg' : 'text-muted hover:text-accent'
            }`}
          >
            {option.code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
