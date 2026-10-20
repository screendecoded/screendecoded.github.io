import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { paths } from '../site'
import './Features.css'

type Chip = { text: string; tone: 'neutral' | 'lcd' | 'oled' }

const establishedFormats: { name: string; chips: Chip[]; text: string }[] = [
  {
    name: 'HDR10',
    chips: [{ text: 'Open', tone: 'neutral' }, { text: 'Static', tone: 'neutral' }],
    text: 'The baseline every HDR TV supports. One set of metadata for the whole film.',
  },
  {
    name: 'HDR10+',
    chips: [{ text: 'Open', tone: 'neutral' }, { text: 'Dynamic', tone: 'lcd' }],
    text: 'Adds scene-by-scene metadata to guide the picture.',
  },
  {
    name: 'Dolby Vision',
    chips: [{ text: 'Licensed', tone: 'oled' }, { text: 'Dynamic', tone: 'lcd' }],
    text: 'Dolby Laboratories’ format, also with scene-by-scene metadata.',
  },
  {
    name: 'HLG',
    chips: [{ text: 'Broadcast', tone: 'neutral' }],
    text: 'Hybrid Log-Gamma, by the BBC and NHK. Built for live TV and works on non-HDR sets too.',
  },
]

const newerFormats: { name: string; chips: Chip[]; text: string }[] = [
  {
    name: 'HDR10+ Advanced',
    chips: [{ text: 'Open', tone: 'neutral' }, { text: 'Dynamic', tone: 'lcd' }],
    text: 'Adds brightness, local tone-mapping, color and motion tools — including brightness you can adjust yourself.',
  },
  {
    name: 'Dolby Vision 2 / 2 Max',
    chips: [{ text: 'Licensed', tone: 'oled' }, { text: 'Dynamic', tone: 'lcd' }],
    text: 'A new image engine with better tools for creators. Max is the higher tier and reacts to the lighting in your room.',
  },
]

const gamingTerms = [
  {
    term: '4K at 120 Hz',
    text: 'Confirm this input mode on the HDMI ports you will actually use. Not every port supports it.',
  },
  { term: 'VRR and ALLM', text: 'VRR helps reduce tearing. ALLM switches the TV to a low-latency mode automatically.' },
  {
    term: 'Response and input lag',
    text: 'Pixel transitions affect motion clarity. Input lag affects how quickly your controls respond.',
  },
  {
    term: 'HGiG',
    text: 'HDR Gaming Interest Group guidelines, so games look as their creators intended. Calibration guidance, not another video format.',
  },
]

function Chips({ chips, onInk = false }: { chips: Chip[]; onInk?: boolean }) {
  return (
    <p className="chip-row">
      {chips.map((chip) => (
        <span
          key={chip.text}
          className={`chip ${onInk ? `chip--on-ink${chip.tone === 'neutral' ? '' : `-${chip.tone}`}` : `chip--${chip.tone}`}`}
        >
          {chip.text}
        </span>
      ))}
    </p>
  )
}

export function Features() {
  return (
    <>
      <PageHero
        eyebrow="Chapter 04 · Beyond the panel"
        title="HDR and gaming"
        lead="The logos on the stand and the ports on the back."
      >
        <nav className="jump-links" aria-label="On this page">
          <ul>
            <li>
              <a href="#hdr">HDR formats</a>
            </li>
            <li>
              <a href="#gaming">Gaming</a>
            </li>
          </ul>
        </nav>
      </PageHero>

      <section aria-labelledby="hdr" className="container features-section" style={{ paddingTop: 80 }}>
        <h2 id="hdr" className="section-title">
          HDR formats guide brightness and color
        </h2>
        <p className="section-lead" style={{ maxWidth: 720 }}>
          HDR (High Dynamic Range) lets bright highlights and deep shadows appear in the same scene. Formats differ in
          how much guidance — <strong>metadata</strong> — they send the TV: once for the whole film (static) or scene
          by scene (dynamic).
        </p>

        <p className="eyebrow format-group-label">Established formats</p>
        <div className="grid grid--240 grid--tight" style={{ marginTop: 0 }}>
          {establishedFormats.map((format) => (
            <article key={format.name} className="card card--sm format-card">
              <h3>{format.name}</h3>
              <Chips chips={format.chips} />
              <p className="format-card__text">{format.text}</p>
            </article>
          ))}
        </div>

        <p className="eyebrow format-group-label">Newer formats</p>
        <div className="grid grid--300 grid--tight" style={{ marginTop: 0 }}>
          {newerFormats.map((format) => (
            <article key={format.name} className="card card--sm card--dark format-card format-card--new">
              <h3>{format.name}</h3>
              <Chips chips={format.chips} onInk />
              <p className="format-card__text">{format.text}</p>
            </article>
          ))}
        </div>
        <p className="callout">
          An HDR logo cannot guarantee good HDR. Check picture performance and which formats your apps and discs
          actually use.
        </p>
      </section>

      <section aria-labelledby="gaming" className="container section features-section">
        <div className="gaming">
          <div className="gaming__intro">
            <h2 id="gaming" className="section-title">
              Gaming needs more than a fast panel
            </h2>
            <p className="section-lead">
              Your console, your cable and your TV need to work together. Check every link in the chain.
            </p>
            <div
              className="signal-chain"
              role="img"
              aria-label="Console connected by an HDMI cable to the TV; all three must support the same features."
            >
              <span className="signal-chain__node">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="11" rx="5" />
                  <path d="M7 11v3M5.5 12.5h3M16 12h.01M18 14h.01" />
                </svg>
                Console
              </span>
              <span className="signal-chain__wire" />
              <span className="signal-chain__node">HDMI 2.1 cable</span>
              <span className="signal-chain__wire" />
              <span className="signal-chain__node signal-chain__node--tv">
                <svg width="22" height="22" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="24" height="15" rx="2" />
                  <path d="M10 22h8M14 17v5" />
                </svg>
                TV port
              </span>
            </div>
          </div>
          <dl className="gaming__terms grid grid--240 grid--tight">
            {gamingTerms.map((item) => (
              <div key={item.term} className="card card--sm">
                <dt>{item.term}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container section--end" style={{ paddingTop: 64 }}>
        <PageNav
          prev={{ href: paths.labels, label: 'Labels decoded' }}
          next={{ href: paths.smartTv, label: 'Next: Smart TV platforms →' }}
        />
      </section>
    </>
  )
}
