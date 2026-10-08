import { config } from '../config'
import { loadQueue, removeFromQueue } from './queue'
import type { Submission } from './types'

export type Sender = (submission: Submission) => Promise<void>

/**
 * POSTs to the Apps Script web app. The body is sent as text/plain (fetch's
 * default for a string body) so the browser skips the CORS preflight, which
 * Apps Script cannot answer.
 */
export const sendToSheet: Sender = async (submission) => {
  if (!config.submitUrl) throw new Error('VITE_SUBMIT_URL is not set')
  const res = await fetch(config.submitUrl, {
    method: 'POST',
    body: JSON.stringify({ token: config.submitToken, submission }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as { ok: boolean; error?: string }
  if (!data.ok) throw new Error(data.error ?? 'Rejected by server')
}

let inFlight: Promise<void> | null = null

/** Sends queued submissions oldest-first; stops at the first failure and retries on the next flush. */
export function flushQueue(send: Sender = sendToSheet): Promise<void> {
  inFlight ??= (async () => {
    try {
      for (const submission of loadQueue()) {
        await send(submission)
        removeFromQueue(submission.id)
      }
    } catch (err) {
      console.warn('[sync] flush stopped:', err)
    } finally {
      inFlight = null
    }
  })()
  return inFlight
}

/** Flushes now, whenever the device comes back online, and on a timer. Returns a cleanup function. */
export function startSync(): () => void {
  const flush = () => void flushQueue()
  flush()
  window.addEventListener('online', flush)
  const timer = window.setInterval(flush, config.syncIntervalMs)
  return () => {
    window.removeEventListener('online', flush)
    window.clearInterval(timer)
  }
}
