import { useSyncExternalStore } from 'react'

// Everything the site keeps in the visitor's browser goes through this module,
// and nothing is written until the visitor turns on "Remember on this device"
// (RememberToggle). Turning it off deletes everything the site saved, including
// the setting itself.

const PREFIX = 'screen-decoded:'
const CONSENT_KEY = `${PREFIX}consent`
const CHANGE_EVENT = 'app:consent-change'

/** What the switch remembers, for its description and the privacy notice. */
export const rememberedThings = 'your checklist ticks and your viewing distance unit choice'

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted'
  } catch {
    return false
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange) // switched on or off in another tab
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/** Whether the visitor has turned on "Remember on this device". */
export function useRememberOnDevice() {
  return useSyncExternalStore(subscribe, hasConsent)
}

/**
 * On: allow saving (pages then save what they show). Off: delete everything the
 * site saved, including the consent itself.
 */
export function setRememberOnDevice(on: boolean) {
  try {
    if (on) {
      localStorage.setItem(CONSENT_KEY, 'granted')
    } else {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith(PREFIX)) localStorage.removeItem(key)
      }
    }
  } catch {
    // Storage is blocked (private mode, disabled site data): nothing can be
    // saved, so the switch stays off.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/** A saved value, or null if there is none or remembering is switched off. */
export function loadSaved(name: string) {
  if (!hasConsent()) return null
  try {
    return localStorage.getItem(PREFIX + name)
  } catch {
    return null
  }
}

/** Saves a value, but only while remembering is switched on. */
export function save(name: string, value: string) {
  if (!hasConsent()) return
  try {
    localStorage.setItem(PREFIX + name, value)
  } catch {
    // Storage full or blocked: the value lasts for this visit only.
  }
}
