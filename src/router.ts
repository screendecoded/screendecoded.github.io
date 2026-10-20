import { useSyncExternalStore } from 'react'

// Minimal History API router: the location is an external store that
// changes on back/forward, in-page hash jumps, and calls to navigate().
const NAVIGATE_EVENT = 'app:navigate'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener('hashchange', onChange)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

function getSnapshot() {
  return window.location.pathname + window.location.hash
}

/** Splits "/path#section" into its path and its #fragment (without the "#"). */
function splitLocation(location: string) {
  const hashIndex = location.indexOf('#')
  return hashIndex === -1
    ? { pathname: location, hash: '' }
    : { pathname: location.slice(0, hashIndex), hash: location.slice(hashIndex + 1) }
}

// A malformed #fragment (e.g. "/labels#%") makes decodeURIComponent throw, which
// would blank the whole site; treat it as having no fragment instead.
function decodeHash(hash: string) {
  try {
    return decodeURIComponent(hash)
  } catch {
    return ''
  }
}

/** Scrolls to the section a #fragment names, or to the top of the page. */
export function scrollToLocation(hash: string) {
  const id = decodeHash(hash)
  const target = id ? document.getElementById(id) : null
  if (target) {
    target.scrollIntoView()
  } else {
    window.scrollTo(0, 0)
  }
}

export function navigate(to: string) {
  if (to === getSnapshot()) {
    // Same address: add no duplicate history entry, but still scroll the way
    // a fresh visit would (back to the top, or back to the #section).
    scrollToLocation(splitLocation(to).hash)
    return
  }
  window.history.pushState(null, '', to)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export function useLocation() {
  return splitLocation(useSyncExternalStore(subscribe, getSnapshot))
}
