import { ArrowRight } from '../components/Icons'
import { Link } from '../components/Link'
import { lastUpdated, paths } from '../site'
import './Home.css'

const families = [
  {
    id: 'lcd',
    name: 'LCD',
    pill: 'Backlit',
    summary: 'A backlight shines through liquid crystals that open and close to form the picture.',
    labels: ['LED TV', 'QLED', 'Mini LED', 'QNED', 'NanoCell', 'Micro RGB', 'ULED'],
    link: { href: paths.backlights, label: 'How backlights work' },
  },
  {
    id: 'oled',
    name: 'OLED',
    pill: 'Self-lit pixels',
    summary: 'Each pixel makes its own light, and can switch fully off for true black.',
    labels: ['WOLED', 'QD-OLED', 'evo', 'MLA', 'Primary RGB Tandem'],
    link: { href: `${paths.technologies}#oled`, label: 'The two OLED families' },
  },
]

const startingPoints = [
  {
    title: 'Evening films',
    tag: { tone: 'oled', text: 'Start with OLED' },
    text: 'Strong dark-room contrast. Check brightness in your room and your static-image habits.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--oled)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    ),
  },
  {
    title: 'Daytime TV and sports',
    tag: { tone: 'lcd', text: 'Bright LCD with good local dimming' },
    text: 'Check reflections, motion handling and the picture from off-center seats.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--lcd-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: 'Long sessions with fixed logos',
    tag: { tone: 'lcd', text: 'Start with LCD' },
    text: 'Avoids OLED’s cumulative burn-in risk. Still compare contrast and screen uniformity.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--lcd-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <rect x="15" y="6" width="4" height="3" rx="0.5" />
        <path d="M8 20h8" />
      </svg>
    ),
  },
]

const chapters = [
  { href: paths.technologies, title: 'Display technologies', desc: 'CRT to MicroLED, how LCD layers work, and the two OLED families.' },
  { href: paths.backlights, title: 'Backlights & panels', desc: 'Local dimming, Mini LED, VA vs IPS, glossy vs matte screens.' },
  { href: paths.labels, title: 'Labels decoded', desc: 'QLED, QNED, ULED, True RGB and friends — what each brand name means.' },
  { href: paths.features, title: 'HDR & gaming', desc: 'Dolby Vision vs HDR10+, 120 Hz and VRR, and what your console needs.' },
  { href: paths.smartTv, title: 'Smart TV platforms', desc: 'webOS, Tizen, Google TV and friends — which software comes with which TV.' },
  { href: paths.viewingDistance, title: 'Viewing distance', desc: 'An interactive calculator: the right seat for your screen size, or the right size for your seat.' },
  { href: paths.checklist, title: 'Buying checklist', desc: 'Five questions to ask about every TV on your shortlist.', highlight: true },
]

export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <p className="eyebrow home-hero__eyebrow">TV buying guide · Updated {lastUpdated}</p>
            <h1 className="home-hero__title">A clear path through panels, picture quality and marketing names.</h1>
            <p className="home-hero__lead">
              QLED, QNED, Mini LED, QD-OLED, Micro RGB… This guide explains what the labels on the box actually
              mean, in plain language, so you can compare TVs with confidence.
            </p>
            <div className="home-hero__actions">
              <Link href={paths.technologies} className="btn btn--light">
                Start with the basics
                <ArrowRight />
              </Link>
              <Link href={paths.checklist} className="btn btn--ghost">
                Jump to the checklist
              </Link>
            </div>
          </div>

          <figure className="split-tv">
            <div
              className="split-tv__bezel"
              role="img"
              aria-label="The same bright moon shown on two halves of a TV. On the LCD half a soft halo spills into the dark sky; on the OLED half the moon sits on pure black."
            >
              <div className="split-tv__screen">
                <div className="split-tv__half">
                  <div className="split-tv__moon split-tv__moon--bloom" />
                  <span className="split-tv__label split-tv__label--lcd">LCD</span>
                </div>
                <div className="split-tv__half split-tv__half--oled">
                  <div className="split-tv__moon" />
                  <span className="split-tv__label split-tv__label--oled">OLED</span>
                </div>
              </div>
            </div>
            <div className="split-tv__stand" />
            <figcaption>
              Same scene, two approaches. A shared backlight can spill light around bright objects; self-lit pixels
              stay black right up to the edge.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="families" className="container home-section home-section--first">
        <p className="eyebrow">01 · The big picture</p>
        <h2 id="families" className="section-title section-title--lg">
          Most TV names belong to two families
        </h2>
        <p className="home-section__lead">
          Nearly every TV in the shop is either an LCD or an OLED. Once you know which family a label belongs to,
          most of the marketing falls into place.
        </p>

        <div className="grid grid--320" style={{ marginTop: 40 }}>
          {families.map((family) => (
            <article key={family.id} className={`card family-card family-card--${family.id}`}>
              <div className="family-card__head">
                <h3 className="family-card__name">{family.name}</h3>
                <span className="family-card__pill">{family.pill}</span>
              </div>
              <p className="family-card__summary">{family.summary}</p>
              <div>
                <p className="family-card__names-label">Names you will see</p>
                <ul className="family-card__names">
                  {family.labels.map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </div>
              <Link href={family.link.href} className="arrow-link">
                {family.link.label}
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>

        <div className="also-worth">
          <p className="eyebrow">Also worth knowing</p>
          <p className="also-worth__text">
            <strong>Earlier generations:</strong> CRT (including Sony Trinitron) used electron beams, Plasma used
            glowing gas cells, and older LCD TVs used fluorescent CCFL lamps. <strong>MicroLED</strong> is a
            separate, very expensive self-lit category — not the same as “Micro RGB”.
          </p>
        </div>
      </section>

      <section aria-labelledby="start" className="container home-section">
        <p className="eyebrow">02 · Where to start</p>
        <h2 id="start" className="section-title section-title--lg">
          The best fit depends on what you watch
        </h2>
        <p className="home-section__lead">Starting shortlists, not rankings. The exact model matters more than the badge.</p>

        <div className="grid grid--300" style={{ marginTop: 40 }}>
          {startingPoints.map((point) => (
            <article key={point.title} className="card card--dark start-card">
              {point.icon}
              <h3 className="card-title">{point.title}</h3>
              <p>
                <span className={`tag tag--${point.tag.tone}`}>{point.tag.text}</span>
              </p>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="map" className="container home-section">
        <p className="eyebrow">03 · Explore the guide</p>
        <h2 id="map" className="section-title section-title--lg">
          Read in order, or jump to what confuses you
        </h2>
        <ol className="guide-map grid grid--260 grid--tight">
          {chapters.map((chapter, index) => (
            <li key={chapter.href}>
              <Link href={chapter.href} className={chapter.highlight ? 'guide-map__item--highlight' : undefined}>
                <span className="guide-map__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="guide-map__title">{chapter.title}</span>
                <span className="guide-map__desc">{chapter.desc}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tip" className="container home-section section--end">
        <div className="home-tip">
          <div className="home-tip__copy">
            <h2 id="tip" className="home-tip__title">
              Brand names narrow the search. The exact model decides the picture.
            </h2>
            <p>
              Two TVs with the same badge can perform very differently. Compare the exact model number, screen size
              and regional specification before you buy.
            </p>
          </div>
          <Link href={paths.checklist} className="btn btn--dark">
            Open the checklist
          </Link>
        </div>
      </section>
    </>
  )
}
