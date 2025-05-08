"use client";

import { Box, Container, Text, Flex, useColorMode } from "@chakra-ui/react";

export default function Footer() {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="footer"
      py={4} //
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      borderTop="1px"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Container maxW="container.sm">
        <Flex
          direction="column"
          align="center" //
          gap={2}
          color={colorMode === "light" ? "gray.600" : "gray.400"}
          textAlign={"center"}
        >
          <Text fontSize="sm">Cảm ơn bạn đã ghé thăm website của chúng tôi!</Text>
          <Text fontSize="xs">© 2025 Created by HienKoii</Text>
        </Flex>
      </Container>
    </Box>
  );
}
