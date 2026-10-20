import { useRef, useState, type KeyboardEvent } from 'react'
import { paths, navItems } from '../site'
import { LogoMark } from './Icons'
import { Link } from './Link'

export function SiteHeader({ currentPath }: { currentPath: string }) {
  // The mobile menu remembers which page it was opened on, so navigating
  // anywhere closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === currentPath
  const toggleRef = useRef<HTMLButtonElement>(null)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      setOpenOn(null)
      toggleRef.current?.focus()
    }
  }

  return (
    <header className="site-header no-print" onKeyDown={handleKeyDown}>
      <div className="container site-header__inner">
        <Link href={paths.home} className="wordmark">
          <LogoMark />
          <span className="wordmark__text">
            <span>
              Screen <span className="wordmark__accent">Decoded</span>
            </span>
            <span className="wordmark__tagline">TV buying guide</span>
          </span>
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpenOn(open ? null : currentPath)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
          Menu
        </button>
        <nav id="main-nav" className={`main-nav${open ? ' main-nav--open' : ''}`} aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={item.href === paths.checklist ? 'main-nav__cta' : undefined}
                  aria-current={item.href === currentPath ? 'page' : undefined}
                  onClick={() => setOpenOn(null)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
