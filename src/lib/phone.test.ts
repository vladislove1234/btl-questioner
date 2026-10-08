import { describe, expect, it } from 'vitest'
import { formatNational, fullPhone, isValidPhone } from './phone'

describe('formatNational', () => {
  it('formats progressively as digits are typed', () => {
    expect(formatNational('6')).toBe('6')
    expect(formatNational('671')).toBe('67 1')
    expect(formatNational('67 123 4')).toBe('67 123 4')
    expect(formatNational('671234567')).toBe('67 123 45 67')
  })

  it('accepts a leading 0, which most people type', () => {
    expect(formatNational('0')).toBe('')
    expect(formatNational('06')).toBe('6')
    expect(formatNational('0671234567')).toBe('67 123 45 67')
  })

  it('accepts a pasted international number', () => {
    expect(formatNational('+38 (067) 123-45-67')).toBe('67 123 45 67')
    expect(formatNational('+380671234567')).toBe('67 123 45 67')
  })

  it('caps at 9 national digits', () => {
    expect(formatNational('67 123 45 678')).toBe('67 123 45 67')
  })
})

describe('fullPhone / isValidPhone', () => {
  it('adds the +380 prefix', () => {
    expect(fullPhone('67 123 45 67')).toBe('+380 67 123 45 67')
  })

  it('needs all 9 digits', () => {
    expect(isValidPhone('67 123 45 67')).toBe(true)
    expect(isValidPhone('67 123 45 6')).toBe(false)
  })
})
