export interface AnswerStat {
  answer: string
  count: number
  percentage: number
}

export interface QuestionStat {
  question: string
  totalResponses: number
  answers: AnswerStat[]
}
