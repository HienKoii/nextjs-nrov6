"use client";

import { Box, Text, VStack, HStack, Icon, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaShieldAlt, FaHeart, FaCopyright } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.600", "gray.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box
      as="footer"
      py={6} //
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      borderTop="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <>
        <VStack spacing={6}>
          {/* Links Section */}
          <HStack spacing={8} justify="center" wrap="wrap">
            <Link
              href="/"
              style={{
                color: linkColor,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Điều khoản sử dụng
            </Link>
            <Link
              href="/"
              style={{
                color: linkColor,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/"
              style={{
                color: linkColor,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Liên hệ
            </Link>
          </HStack>

          {/* Copyright Section */}
          <VStack spacing={2} color={textColor}>
            <HStack spacing={2}>
              <Icon as={FaHeart} color="red.500" />
              <Text fontSize="sm" textAlign={"center"}>
                Cảm ơn bạn đã ghé thăm website của chúng tôi!
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FaCopyright} />
              <Text fontSize="xs">2025 Created by HienKoii</Text>
            </HStack>
          </VStack>

          {/* Security Notice */}
          <HStack spacing={2} color={textColor} fontSize="xs">
            <Icon as={FaShieldAlt} />
            <Text textAlign={"center"}>Vui lòng không chia sẻ thông tin tài khoản của bạn với người khác</Text>
          </HStack>
        </VStack>
      </>
    </Box>
  );
}
