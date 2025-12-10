"use client"

import { useState, useEffect, useCallback } from "react"
import { Box, Flex, Text, Image, IconButton, HStack } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaCog } from "react-icons/fa"
import { QuestionStat } from "./types"
import { questionImages, questionDisplayNames, answerQuotes, AUTO_PLAY_INTERVAL, BAR_ANIMATION_DURATION } from "./config"

const MotionBox = motion.create(Box)

interface StatsDisplayProps {
  stats: QuestionStat[]
}

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
}: {
  answer: string
  percentage: number
  color: string
  animate: boolean
  index: number
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
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="20px" fontWeight="600" color="#333">
          {answer}
        </Text>
        <Text fontSize="24px" fontWeight="700" color={color}>
          {displayPercentage}%
        </Text>
      </Flex>
      <ProgressBar percentage={percentage} color={color} animate={animate} />
    </MotionFlex>
  )
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [animateKey, setAnimateKey] = useState(0)
  const [showControls, setShowControls] = useState(false)

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
        pr="160px"
      >
        {/* 左欄：iOS 試玩下載 */}
        <Flex direction="column" align="center" justify="center" w="343px" flexShrink={0} mr="64px">
          <Text fontSize="24px" fontWeight="700" color="#333" fontFamily="var(--font-cubic)" mb="24px" textAlign="center">
            iOS 試玩下載
          </Text>
          <Image src="" alt="QR Code" w="200px" h="200px" bg="rgba(0,0,0,0.05)" borderRadius="12px" />
        </Flex>

        {/* 中欄：設定圖片 */}
        <Flex direction="column" align="center" justify="center" w="327px" flexShrink={0} mr="48px" h="100%" overflow="hidden">
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
        <Flex direction="column" flex="1" overflow="auto" justifyContent="space-between">
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
                <Text fontSize="32px" fontWeight="700" color="white" fontFamily="var(--font-cubic)" lineHeight="1.4">
                  {questionDisplayNames[currentStat.question] || currentStat.question}
                </Text>
                <Text fontSize="16px" color="rgba(255,255,255,0.7)" mt="12px" fontFamily="var(--font-cubic)">
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
                      <Image src="/animals/beigo.png" alt="Beigo" w="80px" h="80px" objectFit="contain" flexShrink={0} />
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
                        <Text fontSize="14px" color="rgba(0,0,0,0.4)" fontFamily="var(--font-cubic)" mb="4px">
                          最多人選擇「{topAnswer}」
                        </Text>
                        <Text fontSize="20px" fontWeight="600" color="#333" fontFamily="var(--font-cubic)" lineHeight="1.5">
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
