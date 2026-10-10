import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects'
import { warmUp } from '../utils/warmup'

// Despierta en segundo plano las APIs de los proyectos que declaran `warmupUrl` en src/data/projects.js.
// Se ejecuta en cualquier página (la gente puede entrar directamente a un proyecto) y se repite como
// mucho cada 5 minutos por sesión.
export default function useApiWarmup() {
  const { pathname } = useLocation()

  useEffect(() => {
    const urls = projects.map((p) => p.warmupUrl).filter(Boolean)
    if (!urls.length) return

    const run = () => urls.forEach((url) => warmUp(url))
    // Tras la carga inicial, para no competir con los recursos de la página
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(run, 1500)
    return () => clearTimeout(id)
  }, [pathname])
}
