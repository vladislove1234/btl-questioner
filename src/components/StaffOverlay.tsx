import { useEffect } from 'react'
import { usePendingCount } from '../hooks/usePendingCount'
import { flushQueue } from '../submissions/sync'
import { Button } from './Button'

/** Hidden staff check (SPEC §6.4): how many submissions are still waiting on this iPad. */
export function StaffOverlay({ onClose }: { onClose: () => void }) {
  const pending = usePendingCount()

  useEffect(() => void flushQueue(), [])

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-ink/60">
      <div className="rounded-[48px] bg-bg px-16 py-12 text-center">
        <p className="text-5xl font-bold">у черзі: {pending}</p>
        <Button className="mt-10" onClick={onClose}>
          Закрити
        </Button>
      </div>
    </div>
  )
}
