import { useEffect, useState } from 'react'
import { loadQueue, subscribePending } from '../submissions/queue'

export function usePendingCount(): number {
  const [count, setCount] = useState(() => loadQueue().length)
  useEffect(() => subscribePending(setCount), [])
  return count
}
