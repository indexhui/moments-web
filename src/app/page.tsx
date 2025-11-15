import { Flex } from "@chakra-ui/react";
import { LayoutLeft } from "@/components/layout/LayoutLeft";
import { LayoutRight } from "@/components/layout/LayoutRight";

export default function Home() {
  return (
    <Flex flexDirection="row" alignItems="center" bgColor="#F2F1E7">
      <Flex
        w="90%"
        maxW="1440px"
        mx="auto"
        gap="60px"
        pt="40px"
        pb="40px"
        direction={{ base: "column-reverse", lg: "row" }}
      >
        <LayoutLeft />
        <LayoutRight />
      </Flex>
    </Flex>
  );
}
