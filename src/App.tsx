import { useEffect, type ComponentType } from 'react'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import './components/layout.css'
import { Backlights } from './pages/Backlights'
import { Checklist } from './pages/Checklist'
import { Features } from './pages/Features'
import { Home } from './pages/Home'
import { Labels } from './pages/Labels'
import { NotFound } from './pages/NotFound'
import { Privacy } from './pages/Privacy'
import { SmartTv } from './pages/SmartTv'
import { Technologies } from './pages/Technologies'
import { ViewingDistance } from './pages/ViewingDistance'
import { scrollToLocation, useLocation } from './router'
import { notFoundMeta, pageMeta, paths, type Path } from './site'

// Tab titles come from pageMeta in site.ts, shared with the build's per-page HTML.
const routes: Record<Path, ComponentType> = {
  [paths.home]: Home,
  [paths.technologies]: Technologies,
  [paths.backlights]: Backlights,
  [paths.labels]: Labels,
  [paths.features]: Features,
  [paths.smartTv]: SmartTv,
  [paths.viewingDistance]: ViewingDistance,
  [paths.checklist]: Checklist,
  [paths.privacy]: Privacy,
}

const isRoute = (path: string): path is Path => Object.hasOwn(routes, path)

// GitHub Pages also serves each page's file directly, so "/labels.html",
// "/labels/" and "/index.html" must show the same pages as "/labels" and "/".
function normalizePath(pathname: string) {
  const path = pathname
    .replace(/\/+$/, '')
    .replace(/(^|\/)index\.html$/, '')
    .replace(/\.html$/, '')
  return path === '' ? '/' : path
}

function App() {
  const { pathname, hash } = useLocation()
  const path = normalizePath(pathname)
  const Page = isRoute(path) ? routes[path] : NotFound
  const { title } = isRoute(path) ? pageMeta[path] : notFoundMeta

  useEffect(() => {
    document.title = title
  }, [title])

  // Show the clean address (e.g. /labels, not /labels.html) without adding a history entry.
  useEffect(() => {
    if (isRoute(path) && pathname !== path) {
      window.history.replaceState(window.history.state, '', hash ? `${path}#${hash}` : path)
    }
  }, [pathname, path, hash])

  // Land at the top of a new page, or on the section a #hash link points to.
  useEffect(() => {
    scrollToLocation(hash)
  }, [path, hash])

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader currentPath={path} />
      <main id="main">
        <Page />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
