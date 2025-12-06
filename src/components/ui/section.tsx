import { Flex, Text, type FlexProps, type TextProps } from "@chakra-ui/react";
import React from "react";

interface SectionProps extends FlexProps {
  title: string;
  titleProps?: TextProps;
}

export function Section({
  title,
  titleProps,
  children,
  ...rest
}: SectionProps) {
  return (
    <Flex
      as="section"
      bg="white"
      position="relative"
      rounded="20px"
      w="100%"
      {...rest}
    >
      <Text
        color="#A9886C"
        position="absolute"
        top={{ base: "-24px", md: "-32px" }}
        left="24px"
        fontSize={{ base: "40px", md: "48px" }}
        lineHeight={{ base: "42px", md: "56px" }}
        fontWeight="700"
        {...titleProps}
      >
        {title}
      </Text>
      {children}
    </Flex>
  );
}
