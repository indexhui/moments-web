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

  // 預載入所有背景圖片
  useEffect(() => {
    const preloadImages = () => {
      BACKGROUNDS.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };
    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      w="100%"
      h="400px"
      bgImage={`url('${BACKGROUNDS[currentIndex]}')`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      position="relative"
      align="center"
      justify="center"
      rounded="12px"
      transition="background-image 0.5s ease-in-out"
      pt="100px"
    >
      <Box position="relative" w="100%" h="65%">
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
