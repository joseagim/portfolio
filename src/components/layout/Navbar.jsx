import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Download, Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/profile'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'
import CvDownload from '../ui/CvDownload'

const NAV_ITEMS = [
  { id: 'about', key: 'nav.about' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'contact', key: 'nav.contact' },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Cierra el menú móvil al navegar o al pulsar Escape
  useEffect(() => setOpen(false), [location.pathname, location.hash])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-white/85 backdrop-blur-md dark:border-navy-800/80 dark:bg-navy-950/85">
      <nav aria-label={t('a11y.mainNav')} className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label={t('a11y.goHome')}
          className="font-mono text-[15px] font-semibold tracking-tight text-ink dark:text-white"
        >
          <span className="text-accent">~/</span>jose
        </Link>

        {/* Escritorio */}
        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 hover:text-ink dark:text-navy-300 dark:hover:bg-navy-850 dark:hover:text-white"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <span className="mx-2 h-5 w-px bg-navy-100 dark:bg-navy-800" aria-hidden="true" />
          <CvDownload compact />
          <LanguageToggle className="ml-2" />
          <ThemeToggle />
        </div>

        {/* Móvil */}
        <div className="flex items-center gap-1 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="animate-fade border-t border-navy-100 lg:hidden dark:border-navy-800">
          <div className="container-page py-4">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-navy-50 dark:text-mist dark:hover:bg-navy-850"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-navy-100 px-3 pt-4 dark:border-navy-800">
              {Object.entries(profile.cv).map(([code, cv]) => (
                <a
                  key={code}
                  href={encodeURI(cv.href)}
                  download={cv.filename}
                  className="btn-secondary h-10 gap-2 px-3"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t('cv.download')}
                  <span className="font-mono text-[10px] uppercase text-accent">{code}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
