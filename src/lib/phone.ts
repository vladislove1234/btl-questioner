/**
 * Ukrainian phone mask: whatever is typed or pasted becomes `+380 XX XXX XX XX`.
 * A leading `380` or trunk `0` is dropped, so "067…" and "+38067…" both work.
 */
export function nationalDigits(input: string): string {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('380')) d = d.slice(3)
  else if (d.startsWith('0')) d = d.slice(1)
  return d.slice(0, 9)
}

export function formatPhone(input: string): string {
  const d = nationalDigits(input)
  if (!d) return ''
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  return `+380 ${parts.join(' ')}`
}

export const isValidPhone = (formatted: string) => nationalDigits(formatted).length === 9
