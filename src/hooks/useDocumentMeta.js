import { useEffect } from 'react'

function setMeta(attr, key, content) {
  if (content == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Actualiza <title>, meta description y Open Graph según la página y el idioma activos.
// (El atributo lang de <html> lo gestiona LanguageProvider.)
export default function useDocumentMeta({ title, description, locale }) {
  useEffect(() => {
    if (title) document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:locale', locale)
    setMeta('property', 'og:url', window.location.href)
  }, [title, description, locale])
}
