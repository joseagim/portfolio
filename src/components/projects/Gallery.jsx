import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2 } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import Lightbox from './Lightbox'

const GAP = 16 // px, igual que gap-4

// Galería en carrusel: todas las capturas en una misma línea, con flechas y puntos.
// Al hacer clic en una imagen se abre el visor ampliado (Lightbox).
// variant="wide"  → capturas de escritorio (proporción 3:2)
// variant="phone" → capturas de móvil (verticales): alto fijo y ancho natural
// variant="game"  → capturas de videojuego (proporción 16:9)
export default function Gallery({ images, projectTitle, variant = 'wide' }) {
  const { t, pick } = useLanguage()
  const trackRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)
  const [edge, setEdge] = useState({ start: true, end: false, scrollable: true })
  const [active, setActive] = useState(0)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, scrollable: max > 2 })
    // Imagen activa: la diapositiva cuyo borde izquierdo está más cerca del inicio visible
    let best = 0
    let bestDist = Infinity
    Array.from(el.children).forEach((slide, i) => {
      const dist = Math.abs(slide.offsetLeft - el.scrollLeft)
      if (dist < bestDist) {
        best = i
        bestDist = dist
      }
    })
    setActive(el.scrollLeft >= max - 2 ? el.children.length - 1 : best)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [update, images?.length])

  const smooth = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

  const scrollByStep = (dir) => {
    const el = trackRef.current
    const slide = el?.children[0]
    if (!el || !slide) return
    el.scrollBy({ left: dir * (slide.offsetWidth + GAP), behavior: smooth() })
  }

  const scrollToIndex = (i) => {
    const el = trackRef.current
    const slide = el?.children[i]
    if (!el || !slide) return
    el.scrollTo({ left: slide.offsetLeft, behavior: smooth() })
  }

  if (!images?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-14 text-center dark:border-navy-700 dark:bg-navy-900/50">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-navy-100 bg-white text-navy-400 dark:border-navy-700 dark:bg-navy-850 dark:text-navy-300">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="mt-4 font-medium text-ink dark:text-white">{t('project.galleryEmpty')}</p>
        <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">{t('project.galleryEmptyHint')}</p>
      </div>
    )
  }

  const several = images.length > 1
  const phone = variant === 'phone'
  const arrow =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy-200 bg-white/95 text-ink shadow-lift transition-opacity duration-200 hover:bg-white sm:flex dark:border-navy-700 dark:bg-navy-900/95 dark:text-white dark:hover:bg-navy-900'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={t('project.gallery')}>
      <div className="relative">
        <ul
          ref={trackRef}
          onScroll={update}
          className={`relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden ${
            phone ? '[&>li:first-child]:ml-auto [&>li:last-child]:mr-auto' : ''
          }`}
        >
          {images.map((img, i) => {
            const alt = pick(img.alt) || `${projectTitle} ${i + 1}`
            return (
              <li
                key={img.src}
                className={`shrink-0 snap-start ${
                  phone ? '' : several ? 'w-[78%] sm:w-[46%] lg:w-[34%]' : 'w-full max-w-3xl'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`${t('project.openImage', { n: i + 1 })}: ${alt}`}
                  className={`group relative block overflow-hidden rounded-xl border border-navy-100 bg-navy-50 dark:border-navy-800 dark:bg-navy-850 ${
                    phone ? '' : 'w-full'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={
                      phone
                        ? 'block h-[22rem] w-auto sm:h-[27rem]'
                        : `${variant === 'game' ? 'aspect-[16/9]' : 'aspect-[3/2]'} w-full object-cover`
                    }
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-navy-950/0 text-white opacity-0 transition-all duration-200 group-hover:bg-navy-950/30 group-hover:opacity-100">
                    <Maximize2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {several && edge.scrollable && (
          <>
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={edge.start}
              aria-label={t('lightbox.previous')}
              className={`${arrow} left-3 ${edge.start ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={edge.end}
              aria-label={t('lightbox.next')}
              className={`${arrow} right-3 ${edge.end ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {several && edge.scrollable && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={t('project.goToImage', { n: i + 1 })}
              aria-current={i === active ? 'true' : undefined}
              className="group flex h-6 items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-200 ${
                  i === active ? 'w-6 bg-accent' : 'w-1.5 bg-navy-200 group-hover:bg-navy-300 dark:bg-navy-700 dark:group-hover:bg-navy-600'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <Lightbox images={images} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  )
}
