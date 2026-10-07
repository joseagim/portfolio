import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { profile } from '../../data/profile'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import SectionHeading from '../ui/SectionHeading'
import ContactForm from '../ui/ContactForm'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const iconBox =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-accent dark:bg-navy-850'

function ContactLink({ href, icon: Icon, label, value }) {
  const { t } = useLanguage()
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex items-center gap-4 p-4 transition-[border-color,box-shadow] duration-200 hover:border-navy-300 dark:hover:border-navy-600"
    >
      <span className={iconBox}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-wide text-navy-500 dark:text-navy-400">{label}</span>
        <span className="block truncate font-medium text-ink dark:text-white">{value}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-navy-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
      <span className="sr-only">{t('a11y.opensInNewTab')}</span>
    </a>
  )
}

export default function Contact() {
  const { t, pick } = useLanguage()
  const { copied, copy } = useCopyToClipboard()

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="section border-t border-navy-100 pb-14 focus:outline-none sm:pb-16 dark:border-navy-800"
    >
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          id="contact-title"
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {/* Datos de contacto */}
          <div className="space-y-3">
            <div className="card flex items-center gap-4 p-4">
              <span className={iconBox}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 rounded-md">
                <span className="block text-xs font-medium uppercase tracking-wide text-navy-500 dark:text-navy-400">
                  {t('contact.email')}
                </span>
                <span className="block truncate font-medium text-ink dark:text-white">{profile.email}</span>
              </a>
              <button
                type="button"
                onClick={() => copy(profile.email)}
                className="btn-secondary h-9 shrink-0 px-3 text-[13px]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">{copied ? t('contact.copied') : t('contact.copy')}</span>
                <span className="sr-only sm:hidden">{t('contact.copy')}</span>
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? t('contact.copiedAnnouncement') : ''}
              </span>
            </div>

            <ContactLink href={profile.links.linkedin} icon={LinkedinIcon} label={t('contact.linkedin')} value="linkedin.com/in/joseagim" />
            <ContactLink href={profile.links.github} icon={GithubIcon} label={t('contact.github')} value="github.com/joseagim" />

            <div className="card flex items-center gap-4 p-4">
              <span className={iconBox}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-navy-500 dark:text-navy-400">
                  {t('contact.location')}
                </span>
                <span className="block font-medium text-ink dark:text-white">{pick(profile.location)}</span>
              </span>
            </div>
          </div>

          {/* Formulario */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
