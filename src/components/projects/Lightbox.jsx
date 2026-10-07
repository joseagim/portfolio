import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

// Visor de imágenes a pantalla completa: Esc cierra, ← → navegan, click fuera cierra.
export default function Lightbox({ images, index, onClose, onChange }) {
  const { t, pick } = useLanguage()
  const closeRef = useRef(null)
  const total = images.length
  const image = images[index]

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange])
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange])

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && total > 1) prev()
      else if (e.key === 'ArrowRight' && total > 1) next()
      else if (e.key === 'Tab') {
        // Mantiene el foco dentro del diálogo
        const focusables = document.querySelectorAll('[data-lightbox] button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next, total])

  if (!image) return null
  const alt = pick(image.alt) ?? ''

  return createPortal(
    <div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={alt || t('project.gallery')}
      className="fixed inset-0 z-[100] flex animate-fade items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t('lightbox.close')}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {total > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label={t('lightbox.previous')}
          className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      <figure className="flex max-h-full max-w-5xl flex-col items-center">
        <img
          key={image.src}
          src={image.src}
          alt={alt}
          className="max-h-[80vh] w-auto animate-fade rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-sm text-navy-200">
          {alt && <span>{alt} · </span>}
          <span className="font-mono text-xs" aria-live="polite">
            {t('lightbox.counter', { current: index + 1, total })}
          </span>
        </figcaption>
      </figure>

      {total > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label={t('lightbox.next')}
          className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body,
  )
}
