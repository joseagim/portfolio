import { ArrowUpRight, Award, Info } from 'lucide-react'
import ArchitectureDiagram from './ArchitectureDiagram'

// Bloques de contenido opcionales de las páginas de proyecto.
// Cada bloque se define en src/data/projects.js con un `type` y sus campos.

export function DetailSection({ title, children, id }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="text-xl font-semibold tracking-tight text-ink sm:text-2xl dark:text-white">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function Paragraphs({ items }) {
  return (
    <div className="space-y-4 leading-relaxed text-navy-700 dark:text-navy-200">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

export function ExternalTextLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}

function FeaturesBlock({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.title}
          className={`rounded-xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900 ${
            item.wide ? 'sm:col-span-2 border-navy-200 bg-navy-50/60 dark:border-navy-700 dark:bg-navy-850' : ''
          }`}
        >
          <h3 className="text-[15px] font-semibold text-ink dark:text-white">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-navy-600 dark:text-navy-300">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

// Funcionalidades agrupadas por categoría: un elemento destacado arriba y columnas sin cajas debajo.
function FeatureGroupsBlock({ featured, groups }) {
  return (
    <div className="space-y-8">
      {featured && (
        <div className="rounded-xl border border-l-[3px] border-navy-100 border-l-accent bg-white p-5 sm:px-6 dark:border-navy-800 dark:border-l-accent dark:bg-navy-900">
          {featured.label && (
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{featured.label}</p>
          )}
          <h3 className="mt-1.5 text-lg font-semibold text-ink dark:text-white">{featured.title}</h3>
          <p className="mt-1.5 leading-relaxed text-navy-600 dark:text-navy-300">{featured.text}</p>
        </div>
      )}

      <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
        {groups.map((group) => (
          <section key={group.name} aria-label={group.name}>
            <h3 className="border-b border-navy-100 pb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent dark:border-navy-800">
              {group.name}
            </h3>
            <ul className="divide-y divide-navy-100 dark:divide-navy-800">
              {group.items.map((item) => (
                <li key={item.title} className="py-3">
                  <h4 className="text-[15px] font-semibold text-ink dark:text-white">{item.title}</h4>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-navy-600 dark:text-navy-300">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

function PhasesBlock({ items }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.title} className="relative rounded-xl border border-navy-100 bg-white p-5 dark:border-navy-800 dark:bg-navy-900">
          <div className="flex items-center gap-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-on-accent"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="font-semibold text-ink dark:text-white">{item.title}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-300">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}

function DeploymentBlock({ items }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item.layer} className="rounded-xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900">
          <p className="eyebrow">{item.layer}</p>
          <p className="mt-2 text-lg font-semibold text-ink dark:text-white">{item.host}</p>
          <p className="mt-1 font-mono text-xs text-navy-500 dark:text-navy-400">{item.tech}</p>
        </li>
      ))}
    </ol>
  )
}

function RecognitionBlock({ heading, text }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E5D3A1] bg-gradient-to-br from-[#FBF6E9] to-white p-6 sm:p-7 dark:border-[#C9A646]/25 dark:from-[#C9A646]/10 dark:to-navy-900">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5D3A1] bg-white text-[#9A7414] dark:border-[#C9A646]/30 dark:bg-navy-900 dark:text-[#EBD38F]">
          <Award className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-semibold text-ink dark:text-white">{heading}</p>
          <p className="mt-1.5 leading-relaxed text-navy-700 dark:text-navy-200">{text}</p>
        </div>
      </div>
    </div>
  )
}

function MethodologyBlock({ intro, roles, practices, sprints, sprintLabel, ceremonies, ceremoniesCaption }) {
  return (
    <div className="space-y-6">
      {intro && <p className="leading-relaxed text-navy-700 dark:text-navy-200">{intro}</p>}

      {roles && (
        <div className="space-y-4">
          <p className="leading-relaxed text-navy-700 dark:text-navy-200">{roles.text}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {roles.items.map((role) => (
              <li
                key={role.name}
                className={`rounded-xl border p-4 ${
                  role.mine
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-navy-100 bg-white dark:border-navy-800 dark:bg-navy-900'
                }`}
              >
                <p className="font-mono text-xs text-navy-500 dark:text-navy-400">{role.count}</p>
                <h3 className="mt-1 text-[15px] font-semibold text-ink dark:text-white">{role.name}</h3>
                {role.mine && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {roles.mineLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {practices.map((p) => (
          <li key={p.title} className="rounded-xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900">
            <h3 className="text-[15px] font-semibold text-ink dark:text-white">{p.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-navy-600 dark:text-navy-300">{p.text}</p>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-4 sm:p-6 dark:border-navy-800 dark:bg-navy-900/40">
        <p className="eyebrow">{ceremoniesCaption}</p>
        <div className="mt-4 space-y-3">
          {Array.from({ length: sprints }, (_, s) => (
            <div key={s} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="w-20 shrink-0 font-mono text-xs font-semibold text-accent">
                {sprintLabel} {s + 1}
              </span>
              <ol className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
                {ceremonies.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-center gap-2 rounded-lg border border-navy-100 bg-white px-3 py-2 text-xs font-medium text-navy-700 dark:border-navy-800 dark:bg-navy-900 dark:text-navy-200"
                  >
                    <span className="font-mono text-[10px] text-navy-400">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TagsBlock({ text, tags, link }) {
  return (
    <div className="space-y-4">
      {text && <p className="leading-relaxed text-navy-700 dark:text-navy-200">{text}</p>}
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-navy-200 bg-white px-3 py-1 text-sm text-navy-700 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-200"
          >
            {tag}
          </li>
        ))}
      </ul>
      {link && <ExternalTextLink href={link.url}>{link.label}</ExternalTextLink>}
    </div>
  )
}

export function NoteBlock({ text, link }) {
  return (
    <aside className="flex items-start gap-3 rounded-xl border border-navy-100 bg-navy-50/70 p-4 text-sm dark:border-navy-800 dark:bg-navy-900/60">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-500 dark:text-navy-300" aria-hidden="true" />
      <p className="text-navy-700 dark:text-navy-200">
        {text}{' '}
        {link && <ExternalTextLink href={link.url}>{link.label}</ExternalTextLink>}
      </p>
    </aside>
  )
}

export default function ProjectBlock({ block, id }) {
  switch (block.type) {
    case 'text':
      return (
        <DetailSection title={block.title} id={id}>
          <Paragraphs items={block.paragraphs} />
        </DetailSection>
      )
    case 'features':
      return (
        <DetailSection title={block.title} id={id}>
          <FeaturesBlock items={block.items} />
        </DetailSection>
      )
    case 'featureGroups':
      return (
        <DetailSection title={block.title} id={id}>
          <FeatureGroupsBlock featured={block.featured} groups={block.groups} />
        </DetailSection>
      )
    case 'phases':
      return (
        <DetailSection title={block.title} id={id}>
          <PhasesBlock items={block.items} />
        </DetailSection>
      )
    case 'architecture':
      return (
        <DetailSection title={block.title} id={id}>
          <ArchitectureDiagram variant={block.diagram} title={block.title} caption={block.caption} />
        </DetailSection>
      )
    case 'deployment':
      return (
        <DetailSection title={block.title} id={id}>
          <DeploymentBlock items={block.items} />
        </DetailSection>
      )
    case 'recognition':
      return (
        <DetailSection title={block.title} id={id}>
          <RecognitionBlock heading={block.heading} text={block.text} />
        </DetailSection>
      )
    case 'methodology':
      return (
        <DetailSection title={block.title} id={id}>
          <MethodologyBlock {...block} />
        </DetailSection>
      )
    case 'tags':
      return (
        <DetailSection title={block.title} id={id}>
          <TagsBlock text={block.text} tags={block.tags} link={block.link} />
        </DetailSection>
      )
    case 'note':
      return <NoteBlock text={block.text} link={block.link} />
    default:
      if (import.meta.env.DEV) console.warn(`[projects] Unknown block type: ${block.type}`)
      return null
  }
}
