"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Box, Flex, Text, Image, IconButton, HStack } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaCog } from "react-icons/fa"
import { QuestionStat, AnswerStat } from "./types"
import {
  questionImages,
  questionDisplayNames,
  answerQuotes,
  questionAliases,
  displayQuestions,
  AUTO_PLAY_INTERVAL,
  BAR_ANIMATION_DURATION,
} from "./config"
import { createClient } from "@/lib/supabase/client"
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js"

const MotionBox = motion.create(Box)

interface StatsDisplayProps {
  stats: QuestionStat[]
}

// 資料庫記錄類型
interface EventResponse {
  id: number
  question: string | null
  answer: string | null
  player_id: string | null
  conversation_title: string | null
  created_at: string
}

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
  const questionGroups = new Map<string, string[]>()

  for (const response of eventResponses) {
    if (!response.question || !response.answer) continue
    const normalizedQuestion = normalizeQuestion(response.question)
    const answers = questionGroups.get(normalizedQuestion) || []
    answers.push(response.answer.trim())
    questionGroups.set(normalizedQuestion, answers)
  }

  const statsMap = new Map<string, QuestionStat>()

  for (const [question, answers] of questionGroups) {
    const totalResponses = answers.length
    const answerCounts = new Map<string, number>()
    for (const answer of answers) {
      answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1)
    }

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

  if (displayQuestions.length > 0) {
    return displayQuestions.map((q) => statsMap.get(q)).filter((stat): stat is QuestionStat => stat !== undefined)
  }

  return Array.from(statsMap.values()).sort((a, b) => b.totalResponses - a.totalResponses)
}

// +1 動畫效果的資訊
interface PlusOneEffect {
  id: string
  answer: string
  questionIndex: number
}

// 佇列中的事件
interface QueuedEvent {
  id: string
  question: string
  answer: string
  questionIndex: number
}

// +1 動畫間隔時間（毫秒）
const PLUS_ONE_INTERVAL = 400
// +1 動畫持續時間（毫秒）
const PLUS_ONE_DURATION = 2000

// 為每個選項分配顏色
const COLORS = [
  "#E07C5A", // 橘紅
  "#5B8DBE", // 藍
  "#6DBE71", // 綠
  "#D4A84B", // 金黃
  "#9B6DBE", // 紫
  "#BE6D8D", // 粉紅
]

const MotionFlex = motion.create(Flex)

// 進度條元件
function ProgressBar({ percentage, color, animate }: { percentage: number; color: string; animate: boolean }) {
  return (
    <Box position="relative" w="100%" h="32px" bg="rgba(0,0,0,0.1)" borderRadius="16px" overflow="hidden">
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        h="100%"
        bg={color}
        borderRadius="16px"
        initial={{ width: "0%" }}
        animate={{ width: animate ? `${percentage}%` : "0%" }}
        transition={{ duration: BAR_ANIMATION_DURATION / 1000, ease: "easeOut" }}
      />
    </Box>
  )
}

// 選項列元件
function AnswerRow({
  answer,
  percentage,
  color,
  animate,
  index,
  showPlusOne,
}: {
  answer: string
  percentage: number
  color: string
  animate: boolean
  index: number
  showPlusOne?: boolean
}) {
  const [displayPercentage, setDisplayPercentage] = useState(0)

  useEffect(() => {
    if (!animate) {
      setDisplayPercentage(0)
      return
    }

    const duration = BAR_ANIMATION_DURATION
    const steps = 60
    const increment = percentage / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= percentage) {
        setDisplayPercentage(percentage)
        clearInterval(timer)
      } else {
        setDisplayPercentage(Math.round(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [percentage, animate])

  return (
    <MotionFlex
      direction="column"
      gap="8px"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      fontFamily="var(--font-cubic)"
      position="relative"
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="8px" position="relative">
          <Text fontSize="40px" fontWeight="600" color="#333">
            {answer}
          </Text>
          {/* +1 動畫效果 */}
          <AnimatePresence>
            {showPlusOne && (
              <MotionBox
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -40, scale: 1.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                position="absolute"
                left="100%"
                ml="12px"
                color={color}
                fontWeight="700"
                fontSize="24px"
              >
                +1
              </MotionBox>
            )}
          </AnimatePresence>
        </Flex>
        <Text fontSize="24px" fontWeight="700" color={color}>
          {displayPercentage}%
        </Text>
      </Flex>
      <ProgressBar percentage={percentage} color={color} animate={animate} />
    </MotionFlex>
  )
}

export function StatsDisplay({ stats: initialStats }: StatsDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [animateKey, setAnimateKey] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [stats, setStats] = useState<QuestionStat[]>(initialStats)
  const [plusOneEffect, setPlusOneEffect] = useState<PlusOneEffect | null>(null)

  // 儲存所有原始資料，用於重新計算統計
  const rawDataRef = useRef<Array<{ question: string | null; answer: string | null }>>([])

  // 事件佇列
  const eventQueueRef = useRef<QueuedEvent[]>([])
  const isProcessingQueueRef = useRef(false)
  const resumeAutoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 初始化原始資料
  useEffect(() => {
    // 從初始統計反推原始資料
    const initialRawData: Array<{ question: string | null; answer: string | null }> = []
    for (const stat of initialStats) {
      for (const answerStat of stat.answers) {
        for (let i = 0; i < answerStat.count; i++) {
          initialRawData.push({
            question: stat.question,
            answer: answerStat.answer,
          })
        }
      }
    }
    rawDataRef.current = initialRawData
  }, [initialStats])

  // 處理佇列中的事件
  const processQueue = useCallback(() => {
    if (isProcessingQueueRef.current || eventQueueRef.current.length === 0) {
      return
    }

    isProcessingQueueRef.current = true

    const processNextEvent = () => {
      const event = eventQueueRef.current.shift()

      if (!event) {
        // 佇列處理完畢
        isProcessingQueueRef.current = false

        // 清除之前的恢復播放計時器
        if (resumeAutoPlayTimerRef.current) {
          clearTimeout(resumeAutoPlayTimerRef.current)
        }

        // 佇列清空後 3 秒恢復自動播放
        resumeAutoPlayTimerRef.current = setTimeout(() => {
          setIsPlaying(true)
        }, 3000)

        return
      }

      // 暫停自動播放
      setIsPlaying(false)

      // 清除恢復播放計時器（因為還有事件要處理）
      if (resumeAutoPlayTimerRef.current) {
        clearTimeout(resumeAutoPlayTimerRef.current)
        resumeAutoPlayTimerRef.current = null
      }

      // 導向到該題目
      setCurrentIndex(event.questionIndex)
      setAnimateKey((prev) => prev + 1)

      // 顯示 +1 效果
      setPlusOneEffect({
        id: event.id,
        answer: event.answer,
        questionIndex: event.questionIndex,
      })

      // 清除 +1 效果
      setTimeout(() => {
        setPlusOneEffect(null)
      }, PLUS_ONE_DURATION)

      // 處理下一個事件
      setTimeout(processNextEvent, PLUS_ONE_INTERVAL)
    }

    processNextEvent()
  }, [])

  // Supabase realtime 訂閱
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel("event_responses_changes")
      .on<EventResponse>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "event_responses",
        },
        (payload: RealtimePostgresInsertPayload<EventResponse>) => {
          console.log("[Realtime] 收到新資料:", payload.new)
          const newRecord = payload.new
          if (!newRecord.question || !newRecord.answer) return

          // 將新資料加入原始資料
          rawDataRef.current.push({
            question: newRecord.question,
            answer: newRecord.answer,
          })

          // 重新計算統計
          const newStats = processStats(rawDataRef.current)
          setStats(newStats)

          // 找到對應的題目索引
          const normalizedQuestion = normalizeQuestion(newRecord.question)
          const questionIndex = newStats.findIndex((s) => s.question === normalizedQuestion)

          if (questionIndex !== -1) {
            // 加入佇列
            eventQueueRef.current.push({
              id: `${newRecord.id}-${Date.now()}`,
              question: normalizedQuestion,
              answer: newRecord.answer,
              questionIndex,
            })

            // 開始處理佇列
            processQueue()
          }
        }
      )
      .subscribe((status) => {
        console.log("[Realtime] 訂閱狀態:", status)
      })

    return () => {
      supabase.removeChannel(channel)
      if (resumeAutoPlayTimerRef.current) {
        clearTimeout(resumeAutoPlayTimerRef.current)
      }
    }
  }, [processQueue])

  const currentStat = stats[currentIndex]
  const imageUrl = questionImages[currentStat?.question] || ""

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stats.length)
    setAnimateKey((prev) => prev + 1)
  }, [stats.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length)
    setAnimateKey((prev) => prev + 1)
  }, [stats.length])

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "ArrowLeft") {
        goToPrev()
      } else if (e.key === " ") {
        e.preventDefault()
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  // 自動輪播
  useEffect(() => {
    if (!isPlaying || stats.length <= 1) return

    const timer = setInterval(goToNext, AUTO_PLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [isPlaying, goToNext, stats.length])

  if (!stats.length) {
    return (
      <Flex justify="center" align="center" h="100vh" bg="#1a1a2e">
        <Text color="white" fontSize="24px">
          尚無統計資料
        </Text>
      </Flex>
    )
  }

  return (
    <Box
      minH="100vh"
      py="94px"
      style={{
        backgroundImage: "url('/hero/heroBg@3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 模糊白色背景容器 */}

      <Flex
        direction="row"
        h="calc(100vh - 188px)"
        bg="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(10px)"
        pt="21px"
        pb="40px"
        pl="60px"
        pr="60px"
      >
        {/* 左欄：iOS 試玩下載 */}
        <Flex direction="column">
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="343px"
            flexShrink={0}
            mr="64px"
            bg="rgba(255,255,255,1)"
            borderRadius="12px"
            p="16px"
            my="auto"
          >
            <Text fontSize="24px" fontWeight="700" color="#333" fontFamily="var(--font-cubic)" mb="24px" textAlign="center">
              iOS 試玩下載
            </Text>
            <Image src="/download.svg" alt="QR Code" w="100%" />
          </Flex>
          <Image src="/moments_logo.svg" alt="QR Code" w="343px" />
        </Flex>

        {/* 中欄：設定圖片 */}
        <Flex direction="column" align="center" justify="center" flexShrink={0} mr="48px" h="100%" overflow="hidden">
          <AnimatePresence mode="wait">
            {imageUrl ? (
              <MotionBox
                key={`image-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                w="100%"
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={imageUrl} alt={currentStat.question} maxW="100%" maxH="100%" objectFit="contain" borderRadius="24px" />
              </MotionBox>
            ) : (
              <MotionBox
                key={`placeholder-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                bg="rgba(0,0,0,0.05)"
                borderRadius="16px"
                w="100%"
                h="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="rgba(0,0,0,0.3)" fontSize="18px">
                  尚未設定圖片
                </Text>
              </MotionBox>
            )}
          </AnimatePresence>
        </Flex>

        {/* 右欄：題目、統計、吐槽語錄（垂直排列） */}
        <Flex direction="column" flex="1" overflow="flow" justifyContent="space-between">
          {/* 題目 */}
          <Box bg="#987455" p="24px" mb="28px" borderRadius="12px">
            <AnimatePresence mode="wait">
              <MotionBox
                key={`question-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Text fontSize="60px" fontWeight="700" color="white" fontFamily="var(--font-cubic)" lineHeight="1.4">
                  {questionDisplayNames[currentStat.question] || currentStat.question}
                </Text>
                <Text fontSize="28px" color="rgba(255,255,255,0.7)" mt="6px" fontFamily="var(--font-cubic)">
                  共 {currentStat.totalResponses} 人回答
                </Text>
              </MotionBox>
            </AnimatePresence>
          </Box>

          {/* 選項統計（條狀圖） */}
          <Flex flex="1" direction="column" justify="center" bg="white" mb="43px" p="24px" borderRadius="20px">
            <AnimatePresence mode="wait">
              <MotionBox
                key={`stats-${animateKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Flex direction="column" gap="20px">
                  {currentStat.answers.map((answer, index) => (
                    <AnswerRow
                      key={answer.answer}
                      answer={answer.answer}
                      percentage={answer.percentage}
                      color={COLORS[index % COLORS.length]}
                      animate={true}
                      index={index}
                      showPlusOne={
                        plusOneEffect !== null && plusOneEffect.questionIndex === currentIndex && plusOneEffect.answer === answer.answer
                      }
                    />
                  ))}
                </Flex>
              </MotionBox>
            </AnimatePresence>
          </Flex>

          {/* 吐槽語錄 */}
          <Box>
            <AnimatePresence mode="wait">
              <MotionBox
                key={`quote-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {(() => {
                  const topAnswer = currentStat.answers[0]?.answer
                  const quotes = answerQuotes[currentStat.question] || {}
                  const quote = quotes[topAnswer] || ""

                  return quote ? (
                    <Flex align="flex-start" gap="16px">
                      {/* 角色圖片 */}
                      <Image src="/animals/beigo.png" alt="Beigo" w="160px" h="160px" objectFit="contain" flexShrink={0} />
                      {/* 對話氣泡 */}
                      <Box
                        position="relative"
                        bg="#FFFFFF"
                        borderRadius="16px"
                        p="16px"
                        flex="1"
                        _before={{
                          content: '""',
                          position: "absolute",
                          left: "-8px",
                          top: "20px",
                        }}
                      >
                        <Text fontSize="28px" color="rgba(0,0,0,0.4)" fontFamily="var(--font-cubic)" mb="4px">
                          最多人選擇「{topAnswer}」
                        </Text>
                        <Text fontSize="40px" fontWeight="600" color="#333" fontFamily="var(--font-cubic)" lineHeight="1.5">
                          {quote}
                        </Text>
                      </Box>
                    </Flex>
                  ) : (
                    <Flex align="flex-start" gap="16px">
                      {/* 角色圖片 */}
                      <Image src="/animals/beigo.png" alt="Beigo" w="80px" h="80px" objectFit="contain" flexShrink={0} />
                      {/* 對話氣泡 */}
                      <Box
                        position="relative"
                        bg="#F5F5F5"
                        borderRadius="16px"
                        p="16px"
                        flex="1"
                        _before={{
                          content: '""',
                          position: "absolute",
                          left: "-8px",
                          top: "20px",
                          borderWidth: "8px",
                          borderStyle: "solid",
                          borderColor: "transparent #F5F5F5 transparent transparent",
                        }}
                      >
                        <Text fontSize="16px" color="rgba(0,0,0,0.3)" fontFamily="var(--font-cubic)">
                          尚未設定吐槽語錄
                        </Text>
                      </Box>
                    </Flex>
                  )
                })()}
              </MotionBox>
            </AnimatePresence>
          </Box>
        </Flex>
      </Flex>

      {/* 右下角設定按鈕 */}
      <IconButton
        aria-label="設定"
        onClick={() => setShowControls((prev) => !prev)}
        position="fixed"
        bottom="24px"
        right="24px"
        bg={showControls ? "#333" : "rgba(0,0,0,0.1)"}
        color={showControls ? "white" : "#333"}
        _hover={{ bg: showControls ? "#444" : "rgba(0,0,0,0.2)" }}
        size="lg"
        borderRadius="full"
        zIndex={100}
      >
        <FaCog />
      </IconButton>

      {/* 控制面板 */}
      <AnimatePresence>
        {showControls && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            position="fixed"
            bottom="80px"
            right="24px"
            bg="white"
            borderRadius="16px"
            boxShadow="0 4px 20px rgba(0,0,0,0.15)"
            p="20px"
            zIndex={100}
          >
            <Flex direction="column" gap="16px">
              {/* 控制按鈕 */}
              <Flex justify="center" align="center" gap="16px">
                {/* 上一題 */}
                <IconButton
                  aria-label="上一題"
                  onClick={goToPrev}
                  bg="rgba(0,0,0,0.1)"
                  color="#333"
                  _hover={{ bg: "rgba(0,0,0,0.2)" }}
                  size="lg"
                  borderRadius="full"
                >
                  <FaChevronLeft />
                </IconButton>

                {/* 播放/暫停 */}
                <IconButton
                  aria-label={isPlaying ? "暫停" : "播放"}
                  onClick={() => setIsPlaying((prev) => !prev)}
                  bg={isPlaying ? "rgba(0,0,0,0.1)" : "#E07C5A"}
                  color={isPlaying ? "#333" : "white"}
                  _hover={{ bg: isPlaying ? "rgba(0,0,0,0.2)" : "#c96a4a" }}
                  size="lg"
                  borderRadius="full"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </IconButton>

                {/* 下一題 */}
                <IconButton
                  aria-label="下一題"
                  onClick={goToNext}
                  bg="rgba(0,0,0,0.1)"
                  color="#333"
                  _hover={{ bg: "rgba(0,0,0,0.2)" }}
                  size="lg"
                  borderRadius="full"
                >
                  <FaChevronRight />
                </IconButton>
              </Flex>

              {/* 頁碼指示器 */}
              <HStack gap="8px" justify="center">
                {stats.map((_, index) => (
                  <Box
                    key={index}
                    w="12px"
                    h="12px"
                    borderRadius="full"
                    bg={index === currentIndex ? "#333" : "rgba(0,0,0,0.2)"}
                    cursor="pointer"
                    transition="all 0.2s"
                    onClick={() => {
                      setCurrentIndex(index)
                      setAnimateKey((prev) => prev + 1)
                    }}
                    _hover={{ bg: index === currentIndex ? "#333" : "rgba(0,0,0,0.4)" }}
                  />
                ))}
              </HStack>

              {/* 操作提示 */}
              <Text textAlign="center" color="rgba(0,0,0,0.4)" fontSize="12px">
                ← → 切換 | 空白鍵 播放/暫停
              </Text>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}
