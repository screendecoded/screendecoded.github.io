import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from '../router'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

// An <a> that navigates client-side for plain left clicks and leaves
// modified clicks (new tab, download, etc.) to the browser.
export function Link({ href, onClick, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target
    ) {
      return
    }
    event.preventDefault()
    navigate(href)
  }

  return <a {...rest} href={href} onClick={handleClick} />
}
