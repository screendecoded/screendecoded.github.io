import { IDEAL_ANGLE_DEG, idealDistanceCm, screenSizeCm, viewingAngleDeg } from '../viewing'

// One-point perspective from the viewer's eyes, looking straight at a TV on
// the back wall. Sizes are true projections: an object of size S at distance D
// appears FOCAL * S / D across, so the screen grows as you sit closer.
const WIDTH = 480
const HEIGHT = 300
const HORIZON_Y = 140
const CAMERA_FOV_DEG = 80
const FOCAL = WIDTH / 2 / Math.tan(((CAMERA_FOV_DEG / 2) * Math.PI) / 180)

const EYE_HEIGHT_CM = 110
const TV_CENTER_CM = 100
const ROOM_HALF_WIDTH_CM = 230
const ROOM_HEIGHT_CM = 260
const NEAR_CM = 15

function project(x: number, height: number, depth: number) {
  return [WIDTH / 2 + (FOCAL * x) / depth, HORIZON_Y - (FOCAL * (height - EYE_HEIGHT_CM)) / depth] as const
}

function points(...corners: (readonly [number, number])[]) {
  return corners.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
}

function screenRect(widthCm: number, heightCm: number, depth: number) {
  const [left, top] = project(-widthCm / 2, TV_CENTER_CM + heightCm / 2, depth)
  const [right, bottom] = project(widthCm / 2, TV_CENTER_CM - heightCm / 2, depth)
  return { x: left, y: top, width: right - left, height: bottom - top }
}

type PerspectiveViewProps = { diagonalIn: number; distanceCm: number }

export function PerspectiveView({ diagonalIn, distanceCm }: PerspectiveViewProps) {
  const { width, height } = screenSizeCm(diagonalIn)
  const ideal = idealDistanceCm(diagonalIn)
  const angle = viewingAngleDeg(diagonalIn, distanceCm)
  const d = distanceCm

  // Back wall corners, and the same corners just in front of the viewer, so the
  // floor, ceiling and side walls run out of the frame towards the viewer.
  const back = {
    tl: project(-ROOM_HALF_WIDTH_CM, ROOM_HEIGHT_CM, d),
    tr: project(ROOM_HALF_WIDTH_CM, ROOM_HEIGHT_CM, d),
    bl: project(-ROOM_HALF_WIDTH_CM, 0, d),
    br: project(ROOM_HALF_WIDTH_CM, 0, d),
  }
  const near = {
    tl: project(-ROOM_HALF_WIDTH_CM, ROOM_HEIGHT_CM, NEAR_CM),
    tr: project(ROOM_HALF_WIDTH_CM, ROOM_HEIGHT_CM, NEAR_CM),
    bl: project(-ROOM_HALF_WIDTH_CM, 0, NEAR_CM),
    br: project(ROOM_HALF_WIDTH_CM, 0, NEAR_CM),
  }

  const screen = screenRect(width, height, d)
  const idealScreen = screenRect(width, height, ideal)
  const bezel = Math.max(2, (FOCAL * 1.2) / d)

  const label =
    `View from your seat. The ${diagonalIn}-inch screen fills ${Math.round(angle)} degrees of your view. ` +
    `A dashed outline shows how big it would look from the ideal ${IDEAL_ANGLE_DEG}-degree distance.`

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="viz viz--perspective" role="img" aria-label={label}>
      <defs>
        <linearGradient id="viz-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1A2340" />
          <stop offset="1" stopColor="#0E1014" />
        </linearGradient>
      </defs>
      <polygon points={points(near.tl, near.tr, back.tr, back.tl)} fill="var(--viz-ceiling)" />
      <polygon points={points(near.bl, near.br, back.br, back.bl)} fill="var(--viz-floor-3d)" />
      <polygon points={points(near.tl, back.tl, back.bl, near.bl)} fill="var(--viz-side-wall)" />
      <polygon points={points(near.tr, back.tr, back.br, near.br)} fill="var(--viz-side-wall)" />
      <polygon
        points={points(back.tl, back.tr, back.br, back.bl)}
        fill="var(--viz-back-wall)"
        stroke="var(--line)"
        strokeWidth={1}
      />

      <rect
        x={screen.x - bezel}
        y={screen.y - bezel}
        width={screen.width + bezel * 2}
        height={screen.height + bezel * 2}
        rx={Math.min(6, bezel * 2)}
        fill="var(--ink)"
      />
      <rect x={screen.x} y={screen.y} width={screen.width} height={screen.height} fill="url(#viz-screen)" />
      <rect
        x={idealScreen.x}
        y={idealScreen.y}
        width={idealScreen.width}
        height={idealScreen.height}
        fill="none"
        stroke="var(--oled)"
        strokeWidth={2.5}
        strokeDasharray="8 6"
      />
    </svg>
  )
}
