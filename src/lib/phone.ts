/**
 * Ukrainian phone input. The `+380` prefix is shown as fixed text next to the field, so the
 * field itself only holds the 9 national digits, shown as `XX XXX XX XX`. People usually start
 * with the trunk `0` ("067…"); it's accepted and dropped. A pasted full number (`+38067…`)
 * works too.
 */
export function nationalDigits(input: string): string {
  let d = input.replace(/\D/g, '')
  if (d.length > 9 && d.startsWith('380')) d = d.slice(3)
  if (d.startsWith('0')) d = d.slice(1)
  return d.slice(0, 9)
}

/** National part for the input field: `67 123 45 67`. */
export function formatNational(input: string): string {
  const d = nationalDigits(input)
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ')
}

/** Full number as stored in the Sheet: `+380 67 123 45 67`. */
export const fullPhone = (national: string) => `+380 ${formatNational(national)}`

export const isValidPhone = (national: string) => nationalDigits(national).length === 9
