import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  eyebrowTone?: 'lcd' | 'oled'
  title: string
  lead: string
  children?: ReactNode
}

// The dark chapter header shared by every page except Home.
export function PageHero({ eyebrow, eyebrowTone = 'lcd', title, lead, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <p className={`eyebrow page-hero__eyebrow page-hero__eyebrow--${eyebrowTone}`}>{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lead">{lead}</p>
        {children}
      </div>
    </section>
  )
}
