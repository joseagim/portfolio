import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-navy-100 dark:border-navy-800">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-sm sm:flex-row">
        <p className="text-center text-navy-500 sm:text-left dark:text-navy-400">
          © {year} {profile.name}
        </p>
        <ul className="flex items-center gap-1">
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={`GitHub ${t('a11y.opensInNewTab')}`}
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={`LinkedIn ${t('a11y.opensInNewTab')}`}
            >
              <LinkedinIcon className="h-[18px] w-[18px]" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
