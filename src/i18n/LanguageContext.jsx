import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import es from './es'
import en from './en'

export const dictionaries = { es, en }
export const LANGUAGES = ['es', 'en']
const STORAGE_KEY = 'lang'

const LanguageContext = createContext(null)

// 1) Elección guardada por el usuario · 2) Idioma del navegador ("es*" → es) · 3) Inglés
function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(saved)) return saved
  } catch {
    // localStorage no disponible (modo privado, etc.)
  }
  const browser = (typeof navigator !== 'undefined' && navigator.language) || ''
  return browser.toLowerCase().startsWith('es') ? 'es' : 'en'
}

function lookup(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), dict)
}

function interpolate(str, vars) {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? vars[name] : `{${name}}`))
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignorado: la elección se mantiene durante la sesión
    }
  }, [])

  // t('nav.about') → texto; t('meta.projectTitle', { name }) → texto interpolado.
  // Si la clave apunta a un array u objeto, se devuelve tal cual.
  const t = useCallback(
    (key, vars) => {
      const value = lookup(dictionaries[lang], key) ?? lookup(dictionaries.es, key)
      if (value === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] Missing key: ${key}`)
        return key
      }
      return typeof value === 'string' ? interpolate(value, vars) : value
    },
    [lang],
  )

  // pick({ es: 'Hola', en: 'Hi' }) → valor en el idioma activo
  const pick = useCallback(
    (value) => {
      if (value && typeof value === 'object' && !Array.isArray(value) && ('es' in value || 'en' in value)) {
        return value[lang] ?? value.es
      }
      return value
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, pick }), [lang, setLang, t, pick])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
