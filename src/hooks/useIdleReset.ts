import { useEffect } from 'react'

/** Calls `onIdle` after `ms` with no touch/keyboard input, so an abandoned session doesn't sit on screen. */
export function useIdleReset(active: boolean, ms: number, onIdle: () => void) {
  useEffect(() => {
    if (!active) return
    let timer = window.setTimeout(onIdle, ms)
    const bump = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(onIdle, ms)
    }
    const events = ['pointerdown', 'keydown'] as const
    events.forEach((e) => window.addEventListener(e, bump))
    return () => {
      window.clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, bump))
    }
  }, [active, ms, onIdle])
}
