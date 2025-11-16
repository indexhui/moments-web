"use client";

import { Flex, Heading, Text, Box, Button, Link } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";

export function Introduce() {
  return (
    <Section
      id="introduce"
      px="36px"
      py="32px"
      minH="360px"
      gap={6}
      align="stretch"
      title="Introduce"
    >
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
        <Link
          href="https://forms.gle/xiYyFgGEADZX7QjC7"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
          w="200px"
        >
          <Button
            colorScheme="brand"
            size="md"
            bgColor="#987455"
            w="100%"
            rounded="30px"
          >
            早期預約
          </Button>
        </Link>
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
    </Section>
  );
}
