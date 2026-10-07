import { Award } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const STYLES = {
  inProgress: {
    dot: 'bg-amber-500',
    box: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200',
  },
  deployed: {
    dot: 'bg-emerald-500',
    box: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  },
  completed: {
    dot: 'bg-navy-400',
    box: 'border-navy-200 bg-navy-50 text-navy-700 dark:border-navy-700 dark:bg-navy-850 dark:text-navy-200',
  },
  award: {
    icon: Award,
    box: 'border-[#E5D3A1] bg-[#FBF6E9] text-[#7A5A12] dark:border-[#C9A646]/30 dark:bg-[#C9A646]/10 dark:text-[#EBD38F]',
  },
}

export default function StatusBadge({ type }) {
  const { t } = useLanguage()
  const style = STYLES[type]
  if (!style) return null
  const Icon = style.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.box}`}>
      {Icon ? (
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      )}
      {t(`badges.${type}`)}
    </span>
  )
}
