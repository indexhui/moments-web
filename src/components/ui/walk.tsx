"use client";

import { Flex, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const BACKGROUNDS = [
  "/walk/Sidewalk_Day.png",
  "/walk/Sidewalk_Dusk.png",
  "/walk/Sidewalk_Night.png",
  "/walk/Doorstep_Day.png",
  "/walk/Doorstep_Dusk.png",
  "/walk/Doorstep_Night.png",
];

export function Walk() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 預載入所有背景圖片，等待全部載入完成
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = BACKGROUNDS.length;

    const preloadImages = () => {
      BACKGROUNDS.forEach((src) => {
        const img = new window.Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = src;
      });
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <Flex
      w="100%"
      h="400px"
      position="relative"
      align="center"
      justify="center"
      rounded="12px"
      pt="100px"
      overflow="hidden"
    >
      {/* 所有背景圖片層疊，透過 opacity 切換 */}
      {BACKGROUNDS.map((bg, index) => (
        <Box
          key={bg}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgImage={`url('${bg}')`}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          opacity={index === currentIndex ? 1 : 0}
          transition="opacity 0.5s ease-in-out"
          pointerEvents="none"
        />
      ))}
      <Box position="relative" w="100%" h="65%" zIndex={1}>
        <Image
          src="/walk/walk.gif"
          alt="Walk animation"
          fill
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </Box>
    </Flex>
  );
}
