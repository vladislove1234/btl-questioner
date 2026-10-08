import { describe, expect, it } from 'vitest'
import { questions } from './questions'
import { scoreQuiz } from './scoring'
import type { Question } from './types'

const qs: Question[] = [
  { id: 'q1', text: '', options: [], correctOptionId: 'a' },
  { id: 'q2', text: '', options: [], correctOptionId: 'b' },
]

describe('scoreQuiz', () => {
  it('counts correct answers', () => {
    expect(scoreQuiz(qs, { q1: 'a', q2: 'a' })).toEqual({ correct: 1, total: 2 })
  })

  it('treats unanswered questions as wrong', () => {
    expect(scoreQuiz(qs, {})).toEqual({ correct: 0, total: 2 })
  })
})

describe('questions', () => {
  it('have unique ids and a correct option that exists', () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length)
    for (const q of questions) {
      expect(q.options.map((o) => o.id)).toContain(q.correctOptionId)
    }
  })

  it('avoid the № sign, which the font lacks', () => {
    expect(JSON.stringify(questions)).not.toContain('№')
  })
})
