export const siteName = 'Screen Decoded'
/** The published address, used for canonical links, link previews and the sitemap. */
export const siteUrl = 'https://screendecoded.github.io'

export const paths = {
  home: '/',
  technologies: '/technologies',
  backlights: '/backlights',
  labels: '/labels',
  features: '/features',
  smartTv: '/smart-tv',
  viewingDistance: '/viewing-distance',
  checklist: '/checklist',
} as const

export type Path = (typeof paths)[keyof typeof paths]

export type PageMeta = {
  /** Browser tab and search result title. Aim for 60 characters or fewer. */
  title: string
  /** Search result and link preview summary. Aim for about 150 characters. */
  description: string
}

// One entry per page. The build writes these into each page's HTML file, and the
// app uses the titles for the browser tab.
export const pageMeta: Record<Path, PageMeta> = {
  [paths.home]: {
    title: 'Screen Decoded — TV buying guide in plain language',
    description:
      'What QLED, QNED, Mini LED, OLED and other TV labels actually mean, explained in plain language so you can compare TVs with confidence.',
  },
  [paths.technologies]: {
    title: 'LCD, OLED and MicroLED explained — Screen Decoded',
    description:
      'From CRT and plasma to LCD, OLED and MicroLED: how each TV technology makes a picture, and how WOLED and QD-OLED differ.',
  },
  [paths.backlights]: {
    title: 'Local dimming, Mini LED and LCD panels — Screen Decoded',
    description:
      'Edge-lit, full-array and Mini LED local dimming, LCD vs OLED contrast, VA vs IPS panels, and glossy vs matte screens explained.',
  },
  [paths.labels]: {
    title: 'TV labels decoded: QLED, QNED, Mini LED — Screen Decoded',
    description:
      'What the marketing names on the box actually mean. Search 15 TV labels, from QLED and NanoCell to QD-OLED and MicroLED.',
  },
  [paths.features]: {
    title: 'HDR formats and TV gaming features — Screen Decoded',
    description:
      'HDR10, HDR10+, Dolby Vision and HLG compared, plus what 4K 120 Hz, VRR, ALLM and HGiG mean for gaming on a TV.',
  },
  [paths.smartTv]: {
    title: 'Smart TV platforms compared — Screen Decoded',
    description:
      'webOS, Tizen, Google TV, Roku, Fire TV and Titan OS: which smart TV software comes with which brand, and where Apple TV fits.',
  },
  [paths.viewingDistance]: {
    title: 'TV viewing distance calculator — Screen Decoded',
    description:
      'Find the ideal seating distance for any TV size, or the right screen size for your seat, with top and perspective views of your room.',
  },
  [paths.checklist]: {
    title: 'TV buying checklist — Screen Decoded',
    description:
      'Five questions to ask about every TV on your shortlist, plus tips for judging the picture in the shop. Tick them off and print.',
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Page not found — Screen Decoded',
  description: pageMeta[paths.home].description,
}

export const navItems = [
  { href: paths.technologies, label: 'Technologies' },
  { href: paths.backlights, label: 'Backlights & panels' },
  { href: paths.labels, label: 'Labels decoded' },
  { href: paths.features, label: 'HDR & gaming' },
  { href: paths.smartTv, label: 'Smart TV Platforms' },
  { href: paths.viewingDistance, label: 'Viewing distance' },
  { href: paths.checklist, label: 'Checklist' },
]

export const lastUpdated = 'October 2026'
