import { Link } from 'react-router-dom'
import { ArrowRight, Medal } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import ProjectCover from './ProjectCover'
import StatusBadge from '../ui/StatusBadge'
import { TechList } from '../ui/TechChip'

export default function ProjectCard({ project, index }) {
  const { lang, t } = useLanguage()
  const content = project.content[lang]
  const name = content.cardTitle ?? content.title
  const titleId = `project-${project.slug}-title`

  return (
    <article
      aria-labelledby={titleId}
      className="card group relative grid overflow-hidden transition-[box-shadow,border-color] duration-200 hover:border-navy-300 hover:shadow-lift md:grid-cols-12 dark:hover:border-navy-600"
    >
      <ProjectCover
        project={project}
        title={name}
        className="aspect-[16/10] border-b border-navy-100 md:col-span-5 md:aspect-auto md:min-h-[300px] md:border-b-0 md:border-r dark:border-navy-800"
      >
        {project.badges.includes('award') && (
          <span
            title={t('badges.award')}
            className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F6E3A1] via-[#E2B93B] to-[#B8860B] text-[#4A3500] shadow-lift ring-2 ring-white/90 sm:left-4 sm:top-4 sm:h-12 sm:w-12"
          >
            <Medal className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
        )}
      </ProjectCover>

      <div className="flex flex-col p-6 sm:p-8 md:col-span-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="eyebrow">
            {String(index + 1).padStart(2, '0')} · {t(`kinds.${project.kind}`)}
          </span>
          {project.badges.map((b) => (
            <StatusBadge key={b} type={b} />
          ))}
        </div>

        <h3 id={titleId} className="mt-4 text-2xl font-semibold tracking-tight text-ink dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">{content.context}</p>

        <p className="mt-4 leading-relaxed text-navy-700 dark:text-navy-200">{content.tagline}</p>

        <TechList items={project.stack} size="sm" className="mt-5" />

        <div className="mt-auto pt-7">
          <Link
            to={`/projects/${project.slug}`}
            aria-label={t('projects.viewDetailsOf', { name })}
            className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-accent-2"
          >
            {t('projects.viewDetails')}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
