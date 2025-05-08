"use client";

import { Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, isMobile }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <Text
        px={2}
        py={1}
        rounded={"md"}
        position="relative"
        transition="all 0.3s ease"
        bg={isActive ? "blue.400" : "transparent"}
        color={isActive ? "white" : "inherit"}
        fontWeight={isActive ? "bold" : "normal"}
        _hover={{
          textDecoration: "none",
          bg: "blue.400",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          _after: {
            width: "80%",
          },
        }}
        _after={{
          content: '""',
          position: "absolute",
          width: isActive ? "80%" : "0",
          height: "2px",
          bottom: "0",
          left: "50%",
          bg: "blue.500",
          transition: "all 0.3s ease",
          transform: "translateX(-50%)",
        }}
        w={isMobile ? "full" : "auto"}
        textAlign={isMobile ? "center" : "left"}
      >
        {children}
      </Text>
    </Link>
  );
};

export default function Navigation({ isMobile }) {
  const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/download", label: "Tải game" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/support", label: "Hỗ trợ" },
  ];

  if (isMobile) {
    return (
      <VStack spacing={4} align="stretch">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} isMobile={isMobile}>
            {link.label}
          </NavLink>
        ))}
      </VStack>
    );
  }

  return (
    <Stack
      direction={"row"}
      justify={"center"} //
      spacing={4}
      display={{ base: "none", md: "flex" }}
    >
      {links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </Stack>
  );
}
