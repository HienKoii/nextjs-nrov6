import { useEffect, useState } from "react";
import { Spinner, useColorMode, Table, Thead, Tbody, Tr, Th, Td, Badge, Box, Flex } from "@chakra-ui/react";
import axios from "axios";

export default function GiftCode() {
  const [giftcodes, setGiftcodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchGiftCodes();
  }, []);

  const fetchGiftCodes = async () => {
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
    <>
      {loading ? (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner size="lg" alignSelf="center" />
        </Flex>
      ) : (
        <Box overflowX="auto" w="100%">
          <Table
            colorScheme="orange" //
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            minW="600px"
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
        </Box>
      )}
    </>
  );
}
