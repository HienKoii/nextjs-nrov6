"use client";
import { Heading, VStack, Text, useColorMode } from "@chakra-ui/react";
import GiftCode from "@/components/giftcode/giftcode";

export default function GiftCodePage() {
  const { colorMode } = useColorMode();

  return (
    <VStack spacing={8} align="stretch">
      <Heading
        size="lg"
        textAlign="center" //
        bgGradient="linear(to-r, orange.400, pink.500)"
        bgClip="text"
      >
        🎁 Danh sách Giftcode
      </Heading>
      <Text
        textAlign="center" //
        color={colorMode === "light" ? "gray.600" : "gray.300"}
        fontSize="lg"
        mb={2}
      >
        Nhận ngay giftcode cực hot, nhập nhanh kẻo hết!
      </Text>
      <GiftCode />
    </VStack>
  );
}
