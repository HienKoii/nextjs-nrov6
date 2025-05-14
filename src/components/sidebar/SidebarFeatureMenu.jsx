import { VStack, Button, Icon, useColorMode, Box, Text } from "@chakra-ui/react";

export default function SidebarFeatureMenu({ features, selected, setSelected, title, desc }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      minW={{ base: "100%", md: "260px" }}
      maxW={{ base: "100%", md: "260px" }}
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="2xl"
      boxShadow="xl"
      border="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      mb={{ base: 4, md: 0 }}
    >
      {title && (
        <Text fontWeight="bold" fontSize="lg" mb={2} color={colorMode === "light" ? "orange.500" : "orange.300"} textAlign="center">
          {title}
        </Text>
      )}
      {desc && (
        <Text fontSize="sm" color={colorMode === "light" ? "gray.500" : "gray.400"} mb={4} textAlign="center">
          {desc}
        </Text>
      )}
      <VStack spacing={2} align="stretch">
        {features.map((f) => (
          <Button
            key={f.key}
            leftIcon={<Icon as={f.icon} boxSize={6} color={f.color} />}
            variant={selected === f.key ? "solid" : "ghost"}
            colorScheme={selected === f.key ? "orange" : "gray"}
            justifyContent="flex-start"
            fontWeight={selected === f.key ? "bold" : "normal"}
            onClick={() => setSelected(f.key)}
            size="lg"
            borderRadius="lg"
            boxShadow={selected === f.key ? "md" : undefined}
            bg={selected === f.key ? (colorMode === "light" ? "orange.100" : "orange.600") : undefined}
            _hover={{
              bg: selected === f.key ? (colorMode === "light" ? "orange.200" : "orange.700") : colorMode === "light" ? "gray.100" : "gray.700",
              color: selected === f.key ? "orange.700" : undefined,
              transition: "background 0.2s, color 0.2s",
            }}
            transition="all 0.2s"
            mb={1}
          >
            {f.title}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
