import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Download } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/profile'

// Botón "Descargar CV" con las dos opciones siempre visibles en un menú: español e inglés.
// El idioma activo de la web aparece primero y marcado.
export default function CvDownload({ variant = 'primary', compact = false, className = '' }) {
  const { lang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = useId()

  const options = [
    { code: 'es', name: 'Español', ...profile.cv.es },
    { code: 'en', name: 'English', ...profile.cv.en },
  ].sort((a, b) => (a.code === lang ? -1 : b.code === lang ? 1 : 0))

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const look =
    variant === 'primary'
      ? 'bg-accent text-on-accent hover:bg-accent/90'
      : 'border border-navy-200 bg-white text-ink hover:bg-navy-50 dark:border-navy-700 dark:bg-navy-900 dark:text-mist dark:hover:bg-navy-850'
  const size = compact ? 'h-9 px-3 text-[13px]' : 'h-11 px-4 text-sm'

  return (
    <div ref={wrapperRef} className={`relative inline-flex ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        className={`inline-flex items-center gap-2 rounded-lg font-semibold transition-colors ${size} ${look}`}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {t('cv.download')}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={menuId}
          className="absolute left-0 top-full z-50 mt-2 min-w-[13rem] animate-fade overflow-hidden rounded-xl border border-navy-100 bg-white p-1 shadow-lift sm:left-auto sm:right-0 dark:border-navy-800 dark:bg-navy-900"
        >
          {options.map((opt) => (
            <li key={opt.code}>
              <a
                href={encodeURI(opt.href)}
                download={opt.filename}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink transition-colors hover:bg-navy-50 dark:text-mist dark:hover:bg-navy-850"
              >
                <span className="flex h-6 w-8 items-center justify-center rounded border border-navy-200 font-mono text-[10px] font-semibold uppercase text-accent dark:border-navy-700">
                  {opt.code}
                </span>
                <span className="flex-1 font-medium">{opt.name}</span>
                <span className="font-mono text-[10px] uppercase text-navy-400">PDF</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
