import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext'

const NAMES = { es: 'Español', en: 'English' }

// Selector segmentado ES | EN
export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('a11y.language')}
      className={`inline-flex items-center rounded-lg border border-navy-100 p-0.5 dark:border-navy-800 ${className}`}
    >
      {LANGUAGES.map((code) => {
        const active = code === lang
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={t('a11y.switchLanguage', { lang: NAMES[code] })}
            className={`rounded-md px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              active
                ? 'bg-accent text-on-accent'
                : 'text-navy-500 hover:text-ink dark:text-navy-300 dark:hover:text-white'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
