import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { paths } from '../site'
import './Technologies.css'

const technologies = [
  {
    name: 'CRT',
    full: 'Cathode Ray Tube',
    status: 'Retired',
    tone: 'retired',
    desc: 'Electron beams light phosphor dots on a deep glass tube. Sony’s Trinitron used an aperture grille for a brighter, flatter picture.',
  },
  {
    name: 'Plasma',
    full: 'Plasma display panel',
    status: 'Retired',
    tone: 'retired',
    desc: 'Tiny cells of gas glow when charged. Loved for contrast and motion, but heavy and power-hungry.',
  },
  {
    name: 'LCD',
    full: 'Liquid-Crystal Display',
    status: 'In shops today',
    tone: 'lcd',
    desc: 'A backlight shines through liquid crystals. The most common TV type, from budget to premium.',
  },
  {
    name: 'OLED',
    full: 'Organic Light Emitting Diode',
    status: 'In shops today',
    tone: 'oled',
    desc: 'Every pixel makes its own light and can turn fully off for perfect black.',
  },
  {
    name: 'MicroLED',
    full: 'MLED',
    status: 'Emerging · luxury',
    tone: 'emissive',
    desc: 'Tiny inorganic LEDs form the pixels themselves. No LCD layer, no backlight — and a very high price.',
  },
]

const subpixelColors = { R: '#E5483D', G: '#3DBE6E', B: '#3E6EF0', W: '#F4F4F0' }

const oledFamilies = [
  {
    name: 'WOLED',
    maker: 'White OLED · mainly LG Display',
    subpixels: ['R', 'G', 'B', 'W'] as const,
    captions: ['R', 'G', 'B', 'W'],
    diagramLabel:
      'One WOLED pixel: four subpixels, red, green, blue and an extra white, all lit by white OLED light through color filters.',
    text: (
      <>
        White OLED light passes through color filters, with an <strong>extra white subpixel</strong> for brightness.
      </>
    ),
  },
  {
    name: 'QD-OLED',
    maker: 'Quantum-dot OLED · mainly Samsung Display',
    subpixels: ['R', 'G', 'B'] as const,
    captions: ['R · from blue', 'G · from blue', 'B'],
    diagramLabel:
      'One QD-OLED pixel: blue OLED light passes through red and green quantum dots, giving three subpixels: red, green and blue.',
    text: (
      <>
        Blue OLED light plus <strong>quantum dots</strong> creates red and green, alongside blue. No white subpixel.
      </>
    ),
  },
]

const comparedTechs = [
  { key: 'lcd', name: 'LCD' },
  { key: 'oled', name: 'OLED' },
  { key: 'micro', name: 'MicroLED' },
] as const

const comparison = [
  { aspect: 'How light is made', lcd: 'Shared backlight', oled: 'Each pixel', micro: 'Each pixel' },
  { aspect: 'Black levels', lcd: 'Depends on local dimming', oled: 'True black', micro: 'True black' },
  { aspect: 'Bright rooms', lcd: 'Usually strongest', oled: 'Check the model', micro: 'Very bright' },
  { aspect: 'Burn-in risk', lcd: 'Very low', oled: 'Cumulative risk with static images', micro: 'Very low' },
  { aspect: 'Price range', lcd: 'Budget to premium', oled: 'Mid-range to premium', micro: 'Luxury' },
]

const backlightLeds = Array.from({ length: 24 }, (_, i) => i)

export function Technologies() {
  return (
    <>
      <PageHero
        eyebrow="Chapter 01"
        title="Display technologies, from tubes to tiny LEDs"
        lead="Five main ways of making a TV picture have come and gone. Two of them fill the shops today."
      />

      <section aria-labelledby="timeline" className="container" style={{ paddingTop: 80 }}>
        <h2 id="timeline" className="section-title">
          The main technologies
        </h2>
        <ol className="tech-list grid grid--200" style={{ gap: 12 }}>
          {technologies.map((tech) => (
            <li key={tech.name} className={`tech-item tech-item--${tech.tone}`}>
              <span className="tech-item__status">{tech.status}</span>
              <span className="tech-item__name">{tech.name}</span>
              <span className="tech-item__full">{tech.full}</span>
              <span className="tech-item__desc">{tech.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="layers" className="container section">
        <div className="layers">
          <div className="layers__copy">
            <p className="eyebrow eyebrow--lcd">How LCD works</p>
            <h2 id="layers" className="section-title">
              LCD picture quality comes from several layers
            </h2>
            <ol className="layer-steps">
              <li>
                <span className="layer-steps__num">1</span>
                <div>
                  <strong>Backlight</strong> supplies the light. LEDs replaced the fluorescent (CCFL) lamps used in
                  older LCD TVs.
                </div>
              </li>
              <li>
                <span className="layer-steps__num">2</span>
                <div>
                  <strong>LCD panel</strong> controls how much light reaches each pixel, like millions of tiny
                  shutters.
                </div>
              </li>
              <li>
                <span className="layer-steps__num">3</span>
                <div>
                  <strong>Color system</strong> — filters and, on some models, quantum dots — shapes the colors you
                  see.
                </div>
              </li>
            </ol>
            <p className="callout">
              A quantum-dot label alone says little about black levels. Those depend on the backlight.
            </p>
          </div>

          <figure className="exploded">
            <div
              className="exploded__stage"
              role="img"
              aria-label="Exploded view of an LCD TV: backlight at the back, then the liquid-crystal panel, then the color filter layer, then the picture you see."
            >
              <div className="exploded__layer exploded__layer--backlight">
                {backlightLeds.map((led) => (
                  <div key={led} className="exploded__led" />
                ))}
              </div>
              <div className="exploded__layer exploded__layer--panel" />
              <div className="exploded__layer exploded__layer--filter">
                <div style={{ background: 'rgba(230, 70, 60, 0.55)' }} />
                <div style={{ background: 'rgba(60, 190, 110, 0.55)' }} />
                <div style={{ background: 'rgba(60, 110, 240, 0.55)' }} />
              </div>
              <span className="exploded__label" style={{ left: 0, top: 352, color: 'var(--lcd-deep)' }}>
                1 · Backlight
              </span>
              <span className="exploded__label" style={{ left: '30%', top: 330 }}>
                2 · LCD panel
              </span>
              <span className="exploded__label" style={{ left: '60%', top: 278 }}>
                3 · Color filter
              </span>
            </div>
            <figcaption className="figcaption">
              Exploded view. The light always starts at the back and passes through every layer.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="oled" className="container section">
        <p className="eyebrow eyebrow--oled">How OLED works</p>
        <h2 id="oled" className="section-title">
          OLED has two main panel families
        </h2>
        <p className="section-lead">
          Both offer pixel-level dimming and strong dark-room contrast. They differ in how they make color.
        </p>

        <div className="grid grid--320">
          {oledFamilies.map((family) => (
            <article key={family.name} className="card oled-card">
              <div className="oled-card__head">
                <h3 className="oled-card__name">{family.name}</h3>
                <span className="oled-card__maker">{family.maker}</span>
              </div>
              <div className="subpixels" role="img" aria-label={family.diagramLabel}>
                <div className="subpixels__row">
                  {family.subpixels.map((sub) => (
                    <div key={sub} className="subpixels__cell" style={{ background: subpixelColors[sub] }} />
                  ))}
                </div>
                <div className="subpixels__row subpixels__labels">
                  {family.captions.map((caption) => (
                    <span key={caption}>{caption}</span>
                  ))}
                </div>
              </div>
              <p>{family.text}</p>
            </article>
          ))}
        </div>

        <div className="woled-gens" id="woled-refinements">
          <h3>WOLED refinements you may see on the box</h3>
          <dl>
            <div>
              <dt>evo</dt>
              <dd>LG product branding for its improved “evolution” WOLED panels. Usually written in lowercase.</dd>
            </div>
            <div>
              <dt>MLA · Micro Lens Array</dt>
              <dd>Tiny lenses improve light extraction for a brighter picture. The 3rd generation of WOLED.</dd>
            </div>
            <div>
              <dt>Primary RGB Tandem</dt>
              <dd>
                A revised four-layer stack with two blue layers plus separate red and green. The 4th generation;
                Tandem 2.0 adds refinements in 2026.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="rgb" className="container section">
        <p className="eyebrow">Don’t get caught out</p>
        <h2 id="rgb" className="section-title">
          RGB backlights and MicroLED are different things
        </h2>
        <div className="grid grid--320">
          <article className="versus-card versus-card--lcd">
            <p className="versus-card__kicker">RGB BACKLIGHT · STILL LCD</p>
            <h3>Mini RGB, Micro RGB, True RGB</h3>
            <p className="versus-card__text">
              Red, green and blue LEDs illuminate an LCD panel, instead of only white or blue LEDs. LCD light control
              and local dimming still matter.
            </p>
          </article>
          <article className="versus-card versus-card--emissive">
            <p className="versus-card__kicker">SELF-EMISSIVE</p>
            <h3>MicroLED</h3>
            <p className="versus-card__text">
              Tiny inorganic LEDs form the image pixels themselves. No LCD layer or shared backlight. A separate, very
              expensive category.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="compare" className="container section section--end">
        <h2 id="compare" className="section-title">
          At a glance
        </h2>
        <p className="section-lead" style={{ marginTop: 12 }}>
          General tendencies. Individual models vary a lot.
        </p>
        <div className="table-wrap table-wrap--stack">
          <table className="data-table data-table--stack compare-table" role="table">
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">
                  <span className="visually-hidden">Aspect</span>
                </th>
                {comparedTechs.map((tech) => (
                  <th key={tech.key} scope="col" role="columnheader">
                    {tech.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {comparison.map((row) => (
                <tr key={row.aspect} role="row">
                  <th scope="row" role="rowheader">
                    {row.aspect}
                  </th>
                  {comparedTechs.map((tech) => (
                    <td key={tech.key} role="cell">
                      <span className={`cell-label compare-table__tech compare-table__tech--${tech.key}`}>
                        {tech.name}
                      </span>
                      <span>{row[tech.key]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 40 }}>
          <PageNav
            prev={{ href: paths.home, label: 'Home' }}
            next={{ href: paths.backlights, label: 'Next: Backlights & panels →' }}
          />
        </div>
      </section>
    </>
  )
}
