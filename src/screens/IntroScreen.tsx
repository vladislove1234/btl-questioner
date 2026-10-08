import { useRef, type CSSProperties } from 'react'
import { asset } from '../lib/asset'

const STAFF_HOLD_MS = 5000

/*
 * Recreates design/intro-mockup.svg. Positions are the mockup's own coordinates,
 * converted to container-width units (cqw) so the whole composition scales as one
 * piece: the text block is 4467 mockup units wide = 100cqw. Text tops are
 * baseline − 0.9em, since Work Sans' hhea metrics (1000/−200) put the baseline
 * 0.9em below the top of a line-height:1 box.
 */
const at = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({
  position: 'absolute',
  left: `${left}cqw`,
  top: `${top}cqw`,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  ...extra,
})

const s = {
  frame: { width: 'min(70vw, 140vh)', aspectRatio: '4467 / 2405', containerType: 'inline-size' },
  line1: at(-0.54, -0.43, { fontSize: '12.09cqw', letterSpacing: '0.015em' }),
  line2: at(-0.54, 15.18, { fontSize: '12.09cqw', letterSpacing: '0.015em' }),
  vid: at(36.04, 20.17, { fontSize: '6.51cqw' }),
  logo: at(52.7, 14.95, { width: '47.3cqw' }),
  badge: at(87.76, 24.02, { width: '28.43cqw' }),
  cta: at(50, 50.23, { fontSize: '3.29cqw', transform: 'translateX(-50%)' }),
} satisfies Record<string, CSSProperties>

interface Props {
  onStart: () => void
  onStaff: () => void
}

export function IntroScreen({ onStart, onStaff }: Props) {
  const timer = useRef<number | undefined>(undefined)
  // Set when a hold opened the staff check, so the click that ends the hold doesn't start the test.
  const held = useRef(false)

  const startHold = () => {
    timer.current = window.setTimeout(() => {
      held.current = true
      onStaff()
    }, STAFF_HOLD_MS)
  }
  const cancelHold = () => window.clearTimeout(timer.current)

  const handleClick = () => {
    if (held.current) return
    onStart()
  }

  return (
    <div
      className="flex min-h-dvh cursor-pointer items-center justify-center overflow-hidden landscape:pt-[22vh]"
      onPointerDownCapture={() => (held.current = false)}
      onClick={handleClick}
    >
      <div className="relative" style={s.frame}>
        <h1 className="font-bold uppercase">
          <span style={s.line1}>Рієлторський</span>
          <span style={s.line2}>Тест</span>
          <span style={s.vid} className="normal-case">
            від
          </span>
        </h1>
        <img src={asset('images/logo-stacked.svg')} alt="Будинки та люди" style={s.logo} />
        <img
          src={asset('images/badge.svg')}
          alt=""
          style={s.badge}
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
          onContextMenu={(e) => e.preventDefault()}
        />
        <p className="font-medium" style={s.cta}>
          натисніть, щоб почати
        </p>
      </div>
    </div>
  )
}
