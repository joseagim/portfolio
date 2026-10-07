import { useLanguage } from '../../i18n/LanguageContext'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../projects/ProjectCard'

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-title"
      className="section border-t border-navy-100 bg-navy-50/40 focus:outline-none dark:border-navy-800 dark:bg-navy-900/30"
    >
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          id="projects-title"
        />

        <ul className="mt-12 space-y-6 sm:space-y-8">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
