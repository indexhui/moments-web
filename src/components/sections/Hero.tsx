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
} from "@chakra-ui/react";

export function Hero() {
  return (
    <Flex
      as="section"
      id="hero"
      h="600px"
      display="flex"
      alignItems="center"
      w="100%"
      position="relative"
    >
      <Flex w="100%" h="100%" direction={{ base: "column-reverse", lg: "row" }}>
        <Flex
          flex="1"
          h="100%"
          bgColor="#A9886C"
          direction="column"
          gap={4}
          alignItems="center"
          justifyContent="center"
          py={{ base: "40px", lg: "0" }}
        >
          <Heading as="h1" size="2xl" color="white">
            跟著小麥一起冒險
          </Heading>
          <Text>我們將在 G-EIGHT 2025 與你相遇</Text>
          <Link
            href="https://www.instagram.com/mugio_studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" bg="#71543B" color="white" px="20px">
              追蹤我們
            </Button>
          </Link>
        </Flex>
        <Flex
          maxW="1080px"
          w={{ base: "100%", lg: "75%" }}
          h="100%"
          bgImage="url('/hero.jpg')"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        ></Flex>
      </Flex>
    </Flex>
  );
}
