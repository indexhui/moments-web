"use client";

import { Hero } from "@/components/sections/Hero";
import { Introduce } from "@/components/sections/Introduce";
import { Video } from "@/components/sections/Video";
import { Teams } from "@/components/sections/Teams";
import { Podcast } from "@/components/sections/Podcast";
import { Feature } from "@/components/sections/Feature";
import { Stories } from "@/components/sections/Stories";

import { Flex } from "@chakra-ui/react";

export function LayoutRight() {
  return (
    <Flex flex="1" direction="column" gap="72px" h="100%">
      <Hero />
      <Introduce />
      <Feature />
      <Stories />
      <Video />
      <Teams />
      <Podcast />
    </Flex>
  );
}
