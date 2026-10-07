import { Container, Cpu, Database, MonitorSmartphone, Server, Smartphone } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

// Diagramas de arquitectura hechos solo con HTML/CSS/SVG (sin imágenes externas).
// Se eligen desde src/data/projects.js con el campo `diagram` del bloque 'architecture':
//   'chess' → arquitectura prevista del TFG · 'train' → TrainTracker · 'smartcook' → SmartCook

const L = {
  client: { es: 'Cliente', en: 'Client' },
  frontend: { es: 'Frontend', en: 'Frontend' },
  backend: { es: 'Backend', en: 'Backend' },
  api: { es: 'API REST', en: 'REST API' },
  database: { es: 'Base de datos', en: 'Database' },
  engine: { es: 'Motor de ajedrez', en: 'Chess engine' },
  ownEngine: { es: 'Motor propio', en: 'Custom engine' },
  phase1: { es: 'Fase 1', en: 'Phase 1' },
  phase2: { es: 'Fase 2', en: 'Phase 2' },
  docker: { es: 'Contenedores Docker', en: 'Docker containers' },
  chessLink: { es: 'HTTP · WebSockets', en: 'HTTP · WebSockets' },
  trainLink: { es: 'HTTPS · REST + JWT', en: 'HTTPS · REST + JWT' },
  dbLink: { es: 'Spring Data JPA · Flyway', en: 'Spring Data JPA · Flyway' },
  layers: { es: 'controller → service → repository', en: 'controller → service → repository' },
  app: { es: 'App móvil', en: 'Mobile app' },
  smartApi: { es: 'API de planificación', en: 'Planning API' },
  weekly: { es: 'Planificación semanal', en: 'Weekly planning' },
  recipes: { es: 'recetas · ingredientes', en: 'recipes · ingredients' },
  fallback: { es: 'respaldo: JSON local', en: 'fallback: local JSON' },
  jsonLink: { es: 'HTTP · JSON', en: 'HTTP · JSON' },
  mongoLink: { es: 'PyMongo', en: 'PyMongo' },
}

function Node({ icon: Icon, title, badge, children, className = '' }) {
  return (
    <div
      className={`relative rounded-xl border border-navy-200 bg-white px-4 py-3 shadow-soft dark:border-navy-700 dark:bg-navy-900 dark:shadow-none ${className}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="text-sm font-semibold text-ink dark:text-white">{title}</span>
        {badge && (
          <span className="ml-auto rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-accent">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-1.5 font-mono text-[11px] leading-relaxed text-navy-500 dark:text-navy-300">{children}</div>
    </div>
  )
}

function VLine({ label }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="h-4 w-px bg-navy-300 dark:bg-navy-600" />
      {label && (
        <span className="my-1 rounded-full border border-navy-200 bg-white px-2.5 py-0.5 font-mono text-[10px] text-navy-600 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300">
          {label}
        </span>
      )}
      <span className="h-4 w-px bg-navy-300 dark:bg-navy-600" />
    </div>
  )
}

function Frame({ label, title, caption, children }) {
  return (
    <figure className="rounded-2xl border border-navy-100 bg-navy-50/60 p-4 sm:p-8 dark:border-navy-800 dark:bg-navy-900/40">
      {label && <p className="eyebrow mb-6">{label}</p>}
      <div className="mx-auto flex max-w-xl flex-col items-stretch" role="img" aria-label={`${title}: ${caption}`}>
        {children}
      </div>
      {caption && (
        <figcaption className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-navy-500 dark:text-navy-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function ClientLabel({ pick }) {
  return <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-wider text-navy-400">{pick(L.client)}</p>
}

// ── TFG: arquitectura prevista ────────────────────────────────────────────
function ChessDiagram({ title, caption }) {
  const { t, pick } = useLanguage()

  return (
    <Frame label={t('project.plannedArchitecture')} title={title} caption={caption}>
      <ClientLabel pick={pick} />
      <Node icon={MonitorSmartphone} title={pick(L.frontend)} className="mx-auto w-full max-w-xs">
        React · Vite · Tailwind
      </Node>

      <VLine label={pick(L.chessLink)} />

      {/* Servicios en Docker */}
      <div className="relative rounded-2xl border border-dashed border-navy-300 px-3 pb-4 pt-7 sm:px-5 dark:border-navy-600">
        <span className="absolute -top-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-2.5 py-0.5 font-mono text-[10px] text-navy-600 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-300">
          <Container className="h-3 w-3" aria-hidden="true" />
          {pick(L.docker)}
        </span>

        <Node icon={Server} title={pick(L.backend)} className="mx-auto w-full max-w-xs">
          Java · Spring Boot
        </Node>

        {/* Bifurcación hacia base de datos y motor (solo en pantallas anchas; en móvil se apilan) */}
        <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="hidden h-6 w-full text-navy-300 sm:block dark:text-navy-600" aria-hidden="true">
          <path
            d="M50 0 V12 M18 12 H68 M18 12 V24 M68 12 V24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="mx-auto block h-4 w-px bg-navy-300 sm:hidden dark:bg-navy-600" aria-hidden="true" />

        <div className="grid gap-3 sm:grid-cols-[1fr_1.7fr] sm:gap-5">
          <Node icon={Database} title={pick(L.database)}>
            PostgreSQL
          </Node>

          {/* Los dos motores son alternativas que conviven en la plataforma: uno junto al otro */}
          <div className="rounded-xl border border-navy-200 bg-white p-2 shadow-soft dark:border-navy-700 dark:bg-navy-900 dark:shadow-none">
            <div className="flex items-center gap-2 px-2 pt-1">
              <Cpu className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm font-semibold text-ink dark:text-white">{pick(L.engine)}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-navy-50 px-2.5 py-2 dark:bg-navy-850">
                <span className="block font-mono text-[11px] text-navy-700 dark:text-navy-200">Stockfish</span>
                <span className="mt-0.5 block font-mono text-[9px] uppercase text-navy-400">{pick(L.phase1)}</span>
              </div>
              <div className="rounded-lg border border-dashed border-navy-200 px-2.5 py-2 dark:border-navy-700">
                <span className="block font-mono text-[11px] text-navy-700 dark:text-navy-200">{pick(L.ownEngine)} · C++</span>
                <span className="mt-0.5 block font-mono text-[9px] uppercase text-navy-400">{pick(L.phase2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

// ── TrainTracker: arquitectura desplegada (Vercel → Render → Neon) ────────
function TrainDiagram({ title, caption }) {
  const { t, pick } = useLanguage()

  return (
    <Frame label={t('project.deployedArchitecture')} title={title} caption={caption}>
      <ClientLabel pick={pick} />
      <Node icon={MonitorSmartphone} title={pick(L.frontend)} badge="Vercel" className="mx-auto w-full max-w-sm">
        React · Vite · Tailwind
      </Node>

      <VLine label={pick(L.trainLink)} />

      <Node icon={Server} title={pick(L.api)} badge="Render" className="mx-auto w-full max-w-sm">
        <span className="block">Java · Spring Boot</span>
        <span className="block">Spring Security · JWT</span>
        <span className="block">{pick(L.layers)}</span>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded border border-navy-200 px-1.5 py-0.5 text-[10px] dark:border-navy-700">
          <Container className="h-3 w-3" aria-hidden="true" />
          Docker
        </span>
      </Node>

      <VLine label={pick(L.dbLink)} />

      <Node icon={Database} title={pick(L.database)} badge="Neon" className="mx-auto w-full max-w-sm">
        PostgreSQL
      </Node>
    </Frame>
  )
}

// ── SmartCook: app Android (Capacitor) → API Flask → MongoDB ──────────────
function SmartcookDiagram({ title, caption }) {
  const { pick } = useLanguage()

  return (
    <Frame title={title} caption={caption}>
      <ClientLabel pick={pick} />
      <Node icon={Smartphone} title={pick(L.app)} badge="Android" className="mx-auto w-full max-w-sm">
        <span className="block">React · Vite · Tailwind</span>
        <span className="block">Capacitor</span>
      </Node>

      <VLine label={pick(L.jsonLink)} />

      <Node icon={Server} title={pick(L.smartApi)} badge="Python" className="mx-auto w-full max-w-sm">
        <span className="block">Flask · flask-cors</span>
        <span className="block">{pick(L.weekly)}</span>
      </Node>

      <VLine label={pick(L.mongoLink)} />

      <Node icon={Database} title={pick(L.database)} badge="MongoDB" className="mx-auto w-full max-w-sm">
        <span className="block">{pick(L.recipes)}</span>
        <span className="block text-navy-400">{pick(L.fallback)}</span>
      </Node>
    </Frame>
  )
}

const DIAGRAMS = { chess: ChessDiagram, train: TrainDiagram, smartcook: SmartcookDiagram }

export default function ArchitectureDiagram({ variant = 'chess', ...props }) {
  const Diagram = DIAGRAMS[variant]
  if (!Diagram) {
    if (import.meta.env.DEV) console.warn(`[projects] Unknown architecture diagram: ${variant}`)
    return null
  }
  return <Diagram {...props} />
}
