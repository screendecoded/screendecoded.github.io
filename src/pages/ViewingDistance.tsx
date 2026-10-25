import { useEffect, useState } from 'react'
import { Link } from '../components/Link'
import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { RememberToggle } from '../components/RememberToggle'
import { loadSaved, save, useRememberOnDevice } from '../consent'
import { PerspectiveView } from '../components/PerspectiveView'
import { TopView } from '../components/TopView'
import { paths } from '../site'
import {
  CM_PER_INCH,
  GREEN_ZONE,
  IDEAL_ANGLE_DEG,
  OUTER_ZONE,
  fitFor,
  formatDistance,
  idealDiagonalIn,
  idealDistanceCm,
  speakDistance,
  viewingAngleDeg,
  type Fit,
  type Units,
} from '../viewing'
import './ViewingDistance.css'

const presetSizes = [48, 55, 65, 75, 77, 83, 85, 98, 100, 115]
const MIN_SIZE = 32
const MAX_SIZE = 150
const MIN_DISTANCE_CM = 80
const MAX_DISTANCE_CM = 500

const fitText: Record<Fit, { title: string; tone: 'zone' | 'warn' }> = {
  'too-close': { title: 'Too close', tone: 'warn' },
  'bit-close': { title: 'A bit close', tone: 'warn' },
  ideal: { title: 'In the green zone', tone: 'zone' },
  'bit-far': { title: 'A bit far', tone: 'warn' },
  'too-far': { title: 'Too far', tone: 'warn' },
}

// Remembered between visits only if the visitor agrees (see consent.ts).
const loadUnits = (): Units => (loadSaved('units') === 'imperial' ? 'imperial' : 'metric')

const clampDistance = (cm: number) => Math.min(MAX_DISTANCE_CM, Math.max(MIN_DISTANCE_CM, cm))

function nearestPreset(diagonalIn: number) {
  return presetSizes.reduce((best, size) => (Math.abs(size - diagonalIn) < Math.abs(best - diagonalIn) ? size : best))
}

export function ViewingDistance() {
  const [size, setSize] = useState(65)
  const [customText, setCustomText] = useState('')
  // The size button pressed most recently, so clearing "Other size" can return to it.
  const [lastPreset, setLastPreset] = useState(65)
  const [distanceCm, setDistanceCm] = useState(250)
  const [units, setUnits] = useState<Units>(loadUnits)
  const remember = useRememberOnDevice()

  // Also runs the moment "Remember on this device" is switched on, saving the current choice.
  useEffect(() => {
    if (remember) save('units', units)
  }, [units, remember])

  const ideal = idealDistanceCm(size)
  const angle = viewingAngleDeg(size, distanceCm)
  const fit = fitFor(distanceCm, ideal)
  const bestSize = idealDiagonalIn(distanceCm)
  const suggestedSize = nearestPreset(bestSize)
  const metric = units === 'metric'
  // Slider ends in the slider's own unit (cm, or whole inches). The scale labels
  // are formatted from these same values, so they always match where it stops.
  const sliderMin = metric ? MIN_DISTANCE_CM : Math.ceil(MIN_DISTANCE_CM / CM_PER_INCH)
  const sliderMax = metric ? MAX_DISTANCE_CM : Math.floor(MAX_DISTANCE_CM / CM_PER_INCH)
  const sliderToCm = (value: number) => (metric ? value : value * CM_PER_INCH)

  function chooseCustom(text: string) {
    setCustomText(text)
    if (text === '') {
      setSize(lastPreset)
      return
    }
    const value = Number(text)
    if (Number.isFinite(value) && value >= MIN_SIZE && value <= MAX_SIZE) {
      setSize(Math.round(value))
    }
  }

  function choosePreset(preset: number) {
    setSize(preset)
    setLastPreset(preset)
    setCustomText('')
  }

  const customInvalid =
    customText !== '' && !(Number(customText) >= MIN_SIZE && Number(customText) <= MAX_SIZE)

  return (
    <>
      <PageHero
        eyebrow="Chapter 06 · Room fit"
        title="Find your ideal viewing distance"
        lead="Pick a screen size and move the slider to where you will sit. The pictures show how the TV fits your room and your view."
      />

      <section aria-labelledby="calculator" className="container" style={{ paddingTop: 64 }}>
        <h2 id="calculator" className="visually-hidden">
          Viewing distance calculator
        </h2>

        {/* Wide screens: drawings left, controls right. Narrow screens: both
            columns dissolve (display: contents) and CSS order interleaves them as
            top view, controls, result, perspective view. */}
        <div className="calc">
          <div className="calc__visuals">
            <figure className="calc__view calc__view--top card">
              <p className="calc__view-title">From above</p>
              <TopView diagonalIn={size} distanceCm={distanceCm} units={units} />
              <figcaption className="figcaption">
                Blue: what you see from your seat. Dashed amber: the ideal {IDEAL_ANGLE_DEG}° seat. Green: within{' '}
                {GREEN_ZONE * 100}% of it.
              </figcaption>
            </figure>

            <figure className="calc__view calc__view--perspective card">
              <p className="calc__view-title">From your seat</p>
              <PerspectiveView diagonalIn={size} distanceCm={distanceCm} />
              <figcaption className="figcaption">
                The dashed amber outline shows how big the screen would look from the ideal distance.
              </figcaption>
            </figure>
          </div>

          <div className="calc__panel">
            <div className="calc__controls card">
              <div className="calc__field">
                <div className="calc__distance-head">
                  <label htmlFor="distance" className="calc__legend">
                    Viewing distance
                  </label>
                  <div className="unit-toggle" role="group" aria-label="Units">
                    <button type="button" aria-pressed={metric} onClick={() => setUnits('metric')}>
                      Metric
                    </button>
                    <button type="button" aria-pressed={!metric} onClick={() => setUnits('imperial')}>
                      Imperial
                    </button>
                  </div>
                </div>
                <p className="calc__distance-value" aria-hidden="true">
                  {formatDistance(distanceCm, units)}
                </p>
                <input
                  id="distance"
                  type="range"
                  className="calc__slider"
                  min={sliderMin}
                  max={sliderMax}
                  step={metric ? 5 : 1}
                  value={metric ? distanceCm : distanceCm / CM_PER_INCH}
                  aria-valuetext={speakDistance(distanceCm, units)}
                  onChange={(event) => setDistanceCm(clampDistance(sliderToCm(Number(event.target.value))))}
                />
                <div className="calc__scale" aria-hidden="true">
                  <span>{formatDistance(sliderToCm(sliderMin), units)}</span>
                  <span>{formatDistance(sliderToCm(sliderMax), units)}</span>
                </div>
                <RememberToggle />
              </div>

              <div className="calc__field">
                <p className="calc__legend" id="size-legend">
                  Screen size
                </p>
                <div className="size-picker" role="group" aria-labelledby="size-legend">
                  {presetSizes.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      aria-pressed={size === preset && customText === ''}
                      onClick={() => choosePreset(preset)}
                    >
                      {preset}″
                    </button>
                  ))}
                </div>
                <div className="calc__custom">
                  <label htmlFor="custom-size">Other size</label>
                  <div className="calc__custom-field">
                    <input
                      id="custom-size"
                      type="number"
                      inputMode="numeric"
                      min={MIN_SIZE}
                      max={MAX_SIZE}
                      placeholder="e.g. 70"
                      value={customText}
                      aria-invalid={customInvalid}
                      aria-describedby="custom-size-hint"
                      onChange={(event) => chooseCustom(event.target.value)}
                    />
                    <span aria-hidden="true">inches</span>
                  </div>
                  <p id="custom-size-hint" className={`calc__hint${customInvalid ? ' calc__hint--error' : ''}`}>
                    {MIN_SIZE}–{MAX_SIZE} inches
                  </p>
                </div>
              </div>
            </div>

            <div className={`calc__result calc__result--${fitText[fit].tone}`}>
              <p className="calc__verdict" aria-live="polite">
                {fitText[fit].title}
              </p>
              <p className="calc__summary">
                From {formatDistance(distanceCm, units)}, a {size}″ TV fills {Math.round(angle)}° of your view. The
                ideal is {IDEAL_ANGLE_DEG}° at {formatDistance(ideal, units)}.
              </p>
              <dl className="calc__stats">
                <div>
                  <dt>Viewing angle</dt>
                  <dd>{Math.round(angle)}°</dd>
                </div>
                <div>
                  <dt>Ideal distance for {size}″</dt>
                  <dd>{formatDistance(ideal, units)}</dd>
                </div>
                <div>
                  <dt>Ideal size for this seat</dt>
                  <dd>{Math.round(bestSize)}″</dd>
                </div>
              </dl>
              {fit !== 'ideal' && (
                <div className="calc__actions">
                  <button
                    type="button"
                    className="btn btn--sm btn--dark"
                    onClick={() => setDistanceCm(clampDistance(ideal))}
                  >
                    Move to {formatDistance(clampDistance(ideal), units)}
                  </button>
                  {suggestedSize !== size && (
                    <button
                      type="button"
                      className="btn btn--sm btn--outline"
                      onClick={() => choosePreset(suggestedSize)}
                    >
                      Try a {suggestedSize}″ TV
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how" className="container section">
        <h2 id="how" className="section-title">
          How the ideal distance is worked out
        </h2>
        <div className="grid grid--300">
          <div className="card card--sm">
            <h3 className="card-title">The {IDEAL_ANGLE_DEG}° rule</h3>
            <p className="card-text" style={{ marginTop: 8 }}>
              Sit where the screen fills about {IDEAL_ANGLE_DEG} degrees of your view from side to side. Close enough
              to feel immersive, far enough to take in the whole picture without turning your head.
            </p>
          </div>
          <div className="card card--sm">
            <h3 className="card-title">The green zone</h3>
            <p className="card-text" style={{ marginTop: 8 }}>
              Anywhere within {GREEN_ZONE * 100}% of the ideal distance works well. Up to {OUTER_ZONE * 100}% either
              way is a bit close or far; beyond that, consider another size.
            </p>
          </div>
          <div className="card card--sm">
            <h3 className="card-title">Measure from your eyes</h3>
            <p className="card-text" style={{ marginTop: 8 }}>
              Measure from where your head rests on the sofa to the screen, not from the wall. Sizes assume a normal
              16:9 TV.
            </p>
          </div>
        </div>
        <p className="callout">
          Room fit is question one on the <Link href={paths.checklist}>buying checklist</Link>.
        </p>
      </section>

      <section className="container section--end" style={{ paddingTop: 64 }}>
        <PageNav
          prev={{ href: paths.smartTv, label: 'Smart TV platforms' }}
          next={{ href: paths.checklist, label: 'Next: Buying checklist →' }}
        />
      </section>
    </>
  )
}
