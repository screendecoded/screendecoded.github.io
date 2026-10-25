import { useId } from 'react'
import { rememberedThings, setRememberOnDevice, useRememberOnDevice } from '../consent'
import { paths } from '../site'
import { Link } from './Link'
import './RememberToggle.css'

// The opt-in switch for saving anything in the visitor's browser. Off by
// default; turning it off deletes what was saved.
export function RememberToggle({ showPrivacyLink = true }: { showPrivacyLink?: boolean }) {
  const on = useRememberOnDevice()
  const labelId = useId()
  const descriptionId = useId()

  return (
    <div className={`remember-toggle no-print${on ? ' remember-toggle--on' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className="remember-toggle__switch"
        onClick={() => setRememberOnDevice(!on)}
      >
        <span className="remember-toggle__knob" />
      </button>
      <div className="remember-toggle__text">
        <p id={labelId} className="remember-toggle__label">
          Remember on this device
        </p>
        <p id={descriptionId} className="remember-toggle__description">
          {on
            ? `Saving ${rememberedThings} in this browser. Turn off to delete them.`
            : `Turn on to save ${rememberedThings} in this browser. Nothing is saved until you do, and nothing is ever sent anywhere.`}
        </p>
        {showPrivacyLink && (
          <p className="remember-toggle__more">
            <Link href={paths.privacy + '#device'}>How this works</Link>
          </p>
        )}
      </div>
    </div>
  )
}
