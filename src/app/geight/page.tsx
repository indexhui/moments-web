import { createClient } from "@/lib/supabase/server"
import { StatsDisplay } from "./components/StatsDisplay"
import { QuestionStat, AnswerStat } from "./components/types"
import { displayQuestions, questionAliases } from "./components/config"

// 取得正規化的題目 key（處理別名）
function normalizeQuestion(question: string): string {
  return questionAliases[question] || question
}

// 處理原始資料，轉換成統計格式
function processStats(
  eventResponses: Array<{
    question: string | null
    answer: string | null
  }>
): QuestionStat[] {
  // 按正規化後的 question 分組（合併別名）
  const questionGroups = new Map<string, string[]>()

  for (const response of eventResponses) {
    if (!response.question || !response.answer) continue

    // 使用正規化的題目 key
    const normalizedQuestion = normalizeQuestion(response.question)
    const answers = questionGroups.get(normalizedQuestion) || []
    answers.push(response.answer)
    questionGroups.set(normalizedQuestion, answers)
  }

  // 轉換成統計格式
  const statsMap = new Map<string, QuestionStat>()

  for (const [question, answers] of questionGroups) {
    const totalResponses = answers.length

    // 統計每個答案的數量
    const answerCounts = new Map<string, number>()
    for (const answer of answers) {
      answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1)
    }

    // 轉換成 AnswerStat 並排序（數量多的在前）
    const answerStats: AnswerStat[] = Array.from(answerCounts.entries())
      .map(([answer, count]) => ({
        answer,
        count,
        percentage: Math.round((count / totalResponses) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    statsMap.set(question, {
      question,
      totalResponses,
      answers: answerStats,
    })
  }

  // 如果有指定顯示題目，按照 displayQuestions 順序過濾並排序
  if (displayQuestions.length > 0) {
    return displayQuestions.map((q) => statsMap.get(q)).filter((stat): stat is QuestionStat => stat !== undefined)
  }

  // 否則按總回應數排序（多的在前）
  return Array.from(statsMap.values()).sort((a, b) => b.totalResponses - a.totalResponses)
}

export default async function Page() {
  const supabase = await createClient()

  const { data: eventResponses } = await supabase.from("event_responses").select("question, answer")

  const stats = processStats(eventResponses || [])

  return <StatsDisplay stats={stats} />
}
