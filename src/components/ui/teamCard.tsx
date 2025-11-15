"use client";

import { Flex, Text, Avatar, VStack } from "@chakra-ui/react";

interface TeamCardProps {
  name: string;
  image?: string;
  role?: string;
}

export function TeamCard({ name, image, role }: TeamCardProps) {
  return (
    <Flex
      direction="column"
      align="center"
      gap={4}
      p={6}
      bg="white"
      rounded="20px"
      border="1px solid"
      borderColor="#EDE7E1"
      w="100%"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
        transition: "all 0.3s",
      }}
    >
      <Avatar.Root size="xl">
        <Avatar.Fallback name={name} />
        {image && <Avatar.Image src={image} />}
      </Avatar.Root>
      <VStack gap={1} align="center">
        <Text fontSize="lg" fontWeight="600" color="#2B2B2B">
          {name}
        </Text>
        {role && (
          <Text fontSize="sm" color="#4A4A4A">
            {role}
          </Text>
        )}
      </VStack>
    </Flex>
  );
}
