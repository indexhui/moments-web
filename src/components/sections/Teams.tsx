"use client";

import { Flex, Text, SimpleGrid, Container } from "@chakra-ui/react";
import { TeamCard } from "@/components/ui/teamCard";

const TEAM_MEMBERS = [
  {
    name: "Shiro",
    image: "/team/shiro.png",
    role: "Team Member",
  },
  {
    name: "Charlie",
    image: "/team/charlie.png",
    role: "Team Member",
  },
  {
    name: "David",
    image: "/team/david.png",
    role: "Team Member",
  },
  {
    name: "Hugh",
    image: "/team/hugh.png",
    role: "Team Member",
  },
  {
    name: "Uber",
    image: "/team/uber.png",
    role: "Team Member",
  },
  {
    name: "Zora",
    image: "/team/zora.png",
    role: "Team Member",
  },
];

export function Teams() {
  return (
    <Flex
      as="section"
      id="teams"
      py={16}
      bg="white"
      position="relative"
      rounded="20px"
      minH="360px"
      w="100%"
      justify="center"
      align="center"
      px="80px"
    >
      <Text
        color="#A9886C"
        position="absolute"
        top="-32px"
        left="24px"
        fontSize="48px"
        fontWeight="700"
      >
        Teams
      </Text>
      <Container maxW="container.xl" w="100%">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              image={member.image}
              role={member.role}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
}
