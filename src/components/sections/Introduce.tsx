"use client";

import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";

export function Introduce() {
  return (
    <Flex
      as="section"
      id="introduce"
      px="36px"
      py="32px"
      w="100%"
      bg="white"
      position="relative"
      rounded="20px"
      minH="360px"
      gap={6}
      align="stretch"
    >
      <Text
        color="#A9886C"
        position="absolute"
        top="-32px"
        left="24px"
        fontSize="48px"
        fontWeight="700"
      >
        Introduce
      </Text>

      <Flex direction="column" justifyContent="center" gap="16px" flex="1">
        <Text color="#72543B">
          在小日的城市裡
          <br />
          每天都有不同的故事發生
        </Text>
        <Text color="#72543B">
          從出門、通勤到回家，每一天都能遇見療癒的小事件與角色。
          <br />
          每次出門都是冒險的開始，快踏上吧！
        </Text>
        <Button
          colorScheme="brand"
          size="md"
          bgColor="#987455"
          w="200px"
          rounded="30px"
        >
          填寫試完表單
        </Button>
      </Flex>
      <Flex w="40%" align="stretch">
        <Box
          w="100%"
          h="100%"
          bgImage="url('/mrt.png')"
          bgSize="cover"
          bgPos="center"
          rounded="20px"
        ></Box>
      </Flex>
    </Flex>
  );
}
