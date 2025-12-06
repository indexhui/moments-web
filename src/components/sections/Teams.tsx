import { Flex, Text, SimpleGrid, Container } from "@chakra-ui/react";
import { TeamCard } from "@/components/ui/teamCard";
import { Section } from "@/components/ui/section";

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
    <Section
      id="teams"
      py={16}
      minH="360px"
      justify="center"
      align="center"
      px={{ base: "24px", md: "80px" }}
      title="Teams"
    >
      <Container maxW="container.xl" w="100%">
        <SimpleGrid
          columns={{ base: 2, sm: 2, md: 3, lg: 4 }}
          gap={{ base: 2, md: 6 }}
        >
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
    </Section>
  );
}
