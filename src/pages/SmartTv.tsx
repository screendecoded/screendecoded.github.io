import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { paths } from '../site'
import './SmartTv.css'

const platforms = [
  { name: 'webOS', many: false, text: <>LG’s smart TV platform.</> },
  { name: 'Tizen', many: false, text: <>Samsung’s smart TV platform.</> },
  { name: 'Titan OS', many: false, text: <>Used on Philips smart TVs.</> },
  {
    name: 'Google TV',
    many: true,
    text: (
      <>
        Used by Sony, TCL, Philips and more. <strong>Android TV</strong> is its older name.
      </>
    ),
  },
  { name: 'Roku', many: true, text: <>Used by TCL, Philips, Hisense and more.</> },
  { name: 'Fire TV', many: true, text: <>Used by Hisense, Panasonic, TCL and more.</> },
]

export function SmartTv() {
  return (
    <>
      <PageHero
        eyebrow="Chapter 05 · Software"
        title="Smart TV platforms"
        lead="The built-in software decides your menus, apps and voice assistant. Check that the apps you use every day are available in your country."
      />

      <section aria-labelledby="platforms" className="container" style={{ paddingTop: 80 }}>
        <h2 id="platforms" className="section-title">
          Which platform comes with which TV
        </h2>

        <div className="grid grid--260 grid--tight">
          {platforms.map((platform) => (
            <article key={platform.name} className="card card--sm platform-card">
              <p className={`platform-card__reach${platform.many ? ' platform-card__reach--many' : ''}`}>
                {platform.many ? 'MANY BRANDS' : 'ONE BRAND'}
              </p>
              <h3>{platform.name}</h3>
              <p className="platform-card__text">{platform.text}</p>
            </article>
          ))}
          <article className="card card--sm platform-card platform-card--box">
            <p className="platform-card__reach">SEPARATE BOX</p>
            <h3>Apple TV</h3>
            <p className="platform-card__text">
              Apple’s platform. No TV ships with it — the Apple TV streaming box is a separate purchase that plugs into
              any TV. The same goes for streaming sticks if you dislike your TV’s built-in system.
            </p>
          </article>
        </div>
      </section>

      <section className="container section--end" style={{ paddingTop: 64 }}>
        <PageNav
          prev={{ href: paths.features, label: 'HDR & gaming' }}
          next={{ href: paths.viewingDistance, label: 'Next: Viewing distance →' }}
        />
      </section>
    </>
  )
}
