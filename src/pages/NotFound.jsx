import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function NotFound() {
  const { t } = useLanguage()

  useDocumentMeta({
    title: t('meta.notFoundTitle'),
    description: t('notFound.text'),
    locale: t('meta.locale'),
  })

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm font-medium text-navy-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">{t('notFound.title')}</h1>
      <p className="mt-3 text-navy-600 dark:text-navy-300">{t('notFound.text')}</p>
      <Link to="/" className="btn-primary mt-8 h-11 px-5">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('notFound.cta')}
      </Link>
    </section>
  )
}
