import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de ruta: si hay #ancla, hace scroll a esa sección; si no, vuelve arriba.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Espera al render de la página destino
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ block: 'start' })
          // Lleva el foco a la sección para lectores de pantalla y teclado
          el.focus({ preventScroll: true })
        }
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}
