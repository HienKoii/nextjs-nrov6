"use client";

import { Box, Container } from "@chakra-ui/react";

export default function MainLayout({ children }) {
  return (
    <Box as="main" mt="16" p={4} pt={0}>
      <Container maxW="container.lg" p={4}>
        {children}
      </Container>
    </Box>
  );
}
