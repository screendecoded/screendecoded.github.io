import type { ReactNode } from 'react'
import { Link } from '../components/Link'
import { paths } from '../site'

export type Family = 'lcd' | 'oled' | 'emissive'

export const familyNames: Record<Family, string> = {
  lcd: 'LCD',
  oled: 'OLED',
  emissive: 'Self-emissive',
}

export type TvLabel = {
  name: string
  /** Small qualifier shown after the name, e.g. "(older)". */
  note?: string
  description: ReactNode
  usedBy: string
  family: Family
}

export const tvLabels: TvLabel[] = [
  { name: 'LED TV', description: 'An LCD TV with LED backlighting. Not a self-lit LED screen.', usedBy: 'Most brands', family: 'lcd' },
  { name: 'LCD TV', note: 'older', description: 'Older LCD TVs lit by fluorescent CCFL lamps.', usedBy: 'Legacy', family: 'lcd' },
  {
    name: 'QLED',
    description: 'Quantum-dot LCD. A color film that improves colors — says little about contrast.',
    usedBy: 'Samsung, TCL, Hisense and others',
    family: 'lcd',
  },
  {
    name: 'Mini LED',
    description: 'LCD with many miniaturized backlight LEDs, enabling finer local dimming.',
    usedBy: 'Most brands',
    family: 'lcd',
  },
  { name: 'NanoCell', description: 'LCD with a nanoparticle filter for purer colors.', usedBy: 'LG', family: 'lcd' },
  {
    name: 'QNED',
    description: 'LG’s LCD family, often Mini LED. Backlight and color system vary by model. Originally meant “quantum rod”.',
    usedBy: 'LG',
    family: 'lcd',
  },
  {
    name: 'ULED',
    description: '“Ultra LED.” Umbrella branding for Hisense LCD TVs, not a panel type.',
    usedBy: 'Hisense',
    family: 'lcd',
  },
  {
    name: 'SQD-Mini LED',
    description: '“Super Quantum Dot.” Mini LED LCD with a more precise blue backlight and enhanced filters.',
    usedBy: 'TCL',
    family: 'lcd',
  },
  {
    name: 'Mini RGB',
    description: 'The generally accepted name for an LCD backlit by red, green and blue Mini LEDs.',
    usedBy: 'Various',
    family: 'lcd',
  },
  {
    name: 'Micro RGB',
    description: (
      <>
        RGB-backlit LCD with somewhat smaller LEDs. Still Mini LED class — <strong>not</strong> MicroLED.
      </>
    ),
    usedBy: 'Samsung, LG',
    family: 'lcd',
  },
  { name: 'True RGB', description: 'Sony’s RGB-backlit LCD system.', usedBy: 'Sony', family: 'lcd' },
  {
    name: 'WOLED',
    description: 'White OLED with color filters and an extra white subpixel.',
    usedBy: 'LG, Sony, Panasonic, Philips and others',
    family: 'oled',
  },
  {
    name: 'QD-OLED',
    description: 'Blue OLED light turned into red and green by quantum dots.',
    usedBy: 'Samsung, Sony, Philips and others',
    family: 'oled',
  },
  {
    name: 'evo · MLA · Tandem',
    description: (
      <>
        Generations of LG’s WOLED panel. See <Link href={`${paths.technologies}#woled-refinements`}>WOLED refinements</Link>.
      </>
    ),
    usedBy: 'LG',
    family: 'oled',
  },
  {
    name: 'MicroLED',
    description: 'Tiny inorganic LEDs are the pixels themselves. No LCD layer, no backlight.',
    usedBy: 'Samsung and others, luxury',
    family: 'emissive',
  },
]
