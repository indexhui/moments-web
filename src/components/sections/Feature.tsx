"use client";

import { Flex, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaLeaf, FaHeart, FaStar } from "react-icons/fa6";

export function Feature() {
  return (
    <Flex
      as="section"
      id="feature"
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
        Featur
      </Text>

      <Box w={{ base: "92%", md: "86%" }} maxW="1080px">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          <FeatureCard
            icon={<FaLeaf />}
            title="輕鬆上手"
            desc="簡單直覺的操作，任何時候都能來一段小療癒。"
          />
          <FeatureCard
            icon={<FaHeart />}
            title="日常陪伴"
            desc="跟著小麥與小貝狗，收集生活裡閃亮的小瞬間。"
          />
          <FeatureCard
            icon={<FaStar />}
            title="持續更新"
            desc="定期新增活動與關卡，讓每次出門都有新發現。"
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <Flex
      direction="column"
      gap={3}
      p={6}
      bg="white"
      rounded="16px"
      border="1px solid"
      borderColor="#EDE7E1"
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)", transition: "all 0.2s" }}
    >
      <Flex
        w="50px"
        h="50px"
        rounded="lg"
        bg="#987455"
        align="center"
        justify="center"
      >
        <Icon color="white" w="18px" h="18px">
          {icon}
        </Icon>
      </Flex>
      <Text fontSize="lg" fontWeight="700" color="#2B2B2B">
        {title}
      </Text>
      <Text fontSize="sm" color="#4A4A4A">
        {desc}
      </Text>
    </Flex>
  );
}
