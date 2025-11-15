"use client";

import { Flex, Text, Box, AspectRatio } from "@chakra-ui/react";

export function Video() {
  return (
    <Flex
      as="section"
      id="video"
      py={16}
      bg="white"
      position="relative"
      rounded="20px"
      minH="360px"
      w="100%"
      justify="center"
      align="center"
    >
      <Text
        color="#A9886C"
        position="absolute"
        top="-32px"
        left="24px"
        fontSize="48px"
        fontWeight="700"
      >
        Video
      </Text>
      <Box w="70%" maxW="1080px">
        <AspectRatio ratio={16 / 9} borderRadius="12px" overflow="hidden">
          <iframe
            src="https://www.youtube.com/embed/y35XLcXai6c"
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
    </Flex>
  );
}
