import { PageHero } from '../components/PageHero'
import { RememberToggle } from '../components/RememberToggle'
import { privacyContact, privacyUpdated } from '../site'
import './Privacy.css'

const githubPrivacyStatement =
  'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'

// Keep this in sync with what the site actually does: anything new that is saved
// on the device (consent.ts) or loaded from another server must be listed here.
export function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice"
        lead="The short version: no cookies, no tracking, no analytics and no ads. Nothing is saved on your device unless you switch it on."
      />

      <div className="container">
        <div className="privacy">
          <section aria-labelledby="who">
            <h2 id="who">Who is responsible</h2>
            <p>
              This site is run by {privacyContact.name}. For any question about privacy or your data, email{' '}
              <a href={`mailto:${privacyContact.email}`}>{privacyContact.email}</a>.
            </p>
          </section>

          <section aria-labelledby="not-collected">
            <h2 id="not-collected">What this site does not do</h2>
            <ul>
              <li>No cookies.</li>
              <li>No analytics, visitor statistics or tracking of any kind.</li>
              <li>No ads, no social media buttons and no embedded videos.</li>
              <li>No accounts, sign-ups or forms, so we never ask for your name or email.</li>
              <li>
                Everything, including the fonts, is served from this site itself. Your browser does not contact any
                other company’s servers while you read it.
              </li>
            </ul>
          </section>

          <section aria-labelledby="hosting">
            <h2 id="hosting">Hosting: what GitHub sees</h2>
            <p>
              The site is hosted on GitHub Pages, a service of GitHub, Inc. in the United States. Like any web server,
              GitHub’s servers receive your IP address and basic technical details, such as your browser type and the
              page you asked for, when you visit. GitHub logs this to deliver the site and keep the service secure.
            </p>
            <p>
              We don’t receive these logs and don’t use them. The legal basis is our legitimate interest in running the
              website securely (GDPR Article 6(1)(f)). How GitHub handles this data, including transfers outside the
              EU, is explained in the <a href={githubPrivacyStatement}>GitHub General Privacy Statement</a>.
            </p>
          </section>

          <section aria-labelledby="device">
            <h2 id="device">What can be saved on your device</h2>
            <p>
              Two features can remember your choices between visits: your <strong>checklist ticks</strong> and your{' '}
              <strong>viewing distance unit choice</strong> (metric or imperial). They are saved only if you turn on{' '}
              <strong>Remember on this device</strong>, and stay in your browser’s local storage. They are never sent
              to us or anyone else.
            </p>
            <p>
              The legal basis is your consent (GDPR Article 6(1)(a)). You can withdraw it at any time: turning the
              switch off deletes everything the site saved, including the setting itself. Clearing your browser’s site
              data does the same.
            </p>
            <RememberToggle showPrivacyLink={false} />
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights">Your rights</h2>
            <p>
              Under the GDPR you have the right to access, correct or delete personal data about you, to restrict or
              object to its use, and to withdraw consent at any time. We hold no personal data about visitors
              ourselves. For the hosting logs, contact us or GitHub.
            </p>
            <p>You can also complain to the data protection authority in the EU country where you live or work.</p>
          </section>

          <p className="privacy__updated">Last updated {privacyUpdated}</p>
        </div>
      </div>
    </>
  )
}
