import { useState } from 'react'

// Portada del proyecto. Si no hay imagen (o el archivo aún no existe) muestra un
// placeholder sobrio con el icono del proyecto. Basta con añadir el archivo a
// /public/projects/<slug>/cover.png para que aparezca la imagen real.
export default function ProjectCover({ project, title, className = '', priority = false, children }) {
  const [failed, setFailed] = useState(false)
  const showImage = project.cover && !failed

  return (
    <div className={`relative overflow-hidden bg-navy-50 dark:bg-navy-850 ${className}`}>
      {showImage ? (
        <img
          src={project.cover}
          alt={title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <CoverPlaceholder icon={project.icon} label={title} />
      )}
      {children}
    </div>
  )
}

export function CoverPlaceholder({ icon: Icon, label, small = false }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-50 via-white to-mist/70 dark:from-navy-850 dark:via-navy-900 dark:to-navy-950"
    >
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />
      {Icon && (
        <div
          className={`relative flex items-center justify-center rounded-2xl border border-navy-100 bg-white/80 text-accent shadow-soft backdrop-blur-sm dark:border-navy-700 dark:bg-navy-900/80 dark:text-navy-200 ${
            small ? 'h-12 w-12' : 'h-16 w-16 sm:h-20 sm:w-20'
          }`}
          aria-hidden="true"
        >
          <Icon className={small ? 'h-6 w-6' : 'h-8 w-8 sm:h-9 sm:w-9'} strokeWidth={1.5} />
        </div>
      )}
    </div>
  )
}
