export interface Option {
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  options: Option[]
  correctOptionId: string
}

/** questionId → chosen optionId */
export type Answers = Record<string, string>
