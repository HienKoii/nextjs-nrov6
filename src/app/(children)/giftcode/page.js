"use client";
import { useEffect, useState } from "react";
import { Container, Heading, VStack, Text, Spinner, useColorMode, Table, Thead, Tbody, Tr, Th, Td, Badge, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

export default function GiftCodePage() {
  const [giftcodes, setGiftcodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchGiftcodes();
  }, []);

  const fetchGiftcodes = async () => {
    try {
      const res = await axios.get(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/giftcode`);
      setGiftcodes(res.data.giftcodes || []);
    } catch (error) {
      console.error("Failed to fetch giftcodes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="lg" textAlign="center" bgGradient="linear(to-r, orange.400, pink.500)" bgClip="text">
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
      {loading ? (
        <Spinner size="lg" alignSelf="center" />
      ) : (
        <Table
          colorScheme="orange" //
          borderRadius="xl"
          overflow="hidden"
          boxShadow="md"
        >
          <Thead>
            <Tr>
              <Th textAlign="center">STT</Th>
              <Th textAlign="center">Mã Giftcode</Th>
              <Th textAlign="center">Trạng thái</Th>
              <Th textAlign="center">Nội dung</Th>
            </Tr>
          </Thead>
          <Tbody>
            {giftcodes.map((gift, index) => (
              <Tr key={gift.code} _hover={{ bg: colorMode === "light" ? "orange.50" : "gray.700" }} transition="all 0.2s">
                <Td textAlign="center" fontWeight="bold">
                  {index + 1}
                </Td>
                <Td textAlign="center" fontFamily="monospace" fontSize="lg" color="orange.500">
                  {gift.code}
                </Td>
                <Td textAlign="center">
                  <Badge colorScheme={gift.limit === -1 ? "gray" : "orange"} fontSize="md" px={3} py={1} borderRadius="md">
                    {gift.limit === -1 ? "Không giới hạn" : `Giới hạn: ${gift.limit}`}
                  </Badge>
                </Td>
                <Td textAlign="center" color={colorMode === "light" ? "gray.700" : "gray.200"}>
                  {gift.str}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  );
}
