import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RainbowSlideKid, StorybookCloud } from './StoryKids'
import { getFlowingStreamGeometry } from '../lib/rainbowGeometry'
import './RainbowStream.css'

const SITE_CLOUDS = [
  { top: '2%', width: 215, variant: 'white', dir: 'rtl', duration: '44s', delay: '-8s' },
  { top: '8%', width: 190, variant: 'dashed', dir: 'ltr', duration: '52s', delay: '-22s' },
  { top: '16%', width: 235, variant: 'white', dir: 'ltr', duration: '40s', delay: '-14s' },
  { top: '24%', width: 205, variant: 'sunny', dir: 'rtl', duration: '48s', delay: '-30s' },
  { top: '33%', width: 225, variant: 'white', dir: 'ltr', duration: '46s', delay: '-5s' },
  { top: '42%', width: 240, variant: 'white', dir: 'rtl', duration: '38s', delay: '-19s' },
  { top: '52%', width: 200, variant: 'dashed', dir: 'ltr', duration: '54s', delay: '-36s' },
  { top: '62%', width: 225, variant: 'white', dir: 'rtl', duration: '42s', delay: '-12s' },
  { top: '72%', width: 235, variant: 'sunny', dir: 'ltr', duration: '50s', delay: '-27s' },
  { top: '83%', width: 220, variant: 'white', dir: 'rtl', duration: '45s', delay: '-16s' },
  { top: '93%', width: 255, variant: 'white', dir: 'ltr', duration: '56s', delay: '-34s' },
]

export default function RainbowStream() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const slideKidRef = useRef(null)

  const [geometry, setGeometry] = useState(null)

  // Measure real wrapper pixel size so sweeping curves keep crisp 1:1 round thickness
  useLayoutEffect(() => {
    const measure = () => {
      const wrapEl = wrapRef.current
      const parentEl = wrapEl?.parentElement
      if (!parentEl) return

      const wrapW = parentEl.clientWidth
      const wrapH = parentEl.scrollHeight
      if (!wrapW || !wrapH) return

      setGeometry(getFlowingStreamGeometry(wrapW, wrapH))
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (wrapRef.current?.parentElement) {
      observer.observe(wrapRef.current.parentElement)
    }
    window.addEventListener('resize', measure)
    const timer = setTimeout(measure, 400)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      clearTimeout(timer)
    }
  }, [])

  // Keep a cheerful child visibly sliding smoothly along the top edge of the curved rainbow as user scrolls
  useEffect(() => {
    if (!geometry) return undefined
    let rafId = null
    let currentY = -1

    const updateKidPosition = () => {
      const wrapEl = wrapRef.current
      const pathEl = trackRef.current
      const kidEl = slideKidRef.current

      if (wrapEl && pathEl && kidEl && typeof pathEl.getTotalLength === 'function') {
        const rect = wrapEl.getBoundingClientRect()
        const wrapH = geometry.height
        const wrapW = geometry.width

        if (wrapH > 0 && wrapW > 0) {
          const viewportTargetY = window.innerHeight * 0.48 - rect.top
          const targetY = Math.max(0, Math.min(wrapH, viewportTargetY))

          if (currentY < 0) currentY = targetY
          else currentY += (targetY - currentY) * 0.16

          const visibleProgress = Math.max(0, Math.min(1, viewportTargetY / 180))
          const exitOpacity = viewportTargetY > wrapH - 90 ? Math.max(0, (wrapH - viewportTargetY) / 90) : 1
          const finalOpacity = visibleProgress * exitOpacity

          const totalLen = pathEl.getTotalLength()
          let lo = 0
          let hi = totalLen
          for (let step = 0; step < 14; step++) {
            const mid = (lo + hi) * 0.5
            const ptMid = pathEl.getPointAtLength(mid)
            if (ptMid.y < currentY) lo = mid
            else hi = mid
          }

          const bestDist = (lo + hi) * 0.5
          const pt = pathEl.getPointAtLength(bestDist)
          const ptPrev = pathEl.getPointAtLength(Math.max(0, bestDist - 14))
          const ptNext = pathEl.getPointAtLength(Math.min(totalLen, bestDist + 14))

          const dxPx = ptNext.x - ptPrev.x
          const dyPx = ptNext.y - ptPrev.y
          const facingLeft = dxPx < -1
          const horizRatio = Math.min(1, Math.abs(dxPx) / (Math.abs(dyPx) + Math.abs(dxPx) + 1))
          const rimLiftPx = horizRatio * 46
          const slopeDeg = Math.min(26, Math.max(4, ((Math.atan2(dyPx, Math.abs(dxPx)) * 180) / Math.PI) * 0.45))

          kidEl.style.left = `${pt.x.toFixed(1)}px`
          kidEl.style.top = `${(pt.y - rimLiftPx).toFixed(1)}px`
          kidEl.style.opacity = finalOpacity.toFixed(2)
          kidEl.style.transform = `translate(-50%, -74%) scaleX(${facingLeft ? -1 : 1}) rotate(${slopeDeg.toFixed(1)}deg)`
        }
      }

      rafId = requestAnimationFrame(updateKidPosition)
    }

    rafId = requestAnimationFrame(updateKidPosition)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [geometry])

  return (
    <div ref={wrapRef} className="rainbow-stream" aria-hidden="true">
      {/* Fluffy Storybook Clouds Gliding Horizontally Throughout Every Section */}
      <div className="rainbow-stream__clouds">
        {SITE_CLOUDS.map((cloud, idx) => (
          <div
            key={idx}
            className={`rs-cloud rs-cloud--${cloud.dir}`}
            style={{
              top: cloud.top,
              width: `${cloud.width}px`,
              animationDuration: cloud.duration,
              animationDelay: cloud.delay,
            }}
          >
            <StorybookCloud variant={cloud.variant} />
          </div>
        ))}
      </div>

      {geometry && (
        <svg
          className="rainbow-stream__svg"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path id="fullRainbowMotionPath" d={geometry.trackPath} />
          </defs>

          <path ref={trackRef} d={geometry.trackPath} stroke="none" fill="none" />

          {/* Exact 1:1 Scale Smooth Parallel Sweeping Rainbow Stripes */}
          {geometry.bandPaths.map((band) => (
            <g key={band.color}>
              <path
                d={band.d}
                stroke={band.color}
                strokeWidth="21"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.94"
              />
              <path
                d={band.d}
                stroke="#ffffff"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="48 230"
                className="rainbow-stream__streak"
                style={{ animationDelay: band.delay }}
              />
            </g>
          ))}

          {/* Animated Paper Airplane Kid gliding continuously along the curved rainbow */}
          <g>
            <animateMotion dur="24s" repeatCount="indefinite" rotate="auto">
              <mpath href="#fullRainbowMotionPath" />
            </animateMotion>
            <g transform="translate(-26, -20) scale(0.85)">
              <polygon points="6,28 66,12 32,44" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
              <polygon points="32,44 66,12 24,26" fill="#e0f2fe" />
              <circle cx="36" cy="18" r="7.5" fill="#fed7aa" />
              <path d="M29,14 Q36,8 43,14 Z" fill="#f43f5e" />
              <circle cx="34" cy="17" r="1.2" fill="#1e293b" />
              <circle cx="39" cy="17" r="1.2" fill="#1e293b" />
            </g>
          </g>

          {/* Animated Star Rider traveling offset along the rainbow */}
          <g>
            <animateMotion dur="18s" begin="6s" repeatCount="indefinite">
              <mpath href="#fullRainbowMotionPath" />
            </animateMotion>
            <polygon
              points="0,-16 4.5,-5 16,-4 7,4 9.5,16 0,9.5 -9.5,16 -7,4 -16,-4 -4.5,-5"
              fill="#fbbf24"
              stroke="#ea580c"
              strokeWidth="2"
            />
          </g>
        </svg>
      )}

      {/* Joyful Child Sliding Smoothly Along the Thick Curved Website Rainbow */}
      <div ref={slideKidRef} className="rainbow-stream__slide-kid">
        <RainbowSlideKid />
      </div>
    </div>
  )
}
