import { Box, Button, VStack, HStack, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaKey, FaHistory, FaMoneyBill } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function MenuProfile() {
  const router = useRouter();
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const menuItems = [
    {
      icon: FaMoneyBill,
      label: "Nạp tiền",
      color: "blue",
      path: "/deposit",
    },
    {
      icon: FaKey,
      label: "Đổi mật khẩu",
      color: "purple",
      path: "/change-password",
    },
    {
      icon: FaHistory,
      label: "Lịch sử giao dịch",
      color: "green",
      path: "/transaction-history",
    },
  ];

  return (
    <VStack spacing={4} w="full">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Quản lý tài khoản
      </Text>
      <Box w="full" border="1px solid" borderColor={borderColor} borderRadius="xl" overflow="hidden">
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
            onClick={() => router.push(item.path)}
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
