import type { Answers, Question } from './types'

export interface Score {
  correct: number
  total: number
}

export function scoreQuiz(questions: Question[], answers: Answers): Score {
  const correct = questions.filter((q) => answers[q.id] === q.correctOptionId).length
  return { correct, total: questions.length }
}
