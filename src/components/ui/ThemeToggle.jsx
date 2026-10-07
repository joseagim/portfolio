import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const label = isDark ? t('a11y.switchToLight') : t('a11y.switchToDark')

  return (
    <button type="button" onClick={toggleTheme} className="icon-btn" aria-label={label} title={label}>
      {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  )
}
