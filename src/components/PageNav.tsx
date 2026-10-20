import { Link } from './Link'

type PageLink = { href: string; label: string }

// Previous/next chapter links at the bottom of a page.
export function PageNav({ prev, next }: { prev: PageLink; next: PageLink }) {
  return (
    <nav className="pager no-print" aria-label="Chapters">
      <Link href={prev.href} className="pager__prev">
        ← {prev.label}
      </Link>
      <Link href={next.href} className="btn btn--dark">
        {next.label}
      </Link>
    </nav>
  )
}
