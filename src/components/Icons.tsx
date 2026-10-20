type IconProps = { size?: number }

export function ArrowRight({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function LogoMark({ size = 34, stroke = '#FFFFFF' }: IconProps & { stroke?: string }) {
  return (
    <svg width={size} height={(size * 28) / 34} viewBox="0 0 34 28" aria-hidden="true">
      <rect x="1.5" y="1.5" width="31" height="19" rx="3" fill="none" stroke={stroke} strokeWidth="2" />
      <rect x="5" y="5" width="12" height="12" rx="1" fill="var(--lcd)" />
      <rect x="17" y="5" width="12" height="12" rx="1" fill="var(--oled)" />
      <path d="M12 26h10M17 21v5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
