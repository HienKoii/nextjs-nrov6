"use client";

import { Box, Flex, useColorMode } from "@chakra-ui/react";

import { useAuth } from "@/contexts/AuthContext";
import AuthButtons from "@/components/auth/AuthButtons";
import AuthLogin from "@/components/auth/AuthLogin";
import { MenuMobile } from "@/components/menu/MenuMobile";
import Navigation from "@/components/nav/Navigation";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/buttons/ThemeToggle";

export default function Header() {
  const { colorMode } = useColorMode();
  const { user, loading } = useAuth();

  return (
    <Box
      as="header"
      position="fixed"
      w="100%" //
      bg={colorMode === "light" ? "white" : "gray.800"}
      boxShadow="sm"
      zIndex={1000}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" px={4}>
        <MenuMobile />

        <Logo />

        <Navigation />

        <Flex alignItems="center" gap={1}>
          {!loading && <>{user ? <AuthLogin /> : <AuthButtons />}</>}
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  );
}
