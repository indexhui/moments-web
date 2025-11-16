"use client";

import { Flex, Text, Box, AspectRatio } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";

export function Video() {
  return (
    <Section
      id="video"
      py={16}
      minH="360px"
      justify="center"
      align="center"
      title="Video"
    >
      <Box w={{ base: "90%", md: "70%" }} maxW="1080px">
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
    </Section>
  );
}
