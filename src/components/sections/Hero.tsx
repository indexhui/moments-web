"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Link,
  Flex,
  AspectRatio,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

export function Hero() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 平滑的 spring 动画
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // 动画结束后启用鼠标跟随（最长的动画是 moments-logo 的 1.0s + 1s = 2.0s，加上缓冲）
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // 追踪鼠标位置
  useEffect(() => {
    if (!isAnimationComplete) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const heroElement = document.getElementById("hero");
      if (!heroElement) return;

      const rect = heroElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 计算相对于中心的偏移（归一化到 -1 到 1）
      const offsetX = (clientX - centerX) / (rect.width / 2);
      const offsetY = (clientY - centerY) / (rect.height / 2);

      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAnimationComplete, mouseX, mouseY]);

  // 为不同元素创建不同方向和强度的变换
  // dust01: 主要水平移动，轻微垂直
  const dust01X = useTransform(x, (v) => v * 20);
  const dust01Y = useTransform(y, (v) => v * 8);

  // dust02: 反向跟随，创造层次感
  const dust02X = useTransform(x, (v) => -v * 15);
  const dust02Y = useTransform(y, (v) => -v * 12);

  // animals: 正向跟随，但主要垂直移动，轻微水平
  const animalsX = useTransform(x, (v) => v * 18);
  const animalsY = useTransform(y, (v) => v * 25);

  // birds: 对角线跟随，创造不同的移动感
  const birdsX = useTransform(x, (v) => v * 22);
  const birdsY = useTransform(y, (v) => v * 50);

  // moments-logo: 轻微跟随，动态不要太大
  const logoX = useTransform(x, (v) => v * 8);
  const logoY = useTransform(y, (v) => v * 6);

  return (
    <AspectRatio
      ratio={1080 / 565}
      id="hero"
      w="100%"
      display="flex"
      alignItems="center"
      position="relative"
    >
      <Flex
        w="100%"
        bgImage="url('/hero/heroBg.png')"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        position="relative"
        rounded="20px"
      >
        <Box position="absolute" w="100%" h="100%">
          {/* dust01 */}
          <MotionBox
            position="absolute"
            bottom="-20px"
            left="-20px"
            w="90%"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1], // 温和的 easing
            }}
            style={{
              x: isAnimationComplete ? dust01X : 0,
              y: isAnimationComplete ? dust01Y : 0,
            }}
          >
            <AspectRatio ratio={937 / 282}>
              <Box
                bgImage="url('/hero/dist01.png')"
                bgSize="contain"
                bgPos="center"
                bgRepeat="no-repeat"
              />
            </AspectRatio>
          </MotionBox>
          {/* dust02 */}
          <MotionBox
            position="absolute"
            bottom="-20px"
            left="-20px"
            w="90%"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              x: isAnimationComplete ? dust02X : 0,
              y: isAnimationComplete ? dust02Y : 0,
            }}
          >
            <AspectRatio ratio={1000 / 337}>
              <Box
                bgImage="url('/hero/dist02.png')"
                bgSize="contain"
                bgPos="center"
                bgRepeat="no-repeat"
              />
            </AspectRatio>
          </MotionBox>
          {/* animals */}
          <MotionBox
            position="absolute"
            bottom="0"
            left="10%"
            w="58%"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              x: isAnimationComplete ? animalsX : 0,
              y: isAnimationComplete ? animalsY : 0,
            }}
          >
            <AspectRatio ratio={605 / 495}>
              <Box
                bgImage="url('/hero/animals.png')"
                bgSize="contain"
                bgPos="center"
                bgRepeat="no-repeat"
              />
            </AspectRatio>
          </MotionBox>
          {/* birds */}
          <MotionBox
            position="absolute"
            top="10%"
            right="10%"
            w="22%"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              x: isAnimationComplete ? birdsX : 0,
              y: isAnimationComplete ? birdsY : 0,
            }}
          >
            <AspectRatio ratio={310 / 156}>
              <Box
                bgImage="url('/hero/birds.png')"
                bgSize="contain"
                bgPos="center"
                bgRepeat="no-repeat"
              />
            </AspectRatio>
          </MotionBox>
          {/* moments-logo */}
          <MotionBox
            position="absolute"
            top="10%"
            left="10%"
            w="20%"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              x: isAnimationComplete ? logoX : 0,
              y: isAnimationComplete ? logoY : 0,
            }}
          >
            <AspectRatio ratio={238 / 115}>
              <Box
                bgImage="url('/moments_logo.svg')"
                bgSize="contain"
                bgPos="center"
                bgRepeat="no-repeat"
              />
            </AspectRatio>
          </MotionBox>
        </Box>
      </Flex>
    </AspectRatio>
  );
}
