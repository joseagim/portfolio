import { Link } from 'react-router-dom'
import { Check, GraduationCap, Search } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { timeline } from '../../data/experience'
import { getProject } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import StatusBadge from '../ui/StatusBadge'

// Línea de tiempo: en móvil la línea va a la izquierda; en escritorio queda centrada
// y las tarjetas se reparten alternando a izquierda y derecha.

function YearMarker({ item, pick }) {
  return (
    <li className="relative pl-9 sm:pl-12 lg:flex lg:justify-center lg:pl-0">
      <span
        className="absolute -left-[6px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-white lg:hidden dark:bg-navy-950"
        aria-hidden="true"
      />
      <div className="relative lg:rounded-2xl lg:border lg:border-accent/40 lg:bg-white lg:px-7 lg:py-3 lg:text-center dark:lg:bg-navy-950">
        <p className="font-mono text-2xl font-bold tracking-tight text-ink dark:text-white">{item.year}</p>
        {item.caption && <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-400">{pick(item.caption)}</p>}
      </div>
    </li>
  )
}

function EntryCard({ item, side, pick, lang, t }) {
  const isInternship = item.type === 'internship'
  const Icon = isInternship ? Search : GraduationCap
  const learned = item.learned ? pick(item.learned) : null

  return (
    <li className="relative pl-9 sm:pl-12 lg:grid lg:grid-cols-2 lg:pl-0">
      <span
        className={`absolute -left-[4px] top-6 h-2.5 w-2.5 rounded-full lg:left-1/2 lg:-translate-x-1/2 ${
          isInternship ? 'bg-accent' : 'bg-navy-300 dark:bg-navy-600'
        }`}
        aria-hidden="true"
      />
      <article
        className={`${side === 'left' ? 'lg:col-start-1 lg:mr-10' : 'lg:col-start-2 lg:ml-10'} ${
          isInternship ? 'rounded-2xl border border-dashed border-accent/50 bg-accent/5 p-5 sm:p-6' : 'card p-5 sm:p-6'
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-accent dark:bg-navy-850"
            aria-hidden="true"
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <p className="eyebrow">{pick(item.period)}</p>
          {item.status && <StatusBadge type={item.status} />}
          {item.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {pick(item.badge)}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink dark:text-white">{pick(item.title)}</h3>
        <p className="mt-0.5 text-sm font-medium text-navy-500 dark:text-navy-400">{pick(item.org)}</p>

        {item.description && (
          <p className="mt-3 leading-relaxed text-navy-700 dark:text-navy-200">{pick(item.description)}</p>
        )}

        {learned && (
          <div className="mt-4">
            <p className="eyebrow">{t('experience.learned')}</p>
            <ul className="mt-2.5 space-y-2">
              {learned.map((point) => (
                <li key={point} className="flex gap-2.5 text-[15px] leading-relaxed text-navy-700 dark:text-navy-200">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.projects?.length > 0 && (
          <div className="mt-5">
            <p className="eyebrow">{t('experience.relatedProjects')}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {item.projects.map(({ slug, label }) => {
                const project = getProject(slug)
                if (!project) return null
                return (
                  <li key={slug}>
                    <Link
                      to={`/projects/${slug}`}
                      className="inline-flex items-center rounded-md border border-navy-100 bg-navy-50 px-2.5 py-1 font-mono text-xs font-medium text-accent-2 transition-colors hover:border-accent-2/50 dark:border-navy-800 dark:bg-navy-850"
                    >
                      {label ? pick(label) : project.content[lang].title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </article>
    </li>
  )
}

export default function Experience() {
  const { lang, t, pick } = useLanguage()
  let cardIndex = 0

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-title"
      className="section border-t border-navy-100 focus:outline-none dark:border-navy-800"
    >
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
          id="experience-title"
        />

        {/* Línea de tiempo vertical: 2023 arriba → 2027 abajo */}
        <ol className="relative mx-auto mt-14 max-w-4xl space-y-8">
          <span
            className="absolute bottom-0 left-0 top-0 w-0.5 bg-navy-100 lg:left-1/2 lg:-translate-x-1/2 dark:bg-navy-800"
            aria-hidden="true"
          />
          {timeline.map((item, i) => {
            if (item.type === 'year') return <YearMarker key={`${item.type}-${i}`} item={item} pick={pick} />
            const side = cardIndex++ % 2 === 0 ? 'left' : 'right'
            return <EntryCard key={`${item.type}-${i}`} item={item} side={side} pick={pick} lang={lang} t={t} />
          })}
        </ol>
      </div>
    </section>
  )
}
