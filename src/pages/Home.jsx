import { useLanguage } from '../i18n/LanguageContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'

export default function Home() {
  const { t } = useLanguage()

  useDocumentMeta({
    title: t('meta.homeTitle'),
    description: t('meta.homeDescription'),
    locale: t('meta.locale'),
  })

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  )
}
