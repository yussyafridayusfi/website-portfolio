import { profile } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-rule no-print">
      <div className="shell flex flex-col gap-2 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          {t.footer.built}{' '}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline"
          >
            {t.footer.source}
          </a>
        </p>
      </div>
    </footer>
  )
}
