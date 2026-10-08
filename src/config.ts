export const config = {
  submitUrl: import.meta.env.VITE_SUBMIT_URL ?? '',
  submitToken: import.meta.env.VITE_SUBMIT_TOKEN ?? '',
  /** Idle time before a half-finished session (questions, form) resets to the Intro. */
  idleResetMs: Number(import.meta.env.VITE_IDLE_RESET_SECONDS ?? 90) * 1000,
  /** The Thanks screen returns to the Intro sooner, leaving time to scan the QR. */
  thanksResetMs: 60_000,
  syncIntervalMs: 60_000,
}
