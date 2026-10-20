import { Link } from '../components/Link'
import { PageHero } from '../components/PageHero'
import { paths } from '../site'

export function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page is off the air"
        lead="The address may be mistyped, or the page has moved."
      />
      <section className="container section--end" style={{ paddingTop: 64 }}>
        <Link href={paths.home} className="btn btn--dark">
          Back to the start
        </Link>
      </section>
    </>
  )
}
