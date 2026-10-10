import { Route, Routes, useLocation } from 'react-router-dom'
import { useLanguage } from './i18n/LanguageContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollManager from './components/layout/ScrollManager'
import useApiWarmup from './hooks/useApiWarmup'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

export default function App() {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  useApiWarmup() // despierta la API de TrainTracker (plan gratuito) mientras se lee el portfolio

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        {t('a11y.skipToContent')}
      </a>
      <ScrollManager />
      <Navbar />
      {/* key={pathname}: aparición suave del contenido al cambiar de página */}
      <main id="main" tabIndex={-1} key={pathname} className="flex-1 animate-fade-in focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
