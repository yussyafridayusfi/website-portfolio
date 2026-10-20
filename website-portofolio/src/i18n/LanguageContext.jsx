import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ui } from '../config/ui.js'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem('language')
    if (stored === 'en' || stored === 'id') return stored
  } catch {
    // Storage can be unavailable; fall back to the browser language.
  }

  const browser = (navigator.language || '').toLowerCase()
  return browser.startsWith('id') ? 'id' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('language', lang)
    } catch {
      // The in-memory language still applies for this visit.
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: ui[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}
