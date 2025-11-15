"use client";

import {
  Flex,
  Text,
  Box,
  AspectRatio,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

export function Podcast() {
  return (
    <Flex
      as="section"
      id="podcast"
      py={16}
      bg="white"
      position="relative"
      rounded="20px"
      minH="360px"
      w="100%"
      justify="center"
      align="center"
      px="80px"
    >
      <Text
        color="#A9886C"
        position="absolute"
        top="-32px"
        left="24px"
        fontSize="48px"
        fontWeight="700"
      >
        Podcast
      </Text>
      <Container maxW="container.xl" w="100%">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="100%">
          <Box w="100%">
            <AspectRatio ratio={9 / 16} borderRadius="12px" overflow="hidden">
              <iframe
                src="https://www.youtube.com/embed/4AEtWZOumxY"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "12px",
                }}
              />
            </AspectRatio>
          </Box>
          <Box w="100%">
            <AspectRatio ratio={9 / 16} borderRadius="12px" overflow="hidden">
              <iframe
                src="https://www.youtube.com/embed/xNXu3ZrIYSY"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "12px",
                }}
              />
            </AspectRatio>
          </Box>
          <Box w="100%">
            <AspectRatio ratio={9 / 16} borderRadius="12px" overflow="hidden">
              <iframe
                src="https://www.youtube.com/embed/fLjdFyNRhvI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "12px",
                }}
              />
            </AspectRatio>
          </Box>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}
