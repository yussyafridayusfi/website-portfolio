import { ArrowLeft, Download, Printer } from 'lucide-react'
import CvDocument from './CvDocument.jsx'
import { cvFiles } from '../config/portfolio.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { BASE, navigate } from '../lib/router.jsx'

/**
 * On-screen preview of the printed CV (route `/cv`).
 *
 * The same CvDocument that print.css swaps in when the user prints is shown
 * here directly, so what you see is exactly what will print. A direct download
 * of the pre-generated A4 PDF (English or Indonesian, matching the site
 * language) sits beside the print action.
 */
export default function CvPage() {
  const { lang, t } = useLanguage()

  return (
    <section
      className="cv-page"
      tabIndex={0}
      aria-label={t.cv.showCv}
    >
      <div className="shell cv-page__actions no-print">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {t.cv.backHome}
        </button>

        <a
          href={`${BASE}${cvFiles[lang] ?? cvFiles.en}`}
          download
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
        >
          <Download size={15} aria-hidden="true" />
          {t.cv.downloadCv}
        </a>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Printer size={15} aria-hidden="true" />
          {t.cv.printHere}
        </button>
      </div>

      <div className="cv-page__sheet">
        <CvDocument screen />
      </div>
    </section>
  )
}
