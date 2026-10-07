import { Link } from 'react-router-dom'
import { ArrowDown, Mail } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/profile'
import CvDownload from '../ui/CvDownload'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

// Nombre y apellidos en dos líneas para distinguirlos con claridad
const FIRST_NAME = 'José Antonio'
const LAST_NAME = 'Gimeno San Martín'

export default function Hero() {
  const { t } = useLanguage()

  const socials = [
    { label: 'GitHub', href: profile.links.github, icon: GithubIcon, external: true },
    { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedinIcon, external: true },
    { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  ]

  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* Fondo decorativo estático */}
      <div
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-10 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 lg:pt-20 xl:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Ventana de terminal */}
        <div className="order-2 rounded-2xl border border-navy-100 bg-white shadow-lift lg:order-1 dark:border-navy-800 dark:bg-navy-900 dark:shadow-none">
          <div
            className="flex items-center gap-2 rounded-t-2xl border-b border-navy-100 bg-navy-50 px-4 py-3 dark:border-navy-800 dark:bg-navy-850"
            aria-hidden="true"
          >
            {/* Cada círculo se ilumina por separado (rojo, amarillo, verde) al pasar el ratón */}
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-navy-200 transition-colors duration-200 hover:!bg-[#FF5F57] dark:bg-navy-700" />
              <span className="h-3 w-3 rounded-full bg-navy-200 transition-colors duration-200 hover:!bg-[#FEBC2E] dark:bg-navy-700" />
              <span className="h-3 w-3 rounded-full bg-navy-200 transition-colors duration-200 hover:!bg-[#28C840] dark:bg-navy-700" />
            </span>
            <span className="ml-3 font-mono text-xs text-navy-400">jose@portfolio: ~</span>
          </div>

          <div className="p-6 sm:p-9">
            <p className="font-mono text-[13px] text-navy-400" aria-hidden="true">
              <span className="text-accent">$</span> whoami
            </p>

            <h1
              id="hero-title"
              className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl dark:text-white"
            >
              <span className="block">{FIRST_NAME}</span>
              <span className="block text-navy-500 dark:text-navy-300">{LAST_NAME}</span>
            </h1>

            <p className="mt-5 font-mono text-lg font-medium text-accent-2 sm:text-xl">
              <span className="text-accent" aria-hidden="true">
                &gt;{' '}
              </span>
              {t('hero.role')}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-600 dark:text-navy-200">{t('hero.intro')}</p>

            <p className="mt-6 inline-flex items-center gap-2.5 rounded-lg border border-dashed border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {t('hero.availability')}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/#projects" className="btn-secondary h-11 px-5 font-semibold">
                {t('hero.viewProjects')}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
              <CvDownload />
              <ul className="flex items-center gap-2">
                {socials.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                      aria-label={external ? `${label} ${t('a11y.opensInNewTab')}` : `${label}: ${profile.email}`}
                      title={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-200 bg-white text-navy-600 transition-colors hover:border-navy-300 hover:text-ink dark:border-navy-800 dark:bg-navy-900 dark:text-navy-300 dark:hover:border-navy-600 dark:hover:text-white"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-full border border-navy-100 dark:border-navy-800"
              aria-hidden="true"
            />
            <div
              className="absolute -inset-6 hidden rounded-full border border-dashed border-navy-100 sm:block dark:border-navy-800/70"
              aria-hidden="true"
            />
            <img
              src={profile.photo}
              alt={t('hero.photoAlt')}
              width="352"
              height="352"
              fetchPriority="high"
              className="relative h-44 w-44 rounded-full object-cover object-[50%_18%] shadow-lift ring-4 ring-white sm:h-60 sm:w-60 lg:h-72 lg:w-72 xl:h-80 xl:w-80 dark:ring-navy-850"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
