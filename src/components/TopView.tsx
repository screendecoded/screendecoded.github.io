import {
  GREEN_ZONE,
  IDEAL_ANGLE_DEG,
  OUTER_ZONE,
  formatDistance,
  idealDistanceCm,
  screenSizeCm,
  speakDistance,
  viewingAngleDeg,
  type Units,
} from '../viewing'

// Floor plan, TV at the top, viewer below, drawn in a fixed-size frame. The
// scale adapts: the frame always fits the TV, the green zone and the "a bit
// far" margin, so the seat moves within that range; sitting farther back
// zooms the whole scene out to keep the seat in frame.
const WIDTH = 480
const HEIGHT = 330
const CENTER_X = WIDTH / 2
const TV_Y = 56
/** Room below the seat point for the head, sofa and angle label. */
const SEAT_SPACE = 36
const MAX_TV_PX = 300

type TopViewProps = { diagonalIn: number; distanceCm: number; units: Units }

export function TopView({ diagonalIn, distanceCm, units }: TopViewProps) {
  const ideal = idealDistanceCm(diagonalIn)
  const angle = viewingAngleDeg(diagonalIn, distanceCm)
  const tvWidthCm = screenSizeCm(diagonalIn).width
  const extentCm = Math.max(distanceCm, ideal * (1 + OUTER_ZONE))
  const pxPerCm = Math.min((HEIGHT - TV_Y - SEAT_SPACE) / extentCm, MAX_TV_PX / tvWidthCm)
  const y = (cm: number) => TV_Y + cm * pxPerCm
  const halfTv = (tvWidthCm * pxPerCm) / 2
  const seatY = y(distanceCm)
  const idealY = y(ideal)
  const zoneTop = y(ideal * (1 - GREEN_ZONE))
  const zoneBottom = y(ideal * (1 + GREEN_ZONE))
  const dimX = WIDTH - 22

  const label =
    `Top view. A ${diagonalIn}-inch TV with the seat ${speakDistance(distanceCm, units)} away, ` +
    `where the screen fills ${Math.round(angle)} degrees of view. ` +
    `The ideal ${IDEAL_ANGLE_DEG}-degree seat is ${speakDistance(ideal, units)} away, ` +
    `with a green zone from ${speakDistance(ideal * (1 - GREEN_ZONE), units)} to ${speakDistance(ideal * (1 + GREEN_ZONE), units)}.`

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="viz viz--top" role="img" aria-label={label}>
      <rect width={WIDTH} height={HEIGHT} fill="var(--viz-floor)" />
      <rect width={WIDTH} height={TV_Y - 12} fill="var(--stone)" />
      <text x={12} y={28} className="viz__label viz__label--muted">
        Wall
      </text>

      {/* Green zone band and ideal line */}
      <rect x={0} y={zoneTop} width={WIDTH} height={zoneBottom - zoneTop} fill="var(--zone-tint)" />
      <line x1={0} x2={WIDTH} y1={zoneTop} y2={zoneTop} stroke="var(--zone-line)" strokeWidth={1} />
      <line x1={0} x2={WIDTH} y1={zoneBottom} y2={zoneBottom} stroke="var(--zone-line)" strokeWidth={1} />
      <text x={dimX - 14} y={zoneBottom - 6} textAnchor="end" className="viz__label viz__label--zone">
        Green zone
      </text>
      <polygon
        points={`${CENTER_X},${idealY} ${CENTER_X - halfTv},${TV_Y} ${CENTER_X + halfTv},${TV_Y}`}
        fill="none"
        stroke="var(--oled)"
        strokeWidth={2}
        strokeDasharray="6 5"
      />
      <line x1={0} x2={WIDTH} y1={idealY} y2={idealY} stroke="var(--oled)" strokeWidth={2} strokeDasharray="6 5" />
      <text x={12} y={idealY - 8} className="viz__label viz__label--ideal">
        Ideal {IDEAL_ANGLE_DEG}° · {formatDistance(ideal, units)}
      </text>

      {/* Your seat: sightlines to the screen edges */}
      <polygon
        points={`${CENTER_X},${seatY} ${CENTER_X - halfTv},${TV_Y} ${CENTER_X + halfTv},${TV_Y}`}
        fill="var(--viz-sight)"
        stroke="var(--lcd)"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <rect x={CENTER_X - 36} y={seatY + 12} width={72} height={14} rx={5} fill="var(--ink-hover)" />
      <circle cx={CENTER_X} cy={seatY + 4} r={9} fill="var(--ink)" />
      <text x={CENTER_X + 46} y={seatY + 24} className="viz__label viz__label--angle">
        {Math.round(angle)}°
      </text>

      {/* The TV */}
      <rect x={CENTER_X - halfTv} y={TV_Y - 6} width={halfTv * 2} height={7} rx={2} fill="var(--ink)" />
      <text x={CENTER_X} y={TV_Y - 16} textAnchor="middle" className="viz__label viz__label--strong">
        {diagonalIn}″ TV
      </text>

      {/* Distance dimension */}
      <line x1={dimX} x2={dimX} y1={TV_Y} y2={seatY} stroke="var(--text-strong)" strokeWidth={1.5} />
      <line x1={dimX - 6} x2={dimX + 6} y1={TV_Y} y2={TV_Y} stroke="var(--text-strong)" strokeWidth={1.5} />
      <line x1={dimX - 6} x2={dimX + 6} y1={seatY} y2={seatY} stroke="var(--text-strong)" strokeWidth={1.5} />
      <text
        x={dimX + 14}
        y={(TV_Y + seatY) / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${dimX + 14} ${(TV_Y + seatY) / 2})`}
        className="viz__label viz__label--strong"
      >
        {formatDistance(distanceCm, units)}
      </text>
    </svg>
  )
}
