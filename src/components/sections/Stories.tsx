import { Flex, Text, Box, Button, Link } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";

export function Stories() {
  return (
    <Section
      id="stories"
      px="36px"
      py="48px"
      minH="220px"
      gap={8}
      align="stretch"
      title="Share Your Story"
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        direction="column"
        gap="16px"
        w={{ base: "100%", md: "60%" }}
        maxW="1080px"
        pt="32px"
      >
        <Text
          color="#72543B"
          as="h2"
          fontSize="18px"
          fontWeight="500"
          maxW="680px"
        >
          募集通勤或上班途中遇到的糗事、趣事或最討厭的一瞬間!
          <br />
          不論是通勤時的好氣、好笑或好累，都歡迎告訴我們。
          <br />
          邀請大家來投稿，將會在 Podcast
          中分享大家的故事，有機會成為遊戲中的事件！
        </Text>

        <Text color="#72543B" fontSize="12px">
          投稿代表同意我們在遊戲、網站、Podcast 或社群中
          重新敘述或改編你的故事（會進行匿名處理）。
        </Text>
        <Link
          href="https://forms.gle/vJoxa77Gsj1MAT4h8"
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
      </Flex>
      <Flex
        w={{ base: "100%", md: "40%" }}
        // display={{ base: "none", md: "flex" }}
        align="center"
        justify="center"
      >
        <Box
          w="163px"
          h="155px"
          bgImage="url('/animals/golden.png')"
          bgSize="contain"
          bgPos="center"
          bgRepeat="no-repeat"
        />
      </Flex>
    </Section>
  );
}
