"use client";

import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";

export function Stories() {
  return (
    <Flex
      as="section"
      id="stories"
      px="36px"
      py="32px"
      w="100%"
      bg="white"
      position="relative"
      rounded="20px"
      minH="220px"
      gap={6}
      align="stretch"
      direction="column"
    >
      <Text
        color="#A9886C"
        position="absolute"
        top="-32px"
        left="24px"
        fontSize="48px"
        fontWeight="700"
      >
        通勤小故事募集
      </Text>

      <Box w={{ base: "100%", md: "86%" }} maxW="1080px">
        <Text color="#72543B" as="h2" fontSize="18px" fontWeight="500" maxW="680px">
          分享你在通勤或上班途中遇到的糗事、趣事或最討厭的一瞬間；這些日常故事，可能會成為
          走走小日 moments 的關卡靈感。
        </Text>
        <Link
          href="https://forms.gle/gtKXj3iJbPKWQLmb8"
          target="_blank"
          rel="noopener noreferrer"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            mt="16px"
            colorScheme="brand"
            size="md"
            bgColor="#987455"
            w={{ base: "200px", md: "220px" }}
            rounded="30px"
          >
            分享我的故事
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
