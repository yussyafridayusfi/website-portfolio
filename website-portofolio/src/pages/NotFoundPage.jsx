import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { Link } from '../lib/router.jsx'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="shell flex min-h-[60vh] max-w-2xl flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">{t.detail.notFoundTitle}</h1>
      <p className="mt-4 text-muted">{t.detail.notFoundBody}</p>

      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        {t.detail.backHome}
      </Link>
    </div>
  )
}
