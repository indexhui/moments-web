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
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

export function Podcast() {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldUseSwiper = isMobile && mounted;
  return (
    <Section
      id="podcast"
      py={16}
      minH="360px"
      justify="center"
      align="flex-start"
      px={{ base: "24px", md: "80px" }}
      title="Podcast"
      direction="column"
      gap={{ base: 4, md: 8 }}
    >
      <Text color="#72543B" as="h3" fontSize={{ base: "16px", md: "18px" }}>
        哈囉！我們是麥尾。
        <br />
        除了會分享遊戲製作的經過會也是和不同領域創作者聊聊的小角落，歡迎收聽!
      </Text>
      <Container maxW="container.xl" w="100%">
        {shouldUseSwiper ? (
          <Box w="100%">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              style={{ padding: "4px 8px 32px" }}
            >
              <SwiperSlide>
                <AspectRatio
                  ratio={9 / 16}
                  borderRadius="12px"
                  overflow="hidden"
                >
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
                <AspectRatio
                  ratio={9 / 16}
                  borderRadius="12px"
                  overflow="hidden"
                >
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
                <AspectRatio
                  ratio={9 / 16}
                  borderRadius="12px"
                  overflow="hidden"
                >
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
            <style jsx global>{`
              #podcast .swiper-pagination-bullet {
                background: #987455;
                opacity: 0.4;
              }
              #podcast .swiper-pagination-bullet-active {
                background: #987455;
                opacity: 1;
              }
              #podcast .swiper-pagination {
                bottom: -6px;
              }
            `}</style>
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
