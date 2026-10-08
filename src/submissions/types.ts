export interface Contact {
  name: string
  /** Formatted as `+380 XX XXX XX XX`. */
  phone: string
  company: string
}

export interface Submission extends Contact {
  /** Client-generated; the Apps Script dedups on it, so retries are safe. */
  id: string
  /** ISO time on the device at submit; the script renders it in Europe/Kyiv. */
  createdAt: string
  correct: number
  total: number
}
