"use client";

import { Box, Flex, Button, Icon, Link, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { TbBrandThreads } from "react-icons/tb";
import { FaYoutube, FaPenToSquare } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

export function Header() {
  return (
    <Flex
      w="100%"
      as="header"
      position="sticky"
      top="0"
      h="60px"
      zIndex={1500}
      justify="center"
      align="center"
      bgColor="white"
      py="0"
    >
      <Flex
        w="100%"
        pl="5%"
        h="100%"
        gap={6}
        justify="space-between"
        align="center"
        py="0"
      >
        <Box w={{ base: "120px", lg: "140px" }}>
          <Image
            width={80}
            height={42}
            src="/logo.svg"
            alt="走走小日 moments"
          />
        </Box>
        <Box display={{ base: "none", lg: "flex" }}>
          <SocialLinks />
        </Box>
        <HeaderCta />
      </Flex>
    </Flex>
  );
}

const HeaderCta = () => {
  return (
    <Box
      w={{ base: "160px", lg: "186px" }}
      h="100%"
      position="relative"
      borderRadius="full"
      bgColor="#977354"
    >
      <Link
        href="https://forms.gle/CMGozFuDxoN7fNot7"
        target="_blank"
        rel="noopener noreferrer"
        w="full"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          bg="#977354"
          color="white"
          borderRadius="0"
          px={8}
          fontSize="14px"
          w="full"
          h="100%"
          _hover={{
            filter: "brightness(0.95)",
          }}
          transition="all 0.2s"
          _active={{
            transform: "scale(0.98)",
          }}
        >
          <HStack gap={2}>
            <Icon as={FaPenToSquare} w="16px" h="16px" />
            <Box>早期玩家登入</Box>
          </HStack>
        </Button>
      </Link>
    </Box>
  );
};

const SocialLinks = () => {
  return (
    <Flex gap={3}>
      <Link
        href="https://www.threads.com/@mugio_studio?xmt=AQF02DIAlQ7wBCOVZ-VhMzDSEHaKmZHHx_JHAI31v419qAg"
        target="_blank"
        rel="noopener noreferrer"
        _focus={{ outline: "none" }}
      >
        <Icon
          color="text"
          w="28px"
          h="28px"
          _hover={{ color: "accent", cursor: "pointer" }}
        >
          <TbBrandThreads />
        </Icon>
      </Link>
      <Link
        href="https://www.instagram.com/mugio_studio/"
        target="_blank"
        rel="noopener noreferrer"
        _focus={{ outline: "none" }}
      >
        <Icon
          color="text"
          w="28px"
          h="28px"
          _hover={{ color: "accent", cursor: "pointer" }}
        >
          <AiFillInstagram />
        </Icon>
      </Link>
      <Link
        href="https://www.youtube.com/@Mugio-studio"
        target="_blank"
        rel="noopener noreferrer"
        _focus={{ outline: "none" }}
      >
        <Icon
          color="text"
          w="28px"
          h="28px"
          _hover={{ color: "accent", cursor: "pointer" }}
        >
          <FaYoutube />
        </Icon>
      </Link>
    </Flex>
  );
};
