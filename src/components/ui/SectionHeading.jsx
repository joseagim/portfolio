export default function SectionHeading({ index, eyebrow, title, subtitle, id, className = '' }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="eyebrow">
        <span className="text-accent">//</span>
        {index && <span className="ml-2">{index}</span>}
        <span className="ml-2 text-navy-400 dark:text-navy-400">{eyebrow}</span>
      </p>
      <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-navy-600 sm:text-lg dark:text-navy-300">{subtitle}</p>}
    </div>
  )
}
