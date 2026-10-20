import { useEffect, useState, type ReactNode } from 'react'
import { Link } from '../components/Link'
import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { paths } from '../site'
import './Checklist.css'

const questions: { id: string; question: string; hint: ReactNode; action?: { href: string; label: string } }[] = [
  {
    id: 'fit',
    question: 'Does it fit your room and seating distance?',
    hint: 'Measure the wall or stand, and where you sit. Bigger is not always better in a small room.',
    action: { href: paths.viewingDistance, label: 'Open the viewing distance calculator' },
  },
  {
    id: 'light',
    question: 'How does it handle daylight and reflections?',
    hint: (
      <>
        Think about windows and lamps opposite the screen. See <Link href={`${paths.backlights}#room`}>glossy vs matte</Link>.
      </>
    ),
  },
  {
    id: 'picture',
    question: 'Do dark scenes, subtitles and motion look clean?',
    hint: 'Look for halos around bright objects, and smearing in fast sports.',
  },
  {
    id: 'features',
    question: 'Do your apps, HDR formats and gaming ports work?',
    hint: (
      <>
        Check your streaming apps, Dolby Vision or HDR10+, and 4K 120 Hz ports. See{' '}
        <Link href={paths.features}>HDR &amp; gaming</Link> and <Link href={paths.smartTv}>Smart TV platforms</Link>.
      </>
    ),
  },
  {
    id: 'purchase',
    question: 'Are the exact size, warranty and return policy right?',
    hint: 'Different sizes of the same model can use different panels. Know how to return it if it disappoints.',
  },
]

const shopTips = [
  { title: 'Ignore the demo loop', text: 'Shop modes are tuned to dazzle under bright lights. Ask to see a normal picture mode.' },
  { title: 'Bring your own test', text: 'A dark film scene with subtitles shows blooming and black levels quickly.' },
  { title: 'Step to the side', text: 'View from where your furthest seat would be. Some panels fade off-angle.' },
]

const STORAGE_KEY = 'screen-decoded:checklist'

// Ticks are a per-browser convenience; the page works the same when storage is unavailable.
function loadChecked(): string[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function Checklist() {
  const [checked, setChecked] = useState<string[]>(loadChecked)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      // Storage blocked (private mode, disabled site data): keep state in memory only.
    }
  }, [checked])

  const done = questions.filter((q) => checked.includes(q.id)).length

  function toggle(id: string) {
    setChecked((current) => (current.includes(id) ? current.filter((c) => c !== id) : [...current, id]))
  }

  return (
    <>
      <PageHero
        eyebrow="Chapter 07 · Before you buy"
        eyebrowTone="oled"
        title="A buying checklist for your shortlist"
        lead="Five questions to ask about every TV you are considering. Take it to the shop, or tick it off while you compare online."
      />

      <section className="container checklist-layout">
        <div className="checklist">
          <div className="checklist__head">
            <h2 className="checklist__title">Your checklist</h2>
            <p className="checklist__count" aria-live="polite">
              {done} of {questions.length} checked
            </p>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-label="Checklist progress"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={done}
          >
            <div className="progress__fill" style={{ width: `${(done / questions.length) * 100}%` }} />
          </div>

          <ol className="checklist__items">
            {questions.map((q, index) => {
              const isChecked = checked.includes(q.id)
              const inputId = `check-${q.id}`
              return (
                <li key={q.id} className={`check-item${isChecked ? ' check-item--done' : ''}`}>
                  <input id={inputId} type="checkbox" checked={isChecked} onChange={() => toggle(q.id)} />
                  <div className="check-item__body">
                    <label htmlFor={inputId}>
                      <span className="check-item__num">{String(index + 1).padStart(2, '0')}</span>
                      {q.question}
                    </label>
                    <p className="check-item__hint">{q.hint}</p>
                    {q.action && (
                      <Link href={q.action.href} className="btn btn--sm btn--accent check-item__action no-print">
                        {q.action.label}
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="checklist__actions no-print">
            <button type="button" className="btn btn--sm btn--dark" onClick={() => window.print()}>
              Print checklist
            </button>
            <button
              type="button"
              className="btn btn--sm btn--outline"
              onClick={() => setChecked([])}
              disabled={done === 0}
            >
              Reset
            </button>
          </div>
        </div>

        <aside aria-labelledby="starting" className="starting-point">
          <h2 id="starting">Your starting point</h2>
          <div className="starting-point__options">
            <div className="starting-point__option">
              <span className="tag tag--oled">OLED</span>
              <p>Dark-room films and pixel-level contrast.</p>
            </div>
            <div className="starting-point__option">
              <span className="tag tag--lcd">LCD with good local dimming</span>
              <p>Bright rooms and long static-content sessions.</p>
            </div>
          </div>
          <p className="starting-point__note">
            Compare the exact model, screen size and regional specification. The model matters more than the badge.
          </p>
        </aside>
      </section>

      <section aria-labelledby="shop" className="container section--end" style={{ paddingTop: 96 }}>
        <h2 id="shop" className="section-title">
          In the shop
        </h2>
        <div className="grid grid--260 grid--tight" style={{ marginTop: 32 }}>
          {shopTips.map((tip) => (
            <div key={tip.title} className="card card--sm">
              <p className="shop-tip__title">{tip.title}</p>
              <p className="shop-tip__text">{tip.text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <PageNav
            prev={{ href: paths.viewingDistance, label: 'Viewing distance' }}
            next={{ href: paths.home, label: 'Back to the start' }}
          />
        </div>
      </section>
    </>
  )
}
