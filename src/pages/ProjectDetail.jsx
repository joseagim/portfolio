import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Download, ExternalLink, Gamepad2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getAdjacentProjects, getProject } from '../data/projects'
import ProjectBlock, { DetailSection, NoteBlock, Paragraphs } from '../components/projects/ProjectBlocks'
import Gallery from '../components/projects/Gallery'
import StatusBadge from '../components/ui/StatusBadge'
import { TechList } from '../components/ui/TechChip'
import { GithubIcon } from '../components/ui/BrandIcons'
import NotFound from './NotFound'

function ProjectLinks({ project }) {
  const { t } = useLanguage()
  const { repos = [], demo, apk } = project.links
  const external = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {demo?.url && (
        <a href={demo.url} {...external} className="btn-primary h-11 px-5">
          {demo.label === 'play' ? (
            <Gamepad2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          )}
          {t(`project.${demo.label}`)}
          <span className="sr-only">{t('a11y.opensInNewTab')}</span>
        </a>
      )}
      {apk && (
        <a href={apk} {...external} className="btn-primary h-11 px-5">
          <Download className="h-4 w-4" aria-hidden="true" />
          {t('project.apk')}
          <span className="sr-only">{t('a11y.opensInNewTab')}</span>
        </a>
      )}
      {repos.map((repo) => (
        <a key={repo.url} href={repo.url} {...external} className="btn-secondary h-11 px-4">
          <GithubIcon className="h-4 w-4" />
          {t(`project.${repo.label}`)}
          <span className="sr-only">{t('a11y.opensInNewTab')}</span>
        </a>
      ))}
      {project.repoComingSoon && repos.length === 0 && (
        <span className="inline-flex h-11 items-center gap-2 rounded-lg border border-dashed border-navy-200 px-4 text-sm font-medium text-navy-500 dark:border-navy-700 dark:text-navy-400">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {t('project.repoSoon')}
        </span>
      )}
    </div>
  )
}

function Fact({ label, children }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-navy-500 dark:text-navy-400">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink dark:text-white">{children}</dd>
    </div>
  )
}

function AdjacentLink({ project, direction }) {
  const { lang, t } = useLanguage()
  if (!project) return <div className="hidden sm:block" />
  const isPrev = direction === 'prev'
  const content = project.content[lang]

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`card group flex flex-col gap-1 p-5 transition-[border-color,box-shadow] duration-200 hover:border-navy-200 hover:shadow-lift dark:hover:border-navy-700 ${
        isPrev ? '' : 'sm:items-end sm:text-right'
      }`}
    >
      <span className="eyebrow inline-flex items-center gap-1.5">
        {isPrev && (
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        )}
        {isPrev ? t('project.previous') : t('project.next')}
        {!isPrev && (
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        )}
      </span>
      <span className="text-lg font-semibold tracking-tight text-ink dark:text-white">
        {content.cardTitle ?? content.title}
      </span>
    </Link>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const { lang, t, pick } = useLanguage()
  const content = project?.content[lang]

  useDocumentMeta({
    title: content ? t('meta.projectTitle', { name: content.title }) : t('meta.notFoundTitle'),
    description: content?.tagline ?? t('notFound.text'),
    locale: t('meta.locale'),
  })

  if (!project) return <NotFound />

  const { prev, next } = getAdjacentProjects(slug)
  const statusLabel = t(`badges.${project.status}`)
  const gallery = project.gallery.map((img) => ({ ...img, alt: pick(img.alt) }))

  return (
    <article className="pb-20 sm:pb-28">
      {/* Cabecera */}
      <header className="relative overflow-hidden border-b border-navy-100 dark:border-navy-800">
        <div
          className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          aria-hidden="true"
        />
        <div className="container-page relative pb-12 pt-8 sm:pb-16 sm:pt-10">
          <Link to="/#projects" className="btn-ghost -ml-3 px-3">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('project.back')}
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="eyebrow">{t(`kinds.${project.kind}`)}</span>
              {project.badges.map((b) => (
                <StatusBadge key={b} type={b} />
              ))}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl dark:text-white">
              {content.title}
            </h1>
            <p className="mt-2 text-base font-medium text-navy-500 dark:text-navy-400">{content.context}</p>
            <p className="mt-5 text-lg leading-relaxed text-navy-700 dark:text-navy-200">{content.tagline}</p>
            <TechList items={project.stack} className="mt-6" />
            <div className="mt-8">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </header>

      <div className="container-page">
        {/* Galería */}
        <section aria-labelledby="gallery-title" className="pt-12 sm:pt-16">
          <h2 id="gallery-title" className="sr-only">
            {t('project.gallery')}
          </h2>
          <Gallery images={gallery} projectTitle={content.title} variant={project.galleryVariant} />
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Contenido */}
          <div className="space-y-14 lg:col-span-8">
            <DetailSection title={t('project.summary')} id="sec-summary">
              <Paragraphs items={content.summary} />
              {content.summaryNote && (
                <div className="mt-5">
                  <NoteBlock text={content.summaryNote} />
                </div>
              )}
            </DetailSection>

            {/* Bloques marcados con beforeContribution (p. ej. la historia) van antes de "Mi aportación" */}
            {content.blocks?.map((block, i) =>
              block.beforeContribution ? (
                <ProjectBlock key={`${block.type}-${i}`} block={block} id={`block-${i}`} />
              ) : null,
            )}

            <DetailSection title={t('project.contribution')} id="sec-contribution">
              <Paragraphs items={content.contribution} />
              {content.contributionList?.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {content.contributionList.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-navy-700 dark:text-navy-200">
                      <CheckCircle2 className="mt-1 h-[18px] w-[18px] shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </DetailSection>

            {content.blocks?.map((block, i) =>
              block.beforeContribution ? null : (
                <ProjectBlock key={`${block.type}-${i}`} block={block} id={`block-${i}`} />
              ),
            )}

            {content.highlights?.length > 0 && (
              <DetailSection title={t('project.highlights')} id="sec-highlights">
                <ul className="space-y-3">
                  {content.highlights.map((h) => (
                    <li key={h} className="flex gap-3 leading-relaxed text-navy-700 dark:text-navy-200">
                      <CheckCircle2 className="mt-1 h-[18px] w-[18px] shrink-0 text-accent" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {content.learned?.length > 0 && (
              <DetailSection title={t('project.learned')} id="sec-learned">
                <ul className="list-disc space-y-2 pl-5 leading-relaxed text-navy-700 marker:text-navy-300 dark:text-navy-200">
                  {content.learned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DetailSection>
            )}
          </div>

          {/* Ficha lateral */}
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="card p-6">
                <h2 className="eyebrow">{t('project.details')}</h2>
                <dl className="mt-4 divide-y divide-navy-100 dark:divide-navy-800">
                  <Fact label={t('project.type')}>{t(`kinds.${project.kind}`)}</Fact>
                  <Fact label={t('project.context')}>{content.context}</Fact>
                  {content.team && <Fact label={t('project.team')}>{content.team}</Fact>}
                  <Fact label={t('project.status')}>{statusLabel}</Fact>
                </dl>
              </div>

              <section aria-labelledby="sec-stack" className="card p-6">
                <h2 id="sec-stack" className="eyebrow">
                  {t('project.stack')}
                </h2>
                <TechList items={project.stack} className="mt-4" />
              </section>
            </div>
          </aside>
        </div>

        {/* Navegación anterior / siguiente */}
        <nav
          aria-label={`${t('project.previous')} / ${t('project.next')}`}
          className="mt-20 grid gap-4 border-t border-navy-100 pt-10 sm:grid-cols-2 dark:border-navy-800"
        >
          <AdjacentLink project={prev} direction="prev" />
          <AdjacentLink project={next} direction="next" />
        </nav>
      </div>
    </article>
  )
}
