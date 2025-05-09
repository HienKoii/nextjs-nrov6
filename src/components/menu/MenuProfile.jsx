import { Box, Button, VStack, HStack, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaKey, FaHistory } from "react-icons/fa";

export default function MenuProfile() {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const menuItems = [
    {
      icon: FaKey,
      label: "Đổi mật khẩu",
      color: "purple",
      onClick: () => {},
    },
    {
      icon: FaHistory,
      label: "Lịch sử giao dịch",
      color: "green",
      onClick: () => {},
    },
  ];

  return (
    <VStack spacing={4} w="full">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Quản lý tài khoản
      </Text>
      <Box
        w="full"
        border="1px solid" //
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
      >
        {menuItems.map((item, index) => (
          <Button
            key={item.label}
            w="full"
            h="auto"
            py={4}
            px={6}
            variant="ghost"
            justifyContent="flex-start"
            borderRadius="none"
            borderBottom={index !== menuItems.length - 1 ? "1px solid" : "none"}
            borderColor={borderColor}
            _hover={{
              bg: hoverBg,
            }}
            onClick={item.onClick}
          >
            <HStack spacing={4} w="full">
              <Icon as={item.icon} boxSize={5} color={`${item.color}.500`} />
              <Text fontSize="md">{item.label}</Text>
            </HStack>
          </Button>
        ))}
      </Box>
    </VStack>
  );
}
