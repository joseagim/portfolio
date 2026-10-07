import { Fragment } from 'react'
import { Check } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { quickFacts, skillGroups, softSkills } from '../../data/profile'
import SectionHeading from '../ui/SectionHeading'
import { TechList } from '../ui/TechChip'

export default function About() {
  const { t, pick } = useLanguage()

  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="section border-t border-navy-100 bg-navy-50/40 focus:outline-none dark:border-navy-800 dark:bg-navy-900/30"
    >
      <div className="container-page">
        <SectionHeading index="01" eyebrow={t('about.eyebrow')} title={t('about.title')} id="about-title" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Datos rápidos */}
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-sm lg:sticky lg:top-24 lg:mx-0">
              <dl className="card divide-y divide-navy-100 dark:divide-navy-800">
                {quickFacts.map(({ id, icon: Icon, value, detail }) => (
                  <div key={id} className="flex gap-3.5 p-4">
                    <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-wide text-navy-500 dark:text-navy-400">
                        {t(`about.facts.${id}`)}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-ink dark:text-white">{pick(value)}</dd>
                      {detail && <dd className="mt-0.5 text-xs text-navy-500 dark:text-navy-400">{pick(detail)}</dd>}
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Texto + habilidades */}
          <div className="lg:col-span-8">
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-navy-700 sm:text-[17px] dark:text-navy-200">
              {t('about.paragraphs').map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="eyebrow">{t('about.softSkillsTitle')}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {softSkills.map((skill, i) => (
                  <Fragment key={skill.es}>
                    <li className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3 py-1.5 text-sm text-navy-700 dark:border-navy-800 dark:bg-navy-900 dark:text-navy-200">
                      <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      {pick(skill)}
                    </li>
                    {/* Salto de línea tras la tercera etiqueta (pantallas anchas) para que el reparto sea igual en ES y EN */}
                    {i === 2 && <li aria-hidden="true" className="-mt-2 hidden h-0 basis-full sm:block" />}
                  </Fragment>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-semibold tracking-tight text-ink dark:text-white">{t('about.techTitle')}</h3>
              <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">{t('about.techSubtitle')}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {skillGroups.map(({ id, icon: Icon, title, items }) => (
                  <div key={id} className="card p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-accent dark:bg-navy-850">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h4 className="text-sm font-semibold text-ink dark:text-white">{pick(title)}</h4>
                    </div>
                    <TechList items={items} className="mt-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
