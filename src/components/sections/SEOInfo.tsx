"use client";

import { Flex, Text, Box, VStack } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";

export function SEOInfo() {
  return (
    <Section
      id="seo-info"
      px="36px"
      py="32px"
      minH="auto"
      gap={6}
      align="stretch"
      title="About"
      direction="column"
    >
      <VStack align="stretch" gap={4}>
        <Box>
          <Text
            color="#72543B"
            as="h2"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight="600"
            mb={3}
          >
            走走小日 moments - 跟著麥尾與小貝狗探索城市
          </Text>
          <Text
            color="#72543B"
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="1.8"
          >
            <strong>走走小日</strong>
            是一款療癒系日常遊戲，以步行蒐集、輕任務循環與角色互動為核心。
            在遊戲中，玩家將跟著<strong>麥尾</strong>
            與小貝狗一起探索城市，記錄那些閃著光的小日常。
            從出門、通勤到回家，每一天都能遇見療癒的小事件與角色。
          </Text>
        </Box>

        <Box>
          <Text
            color="#72543B"
            as="h3"
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="600"
            mb={2}
          >
            關於麥尾
          </Text>
          <Text
            color="#72543B"
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="1.8"
          >
            <strong>麥尾</strong>是走走小日 moments
            的製作團隊，致力於創造療癒系日常遊戲體驗。
            跟著麥尾與小貝狗，收集生活裡閃亮的小瞬間，讓每次出門都成為療癒的開始。
          </Text>
        </Box>

        <Box>
          <Text
            color="#72543B"
            as="h3"
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="600"
            mb={2}
          >
            遊戲特色
          </Text>
          <Text
            color="#72543B"
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="1.8"
          >
            走走小日 moments 提供簡單直覺的操作，任何時候都能來一段小療癒。
            定期新增活動與關卡，讓每次出門都有新發現。追蹤我們以獲得最新消息與釋出時間。
          </Text>
        </Box>
      </VStack>
    </Section>
  );
}
