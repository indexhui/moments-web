"use client";

import { Walk } from "@/components/ui/walk";
import { Flex, Text, Icon, SimpleGrid, Link } from "@chakra-ui/react";
import {
  FaPenToSquare,
  FaClipboardList,
  FaPlay,
  FaPause,
  FaYoutube,
} from "react-icons/fa6";
import { TbBrandThreads } from "react-icons/tb";
import { AiFillInstagram } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";

export function LayoutLeft() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.error("播放失败:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  return (
    <Flex
      w="300px"
      bgColor="white"
      rounded="lg"
      color="black"
      h="800px"
      position="sticky"
      top="40px"
      direction="column"
      px="20px"
      py="32px"
      gap="40px"
    >
      <SimpleGrid columns={3} gap={2} w="100%">
        <Link
          href="https://forms.gle/xiYyFgGEADZX7QjC7"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
          display="block"
          w="100%"
        >
          <Flex align="center" gap={2} direction="column" cursor="pointer">
            <Flex
              bgColor="#987455"
              w="50px"
              h="50px"
              justify="center"
              align="center"
              rounded="lg"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Icon color="white" w="16px" h="16px">
                <FaPenToSquare />
              </Icon>
            </Flex>
            <Text color="#987455">早期預約</Text>
          </Flex>
        </Link>
        <Link
          href="https://forms.gle/gtKXj3iJbPKWQLmb8"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
          display="block"
          w="100%"
        >
          <Flex align="center" gap={2} direction="column" cursor="pointer">
            <Flex
              bgColor="#987455"
              w="50px"
              h="50px"
              justify="center"
              align="center"
              rounded="lg"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Icon color="white" w="16px" h="16px">
                <FaClipboardList />
              </Icon>
            </Flex>
            <Text color="#987455">填寫問卷</Text>
          </Flex>
        </Link>
        <Flex align="center" gap={2} direction="column">
          <audio ref={audioRef} src="/ThemeMusic.mp3" loop />
          <Flex
            bgColor="#987455"
            w="50px"
            h="50px"
            justify="center"
            align="center"
            rounded="lg"
            cursor="pointer"
            onClick={togglePlay}
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          >
            <Icon color="white" w="16px" h="16px">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </Icon>
          </Flex>
          <Text color="#987455">主題播放</Text>
        </Flex>
        <Link
          href="https://www.instagram.com/mugio_studio/"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
          display="block"
          w="100%"
        >
          <Flex align="center" gap={2} direction="column" cursor="pointer">
            <Flex
              bgColor="#987455"
              w="50px"
              h="50px"
              justify="center"
              align="center"
              rounded="lg"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Icon color="white" w="16px" h="16px">
                <AiFillInstagram />
              </Icon>
            </Flex>
            <Text color="#987455">IG</Text>
          </Flex>
        </Link>
        <Link
          href="https://www.threads.com/@mugio_studio"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
          display="block"
          w="100%"
        >
          <Flex align="center" gap={2} direction="column" cursor="pointer">
            <Flex
              bgColor="#987455"
              w="50px"
              h="50px"
              justify="center"
              align="center"
              rounded="lg"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Icon color="white" w="16px" h="16px">
                <TbBrandThreads />
              </Icon>
            </Flex>
            <Text color="#987455">Threads</Text>
          </Flex>
        </Link>
        <Link
          href="https://www.youtube.com/@Mugio-studio"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
          display="block"
          w="100%"
        >
          <Flex align="center" gap={2} direction="column" cursor="pointer">
            <Flex
              bgColor="#987455"
              w="50px"
              h="50px"
              justify="center"
              align="center"
              rounded="lg"
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Icon color="white" w="16px" h="16px">
                <FaYoutube />
              </Icon>
            </Flex>
            <Text color="#987455">YouTube</Text>
          </Flex>
        </Link>
      </SimpleGrid>
      <Walk />
      <Flex border="2px solid #987455" p="10px" rounded="lg">
        <Text color="#987455">12/12 G-EIGHT 遊戲展見</Text>
      </Flex>
    </Flex>
  );
}
