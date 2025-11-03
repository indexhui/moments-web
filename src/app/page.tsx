import { Flex } from "@chakra-ui/react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
// import { Characters } from "@/components/sections/Characters";
// import { Pillars } from "@/components/sections/Pillars";
// import { Gallery } from "@/components/sections/Gallery";
// import { GameplayLoop } from "@/components/sections/GameplayLoop";
// import { Roadmap } from "@/components/sections/Roadmap";
// import { FollowCTA } from "@/components/sections/FollowCTA";
// import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <Flex flexDirection="column" alignItems="center" bgColor="bg">
      <Header />
      <Hero />
      {/* <Characters />
      <Pillars />
      <Gallery />
      <GameplayLoop />
      <Roadmap />
      <FollowCTA />
      <Footer /> */}
    </Flex>
  );
}
