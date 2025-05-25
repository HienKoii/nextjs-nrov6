"use client";
import { Box, VStack, Heading, HStack, Text, useColorMode, Spinner, Center, Badge } from "@chakra-ui/react";
import AvatarImage from "../images/AvatarImage";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLucky } from "@/contexts/LuckyContext";

export default function LuckyWheelHistory() {
  const { colorMode } = useColorMode();

  const { fetchWinners, winners, loading } = useLucky();

  useEffect(() => {
    fetchWinners();
  }, []);

  return (
    <Box
      flex={1}
      minW={{ base: "100%", md: "340px" }}
      maxW={{ md: "360px" }}
      mt={{ base: 8, md: 0 }}
      bgGradient={colorMode === "light" ? "linear(to-br, yellow.50, orange.100, pink.50)" : "linear(to-br, gray.700, orange.900, gray.800)"}
      borderRadius="2xl"
      boxShadow="0 4px 32px 0 #FFD70055, 0 0 0 2px #FF69B4"
      border="1.5px solid"
      borderColor={colorMode === "light" ? "orange.100" : "orange.700"}
      px={0}
      py={2}
      position="relative"
    >
      <Heading
        size="md"
        py={2} //
        mb={1}
        textAlign="center"
      >
        🎁 Danh sách quay trúng thưởng
      </Heading>
      <VStack
        align="stretch"
        spacing={0} //
        divider={<Box h="1px" bg={colorMode === "light" ? "orange.50" : "gray.700"} />}
        px={1}
        maxHeight={{ base: "320px", md: "440px" }}
        overflowY="auto"
      >
        {loading ? (
          <Center py={8}>
            <Spinner size="lg" color="orange.400" />
          </Center>
        ) : (
          <AnimatePresence>
            {winners &&
              winners?.map((w, idx) => (
                <motion.div
                  key={idx} //
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  style={{ width: "100%" }}
                >
                  <HStack
                    spacing={3}
                    px={3}
                    py={3}
                    bg={colorMode === "light" ? "whiteAlpha.900" : "gray.800"}
                    borderRadius="xl"
                    boxShadow="0 2px 12px 0 #FFD70022"
                    border={w.cName === "Bạn" ? "2px solid #FFD700" : "1.5px solid #FF69B4"}
                    position="relative"
                    alignItems="center"
                    _hover={{
                      boxShadow: "0 0 0 4px #FFD70099, 0 2px 12px 0 #FFD70033",
                      transform: "scale(1.025)",
                      transition: "all 0.2s",
                      zIndex: 2,
                    }}
                    transition="all 0.2s"
                  >
                    <AvatarImage id={w.avatar} size={"md"} />
                    <VStack align="start" spacing={0} flex={1} minW={0}>
                      <Text
                        fontWeight={w.cName === "Bạn" ? "extrabold" : "bold"}
                        color={w.cName === "Bạn" ? "orange.500" : "pink.500"}
                        fontSize="md"
                        textShadow={w.cName === "Bạn" ? "0 1px 8px #FFD700" : undefined}
                        isTruncated
                        maxW={{ base: "120px", md: "140px" }}
                      >
                        {w.cName}
                      </Text>
                      <HStack spacing={2} mt={1}>
                        <Badge
                          colorScheme="yellow"
                          fontSize="md" //
                          px={2}
                          py={0.5}
                          borderRadius="md"
                          fontWeight="bold"
                          boxShadow="0 0 8px 1px #FFD70055"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          x{w.quantity}
                        </Badge>
                        <Badge
                          colorScheme="pink"
                          fontSize="md" //
                          px={2}
                          py={0.5}
                          borderRadius="md"
                          fontWeight="bold"
                          boxShadow="0 0 8px 1px #FF69B455"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          {w.itemName}
                        </Badge>
                      </HStack>
                    </VStack>
                  </HStack>
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </VStack>
    </Box>
  );
}
 