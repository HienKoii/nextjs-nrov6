import { Box, VStack, Heading, HStack, Text, useColorMode } from "@chakra-ui/react";
import AvatarImage from "../images/AvatarImage";

export default function LuckyWheelHistory({ winners }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      flex={1}
      minW={{ base: "100%", md: "320px" }}
      maxW={{ md: "320px" }}
      overflowY="auto"
      mt={{ base: 8, md: 0 }}
      bg={colorMode === "light" ? "white" : "gray.700"}
      borderRadius="xl"
      boxShadow="lg"
      maxHeight={{ base: "260px", md: "420px" }}
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
    >
      <Heading size="md" p={2} color="orange.400" textAlign="center">
        Lịch sử quay trúng thưởng
      </Heading>
      <VStack
        align="stretch"
        spacing={0} //
        divider={<Box h="1px" bg={colorMode === "light" ? "gray.100" : "gray.600"} />}
      >
        {winners.map((w, idx) => (
          <HStack
            key={idx}
            spacing={3}
            px={2}
            py={2}
            _hover={{
              bg: colorMode === "light" ? "orange.50" : "gray.600",
              transition: "background 0.2s",
            }}
            borderBottom={idx === winners.length - 1 ? "none" : "1px solid"}
            borderColor={colorMode === "light" ? "gray.100" : "gray.600"}
            borderRadius="md"
            alignItems="flex-start"
          >
            <AvatarImage id={516} />
            <VStack align="start" spacing={0} flex={1}>
              <Text
                fontWeight={w.name === "Bạn" ? "bold" : "normal"} //
                color={w.name === "Bạn" ? "orange.500" : undefined}
                fontSize="md"
              >
                {w.name}
              </Text>
              <Text fontWeight="bold" color="green.500" fontSize="md">
                {w.prize}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
