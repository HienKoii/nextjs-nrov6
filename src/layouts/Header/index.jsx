"use client";

import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import AuthButtons from "@/components/auth/AuthButtons";
import AuthLogin from "@/components/auth/AuthLogin";
import { MenuMobile } from "@/components/menu/MenuMobile";
import Navigation from "@/components/nav/Navigation";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, loading } = useAuth();
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [mounted, setMounted] = useState(false);

  // Chỉ render UI sau khi component đã mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // hoặc return một loading skeleton
  }

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      bg={bg}
      boxShadow="md"
      borderBottom="1px solid"
      borderColor={borderColor}
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
