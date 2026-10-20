import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { PageNav } from '../components/PageNav'
import { familyNames, tvLabels, type Family } from '../data/labels'
import { paths } from '../site'
import './Labels.css'

type FamilyFilter = 'all' | Family

const filters: { value: FamilyFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'lcd', label: familyNames.lcd },
  { value: 'oled', label: familyNames.oled },
  { value: 'emissive', label: familyNames.emissive },
]

const mixups = [
  {
    a: 'QLED',
    b: 'OLED',
    text: 'One letter apart, completely different. QLED is an LCD with quantum dots; OLED pixels light themselves.',
  },
  {
    a: 'Micro RGB',
    b: 'MicroLED',
    text: 'Micro RGB is a backlight behind an LCD. True MicroLED has no backlight at all and costs far more.',
  },
  {
    a: 'LED TV',
    b: 'LED pixels',
    text: 'An “LED TV” is an LCD lit by LEDs. The LEDs make the light; the LCD makes the picture.',
  },
]

// Ignore case, spaces and hyphens so "minirgb" finds "Mini RGB" and "qd oled" finds "QD-OLED".
function normalize(text: string) {
  return text.toLowerCase().replace(/[\s\-·]+/g, '')
}

export function Labels() {
  const [query, setQuery] = useState('')
  const [family, setFamily] = useState<FamilyFilter>('all')

  const needle = normalize(query)
  const visible = tvLabels.filter(
    (label) =>
      (family === 'all' || label.family === family) &&
      (needle === '' || normalize(`${label.name} ${label.usedBy} ${familyNames[label.family]}`).includes(needle)),
  )

  return (
    <>
      <PageHero
        eyebrow="Chapter 03 · Marketing names"
        title="Labels decoded"
        lead="Every brand invents its own names. Here is what the label on the box actually tells you — and which family it belongs to."
      />

      <section aria-labelledby="decoder" className="container" style={{ paddingTop: 64 }}>
        <h2 id="decoder" className="visually-hidden">
          Label decoder
        </h2>
        <div className="decoder-controls">
          <div className="search">
            <label htmlFor="label-search">Find a label</label>
            <div className="search__field">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                id="label-search"
                type="search"
                placeholder="e.g. QNED, Mini LED, evo"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="family-filter" role="group" aria-label="Filter by family">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`family-filter--${filter.value}`}
                aria-pressed={family === filter.value}
                onClick={() => setFamily(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap table-wrap--stack">
          <table className="data-table data-table--stack labels-table" role="table">
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader" style={{ width: '22%' }}>
                  Label on the box
                </th>
                <th scope="col" role="columnheader">
                  What it tells you
                </th>
                <th scope="col" role="columnheader" style={{ width: '16%' }}>
                  Used by
                </th>
                <th scope="col" role="columnheader" style={{ width: '14%' }}>
                  Family
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {visible.map((label) => (
                <tr key={label.name + (label.note ?? '')} role="row">
                  <th scope="row" role="rowheader" className="labels-table__name">
                    {label.name}
                    {label.note && <span className="labels-table__note"> ({label.note})</span>}
                  </th>
                  <td role="cell" className="labels-table__desc">
                    {label.description}
                  </td>
                  <td role="cell" className="labels-table__used-by">
                    <span className="cell-label">Used by: </span>
                    {label.usedBy}
                  </td>
                  <td role="cell" className="labels-table__family">
                    <span className={`chip chip--${label.family}`}>{familyNames[label.family]}</span>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr className="labels-table__empty" role="row">
                  <td colSpan={4} role="cell">
                    No labels match. Try a shorter search or another family.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="labels-count" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'label' : 'labels'}.
        </p>
      </section>

      <section aria-labelledby="traps" className="container" style={{ paddingTop: 96 }}>
        <h2 id="traps" className="section-title">
          Three common mix-ups
        </h2>
        <div className="grid grid--300" style={{ marginTop: 32 }}>
          {mixups.map((mixup) => (
            <article key={mixup.a} className="card" style={{ padding: 28 }}>
              <p className="mixup-title">
                {mixup.a} <span aria-hidden="true">≠</span>
                <span className="visually-hidden">is not</span> {mixup.b}
              </p>
              <p className="mixup-text">{mixup.text}</p>
            </article>
          ))}
        </div>
        <p className="labels-takeaway">Brand names narrow the search. The exact model determines performance.</p>
      </section>

      <section className="container section--end" style={{ paddingTop: 64 }}>
        <PageNav
          prev={{ href: paths.backlights, label: 'Backlights & panels' }}
          next={{ href: paths.features, label: 'Next: HDR & gaming →' }}
        />
      </section>
    </>
  )
}
