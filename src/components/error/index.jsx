"use client"
import { Box, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Error({ text = "Xin lỗi, đã có sự cố xảy ra. Vui lòng thử lại sau hoặc quay về trang chủ." }) {
  return (
    <Box minH="60vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={2}>
        <Image
          src="/images/avatar/user.png" //
          alt="Lỗi hệ thống"
          boxSize={{ base: "180px", md: "240px" }}
          objectFit="contain"
        />
        <Heading size="lg" color="red.500" textAlign="center">
          ERROR 404
        </Heading>
        <Text color="gray.500" fontSize="lg" textAlign="center">
          {text}
        </Text>
        <Button as={Link} href="/" colorScheme="orange" size="lg">
          Quay về trang chủ
        </Button>
      </VStack>
    </Box>
  );
}
