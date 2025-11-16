"use client";

import {
  Flex,
  Text,
  Box,
  AspectRatio,
  SimpleGrid,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Section } from "@/components/ui/section";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export function Podcast() {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  return (
    <Section
      id="podcast"
      py={16}
      minH="360px"
      justify="center"
      align="center"
      px="80px"
      title="Podcast"
    >
      <Container maxW="container.xl" w="100%">
        {isMobile ? (
          <Box w="100%">
            <Swiper spaceBetween={16} slidesPerView={1.1} style={{ padding: "4px 8px" }}>
              <SwiperSlide>
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
              </SwiperSlide>
              <SwiperSlide>
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
              </SwiperSlide>
              <SwiperSlide>
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
              </SwiperSlide>
            </Swiper>
          </Box>
        ) : (
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
        )}
      </Container>
    </Section>
  );
}
