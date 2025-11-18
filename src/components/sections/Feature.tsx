"use client";

import { Flex, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FaLeaf, FaHeart, FaStar } from "react-icons/fa6";
import { Section } from "@/components/ui/section";

export function Feature() {
  return (
    <Section
      id="feature"
      py={16}
      minH="360px"
      justify="center"
      align="flex-start"
      direction="column"
      px="36px"
      gap="24px"
      title="Feature"
    >
      <Text
        color="#72543B"
        as="h2"
        fontSize="18px"
        fontWeight="500"
        maxW="500px"
      >
        走走小日 moments
        <br />
        以步行蒐集、
        輕任務循環與角色互動為核心，陪你在城市裡記錄那些閃著光的小日常。
        <br />
        跟著麥尾與小貝狗，一起探索城市中的療癒瞬間。
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
            desc="跟著麥尾與小貝狗，收集生活裡閃亮的小瞬間。"
          />
          <FeatureCard
            icon={<FaStar />}
            title="持續更新"
            desc="定期新增活動與關卡，讓每次出門都有新發現。"
          />
        </SimpleGrid>
      </Box>
    </Section>
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
      _hover={{
        transform: "translateY(-2px)",
        transition: "all 0.2s",
      }}
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
