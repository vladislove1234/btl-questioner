import type { Submission } from './types'

// Every submission is written here first and only removed after the server
// confirms it, so nothing is lost if the device is offline or the tab closes.
const KEY = 'btlq.pending'

type Listener = (pending: number) => void
const listeners = new Set<Listener>()

export function loadQueue(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as Submission[]
  } catch {
    return []
  }
}

function save(queue: Submission[]) {
  localStorage.setItem(KEY, JSON.stringify(queue))
  listeners.forEach((l) => l(queue.length))
}

export function enqueue(submission: Submission) {
  save([...loadQueue(), submission])
}

export function removeFromQueue(id: string) {
  save(loadQueue().filter((s) => s.id !== id))
}

export function subscribePending(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
