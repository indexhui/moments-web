"use client";

import { Flex, Text, type FlexProps, type TextProps } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const { ref, isInView } = useScrollReveal({ once: true, amount: 0.2 });
  const MotionFlex = motion(Flex);
  const MotionText = motion(Text);

  return (
    <MotionFlex
      as="section"
      ref={ref}
      bg="white"
      position="relative"
      rounded="20px"
      w="100%"
      initial={{ y: 24, opacity: 1 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      // @ts-expect-error framer-motion transition prop on MotionFlex
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      <MotionText
        color="#A9886C"
        position="absolute"
        top={{ base: "-24px", md: "-32px" }}
        left="24px"
        fontSize={{ base: "40px", md: "48px" }}
        lineHeight={{ base: "42px", md: "56px" }}
        fontWeight="700"
        initial={{ y: 8, opacity: 1 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        // @ts-expect-error framer-motion transition prop on MotionText
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        {...titleProps}
      >
        {title}
      </MotionText>
      {children}
    </MotionFlex>
  );
}
