import { beforeEach, describe, expect, it, vi } from 'vitest'
import { enqueue, loadQueue } from './queue'
import { flushQueue } from './sync'
import type { Submission } from './types'

const make = (id: string): Submission => ({
  id,
  createdAt: '2026-01-01T00:00:00.000Z',
  name: 'A',
  phone: '+380 67 123 45 67',
  company: 'B',
  correct: 1,
  total: 1,
})

describe('flushQueue', () => {
  beforeEach(() => localStorage.clear())

  it('removes submissions once sent', async () => {
    enqueue(make('1'))
    enqueue(make('2'))
    const send = vi.fn().mockResolvedValue(undefined)
    await flushQueue(send)
    expect(send).toHaveBeenCalledTimes(2)
    expect(loadQueue()).toEqual([])
  })

  it('keeps unsent submissions when sending fails', async () => {
    enqueue(make('1'))
    enqueue(make('2'))
    const send = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('offline'))
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    await flushQueue(send)
    expect(loadQueue().map((s) => s.id)).toEqual(['2'])
  })
})
