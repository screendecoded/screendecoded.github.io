import { useState } from 'react'
import './ContrastComparison.css'

// LCD vs OLED contrast, with an expandable editorial piece on infinite contrast.
export function ContrastComparison() {
  const [open, setOpen] = useState(false)

  return (
    <section aria-labelledby="contrast" className="container section">
      <h2 id="contrast" className="section-title">
        Contrast is where LCD and OLED differ most
      </h2>
      <p className="section-lead">
        <strong>Contrast ratio</strong> compares the brightest white a screen can show with its darkest black. Local
        dimming raises LCD contrast in parts of the picture, but only self-lit pixels can switch fully off.
      </p>

      <div className="grid grid--300">
        <article className="card contrast-card">
          <div
            className="contrast-card__screen contrast-card__screen--lcd"
            role="img"
            aria-label="LCD: white subtitles on a dark scene. The black around them is dark grey, with a faint glow."
          >
            <span className="contrast-card__subtitle" />
          </div>
          <div className="contrast-card__body">
            <p className="contrast-card__kind contrast-card__kind--lcd">Typical LCD</p>
            <p className="contrast-card__ratio">2,000:1</p>
            <p className="card-text">
              White is about 2,000 times brighter than black. The backlight never switches fully off, so black looks
              dark grey in a dark room. IPS panels are often nearer 1,000:1; VA panels reach several thousand to one.
            </p>
          </div>
        </article>

        <article className="card contrast-card">
          <div
            className="contrast-card__screen contrast-card__screen--oled"
            role="img"
            aria-label="OLED: the same white subtitles on true black, with no glow."
          >
            <span className="contrast-card__subtitle" />
          </div>
          <div className="contrast-card__body">
            <p className="contrast-card__kind contrast-card__kind--oled">OLED</p>
            <p className="contrast-card__ratio">
              <span aria-hidden="true">∞:1</span>
              <span className="visually-hidden">Infinite contrast</span>
            </p>
            <p className="card-text">
              Black pixels switch fully off and give no light at all, so black is truly black, even right next to a
              bright highlight.
            </p>
          </div>
        </article>
      </div>

      <button
        type="button"
        className="btn btn--dark contrast-toggle"
        aria-expanded={open}
        aria-controls="infinite-contrast"
        onClick={() => setOpen(!open)}
      >
        Why infinite contrast matters
        <svg
          className={`contrast-toggle__icon${open ? ' contrast-toggle__icon--open' : ''}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <article id="infinite-contrast" className="editorial" hidden={!open} aria-labelledby="infinite-contrast-title">
        <p className="editorial__label">Editorial · Based on experience</p>
        <h3 id="infinite-contrast-title" className="editorial__title">
          Why infinite contrast matters
        </h3>
        <div className="editorial__body">
          <p>
            Infinite contrast means pixels can switch fully off, so black is truly black, right next to bright
            highlights. Its importance cannot be overstated: it is the single biggest factor in a TV’s picture quality.
            OLED is the only technology that offers this at home at an affordable price today.
          </p>
          <p>
            One common question is whether to buy a top-end LCD TV instead of an OLED for everyday viewing. The answer
            is: it depends. How much do you value real black when the screen should be black, and the fine contrast
            between brightness and colors?
          </p>
          <p>
            If you have experienced infinite contrast before, it’s really hard to go back to a TV without it, even if
            that TV is otherwise great, like a top-of-the-line LCD TV. No matter how great the latest LCD TVs with RGB
            backlights are, they are still LCD TVs and lack infinite contrast.
          </p>
          <p>
            By now, most people have experienced infinite contrast in some form. Their phone’s screen is most likely
            self-emissive, like OLED, where every pixel makes its own light. If you want that amazing picture on your
            big screen, it has to be a self-emissive screen with infinite contrast. There’s no way around it.
          </p>
          <p>
            For now, infinite contrast comes with a risk of burn-in. That’s a decision you as the TV buyer have to make,
            and it’s the biggest decision of them all, because it alone decides what kind of viewing experience you get.
          </p>
          <p className="editorial__closing">
            This is also one of those things where you don’t know what you are missing until you have experienced it.
            Once you have, it’s really hard to go back.
          </p>
        </div>
      </article>
    </section>
  )
}
