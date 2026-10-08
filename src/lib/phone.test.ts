import { describe, expect, it } from 'vitest'
import { formatPhone, isValidPhone } from './phone'

describe('formatPhone', () => {
  it('formats progressively as digits are typed', () => {
    expect(formatPhone('6')).toBe('+380 6')
    expect(formatPhone('+380 671')).toBe('+380 67 1')
    expect(formatPhone('+380 67 123 4')).toBe('+380 67 123 4')
    expect(formatPhone('671234567')).toBe('+380 67 123 45 67')
  })

  it('accepts local and international prefixes', () => {
    expect(formatPhone('0671234567')).toBe('+380 67 123 45 67')
    expect(formatPhone('+38 (067) 123-45-67')).toBe('+380 67 123 45 67')
  })

  it('clears when only the prefix is left (backspace)', () => {
    expect(formatPhone('+380')).toBe('')
  })

  it('caps at 9 national digits', () => {
    expect(formatPhone('+380 67 123 45 678')).toBe('+380 67 123 45 67')
  })
})

describe('isValidPhone', () => {
  it('needs all 9 digits', () => {
    expect(isValidPhone('+380 67 123 45 67')).toBe(true)
    expect(isValidPhone('+380 67 123 45 6')).toBe(false)
  })
})
