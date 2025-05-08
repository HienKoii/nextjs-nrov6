"use client";

import { Box, Flex, Container, useColorMode } from "@chakra-ui/react";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";
import AuthButtons from "@/components/auth/AuthButtons";
import { MenuMobile } from "@/components/menu/MenuMobile";
import AuthLogin from "@/components/auth/AuthLogin";
import { ThemeToggle } from "@/components/buttons/ThemeToggle";

export default function Header() {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="header"
      position="fixed" //
      top={0}
      left={0}
      right={0}
      bg={colorMode === "dark" ? "gray.900" : "white"}
      boxShadow="sm"
      zIndex={1000}
      px={8}
    >
      <Box>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems="center" gap={4}>
            <Box display={{ base: "block", md: "none" }}>
              <MenuMobile />
            </Box>
            <Box display={{ base: "none", md: "block" }}>
              <Logo />
            </Box>
          </Flex>

          <Box display={{ base: "block", md: "none" }} textAlign="center">
            <Logo />
          </Box>
          <Box display={{ base: "none", md: "block" }} textAlign="center">
            <Navigation />
          </Box>
          <Flex gap={2}>
            {/* <AuthLogin /> */}
            <AuthButtons />
            <ThemeToggle />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
