export default function TechChip({ children, size = 'md' }) {
  const sizes = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
  return (
    <span
      className={`inline-flex items-center rounded-md border border-navy-100 bg-navy-50 font-mono font-medium text-navy-700 dark:border-navy-800 dark:bg-navy-850 dark:text-navy-200 ${sizes}`}
    >
      {children}
    </span>
  )
}

export function TechList({ items, size, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <TechChip size={size}>{item}</TechChip>
        </li>
      ))}
    </ul>
  )
}
