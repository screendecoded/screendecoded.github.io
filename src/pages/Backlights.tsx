import { ContrastComparison } from '../components/ContrastComparison'
import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { paths } from '../site'
import './Backlights.css'

type DimmingMode = 'edge' | 'fald' | 'mini'

// Backlight zones around a bright moon at (75%, 30%) of the screen. Zones close to
// the moon light up fully, a ring around them glows, and the rest stay dark.
// Edge-lit backlights can only light whole vertical stripes.
function zoneColors(cols: number, rows: number, mode: DimmingMode) {
  const near = mode === 'mini' ? 0.035 : 0.07
  const far = mode === 'mini' ? 0.06 : 0.14
  const colors: string[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c + 0.5) / cols - 0.75
      const dy = (((r + 0.5) / rows - 0.3) * 9) / 16
      const distance = mode === 'edge' ? Math.abs(dx) : Math.hypot(dx, dy)
      colors.push(distance < near ? '#E9E2CC' : distance < far ? '#57534A' : '#181B21')
    }
  }
  return colors
}

const dimmingTypes = [
  {
    name: 'Edge lit',
    kind: 'Light from the edges',
    text: 'Often little or no precise local dimming. Dark areas can look washed out.',
    diagramLabel: 'Edge-lit screen showing a moon: a whole vertical stripe of the screen lights up, washing out the dark sky.',
    cols: 8,
    rows: 4,
    zones: zoneColors(8, 4, 'edge'),
  },
  {
    name: 'FALD',
    kind: 'Full-array local dimming',
    text: 'LEDs behind the whole screen form independently controlled zones.',
    diagramLabel: 'Full-array screen showing a moon: a block of zones around the moon lights up, with a visible glow around it.',
    cols: 8,
    rows: 4,
    zones: zoneColors(8, 4, 'fald'),
  },
  {
    name: 'Mini LED',
    kind: 'Smaller backlight LEDs',
    text: 'Can enable finer dimming, but the backlight layout and processing still matter.',
    diagramLabel: 'Mini LED screen showing a moon: many small zones light up tightly around the moon, leaving the sky dark.',
    cols: 32,
    rows: 16,
    zones: zoneColors(32, 16, 'mini'),
  },
]

type Rating = { label: string; score: 1 | 2 | 3; value: string }

const panelTypes: { name: string; full: string; summary: string; ratings: Rating[]; fit: string; fitLabel: string; rare?: boolean }[] = [
  {
    name: 'VA',
    full: 'Vertical Alignment',
    summary: 'Usually stronger contrast straight on, with narrower viewing angles.',
    ratings: [
      { label: 'Contrast', score: 3, value: 'High' },
      { label: 'Viewing angles', score: 1, value: 'Narrow' },
      { label: 'Response speed', score: 1, value: 'Slower' },
    ],
    fitLabel: 'Good for:',
    fit: 'one main seat in front of the TV, darker rooms.',
  },
  {
    name: 'IPS / ADS',
    full: 'In-Plane Switching',
    summary: 'Usually wider viewing angles and accurate color, with weaker native contrast.',
    ratings: [
      { label: 'Contrast', score: 1, value: 'Low' },
      { label: 'Viewing angles', score: 3, value: 'Wide' },
      { label: 'Response speed', score: 2, value: 'Medium' },
    ],
    fitLabel: 'Good for:',
    fit: 'wide sofas and family viewing from the side.',
  },
  {
    name: 'TN',
    full: 'Twisted Nematic',
    summary: 'Fast pixel response, but low contrast and very limited viewing angles.',
    ratings: [
      { label: 'Contrast', score: 1, value: 'Low' },
      { label: 'Viewing angles', score: 1, value: 'Very narrow' },
      { label: 'Response speed', score: 3, value: 'Fast' },
    ],
    fitLabel: 'Mostly found in:',
    fit: 'budget computer monitors today.',
    rare: true,
  },
]

export function Backlights() {
  return (
    <>
      <PageHero
        eyebrow="Chapter 02 · LCD in depth"
        title="Backlights, panels and your room"
        lead="Two LCD TVs can look completely different. The backlight layout, the panel type and the screen coating explain most of the gap."
      />

      <section aria-labelledby="dimming" className="container" style={{ paddingTop: 80 }}>
        <h2 id="dimming" className="section-title">
          Local dimming controls LCD contrast
        </h2>
        <p className="section-lead">
          <strong>Local dimming</strong> means the TV can dim parts of its backlight independently. The more precisely
          it can do that, the darker dark scenes look — and the fewer halos you see.
        </p>

        <div className="grid grid--300">
          {dimmingTypes.map((type) => (
            <article key={type.name} className="card dimming-card">
              <div className="dimming-card__screen" role="img" aria-label={type.diagramLabel}>
                <div
                  className={`zones${type.cols > 8 ? ' zones--fine' : ''}`}
                  style={{
                    gridTemplateColumns: `repeat(${type.cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${type.rows}, minmax(0, 1fr))`,
                    gap: type.cols > 8 ? 1 : 3,
                  }}
                >
                  {type.zones.map((color, i) => (
                    <div key={i} className="zones__zone" style={{ background: color }} />
                  ))}
                  <div className="zones__moon" />
                </div>
              </div>
              <div className="dimming-card__body">
                <h3 className="card-title">{type.name}</h3>
                <p className="dimming-card__kind">{type.kind}</p>
                <p className="card-text">{type.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="dark-tip">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--oled)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <path d="M7 14h10" />
          </svg>
          <div className="dark-tip__copy">
            <p className="dark-tip__title">The useful test: subtitles on a dark scene</p>
            <p>Look for halos around bright objects. Zone count alone cannot predict performance.</p>
          </div>
        </div>
      </section>

      <ContrastComparison />

      <section aria-labelledby="panels" className="container section">
        <h2 id="panels" className="section-title">
          LCD panel types
        </h2>
        <p className="section-lead">
          The liquid-crystal layer comes in three main designs. Each trades contrast against viewing angle.
        </p>
        <div className="grid grid--300">
          {panelTypes.map((panel) => (
            <article key={panel.name} className="card panel-card">
              <div className="panel-card__head">
                <div>
                  <h3 className="panel-card__name">{panel.name}</h3>
                  <p className="panel-card__full">{panel.full}</p>
                </div>
                {panel.rare && <span className="panel-card__rare">Rare in TVs</span>}
              </div>
              <p>{panel.summary}</p>
              <dl className="ratings">
                {panel.ratings.map((rating) => (
                  <div key={rating.label} className="ratings__row">
                    <dt>{rating.label}</dt>
                    <dd className="ratings__bars">
                      {[1, 2, 3].map((step) => (
                        <span
                          key={step}
                          className={`ratings__bar${step <= rating.score ? ' ratings__bar--on' : ''}`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="visually-hidden">{rating.value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="panel-card__fit">
                <strong>{panel.fitLabel}</strong> {panel.fit}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="room" className="container section">
        <h2 id="room" className="section-title">
          Room lighting and reflections change the picture
        </h2>
        <p className="section-lead">
          The screen coating decides what happens to lamps and windows behind you. Coatings vary by model, on LCD and
          OLED alike.
        </p>
        <div className="grid grid--300">
          <article className="card coating-card">
            <div
              className="coating-card__screen coating-card__screen--glossy"
              role="img"
              aria-label="Glossy screen: a window reflection appears as a sharp, clearly outlined rectangle."
            >
              <div className="reflection--glossy" />
            </div>
            <div className="coating-card__body">
              <h3 className="card-title">Glossy</h3>
              <p>
                Can show sharp, mirror-like reflections, but keeps blacks deep and the image crisp in a controlled
                room.
              </p>
            </div>
          </article>
          <article className="card coating-card">
            <div
              className="coating-card__screen coating-card__screen--matte"
              role="img"
              aria-label="Matte screen: the same window reflection is spread out into a soft, hazy patch."
            >
              <div className="reflection--matte" />
            </div>
            <div className="coating-card__body">
              <h3 className="card-title">Matte</h3>
              <p>Spreads reflections out so they are less distracting, but may create a light haze over dark scenes.</p>
            </div>
          </article>
        </div>
        <p className="callout">Try a dark scene from your real seating angle, with your usual room lighting.</p>
      </section>

      <section className="container section--end" style={{ paddingTop: 64 }}>
        <PageNav
          prev={{ href: paths.technologies, label: 'Display technologies' }}
          next={{ href: paths.labels, label: 'Next: Labels decoded →' }}
        />
      </section>
    </>
  )
}
