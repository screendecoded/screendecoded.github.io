// Viewing distance maths for 16:9 screens. The ideal seat is where the screen
// width fills IDEAL_ANGLE_DEG of the viewer's horizontal field of view.

export const IDEAL_ANGLE_DEG = 46
/** Within ±10% of the ideal distance counts as the green zone. */
export const GREEN_ZONE = 0.1
/** Beyond ±25% of the ideal distance is "too close" / "too far". */
export const OUTER_ZONE = 0.25

export const CM_PER_INCH = 2.54
const DIAGONAL_16_9 = Math.hypot(16, 9)
const HALF_ANGLE_TAN = Math.tan(((IDEAL_ANGLE_DEG / 2) * Math.PI) / 180)

export function screenSizeCm(diagonalIn: number) {
  const unit = (diagonalIn * CM_PER_INCH) / DIAGONAL_16_9
  return { width: 16 * unit, height: 9 * unit }
}

export function idealDistanceCm(diagonalIn: number) {
  return screenSizeCm(diagonalIn).width / 2 / HALF_ANGLE_TAN
}

/** Horizontal angle the screen fills, seen from straight in front. */
export function viewingAngleDeg(diagonalIn: number, distanceCm: number) {
  return (2 * Math.atan(screenSizeCm(diagonalIn).width / 2 / distanceCm) * 180) / Math.PI
}

/** Screen diagonal (inches) that would be ideal from this distance. */
export function idealDiagonalIn(distanceCm: number) {
  return (2 * distanceCm * HALF_ANGLE_TAN * DIAGONAL_16_9) / (16 * CM_PER_INCH)
}

export type Fit = 'too-close' | 'bit-close' | 'ideal' | 'bit-far' | 'too-far'

export function fitFor(distanceCm: number, idealCm: number): Fit {
  const ratio = distanceCm / idealCm
  if (ratio < 1 - OUTER_ZONE) return 'too-close'
  if (ratio < 1 - GREEN_ZONE) return 'bit-close'
  if (ratio <= 1 + GREEN_ZONE) return 'ideal'
  if (ratio <= 1 + OUTER_ZONE) return 'bit-far'
  return 'too-far'
}

export type Units = 'metric' | 'imperial'

/** Short form for display: "1.70 m" or "5′7″". */
export function formatDistance(cm: number, units: Units) {
  if (units === 'metric') return `${(cm / 100).toFixed(2)} m`
  const inches = Math.round(cm / CM_PER_INCH)
  return `${Math.floor(inches / 12)}′${inches % 12}″`
}

/** Long form for screen readers: "1.70 metres" or "5 feet 7 inches". */
export function speakDistance(cm: number, units: Units) {
  if (units === 'metric') return `${(cm / 100).toFixed(2)} metres`
  const inches = Math.round(cm / CM_PER_INCH)
  return `${Math.floor(inches / 12)} feet ${inches % 12} inches`
}
