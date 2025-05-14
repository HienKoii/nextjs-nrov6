"use client";

import { Container } from "@chakra-ui/react";

export default function MainLayout({ children }) {
  return (
    <Container as={"main"} maxW="container.lg" p={4} mt="16">
      {children}
    </Container>
  );
}
