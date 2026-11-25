// ====================================================================
// SMOOTH CURVED OFFSET RAINBOW GEOMETRY
// Computes true unit-normal offset curves in exact 1:1 CSS pixels so Hero
// and RainbowStream meet seamlessly with zero notch, gap, or pinching.
// ====================================================================

export const RAINBOW_COLORS = [
  { color: '#ed1c24', offset: -50, delay: '0s' },
  { color: '#ea580c', offset: -30, delay: '0.25s' },
  { color: '#f59e0b', offset: -10, delay: '0.5s' },
  { color: '#16a34a', offset: 10, delay: '0.75s' },
  { color: '#0ea5e9', offset: 30, delay: '1.0s' },
  { color: '#a855f7', offset: 50, delay: '1.25s' },
]

function evalCubic(p0, p1, p2, p3, t) {
  const u = 1 - t
  const uu = u * u
  const tt = t * t
  return {
    x: u * uu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + tt * t * p3.x,
    y: u * uu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + tt * t * p3.y,
  }
}

export function pointsToSmoothSvgPath(pts) {
  if (!pts || pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]

    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

export function buildOffsetPathFromPoints(pts, offsetPx, scaleY = 1) {
  const offsetPts = pts.map((pt, i) => {
    const prev = pts[Math.max(0, i - 1)]
    const next = pts[Math.min(pts.length - 1, i + 1)]
    const dx = next.x - prev.x
    const dy = (next.y - prev.y) * scaleY
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    return {
      x: pt.x + offsetPx * nx,
      y: pt.y + (offsetPx * ny) / scaleY,
    }
  })
  return pointsToSmoothSvgPath(offsetPts)
}

// Smooth Hero rainbow geometry measured in exact 1:1 CSS pixels (wrapW x wrapH)
// Curves diagonally down-left across y = wrapH to join RainbowStream with zero vertical straight segment
export function getHeroRainbowGeometry(wrapW = 1440, wrapH = 720) {
  const xSeam = (1228 / 1440) * wrapW
  const mSeam = -0.58 * (wrapW / 1440)
  const h1 = wrapH * 0.11
  const segments = [
    [
      { x: -70, y: wrapH * 0.15 },
      { x: wrapW * 0.08, y: wrapH * 0.18 },
      { x: wrapW * 0.115, y: wrapH * 0.70 },
      { x: wrapW * 0.30, y: wrapH * 0.75 },
    ],
    [
      { x: wrapW * 0.30, y: wrapH * 0.75 },
      { x: wrapW * 0.485, y: wrapH * 0.80 },
      { x: wrapW * 0.70, y: wrapH * 0.68 },
      { x: wrapW * 0.805, y: wrapH * 0.76 },
    ],
    [
      { x: wrapW * 0.805, y: wrapH * 0.76 },
      { x: wrapW * 0.875, y: wrapH * 0.813 },
      { x: xSeam - mSeam * h1, y: wrapH - h1 },
      { x: xSeam, y: wrapH },
    ],
  ]

  const centerPts = []
  const stepsPerSeg = 26
  segments.forEach((seg, segIdx) => {
    const startStep = segIdx === 0 ? 0 : 1
    for (let s = startStep; s <= stepsPerSeg; s++) {
      centerPts.push(evalCubic(seg[0], seg[1], seg[2], seg[3], s / stepsPerSeg))
    }
  })
  centerPts.push({ x: xSeam + mSeam * 28, y: wrapH + 28 })

  return {
    width: wrapW,
    height: wrapH,
    trackPath: pointsToSmoothSvgPath(centerPts),
    sliderPath: buildOffsetPathFromPoints(centerPts, -62, 1),
    bandPaths: RAINBOW_COLORS.map((b) => ({
      ...b,
      d: buildOffsetPathFromPoints(centerPts, b.offset, 1),
    })),
  }
}

// Sweeping organic full-site S-curve rainbow in exact 1:1 CSS pixels
// Enters along the exact Hero seam tangent (mSeam) and curves leftward with zero vertical pipe
export function getFlowingStreamGeometry(wrapW, wrapH) {
  if (!wrapW || !wrapH) return null

  const xSeam = (1228 / 1440) * wrapW
  const mSeam = -0.58 * (wrapW / 1440)
  const dY = wrapH * 0.075

  // Smooth C1 entry cubic matching Hero's bottom exit angle at y = 2 (overlapping Hero by 2px)
  const q0 = { x: xSeam, y: 2 }
  const q1 = { x: xSeam + mSeam * dY, y: 2 + dY }
  const q2 = { x: wrapW * 0.22, y: wrapH * 0.095 }
  const q3 = { x: wrapW * 0.22, y: wrapH * 0.19 }

  const centerPts = []
  const entrySteps = 26
  for (let s = -2; s <= entrySteps; s++) {
    centerPts.push(evalCubic(q0, q1, q2, q3, s / entrySteps))
  }

  const keyframes = [
    q3,
    { y: wrapH * 0.31, x: wrapW * 0.78 },
    { y: wrapH * 0.44, x: wrapW * 0.16 },
    { y: wrapH * 0.56, x: wrapW * 0.84 },
    { y: wrapH * 0.68, x: wrapW * 0.24 },
    { y: wrapH * 0.81, x: wrapW * 0.80 },
    { y: wrapH * 0.92, x: wrapW * 0.34 },
    { y: wrapH + 24, x: wrapW * 0.5 },
  ]

  const samplesPerSpan = 22
  for (let k = 0; k < keyframes.length - 1; k++) {
    const a = keyframes[k]
    const b = keyframes[k + 1]
    for (let s = 1; s <= samplesPerSpan; s++) {
      const u = s / samplesPerSpan
      const y = a.y + (b.y - a.y) * u
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * u)
      const x = a.x + (b.x - a.x) * eased
      centerPts.push({ x, y })
    }
  }

  return {
    width: wrapW,
    height: wrapH,
    trackPath: pointsToSmoothSvgPath(centerPts),
    bandPaths: RAINBOW_COLORS.map((b) => ({
      ...b,
      d: buildOffsetPathFromPoints(centerPts, b.offset, 1),
    })),
  }
}
