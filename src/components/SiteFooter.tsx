import { lastUpdated, navItems } from '../site'
import { Link } from './Link'

export function SiteFooter() {
  return (
    <footer className="site-footer no-print">
      <div className="container site-footer__inner">
        <div className="site-footer__about">
          <p className="site-footer__name">
            Screen <span className="wordmark__accent">Decoded</span>
          </p>
          <p className="site-footer__blurb">
            Screen technology in plain language for everyday buyers, starting with TVs. Not a technical
            reference.
          </p>
          <p className="site-footer__updated">Updated {lastUpdated}</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
